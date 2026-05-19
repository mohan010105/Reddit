import { Router } from "express";
import { db } from "@workspace/db";
import { communitiesTable, postsTable, usersTable } from "@workspace/db/schema";
import { desc, sql, gte, and, eq } from "drizzle-orm";

const router = Router();

// GET /api/trending
router.get("/", async (req, res) => {
  try {
    // 1. Trending Communities (by member count)
    const communities = await db.select().from(communitiesTable)
      .orderBy(desc(communitiesTable.memberCount))
      .limit(6);

    // 2. Trending Posts ("Hot" algorithm: score / (time_since_creation + 2)^1.5)
    // For simplicity in SQL, we'll just use score for now but filter by recent
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    let posts = await (db.query as any).postsTable.findMany({
      where: and(
        eq(postsTable.isDeleted, false),
        gte(postsTable.createdAt, dayAgo)
      ),
      orderBy: [desc(postsTable.score)],
      limit: 10,
      with: {
        author: {
          columns: {
            username: true,
            avatarUrl: true
          }
        },
        community: {
          columns: {
            name: true,
            slug: true
          }
        }
      }
    });

    // Fallback if no recent posts (common in dev/seeded environments)
    if (posts.length === 0) {
      posts = await (db.query as any).postsTable.findMany({
        where: eq(postsTable.isDeleted, false),
        orderBy: [desc(postsTable.score)],
        limit: 10,
        with: {
          author: {
            columns: {
              username: true,
              avatarUrl: true
            }
          },
          community: {
            columns: {
              name: true,
              slug: true
            }
          }
        }
      });
    }

    res.json({ 
      trendingCommunities: communities,
      trendingPosts: posts
    });
  } catch (error) {
    console.error("Error fetching trending data:", error);
    res.status(500).json({ error: "Failed to fetch trending data" });
  }
});

export default router;
