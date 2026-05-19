import "dotenv/config";
import { db } from "./lib/db/src";
import { usersTable } from "./lib/db/src/schema";
import { sql } from "drizzle-orm";

// Load .env from api-server
import dotenv from "dotenv";
dotenv.config({ path: "./artifacts/api-server/.env" });

async function check() {
  try {
    console.log("Checking DB connection...");
    const result = await db.execute(sql`SELECT 1`);
    console.log("Connection successful:", result);
    
    const users = await db.select().from(usersTable).limit(1);
    console.log("Users count check successful, found:", users.length);
    
    process.exit(0);
  } catch (error) {
    console.error("DB Connection failed:", error);
    process.exit(1);
  }
}

check();
