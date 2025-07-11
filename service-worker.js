const CACHE_NAME = 'ticuna-cache-v100'; // <-- IMPORTANTE: Troque para 'ticuna-cache-v2' ou um novo nome para forçar a atualização!
const urlsToCache = [
  '/idioma-ticuna/', // A raiz do seu site
  '/idioma-ticuna/index.html',
  '/idioma-ticuna/manifest.json',
  '/idioma-ticuna/icon-192x192.png',
  '/idioma-ticuna/icon-512x512.png',
  '/idioma-ticuna/favicon.png', // <--- ADICIONE ESTA LINHA para cache do favicon
  '/idioma-ticuna/service-worker.js' // Você precisará criar esses ícones
  // Adicione aqui outros arquivos que seu site usa (CSS, JavaScript, imagens, etc.)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o recurso do cache se ele existir
        if (response) {
          return response;
        }
        // Se não, busca da rede
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
