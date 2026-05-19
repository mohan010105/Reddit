/**
 * Gamification Engine
 * Manages user karma, engagement streaks, and achievement badges
 */
import { redis } from "./redis";
import { logger } from "./logger";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "starter", name: "First Steps", description: "Made your first post", icon: "🌱", requirement: 1 },
  { id: "contributor", name: "Solid Contributor", description: "Reached 100 karma", icon: "⭐", requirement: 100 },
  { id: "hot_streak", name: "On Fire", description: "7 day engagement streak", icon: "🔥", requirement: 7 },
  { id: "top_creator", name: "Elite Creator", description: "Earned $50 in tips", icon: "👑", requirement: 50 },
];

class GamificationEngine {
  /**
   * Update User Karma
   * Calculates new karma based on upvotes/downvotes
   */
  async updateKarma(userId: string, change: number) {
    const key = `user:karma:${userId}`;
    try {
      await redis.connect();
      // @ts-ignore
      const newKarma = await redis.hIncrBy(key, "total", change);
      
      // Check for achievements
      await this.checkAchievements(userId, newKarma);
      return newKarma;
    } catch (err) {
      logger.error({ err, userId }, "Failed to update karma");
      return 0;
    }
  }

  /**
   * Track Daily Streak
   * Uses Redis to track consecutive days of activity
   */
  async trackStreak(userId: string) {
    const today = new Date().toISOString().split("T")[0];
    const streakKey = `user:streak:${userId}`;
    
    try {
      const lastActive = await redis.get(`${streakKey}:last`);
      let currentStreak = parseInt(await redis.get(streakKey) || "0");

      if (lastActive === today) return currentStreak;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastActive === yesterdayStr) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }

      await redis.set(streakKey, currentStreak.toString(), 86400 * 2);
      await redis.set(`${streakKey}:last`, today, 86400 * 2);

      if (currentStreak >= 7) {
        await this.unlockAchievement(userId, "hot_streak");
      }

      return currentStreak;
    } catch (err) {
      logger.error({ err, userId }, "Failed to track streak");
      return 0;
    }
  }

  private async checkAchievements(userId: string, karma: number) {
    if (karma >= 100) await this.unlockAchievement(userId, "contributor");
  }

  async unlockAchievement(userId: string, achievementId: string) {
    const key = `user:achievements:${userId}`;
    const alreadyUnlocked = await redis.get(`${key}:${achievementId}`);
    
    if (!alreadyUnlocked) {
      await redis.set(`${key}:${achievementId}`, "true");
      logger.info({ userId, achievementId }, "Achievement unlocked!");
      // This would trigger a notification in production
    }
  }

  async getLeaderboard(limit: number = 10) {
    // In production, use Redis Sorted Set (ZSET) for karma leaderboard
    return [];
  }
}

export const gamificationEngine = new GamificationEngine();
