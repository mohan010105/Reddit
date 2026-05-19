/**
 * Enterprise Rate Limiting & Traffic Throttling
 * Distributed rate limiting using Redis
 */
import { Request, Response, NextFunction } from "express";
import { redis } from "../lib/redis";
import { logger } from "../lib/logger";

interface RateLimitConfig {
  windowSeconds: number;
  maxRequests: number;
  keyPrefix: string;
}

export const createRateLimiter = (config: RateLimitConfig) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.ip || "anonymous";
    const key = `ratelimit:${config.keyPrefix}:${identifier}`;

    try {
      await redis.connect();
      // @ts-ignore
      const client = (redis as any).client;
      
      // Atomic increment and expire
      const requests = await client.incr(key);
      if (requests === 1) {
        await client.expire(key, config.windowSeconds);
      }

      // Add headers
      res.setHeader("X-RateLimit-Limit", config.maxRequests);
      res.setHeader("X-RateLimit-Remaining", Math.max(0, config.maxRequests - requests));

      if (requests > config.maxRequests) {
        logger.warn({ ip: identifier, path: req.path }, "Rate limit exceeded");
        res.status(429).json({
          error: "Too many requests",
          retryAfter: config.windowSeconds,
        });
        return;
      }

      next();
    } catch (err) {
      // Fail open in case of Redis error, but log it
      logger.error({ err }, "Rate limiting error");
      next();
    }
  };
};

// ─── Adaptive Throttling ──────────────────────────────────
// Reduces throughput when system load is high
export const adaptiveThrottle = async (req: Request, res: Response, next: NextFunction) => {
  // Logic could check memory usage or queue length
  const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
  if (memoryUsage > 450) { // Throttle if above 450MB
    // Add artificial delay or reject low-priority traffic
    if (req.method === "GET" && !req.path.startsWith("/api/auth")) {
       // Wait slightly to reduce load
       await new Promise(r => setTimeout(r, 200));
    }
  }
  next();
};
