import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable, postVotesTable, savedPostsTable, reportsTable, commentsTable, usersTable, communitiesTable, notificationsTable } from "@workspace/db/schema";
import { eq, desc, and, sql, asc, inArray } from "drizzle-orm";
import { requireAuth, optionalAuth } from "../middlewares/auth";
import { redis } from "../lib/redis";
import { aiService } from "../lib/ai";
import { recommendationEngine } from "../lib/recommendation";
import { analyticsEngine } from "../lib/analytics";
import { logger } from "../lib/logger";

const router = Router();

function hotScore(upvotes: number, downvotes: number, createdAt: Date): number {
  const score = upvotes - downvotes;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  const seconds = (createdAt.getTime() / 1000) - 1134028003;
  return sign * order + seconds / 45000;
}

// GET /api/posts
router.get("/", optionalAuth, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const sort = (req.query.sort as string) || "hot";
  const communityId = req.query.communityId ? parseInt(req.query.communityId as string) : undefined;

  const cacheKey = `posts:v2:${communityId || "all"}:${sort}:${page}:${limit}`;

  try {
    const result = await redis.swr(cacheKey, async () => {
      const orderBy = sort === "new" ? [desc(postsTable.createdAt)] :
        sort === "top" ? [desc(postsTable.score)] :
        [
          desc(sql`SIGN(${postsTable.score}) * LOG10(GREATEST(ABS(${postsTable.score}), 1)) + (EXTRACT(EPOCH FROM ${postsTable.createdAt}) - 1134028003) / 45000`),
          desc(postsTable.createdAt)
        ];

      const conditions = [eq(postsTable.isDeleted, false)];
      if (communityId) conditions.push(eq(postsTable.communityId, communityId));

      const posts = await db.query.postsTable.findMany({
        where: and(...conditions),
        with: { author: true, community: true },
        orderBy,
        limit: limit + 1,
        offset: (page - 1) * limit,
      });

      const totalResult = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(and(...conditions));
      
      return {
        posts,
        total: totalResult[0].count
      };
    }, 60);

    const hasMore = result.posts.length > limit;
    const data = result.posts.slice(0, limit);

    // Personalization & Tracking
    if (req.userId) {
      analyticsEngine.trackActiveUser(req.userId);
    }

    let myVotes: Map<number, number> = new Map();
    let mySaved: Set<number> = new Set();

    if (req.userId && data.length > 0) {
      const votes = await db.select().from(postVotesTable)
        .where(and(eq(postVotesTable.userId, req.userId), inArray(postVotesTable.postId, data.map(p => p.id))));
      votes.forEach(v => myVotes.set(v.postId, v.value));

      const saved = await db.select().from(savedPostsTable)
        .where(and(eq(savedPostsTable.userId, req.userId), inArray(savedPostsTable.postId, data.map(p => p.id))));
      saved.forEach(s => mySaved.add(s.postId));
    }

    const finalData = data.map(p => ({ 
      ...p, 
      myVote: myVotes.get(p.id) ?? 0, 
      isSaved: mySaved.has(p.id) 
    }));

    // Apply recommendation engine ranking if personalized feed requested
    let responseData = finalData;
    if (req.userId && sort === "personalized") {
       responseData = await recommendationEngine.getPersonalizedFeed(req.userId, finalData);
    }

    res.json({
      data: responseData,
      total: result.total, 
      page, 
      limit, 
      hasMore
    });
  } catch (err) {
    logger.error({ err }, "Failed to fetch posts");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/posts
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content, imageUrl, type, communityId } = req.body;
    if (!title || !communityId) { res.status(400).json({ error: "Title and communityId are required" }); return; }

    const [post] = await db.insert(postsTable).values({
      title, content: content || null, imageUrl: imageUrl || null, type: type || "text",
      authorId: req.userId!, communityId: parseInt(communityId.toString())
    }).returning();

    await db.update(communitiesTable).set({ postCount: sql`${communitiesTable.postCount} + 1` })
      .where(eq(communitiesTable.id, post.communityId));
    await db.update(usersTable).set({ postCount: sql`${usersTable.postCount} + 1`, karma: sql`${usersTable.karma} + 1` })
      .where(eq(usersTable.id, req.userId!));

    const [full] = await db.query.postsTable.findMany({
      where: eq(postsTable.id, post.id),
      with: { author: true, community: true },
      limit: 1,
    });

    res.status(201).json({ ...full, myVote: 0, isSaved: false });
  } catch (err: any) {
    console.error("Create post error:", err);
    res.status(500).json({ error: "Failed to create post", details: err.message });
  }
});


