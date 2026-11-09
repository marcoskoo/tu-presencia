'use client'

import * as React from 'react'
import { es, type Dict } from './es'
import { en } from './en'
import { pt } from './pt'

export type Lang = 'es' | 'en' | 'pt'

export const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: 'es', short: 'ES', name: 'Español' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'pt', short: 'PT', name: 'Português' },
]

export const DICTS: Record<Lang, Dict> = { es, en, pt }

const STORAGE_KEY = 'presencia-lang'

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  d: Dict
  /** Fecha formateada según el idioma activo */
  formatDate: (date: Date | string, opts?: Intl.DateTimeFormatOptions) => string
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

function isLang(value: string | null): value is Lang {
  return value === 'es' || value === 'en' || value === 'pt'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>('es')

  // Hidratar desde localStorage tras el montaje (evita diferencias de SSR)
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLang(stored) && stored !== lang) {
        setLangState(stored)
      }
    } catch {
      /* localStorage puede estar bloqueado */
    }
     
  }, [])

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignorar */
    }
  }, [])

  // Mantener <html lang> sincronizado para lectores de pantalla
  React.useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const d = DICTS[lang]

  const formatDate = React.useCallback(
    (date: Date | string, opts?: Intl.DateTimeFormatOptions) => {
      const value = typeof date === 'string' ? new Date(date) : date
      return new Intl.DateTimeFormat(d.locale, opts).format(value)
    },
    [d.locale]
  )

  const value = React.useMemo<I18nContextValue>(
    () => ({ lang, setLang, d, formatDate }),
    [lang, setLang, d, formatDate]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
