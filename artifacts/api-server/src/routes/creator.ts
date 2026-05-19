import { Router } from "express";
import { CreatorService } from "../services/creator";
import { requireAuth } from "../middlewares/auth";
import { z } from "zod";
import { validate } from "../middlewares/validate";
import { db } from "@workspace/db";
import { creatorEarningsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// GET /api/creator/earnings
router.get("/earnings", requireAuth, async (req, res) => {
  try {
    const earnings = await CreatorService.getEarnings(req.userId!);
    res.json(earnings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/creator/analytics
router.get("/analytics", requireAuth, async (req, res) => {
  try {
    // Basic analytics for now
    const earnings = await CreatorService.getEarnings(req.userId!);
    res.json({
      totalEarned: earnings.totalEarned,
      pendingBalance: earnings.pendingBalance,
      monthlyRevenue: earnings.monthlyRevenue,
      subscriberCount: earnings.subscriberCount,
      dailyRevenue: [
        // Mock data for the chart if real analytics are not yet available
        { date: new Date().toISOString().split('T')[0], amount: earnings.monthlyRevenue }
      ]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/creator/payouts
router.get("/payouts", requireAuth, async (req, res) => {
  try {
    const earnings = await CreatorService.getEarnings(req.userId!);
    res.json(earnings.recentTips || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/creator/connect
router.post("/connect", requireAuth, async (req, res) => {
  try {
    const [updated] = await db.update(creatorEarningsTable)
      .set({ 
        razorpayAccountId: "acc_sim_" + Math.random().toString(36).substring(7),
        updatedAt: new Date()
      })
      .where(eq(creatorEarningsTable.userId, req.userId!))
      .returning();
      
    res.json({ success: true, account: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/creator/payout/setup-simulated
router.post("/payout/setup-simulated", requireAuth, async (req, res) => {
  try {
    // Ensure creator earnings record exists
    const [existing] = await db.select().from(creatorEarningsTable).where(eq(creatorEarningsTable.userId, req.userId!));
    if (!existing) {
      await db.insert(creatorEarningsTable).values({
        userId: req.userId!,
        totalEarned: "0",
        pendingBalance: "0",
        withdrawnAmount: "0",
        razorpayAccountId: "acc_sim_" + Math.random().toString(36).substring(7),
      });
    } else {
      await db.update(creatorEarningsTable)
        .set({ 
          razorpayAccountId: "acc_sim_" + Math.random().toString(36).substring(7),
          updatedAt: new Date()
        })
        .where(eq(creatorEarningsTable.userId, req.userId!));
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/creator/payout
const payoutSchema = z.object({
  amount: z.number().min(1),
});

router.post("/payout", requireAuth, validate({ body: payoutSchema }), async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await CreatorService.requestPayout(req.userId!, amount);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
