import { Request, Response, NextFunction } from "express";

// ──────────────────────────────────────────────────────────────────────────────
// Input Sanitization middleware
// ──────────────────────────────────────────────────────────────────────────────
const DANGEROUS_PATTERNS = [
  /<script\b[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick=, onerror=, etc.
  /data:\s*text\/html/gi,
  /vbscript:/gi,
];

function sanitizeValue(value: any): any {
  if (typeof value === "string") {
    let sanitized = value;
    for (const pattern of DANGEROUS_PATTERNS) {
      sanitized = sanitized.replace(pattern, "");
    }
    // Basic HTML entity encoding for script injection
    sanitized = sanitized
      .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, "&amp;")
      .replace(/<script/gi, "&lt;script")
      .replace(/<\/script/gi, "&lt;/script");
    return sanitized;
  }
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === "object") {
    const sanitized: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      sanitized[k] = sanitizeValue(v);
    }
    return sanitized;
  }
  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  if (req.query && typeof req.query === "object") {
    for (const [key, val] of Object.entries(req.query)) {
      if (typeof val === "string") {
        (req.query as any)[key] = sanitizeValue(val);
      }
    }
  }
  next();
}

// ──────────────────────────────────────────────────────────────────────────────
// Anti-bot middleware (basic user-agent check)
// ──────────────────────────────────────────────────────────────────────────────
const BOT_PATTERNS = [
  /curl/i, /wget/i, /python-requests/i, /scrapy/i,
  /bot(?!.*google|.*bing|.*yahoo)/i,
];

export function antiBotCheck(req: Request, res: Response, next: NextFunction) {
  // Skip for health checks
  if (req.path === "/api/health") { next(); return; }
  
  const ua = req.headers["user-agent"] || "";
  
  // Block empty user agents on write operations
  if (!ua && ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    res.status(403).json({ error: "Request blocked" });
    return;
  }
  
  // Block known bot patterns on write operations  
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    for (const pattern of BOT_PATTERNS) {
      if (pattern.test(ua)) {
        res.status(403).json({ error: "Automated requests not allowed" });
        return;
      }
    }
  }
  
  next();
}

// ──────────────────────────────────────────────────────────────────────────────
// Suspicious activity detection
// ──────────────────────────────────────────────────────────────────────────────
const activityMap = new Map<string, { actions: number; lastAction: number; warnings: number }>();

export function suspiciousActivityCheck(req: Request, res: Response, next: NextFunction) {
  // Only check write operations  
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) { next(); return; }
  
  const key = req.userId ? `user_${req.userId}` : req.ip || "unknown";
  const now = Date.now();
  const window = 60_000; // 1 minute
  
  let entry = activityMap.get(key);
  if (!entry || now - entry.lastAction > window) {
    entry = { actions: 0, lastAction: now, warnings: 0 };
  }
  
  entry.actions++;
  entry.lastAction = now;
  
  // Threshold: more than 50 write actions per minute = suspicious
  if (entry.actions > 50) {
    entry.warnings++;
    activityMap.set(key, entry);
    
    if (entry.warnings >= 3) {
      res.status(429).json({ error: "Suspicious activity detected. Please try again later." });
      return;
    }
  }
  
  activityMap.set(key, entry);
  next();
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of activityMap) {
    if (now - val.lastAction > 300_000) activityMap.delete(key); // 5 min
  }
}, 60_000);

// ──────────────────────────────────────────────────────────────────────────────
// Enhanced security headers
// ──────────────────────────────────────────────────────────────────────────────
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0"); // Modern browsers disable this; CSP is better
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.removeHeader("X-Powered-By");
  
  // Content Security Policy
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Content-Security-Policy", 
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;"
    );
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  
  next();
}

// ──────────────────────────────────────────────────────────────────────────────
// Request size limiting (per-route)
// ──────────────────────────────────────────────────────────────────────────────
export function limitRequestSize(maxBytes: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers["content-length"] || "0");
    if (contentLength > maxBytes) {
      res.status(413).json({ error: "Request too large" });
      return;
    }
    next();
  };
}
