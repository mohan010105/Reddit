import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable, communitiesTable, usersTable, postVotesTable, savedPostsTable } from "@workspace/db/schema";
import { ilike, and, eq, desc, or, inArray, sql } from "drizzle-orm";
import { optionalAuth } from "../middlewares/auth";

const router = Router();

// GET /api/search
router.get("/", optionalAuth, async (req, res) => {
  const q = (req.query.q as string) || "";
  const type = (req.query.type as string) || "all";
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (!q) { res.json({ posts: [], communities: [], users: [], total: 0 }); return; }

  const pattern = `%${q}%`;

  const posts = (type === "all" || type === "posts") ? await db.query.postsTable.findMany({
    where: and(or(ilike(postsTable.title, pattern), ilike(postsTable.content!, pattern)), eq(postsTable.isDeleted, false)),
    with: { author: true, community: true },
    orderBy: [desc(postsTable.score)],
    limit,
  }) : [];

  const communities = (type === "all" || type === "communities") ? await db.select().from(communitiesTable)
    .where(or(ilike(communitiesTable.name, pattern), ilike(communitiesTable.slug, pattern)))
    .orderBy(desc(communitiesTable.memberCount)).limit(limit) : [];

  const users = (type === "all" || type === "users") ? (await db.select().from(usersTable)
    .where(ilike(usersTable.username, pattern))
    .orderBy(desc(usersTable.karma)).limit(limit)).map(({ supabaseId, ...u }) => u) : [];

  let myVotes: Map<number, number> = new Map();
  let mySaved: Set<number> = new Set();
  if (req.userId && posts.length > 0) {
    const votes = await db.select().from(postVotesTable)
      .where(and(eq(postVotesTable.userId, req.userId), inArray(postVotesTable.postId, posts.map(p => p.id))));
    votes.forEach(v => myVotes.set(v.postId, v.value));
    const saved = await db.select().from(savedPostsTable)
      .where(and(eq(savedPostsTable.userId, req.userId), inArray(savedPostsTable.postId, posts.map(p => p.id))));
    saved.forEach(s => mySaved.add(s.postId));
  }

  let joinedCommunities: Set<number> = new Set();
  if (req.userId && communities.length > 0) {
    const { communityMembersTable } = await import("@workspace/db/schema");
    const memberships = await db.select().from(communityMembersTable)
      .where(and(eq(communityMembersTable.userId, req.userId), inArray(communityMembersTable.communityId, communities.map(c => c.id))));
    memberships.forEach(m => joinedCommunities.add(m.communityId));
  }

  const total = posts.length + communities.length + users.length;
  res.json({
    posts: posts.map(p => ({ ...p, myVote: myVotes.get(p.id) ?? 0, isSaved: mySaved.has(p.id) })),
    communities: communities.map(c => ({ ...c, isJoined: joinedCommunities.has(c.id) })),
    users,
    total
  });
});

export default router;
