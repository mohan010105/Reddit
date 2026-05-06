import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, postsTable, communitiesTable, reportsTable, commentsTable } from "@workspace/db/schema";
import { eq, and, desc, sql, gte } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const router = Router();
router.use(requireAuth, requireAdmin);

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  const [totalUsers] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable);
  const [totalPosts] = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(eq(postsTable.isDeleted, false));
  const [totalCommunities] = await db.select({ count: sql<number>`count(*)::int` }).from(communitiesTable);
  const [pendingReports] = await db.select({ count: sql<number>`count(*)::int` }).from(reportsTable).where(eq(reportsTable.status, "pending"));

  // Daily stats for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyPosts = await db.execute(sql`
    SELECT DATE(created_at) as date, COUNT(*)::int as posts
    FROM posts WHERE created_at >= ${thirtyDaysAgo.toISOString()} AND is_deleted = false
    GROUP BY DATE(created_at) ORDER BY date
  `);

  const dailyComments = await db.execute(sql`
    SELECT DATE(created_at) as date, COUNT(*)::int as comments
    FROM comments WHERE created_at >= ${thirtyDaysAgo.toISOString()}
    GROUP BY DATE(created_at) ORDER BY date
  `);

  const dateMap = new Map<string, { date: string; posts: number; comments: number }>();
  (dailyPosts.rows as any[]).forEach(r => dateMap.set(r.date, { date: r.date, posts: r.posts, comments: 0 }));
  (dailyComments.rows as any[]).forEach(r => {
    const existing = dateMap.get(r.date) || { date: r.date, posts: 0, comments: 0 };
    dateMap.set(r.date, { ...existing, comments: r.comments });
  });
  const dailyStats = Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  res.json({
    totalUsers: totalUsers.count, totalPosts: totalPosts.count,
    totalCommunities: totalCommunities.count, pendingReports: pendingReports.count,
    dailyStats
  });
});

// GET /api/admin/users
router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const users = await db.select().from(usersTable)
    .orderBy(desc(usersTable.createdAt))
    .limit(limit + 1).offset((page - 1) * limit);

  const hasMore = users.length > limit;
  const data = users.slice(0, limit).map(({ supabaseId, ...u }) => u);

  res.json({ data, hasMore, page, limit });
});

// PATCH /api/admin/users/:username/role
router.patch("/users/:username/role", async (req, res) => {
  const { role } = req.body;
  const [user] = await db.update(usersTable).set({ role }).where(eq(usersTable.username, req.params.username)).returning();
  if (!user) { res.status(404).json({ error: "Not found" }); return; }
  const { supabaseId, ...safe } = user;
  res.json(safe);
});

// POST /api/admin/users/:username/ban
router.post("/users/:username/ban", async (req, res) => {
  const { banned } = req.body;
  const [user] = await db.update(usersTable).set({ isBanned: banned }).where(eq(usersTable.username, req.params.username)).returning();
  if (!user) { res.status(404).json({ error: "Not found" }); return; }
  const { supabaseId, ...safe } = user;
  res.json(safe);
});

// GET /api/admin/reports
router.get("/reports", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = (req.query.status as string) || "pending";

  const reports = await db.query.reportsTable.findMany({
    where: eq(reportsTable.status, status as any),
    with: { reporter: true },
    orderBy: [desc(reportsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = reports.length > limit;
  const data = reports.slice(0, limit).map(r => ({ ...r, reporter: r.reporter ? (({ supabaseId, ...u }) => u)(r.reporter) : null }));
  res.json({ data, hasMore, page, limit });
});

// PATCH /api/admin/reports/:id/resolve
router.patch("/reports/:id/resolve", async (req, res) => {
  const { status } = req.body;
  const [report] = await db.update(reportsTable).set({ status }).where(eq(reportsTable.id, parseInt(req.params.id))).returning();
  if (!report) { res.status(404).json({ error: "Not found" }); return; }
  res.json(report);
});

// GET /api/admin/posts
router.get("/posts", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const posts = await db.query.postsTable.findMany({
    with: { author: true, community: true },
    orderBy: [desc(postsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = posts.length > limit;
  const data = posts.slice(0, limit).map(p => ({ ...p, myVote: 0, isSaved: false }));
  res.json({ data, hasMore, page, limit });
});

export default router;
