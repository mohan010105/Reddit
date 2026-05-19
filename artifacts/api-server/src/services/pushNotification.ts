import webpush from "web-push";
import { db } from "@workspace/db";
import { pushTokensTable, notificationsTable, usersTable } from "@workspace/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { logger } from "../lib/logger";

// ─── VAPID Keys Configuration ───────────────────────────────────────────────
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@threadit.app";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  try {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  } catch (error) {
    logger.error({ error }, "Failed to set VAPID details. Push notifications will not work.");
  }
}

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
  data?: Record<string, any>;
}

export class PushNotificationService {
  // ─── Register Push Subscription ──────────────────────────────────────────
  static async registerSubscription(
    userId: number,
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
    userAgent?: string
  ) {
    // Check for existing subscription
    const existing = await db.select()
      .from(pushTokensTable)
      .where(and(
        eq(pushTokensTable.userId, userId),
        eq(pushTokensTable.endpoint, subscription.endpoint)
      ));

    if (existing.length > 0) {
      await db.update(pushTokensTable)
        .set({ lastUsedAt: new Date() })
        .where(eq(pushTokensTable.id, existing[0].id));
      return existing[0];
    }

    const [token] = await db.insert(pushTokensTable).values({
      userId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      userAgent,
    }).returning();

    logger.info({ userId }, "Push subscription registered");
    return token;
  }

  // ─── Unregister Push Subscription ────────────────────────────────────────
  static async unregisterSubscription(userId: number, endpoint: string) {
    await db.delete(pushTokensTable)
      .where(and(
        eq(pushTokensTable.userId, userId),
        eq(pushTokensTable.endpoint, endpoint)
      ));
  }

  // ─── Send Push to User ──────────────────────────────────────────────────
  static async sendToUser(userId: number, payload: PushPayload) {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      logger.warn("VAPID keys not configured, skipping push notification");
      return;
    }

    const tokens = await db.select()
      .from(pushTokensTable)
      .where(eq(pushTokensTable.userId, userId));

    if (tokens.length === 0) return;

    const notification = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || "/icon-192x192.png",
      badge: payload.badge || "/icon-192x192.png",
      url: payload.url || "/",
      tag: payload.tag,
      ...payload.data,
    });

    const results = await Promise.allSettled(
      tokens.map(token =>
        webpush.sendNotification(
          {
            endpoint: token.endpoint,
            keys: { p256dh: token.p256dh, auth: token.auth },
          },
          notification
        )
      )
    );

    // Clean up expired subscriptions
    for (let i = 0; i < results.length; i++) {
      if (results[i].status === "rejected") {
        const error = (results[i] as PromiseRejectedResult).reason;
        if (error?.statusCode === 404 || error?.statusCode === 410) {
          // Subscription expired, remove it
          await db.delete(pushTokensTable)
            .where(eq(pushTokensTable.id, tokens[i].id));
          logger.info({ userId, tokenId: tokens[i].id }, "Removed expired push subscription");
        }
      }
    }

    const successful = results.filter(r => r.status === "fulfilled").length;
    logger.info({ userId, sent: successful, total: tokens.length }, "Push notifications sent");
  }

  // ─── Broadcast to Multiple Users ────────────────────────────────────────
  static async broadcast(userIds: number[], payload: PushPayload) {
    const batchSize = 50;
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map(userId => this.sendToUser(userId, payload))
      );
    }
  }

  // ─── Get VAPID Public Key ───────────────────────────────────────────────
  static getVapidPublicKey() {
    return VAPID_PUBLIC_KEY;
  }

  // ─── Notification Types ─────────────────────────────────────────────────
  static async notifyNewComment(userId: number, postTitle: string, commenterName: string) {
    await this.sendToUser(userId, {
      title: "New Comment",
      body: `${commenterName} commented on "${postTitle}"`,
      url: "/notifications",
      tag: "comment",
    });
  }

  static async notifyMention(userId: number, mentionerName: string) {
    await this.sendToUser(userId, {
      title: "You were mentioned",
      body: `${mentionerName} mentioned you in a post`,
      url: "/notifications",
      tag: "mention",
    });
  }

  static async notifyNewFollower(userId: number, followerName: string) {
    await this.sendToUser(userId, {
      title: "New Follower",
      body: `${followerName} started following you`,
      url: "/notifications",
      tag: "follow",
    });
  }

  static async notifySubscriptionUpdate(userId: number, plan: string) {
    await this.sendToUser(userId, {
      title: "Subscription Updated",
      body: `Your ${plan} subscription is now active!`,
      url: "/premium",
      tag: "subscription",
    });
  }
}
