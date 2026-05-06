import { relations } from "drizzle-orm";
import { usersTable, communitiesTable, communityMembersTable, postsTable, commentsTable, postVotesTable, commentVotesTable, notificationsTable, savedPostsTable, reportsTable, userFollowsTable } from "./index";

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  comments: many(commentsTable),
  communities: many(communitiesTable),
  members: many(communityMembersTable),
  postVotes: many(postVotesTable),
  commentVotes: many(commentVotesTable),
  notifications: many(notificationsTable, { relationName: "userNotifications" }),
  actedNotifications: many(notificationsTable, { relationName: "actorNotifications" }),
  savedPosts: many(savedPostsTable),
  reports: many(reportsTable),
  following: many(userFollowsTable, { relationName: "follower" }),
  followers: many(userFollowsTable, { relationName: "following" }),
}));

export const communitiesRelations = relations(communitiesTable, ({ one, many }) => ({
  creator: one(usersTable, { fields: [communitiesTable.creatorId], references: [usersTable.id] }),
  members: many(communityMembersTable),
  posts: many(postsTable),
}));

export const communityMembersRelations = relations(communityMembersTable, ({ one }) => ({
  community: one(communitiesTable, { fields: [communityMembersTable.communityId], references: [communitiesTable.id] }),
  user: one(usersTable, { fields: [communityMembersTable.userId], references: [usersTable.id] }),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, { fields: [postsTable.authorId], references: [usersTable.id] }),
  community: one(communitiesTable, { fields: [postsTable.communityId], references: [communitiesTable.id] }),
  comments: many(commentsTable),
  votes: many(postVotesTable),
  saved: many(savedPostsTable),
  reports: many(reportsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  author: one(usersTable, { fields: [commentsTable.authorId], references: [usersTable.id] }),
  post: one(postsTable, { fields: [commentsTable.postId], references: [postsTable.id] }),
  votes: many(commentVotesTable),
}));

export const postVotesRelations = relations(postVotesTable, ({ one }) => ({
  user: one(usersTable, { fields: [postVotesTable.userId], references: [usersTable.id] }),
  post: one(postsTable, { fields: [postVotesTable.postId], references: [postsTable.id] }),
}));

export const commentVotesRelations = relations(commentVotesTable, ({ one }) => ({
  user: one(usersTable, { fields: [commentVotesTable.userId], references: [usersTable.id] }),
  comment: one(commentsTable, { fields: [commentVotesTable.commentId], references: [commentsTable.id] }),
}));

export const notificationsRelations = relations(notificationsTable, ({ one }) => ({
  user: one(usersTable, { fields: [notificationsTable.userId], references: [usersTable.id], relationName: "userNotifications" }),
  actor: one(usersTable, { fields: [notificationsTable.actorId], references: [usersTable.id], relationName: "actorNotifications" }),
  post: one(postsTable, { fields: [notificationsTable.postId], references: [postsTable.id] }),
  comment: one(commentsTable, { fields: [notificationsTable.commentId], references: [commentsTable.id] }),
}));

export const savedPostsRelations = relations(savedPostsTable, ({ one }) => ({
  user: one(usersTable, { fields: [savedPostsTable.userId], references: [usersTable.id] }),
  post: one(postsTable, { fields: [savedPostsTable.postId], references: [postsTable.id] }),
}));

export const reportsRelations = relations(reportsTable, ({ one }) => ({
  reporter: one(usersTable, { fields: [reportsTable.reporterId], references: [usersTable.id] }),
  post: one(postsTable, { fields: [reportsTable.postId], references: [postsTable.id] }),
  comment: one(commentsTable, { fields: [reportsTable.commentId], references: [commentsTable.id] }),
}));

export const userFollowsRelations = relations(userFollowsTable, ({ one }) => ({
  follower: one(usersTable, { fields: [userFollowsTable.followerId], references: [usersTable.id], relationName: "follower" }),
  following: one(usersTable, { fields: [userFollowsTable.followingId], references: [usersTable.id], relationName: "following" }),
}));
