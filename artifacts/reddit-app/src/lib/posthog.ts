/**
 * PostHog Analytics — Frontend Integration
 * Product analytics, feature flags, session recording
 */

interface PostHogConfig {
  apiKey: string;
  apiHost?: string;
  autocapture?: boolean;
  capturePageview?: boolean;
  persistence?: "localStorage" | "sessionStorage" | "cookie";
}

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

class PostHogClient {
  private initialized = false;
  private apiKey = "";
  private apiHost = "https://app.posthog.com";
  private distinctId: string | null = null;
  private queue: Array<{ event: string; properties: EventProperties; timestamp: string }> = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private superProperties: EventProperties = {};

  init(config: PostHogConfig) {
    this.apiKey = config.apiKey;
    this.apiHost = config.apiHost || "https://app.posthog.com";

    if (!this.apiKey || this.apiKey === "your-posthog-key-here") {
      console.info("[PostHog] No API key configured — running in no-op mode");
      return;
    }

    // Generate anonymous ID if not set
    this.distinctId = this.getOrCreateAnonymousId();

    // Auto-capture page views
    if (config.capturePageview !== false) {
      this.capturePageview();
      // Listen for SPA route changes
      window.addEventListener("popstate", () => this.capturePageview());
    }

    // Flush queue periodically
    this.flushTimer = setInterval(() => this.flush(), 30000);

    // Flush on page unload
    window.addEventListener("beforeunload", () => this.flush());

    this.initialized = true;
    console.info("[PostHog] Initialized");
  }

  identify(distinctId: string, properties?: EventProperties) {
    this.distinctId = distinctId;
    if (properties) {
      this.capture("$identify", {
        $set: properties as any,
        distinct_id: distinctId,
      });
    }
    try {
      localStorage.setItem("threadit_ph_distinct_id", distinctId);
    } catch {}
  }

  reset() {
    this.distinctId = this.generateAnonymousId();
    try {
      localStorage.removeItem("threadit_ph_distinct_id");
    } catch {}
  }

  capture(event: string, properties: EventProperties = {}) {
    this.queue.push({
      event,
      properties: {
        ...this.superProperties,
        ...properties,
        distinct_id: this.distinctId,
        $current_url: window.location.href,
        $pathname: window.location.pathname,
        $screen_width: window.screen.width,
        $screen_height: window.screen.height,
        $viewport_width: window.innerWidth,
        $viewport_height: window.innerHeight,
        $referrer: document.referrer,
        $device_type: this.getDeviceType(),
      },
      timestamp: new Date().toISOString(),
    });

    // Auto-flush if queue is getting large
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  // ─── Convenience Methods ────────────────────────────────
  capturePageview() {
    this.capture("$pageview", {
      $title: document.title,
    });
  }

  trackFeatureUsage(feature: string, metadata?: EventProperties) {
    this.capture("feature_used", {
      feature,
      ...metadata,
    });
  }

  trackConversion(type: string, value?: number, metadata?: EventProperties) {
    this.capture("conversion", {
      conversion_type: type,
      conversion_value: value,
      ...metadata,
    });
  }

  trackEngagement(action: string, metadata?: EventProperties) {
    this.capture("engagement", {
      action,
      ...metadata,
    });
  }

  trackSubscription(event: string, plan?: string, metadata?: EventProperties) {
    this.capture("subscription_event", {
      subscription_event: event,
      plan,
      ...metadata,
    });
  }

  trackError(error: string, context?: EventProperties) {
    this.capture("error_occurred", {
      error_message: error,
      ...context,
    });
  }

  registerSuperProperties(properties: EventProperties) {
    this.superProperties = { ...this.superProperties, ...properties };
  }

  // ─── Private Methods ────────────────────────────────────
  private async flush() {
    if (this.queue.length === 0 || !this.initialized) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      const payload = {
        api_key: this.apiKey,
        batch: batch.map((item) => ({
          event: item.event,
          properties: item.properties,
          timestamp: item.timestamp,
        })),
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${this.apiHost}/batch/`,
          JSON.stringify(payload),
        );
      } else {
        await fetch(`${this.apiHost}/batch/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } catch {
      // Re-queue failed events (up to limit)
      if (this.queue.length < 100) {
        this.queue.unshift(...batch);
      }
    }
  }

  private getOrCreateAnonymousId(): string {
    try {
      const stored = localStorage.getItem("threadit_ph_distinct_id");
      if (stored) return stored;
    } catch {}
    return this.generateAnonymousId();
  }

  private generateAnonymousId(): string {
    const id = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    try {
      localStorage.setItem("threadit_ph_distinct_id", id);
    } catch {}
    return id;
  }

  private getDeviceType(): string {
    const w = window.innerWidth;
    if (w < 768) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  }

  destroy() {
    this.flush();
    if (this.flushTimer) clearInterval(this.flushTimer);
  }
}

export const posthog = new PostHogClient();

export function initPostHog() {
  posthog.init({
    apiKey: import.meta.env.VITE_POSTHOG_KEY || "",
    apiHost: import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com",
    autocapture: true,
    capturePageview: true,
  });
}
