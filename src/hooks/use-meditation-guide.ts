'use client'

import * as React from 'react'
import {
  hasVoiceFor,
  pickVoice,
  speakCue,
  speechSupported,
  subscribeVoices,
} from '@/lib/speech'
import type { GuideCue } from '@/lib/meditation-guides'

/**
 * Voz guía para las meditaciones: secuencias de indicaciones habladas
 * sobre la melodía instrumental.
 *
 * - Cada indicación se locuta con el sintetizador del navegador y luego
 *   guarda un silencio (`cue.pause`); la música suena más baja mientras
 *   habla la voz (ducking) y vuelve a subir en las pausas.
 * - Pausar la música corta la voz y la reanuda (repitiendo la indicación
 *   si se cortó a mitad). Cambiar de pista o de idioma termina la guía.
 * - Si se activa a mitad de pista, salta a la indicación estimada.
 * - Si otra voz (el compañero) toma el sintetizador, la guía cede en
 *   silencio y la música vuelve a su volumen.
 */

const STORAGE_KEY = 'presencia-guide-voice'
const GUIDE_RATE = 0.92 // un punto más lento que el compañero: es meditación
const INITIAL_DELAY_MS = 1500 // la música arraiga un instante antes de la voz
const CHARS_PER_SECOND = 13 // estimación para saltar cues a mitad de pista
const DUCK_VOLUME = 0.22

type UseMeditationGuideOptions = {
  /** Baja (true) / sube (false) el volumen de la melodía. */
  onDuck: (ducked: boolean) => void
  /** El navegador no tiene voz para el idioma: avisar. */
  onUnavailable: () => void
}

export function useMeditationGuide(lang: string, opts: UseMeditationGuideOptions) {
  const [canGuide, setCanGuide] = React.useState(false)
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([])
  const [guideOn, setGuideOn] = React.useState(true)
  const [speaking, setSpeaking] = React.useState(false)
  const [caption, setCaption] = React.useState<string | null>(null)

  const cuesRef = React.useRef<GuideCue[]>([])
  const indexRef = React.useRef(0)
  const activeRef = React.useRef(false)
  const cancelledRef = React.useRef(true)
  const midCueRef = React.useRef(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const duckedRef = React.useRef(false)
  const onDuckRef = React.useRef(opts.onDuck)
  const onUnavailableRef = React.useRef(opts.onUnavailable)

  React.useEffect(() => {
    onDuckRef.current = opts.onDuck
    onUnavailableRef.current = opts.onUnavailable
  })

  // Preferencia recordada; activada por defecto: las meditaciones son guiadas
  React.useEffect(() => {
    setGuideOn(window.localStorage.getItem(STORAGE_KEY) !== '0')
    const supported = speechSupported()
    setCanGuide(supported)
    if (!supported) return
    return subscribeVoices(setVoices)
  }, [])

  const duck = (value: boolean) => {
    if (duckedRef.current === value) return
    duckedRef.current = value
    onDuckRef.current(value)
  }

  const stopSpeech = React.useCallback(() => {
    cancelledRef.current = true
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (speechSupported()) window.speechSynthesis.cancel()
    duck(false)
    setSpeaking(false)
  }, [])

  const endSession = React.useCallback(() => {
    stopSpeech()
    activeRef.current = false
    indexRef.current = 0
    midCueRef.current = false
    setCaption(null)
  }, [stopSpeech])

  const step = React.useCallback(() => {
    timerRef.current = null
    if (cancelledRef.current) return
    const cues = cuesRef.current
    if (indexRef.current >= cues.length) {
      // Guía terminada: la melodía hace el resto en silencio
      setSpeaking(false)
      return
    }
    const cue = cues[indexRef.current++]
    midCueRef.current = true
    setCaption(cue.text)
    setSpeaking(true)
    duck(true)
    const started = speakCue(cue.text, {
      lang,
      voice: pickVoice(voices, lang),
      voicesLoaded: voices.length > 0,
      rate: GUIDE_RATE,
      onDone: () => {
        if (cancelledRef.current) return
        midCueRef.current = false
        duck(false)
        setSpeaking(false)
        timerRef.current = setTimeout(step, cue.pause * 1000)
      },
      onAbort: () => {
        // El compañero tomó el sintetizador: la guía cede en silencio
        midCueRef.current = false
        setSpeaking(false)
        cancelledRef.current = true
        duck(false)
      },
    })
    if (!started) {
      duck(false)
      setSpeaking(false)
      cancelledRef.current = true
      onUnavailableRef.current()
    }
  }, [lang, voices])

  const beginSession = React.useCallback(
    (cues: GuideCue[], startAtSeconds = 0) => {
      stopSpeech()
      if (!speechSupported() || cues.length === 0) return
      if (voices.length > 0 && !hasVoiceFor(voices, lang)) {
        onUnavailableRef.current()
        return
      }
      cuesRef.current = cues
      activeRef.current = true
      cancelledRef.current = false
      // Activación a mitad de pista: saltar a la indicación estimada
      let index = 0
      if (startAtSeconds > 5) {
        let elapsed = 0
        while (index < cues.length) {
          elapsed += cues[index].text.length / CHARS_PER_SECOND + cues[index].pause
          if (elapsed > startAtSeconds) break
          index++
        }
      }
      indexRef.current = index
      setCaption(null)
      timerRef.current = setTimeout(step, INITIAL_DELAY_MS)
    },
    [lang, voices, stopSpeech, step]
  )

  const pauseSession = React.useCallback(() => {
    // Si la voz quedó a mitad de una indicación, repetirla al reanudar
    if (midCueRef.current && indexRef.current > 0) indexRef.current--
    midCueRef.current = false
    stopSpeech()
  }, [stopSpeech])

  const resumeSession = React.useCallback(() => {
    if (!activeRef.current || cancelledRef.current) return
    const cues = cuesRef.current
    if (cues.length === 0 || indexRef.current >= cues.length) return
    timerRef.current = setTimeout(step, 500)
  }, [step])

  /** Al reproducir la música: reanuda la guía activa o inicia una nueva. */
  const handlePlay = React.useCallback(
    (cues: GuideCue[], startAtSeconds = 0) => {
      if (activeRef.current) resumeSession()
      else beginSession(cues, startAtSeconds)
    },
    [beginSession, resumeSession]
  )

  /** Cambia la preferencia y corta la guía si se desactiva. */
  const setGuideEnabled = React.useCallback(
    (next: boolean) => {
      setGuideOn(next)
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      if (!next) endSession()
    },
    [endSession]
  )

  // Cambio de idioma o desmonte: terminar la sesión
  React.useEffect(() => endSession, [endSession, lang])

  return { canGuide, guideOn, speaking, caption, handlePlay, pauseSession, endSession, setGuideEnabled }
}
