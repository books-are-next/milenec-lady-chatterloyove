/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-a97e145';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./milenec_lady_chatterloyove_001.html","./milenec_lady_chatterloyove_002.html","./milenec_lady_chatterloyove_003.html","./milenec_lady_chatterloyove_004.html","./milenec_lady_chatterloyove_005.html","./milenec_lady_chatterloyove_006.html","./milenec_lady_chatterloyove_008.html","./milenec_lady_chatterloyove_009.html","./milenec_lady_chatterloyove_010.html","./milenec_lady_chatterloyove_011.html","./milenec_lady_chatterloyove_012.html","./milenec_lady_chatterloyove_013.html","./milenec_lady_chatterloyove_014.html","./milenec_lady_chatterloyove_015.html","./milenec_lady_chatterloyove_016.html","./milenec_lady_chatterloyove_007.html","./milenec_lady_chatterloyove_017.html","./milenec_lady_chatterloyove_018.html","./milenec_lady_chatterloyove_019.html","./milenec_lady_chatterloyove_020.html","./milenec_lady_chatterloyove_021.html","./milenec_lady_chatterloyove_022.html","./milenec_lady_chatterloyove_023.html","./milenec_lady_chatterloyove_024.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_milenec_lady_ch_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
