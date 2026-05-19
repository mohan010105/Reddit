/**
 * Frontend Scalability & Traffic Optimization
 * Implements request batching, query deduplication, and virtualization helpers
 */

// ─── Request Batcher ──────────────────────────────────────
class RequestBatcher {
  private queue: Map<string, { promise: Promise<any>; resolve: Function; reject: Function }> = new Map();
  private batchTimeout: number = 50; // ms

  /**
   * Deduplicates identical requests in flight
   */
  async deduplicate<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = this.queue.get(key);
    if (existing) return existing.promise;

    let resolveFn: Function, rejectFn: Function;
    const promise = new Promise<T>((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });

    this.queue.set(key, { promise, resolve: resolveFn!, reject: rejectFn! });

    try {
      const result = await fetcher();
      this.queue.get(key)?.resolve(result);
      return result;
    } catch (err) {
      this.queue.get(key)?.reject(err);
      throw err;
    } finally {
      this.queue.delete(key);
    }
  }

  /**
   * Batches multiple requests into a single API call
   * Useful for analytics, metadata fetching, etc.
   */
  // (Simplified implementation for demonstration)
  private batch: any[] = [];
  private timer: any = null;

  addToBatch(item: any, handler: (items: any[]) => Promise<void>) {
    this.batch.push(item);
    if (this.timer) clearTimeout(this.timer);
    
    this.timer = setTimeout(async () => {
      const currentBatch = [...this.batch];
      this.batch = [];
      await handler(currentBatch);
    }, this.batchTimeout);
  }
}

export const requestBatcher = new RequestBatcher();

// ─── Rendering Optimization (Virtualization Helper) ───────
export function getVisibleItems<T>(items: T[], scrollTop: number, viewHeight: number, itemHeight: number) {
  const start = Math.floor(scrollTop / itemHeight);
  const end = Math.ceil((scrollTop + viewHeight) / itemHeight);
  const buffer = 5;
  
  return {
    items: items.slice(Math.max(0, start - buffer), Math.min(items.length, end + buffer)),
    startIndex: Math.max(0, start - buffer),
    totalHeight: items.length * itemHeight,
    offset: Math.max(0, start - buffer) * itemHeight
  };
}
