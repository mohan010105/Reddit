import { pgTable, serial, text, timestamp, integer, boolean, decimal, pgEnum, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable, postsTable, communitiesTable } from "./index";

// ─── Enums ───────────────────────────────────────────────────────────────────
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active", "past_due", "canceled", "incomplete", "expired", "trialing"
]);

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "free", "premium", "creator", "community_pro"
]);

// ─── Subscriptions ───────────────────────────────────────────────────────────
export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  plan: subscriptionPlanEnum("plan").default("free").notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  razorpaySubscriptionId: text("razorpay_subscription_id").unique(),
  razorpayCustomerId: text("razorpay_customer_id"),
  currentPeriodStart: timestamp("current_period_start").defaultNow(),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  trialEnd: timestamp("trial_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Transactions ────────────────────────────────────────────────────────────
export const transactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("usd").notNull(),
  status: text("status").notNull(), // 'pending', 'succeeded', 'failed', 'refunded'
  type: text("type").notNull(), // 'subscription', 'tip', 'community_join', 'premium_post'
  razorpayOrderId: text("razorpay_order_id").unique(),
  razorpayPaymentId: text("razorpay_payment_id").unique(),
  razorpaySignature: text("razorpay_signature"),
  description: text("description"),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Creator Earnings ────────────────────────────────────────────────────────
export const creatorEarningsTable = pgTable("creator_earnings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  totalEarned: decimal("total_earned", { precision: 12, scale: 2 }).default("0").notNull(),
  pendingBalance: decimal("pending_balance", { precision: 12, scale: 2 }).default("0").notNull(),
  withdrawnAmount: decimal("withdrawn_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  razorpayAccountId: text("razorpay_account_id"),
  lastPayoutAt: timestamp("last_payout_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Payout Requests ─────────────────────────────────────────────────────────
export const payoutRequestsTable = pgTable("payout_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("usd").notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'processing', 'completed', 'failed'
  razorpayPayoutId: text("razorpay_payout_id"),
  adminNote: text("admin_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
});

// ─── User Recommendations ────────────────────────────────────────────────────
export const userRecommendationsTable = pgTable("user_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  targetType: text("target_type").notNull(), // 'post', 'community', 'user'
  targetId: integer("target_id").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  reason: text("reason"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Push Notification Tokens ────────────────────────────────────────────────
export const pushTokensTable = pgTable("push_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastUsedAt: timestamp("last_used_at"),
});

// ─── User Engagement Tracking (for recommendation engine) ────────────────────
export const userEngagementTable = pgTable("user_engagement", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  eventType: text("event_type").notNull(), // 'view', 'click', 'dwell', 'share', 'save'
  targetType: text("target_type").notNull(), // 'post', 'community', 'user'
  targetId: integer("target_id").notNull(),
  duration: integer("duration"), // dwell time in seconds
  metadata: text("metadata"), // JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Subscription Analytics ──────────────────────────────────────────────────
export const subscriptionAnalyticsTable = pgTable("subscription_analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  plan: subscriptionPlanEnum("plan").notNull(),
  newSubscriptions: integer("new_subscriptions").default(0),
  cancellations: integer("cancellations").default(0),
  revenue: decimal("revenue", { precision: 12, scale: 2 }).default("0"),
  mrr: decimal("mrr", { precision: 12, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
