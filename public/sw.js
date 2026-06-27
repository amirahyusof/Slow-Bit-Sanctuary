const CACHE_NAME = 'slowbit-v1'

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192.png',
  '/pwa-512.png',
]

// Install: cache the static files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  )
})