import { pgTable, text, serial, timestamp, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const adminActionEnum = pgEnum("admin_action", [
  "ban_user", "unban_user", "mute_user", "unmute_user",
  "shadow_ban", "unshadow_ban",
  "change_role", "delete_post", "delete_comment",
  "approve_post", "reject_post", "feature_post", "unfeature_post",
  "pin_post", "unpin_post", "archive_post", "restore_post",
  "approve_community", "delete_community",
  "resolve_report", "dismiss_report",
  "update_settings", "bulk_action"
]);

export const adminLogsTable = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  action: adminActionEnum("action").notNull(),
  adminId: integer("admin_id").notNull().references(() => usersTable.id),
  targetType: text("target_type"), // 'user' | 'post' | 'comment' | 'community' | 'report'
  targetId: integer("target_id"),
  details: jsonb("details"), // Stores additional context about the action
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
