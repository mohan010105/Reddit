import { db } from "@workspace/db";
import { adminLogsTable } from "@workspace/db/schema";
import { desc, eq, sql, and, gte } from "drizzle-orm";
import type { Request } from "express";

type AdminAction = typeof adminLogsTable.$inferInsert["action"];

export async function logAdminAction(
  req: Request,
  action: AdminAction,
  targetType?: string,
  targetId?: number,
  details?: Record<string, any>
) {
  try {
    await db.insert(adminLogsTable).values({
      action,
      adminId: req.userId!,
      targetType,
      targetId,
      details,
      ipAddress: req.ip || req.socket.remoteAddress || "unknown",
    });
  } catch (err) {
    // Non-critical — don't crash the request
    console.error("Failed to log admin action:", err);
  }
}

export async function getAdminLogs(options: {
  page?: number;
  limit?: number;
  action?: string;
  adminId?: number;
  targetType?: string;
  since?: Date;
}) {
  const { page = 1, limit = 50, action, adminId, targetType, since } = options;
  
  const conditions = [];
  if (action) conditions.push(eq(adminLogsTable.action, action as any));
  if (adminId) conditions.push(eq(adminLogsTable.adminId, adminId));
  if (targetType) conditions.push(eq(adminLogsTable.targetType, targetType));
  if (since) conditions.push(gte(adminLogsTable.createdAt, since));

  const logs = await db.query.adminLogsTable.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    with: { admin: true },
    orderBy: [desc(adminLogsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = logs.length > limit;
  const data = logs.slice(0, limit).map(log => ({
    ...log,
    admin: log.admin ? { id: log.admin.id, username: log.admin.username, avatarUrl: log.admin.avatarUrl } : null,
  }));

  return { data, hasMore, page, limit };
}
