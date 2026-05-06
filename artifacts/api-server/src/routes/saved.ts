import { Router } from "express";
import { db } from "@workspace/db";
import { savedPostsTable, postsTable, postVotesTable } from "@workspace/db/schema";
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
    data: data.map(s => ({ ...s.post, myVote: myVotes.get(s.post.id) ?? 0, isSaved: true })),
    total: total[0].count, page, limit, hasMore
  });
});

export default router;
