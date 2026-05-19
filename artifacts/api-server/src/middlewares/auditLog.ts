/**
 * Audit Logging Middleware
 * Logs security-sensitive actions for compliance and monitoring
 */
import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

interface AuditEntry {
  timestamp: string;
  action: string;
  userId: string | null;
  ip: string;
  method: string;
  path: string;
  statusCode: number;
  userAgent: string;
  details?: Record<string, unknown>;
}

// In-memory audit log (in production, this would go to a database or log service)
const auditLog: AuditEntry[] = [];
const MAX_AUDIT_ENTRIES = 10000;

// Routes that should be audited
const AUDITED_PATTERNS = [
  { pattern: /^\/api\/auth/, action: "auth" },
  { pattern: /^\/api\/admin/, action: "admin" },
  { pattern: /^\/api\/users\/.*\/role/, action: "role_change" },
  { pattern: /^\/api\/users\/.*\/ban/, action: "user_ban" },
  { pattern: /^\/api\/posts\/.*\/delete/, action: "content_delete" },
  { pattern: /^\/api\/communities\/.*\/settings/, action: "community_settings" },
  { pattern: /^\/api\/payments/, action: "payment" },
  { pattern: /^\/api\/storage/, action: "file_upload" },
];

export function auditLogMiddleware(req: Request, res: Response, next: NextFunction) {
  // Only audit write operations and auth
  const isWriteOp = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
  const isAuthEndpoint = req.path.startsWith("/api/auth");
  
  if (!isWriteOp && !isAuthEndpoint) {
    next();
    return;
  }

  // Check if this path should be audited
  const match = AUDITED_PATTERNS.find((p) => p.pattern.test(req.path));
  if (!match && !isWriteOp) {
    next();
    return;
  }

  res.on("finish", () => {
    const entry: AuditEntry = {
      timestamp: new Date().toISOString(),
      action: match?.action || `${req.method.toLowerCase()}_request`,
      userId: (req as any).userId || null,
      ip: req.ip || "unknown",
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      userAgent: (req.headers["user-agent"] || "").slice(0, 100),
    };

    // Add details for specific actions
    if (match?.action === "auth") {
      entry.details = { endpoint: req.path.split("/").pop() };
    }
    if (match?.action === "admin") {
      entry.details = { adminAction: req.path.replace("/api/admin/", "") };
    }
    if (match?.action === "payment") {
      entry.details = { paymentEndpoint: req.path.replace("/api/payments/", "") };
    }

    // Store in memory
    auditLog.push(entry);
    if (auditLog.length > MAX_AUDIT_ENTRIES) {
      auditLog.splice(0, auditLog.length - MAX_AUDIT_ENTRIES);
    }

    // Log security-sensitive events
    if (res.statusCode === 401 || res.statusCode === 403) {
      logger.warn({ audit: entry }, "Security: unauthorized access attempt");
    }
    if (match?.action === "admin") {
      logger.info({ audit: entry }, "Admin action performed");
    }
    if (match?.action === "role_change" || match?.action === "user_ban") {
      logger.info({ audit: entry }, "User moderation action");
    }
  });

  next();
}

// ─── Query Audit Log ──────────────────────────────────────
export function getAuditLog(options: {
  limit?: number;
  action?: string;
  userId?: string;
  since?: string;
} = {}) {
  let filtered = [...auditLog];

  if (options.action) {
    filtered = filtered.filter((e) => e.action === options.action);
  }
  if (options.userId) {
    filtered = filtered.filter((e) => e.userId === options.userId);
  }
  if (options.since) {
    const sinceDate = new Date(options.since).getTime();
    filtered = filtered.filter((e) => new Date(e.timestamp).getTime() >= sinceDate);
  }

  return filtered.slice(-(options.limit || 100)).reverse();
}

// ─── Suspicious Activity Detector ─────────────────────────
const failedLoginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function trackFailedLogin(ip: string) {
  const entry = failedLoginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  entry.count++;
  entry.lastAttempt = Date.now();
  failedLoginAttempts.set(ip, entry);

  if (entry.count >= 5) {
    logger.warn({ ip, attempts: entry.count }, "Brute force attempt detected");
  }

  // Cleanup old entries
  if (failedLoginAttempts.size > 10000) {
    const cutoff = Date.now() - 3600000; // 1 hour
    for (const [key, val] of failedLoginAttempts) {
      if (val.lastAttempt < cutoff) failedLoginAttempts.delete(key);
    }
  }
}

export function isIPBlocked(ip: string): boolean {
  const entry = failedLoginAttempts.get(ip);
  if (!entry) return false;
  // Block for 15 minutes after 10 failed attempts
  if (entry.count >= 10 && Date.now() - entry.lastAttempt < 900000) {
    return true;
  }
  return false;
}

export function clearFailedAttempts(ip: string) {
  failedLoginAttempts.delete(ip);
}
