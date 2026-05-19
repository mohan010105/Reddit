import { Router } from "express";
import { db } from "@workspace/db";
import { 
  usersTable, postsTable, communitiesTable, reportsTable, commentsTable, 
  adminLogsTable, aiModerationLogsTable, moderationActionsTable, platformSettingsTable 
} from "@workspace/db/schema";
import { eq, and, desc, sql, gte, ilike, or } from "drizzle-orm";
import { requireAuth, requireAdmin, requireSuperAdmin, requireModerator, requirePermission } from "../middlewares/auth";
import { logAdminAction, getAdminLogs } from "../services/adminLogService";
import { moderateContent, getAIModerationLogs, getFlaggedContent, reviewModerationLog } from "../services/aiModerationService";
import { getOverviewAnalytics, getDailyActivity, getUserAnalytics, getPostAnalytics, getCommunityAnalytics, getRealtimeMetrics } from "../services/analyticsService";

const router = Router();
router.use(requireAuth, requireModerator);

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/stats", async (req, res) => {
  try {
    const overview = await getOverviewAnalytics();
    const dailyStats = await getDailyActivity(30);
    res.json({ ...overview, dailyStats });
  } catch (err: any) {
    req.log.error({ err }, "Failed to get admin stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// USER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/users", requirePermission("manage_users"), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const status = req.query.status as string; // 'active' | 'banned' | 'muted'

    const conditions = [];
    if (search) {
      conditions.push(or(
        ilike(usersTable.username, `%${search}%`),
        ilike(usersTable.email, `%${search}%`)
      ));
    }
    if (role) conditions.push(eq(usersTable.role, role as any));
    if (status === "banned") conditions.push(eq(usersTable.isBanned, true));
    if (status === "active") conditions.push(eq(usersTable.isBanned, false));

    const users = await db.select().from(usersTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit + 1).offset((page - 1) * limit);

    const hasMore = users.length > limit;
    const data = users.slice(0, limit).map(({ supabaseId, ...u }) => u);

    // Get total count for this filter
    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` })
      .from(usersTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    res.json({ data, hasMore, page, limit, total: totalResult.count });
  } catch (err: any) {
    req.log.error({ err }, "Failed to list users");
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.patch("/users/:username/role", requirePermission("manage_roles"), async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "moderator", "admin", "super_admin"].includes(role)) {
      res.status(400).json({ error: "Invalid role" }); return;
    }
    const [user] = await db.update(usersTable).set({ role }).where(eq(usersTable.username, req.params.username as string)).returning();
    if (!user) { res.status(404).json({ error: "Not found" }); return; }
    
    await logAdminAction(req, "change_role", "user", user.id, { newRole: role, username: user.username });
    
    const { supabaseId, ...safe } = user;
    res.json(safe);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

router.post("/users/:username/ban", requirePermission("manage_users"), async (req, res) => {
  try {
    const { banned, reason, duration } = req.body; // duration in hours, null = permanent
    
    let banExpiresAt: Date | null = null;
    if (banned && duration) {
      banExpiresAt = new Date(Date.now() + duration * 3600_000);
    }
    
    const [user] = await db.update(usersTable).set({ 
      isBanned: banned, 
      banReason: banned ? (reason || null) : null,
      banExpiresAt,
    }).where(eq(usersTable.username, req.params.username as string)).returning();
    
    if (!user) { res.status(404).json({ error: "Not found" }); return; }
    
    await logAdminAction(req, banned ? "ban_user" : "unban_user", "user", user.id, { 
      username: user.username, reason, duration 
    });
    
    const { supabaseId, ...safe } = user;
    res.json(safe);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to ban/unban user" });
  }
});

router.post("/users/:username/shadow-ban", requirePermission("manage_users"), async (req, res) => {
  try {
    const { shadowBanned } = req.body;
    const [user] = await db.update(usersTable).set({ isShadowBanned: shadowBanned })
      .where(eq(usersTable.username, req.params.username as string)).returning();
    if (!user) { res.status(404).json({ error: "Not found" }); return; }
    
    await logAdminAction(req, shadowBanned ? "shadow_ban" : "unshadow_ban", "user", user.id, { username: user.username });
    
    const { supabaseId, ...safe } = user;
    res.json(safe);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to shadow ban user" });
  }
});

router.post("/users/:username/mute", requirePermission("manage_users"), async (req, res) => {
  try {
    const { duration } = req.body; // in hours
    const mutedUntil = duration ? new Date(Date.now() + duration * 3600_000) : null;
    
    const [user] = await db.update(usersTable).set({ mutedUntil })
      .where(eq(usersTable.username, req.params.username as string)).returning();
    if (!user) { res.status(404).json({ error: "Not found" }); return; }
    
    await logAdminAction(req, mutedUntil ? "mute_user" : "unmute_user", "user", user.id, { username: user.username, duration });
    
    const { supabaseId, ...safe } = user;
    res.json(safe);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to mute user" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// POST MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const status = req.query.status as string; // 'all' | 'featured' | 'pinned' | 'flagged' | 'deleted'

    const conditions = [];
    if (search) conditions.push(ilike(postsTable.title, `%${search}%`));
    if (status === "featured") conditions.push(eq(postsTable.isFeatured, true));
    if (status === "pinned") conditions.push(eq(postsTable.isPinned, true));
    if (status === "flagged") conditions.push(eq(postsTable.moderationStatus, "flagged"));
    if (status === "deleted") conditions.push(eq(postsTable.isDeleted, true));
    if (status !== "deleted" && status !== "all") conditions.push(eq(postsTable.isDeleted, false));

    const posts = await db.query.postsTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: { author: true, community: true },
      orderBy: [desc(postsTable.createdAt)],
      limit: limit + 1,
      offset: (page - 1) * limit,
    });

    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` })
      .from(postsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const hasMore = posts.length > limit;
    const data = posts.slice(0, limit).map(p => ({ ...p, myVote: 0, isSaved: false }));
    res.json({ data, hasMore, page, limit, total: totalResult.count });
  } catch (err: any) {
    req.log.error({ err }, "Failed to list admin posts");
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.patch("/posts/:id/moderate", requirePermission("delete_posts"), async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const { action } = req.body; // 'approve' | 'reject' | 'feature' | 'unfeature' | 'pin' | 'unpin' | 'delete' | 'restore' | 'archive'

    const updates: Record<string, any> = {};
    let logAction: string = action;

    switch (action) {
      case "approve":
        updates.isApproved = true;
        updates.moderationStatus = "approved";
        logAction = "approve_post";
        break;
      case "reject":
        updates.isApproved = false;
        updates.moderationStatus = "rejected";
        logAction = "reject_post";
        break;
      case "feature":
        updates.isFeatured = true;
        logAction = "feature_post";
        break;
      case "unfeature":
        updates.isFeatured = false;
        logAction = "unfeature_post";
        break;
      case "pin":
        updates.isPinned = true;
        logAction = "pin_post";
        break;
      case "unpin":
        updates.isPinned = false;
        logAction = "unpin_post";
        break;
      case "delete":
        updates.isDeleted = true;
        logAction = "delete_post";
        break;
      case "restore":
        updates.isDeleted = false;
        logAction = "restore_post";
        break;
      case "archive":
        updates.isDeleted = true;
        logAction = "archive_post";
        break;
      default:
        res.status(400).json({ error: "Invalid action" }); return;
    }

    const [post] = await db.update(postsTable).set(updates).where(eq(postsTable.id, id)).returning();
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }

    await logAdminAction(req, logAction as any, "post", id, { action, title: post.title });

    // Log moderation action
    await db.insert(moderationActionsTable).values({
      moderatorId: req.userId!,
      targetType: "post",
      targetId: id,
      action,
      reason: req.body.reason,
    });

    res.json(post);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to moderate post" });
  }
});

