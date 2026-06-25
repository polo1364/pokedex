const CACHE_NAME = 'pokedex-pro-v3';

const PRECACHE = ['./index.html', './guide.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

function isApi(url) {
  return url.pathname.startsWith('/api/') || url.pathname.includes('/api/');
}

function isPokeApi(url) {
  return url.hostname.includes('pokeapi.co');
}

function isHtmlRequest(request, url) {
  if (request.mode === 'navigate') return true;
  if (request.destination === 'document') return true;
  const path = url.pathname;
  return path.endsWith('.html') || path === '/' || path.endsWith('/');
}

/** Vite 開發模式：原始碼與 HMR 必須走網路 */
function isDevSource(url) {
  const path = url.pathname;
  return path.startsWith('/src/')
    || path.startsWith('/@')
    || path.startsWith('/node_modules/');
}

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (response?.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      }
      return response;
    })
    .catch(() => caches.match(request));
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response?.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      }
      return response;
    });
  });
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (isApi(url)) return;
  if (isPokeApi(url)) return;
  if (url.origin !== self.location.origin) return;

  if (isHtmlRequest(e.request, url) || isDevSource(url)) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  e.respondWith(cacheFirst(e.request));
});
