/**
 * Reliability Engineering — Retry, Fallback, Offline Handling
 */

// ─── Retry with Exponential Backoff ───────────────────────
interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryCondition?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    retryCondition = () => true,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries || !retryCondition(error)) {
        throw error;
      }

      const delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt) + Math.random() * 500, maxDelay);
      onRetry?.(attempt + 1, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// ─── Circuit Breaker ──────────────────────────────────────
type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  halfOpenMax?: number;
}

export class CircuitBreaker {
  private state: CircuitState = "CLOSED";
  private failures = 0;
  private lastFailureTime = 0;
  private halfOpenAttempts = 0;
  private readonly failureThreshold: number;
  private readonly resetTimeout: number;
  private readonly halfOpenMax: number;

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold ?? 5;
    this.resetTimeout = options.resetTimeout ?? 60000;
    this.halfOpenMax = options.halfOpenMax ?? 1;
  }

  async execute<T>(fn: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = "HALF_OPEN";
        this.halfOpenAttempts = 0;
      } else if (fallback) {
        return fallback();
      } else {
        throw new Error("Circuit breaker is OPEN");
      }
    }

    if (this.state === "HALF_OPEN" && this.halfOpenAttempts >= this.halfOpenMax) {
      if (fallback) return fallback();
      throw new Error("Circuit breaker HALF_OPEN limit reached");
    }

    try {
      if (this.state === "HALF_OPEN") this.halfOpenAttempts++;
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      if (fallback) return fallback();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

// ─── Timeout Wrapper ──────────────────────────────────────
export function withTimeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(message || `Operation timed out after ${ms}ms`));
    }, ms);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

// ─── Offline Queue ────────────────────────────────────────
interface QueuedAction {
  id: string;
  action: string;
  payload: unknown;
  timestamp: number;
}

class OfflineQueue {
  private queue: QueuedAction[] = [];
  private processing = false;
  private storageKey = "threadit_offline_queue";

  constructor() {
    this.load();
    window.addEventListener("online", () => this.processQueue());
  }

  enqueue(action: string, payload: unknown) {
    const item: QueuedAction = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      action,
      payload,
      timestamp: Date.now(),
    };
    this.queue.push(item);
    this.save();
    // Try to process immediately if online
    if (navigator.onLine) this.processQueue();
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0 || !navigator.onLine) return;
    this.processing = true;

    const toProcess = [...this.queue];
    for (const item of toProcess) {
      try {
        // Process based on action type - this would be connected to actual API calls
        console.info(`[OfflineQueue] Processing: ${item.action}`, item.payload);
        // Remove from queue on success
        this.queue = this.queue.filter((q) => q.id !== item.id);
        this.save();
      } catch (error) {
        console.warn(`[OfflineQueue] Failed to process ${item.action}:`, error);
        // Keep in queue for retry
        break;
      }
    }

    this.processing = false;
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  clear() {
    this.queue = [];
    this.save();
  }

  private save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch {}
  }

  private load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) this.queue = JSON.parse(stored);
    } catch {}
  }
}

export const offlineQueue = new OfflineQueue();

// ─── Graceful Degradation Helper ──────────────────────────
export function gracefulDegradation<T>(
  primary: () => Promise<T>,
  fallback: () => T | Promise<T>,
  options?: { timeout?: number; silent?: boolean },
): Promise<T> {
  const { timeout = 5000, silent = false } = options || {};

  return withTimeout(primary(), timeout).catch((error) => {
    if (!silent) {
      console.warn("[GracefulDegradation] Primary failed, using fallback:", error);
    }
    return fallback();
  });
}

// ─── Debounced API Call ───────────────────────────────────
export function debouncedAsync<T>(
  fn: (...args: any[]) => Promise<T>,
  delay: number,
): (...args: any[]) => Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  let pendingResolve: ((value: T) => void) | null = null;
  let pendingReject: ((reason: unknown) => void) | null = null;

  return (...args: any[]) => {
    return new Promise<T>((resolve, reject) => {
      if (timer) clearTimeout(timer);
      pendingResolve = resolve;
      pendingReject = reject;
      timer = setTimeout(async () => {
        try {
          const result = await fn(...args);
          pendingResolve?.(result);
        } catch (error) {
          pendingReject?.(error);
        }
      }, delay);
    });
  };
}
