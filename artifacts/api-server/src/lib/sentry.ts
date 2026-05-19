/**
 * Backend Sentry Integration
 * Captures unhandled errors, request failures, and performance data
 */
import { logger } from "./logger";

interface SentryBackendConfig {
  dsn: string;
  environment: string;
  release?: string;
  sampleRate?: number;
}

class BackendSentryClient {
  private initialized = false;
  private dsn = "";
  private environment = "development";
  private errorBuffer: Array<{ error: string; stack?: string; extra?: Record<string, unknown>; timestamp: string }> = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;

  init(config: SentryBackendConfig) {
    this.dsn = config.dsn;
    this.environment = config.environment;

    if (!this.dsn || this.dsn === "your-sentry-dsn-here") {
      logger.info("[Sentry] No DSN configured — running in no-op mode");
      return;
    }

    // Flush buffer periodically
    this.flushTimer = setInterval(() => this.flush(), 60000);

    this.initialized = true;
    logger.info(`[Sentry] Backend initialized for ${this.environment}`);
  }

  captureException(error: Error, extra?: Record<string, unknown>) {
    const entry = {
      error: error.message,
      stack: error.stack,
      extra,
      timestamp: new Date().toISOString(),
    };

    this.errorBuffer.push(entry);
    logger.error({ sentry: entry }, `[Sentry] ${error.message}`);

    // Auto-flush on critical errors
    if (this.errorBuffer.length >= 5) {
      this.flush();
    }
  }

  captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
    this.errorBuffer.push({
      error: message,
      extra: { level },
      timestamp: new Date().toISOString(),
    });
  }

  private async flush() {
    if (!this.initialized || this.errorBuffer.length === 0) return;

    const batch = [...this.errorBuffer];
    this.errorBuffer = [];

    try {
      // In production, POST to Sentry API
      const endpoint = this.dsn.replace(
        /^https?:\/\/([^@]+)@([^/]+)\/(.+)$/,
        "https://$2/api/$3/store/",
      );

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          events: batch,
          environment: this.environment,
          platform: "node",
        }),
      });

      if (!response.ok) {
        logger.warn(`[Sentry] Failed to flush: ${response.status}`);
      }
    } catch {
      // Silent fail — re-buffer
      if (this.errorBuffer.length < 100) {
        this.errorBuffer.unshift(...batch);
      }
    }
  }

  destroy() {
    this.flush();
    if (this.flushTimer) clearInterval(this.flushTimer);
  }
}

export const backendSentry = new BackendSentryClient();

export function initBackendSentry() {
  backendSentry.init({
    dsn: process.env.SENTRY_DSN || "",
    environment: process.env.NODE_ENV || "development",
    release: process.env.APP_VERSION || "0.0.0",
  });
}
