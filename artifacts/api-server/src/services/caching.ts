import { logger } from "../lib/logger";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  staleAt: number;
}

/**
 * In-memory cache with stale-while-revalidate pattern.
 * Production: replace with Redis for horizontal scaling.
 */
export class CacheService {
  private static store = new Map<string, CacheEntry<any>>();
  private static maxSize = 10000;
  private static hitCount = 0;
  private static missCount = 0;

  // ─── Get cached value ────────────────────────────────────────────────────
  static get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.missCount++;
      return null;
    }

    const now = Date.now();

    // Expired - remove and return null
    if (now > entry.expiresAt) {
      this.store.delete(key);
      this.missCount++;
      return null;
    }

    this.hitCount++;
    return entry.data as T;
  }

  // ─── Set value with TTL ──────────────────────────────────────────────────
  static set<T>(key: string, data: T, ttlSeconds: number, staleTtlSeconds?: number): void {
    // Evict oldest entries if at capacity
    if (this.store.size >= this.maxSize) {
      this.evict();
    }

    const now = Date.now();
    this.store.set(key, {
      data,
      expiresAt: now + ttlSeconds * 1000,
      staleAt: now + (staleTtlSeconds || ttlSeconds) * 1000,
    });
  }

  // ─── Delete a key ────────────────────────────────────────────────────────
  static delete(key: string): void {
    this.store.delete(key);
  }

  // ─── Delete by prefix ────────────────────────────────────────────────────
  static deleteByPrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }

  // ─── Stale-While-Revalidate ──────────────────────────────────────────────
  static async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number,
    staleGraceSec = 60
  ): Promise<T> {
    const entry = this.store.get(key);
    const now = Date.now();

    // Fresh hit
    if (entry && now < entry.staleAt) {
      this.hitCount++;
      return entry.data as T;
    }

    // Stale but within grace period - return stale data and revalidate in background
    if (entry && now < entry.expiresAt) {
      this.hitCount++;
      // Background revalidation
      fetcher().then(data => {
        this.set(key, data, ttlSeconds, ttlSeconds - staleGraceSec);
      }).catch(err => {
        logger.warn({ key, error: err.message }, "Cache revalidation failed");
      });
      return entry.data as T;
    }

    // Cache miss - fetch synchronously
    this.missCount++;
    const data = await fetcher();
    this.set(key, data, ttlSeconds, ttlSeconds - staleGraceSec);
    return data;
  }

  // ─── Clear all cache ─────────────────────────────────────────────────────
  static clear(): void {
    this.store.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  // ─── Get stats ───────────────────────────────────────────────────────────
  static getStats() {
    const total = this.hitCount + this.missCount;
    return {
      size: this.store.size,
      maxSize: this.maxSize,
      hits: this.hitCount,
      misses: this.missCount,
      hitRate: total > 0 ? ((this.hitCount / total) * 100).toFixed(1) + "%" : "N/A",
    };
  }

  // ─── Evict oldest entries ────────────────────────────────────────────────
  private static evict(): void {
    const entries = [...this.store.entries()]
      .sort((a, b) => a[1].expiresAt - b[1].expiresAt);

    // Remove 20% oldest entries
    const toRemove = Math.ceil(entries.length * 0.2);
    for (let i = 0; i < toRemove; i++) {
      this.store.delete(entries[i][0]);
    }
  }
}

// ─── Periodic cleanup of expired entries ────────────────────────────────────
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of CacheService["store"]) {
    if (now > entry.expiresAt) {
      CacheService["store"].delete(key);
    }
  }
}, 60_000); // every 60 seconds
