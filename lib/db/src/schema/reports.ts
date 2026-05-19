import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { postsTable } from "./posts";
import { commentsTable } from "./comments";

export const reportStatusEnum = pgEnum("report_status", ["pending", "resolved", "dismissed"]);
export const reportReasonEnum = pgEnum("report_reason", [
  "spam", "harassment", "hate_speech", "violence", "nsfw",
  "misinformation", "self_harm", "impersonation", "copyright", "other"
]);

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  reason: text("reason").notNull(),
  reasonCategory: reportReasonEnum("reason_category").default("other"),
  details: text("details"),
  status: reportStatusEnum("status").notNull().default("pending"),
  postId: integer("post_id").references(() => postsTable.id),
  commentId: integer("comment_id").references(() => commentsTable.id),
  reportedUserId: integer("reported_user_id").references(() => usersTable.id),
  reporterId: integer("reporter_id").notNull().references(() => usersTable.id),
  resolvedBy: integer("resolved_by").references(() => usersTable.id),
  resolutionNote: text("resolution_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});
