'use client'

import * as React from 'react'

/**
 * Voz del navegador (Web Speech API) para el compañero contemplativo.
 *
 * - Elige la mejor voz disponible para el idioma activo (prefiere voces
 *   «natural/online/neural» — Edge — y «Google» — Chrome).
 * - Trocea el texto en frases: Chrome corta las locuciones largas (~15 s).
 * - `speakingId` identifica qué mensaje suena, para alternar escuchar/detener.
 * - Se detiene al cambiar de idioma, al enviar un mensaje nuevo y al
 *   desmontar (cerrar el diálogo del santuario).
 */

const CHUNK_MAX = 200
const START_DELAY_MS = 80 // Chrome ignora speak() inmediatamente tras cancel()

const FALLBACK_LANG: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  pt: 'pt-PT',
}

function scoreVoice(v: SpeechSynthesisVoice, lang: string): number {
  const code = v.lang.toLowerCase().replace('_', '-')
  const preferred = { es: 'es-es', en: 'en-us', pt: 'pt-pt' }[lang] ?? lang
  return (
    (/natural|online|neural/i.test(v.name) ? 4 : 0) +
    (/google/i.test(v.name) ? 2 : 0) +
    (code === preferred ? 2 : 0) +
    (v.localService ? 0 : 1)
  )
}

/** Divide el texto en frases de hasta ~200 caracteres. */
function chunkSentences(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length <= CHUNK_MAX) return [clean]
  const sentences = clean.match(/[^.!?…]+[.!?…]*/g) ?? [clean]
  const chunks: string[] = []
  let current = ''
  for (const sentence of sentences) {
    if (current && (current + sentence).length > CHUNK_MAX) {
      chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

export function useSpeech(lang: string) {
  // Se activa tras el montaje: evita discrepancias entre SSR e hidratación
  const [canSpeak, setCanSpeak] = React.useState(false)
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [speakingId, setSpeakingId] = React.useState<number | null>(null)
  const cancelledRef = React.useRef(true)
  const startTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
    setCanSpeak(supported)
    if (!supported) return
    const synth = window.speechSynthesis
    const load = () => setVoices(synth.getVoices())
    load()
    synth.addEventListener('voiceschanged', load)
    return () => synth.removeEventListener('voiceschanged', load)
  }, [])

  const stop = React.useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    cancelledRef.current = true
    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current)
      startTimerRef.current = null
    }
    window.speechSynthesis.cancel()
    setSpeakingId(null)
  }, [])

  /**
   * Locuta un mensaje. Devuelve false si el navegador no tiene voz
   * para el idioma activo (el llamador muestra un aviso).
   */
  const speak = React.useCallback(
    (id: number, text: string): boolean => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
      const synth = window.speechSynthesis
      cancelledRef.current = true
      if (startTimerRef.current) clearTimeout(startTimerRef.current)
      synth.cancel()

      const matches = voices.filter((v) =>
        v.lang.toLowerCase().replace('_', '-').startsWith(lang.toLowerCase())
      )
      // Sin voces aún cargadas (Chrome las resuelve async): dejar que el
      // motor elija a partir de u.lang y confiar en su propia selección.
      const voice =
        matches.sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))[0] ?? null
      if (voices.length > 0 && !voice) return false

      cancelledRef.current = false
      setSpeakingId(id)
      const chunks = chunkSentences(text)
      let index = 0
      const next = () => {
        if (cancelledRef.current || index >= chunks.length) {
          setSpeakingId((current) => (current === id ? null : current))
          return
        }
        const utterance = new SpeechSynthesisUtterance(chunks[index++])
        if (voice) utterance.voice = voice
        utterance.lang = voice?.lang ?? FALLBACK_LANG[lang] ?? lang
        utterance.rate = 0.95 // ritmo sosegado, acorde al tono de la web
        utterance.onend = next
        utterance.onerror = next
        synth.speak(utterance)
      }
      startTimerRef.current = setTimeout(() => {
        startTimerRef.current = null
        next()
      }, START_DELAY_MS)
      return true
    },
    [voices, lang]
  )

  // Detener la locución al cambiar de idioma o al desmontar el diálogo
  React.useEffect(() => stop, [stop, lang])

  return { canSpeak, speakingId, speak, stop }
}
