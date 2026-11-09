/*
 * Service worker de Presencia AQUÍ y AHORA
 * - App shell: cache-first para estáticos (build, iconos, audios)
 * - Navegación: network-first con respaldo a caché (offline)
 * - API: siempre red (POST nunca se cachea)
 */

const VERSION = 'presencia-v1'
const SHELL_CACHE = `${VERSION}-shell`
const RUNTIME_CACHE = `${VERSION}-runtime`

/* Recursos esenciales precacheados al instalar */
const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/audios/campana-presencia.mp3',
  '/audios/ding-fase.mp3',
  '/audios/meditacion-pausa.mp3',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Solo mismo origen
  if (url.origin !== self.location.origin) return

  // Nunca interceptar la API
  if (url.pathname.startsWith('/api/')) return

  // Audios y estáticos con hash: cache-first (una vez descargados, offline)
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/audios/') ||
    url.pathname.startsWith('/icons/') ||
    /\.(png|jpg|jpeg|svg|webp|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
            }
            return response
          })
      )
    )
    return
  }

  // Navegación y demás: network-first con respaldo
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.method === 'GET') {
          const copy = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy))
        }
        return response
      })
      .catch(() =>
        caches.match(request).then((cached) => cached ?? caches.match('/'))
      )
  )
})

/* Mensajes desde la página */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})
