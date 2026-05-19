/**
 * Queue & Background Worker Infrastructure
 * Handles asynchronous task processing for scale
 */
import { logger } from "./logger";
import { redis } from "./redis";

export enum QueueName {
  NOTIFICATIONS = "q:notifications",
  AI_MODERATION = "q:ai_moderation",
  FEED_GENERATION = "q:feed_generation",
  ANALYTICS = "q:analytics",
  RECOM_PROCESSING = "q:recommendation",
  IMAGE_OPTIM = "q:image_optimization"
}

interface Job<T = any> {
  id: string;
  type: string;
  payload: T;
  attempts: number;
  maxAttempts: number;
  timestamp: number;
}

class TaskQueue {
  /**
   * Add a job to a specific queue
   */
  async add<T>(queue: QueueName, type: string, payload: T, maxAttempts: number = 3) {
    const job: Job<T> = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
      type,
      payload,
      attempts: 0,
      maxAttempts,
      timestamp: Date.now(),
    };

    try {
      await redis.connect();
      // Push to the list (queue)
      // @ts-ignore - access raw client if needed or use wrapper
      const client = (redis as any).client;
      await client.lPush(queue, JSON.stringify(job));
      logger.debug({ queue, type, jobId: job.id }, "Job added to queue");
    } catch (err) {
      logger.error({ err, queue, type }, "Failed to add job to queue");
    }
  }

  /**
   * Process jobs from a queue (Worker pattern)
   */
  async process<T>(queue: QueueName, handler: (payload: T) => Promise<void>) {
    await redis.connect();
    const client = (redis as any).client;

    logger.info({ queue }, "Worker started processing queue");

    while (true) {
      try {
        // Block pop (BRPop) - waits for a job to be available
        const result = await client.brPop(queue, 0); // 0 means wait forever
        if (!result) continue;

        const { element } = result;
        const job: Job<T> = JSON.parse(element);

        try {
          await handler(job.payload);
          logger.debug({ queue, jobId: job.id }, "Job processed successfully");
        } catch (handlerErr) {
          logger.error({ err: handlerErr, queue, jobId: job.id }, "Job processing failed");
          
          // Retry logic
          if (job.attempts < job.maxAttempts) {
            job.attempts++;
            // Re-queue with delay (simple backoff)
            await client.lPush(queue, JSON.stringify(job));
          } else {
            logger.warn({ queue, jobId: job.id }, "Job failed after max attempts (Moved to DLQ)");
            await client.lPush(`${queue}:dead_letter`, JSON.stringify(job));
          }
        }
      } catch (err) {
        logger.error({ err, queue }, "Worker loop error");
        await new Promise(r => setTimeout(r, 1000)); // Sleep before retry
      }
    }
  }
}

export const taskQueue = new TaskQueue();
