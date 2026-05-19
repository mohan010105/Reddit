/**
 * Viral Growth & Referral System
 * Handles invite links, referral tracking, and social sharing optimization
 */
import { redis } from "./redis";
import { logger } from "./logger";

class GrowthService {
  /**
   * Generate Referral Link
   */
  generateReferralLink(userId: string): string {
    const encodedId = Buffer.from(userId).toString("base64").replace(/=/g, "");
    return `https://threadit.app/join?ref=${encodedId}`;
  }

  /**
   * Track Referral Signup
   */
  async trackReferral(referringUserId: string, newUserId: string) {
    const key = `growth:referrals:${referringUserId}`;
    try {
      await redis.connect();
      // Add to referral list
      // @ts-ignore
      await (redis as any).client.sAdd(key, newUserId);
      
      // Reward referring user with karma
      const { gamificationEngine } = await import("./gamification");
      await gamificationEngine.updateKarma(referringUserId, 50); // 50 karma bonus
      
      logger.info({ referringUserId, newUserId }, "Referral tracked successfully");
    } catch (err) {
      logger.error({ err, referringUserId }, "Failed to track referral");
    }
  }

  /**
   * Generate Social Preview Data (OG Tags)
   */
  generateSocialPreview(type: "post" | "community" | "profile", data: any) {
    const baseUrl = "https://threadit.app";
    return {
      title: data.title || data.name || "Threadit",
      description: data.content?.slice(0, 160) || data.description || "Join the conversation",
      image: data.image || `${baseUrl}/og-default.jpg`,
      url: `${baseUrl}/${type}/${data.id || data.slug || data.username}`,
      twitterCard: "summary_large_image",
    };
  }

  /**
   * Viral Coefficient (K-factor) Estimation
   * K = i * c (invites sent * conversion rate)
   */
  async getGrowthMetrics() {
    // Simple mock metrics
    return {
      viralCoefficient: 1.2, // > 1 means exponential growth
      referralRate: 0.15,
      retentionD30: 0.45,
    };
  }
}

export const growthService = new GrowthService();
