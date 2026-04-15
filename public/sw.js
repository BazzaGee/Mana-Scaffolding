const CACHE_NAME = 'mana-scaffolding-v1';
const STATIC_CACHE = 'mana-static-v1';
const IMAGE_CACHE = 'mana-images-v1';
const PAGE_CACHE = 'mana-pages-v1';

const STATIC_ASSETS = [
  '/',
  '/services',
  '/locations',
  '/blog',
  '/about',
  '/contact',
  '/logos/Mana-Scaffolding-Logo.png',
  '/Mana-Scaffolding-favicon.png',
];

const PRECACHE_URLS = [
  '/services/residential-scaffolding',
  '/services/commercial-scaffolding',
  '/services/industrial-scaffolding',
  '/services/complex-access-solutions',
  '/locations/christchurch',
  '/locations/rangiora-north-canterbury',
  '/locations/selwyn-district',
  '/locations/ashburton-mid-canterbury',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return caches.open(PAGE_CACHE).then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== PAGE_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.origin !== location.origin) {
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(
        caches.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
            }
            return response;
          }).catch(() => new Response('', { status: 408 }));
        })
      );
    }
    return;
  }

  if (url.pathname.startsWith('/_astro/') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|gif|ico)$/i)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (url.pathname.startsWith('/videos/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          return caches.match('/');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
