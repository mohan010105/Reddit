import "dotenv/config";
import { db } from "./lib/db/src";
import { postsTable } from "./lib/db/src/schema";
import { sql } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config({ path: "./artifacts/api-server/.env" });

async function update() {
  try {
    console.log("Updating posts to be recent...");
    // Update the 50 highest scoring posts to be from today
    await db.update(postsTable)
      .set({ createdAt: new Date() })
      .where(sql`id IN (SELECT id FROM posts ORDER BY score DESC LIMIT 50)`);
    
    console.log("Successfully updated 50 posts to recent dates.");
    process.exit(0);
  } catch (error) {
    console.error("Update failed:", error);
    process.exit(1);
  }
}

update();
