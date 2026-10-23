// Arsenale Vini - Service Worker
// Convenzione: bump della versione della cache ad ogni modifica di index.html
const CACHE_PREFIX = 'arsenale-vini-';
const CACHE_NAME = CACHE_PREFIX + 'v5';
const CATALOG_URL = new URL('./vini.txt', self.registration.scope).href;

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

function validCatalog(text) {
  return text.split('\n').some(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return false;
    const parts = line.split('|');
    return parts.length >= 6 && parts[0].trim() && parts[3].trim() &&
      ['bianco', 'rosato', 'rosso', 'bollicina', 'dolce'].includes(parts[2].trim().toLowerCase());
  });
}

async function loadCatalog(req) {
  const cache = await caches.open(CACHE_NAME);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(req, {cache:'no-store', signal:controller.signal});
    if (!res.ok || !validCatalog(await res.clone().text())) throw new Error('Catalogo non valido');
    await cache.put(CATALOG_URL, res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const cached = await cache.match(CATALOG_URL);
    if (cached) return cached;
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(async cache => {
    await cache.addAll(ASSETS);
    await loadCatalog(new Request(CATALOG_URL));
    if (!await cache.match(CATALOG_URL)) throw new Error('Catalogo non salvato');
    await self.skipWaiting();
  }));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url), catalog = new URL(CATALOG_URL);
  if (url.origin === catalog.origin && url.pathname === catalog.pathname) {
    event.respondWith(loadCatalog(req));
    return;
  }

  // Pagine: prima la rete (aggiornamenti subito), cache come fallback offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => caches.open(CACHE_NAME).then(async cache => (await cache.match(req)) || cache.match('./index.html')))
    );
    return;
  }

  // Altri file: cache first, con aggiornamento in background
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => cache.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          event.waitUntil(cache.put(req, clone).catch(() => {}));
        }
        return res;
      }).catch(() => cached);
      event.waitUntil(network.then(() => {}));
      return cached || network;
    }))
  );
});
