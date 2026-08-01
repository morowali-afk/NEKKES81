/* Service Worker — Forum Pembentukan Sinode GKMR
 * Cache-first untuk semua aset lokal agar aplikasi tetap berfungsi offline.
 * Versi cache: v1
 */
const CACHE_NAME = 'gkmr-forum-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './assets/fa/css/all.min.css',
  './assets/fa/webfonts/fa-solid-900.woff2',
  './assets/fa/webfonts/fa-brands-400.woff2',
  './assets/fa/webfonts/fa-regular-400.woff2',
  './assets/fa/webfonts/fa-solid-900.ttf',
  './assets/fa/webfonts/fa-brands-400.ttf',
  './assets/sweetalert2.all.min.js',
  './assets/supabase.min.js',
  './assets/inter/inter.css',
  './assets/inter/inter-1.woff2',
  './assets/inter/inter-2.woff2',
  './assets/inter/inter-3.woff2',
  './assets/inter/inter-4.woff2',
  './assets/inter/inter-5.woff2',
  './assets/inter/inter-6.woff2',
  './assets/inter/inter-7.woff2',
  './assets/logo-gkmr.jpeg',
  './assets/logo-morut.jpeg',
  './assets/hero.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Hanya tangani aset same-origin; biarkan eksternal (wa.me, gambar berita) lewat jaringan
  if (url.origin !== self.location.origin) return;

  // Navigasi: network-first dengan fallback cache (agar HTML selalu segar)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Aset lain: cache-first, lalu jaringan (dan simpan ke cache)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
