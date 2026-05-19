/**
 * Backend Monitoring & Metrics Service
 * Request tracing, API metrics, performance tracking
 */
import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

// ─── Request Tracing ──────────────────────────────────────
let requestCounter = 0;

export function requestTracing(req: Request, res: Response, next: NextFunction) {
  const requestId = req.headers["x-request-id"]?.toString() ||
    `req_${Date.now()}_${(++requestCounter).toString(36)}`;
  const startTime = process.hrtime.bigint();

  // Attach to request
  (req as any).requestId = requestId;
  (req as any).startTime = startTime;

  // Set response header
  res.setHeader("X-Request-ID", requestId);

  // Log on response finish
  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - startTime) / 1e6; // ms
    const logData = {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Math.round(duration * 100) / 100,
      userAgent: req.headers["user-agent"]?.slice(0, 80),
      ip: req.ip,
      userId: (req as any).userId || null,
    };

    if (res.statusCode >= 500) {
      logger.error(logData, "Request failed");
    } else if (res.statusCode >= 400) {
      logger.warn(logData, "Request client error");
    } else if (duration > 3000) {
      logger.warn(logData, "Slow request detected");
    }
  });

  next();
}

// ─── API Metrics Collector ────────────────────────────────
interface RouteMetrics {
  count: number;
  totalDuration: number;
  maxDuration: number;
  minDuration: number;
  errors: number;
  lastAccessed: number;
}

class MetricsCollector {
  private routes = new Map<string, RouteMetrics>();
  private globalMetrics = {
    totalRequests: 0,
    totalErrors: 0,
    startTime: Date.now(),
    activeConnections: 0,
  };

  recordRequest(method: string, path: string, statusCode: number, duration: number) {
    const key = `${method} ${this.normalizePath(path)}`;
    const existing = this.routes.get(key) || {
      count: 0,
      totalDuration: 0,
      maxDuration: 0,
      minDuration: Infinity,
      errors: 0,
      lastAccessed: 0,
    };

    existing.count++;
    existing.totalDuration += duration;
    existing.maxDuration = Math.max(existing.maxDuration, duration);
    existing.minDuration = Math.min(existing.minDuration, duration);
    existing.lastAccessed = Date.now();
    if (statusCode >= 500) existing.errors++;

    this.routes.set(key, existing);

    this.globalMetrics.totalRequests++;
    if (statusCode >= 500) this.globalMetrics.totalErrors++;
  }

  getRouteMetrics() {
    const result: Record<string, RouteMetrics & { avgDuration: number }> = {};
    for (const [key, metrics] of this.routes) {
      result[key] = {
        ...metrics,
        avgDuration: Math.round((metrics.totalDuration / metrics.count) * 100) / 100,
        minDuration: metrics.minDuration === Infinity ? 0 : metrics.minDuration,
      };
    }
    return result;
  }

  getGlobalMetrics() {
    return {
      ...this.globalMetrics,
      uptime: Math.round((Date.now() - this.globalMetrics.startTime) / 1000),
      errorRate: this.globalMetrics.totalRequests > 0
        ? ((this.globalMetrics.totalErrors / this.globalMetrics.totalRequests) * 100).toFixed(2)
        : "0.00",
      routeCount: this.routes.size,
      memoryUsage: process.memoryUsage(),
    };
  }

  getTopSlowRoutes(limit = 10) {
    return [...this.routes.entries()]
      .map(([key, m]) => ({
        route: key,
        avgDuration: m.totalDuration / m.count,
        count: m.count,
        maxDuration: m.maxDuration,
      }))
      .sort((a, b) => b.avgDuration - a.avgDuration)
      .slice(0, limit);
  }

  getTopErrorRoutes(limit = 10) {
    return [...this.routes.entries()]
      .filter(([, m]) => m.errors > 0)
      .map(([key, m]) => ({
        route: key,
        errors: m.errors,
        errorRate: ((m.errors / m.count) * 100).toFixed(1),
        count: m.count,
      }))
      .sort((a, b) => b.errors - a.errors)
      .slice(0, limit);
  }

  private normalizePath(path: string): string {
    // Replace UUIDs and numeric IDs with placeholders
    return path
      .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, ":id")
      .replace(/\/\d+/g, "/:id")
      .split("?")[0];
  }

  reset() {
    this.routes.clear();
    this.globalMetrics = {
      totalRequests: 0,
      totalErrors: 0,
      startTime: Date.now(),
      activeConnections: 0,
    };
  }
}

export const metrics = new MetricsCollector();

// ─── Metrics Middleware ───────────────────────────────────
export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = process.hrtime.bigint();

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - startTime) / 1e6;
    metrics.recordRequest(req.method, req.path, res.statusCode, duration);
  });

  next();
}

// ─── Health Check with Metrics ────────────────────────────
export function getHealthWithMetrics() {
  const global = metrics.getGlobalMetrics();
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: global.uptime,
    environment: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || "0.0.0",
    metrics: {
      totalRequests: global.totalRequests,
      errorRate: global.errorRate,
      memoryMB: Math.round(global.memoryUsage.heapUsed / 1024 / 1024),
      activeRoutes: global.routeCount,
    },
  };
}
