import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// ─── Phase 5: Monitoring Initialization ─────────────────────
import { initSentry, sentry } from "./lib/sentry";
import { initPostHog } from "./lib/posthog";
import { observeWebVitals, observeLongTasks } from "./lib/performance";
import { setWebsiteStructuredData } from "./lib/seo";

// Initialize monitoring BEFORE rendering
initSentry();
initPostHog();

// ─── Render App ─────────────────────────────────────────────
createRoot(document.getElementById("root")!).render(<App />);

// ─── SEO: Structured Data ───────────────────────────────────
setWebsiteStructuredData();

// ─── PWA Service Worker Registration ────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      // Check for updates every 60 seconds
      setInterval(() => {
        registration.update();
      }, 60 * 1000);

      // Handle updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "activated" && navigator.serviceWorker.controller) {
              // New version available - show update notification
              console.info("[SW] New version available, reload to update.");
            }
          });
        }
      });

      console.info("[SW] Registered successfully:", registration.scope);
    } catch (error) {
      console.error("[SW] Registration failed:", error);
      sentry.captureException(error instanceof Error ? error : new Error(String(error)), {
        source: "service-worker-registration",
      });
    }
  });
}

// ─── Performance Monitoring ─────────────────────────────────
if (typeof window !== "undefined" && "performance" in window) {
  window.addEventListener("load", () => {
    // Report Web Vitals to monitoring
    observeWebVitals((vital) => {
      sentry.addBreadcrumb({
        category: "web-vital",
        message: `${vital.name}: ${vital.value.toFixed(1)} (${vital.rating})`,
        level: vital.rating === "poor" ? "warning" : "info",
        data: vital as any,
      });

      if (vital.rating === "poor") {
        console.warn(`[Perf] Poor ${vital.name}: ${vital.value.toFixed(1)}`);
      }
    });

    // Monitor long tasks (>50ms)
    observeLongTasks((duration, startTime) => {
      if (duration > 100) {
        sentry.addBreadcrumb({
          category: "performance",
          message: `Long task detected: ${duration.toFixed(0)}ms`,
          level: "warning",
          data: { duration, startTime },
        });
      }
    });

    // Report page load metrics
    setTimeout(() => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigation) {
        const metrics = {
          dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
          tcp: Math.round(navigation.connectEnd - navigation.connectStart),
          ttfb: Math.round(navigation.responseStart - navigation.requestStart),
          domReady: Math.round(navigation.domContentLoadedEventEnd - navigation.startTime),
          load: Math.round(navigation.loadEventEnd - navigation.startTime),
        };
        console.info("[Perf] Page Load Metrics:", metrics);
      }
    }, 1000);
  });
}
