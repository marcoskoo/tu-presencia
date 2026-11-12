'use client'

import * as React from 'react'
import {
  CALM_RATE,
  SPEECH_START_DELAY_MS,
  pickVoice,
  speakCue,
  speechSupported,
  subscribeVoices,
} from '@/lib/speech'

/**
 * Voz del navegador (Web Speech API) para el compañero contemplativo.
 *
 * - Elige la mejor voz disponible para el idioma activo.
 * - Se detiene al cambiar de idioma, al enviar un mensaje nuevo y al
 *   desmontar (cerrar el diálogo del santuario).
 * - Si otra voz (p. ej. la guía de meditación) toma el sintetizador,
 *   la locución se aborta en silencio.
 */

const MAX_CHARS = 400

export function useSpeech(lang: string) {
  // Se activa tras el montaje: evita discrepancias entre SSR e hidratación
  const [canSpeak, setCanSpeak] = React.useState(false)
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [speakingId, setSpeakingId] = React.useState<number | null>(null)
  const cancelledRef = React.useRef(true)
  const startTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const supported = speechSupported()
    setCanSpeak(supported)
    if (!supported) return
    return subscribeVoices(setVoices)
  }, [])

  const stop = React.useCallback(() => {
    if (!speechSupported()) return
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
      if (!speechSupported()) return false
      cancelledRef.current = true
      if (startTimerRef.current) clearTimeout(startTimerRef.current)
      window.speechSynthesis.cancel()

      const voice = pickVoice(voices, lang)
      // Sin voces aún cargadas (Chrome las resuelve async): dejar que el
      // motor elija a partir de utterance.lang y confiar en su selección.
      if (voices.length > 0 && !voice) return false

      cancelledRef.current = false
      setSpeakingId(id)
      const settle = () => setSpeakingId((current) => (current === id ? null : current))
      startTimerRef.current = setTimeout(() => {
        startTimerRef.current = null
        const started = speakCue(text.slice(0, MAX_CHARS), {
          lang,
          voice,
          voicesLoaded: voices.length > 0,
          rate: CALM_RATE,
          onDone: settle,
          onAbort: settle,
        })
        if (!started) settle()
      }, SPEECH_START_DELAY_MS)
      return true
    },
    [voices, lang]
  )

  // Detener la locución al cambiar de idioma o al desmontar el diálogo
  React.useEffect(() => stop, [stop, lang])

  return { canSpeak, speakingId, speak, stop }
}