// Bulk post moderation
router.post("/posts/bulk", requirePermission("delete_posts"), async (req, res) => {
  try {
    const { ids, action } = req.body; // ids: number[], action: string
    if (!Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ error: "No post IDs provided" }); return;
    }

    const updates: Record<string, any> = {};
    switch (action) {
      case "delete": updates.isDeleted = true; break;
      case "restore": updates.isDeleted = false; break;
      case "approve": updates.isApproved = true; updates.moderationStatus = "approved"; break;
      case "reject": updates.isApproved = false; updates.moderationStatus = "rejected"; break;
      default: res.status(400).json({ error: "Invalid action" }); return;
    }

    for (const id of ids) {
      await db.update(postsTable).set(updates).where(eq(postsTable.id, id));
    }

    await logAdminAction(req, "bulk_action", "post", undefined, { action, count: ids.length, ids });
    
    res.json({ success: true, affected: ids.length });
  } catch (err: any) {
    res.status(500).json({ error: "Bulk action failed" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// COMMENT MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/comments", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;

    const conditions = [];
    if (search) conditions.push(ilike(commentsTable.content, `%${search}%`));

    const comments = await db.query.commentsTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: { author: true, post: true },
      orderBy: [desc(commentsTable.createdAt)],
      limit: limit + 1,
      offset: (page - 1) * limit,
    });

    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` })
      .from(commentsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const hasMore = comments.length > limit;
    const data = comments.slice(0, limit);
    res.json({ data, hasMore, page, limit, total: totalResult.count });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.patch("/comments/:id/moderate", requirePermission("moderate_comments"), async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const { action, reason } = req.body; // 'delete' | 'restore'

    if (action === "delete") {
      await db.update(commentsTable).set({ isDeleted: true }).where(eq(commentsTable.id, id));
      await logAdminAction(req, "delete_comment", "comment", id, { reason });
    } else if (action === "restore") {
      await db.update(commentsTable).set({ isDeleted: false }).where(eq(commentsTable.id, id));
    }

    await db.insert(moderationActionsTable).values({
      moderatorId: req.userId!,
      targetType: "comment",
      targetId: id,
      action,
      reason,
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to moderate comment" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// COMMUNITY MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/communities", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;

    const conditions = [];
    if (search) conditions.push(or(
      ilike(communitiesTable.name, `%${search}%`),
      ilike(communitiesTable.slug, `%${search}%`)
    ));

    const communities = await db.query.communitiesTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: { creator: true },
      orderBy: [desc(communitiesTable.memberCount)],
      limit: limit + 1,
      offset: (page - 1) * limit,
    });

    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` })
      .from(communitiesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const hasMore = communities.length > limit;
    const data = communities.slice(0, limit);
    res.json({ data, hasMore, page, limit, total: totalResult.count });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch communities" });
  }
});

