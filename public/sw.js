// Momentum service worker — minimal, safe offline shell caching.
//
// Bump CACHE_VERSION any time this file's caching behavior changes so old
// caches are invalidated on the next activate. Never bump the shell list
// without also bumping the version, or clients may keep stale entries.
const CACHE_VERSION = "momentum-shell-v1";

const SHELL_ASSETS = ["/", "/manifest.webmanifest", "/icon.svg", "/icon-maskable.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_VERSION);
        await cache.addAll(SHELL_ASSETS);
      } catch {
        // Pre-caching is best-effort only — never block install on it.
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)));
      } catch {
        // Cleanup is best-effort only.
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only ever handle same-origin GET requests. Everything else (server
  // actions / POST, API calls, cross-origin requests) passes straight
  // through untouched so normal app behavior is never affected.
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          try {
            const cache = await caches.open(CACHE_VERSION);
            await cache.put(request, networkResponse.clone());
          } catch {
            // Caching the response is best-effort only.
          }
        }
        return networkResponse;
      } catch {
        try {
          const cached = await caches.match(request);
          if (cached) return cached;
        } catch {
          // Fall through to rethrow below.
        }
        throw new Error("Network unavailable and no cached response found.");
      }
    })()
  );
});
