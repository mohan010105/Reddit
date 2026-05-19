/**
 * Sentry Error Tracking — Frontend Integration
 * Initialize in main.tsx before React renders.
 */

interface SentryConfig {
  dsn: string;
  environment: string;
  release?: string;
  tracesSampleRate?: number;
  replaysSessionSampleRate?: number;
  replaysOnErrorSampleRate?: number;
}

interface BreadcrumbData {
  category: string;
  message: string;
  level?: "debug" | "info" | "warning" | "error" | "fatal";
  data?: Record<string, unknown>;
}

class SentryClient {
  private initialized = false;
  private dsn: string = "";
  private environment: string = "development";
  private breadcrumbs: BreadcrumbData[] = [];
  private tags: Record<string, string> = {};
  private user: { id?: string; email?: string; username?: string } | null = null;

  init(config: SentryConfig) {
    this.dsn = config.dsn;
    this.environment = config.environment;

    if (!this.dsn || this.dsn === "your-sentry-dsn-here") {
      console.info("[Sentry] No DSN configured — running in no-op mode");
      return;
    }

    // Setup global error handlers
    window.addEventListener("error", (event) => {
      this.captureException(event.error || new Error(event.message), {
        source: "window.onerror",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      this.captureException(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        { source: "unhandledrejection" },
      );
    });

    this.initialized = true;
    console.info(`[Sentry] Initialized for ${this.environment}`);
  }

  setUser(user: { id: string; email?: string; username?: string } | null) {
    this.user = user;
  }

  setTag(key: string, value: string) {
    this.tags[key] = value;
  }

  addBreadcrumb(breadcrumb: BreadcrumbData) {
    this.breadcrumbs.push({
      ...breadcrumb,
      level: breadcrumb.level || "info",
    });
    // Keep only last 100 breadcrumbs
    if (this.breadcrumbs.length > 100) {
      this.breadcrumbs = this.breadcrumbs.slice(-100);
    }
  }

  captureException(error: Error, extra?: Record<string, unknown>) {
    const event = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      user: this.user,
      tags: this.tags,
      breadcrumbs: this.breadcrumbs.slice(-20),
      extra,
    };

    if (this.initialized && this.dsn) {
      // In production, this would send to Sentry API
      this.sendToSentry(event);
    }

    // Always log to console in dev
    if (this.environment !== "production") {
      console.error("[Sentry] Captured:", error.message, extra);
    }
  }

  captureMessage(message: string, level: BreadcrumbData["level"] = "info") {
    const event = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      message,
      level,
      user: this.user,
      tags: this.tags,
    };

    if (this.initialized && this.dsn) {
      this.sendToSentry(event);
    }
  }

  private async sendToSentry(event: Record<string, unknown>) {
    try {
      // POST to Sentry API (using the store endpoint format)
      // In production, replace with actual Sentry SDK or API call
      const endpoint = this.dsn.replace(
        /^https?:\/\/([^@]+)@([^/]+)\/(.+)$/,
        "https://$2/api/$3/store/",
      );

      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, JSON.stringify(event));
      } else {
        fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(event),
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        }).catch(() => {
          // Silently fail — monitoring should never crash the app
        });
      }
    } catch {
      // Silent fail
    }
  }

  // Performance monitoring
  startTransaction(name: string) {
    const start = performance.now();
    return {
      name,
      startTime: start,
      finish: () => {
        const duration = performance.now() - start;
        this.addBreadcrumb({
          category: "performance",
          message: `Transaction "${name}" completed in ${duration.toFixed(1)}ms`,
          level: duration > 3000 ? "warning" : "info",
          data: { duration, name },
        });
      },
    };
  }
}

export const sentry = new SentryClient();

export function initSentry() {
  sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    environment: import.meta.env.MODE || "development",
    release: import.meta.env.VITE_APP_VERSION || "0.0.0",
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
