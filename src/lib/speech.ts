/**
 * Utilidades compartidas de voz del navegador (Web Speech API).
 *
 * Las usa el compañero contemplativo (use-speech) y la voz guía de las
 * meditaciones (use-meditation-guide). Sin React: solo helpers puros y
 * acceso directo al sintetizador.
 */

export const SPEECH_START_DELAY_MS = 80 // Chrome ignora speak() justo tras cancel()

export const FALLBACK_LANG: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  pt: 'pt-PT',
}

/** Ritmo sosegado por defecto, acorde al tono del sitio. */
export const CALM_RATE = 0.95

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Suscribe el listado de voces (en Chrome llegan de forma asíncrona
 * mediante «voiceschanged»). Devuelve la función de limpieza.
 */
export function subscribeVoices(
  onChange: (voices: SpeechSynthesisVoice[]) => void
): () => void {
  if (!speechSupported()) return () => {}
  const synth = window.speechSynthesis
  const load = () => onChange(synth.getVoices())
  load()
  synth.addEventListener('voiceschanged', load)
  return () => synth.removeEventListener('voiceschanged', load)
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

export function hasVoiceFor(voices: SpeechSynthesisVoice[], lang: string): boolean {
  return voices.some((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(lang.toLowerCase())
  )
}

/** La mejor voz para el idioma, o null si no hay ninguna. */
export function pickVoice(
  voices: SpeechSynthesisVoice[],
  lang: string
): SpeechSynthesisVoice | null {
  const matches = voices.filter((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(lang.toLowerCase())
  )
  return matches.sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))[0] ?? null
}

/** Divide el texto en frases de hasta ~200 caracteres. */
export function chunkSentences(text: string, max = 200): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length <= max) return [clean]
  const sentences = clean.match(/[^.!?…]+[.!?…]*/g) ?? [clean]
  const chunks: string[] = []
  let current = ''
  for (const sentence of sentences) {
    if (current && (current + sentence).length > max) {
      chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

/**
 * Cancelación por otra voz (el compañero arranca mientras suena la guía,
 * o al revés): el sintetizador es global y único.
 */
export function isVoiceTakeover(e: SpeechSynthesisErrorEvent): boolean {
  return e.error === 'canceled' || e.error === 'interrupted'
}

export type SpeakCueOptions = {
  lang: string
  /** Voz elegida; null para dejar que el motor decida por idioma. */
  voice: SpeechSynthesisVoice | null
  /** true cuando el listado de voces ya cargó (evita falsos «sin voz»). */
  voicesLoaded: boolean
  rate?: number
  /** Todas las frases habladas con normalidad. */
  onDone: () => void
  /** Otra voz tomó el sintetizador: abortar en silencio. */
  onAbort: () => void
}

/**
 * Locuta un texto completo (varias frases encadenadas). Devuelve false si
 * no hay voz para el idioma; el llamador decide cómo avisar.
 */
export function speakCue(text: string, opts: SpeakCueOptions): boolean {
  if (!speechSupported()) return false
  const chunks = chunkSentences(text)
  if (chunks.length === 0) {
    opts.onDone()
    return true
  }
  if (opts.voicesLoaded && !opts.voice) return false
  let index = 0
  const next = () => {
    if (index >= chunks.length) {
      opts.onDone()
      return
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index++])
    if (opts.voice) utterance.voice = opts.voice
    utterance.lang = opts.voice?.lang ?? FALLBACK_LANG[opts.lang] ?? opts.lang
    utterance.rate = opts.rate ?? CALM_RATE
    utterance.onend = next
    utterance.onerror = (e) => {
      if (isVoiceTakeover(e)) {
        opts.onAbort()
        return
      }
      next()
    }
    window.speechSynthesis.speak(utterance)
  }
  next()
  return true
}

/**
 * Desbloquea el sintetizador dentro del gesto del usuario (requerido en
 * iOS Safari): una locución silenciosa habilita las siguientes, asíncronas.
 */
export function warmUpSpeech(): void {
  if (!speechSupported()) return
  try {
    const utterance = new SpeechSynthesisUtterance(' ')
    utterance.volume = 0
    window.speechSynthesis.speak(utterance)
  } catch {
    /* el navegador puede ignorarla sin problema */
  }
}
