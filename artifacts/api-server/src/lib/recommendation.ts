/**
 * Advanced Recommendation Scoring Engine
 * Uses a weighted algorithm to rank content based on user interest and engagement
 */
import { redis } from "./redis";
import { logger } from "./logger";

interface ScoringFactors {
  recurrency: number;    // Time decay
  popularity: number;    // Upvotes / engagement
  affinity: number;      // User interest match
  velocity: number;      // Engagement rate (trending)
  diversity: number;     // Content novelty
}

class RecommendationEngine {
  /**
   * Calculate a recommendation score for a piece of content
   */
  calculateScore(factors: ScoringFactors): number {
    const { recurrency, popularity, affinity, velocity, diversity } = factors;
    
    // Wilson Score / Reddit-style decay algorithm
    const timeDecay = Math.pow(Math.E, -0.05 * recurrency);
    const engagement = (popularity * 0.4) + (velocity * 0.6);
    
    return (engagement * timeDecay * affinity * diversity);
  }

  /**
   * Track user engagement to build interest embeddings
   */
  async trackEngagement(userId: string | number, category: string, weight: number) {
    const id = String(userId);
    const key = `user:interests:${id}`;
    try {
      await redis.hIncrBy(key, category, weight);
    } catch (err) {
      logger.error({ err, userId: id, category }, "Failed to track engagement");
    }
  }

  /**
   * Get personalized recommendations for a user
   * Accepts both string and number userId.
   */
  async getPersonalizedFeed(userId: string | number, candidates: any[]) {
    const id = String(userId);
    const userInterests = await redis.hGetAll(`user:interests:${id}`);
    
    return candidates.map(item => {
      const affinity = this.calculateAffinity(item.category, userInterests);
      const score = this.calculateScore({
        recurrency: this.getRecurrency(item.createdAt),
        popularity: item.upvotes || 0,
        affinity,
        velocity: item.commentCount || 0,
        diversity: 1.0 // Simple placeholder
      });
      
      return { ...item, recommendationScore: score };
    }).sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  private calculateAffinity(itemCategory: string, userInterests: Record<string, string>): number {
    const interestScore = parseFloat(userInterests[itemCategory] || "0");
    // Normalize and add baseline
    return 1.0 + (Math.log1p(interestScore) / 10);
  }

  private getRecurrency(createdAt: Date | string): number {
    const ageInHours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 3600);
    return Math.max(0, 24 - ageInHours);
  }
}

export const recommendationEngine = new RecommendationEngine();
