import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, postsTable, userFollowsTable, communitiesTable, communityMembersTable, notificationsTable } from "@workspace/db/schema";
import { eq, desc, and, sql, ilike } from "drizzle-orm";
import { requireAuth, optionalAuth } from "../middlewares/auth";

const router = Router();

// GET /api/users/suggested
router.get("/suggested", requireAuth, async (req, res) => {
  const follows = await db.select().from(userFollowsTable).where(eq(userFollowsTable.followerId, req.userId!));
  const followingIds = follows.map(f => f.followingId);
  followingIds.push(req.userId!);

  const suggested = await db.select().from(usersTable)
    .where(sql`${usersTable.id} NOT IN (${sql.raw(followingIds.join(",") || "0")})`)
    .orderBy(desc(usersTable.karma))
    .limit(5);

  res.json(suggested.map(({ supabaseId, ...u }) => u));
});

// GET /api/users/:username
router.get("/:username", optionalAuth, async (req, res) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.username, req.params.username as string));
  if (!user) { res.status(404).json({ error: "User not found" }); return; }

  const followerCount = await db.select({ count: sql<number>`count(*)::int` }).from(userFollowsTable).where(eq(userFollowsTable.followingId, user.id));
  const followingCount = await db.select({ count: sql<number>`count(*)::int` }).from(userFollowsTable).where(eq(userFollowsTable.followerId, user.id));

  let isFollowedByMe = false;
  if (req.userId) {
    const [follow] = await db.select().from(userFollowsTable).where(and(eq(userFollowsTable.followerId, req.userId), eq(userFollowsTable.followingId, user.id)));
    isFollowedByMe = !!follow;
  }

  const { supabaseId, ...safe } = user;
  res.json({ ...safe, followerCount: followerCount[0].count, followingCount: followingCount[0].count, isFollowedByMe });
});

// GET /api/users/:username/posts
router.get("/:username/posts", optionalAuth, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const [user] = await db.select().from(usersTable).where(eq(usersTable.username, req.params.username as string));
  if (!user) { res.status(404).json({ error: "Not found" }); return; }

  const posts = await db.query.postsTable.findMany({
    where: and(eq(postsTable.authorId, user.id), eq(postsTable.isDeleted, false)),
    with: { author: true, community: true },
    orderBy: [desc(postsTable.createdAt)],
    limit,
    offset: (page - 1) * limit,
  });

  const total = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable)
    .where(and(eq(postsTable.authorId, user.id), eq(postsTable.isDeleted, false)));

  res.json({ data: posts.map(p => ({ ...p, myVote: 0, isSaved: false })), total: total[0].count, page, limit, hasMore: page * limit < total[0].count });
});

// POST /api/users/:username/follow
router.post("/:username/follow", requireAuth, async (req, res) => {
  const [target] = await db.select().from(usersTable).where(eq(usersTable.username, req.params.username as string));
  if (!target) { res.status(404).json({ error: "Not found" }); return; }
  await db.insert(userFollowsTable).values({ followerId: req.userId!, followingId: target.id }).onConflictDoNothing();
  await db.update(usersTable).set({ karma: sql`${usersTable.karma} + 1` }).where(eq(usersTable.id, target.id));
  
  // Notify target user
  const [follower] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!));
  if (follower) {
    await db.insert(notificationsTable).values({
      type: "follow",
      message: `${follower.username} started following you`,
      userId: target.id,
      actorId: req.userId,
    }).onConflictDoNothing();
  }
  
  res.json({ success: true });
});

// DELETE /api/users/:username/follow
router.delete("/:username/follow", requireAuth, async (req, res) => {
  const [target] = await db.select().from(usersTable).where(eq(usersTable.username, req.params.username as string));
  if (!target) { res.status(404).json({ error: "Not found" }); return; }
  await db.delete(userFollowsTable).where(and(eq(userFollowsTable.followerId, req.userId!), eq(userFollowsTable.followingId, target.id)));
  res.json({ success: true });
});

// PATCH /api/users/profile (Alias for /api/auth/profile)
router.patch("/profile", requireAuth, async (req, res) => {
  try {
    const { username, bio, avatarUrl, bannerUrl, socialLinks } = req.body;
    const updates: any = {};
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
    if (bannerUrl !== undefined) updates.bannerUrl = bannerUrl;
    if (socialLinks !== undefined) updates.socialLinks = typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks);
    
    if (Object.keys(updates).length === 0) {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, req.userId!),
      });
      return res.json(user);
    }

    const [user] = await db.update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, req.userId!))
      .returning();
      
    return res.json(user);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Username is already taken" });
    }
    return res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
