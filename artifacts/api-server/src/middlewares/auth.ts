import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const supabaseUrl = process.env.SUPABASE_URL!.startsWith("http")
  ? process.env.SUPABASE_URL!
  : `https://${process.env.SUPABASE_URL!}.supabase.co`;

const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
      supabaseUserId?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  // Upsert user in our DB
  let [dbUser] = await db.select().from(usersTable).where(eq(usersTable.supabaseId, user.id));

  if (!dbUser) {
    const username = user.user_metadata?.username || user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;
    const [created] = await db.insert(usersTable).values({
      supabaseId: user.id,
      username,
      email: user.email!,
    }).onConflictDoUpdate({
      target: usersTable.supabaseId,
      set: { email: user.email! },
    }).returning();
    dbUser = created;
  }

  if (dbUser.isBanned) {
    res.status(403).json({ error: "Account banned" });
    return;
  }

  req.userId = dbUser.id;
  req.userRole = dbUser.role;
  req.supabaseUserId = user.id;
  next();
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) { next(); return; }

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) { next(); return; }

  const [dbUser] = await db.select().from(usersTable).where(eq(usersTable.supabaseId, user.id));
  if (dbUser && !dbUser.isBanned) {
    req.userId = dbUser.id;
    req.userRole = dbUser.role;
    req.supabaseUserId = user.id;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== "admin") {
    res.status(403).json({ error: "Admin required" });
    return;
  }
  next();
}
