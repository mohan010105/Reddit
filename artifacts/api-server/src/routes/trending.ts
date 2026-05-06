import { Router } from "express";
import { db } from "@workspace/db";
import { communitiesTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

const router = Router();

// GET /api/trending
router.get("/", async (req, res) => {
  const communities = await db.select().from(communitiesTable)
    .orderBy(desc(communitiesTable.memberCount))
    .limit(10);

  res.json({ trendingCommunities: communities });
});

export default router;
