/// <reference lib="webworker" />

const SW_VERSION = "threadit-v2";
const CACHE_NAME = SW_VERSION;
const API_CACHE = `${SW_VERSION}-api`;
const STATIC_CACHE = `${SW_VERSION}-static`;

// Static assets to pre-cache
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
];

// API routes to cache with network-first strategy
const API_CACHE_PATTERNS = [
  "/api/recommendations/trending",
  "/api/communities",
];

// ─── Install: Pre-cache static assets ──────────────────────────────────────
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately
  (self as any).skipWaiting();
});

// ─── Activate: Clean up old caches ─────────────────────────────────────────
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== API_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Claim all clients immediately
  (self as any).clients.claim();
});

// ─── Fetch: Strategy-based caching ─────────────────────────────────────────
self.addEventListener("fetch", (event: any) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension, etc.
  if (!url.protocol.startsWith("http")) return;

  // API requests: Network first, fallback to cache
  if (url.pathname.startsWith("/api/")) {
    // Only cache specific API routes
    const shouldCache = API_CACHE_PATTERNS.some((p) => url.pathname.startsWith(p));
    
    if (shouldCache) {
      event.respondWith(
        networkFirstWithCache(request, API_CACHE, 30 * 60 * 1000) // 30 min
      );
    } else {
      // Network only for other API calls
      event.respondWith(fetch(request));
    }
    return;
  }

  // Static assets: Cache first, fallback to network
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstWithNetwork(request, STATIC_CACHE));
    return;
  }

  // Navigation requests: Network first, fallback to cached index.html
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match("/index.html"))
        .then((response) => response || new Response("Offline", { status: 503 }))
    );
    return;
  }

  // Everything else: Network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ─── Push Notification Handling ─────────────────────────────────────────────
self.addEventListener("push", (event: any) => {
  let data: any = {};
  
  try {
    data = event.data?.json() ?? {};
  } catch {
    data = { title: "New Notification", body: event.data?.text() || "You have a new update on Threadit." };
  }

  const title = data.title || "Threadit";
  const options = {
    body: data.body || "You have a new update.",
    icon: data.icon || "/icon-192x192.png",
    badge: data.badge || "/icon-192x192.png",
    tag: data.tag || "default",
    renotify: !!data.tag,
    data: { url: data.url || "/" },
    actions: [
      { action: "open", title: "View" },
      { action: "dismiss", title: "Dismiss" },
    ],
    vibrate: [100, 50, 100],
    timestamp: Date.now(),
  };

  event.waitUntil(
    (self as any).registration.showNotification(title, options)
  );
});

// ─── Notification Click Handling ────────────────────────────────────────────
self.addEventListener("notificationclick", (event: any) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    (self as any).clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients: any[]) => {
      // Focus existing window if available
      for (const client of windowClients) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window
      return (self as any).clients.openWindow(url);
    })
  );
});

// ─── Background Sync ───────────────────────────────────────────────────────
self.addEventListener("sync", (event: any) => {
  if (event.tag === "sync-engagement") {
    event.waitUntil(syncEngagementData());
  }
});

async function syncEngagementData() {
  // Sync any queued engagement data when back online
  try {
    const cache = await caches.open("engagement-queue");
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const data = await response.json();
        await fetch("/api/engagement/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// ─── Helper Functions ───────────────────────────────────────────────────────

function isStaticAsset(pathname: string): boolean {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|avif)$/.test(pathname);
}

async function cacheFirstWithNetwork(request: Request, cacheName: string): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response("Asset unavailable offline", { status: 503 });
  }
}

async function networkFirstWithCache(request: Request, cacheName: string, maxAge: number): Promise<Response> {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: "Offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
