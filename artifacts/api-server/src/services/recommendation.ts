import { db } from "@workspace/db";
import {
  postsTable, communitiesTable, postVotesTable, communityMembersTable,
  userRecommendationsTable, userEngagementTable, userFollowsTable, savedPostsTable,
  usersTable
} from "@workspace/db/schema";
import { eq, desc, sql, and, notInArray, inArray, gte, ne } from "drizzle-orm";
import { CacheService } from "./caching";
import { logger } from "../lib/logger";

export class RecommendationService {
  // ─── Recommended Posts ───────────────────────────────────────────────────
  static async getRecommendedPosts(userId: number, limit = 20, offset = 0) {
    const cacheKey = `rec:posts:${userId}:${limit}:${offset}`;
    const cached = CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    // 1. Get user's community memberships
    const userCommunities = await db.select({ id: communityMembersTable.communityId })
      .from(communityMembersTable)
      .where(eq(communityMembersTable.userId, userId));
    const communityIds = userCommunities.map(c => c.id);

    // 2. Get user's followed users
    const followedUsers = await db.select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));
    const followedIds = followedUsers.map(f => f.id);

    // 3. Get upvoted post IDs for interest profiling
    const upvotedPosts = await db.select({ postId: postVotesTable.postId })
      .from(postVotesTable)
      .where(and(eq(postVotesTable.userId, userId), eq(postVotesTable.value, 1)))
      .limit(100);

    // 4. Composite scoring formula:
    //    Score = (voteCount * 1.5 + commentCount * 2 + communityBoost + followBoost)
    //            / (ageHours + 2)^1.5
    const posts = await db.select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      type: postsTable.type,
      imageUrl: postsTable.imageUrl,
      authorId: postsTable.authorId,
      communityId: postsTable.communityId,
      voteCount: postsTable.score,
      commentCount: postsTable.commentCount,
      isPinned: postsTable.isPinned,
      createdAt: postsTable.createdAt,
      score: sql<number>`(
        ${postsTable.score} * 1.5
        + ${postsTable.commentCount} * 2
        + CASE WHEN ${postsTable.communityId} = ANY(ARRAY[${sql.raw(communityIds.length > 0 ? communityIds.join(",") : "0")}]::int[]) THEN 50 ELSE 0 END
        + CASE WHEN ${postsTable.authorId} = ANY(ARRAY[${sql.raw(followedIds.length > 0 ? followedIds.join(",") : "0")}]::int[]) THEN 30 ELSE 0 END
      ) / POWER(EXTRACT(EPOCH FROM (NOW() - ${postsTable.createdAt})) / 3600 + 2, 1.5)`,
    })
    .from(postsTable)
    .orderBy(desc(sql`score`))
    .limit(limit)
    .offset(offset);

    CacheService.set(cacheKey, posts, 300); // 5 min cache
    return posts;
  }

  // ─── Recommended Communities ─────────────────────────────────────────────
  static async getRecommendedCommunities(userId: number, limit = 8) {
    const cacheKey = `rec:communities:${userId}`;
    const cached = CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    // Get communities the user is NOT in
    const recommendations = await db.select()
      .from(communitiesTable)
      .where(
        notInArray(
          communitiesTable.id,
          db.select({ id: communityMembersTable.communityId })
            .from(communityMembersTable)
            .where(eq(communityMembersTable.userId, userId))
        )
      )
      .orderBy(desc(communitiesTable.memberCount))
      .limit(limit);

    CacheService.set(cacheKey, recommendations, 600); // 10 min cache
    return recommendations;
  }

  // ─── Recommended Users ───────────────────────────────────────────────────
  static async getRecommendedUsers(userId: number, limit = 5) {
    const cacheKey = `rec:users:${userId}`;
    const cached = CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    // Get users the current user is NOT following
    const followedIds = await db.select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    const excludeIds = [userId, ...followedIds.map(f => f.id)];

    const users = await db.select({
      id: usersTable.id,
      username: usersTable.username,
      displayName: usersTable.username,
      avatarUrl: usersTable.avatarUrl,
      bio: usersTable.bio,
      karma: usersTable.karma,
    })
    .from(usersTable)
    .where(notInArray(usersTable.id, excludeIds))
    .orderBy(desc(usersTable.karma))
    .limit(limit);

    CacheService.set(cacheKey, users, 600);
    return users;
  }

  // ─── Trending Topics ────────────────────────────────────────────────────
  static async getTrendingTopics(limit = 10) {
    const cacheKey = `trending:topics`;
    const cached = CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get most active communities in last 24 hours
    const trending = await db.select({
      id: communitiesTable.id,
      name: communitiesTable.name,
      slug: communitiesTable.slug,
      memberCount: communitiesTable.memberCount,
      description: communitiesTable.description,
      iconUrl: communitiesTable.iconUrl,
    })
    .from(communitiesTable)
    .orderBy(desc(communitiesTable.memberCount))
    .limit(limit);

    CacheService.set(cacheKey, trending, 900); // 15 min cache
    return trending;
  }

  // ─── Track Engagement ───────────────────────────────────────────────────
  static async trackEngagement(
    userId: number,
    eventType: string,
    targetType: string,
    targetId: number,
    duration?: number,
    metadata?: any
  ) {
    try {
      await db.insert(userEngagementTable).values({
        userId,
        eventType,
        targetType,
        targetId,
        duration,
        metadata: metadata ? JSON.stringify(metadata) : null,
      });
    } catch (error) {
      logger.warn({ userId, eventType, error }, "Failed to track engagement");
    }
  }

  // ─── Refresh Recommendations (cron job) ──────────────────────────────────
  static async refreshUserRecommendations(userId: number) {
    // Get user's upvoted posts
    const upvotedPostIds = await db.select({ postId: postVotesTable.postId })
      .from(postVotesTable)
      .where(and(eq(postVotesTable.userId, userId), eq(postVotesTable.value, 1)));

    if (upvotedPostIds.length === 0) return;

    const ids = upvotedPostIds.map(p => p.postId);

    // Find communities of those posts
    const similarCommunities = await db.select({ communityId: postsTable.communityId })
      .from(postsTable)
      .where(inArray(postsTable.id, ids))
      .groupBy(postsTable.communityId);

    // Store as recommendations
    for (const comm of similarCommunities) {
      if (!comm.communityId) continue;
      try {
        await db.insert(userRecommendationsTable).values({
          userId,
          targetType: "community",
          targetId: comm.communityId,
          score: "0.85",
          reason: "Based on posts you liked",
        });
      } catch {
        // Ignore duplicate conflicts
      }
    }

    logger.info({ userId, count: similarCommunities.length }, "Refreshed recommendations");
  }

  // ─── Personalized Feed ──────────────────────────────────────────────────
  static async getPersonalizedFeed(userId: number, limit = 20, offset = 0) {
    return this.getRecommendedPosts(userId, limit, offset);
  }
}
