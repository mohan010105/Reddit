import { relations } from "drizzle-orm";
import { usersTable, communitiesTable, communityMembersTable, postsTable, commentsTable, postVotesTable, commentVotesTable, notificationsTable, savedPostsTable, collectionsTable, reportsTable, userFollowsTable } from "./index";
import { adminLogsTable } from "./admin_logs";
import { aiModerationLogsTable, moderationActionsTable } from "./ai_moderation";
import { subscriptionsTable, transactionsTable, creatorEarningsTable, payoutRequestsTable, userRecommendationsTable } from "./monetization";

export const usersRelations = relations(usersTable, ({ one, many }) => ({
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
  adminLogs: many(adminLogsTable),
  moderationActions: many(moderationActionsTable),
  subscriptions: many(subscriptionsTable),
  transactions: many(transactionsTable),
  creatorEarnings: one(creatorEarningsTable),
  payoutRequests: many(payoutRequestsTable),
  recommendations: many(userRecommendationsTable),
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
  aiModerationLogs: many(aiModerationLogsTable),
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
  collection: one(collectionsTable, { fields: [savedPostsTable.collectionId], references: [collectionsTable.id] }),
}));

export const collectionsRelations = relations(collectionsTable, ({ one, many }) => ({
  user: one(usersTable, { fields: [collectionsTable.userId], references: [usersTable.id] }),
  savedPosts: many(savedPostsTable),
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

export const adminLogsRelations = relations(adminLogsTable, ({ one }) => ({
  admin: one(usersTable, { fields: [adminLogsTable.adminId], references: [usersTable.id] }),
}));

export const aiModerationLogsRelations = relations(aiModerationLogsTable, ({ one }) => ({
  author: one(usersTable, { fields: [aiModerationLogsTable.authorId], references: [usersTable.id] }),
  reviewer: one(usersTable, { fields: [aiModerationLogsTable.reviewedBy], references: [usersTable.id] }),
}));

export const moderationActionsRelations = relations(moderationActionsTable, ({ one }) => ({
  moderator: one(usersTable, { fields: [moderationActionsTable.moderatorId], references: [usersTable.id] }),
}));

export const subscriptionsRelations = relations(subscriptionsTable, ({ one }) => ({
  user: one(usersTable, { fields: [subscriptionsTable.userId], references: [usersTable.id] }),
}));

export const transactionsRelations = relations(transactionsTable, ({ one }) => ({
  user: one(usersTable, { fields: [transactionsTable.userId], references: [usersTable.id] }),
}));

export const creatorEarningsRelations = relations(creatorEarningsTable, ({ one }) => ({
  user: one(usersTable, { fields: [creatorEarningsTable.userId], references: [usersTable.id] }),
}));

export const payoutRequestsRelations = relations(payoutRequestsTable, ({ one }) => ({
  user: one(usersTable, { fields: [payoutRequestsTable.userId], references: [usersTable.id] }),
}));

export const userRecommendationsRelations = relations(userRecommendationsTable, ({ one }) => ({
  user: one(usersTable, { fields: [userRecommendationsTable.userId], references: [usersTable.id] }),
}));
