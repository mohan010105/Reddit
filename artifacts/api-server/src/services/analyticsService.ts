import { db } from "@workspace/db";
import { usersTable, postsTable, commentsTable, communitiesTable, reportsTable, postVotesTable, communityMembersTable } from "@workspace/db/schema";
import { sql, gte, desc, eq, and, count } from "drizzle-orm";

// ──────────────────────────────────────────────────────────────────────────────
// Simple in-memory cache for expensive analytics queries
// ──────────────────────────────────────────────────────────────────────────────
const cache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL = 60_000; // 1 minute

function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiresAt) return Promise.resolve(entry.data as T);
  return fn().then(data => {
    cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
    return data;
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Overview Analytics
// ──────────────────────────────────────────────────────────────────────────────
export async function getOverviewAnalytics() {
  return cached("overview", async () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total counts
    const [totalUsers] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable);
    const [totalPosts] = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(eq(postsTable.isDeleted, false));
    const [totalComments] = await db.select({ count: sql<number>`count(*)::int` }).from(commentsTable).where(eq(commentsTable.isDeleted, false));
    const [totalCommunities] = await db.select({ count: sql<number>`count(*)::int` }).from(communitiesTable);
    const [pendingReports] = await db.select({ count: sql<number>`count(*)::int` }).from(reportsTable).where(eq(reportsTable.status, "pending"));
    const [totalVotes] = await db.select({ count: sql<number>`count(*)::int` }).from(postVotesTable);

    // New this week
    const [newUsersWeek] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable).where(gte(usersTable.createdAt, sevenDaysAgo));
    const [newPostsWeek] = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(and(gte(postsTable.createdAt, sevenDaysAgo), eq(postsTable.isDeleted, false)));
    const [newCommentsWeek] = await db.select({ count: sql<number>`count(*)::int` }).from(commentsTable).where(gte(commentsTable.createdAt, sevenDaysAgo));

    // New today
    const [newUsersToday] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable).where(gte(usersTable.createdAt, today));
    const [newPostsToday] = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(and(gte(postsTable.createdAt, today), eq(postsTable.isDeleted, false)));

    // Active users (posted or commented in last 7 days) 
    const activeUsersResult = await db.execute(sql`
      SELECT COUNT(DISTINCT author_id)::int as count FROM (
        SELECT author_id FROM posts WHERE created_at >= ${sevenDaysAgo.toISOString()} AND is_deleted = false
        UNION
        SELECT author_id FROM comments WHERE created_at >= ${sevenDaysAgo.toISOString()} AND is_deleted = false
      ) active
    `);
    const activeUsers = (activeUsersResult.rows[0] as any)?.count || 0;

    // Engagement rate (active users / total users * 100)
    const engagementRate = totalUsers.count > 0 ? Math.round((activeUsers / totalUsers.count) * 100) : 0;

    return {
      totalUsers: totalUsers.count,
      totalPosts: totalPosts.count,
      totalComments: totalComments.count,
      totalCommunities: totalCommunities.count,
      totalVotes: totalVotes.count,
      pendingReports: pendingReports.count,
      newUsersWeek: newUsersWeek.count,
      newPostsWeek: newPostsWeek.count,
      newCommentsWeek: newCommentsWeek.count,
      newUsersToday: newUsersToday.count,
      newPostsToday: newPostsToday.count,
      activeUsers,
      engagementRate,
    };
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Daily Activity Chart Data (last N days)
// ──────────────────────────────────────────────────────────────────────────────
export async function getDailyActivity(days = 30) {
  return cached(`daily_${days}`, async () => {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const dailyPosts = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM posts WHERE created_at >= ${since.toISOString()} AND is_deleted = false
      GROUP BY DATE(created_at) ORDER BY date
    `);

    const dailyComments = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM comments WHERE created_at >= ${since.toISOString()} AND is_deleted = false
      GROUP BY DATE(created_at) ORDER BY date
    `);

    const dailyUsers = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM users WHERE created_at >= ${since.toISOString()}
      GROUP BY DATE(created_at) ORDER BY date
    `);

    const dailyVotes = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM post_votes WHERE created_at >= ${since.toISOString()}
      GROUP BY DATE(created_at) ORDER BY date
    `);

    // Merge into single timeline
    const dateMap = new Map<string, { date: string; posts: number; comments: number; users: number; votes: number }>();
    
    // Initialize all dates
    for (let d = new Date(since); d <= new Date(); d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];
      dateMap.set(key, { date: key, posts: 0, comments: 0, users: 0, votes: 0 });
    }

    (dailyPosts.rows as any[]).forEach(r => {
      const key = typeof r.date === 'string' ? r.date : new Date(r.date).toISOString().split("T")[0];
      const entry = dateMap.get(key);
      if (entry) entry.posts = r.count;
    });
    (dailyComments.rows as any[]).forEach(r => {
      const key = typeof r.date === 'string' ? r.date : new Date(r.date).toISOString().split("T")[0];
      const entry = dateMap.get(key);
      if (entry) entry.comments = r.count;
    });
    (dailyUsers.rows as any[]).forEach(r => {
      const key = typeof r.date === 'string' ? r.date : new Date(r.date).toISOString().split("T")[0];
      const entry = dateMap.get(key);
      if (entry) entry.users = r.count;
    });
    (dailyVotes.rows as any[]).forEach(r => {
      const key = typeof r.date === 'string' ? r.date : new Date(r.date).toISOString().split("T")[0];
      const entry = dateMap.get(key);
      if (entry) entry.votes = r.count;
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// User Analytics
// ──────────────────────────────────────────────────────────────────────────────
export async function getUserAnalytics() {
  return cached("user_analytics", async () => {
    // User growth (monthly)
    const monthlyGrowth = await db.execute(sql`
      SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*)::int as count
      FROM users
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    // Role distribution
    const roleDistribution = await db.execute(sql`
      SELECT role, COUNT(*)::int as count
      FROM users GROUP BY role
    `);

    // Top users by karma
    const topUsers = await db.select({
      id: usersTable.id,
      username: usersTable.username,
      avatarUrl: usersTable.avatarUrl,
      karma: usersTable.karma,
      postCount: usersTable.postCount,
      commentCount: usersTable.commentCount,
    }).from(usersTable)
      .orderBy(desc(usersTable.karma))
      .limit(10);

    // Banned users count
    const [bannedCount] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable).where(eq(usersTable.isBanned, true));

    return {
      monthlyGrowth: (monthlyGrowth.rows as any[]).reverse(),
      roleDistribution: roleDistribution.rows,
      topUsers,
      bannedCount: bannedCount.count,
    };
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Post Analytics
// ──────────────────────────────────────────────────────────────────────────────
export async function getPostAnalytics() {
  return cached("post_analytics", async () => {
    // Post type distribution
    const typeDistribution = await db.execute(sql`
      SELECT type, COUNT(*)::int as count
      FROM posts WHERE is_deleted = false
      GROUP BY type
    `);

    // Top posts by score
    const topPosts = await db.query.postsTable.findMany({
      where: eq(postsTable.isDeleted, false),
      with: { author: true, community: true },
      orderBy: [desc(postsTable.score)],
      limit: 10,
    });

    // Average engagement
    const [avgEngagement] = await db.select({
      avgScore: sql<number>`ROUND(AVG(score)::numeric, 1)`,
      avgComments: sql<number>`ROUND(AVG(comment_count)::numeric, 1)`,
    }).from(postsTable).where(eq(postsTable.isDeleted, false));

    // Monthly post volume
    const monthlyVolume = await db.execute(sql`
      SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*)::int as count
      FROM posts WHERE is_deleted = false
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    return {
      typeDistribution: typeDistribution.rows,
      topPosts: topPosts.map(p => ({
        id: p.id, title: p.title, score: p.score, commentCount: p.commentCount,
        author: p.author ? { username: p.author.username } : null,
        community: p.community ? { name: p.community.name, slug: p.community.slug } : null,
      })),
      avgEngagement,
      monthlyVolume: (monthlyVolume.rows as any[]).reverse(),
    };
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Community Analytics
// ──────────────────────────────────────────────────────────────────────────────
export async function getCommunityAnalytics() {
  return cached("community_analytics", async () => {
    // Top communities by members
    const topCommunities = await db.select({
      id: communitiesTable.id,
      name: communitiesTable.name,
      slug: communitiesTable.slug,
      memberCount: communitiesTable.memberCount,
      postCount: communitiesTable.postCount,
      iconUrl: communitiesTable.iconUrl,
    }).from(communitiesTable)
      .orderBy(desc(communitiesTable.memberCount))
      .limit(10);

    // Community growth (monthly)
    const monthlyGrowth = await db.execute(sql`
      SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*)::int as count
      FROM communities
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    // Most active communities (by recent posts)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const mostActive = await db.execute(sql`
      SELECT c.id, c.name, c.slug, c.icon_url, COUNT(p.id)::int as recent_posts
      FROM communities c
      LEFT JOIN posts p ON p.community_id = c.id AND p.created_at >= ${sevenDaysAgo.toISOString()} AND p.is_deleted = false
      GROUP BY c.id, c.name, c.slug, c.icon_url
      ORDER BY recent_posts DESC
      LIMIT 10
    `);

    return {
      topCommunities,
      monthlyGrowth: (monthlyGrowth.rows as any[]).reverse(),
      mostActive: mostActive.rows,
    };
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Trending / Realtime Metrics
// ──────────────────────────────────────────────────────────────────────────────
export async function getRealtimeMetrics() {
  const oneHourAgo = new Date(Date.now() - 3600_000);
  const fiveMinAgo = new Date(Date.now() - 300_000);

  const [postsLastHour] = await db.select({ count: sql<number>`count(*)::int` }).from(postsTable).where(gte(postsTable.createdAt, oneHourAgo));
  const [commentsLastHour] = await db.select({ count: sql<number>`count(*)::int` }).from(commentsTable).where(gte(commentsTable.createdAt, oneHourAgo));
  const [votesLastHour] = await db.select({ count: sql<number>`count(*)::int` }).from(postVotesTable).where(gte(postVotesTable.createdAt, oneHourAgo));

  // Active users (with last_active_at in last 5 min)
  const [activeNow] = await db.select({ count: sql<number>`count(*)::int` }).from(usersTable).where(gte(usersTable.lastActiveAt, fiveMinAgo));

  return {
    postsLastHour: postsLastHour.count,
    commentsLastHour: commentsLastHour.count,
    votesLastHour: votesLastHour.count,
    activeNow: activeNow.count,
    timestamp: new Date().toISOString(),
  };
}
