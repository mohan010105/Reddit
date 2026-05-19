import { Router } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/db", async (req, res) => {
  try {
    const result = await db.execute(sql`SELECT 1 as connected`);
    const tables = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    
    res.json({ 
      status: "connected", 
      result: result.rows,
      tables: tables.rows.map((r: any) => r.table_name)
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: "error", 
      message: error.message,
      code: error.code,
      detail: error.detail,
      stack: error.stack
    });
  }
});

export default router;
