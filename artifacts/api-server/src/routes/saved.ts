import { Router } from "express";
import { db } from "@workspace/db";
import { savedPostsTable, postsTable, postVotesTable, collectionsTable } from "@workspace/db/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// GET /api/saved
router.get("/", requireAuth, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const saved = await db.query.savedPostsTable.findMany({
    where: eq(savedPostsTable.userId, req.userId!),
    with: { post: { with: { author: true, community: true } } },
    orderBy: [desc(savedPostsTable.createdAt)],
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = saved.length > limit;
  const data = saved.slice(0, limit);

  const postIds = data.map(s => s.post.id);
  let myVotes: Map<number, number> = new Map();
  if (postIds.length > 0) {
    const votes = await db.select().from(postVotesTable)
      .where(and(eq(postVotesTable.userId, req.userId!), inArray(postVotesTable.postId, postIds)));
    votes.forEach(v => myVotes.set(v.postId, v.value));
  }

  const total = await db.select({ count: sql<number>`count(*)::int` }).from(savedPostsTable)
    .where(eq(savedPostsTable.userId, req.userId!));

  res.json({
    data: data.map(s => ({ ...s.post, myVote: myVotes.get(s.post.id) ?? 0, isSaved: true, collectionId: s.collectionId })),
    total: total[0].count, page, limit, hasMore
  });
});

// GET /api/saved/collections
router.get("/collections", requireAuth, async (req, res) => {
  const collections = await db.query.collectionsTable.findMany({
    where: eq(collectionsTable.userId, req.userId!),
    orderBy: [desc(collectionsTable.createdAt)],
  });
  res.json(collections);
});

// POST /api/saved/collections
router.post("/collections", requireAuth, async (req, res) => {
  const { name } = req.body;
  if (!name) { res.status(400).json({ error: "Name required" }); return; }
  const [collection] = await db.insert(collectionsTable).values({ name, userId: req.userId! }).returning();
  res.status(201).json(collection);
});

// PATCH /api/saved/:postId/collection
router.patch("/:postId/collection", requireAuth, async (req, res) => {
  const postId = parseInt(req.params.postId as string);
  const { collectionId } = req.body;
  await db.update(savedPostsTable)
    .set({ collectionId: collectionId || null })
    .where(and(eq(savedPostsTable.userId, req.userId!), eq(savedPostsTable.postId, postId)));
  res.json({ success: true });
});

export default router;
