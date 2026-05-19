/**
 * Frontend Performance Monitoring & Web Vitals
 */

interface WebVital {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
}

type VitalCallback = (vital: WebVital) => void;

const thresholds: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(name: string, value: number): WebVital["rating"] {
  const t = thresholds[name];
  if (!t) return "good";
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
}

// ─── Observe Core Web Vitals ──────────────────────────────
export function observeWebVitals(callback: VitalCallback) {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1] as any;
      if (last) {
        const value = last.startTime;
        callback({ name: "LCP", value, rating: getRating("LCP", value), delta: value });
      }
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}

  // First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as any;
        const value = e.processingStart - e.startTime;
        callback({ name: "FID", value, rating: getRating("FID", value), delta: value });
      }
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {}

  // Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      callback({ name: "CLS", value: clsValue, rating: getRating("CLS", clsValue), delta: clsValue });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {}

  // First Contentful Paint (FCP)
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          callback({
            name: "FCP",
            value: entry.startTime,
            rating: getRating("FCP", entry.startTime),
            delta: entry.startTime,
          });
        }
      }
    });
    fcpObserver.observe({ type: "paint", buffered: true });
  } catch {}

  // Time to First Byte (TTFB)
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (nav) {
      const value = nav.responseStart - nav.requestStart;
      callback({ name: "TTFB", value, rating: getRating("TTFB", value), delta: value });
    }
  } catch {}
}

// ─── Performance Budget Monitor ───────────────────────────
export function checkPerformanceBudget() {
  const budget = {
    jsSize: 500 * 1024, // 500KB
    cssSize: 100 * 1024, // 100KB
    imgSize: 2 * 1024 * 1024, // 2MB total
    totalRequests: 50,
    domNodes: 1500,
  };

  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const jsResources = resources.filter((r) => r.name.endsWith(".js") || r.name.includes(".js?"));
  const cssResources = resources.filter((r) => r.name.endsWith(".css") || r.name.includes(".css?"));
  const imgResources = resources.filter((r) => /\.(jpg|jpeg|png|webp|gif|svg|avif)/i.test(r.name));

  const jsSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const cssSize = cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const imgSize = imgResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
  const domNodes = document.querySelectorAll("*").length;

  const violations: string[] = [];
  if (jsSize > budget.jsSize) violations.push(`JS: ${(jsSize / 1024).toFixed(0)}KB > ${budget.jsSize / 1024}KB`);
  if (cssSize > budget.cssSize) violations.push(`CSS: ${(cssSize / 1024).toFixed(0)}KB > ${budget.cssSize / 1024}KB`);
  if (imgSize > budget.imgSize) violations.push(`Images: ${(imgSize / 1024 / 1024).toFixed(1)}MB > ${budget.imgSize / 1024 / 1024}MB`);
  if (resources.length > budget.totalRequests) violations.push(`Requests: ${resources.length} > ${budget.totalRequests}`);
  if (domNodes > budget.domNodes) violations.push(`DOM nodes: ${domNodes} > ${budget.domNodes}`);

  return { violations, metrics: { jsSize, cssSize, imgSize, totalRequests: resources.length, domNodes } };
}

// ─── Component Render Tracker ─────────────────────────────
const renderCounts = new Map<string, number>();

export function trackRender(componentName: string) {
  const count = (renderCounts.get(componentName) || 0) + 1;
  renderCounts.set(componentName, count);
  if (count > 50) {
    console.warn(`[Perf] Component "${componentName}" has rendered ${count} times — possible optimization needed.`);
  }
}

export function getRenderCounts() {
  return Object.fromEntries(renderCounts);
}

// ─── Memory Usage Monitor ─────────────────────────────────
export function getMemoryUsage(): { used: number; total: number; limit: number } | null {
  const perf = performance as any;
  if (perf.memory) {
    return {
      used: perf.memory.usedJSHeapSize,
      total: perf.memory.totalJSHeapSize,
      limit: perf.memory.jsHeapSizeLimit,
    };
  }
  return null;
}

// ─── Long Task Observer ───────────────────────────────────
export function observeLongTasks(callback: (duration: number, startTime: number) => void) {
  if (!("PerformanceObserver" in window)) return;
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry.duration, entry.startTime);
      }
    });
    observer.observe({ type: "longtask", buffered: true });
    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}
