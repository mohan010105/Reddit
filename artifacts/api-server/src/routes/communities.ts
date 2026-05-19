import { Router } from "express";
import { db } from "@workspace/db";
import { communitiesTable, communityMembersTable, postsTable, postVotesTable, savedPostsTable } from "@workspace/db/schema";
import { eq, and, desc, sql, ilike, inArray, asc } from "drizzle-orm";
import { requireAuth, optionalAuth } from "../middlewares/auth";

const router = Router();

// GET /api/communities
router.get("/", optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sort = (req.query.sort as string) || "popular";
    const q = req.query.q as string;

    const orderBy = sort === "new" ? [desc(communitiesTable.createdAt)] :
      sort === "alphabetical" ? [asc(communitiesTable.name)] :
      [desc(communitiesTable.memberCount)];

    const communities = await db.query.communitiesTable.findMany({
      where: q ? ilike(communitiesTable.name, `%${q}%`) : undefined,
      orderBy,
      limit: limit + 1,
      offset: (page - 1) * limit,
    });

    const hasMore = communities.length > limit;
    const data = communities.slice(0, limit);

    let joined: Set<number> = new Set();
    if (req.userId && data.length > 0) {
      const memberships = await db.select().from(communityMembersTable)
        .where(and(eq(communityMembersTable.userId, req.userId), inArray(communityMembersTable.communityId, data.map(c => c.id))));
      memberships.forEach(m => joined.add(m.communityId));
    }

    res.json({ data: data.map(c => ({ ...c, isJoined: joined.has(c.id) })), hasMore, page, limit });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch communities" });
  }
});

// POST /api/communities
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, slug: providedSlug, description } = req.body;
    if (!name) { res.status(400).json({ error: "Name is required" }); return; }

    const slug = providedSlug || name.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^\w-]+/g, "");
    
    // Validate slug format
    if (!/^[a-z0-9_-]+$/.test(slug)) {
      res.status(400).json({ error: "Slug can only contain lowercase letters, numbers, underscores and hyphens" });
      return;
    }

    // Check if slug exists
    const [existing] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, slug));
    if (existing) {
      res.status(400).json({ error: "A community with this name or slug already exists" });
      return;
    }

    const [community] = await db.insert(communitiesTable).values({
      name, 
      slug, 
      description: description || null, 
      creatorId: req.userId!
    }).returning();

    // Auto-join as creator
    await db.insert(communityMembersTable).values({ 
      communityId: community.id, 
      userId: req.userId! 
    });
    
    await db.update(communitiesTable)
      .set({ memberCount: 1 })
      .where(eq(communitiesTable.id, community.id));

    res.status(201).json({ ...community, memberCount: 1, isJoined: true });
  } catch (err: any) {
    console.error("Create community error:", err);
    res.status(500).json({ error: "Failed to create community", details: err.message });
  }
});

// GET /api/communities/:slug
router.get("/:slug", optionalAuth, async (req, res) => {
  const [community] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, req.params.slug as string));
  if (!community) { res.status(404).json({ error: "Not found" }); return; }

  let isJoined = false;
  if (req.userId) {
    const [m] = await db.select().from(communityMembersTable)
      .where(and(eq(communityMembersTable.communityId, community.id), eq(communityMembersTable.userId, req.userId)));
    isJoined = !!m;
  }

  res.json({ ...community, isJoined });
});

// PATCH /api/communities/:slug
router.patch("/:slug", requireAuth, async (req, res) => {
  const [community] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, req.params.slug as string));
  if (!community) { res.status(404).json({ error: "Not found" }); return; }
  if (community.creatorId !== req.userId && req.userRole !== "admin") { res.status(403).json({ error: "Forbidden" }); return; }

  const { description, iconUrl, bannerUrl } = req.body;
  const [updated] = await db.update(communitiesTable).set({ description, iconUrl, bannerUrl }).where(eq(communitiesTable.slug, req.params.slug as string)).returning();
  res.json({ ...updated, isJoined: true });
});

// POST /api/communities/:slug/join
router.post("/:slug/join", requireAuth, async (req, res) => {
  const [community] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, req.params.slug as string));
  if (!community) { res.status(404).json({ error: "Not found" }); return; }

  await db.insert(communityMembersTable).values({ communityId: community.id, userId: req.userId! }).onConflictDoNothing();
  await db.update(communitiesTable).set({ memberCount: sql`${communitiesTable.memberCount} + 1` }).where(eq(communitiesTable.id, community.id));
  res.json({ success: true, memberCount: community.memberCount + 1 });
});

// DELETE /api/communities/:slug/leave
router.delete("/:slug/leave", requireAuth, async (req, res) => {
  const [community] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, req.params.slug as string));
  if (!community) { res.status(404).json({ error: "Not found" }); return; }

  await db.delete(communityMembersTable).where(and(eq(communityMembersTable.communityId, community.id), eq(communityMembersTable.userId, req.userId!)));
  await db.update(communitiesTable).set({ memberCount: sql`${communitiesTable.memberCount} - 1` }).where(eq(communitiesTable.id, community.id));
  res.json({ success: true, memberCount: community.memberCount - 1 });
});

// GET /api/communities/:slug/posts
router.get("/:slug/posts", optionalAuth, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const sort = (req.query.sort as string) || "hot";

  const [community] = await db.select().from(communitiesTable).where(eq(communitiesTable.slug, req.params.slug as string));
  if (!community) { res.status(404).json({ error: "Not found" }); return; }

  const orderBy = sort === "new" ? [desc(postsTable.createdAt)] :
    sort === "top" ? [desc(postsTable.score)] :
    [desc(postsTable.score), desc(postsTable.createdAt)];

  const posts = await db.query.postsTable.findMany({
    where: and(eq(postsTable.communityId, community.id), eq(postsTable.isDeleted, false)),
    with: { author: true, community: true },
    orderBy,
    limit: limit + 1,
    offset: (page - 1) * limit,
  });

  const hasMore = posts.length > limit;
  const data = posts.slice(0, limit);

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

  const total = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable)
    .where(and(eq(postsTable.communityId, community.id), eq(postsTable.isDeleted, false)));

  res.json({
    data: data.map(p => ({ ...p, myVote: myVotes.get(p.id) ?? 0, isSaved: mySaved.has(p.id) })),
    total: total[0].count, page, limit, hasMore
  });
});

export default router;
