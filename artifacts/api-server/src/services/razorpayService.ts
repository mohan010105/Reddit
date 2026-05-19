import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "@workspace/db";
import { 
  transactionsTable, 
  subscriptionsTable, 
  usersTable
} from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

// Validate env is loaded
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

// Log env status safely
console.log("Razorpay key exists:", !!process.env.RAZORPAY_KEY_ID);
logger.info({ keyIdExists: !!RAZORPAY_KEY_ID, secretExists: !!RAZORPAY_KEY_SECRET }, "Razorpay initialization keys check");

let razorpayInstance: InstanceType<typeof Razorpay> | null = null;
try {
  if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    logger.info("Razorpay SDK client successfully initialized");
  } else {
    logger.error("Razorpay keys missing from process.env — payments will fail");
  }
} catch (err) {
  logger.error({ err }, "Error during Razorpay SDK constructor execution");
}

export function getRazorpayClient(): InstanceType<typeof Razorpay> {
  if (!razorpayInstance) {
    throw new Error("Razorpay client is uninitialized. Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in env.");
  }
  return razorpayInstance;
}

// Plan Pricing Mapping (Rupees)
export const PLAN_PRICES = {
  free: 0,
  premium: 499,
  creator: 999,
  community: 1499,
  community_pro: 1499, // Fallback/alias support
} as const;

export class RazorpayService {
  // ─── Create Razorpay Order ────────────────────────────────────────────────
  static async createOrder(userId: number, plan: string) {
    const client = getRazorpayClient();
    
    // Validate plan
    const planKey = plan.toLowerCase() as keyof typeof PLAN_PRICES;
    const priceRupees = PLAN_PRICES[planKey];
    if (priceRupees === undefined) {
      throw new Error(`Invalid subscription plan: "${plan}"`);
    }

    const amountPaise = priceRupees * 100;
    
    logger.info({ userId, plan, priceRupees, amountPaise }, "[Razorpay] Creating new payment order request");

    // Invoke Razorpay API
    const order = await client.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `sub_${plan}_u${userId}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        plan: plan,
        type: "subscription",
      },
    });

    logger.info({ orderId: order.id }, "[Razorpay] Order created successfully via SDK");

    // Save pending transaction in local database
    await db.insert(transactionsTable).values({
      userId,
      amount: priceRupees.toString(),
      currency: "INR",
      status: "pending",
      type: "subscription",
      razorpayOrderId: order.id,
      description: `Upgrade to Threadit Premium (${plan})`,
      metadata: JSON.stringify({ plan }),
    });

    return order;
  }

  // ─── Verify Razorpay Signature and Activate Subscription ─────────────────
  static async verifyPayment(
    userId: number,
    orderId: string,
    paymentId: string,
    signature: string
  ) {
    logger.info({ orderId, paymentId }, "[Razorpay] Verifying payment signature");

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("Cannot verify payment signature: RAZORPAY_KEY_SECRET is not configured");
    }

    // 1. Generate expected signature
    const text = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    // 2. Compare signatures
    const isValid = expectedSignature === signature;
    if (!isValid) {
      logger.error({ orderId, paymentId }, "[Razorpay] Payment verification signature mismatch");
      throw new Error("Invalid payment signature");
    }

    logger.info({ orderId, paymentId }, "[Razorpay] Signature verified successfully. Proceeding with DB updates.");

    // 3. Fetch original pending transaction
    const [transaction] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.razorpayOrderId, orderId));

    if (!transaction) {
      logger.error({ orderId }, "[Razorpay] Missing transaction record for order ID");
      throw new Error("Transaction record not found for this order");
    }

    // 4. Update transaction table status to 'succeeded'
    await db
      .update(transactionsTable)
      .set({
        status: "succeeded",
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
      })
      .where(eq(transactionsTable.razorpayOrderId, orderId));

    // 5. Activate premium & insert/update subscriptionsTable
    const metadata = transaction.metadata ? JSON.parse(transaction.metadata) : {};
    const plan = metadata.plan || "premium";
    
    const [existingSub] = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, userId));

    const periodStart = new Date();
    const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days active

    if (existingSub) {
      await db
        .update(subscriptionsTable)
        .set({
          plan: plan,
          status: "active",
          razorpaySubscriptionId: paymentId,
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          updatedAt: new Date(),
        })
        .where(eq(subscriptionsTable.userId, userId));
    } else {
      await db.insert(subscriptionsTable).values({
        userId,
        plan: plan,
        status: "active",
        razorpaySubscriptionId: paymentId,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      });
    }

    // 6. Update users table with subscriptionPlan and premiumUntil
    await db
      .update(usersTable)
      .set({
        subscriptionPlan: plan,
        premiumUntil: periodEnd,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, userId));

    logger.info({ userId, plan, periodEnd }, "[Razorpay] User record and subscriptionsTable updated successfully");

    return { success: true };
  }
}
