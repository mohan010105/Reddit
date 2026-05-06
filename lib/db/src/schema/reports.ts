import { pgTable, text, serial, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { postsTable } from "./posts";
import { commentsTable } from "./comments";

export const reportStatusEnum = pgEnum("report_status", ["pending", "resolved", "dismissed"]);

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  reason: text("reason").notNull(),
  details: text("details"),
  status: reportStatusEnum("status").notNull().default("pending"),
  postId: integer("post_id").references(() => postsTable.id),
  commentId: integer("comment_id").references(() => commentsTable.id),
  reporterId: integer("reporter_id").notNull().references(() => usersTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});
