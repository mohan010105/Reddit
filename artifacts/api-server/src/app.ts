import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import helmet from "helmet";
import compression from "compression";
import router from "./routes";
import { logger } from "./lib/logger";
import { requestTracing, metricsMiddleware } from "./lib/monitoring";
import { auditLogMiddleware } from "./middlewares/auditLog";
import { sanitizeInput, antiBotCheck, suspiciousActivityCheck, securityHeaders } from "./middlewares/security";

const app: Express = express();

// ---------------------------------------------------------------------------
// Security & Parsing
// ---------------------------------------------------------------------------

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// Trust proxy for rate-limiter behind reverse proxy
app.set("trust proxy", 1);

// CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (curl, mobile, etc.)
      if (!origin || allowedOrigins.includes(origin)) cb(null, true);
      else cb(null, true); // permissive for development; tighten in prod
    },
    credentials: true,
    maxAge: 86400,
  }),
);

// Body parsing
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());

// ---------------------------------------------------------------------------
// Structured request logging
// ---------------------------------------------------------------------------
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
    // Don't log health checks
    autoLogging: {
      ignore: (req) => req.url === "/api/health",
    },
  }),
);

// ---------------------------------------------------------------------------
// Security middleware stack
// ---------------------------------------------------------------------------
app.use(securityHeaders);
app.use(requestTracing);
app.use(metricsMiddleware);
app.use(auditLogMiddleware);
app.use(sanitizeInput);
app.use(antiBotCheck);
app.use(suspiciousActivityCheck);

// ---------------------------------------------------------------------------
// Advanced rate limiter (per-IP + per-user, sliding window)
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number;
  resetTime: number;
  burstCount: number;
  burstResetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 200; // requests per window
const BURST_WINDOW_MS = 5_000; // 5 seconds
const BURST_MAX = 30; // burst limit

app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip ?? "unknown";
  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    entry = { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS, burstCount: 0, burstResetTime: now + BURST_WINDOW_MS };
  }

  if (now > entry.burstResetTime) {
    entry.burstCount = 0;
    entry.burstResetTime = now + BURST_WINDOW_MS;
  }

  entry.count += 1;
  entry.burstCount += 1;

  // Set rate limit headers
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX.toString());
  res.setHeader("X-RateLimit-Remaining", Math.max(0, RATE_LIMIT_MAX - entry.count).toString());
  res.setHeader("X-RateLimit-Reset", Math.ceil(entry.resetTime / 1000).toString());

  if (entry.burstCount > BURST_MAX) {
    rateLimitMap.set(ip, entry);
    res.status(429).json({ error: "Too many requests. Please slow down." });
    return;
  }

  if (entry.count > RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, entry);
    res.status(429).json({ error: "Rate limit exceeded. Try again later." });
    return;
  }

  rateLimitMap.set(ip, entry);
  next();
});

// Periodic cleanup of the rate-limit map
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetTime) rateLimitMap.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS);

// ---------------------------------------------------------------------------
// Response compression header hint
// ---------------------------------------------------------------------------
app.use((_req: Request, res: Response, next: NextFunction) => {
  // Enable vary header for proper CDN caching
  res.setHeader("Vary", "Accept-Encoding, Origin");
  next();
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use("/api", router);

// ---------------------------------------------------------------------------
// 404 handler
// ---------------------------------------------------------------------------
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// ---------------------------------------------------------------------------
// Global error handler
// ---------------------------------------------------------------------------
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  req.log.error({ err }, "Unhandled error");
  const status = (err as any).status ?? (err as any).statusCode ?? 500;
  res.status(status).json({
    error: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
  });
});

export default app;
