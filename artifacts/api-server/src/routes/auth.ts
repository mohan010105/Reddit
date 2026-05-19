import { Router } from "express";
import { z } from "zod";
import { validate } from "../middlewares/validate";
import { requireAuth } from "../middlewares/auth";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3).max(20),
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile.
 * Handled mostly by requireAuth which syncs Supabase -> Local DB.
 */
router.get("/me", requireAuth, async (req, res) => {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, req.userId!),
  });
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

/**
 * POST /api/auth/logout
 * Placeholder for server-side session cleanup if needed.
 * Supabase handles token revocation on the client.
 */
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out" });
});

/**
 * PATCH /api/auth/profile
 * Updates the current user's profile information.
 */
router.patch("/profile", requireAuth, async (req, res) => {
  try {
    const { username, bio, avatarUrl, bannerUrl, socialLinks } = req.body;
    const updates: any = {};
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
    if (bannerUrl !== undefined) updates.bannerUrl = bannerUrl;
    if (socialLinks !== undefined) updates.socialLinks = typeof socialLinks === 'string' ? socialLinks : JSON.stringify(socialLinks);
    
    if (Object.keys(updates).length === 0) {
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, req.userId!),
      });
      return res.json(user);
    }

    const [user] = await db.update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, req.userId!))
      .returning();
      
    return res.json(user);
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Username is already taken" });
    }
    return res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
