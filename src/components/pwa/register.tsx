'use client'

import * as React from 'react'

/** Registra el service worker al montar (solo en producción/https) */
export function ServiceWorkerRegister() {
  React.useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return
    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* registro fallido: la web funciona igualmente */
      })
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return null
}
