import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const supabaseUrl = process.env.SUPABASE_URL
  ? (process.env.SUPABASE_URL.startsWith("http")
    ? process.env.SUPABASE_URL
    : `https://${process.env.SUPABASE_URL}.supabase.co`)
  : "";

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Auth will fail.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
      supabaseUserId?: string;
      user?: {
        id: number;
        role: string;
        email: string;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
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
    let dbUser;
    try {
      const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.supabaseId, user.id));
      dbUser = existingUser;
    } catch (dbErr: any) {
      console.error("DB Select error in requireAuth:", dbErr);
      throw dbErr;
    }

    const isAdminEmail = user.email === "mohanrajit05@gmail.com";

    if (!dbUser) {
      const username = user.user_metadata?.username || user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;
      try {
        const [created] = await db.insert(usersTable).values({
          supabaseId: user.id,
          username,
          email: user.email!,
          role: isAdminEmail ? "admin" : "user",
        }).onConflictDoUpdate({
          target: usersTable.supabaseId,
          set: { email: user.email! },
        }).returning();
        dbUser = created;
      } catch (insertErr: any) {
        console.error("DB Insert error in requireAuth:", insertErr);
        throw insertErr;
      }
    } else if (isAdminEmail && dbUser.role !== "admin" && dbUser.role !== "super_admin") {
      const [updated] = await db.update(usersTable)
        .set({ role: "admin" })
        .where(eq(usersTable.id, dbUser.id))
        .returning();
      dbUser = updated;
    }

    // Check ban status
    if (dbUser.isBanned) {
      // Check if temporary ban has expired
      if (dbUser.banExpiresAt && new Date(dbUser.banExpiresAt) < new Date()) {
        // Auto-unban
        await db.update(usersTable).set({ isBanned: false, banReason: null, banExpiresAt: null }).where(eq(usersTable.id, dbUser.id));
      } else {
        res.status(403).json({ 
          error: "Account banned",
          reason: dbUser.banReason,
          expiresAt: dbUser.banExpiresAt,
        });
        return;
      }
    }

    // Update last active
    db.update(usersTable).set({ lastActiveAt: new Date() }).where(eq(usersTable.id, dbUser.id)).catch(() => {});

    req.userId = dbUser.id;
    req.userRole = dbUser.role;
    req.supabaseUserId = user.id;
    req.user = {
      id: dbUser.id,
      role: dbUser.role,
      email: dbUser.email,
    };
    next();
  } catch (err: any) {
    console.error("Critical error in requireAuth:", err);
    res.status(500).json({ error: "Authentication failed", details: err.message });
  }
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
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
      req.user = {
        id: dbUser.id,
        role: dbUser.role,
        email: dbUser.email,
      };
    }
    next();
  } catch (err) {
    console.error("Error in optionalAuth:", err);
    next();
  }
}

/** Require admin or super_admin role */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== "admin" && req.userRole !== "super_admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
}

/** Require super_admin role */
export function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== "super_admin") {
    res.status(403).json({ error: "Super admin access required" });
    return;
  }
  next();
}

/** Require moderator, admin, or super_admin role */
export function requireModerator(req: Request, res: Response, next: NextFunction) {
  if (!["moderator", "admin", "super_admin"].includes(req.userRole || "")) {
    res.status(403).json({ error: "Moderator access required" });
    return;
  }
  next();
}

/** Permission-based middleware factory */
type Permission = 
  | "manage_users" | "delete_posts" | "moderate_comments" 
  | "approve_communities" | "handle_reports" | "manage_analytics"
  | "edit_settings" | "manage_roles" | "view_admin" | "ai_moderation";

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  user: [],
  moderator: ["view_admin", "delete_posts", "moderate_comments", "handle_reports"],
  admin: [
    "view_admin", "manage_users", "delete_posts", "moderate_comments",
    "approve_communities", "handle_reports", "manage_analytics", "ai_moderation"
  ],
  super_admin: [
    "view_admin", "manage_users", "delete_posts", "moderate_comments",
    "approve_communities", "handle_reports", "manage_analytics",
    "edit_settings", "manage_roles", "ai_moderation"
  ],
};

export function requirePermission(...permissions: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.userRole || "user";
    const userPerms = ROLE_PERMISSIONS[role] || [];
    const hasAll = permissions.every(p => userPerms.includes(p));
    
    if (!hasAll) {
      res.status(403).json({ error: "Insufficient permissions" });
      return;
    }
    next();
  };
}
