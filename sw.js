/**
 * SkySoft Weather - Service Worker (PWA)
 * Enables offline capability, shell caching, and network-first weather synchronization.
 */

const CACHE_NAME = 'skysoft-weather-v3.3.0';
const STATIC_ASSETS = [
    './index.php',
    './assets/css/style.css?v=3.3',
    './assets/js/i18n.js?v=3.3',
    './assets/js/sky.js?v=3.3',
    './assets/js/manual.js?v=3.3',
    './assets/js/app.js?v=3.3',
    './assets/icons/realistic_moon.png?v=3',
    './assets/icons/cloud_cumulus.png',
    './assets/icons/cloud_wispy.png',
    './assets/data/countries.json',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/favicon.png'
];

// Install Event: Pre-cache application shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('Some static assets failed to cache:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Clear obsolete caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Cache strategy
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only handle GET requests
    if (request.method !== 'GET') {
        return;
    }

    // 1. API Requests (Weather, Search, Countries): Network First with Cache Fallback
    if (url.pathname.includes('/api/')) {
        event.respondWith(
            fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If offline or network fails, try to return cached response
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return new Response(JSON.stringify({
                        success: false,
                        offline: true,
                        message: 'You are currently offline. Weather data could not be refreshed.'
                    }), {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' }
                    });
                });
            })
        );
        return;
    }

    // 2. Navigation / Page request: Stale-While-Revalidate with fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(() => {
                return caches.match('./index.php') || caches.match(request);
            })
        );
        return;
    }

    // 3. Static Assets: Stale-While-Revalidate
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => null);

            return cachedResponse || fetchPromise;
        })
    );
});
