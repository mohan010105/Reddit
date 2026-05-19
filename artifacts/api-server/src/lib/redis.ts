/**
 * Redis Caching Infrastructure
 * Provides high-performance caching with SWR (Stale-While-Revalidate) support.
 * Gracefully degrades to a no-op in-memory stub when Redis is unavailable.
 */
import { logger } from "./logger";

const REDIS_URL = process.env.REDIS_URL;

// ---------------------------------------------------------------------------
// In-memory fallback cache (when Redis is not available)
// ---------------------------------------------------------------------------
const memoryCache = new Map<string, { data: string; expiresAt: number }>();

function memoryGet(key: string): string | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

function memorySet(key: string, value: string, ttlSeconds?: number) {
  memoryCache.set(key, {
    data: value,
    expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : Infinity,
  });
}

function memoryDel(key: string) {
  memoryCache.delete(key);
}

// Periodic cleanup of expired entries
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryCache) {
    if (entry.expiresAt < now) memoryCache.delete(key);
  }
}, 60_000);

// ---------------------------------------------------------------------------
// Redis Cache (with graceful fallback)
// ---------------------------------------------------------------------------
class RedisCache {
  private client: any = null;
  private isConnected = false;
  private useMemoryFallback = true;

  constructor() {
    if (!REDIS_URL) {
      logger.info("No REDIS_URL configured — using in-memory cache fallback");
      return;
    }

    // Dynamic import to avoid crashing if redis package has issues
    this.initRedis().catch(() => {
      logger.warn("Redis initialization failed — using in-memory cache fallback");
    });
  }

  private async initRedis() {
    try {
      const { createClient } = await import("redis");
      this.client = createClient({
        url: REDIS_URL,
        socket: {
          reconnectStrategy: (retries: number) => {
            if (retries > 5) {
              logger.error("Redis reconnection failed after 5 attempts — falling back to memory cache");
              this.useMemoryFallback = true;
              return new Error("Redis connection lost");
            }
            return Math.min(retries * 200, 5000);
          },
          connectTimeout: 5000,
        },
      });

      this.client.on("error", (err: any) => {
        if (!this.useMemoryFallback) {
          logger.error({ err }, "Redis Client Error — switching to memory fallback");
          this.useMemoryFallback = true;
        }
      });

      this.client.on("connect", () => {
        this.isConnected = true;
        this.useMemoryFallback = false;
        logger.info("Redis Connected");
      });

      await this.client.connect();
    } catch (err) {
      logger.warn({ err }, "Redis connection failed — using memory cache");
      this.useMemoryFallback = true;
    }
  }

  async connect() {
    // No-op — connection is handled in constructor
  }

  // ─── Core Cache Methods ─────────────────────────────────
  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.useMemoryFallback) {
        const value = memoryGet(key);
        return value ? JSON.parse(value) : null;
      }
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      // Fallback to memory
      const value = memoryGet(key);
      return value ? JSON.parse(value) : null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    try {
      if (this.useMemoryFallback) {
        memorySet(key, stringValue, ttlSeconds);
        return;
      }
      if (ttlSeconds) {
        await this.client.setEx(key, ttlSeconds, stringValue);
      } else {
        await this.client.set(key, stringValue);
      }
    } catch (err) {
      memorySet(key, stringValue, ttlSeconds);
    }
  }

  async del(key: string): Promise<void> {
    try {
      if (this.useMemoryFallback) {
        memoryDel(key);
        return;
      }
      await this.client.del(key);
    } catch (err) {
      memoryDel(key);
    }
  }

  // ─── Smart Cache Patterns ───────────────────────────────

  /**
   * Stale-While-Revalidate Pattern
   * Returns cached data immediately, then updates it in background
   */
  async swr<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds: number,
    _staleSeconds: number = 60
  ): Promise<T> {
    const cached = await this.get<{ data: T; expiresAt: number }>(key);
    const now = Date.now();

    if (cached) {
      if (cached.expiresAt > now) {
        return cached.data;
      }
      // Stale — return stale data and revalidate in background
      if (cached.expiresAt + _staleSeconds * 1000 > now) {
        fetcher().then((newData) => this.setSmart(key, newData, ttlSeconds)).catch(() => {});
        return cached.data;
      }
    }

    // No cache — fetch fresh
    const freshData = await fetcher();
    await this.setSmart(key, freshData, ttlSeconds);
    return freshData;
  }

  private async setSmart(key: string, data: any, ttlSeconds: number) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    await this.set(key, { data, expiresAt }, ttlSeconds + 3600);
  }

  // ─── Distributed Locking ───────────────────────────────
  async acquireLock(_resource: string, _ttlMs: number = 5000): Promise<boolean> {
    // In memory-fallback mode, always succeed
    if (this.useMemoryFallback) return true;

    const key = `lock:${_resource}`;
    try {
      const acquired = await this.client.set(key, Date.now().toString(), {
        NX: true,
        PX: _ttlMs,
      });
      return acquired === "OK";
    } catch {
      return true; // Fallback: allow operation
    }
  }

  async releaseLock(resource: string): Promise<void> {
    await this.del(`lock:${resource}`);
  }

  // ─── Hash Operations (for analytics/counters) ───────────
  async hIncrBy(key: string, field: string, increment: number): Promise<number> {
    if (this.useMemoryFallback) {
      // Simple in-memory hash counter
      const hashKey = `hash:${key}:${field}`;
      const current = memoryGet(hashKey);
      const newVal = (current ? parseInt(current, 10) : 0) + increment;
      memorySet(hashKey, String(newVal));
      return newVal;
    }
    try {
      return await this.client.hIncrBy(key, field, increment);
    } catch {
      return 0;
    }
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    if (this.useMemoryFallback) return {};
    try {
      return await this.client.hGetAll(key);
    } catch {
      return {};
    }
  }
}

export const redis = new RedisCache();
