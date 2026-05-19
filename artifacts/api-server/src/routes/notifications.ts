import { Router } from "express";
import { db } from "@workspace/db";
import { notificationsTable, usersTable } from "@workspace/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// GET /api/notifications
router.get("/", requireAuth, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const unreadOnly = req.query.unreadOnly === "true";

  const conditions = [eq(notificationsTable.userId, req.userId!)];
  if (unreadOnly) conditions.push(eq(notificationsTable.isRead, false));

  const notifications = await db.query.notificationsTable.findMany({
    where: and(...conditions),
    with: { actor: true },
    orderBy: [desc(notificationsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = notifications.length > limit;
  const data = notifications.slice(0, limit);

  const unreadCount = (await db.select({ count: sql<number>`count(*)::int` }).from(notificationsTable)
    .where(and(eq(notificationsTable.userId, req.userId!), eq(notificationsTable.isRead, false))))[0].count;

  res.json({ data, total: data.length, unreadCount, page, limit, hasMore });
});

// POST /api/notifications/read-all
router.post("/read-all", requireAuth, async (req, res) => {
  await db.update(notificationsTable).set({ isRead: true }).where(eq(notificationsTable.userId, req.userId!));
  res.json({ success: true });
});

// PATCH /api/notifications/:id/read
router.patch("/:id/read", requireAuth, async (req, res) => {
  await db.update(notificationsTable).set({ isRead: true })
    .where(and(eq(notificationsTable.id, parseInt(req.params.id as string)), eq(notificationsTable.userId, req.userId!)));
  res.json({ success: true });
});

export default router;
