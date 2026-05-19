import { db } from "@workspace/db";
import { creatorEarningsTable, payoutRequestsTable, transactionsTable, subscriptionsTable } from "@workspace/db/schema";
import { eq, desc, and, sql, gte } from "drizzle-orm";
import { logger } from "../lib/logger";

export class CreatorService {
  // ─── Get Earnings Summary ────────────────────────────────────────────────
  static async getEarnings(userId: number) {
    let [earnings] = await db.select()
      .from(creatorEarningsTable)
      .where(eq(creatorEarningsTable.userId, userId));

    if (!earnings) {
      [earnings] = await db.insert(creatorEarningsTable).values({
        userId,
        totalEarned: "0",
        pendingBalance: "0",
        withdrawnAmount: "0",
      }).returning();
    }

    // Get recent tip transactions directed at this creator
    const recentTips = await db.select()
      .from(transactionsTable)
      .where(and(
        eq(transactionsTable.type, "tip"),
        eq(transactionsTable.status, "succeeded")
      ))
      .orderBy(desc(transactionsTable.createdAt))
      .limit(20);

    // Filter tips that belong to this creator
    const creatorTips = recentTips.filter(t => {
      try {
        const meta = JSON.parse(t.metadata || "{}");
        return meta.creatorId === userId;
      } catch { return false; }
    });

    // Calculate monthly earnings
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const monthlyTips = creatorTips.filter(t => new Date(t.createdAt) > thirtyDaysAgo);
    const monthlyRevenue = monthlyTips.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Get subscriber count (users who subscribed because of this creator)
    const subscriberCount = 0; // TODO: implement creator-specific subscriber tracking

    return {
      ...earnings,
      recentTips: creatorTips.map(t => ({
        id: t.id,
        amount: t.amount,
        createdAt: t.createdAt,
        senderId: t.userId,
      })),
      monthlyRevenue: monthlyRevenue.toFixed(2),
      subscriberCount,
      isConnectedToRazorpay: !!earnings.razorpayAccountId,
    };
  }

  // ─── Request Payout ──────────────────────────────────────────────────────
  static async requestPayout(userId: number, amount: number) {
    const [earnings] = await db.select()
      .from(creatorEarningsTable)
      .where(eq(creatorEarningsTable.userId, userId));

    if (!earnings) throw new Error("No earnings record found");
    if (parseFloat(earnings.pendingBalance) < amount) {
      throw new Error("Insufficient balance for payout");
    }
    if (!earnings.razorpayAccountId) {
      throw new Error("Please complete Razorpay onboarding first");
    }
    if (amount < 1) throw new Error("Minimum payout amount is $1.00");

    try {
      // In production, use razorpay.payouts.create(...)
      const payoutId = "payout_sim_" + Math.random().toString(36).substring(7);

      // Create payout request record
      const [request] = await db.insert(payoutRequestsTable).values({
        userId,
        amount: amount.toString(),
        currency: "USD",
        status: "completed",
        razorpayPayoutId: payoutId,
      }).returning();

      // Update balances
      await db.update(creatorEarningsTable)
        .set({
          pendingBalance: sql`${creatorEarningsTable.pendingBalance} - ${amount}`,
          withdrawnAmount: sql`${creatorEarningsTable.withdrawnAmount} + ${amount}`,
          lastPayoutAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(creatorEarningsTable.userId, userId));

      logger.info({ userId, amount, payoutId }, "Creator payout processed");
      return request;
    } catch (error: any) {
      logger.error({ userId, amount, error: error.message }, "Payout failed");
      
      // Create failed payout record
      await db.insert(payoutRequestsTable).values({
        userId,
        amount: amount.toString(),
        currency: "USD",
        status: "failed",
        adminNote: error.message,
      });

      throw new Error(`Payout failed: ${error.message}`);
    }
  }

  // ─── Get Payout History ──────────────────────────────────────────────────
  static async getPayoutHistory(userId: number) {
    return db.select()
      .from(payoutRequestsTable)
      .where(eq(payoutRequestsTable.userId, userId))
      .orderBy(desc(payoutRequestsTable.createdAt));
  }

  // ─── Admin: List Pending Payouts ──────────────────────────────────────────
  static async listPendingPayouts() {
    return db.select()
      .from(payoutRequestsTable)
      .where(eq(payoutRequestsTable.status, "pending"))
      .orderBy(desc(payoutRequestsTable.createdAt));
  }

  // ─── Creator Analytics ───────────────────────────────────────────────────
  static async getCreatorAnalytics(userId: number) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const tips = await db.select()
      .from(transactionsTable)
      .where(and(
        eq(transactionsTable.type, "tip"),
        eq(transactionsTable.status, "succeeded"),
        gte(transactionsTable.createdAt, thirtyDaysAgo)
      ))
      .orderBy(desc(transactionsTable.createdAt));

    // Filter tips for this creator
    const creatorTips = tips.filter(t => {
      try {
        const meta = JSON.parse(t.metadata || "{}");
        return meta.creatorId === userId;
      } catch { return false; }
    });

    // Group by day
    const dailyRevenue: Record<string, number> = {};
    for (const tip of creatorTips) {
      const day = new Date(tip.createdAt).toISOString().split("T")[0];
      dailyRevenue[day] = (dailyRevenue[day] || 0) + parseFloat(tip.amount);
    }

    return {
      totalTips30d: creatorTips.length,
      revenue30d: creatorTips.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2),
      dailyRevenue: Object.entries(dailyRevenue)
        .map(([date, amount]) => ({ date, amount: amount.toFixed(2) }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    };
  }
}
