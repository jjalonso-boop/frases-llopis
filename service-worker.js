// Archivos que la app debe guardar para funcionar offline
const CACHE_NAME = "frases-pwa-v1";
const ARCHIVOS = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "icon-192.png",
  "icon-512.png"
];

// Instalar el Service Worker y cachear los archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
});

// Activar y limpiar cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// Interceptar peticiones para funcionar offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (respuesta) => respuesta || fetch(event.request)
    )
  );
});
