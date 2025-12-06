// Service Worker for PWA offline support
/* eslint-disable */
/* global self, caches, fetch */

const CACHE_NAME = 'financial-calculators-v1';
const STATIC_ASSETS = [
  '/',
  '/calculators/retirement',
  '/calculators/mortgage',
  '/calculators/tax',
  '/calculators/compound-interest',
  '/calculators/loan',
  '/calculators/sip',
];

// Install event - cache static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip analytics and ads
  if (
    event.request.url.includes('google-analytics') ||
    event.request.url.includes('googlesyndication') ||
    event.request.url.includes('googletagmanager')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Return cached version or fetch from network
      return (
        response ||
        fetch(event.request).then(function(fetchResponse) {
          // Cache successful responses
          if (fetchResponse.ok) {
            return caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          }
          return fetchResponse;
        })
      );
    })
  );
});

