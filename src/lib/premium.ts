'use client'

/**
 * Estado premium: cookie `presencia_premium` (1 año) que se activa tras un
 * pago verificado con Stripe o, mientras Stripe no esté configurado, mediante
 * el modo demo. Las comprobaciones son de interfaz; la experiencia completa
 * de pago se valida en el servidor.
 */

import * as React from 'react'

const COOKIE_NAME = 'presencia_premium'
export const PREMIUM_EVENT = 'presencia:premium'

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

export function isPremium(): boolean {
  return readCookie(COOKIE_NAME) === '1'
}

export function setPremium(active: boolean): void {
  if (typeof document === 'undefined') return
  if (active) {
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `${COOKIE_NAME}=1; expires=${expires.toUTCString()}; path=/; samesite=lax`
  } else {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
  window.dispatchEvent(new CustomEvent(PREMIUM_EVENT))
}

/** Hook reactivo al estado premium (cookie + evento) */
export function usePremium(): boolean {
  const [premium, setPremiumState] = React.useState(false)

  React.useEffect(() => {
    const sync = () => setPremiumState(isPremium())
    sync()
    window.addEventListener(PREMIUM_EVENT, sync)
    // La cookie puede cambiar desde otra pestaña
    const interval = window.setInterval(sync, 2000)
    return () => {
      window.removeEventListener(PREMIUM_EVENT, sync)
      window.clearInterval(interval)
    }
  }, [])

  return premium
}