router.delete("/communities/:id", requirePermission("approve_communities"), async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    await db.delete(communitiesTable).where(eq(communitiesTable.id, id));
    await logAdminAction(req, "delete_community", "community", id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete community" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// REPORTS MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/reports", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = (req.query.status as string) || "pending";

    const conditions = [];
    if (status !== "all") conditions.push(eq(reportsTable.status, status as any));

    const reports = await db.query.reportsTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: { reporter: true, post: true, comment: true },
      orderBy: [desc(reportsTable.createdAt)],
      limit: limit + 1,
      offset: (page - 1) * limit,
    });

    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` })
      .from(reportsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const hasMore = reports.length > limit;
    const data = reports.slice(0, limit).map(r => ({
      ...r,
      reporter: r.reporter ? (({ supabaseId, ...u }) => u)(r.reporter) : null,
    }));
    res.json({ data, hasMore, page, limit, total: totalResult.count });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

router.patch("/reports/:id/resolve", requirePermission("handle_reports"), async (req, res) => {
  try {
    const { status, note, action: contentAction } = req.body; // status: 'resolved' | 'dismissed'
    const id = parseInt(req.params.id as string);

    const [report] = await db.update(reportsTable).set({
      status,
      resolvedBy: req.userId!,
      resolutionNote: note,
    }).where(eq(reportsTable.id, id)).returning();

    if (!report) { res.status(404).json({ error: "Not found" }); return; }

    // Optionally take action on reported content
    if (contentAction === "delete_post" && report.postId) {
      await db.update(postsTable).set({ isDeleted: true }).where(eq(postsTable.id, report.postId));
      await logAdminAction(req, "delete_post", "post", report.postId, { fromReport: id });
    } else if (contentAction === "delete_comment" && report.commentId) {
      await db.update(commentsTable).set({ isDeleted: true }).where(eq(commentsTable.id, report.commentId));
      await logAdminAction(req, "delete_comment", "comment", report.commentId, { fromReport: id });
    } else if (contentAction === "ban_user" && report.reportedUserId) {
      await db.update(usersTable).set({ isBanned: true, banReason: `From report #${id}` })
        .where(eq(usersTable.id, report.reportedUserId));
      await logAdminAction(req, "ban_user", "user", report.reportedUserId, { fromReport: id });
    }

    await logAdminAction(req, status === "resolved" ? "resolve_report" : "dismiss_report", "report", id, { note });

    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to resolve report" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/analytics/overview", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const overview = await getOverviewAnalytics();
    res.json(overview);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.get("/analytics/daily", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const data = await getDailyActivity(Math.min(days, 90));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch daily analytics" });
  }
});

