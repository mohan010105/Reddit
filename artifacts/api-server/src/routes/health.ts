import { Router } from "express";
import { getHealthWithMetrics, metrics } from "../lib/monitoring";
import { getAuditLog } from "../middlewares/auditLog";

const router = Router();

// Basic health check
router.get("/health", (_req, res) => {
  res.json(getHealthWithMetrics());
});

// Detailed metrics endpoint (admin only in production)
router.get("/health/metrics", (req, res) => {
  // In production, this should be behind auth
  const data = {
    global: metrics.getGlobalMetrics(),
    slowRoutes: metrics.getTopSlowRoutes(5),
    errorRoutes: metrics.getTopErrorRoutes(5),
  };
  res.json(data);
});

// Audit log endpoint (admin only)
router.get("/health/audit", (req, res) => {
  const { limit, action, userId, since } = req.query;
  const logs = getAuditLog({
    limit: limit ? parseInt(limit as string) : 50,
    action: action as string | undefined,
    userId: userId as string | undefined,
    since: since as string | undefined,
  });
  res.json({ data: logs, total: logs.length });
});

export default router;
