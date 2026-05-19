import { pgTable, text, serial, timestamp, integer, real, jsonb, boolean, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { postsTable } from "./posts";
import { commentsTable } from "./comments";

export const moderationStatusEnum = pgEnum("moderation_status", [
  "pending", "approved", "rejected", "flagged", "auto_approved", "auto_rejected"
]);

export const aiModerationLogsTable = pgTable("ai_moderation_logs", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(), // 'post' | 'comment'
  contentId: integer("content_id").notNull(),
  authorId: integer("author_id").references(() => usersTable.id),
  
  // AI Scores (0.0 to 1.0)
  toxicityScore: real("toxicity_score").default(0),
  spamScore: real("spam_score").default(0),
  hateSpeechScore: real("hate_speech_score").default(0),
  nsfwScore: real("nsfw_score").default(0),
  overallScore: real("overall_score").default(0),
  
  // AI Decision
  status: moderationStatusEnum("status").notNull().default("pending"),
  confidence: real("confidence").default(0),
  reason: text("reason"),
  categories: jsonb("categories"), // Array of flagged categories
  
  // Processing
  isProcessed: boolean("is_processed").notNull().default(false),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  reviewedBy: integer("reviewed_by").references(() => usersTable.id),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const moderationActionsTable = pgTable("moderation_actions", {
  id: serial("id").primaryKey(),
  moderatorId: integer("moderator_id").notNull().references(() => usersTable.id),
  targetType: text("target_type").notNull(), // 'user' | 'post' | 'comment'
  targetId: integer("target_id").notNull(),
  action: text("action").notNull(), // 'approve' | 'reject' | 'remove' | 'warn' | 'ban' etc.
  reason: text("reason"),
  details: jsonb("details"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const platformSettingsTable = pgTable("platform_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedBy: integer("updated_by").references(() => usersTable.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});