router.get("/analytics/users", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const data = await getUserAnalytics();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch user analytics" });
  }
});

router.get("/analytics/posts", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const data = await getPostAnalytics();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch post analytics" });
  }
});

router.get("/analytics/communities", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const data = await getCommunityAnalytics();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch community analytics" });
  }
});

router.get("/analytics/realtime", async (req, res) => {
  try {
    const data = await getRealtimeMetrics();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch realtime metrics" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// AI MODERATION
// ═══════════════════════════════════════════════════════════════════════════════
router.post("/ai/moderate", requirePermission("ai_moderation"), async (req, res) => {
  try {
    const { contentType, contentId, text } = req.body;
    if (!contentType || !contentId || !text) {
      res.status(400).json({ error: "Missing required fields" }); return;
    }
    const result = await moderateContent(contentType, contentId, text);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: "AI moderation failed" });
  }
});

router.get("/ai/logs", requirePermission("ai_moderation"), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const contentType = req.query.contentType as string;
    const data = await getAIModerationLogs({ page, limit, status, contentType });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch AI logs" });
  }
});

router.get("/ai/flagged", requirePermission("ai_moderation"), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const data = await getFlaggedContent({ page, limit });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch flagged content" });
  }
});

router.patch("/ai/review/:id", requirePermission("ai_moderation"), async (req, res) => {
  try {
    const { approved } = req.body;
    const log = await reviewModerationLog(parseInt(req.params.id as string), req.userId!, approved);
    if (!log) { res.status(404).json({ error: "Log not found" }); return; }
    res.json(log);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to review moderation log" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN LOGS
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/logs", requirePermission("manage_analytics"), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const action = req.query.action as string;
    const targetType = req.query.targetType as string;
    const data = await getAdminLogs({ page, limit, action, targetType });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// PLATFORM SETTINGS
// ═══════════════════════════════════════════════════════════════════════════════
router.get("/settings", requirePermission("edit_settings"), async (req, res) => {
  try {
    const settings = await db.select().from(platformSettingsTable);
    const map: Record<string, any> = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json(map);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.put("/settings", requirePermission("edit_settings"), async (req, res) => {
  try {
    const updates = req.body; // { key: value, ... }
    for (const [key, value] of Object.entries(updates)) {
      await db.insert(platformSettingsTable).values({
        key,
        value: value as any,
        updatedBy: req.userId!,
      }).onConflictDoUpdate({
        target: platformSettingsTable.key,
        set: { value: value as any, updatedBy: req.userId! },
      });
    }
    await logAdminAction(req, "update_settings", undefined, undefined, { keys: Object.keys(updates) });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

export default router;
