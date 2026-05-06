import { Router } from "express";
import { db } from "@workspace/db";
import { commentsTable, commentVotesTable, postsTable, usersTable, notificationsTable } from "@workspace/db/schema";
import { eq, and, sql, inArray } from "drizzle-orm";
import { requireAuth, optionalAuth } from "../middlewares/auth";

const router = Router({ mergeParams: true });

function buildTree(comments: any[]): any[] {
  const map = new Map<number, any>();
  const roots: any[] = [];
  comments.forEach(c => { map.set(c.id, { ...c, replies: [] }); });
  comments.forEach(c => {
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId).replies.push(map.get(c.id));
    } else {
      roots.push(map.get(c.id));
    }
  });
  return roots;
}

// GET /api/posts/:postId/comments
router.get("/", optionalAuth, async (req, res) => {
  const postId = parseInt(req.params.postId);
  if (isNaN(postId)) { res.status(400).json({ error: "Invalid postId" }); return; }

  const rows = await db
    .select({
      id: commentsTable.id,
      content: commentsTable.content,
      upvotes: commentsTable.upvotes,
      downvotes: commentsTable.downvotes,
      score: commentsTable.score,
      isDeleted: commentsTable.isDeleted,
      depth: commentsTable.depth,
      parentId: commentsTable.parentId,
      postId: commentsTable.postId,
      authorId: commentsTable.authorId,
      createdAt: commentsTable.createdAt,
      updatedAt: commentsTable.updatedAt,
      author: {
        id: usersTable.id,
        username: usersTable.username,
        avatarUrl: usersTable.avatarUrl,
        karma: usersTable.karma,
      },
    })
    .from(commentsTable)
    .leftJoin(usersTable, eq(commentsTable.authorId, usersTable.id))
    .where(eq(commentsTable.postId, postId))
    .orderBy(commentsTable.depth, sql`${commentsTable.score} desc`);

  let myVotes: Map<number, number> = new Map();
  if (req.userId && rows.length > 0) {
    const ids = rows.map(c => c.id);
    const votes = await db.select().from(commentVotesTable)
      .where(and(eq(commentVotesTable.userId, req.userId), inArray(commentVotesTable.commentId, ids)));
    votes.forEach(v => myVotes.set(v.commentId, v.value));
  }

  const withVotes = rows.map(c => ({ ...c, myVote: myVotes.get(c.id) ?? 0 }));
  res.json(buildTree(withVotes));
});

// POST /api/posts/:postId/comments
router.post("/", requireAuth, async (req, res) => {
  const postId = parseInt(req.params.postId);
  if (isNaN(postId)) { res.status(400).json({ error: "Invalid postId" }); return; }
  const { content, parentId } = req.body;
  if (!content?.trim()) { res.status(400).json({ error: "content required" }); return; }

  let depth = 0;
  if (parentId) {
    const [parent] = await db.select({ depth: commentsTable.depth }).from(commentsTable).where(eq(commentsTable.id, parentId));
    depth = parent ? parent.depth + 1 : 0;
  }

  const [comment] = await db.insert(commentsTable).values({
    content: content.trim(), postId, authorId: req.userId!, parentId: parentId || null, depth
  }).returning();

  await db.update(postsTable).set({ commentCount: sql`${postsTable.commentCount} + 1` }).where(eq(postsTable.id, postId));
  await db.update(usersTable).set({ commentCount: sql`${usersTable.commentCount} + 1`, karma: sql`${usersTable.karma} + 1` })
    .where(eq(usersTable.id, req.userId!));

  // Notify post author
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, postId));
  if (post && post.authorId !== req.userId) {
    await db.insert(notificationsTable).values({
      type: "post_comment",
      message: `Someone commented on your post: "${post.title.slice(0, 50)}"`,
      userId: post.authorId, actorId: req.userId, postId, commentId: comment.id
    }).onConflictDoNothing();
  }

  // Notify parent comment author
  if (parentId) {
    const [parent] = await db.select().from(commentsTable).where(eq(commentsTable.id, parentId));
    if (parent && parent.authorId !== req.userId) {
      await db.insert(notificationsTable).values({
        type: "comment_reply",
        message: "Someone replied to your comment",
        userId: parent.authorId, actorId: req.userId, postId, commentId: comment.id
      }).onConflictDoNothing();
    }
  }

  const [author] = await db.select({
    id: usersTable.id, username: usersTable.username,
    avatarUrl: usersTable.avatarUrl, karma: usersTable.karma,
  }).from(usersTable).where(eq(usersTable.id, req.userId!));

  res.status(201).json({ ...comment, author, myVote: 0, replies: [] });
});

// PATCH /api/comments/:commentId
router.patch("/:commentId", requireAuth, async (req, res) => {
  const id = parseInt(req.params.commentId);
  const [comment] = await db.select().from(commentsTable).where(eq(commentsTable.id, id));
  if (!comment) { res.status(404).json({ error: "Not found" }); return; }
  if (comment.authorId !== req.userId && req.userRole !== "admin") { res.status(403).json({ error: "Forbidden" }); return; }
  const [updated] = await db.update(commentsTable).set({ content: req.body.content }).where(eq(commentsTable.id, id)).returning();
  const [author] = await db.select({
    id: usersTable.id, username: usersTable.username,
    avatarUrl: usersTable.avatarUrl, karma: usersTable.karma,
  }).from(usersTable).where(eq(usersTable.id, updated.authorId));
  res.json({ ...updated, author, myVote: 0, replies: [] });
});

// DELETE /api/comments/:commentId
router.delete("/:commentId", requireAuth, async (req, res) => {
  const id = parseInt(req.params.commentId);
  const [comment] = await db.select().from(commentsTable).where(eq(commentsTable.id, id));
  if (!comment) { res.status(404).json({ error: "Not found" }); return; }
  if (comment.authorId !== req.userId && req.userRole !== "admin") { res.status(403).json({ error: "Forbidden" }); return; }
  await db.update(commentsTable).set({ isDeleted: true }).where(eq(commentsTable.id, id));
  res.status(204).send();
});

// POST /api/comments/:commentId/vote
router.post("/:commentId/vote", requireAuth, async (req, res) => {
  const id = parseInt(req.params.commentId);
  const value = parseInt(req.body.value) as 1 | 0 | -1;

  const [existing] = await db.select().from(commentVotesTable)
    .where(and(eq(commentVotesTable.commentId, id), eq(commentVotesTable.userId, req.userId!)));

  if (value === 0) {
    if (existing) {
      await db.delete(commentVotesTable).where(eq(commentVotesTable.id, existing.id));
      await db.update(commentsTable).set({ score: sql`${commentsTable.score} + ${-existing.value}` }).where(eq(commentsTable.id, id));
    }
  } else if (existing) {
    const diff = value - existing.value;
    await db.update(commentVotesTable).set({ value }).where(eq(commentVotesTable.id, existing.id));
    await db.update(commentsTable).set({ score: sql`${commentsTable.score} + ${diff}` }).where(eq(commentsTable.id, id));
  } else {
    await db.insert(commentVotesTable).values({ commentId: id, userId: req.userId!, value });
    await db.update(commentsTable).set({ score: sql`${commentsTable.score} + ${value}` }).where(eq(commentsTable.id, id));
  }

  const [updated] = await db.select().from(commentsTable).where(eq(commentsTable.id, id));
  res.json({ ...updated, myVote: value, replies: [] });
});

export default router;
