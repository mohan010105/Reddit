import { pgTable, text, serial, timestamp, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { communitiesTable } from "./communities";

export const postTypeEnum = pgEnum("post_type", ["text", "image", "link"]);

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  imageUrl: text("image_url"),
  type: postTypeEnum("type").notNull().default("text"),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  score: integer("score").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  isDeleted: boolean("is_deleted").notNull().default(false),
  authorId: integer("author_id").notNull().references(() => usersTable.id),
  communityId: integer("community_id").notNull().references(() => communitiesTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true, createdAt: true, updatedAt: true, upvotes: true, downvotes: true, score: true, commentCount: true, isDeleted: true });
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof postsTable.$inferSelect;
