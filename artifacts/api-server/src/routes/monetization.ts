import { Router } from "express";
import { RazorpayService, PLAN_PRICES } from "../services/razorpayService";
import { requireAuth } from "../middlewares/auth";
import { z } from "zod";
import { validate } from "../middlewares/validate";
import { logger } from "../lib/logger";

const router = Router();

// GET /api/payments/subscription
router.get("/subscription", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      logger.error("requireAuth passed but req.user is missing");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    console.log("Logged-in User ID for subscription check:", req.user.id);
    
    // Fallback/compat with previous subscription getters
    const [sub] = await require("../services/razorpayService").db
      .select()
      .from(require("@workspace/db/schema").subscriptionsTable)
      .where(eq(require("@workspace/db/schema").subscriptionsTable.userId, req.user.id));

    res.json(sub || { plan: "free", status: "none", cancelAtPeriodEnd: false });
  } catch (error: any) {
    logger.error({ error: error.message, userId: req.userId }, "Failed to get subscription");
    res.status(500).json({ error: error.message });
  }
});

// Helper for eq
import { eq } from "drizzle-orm";

// POST /api/payments/cancel
router.post("/cancel", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    await require("@workspace/db").db
      .update(require("@workspace/db/schema").subscriptionsTable)
      .set({ 
        plan: "free",
        status: "canceled",
        cancelAtPeriodEnd: true,
        updatedAt: new Date()
      })
      .where(eq(require("@workspace/db/schema").subscriptionsTable.userId, req.user.id));

    res.json({ message: "Subscription cancelled successfully" });
  } catch (error: any) {
    logger.error({ error: error.message, userId: req.userId }, "Failed to cancel subscription");
    res.status(500).json({ error: error.message });
  }
});

// ─── STEP 4 — CREATE ORDER API ───────────────────────────────────────────────

// POST /api/payments/create-order
const createOrderSchema = z.object({
  plan: z.enum(["free", "premium", "creator", "community", "community_pro"]),
});

router.post("/create-order", requireAuth, validate({ body: createOrderSchema }), async (req, res) => {
  try {
    // Forensic step 11: Ensure auth middleware does not block order creation unexpectedly
    // Validate req.user exists, Log req.user.id
    if (!req.user) {
      logger.error("requireAuth completed but req.user is undefined!");
      res.status(401).json({ error: "Unauthorized — missing user context" });
      return;
    }
    
    const userId = req.user.id;
    console.log("Logged-in User ID executing order creation:", userId);
    logger.info({ userId }, "Initiating payment order creation");

    const { plan } = req.body;
    logger.info({ plan, body: req.body }, "[Payments API] Incoming payment order creation request received");

    if (plan === "free") {
      res.status(400).json({ error: "Cannot purchase a free plan" });
      return;
    }

    const priceRupees = PLAN_PRICES[plan as keyof typeof PLAN_PRICES];
    const amountPaise = priceRupees * 100;
    logger.info({ plan, priceRupees, amountPaise }, "[Payments API] Amount determined for plan");

    // Call RazorpayService to create order
    const order = await RazorpayService.createOrder(userId, plan);

    logger.info({ orderId: order.id, amountPaise }, "[Payments API] Razorpay order successfully created on server");

    // Response structure strictly matching step 4:
    // { success: true, order, key: process.env.RAZORPAY_KEY_ID }
    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error("[Payments API] Order creation error:", error);
    logger.error({ error: error.message, body: req.body, stack: error.stack }, "[Payments API] Failed to create order");
    res.status(500).json({ error: error.message || "Failed to initiate payment" });
  }
});

// ─── STEP 9 — VERIFY PAYMENT ──────────────────────────────────────────────────

// POST /api/payments/verify
const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

router.post("/verify", requireAuth, validate({ body: verifySchema }), async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const userId = req.user.id;
    console.log("Logged-in User ID executing payment verification:", userId);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    logger.info(
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      "[Payments API] Incoming verification request signature received"
    );

    const result = await RazorpayService.verifyPayment(
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    res.json(result);
  } catch (error: any) {
    console.error("[Payments API] Verification request failed:", error);
    logger.error({ error: error.message, body: req.body }, "[Payments API] Payment verification failure");
    res.status(400).json({ error: error.message || "Payment verification failed" });
  }
});

// GET /api/payments/history
router.get("/history", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const history = await require("@workspace/db").db
      .select()
      .from(require("@workspace/db/schema").transactionsTable)
      .where(eq(require("@workspace/db/schema").transactionsTable.userId, req.user.id))
      .orderBy(require("drizzle-orm").desc(require("@workspace/db/schema").transactionsTable.createdAt))
      .limit(20);

    res.json(history);
  } catch (error: any) {
    logger.error({ error: error.message, userId: req.userId }, "Failed to fetch payment history");
    res.status(500).json({ error: error.message });
  }
});

export default router;
