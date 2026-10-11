const CACHE_NAME = 'ag-mobile-cache-v31';
const urlsToCache = [
  './',
  './index.html',
  './book.html',
  './track.html',
  './estimate.html',
  './app.js',
  './tailwind.css',
  './images/ag_favicon.png',
  './images/repair-station.webp',
  './images/AGlogo.webp',
  './images/AGlogotype.webp',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-16x16.png',
  './icons/favicon-32x32.png',
  './icons/favicon.ico',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// HTML pages: network-first so deploys are seen immediately.
// All other assets: cache-first for speed.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isHtml = event.request.mode === 'navigate'
    || (event.request.method === 'GET' && url.pathname.match(/\.(html?)$/i));

  if (isHtml) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