// GET /api/posts/:id
router.get("/:id", optionalAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  const [post] = await db.query.postsTable.findMany({
    where: eq(postsTable.id, id),
    with: { author: true, community: true },
    limit: 1,
  });

  if (!post) { res.status(404).json({ error: "Not found" }); return; }

  let myVote = 0, isSaved = false;
  if (req.userId) {
    const [v] = await db.select().from(postVotesTable).where(and(eq(postVotesTable.postId, id), eq(postVotesTable.userId, req.userId)));
    if (v) myVote = v.value;
    const [s] = await db.select().from(savedPostsTable).where(and(eq(savedPostsTable.postId, id), eq(savedPostsTable.userId, req.userId)));
    isSaved = !!s;
  }

  const summary = await aiService.summarizeContent(post.content || "", id.toString());
  res.json({ ...post, myVote, isSaved, aiSummary: summary });
});

// PATCH /api/posts/:id
router.patch("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id));
  if (!post) { res.status(404).json({ error: "Not found" }); return; }
  if (post.authorId !== req.userId && req.userRole !== "admin") { res.status(403).json({ error: "Forbidden" }); return; }

  const { title, content } = req.body;
  const [updated] = await db.update(postsTable).set({ title, content }).where(eq(postsTable.id, id)).returning();
  const [full] = await db.query.postsTable.findMany({
    where: eq(postsTable.id, id), with: { author: true, community: true }, limit: 1
  });
  res.json({ ...full, myVote: 0, isSaved: false });
});

// DELETE /api/posts/:id
router.delete("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id));
  if (!post) { res.status(404).json({ error: "Not found" }); return; }
  if (post.authorId !== req.userId && req.userRole !== "admin") { res.status(403).json({ error: "Forbidden" }); return; }
  await db.update(postsTable).set({ isDeleted: true }).where(eq(postsTable.id, id));
  res.status(204).send();
});

// POST /api/posts/:id/vote
router.post("/:id/vote", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  const value = parseInt(req.body.value) as 1 | 0 | -1;

  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id));
  if (!post) { res.status(404).json({ error: "Not found" }); return; }

  const [existing] = await db.select().from(postVotesTable).where(and(eq(postVotesTable.postId, id), eq(postVotesTable.userId, req.userId!)));

  if (value === 0) {
    if (existing) {
      await db.delete(postVotesTable).where(eq(postVotesTable.id, existing.id));
      const delta = -existing.value;
      await db.update(postsTable).set({
        upvotes: sql`${postsTable.upvotes} + ${delta > 0 ? 0 : -1}`,
        downvotes: sql`${postsTable.downvotes} + ${delta < 0 ? 0 : -1}`,
        score: sql`${postsTable.score} + ${delta}`
      }).where(eq(postsTable.id, id));
    }
  } else if (existing) {
    const diff = value - existing.value;
    await db.update(postVotesTable).set({ value }).where(eq(postVotesTable.id, existing.id));
    await db.update(postsTable).set({ score: sql`${postsTable.score} + ${diff}` }).where(eq(postsTable.id, id));
  } else {
    await db.insert(postVotesTable).values({ postId: id, userId: req.userId!, value });
    const upDelta = value === 1 ? 1 : 0;
    const downDelta = value === -1 ? 1 : 0;
    await db.update(postsTable).set({
      upvotes: sql`${postsTable.upvotes} + ${upDelta}`,
      downvotes: sql`${postsTable.downvotes} + ${downDelta}`,
      score: sql`${postsTable.score} + ${value}`
    }).where(eq(postsTable.id, id));
    await db.update(usersTable).set({ karma: sql`${usersTable.karma} + ${value}` }).where(eq(usersTable.id, post.authorId));

    // Notify author of upvote
    if (value === 1 && post.authorId !== req.userId) {
      await db.insert(notificationsTable).values({
        type: "upvote",
        message: `Someone upvoted your post: "${post.title.slice(0, 50)}"`,
        userId: post.authorId, actorId: req.userId, postId: id
      }).onConflictDoNothing();
    }
  }

  const [updated] = await db.select().from(postsTable).where(eq(postsTable.id, id));
  res.json({ ...updated, myVote: value, isSaved: false });
});

// POST /api/posts/:id/save
router.post("/:id/save", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  await db.insert(savedPostsTable).values({ postId: id, userId: req.userId! }).onConflictDoNothing();
  res.json({ success: true });
});

// DELETE /api/posts/:id/save
router.delete("/:id/save", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  await db.delete(savedPostsTable).where(and(eq(savedPostsTable.postId, id), eq(savedPostsTable.userId, req.userId!)));
  res.json({ success: true });
});

// POST /api/posts/:id/report
router.post("/:id/report", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id as string);
  const { reason, details } = req.body;
  await db.insert(reportsTable).values({ postId: id, reporterId: req.userId!, reason, details: details || null });
  res.json({ success: true });
});

export default router;
