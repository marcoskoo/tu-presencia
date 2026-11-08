'use client'

import * as React from 'react'
import {
  Bell,
  BellOff,
  HeartPulse,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Scale,
  Wind,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'

/* ---------- Definición de técnicas ---------- */

type Phase = { label: string; seconds: number; from: number; to: number }
type TechniqueKey =
  | 'caja'
  | 'coherente'
  | 'relajante'
  | 'ujjayi'
  | 'suspiro'
  | 'alternada'
  | 'abeja'

const TECHNIQUES: Record<
  TechniqueKey,
  { name: string; pattern: string; description: string; phases: Phase[] }
> = {
  caja: {
    name: 'Respiración cuadrada',
    pattern: '4 · 4 · 4 · 4',
    description:
      'Cuatro fases iguales que dibujan un cuadrado con tu aliento. Equilibra el sistema nervioso y afina la atención. Ideal para el día a día.',
    phases: [
      { label: 'Inhala', seconds: 4, from: 1, to: 1.34 },
      { label: 'Sostén', seconds: 4, from: 1.34, to: 1.34 },
      { label: 'Exhala', seconds: 4, from: 1.34, to: 1 },
      { label: 'Pausa', seconds: 4, from: 1, to: 1 },
    ],
  },
  coherente: {
    name: 'Respiración coherente',
    pattern: '4 · 6',
    description:
      'Cinco respiraciones por minuto sincronizan corazón y mente. La práctica favorita para recuperar la calma en minutos.',
    phases: [
      { label: 'Inhala', seconds: 4, from: 1, to: 1.34 },
      { label: 'Exhala', seconds: 6, from: 1.34, to: 1 },
    ],
  },
  relajante: {
    name: 'Respiración 4 · 7 · 8',
    pattern: '4 · 7 · 8',
    description:
      'El soplo tranquilizante: inhala suave, sostén y exhala largo. Perfecta para soltar tensiones antes de dormir.',
    phases: [
      { label: 'Inhala', seconds: 4, from: 1, to: 1.34 },
      { label: 'Sostén', seconds: 7, from: 1.34, to: 1.34 },
      { label: 'Exhala', seconds: 8, from: 1.34, to: 1 },
    ],
  },
  ujjayi: {
    name: 'Ujjayi · Aliento océano',
    pattern: '5 · 5',
    description:
      'La «respiración victoriosa» del yoga: una leve constricción en la garganta convierte tu aliento en el sonido de las olas. Calma y concentra a la vez.',
    phases: [
      { label: 'Inhala', seconds: 5, from: 1, to: 1.34 },
      { label: 'Exhala con olas', seconds: 5, from: 1.34, to: 1 },
    ],
  },
  suspiro: {
    name: 'Suspiro fisiológico',
    pattern: '4 · 2 · 8',
    description:
      'La forma en que el cuerpo libera estrés de manera natural: dos inhalaciones seguidas y una exhalación larga. La vía más rápida hacia la calma.',
    phases: [
      { label: 'Inhala', seconds: 4, from: 1, to: 1.24 },
      { label: 'Inhala un poco más', seconds: 2, from: 1.24, to: 1.34 },
      { label: 'Exhala largo', seconds: 8, from: 1.34, to: 1 },
    ],
  },
  alternada: {
    name: 'Respiración alternada',
    pattern: 'Nadi Shodhana',
    description:
      'Alterna el aire entre las dos fosas nasales para equilibrar cuerpo y mente. Un ciclo completo dura 28 segundos y abarca ambos lados.',
    phases: [
      { label: 'Inhala izq.', seconds: 4, from: 1, to: 1.34 },
      { label: 'Sostén', seconds: 4, from: 1.34, to: 1.34 },
      { label: 'Exhala der.', seconds: 6, from: 1.34, to: 1 },
      { label: 'Inhala der.', seconds: 4, from: 1, to: 1.34 },
      { label: 'Sostén', seconds: 4, from: 1.34, to: 1.34 },
      { label: 'Exhala izq.', seconds: 6, from: 1.34, to: 1 },
    ],
  },
  abeja: {
    name: 'Respiración de la abeja',
    pattern: 'Bhramari · 4 · 8',
    description:
      'Al exhalar con un suave zumbido, la vibración enmascara el ruido de la mente y prepara el descanso. Ideal al final del día.',
    phases: [
      { label: 'Inhala', seconds: 4, from: 1, to: 1.34 },
      { label: 'Zumba al exhalar', seconds: 8, from: 1.34, to: 1 },
    ],
  },
}

const BENEFITS = [
  { icon: HeartPulse, label: 'Equilibra el ritmo del corazón' },
  { icon: Wind, label: 'Reduce el estrés y la ansiedad' },
  { icon: Moon, label: 'Prepara un sueño profundo' },
  { icon: Scale, label: 'Aporta claridad y centrado' },
]

/* ---------- Componente ---------- */

export function Breathing() {
  const [technique, setTechnique] = React.useState<TechniqueKey>('caja')
  const [running, setRunning] = React.useState(false)
  const [phaseIndex, setPhaseIndex] = React.useState(0)
  const [secondsLeft, setSecondsLeft] = React.useState(
    TECHNIQUES.caja.phases[0].seconds
  )
  const [cycles, setCycles] = React.useState(0)
  const [totalSeconds, setTotalSeconds] = React.useState(0)
  const [soundOn, setSoundOn] = React.useState(false)

  const circleRef = React.useRef<HTMLDivElement>(null)
  const ringRef = React.useRef<SVGCircleElement>(null)
  const phaseRef = React.useRef(0)
  const progressRef = React.useRef(0)
  const soundRef = React.useRef(soundOn)
  const chimeRef = React.useRef<HTMLAudioElement | null>(null)

  // Ref sincronizada para que el bucle de animación lea el estado actual
  React.useEffect(() => {
    soundRef.current = soundOn
  }, [soundOn])

  const playChime = React.useCallback(() => {
    if (!chimeRef.current) {
      chimeRef.current = new Audio('/audios/ding-fase.mp3')
      chimeRef.current.volume = 0.55
    }
    chimeRef.current.currentTime = 0
    chimeRef.current.play().catch(() => {})
  }, [])

  const phases = TECHNIQUES[technique].phases
  const cycleSeconds = phases.reduce((acc, p) => acc + p.seconds, 0)

  /* Bucle de animación: escala suave del círculo + cuenta atrás + anillo de ciclo */
  React.useEffect(() => {
    if (!running) return

    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      const dt = (now - last) / 1000
      last = now

      const current = phases[phaseRef.current]
      progressRef.current += dt / current.seconds

      if (progressRef.current >= 1) {
        progressRef.current = 0
        const next = (phaseRef.current + 1) % phases.length
        phaseRef.current = next
        setPhaseIndex(next)
        if (next === 0) setCycles((c) => c + 1)
        // Señal sonora sutil al cambiar de fase (si está activada)
        if (soundRef.current) playChime()
      }

      const p = phases[phaseRef.current]
      // easeInOutSine: respiración orgánica, sin tirones
      const eased = 0.5 - Math.cos(Math.PI * progressRef.current) / 2
      const scale = p.from + (p.to - p.from) * eased
      if (circleRef.current) {
        circleRef.current.style.transform = `scale(${scale.toFixed(4)})`
      }

      // Anillo de progreso del ciclo completo
      if (ringRef.current) {
        let elapsed = 0
        for (let i = 0; i < phaseRef.current; i++) elapsed += phases[i].seconds
        elapsed += p.seconds * progressRef.current
        const frac = Math.min(elapsed / cycleSeconds, 1)
        const circumference = 2 * Math.PI * 88
        ringRef.current.style.strokeDashoffset = String(
          circumference * (1 - frac)
        )
      }

      const remain = Math.max(1, Math.ceil((1 - progressRef.current) * p.seconds))
      setSecondsLeft((prev) => (prev === remain ? prev : remain))
      setTotalSeconds((prev) => prev + (dt >= 0 && dt < 1 ? dt : 0) )

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [running, phases, cycleSeconds, playChime])

  const resetSession = React.useCallback(
    (nextTechnique?: TechniqueKey) => {
      const key = nextTechnique ?? technique
      setRunning(false)
      phaseRef.current = 0
      progressRef.current = 0
      setPhaseIndex(0)
      setSecondsLeft(TECHNIQUES[key].phases[0].seconds)
      setCycles(0)
      setTotalSeconds(0)
      if (circleRef.current) circleRef.current.style.transform = 'scale(1)'
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(2 * Math.PI * 88)
      }
    },
    [technique]
  )

  const handleTechnique = (key: TechniqueKey) => {
    if (key === technique) return
    setTechnique(key)
    resetSession(key)
  }

  const currentPhase = phases[phaseIndex]
  const minutes = Math.floor(totalSeconds / 60)
  const secondsRemain = Math.floor(totalSeconds % 60)
  const mmss = `${minutes}:${String(secondsRemain).padStart(2, '0')}`

  return (
    <section
      id="respiracion"
      aria-label="Ejercicio de respiración consciente"
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Práctica guiada en vivo"
          title={
            <>
              Respira <em className="text-sage">conmigo</em>
            </>
          }
          description="Elige una técnica, siéntate cómodamente y deja que el círculo guíe tu aliento: cuando crece, inhala; cuando se sostiene, retén; cuando regresa, exhala."
        />

        {/* Selector de técnica */}
        <FadeIn delay={0.1}>
          <div
            role="group"
            aria-label="Elige una técnica de respiración"
            className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {(Object.keys(TECHNIQUES) as TechniqueKey[]).map((key) => {
              const t = TECHNIQUES[key]
              const active = technique === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTechnique(key)}
                  aria-pressed={active}
                  className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                    active
                      ? 'border-sage bg-sage-soft/70 shadow-md dark:bg-sage-soft/40'
                      : 'border-border/70 bg-card/70 hover:border-sage/50 hover:bg-sage-soft/40'
                  }`}
                >
                  <span className="block font-serif text-base font-semibold sm:text-lg">
                    {t.name}
                  </span>
                  <span
                    className={`mt-1 block text-xs font-medium tracking-[0.2em] ${
                      active ? 'text-sage' : 'text-muted-foreground'
                    }`}
                  >
                    {t.pattern}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            {TECHNIQUES[technique].description}
          </p>
        </FadeIn>

        {/* Círculo de respiración */}
        <FadeIn delay={0.15}>
          <div className="relative mx-auto mt-14 grid place-items-center">
            <div className="relative grid size-[300px] place-items-center sm:size-[340px]">
              {/* Anillo de progreso del ciclo */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 size-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                <circle
                  ref={ringRef}
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="var(--sage)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88}
                />
              </svg>

              {/* Ondas sutiles mientras se practica */}
              {running ? (
                <>
                  <span
                    className="animate-ripple absolute inset-8 rounded-full border border-sage/25"
                    aria-hidden="true"
                  />
                  <span
                    className="animate-ripple absolute inset-8 rounded-full border border-gold/20"
                    style={{ animationDelay: '-2.2s' }}
                    aria-hidden="true"
                  />
                </>
              ) : null}

              {/* Círculo que respira */}
              <div
                ref={circleRef}
                className="absolute inset-10 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft shadow-[0_0_80px_-16px_var(--sage)] will-change-transform dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40"
                style={{ transform: 'scale(1)' }}
                aria-hidden="true"
              />

              {/* Texto de fase */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <p
                  className="font-serif text-2xl font-medium italic text-ink sm:text-3xl"
                  aria-live="polite"
                >
                  {running ? currentPhase.label : '¿Empezamos?'}
                </p>
                <p
                  className="mt-1 font-serif text-5xl font-light tabular-nums text-ink/90 sm:text-6xl"
                  aria-hidden="true"
                >
                  {running ? secondsLeft : '·'}
                </p>
                <span className="sr-only" aria-live="polite">
                  {running
                    ? `${currentPhase.label}, quedan ${secondsLeft} segundos`
                    : 'Sesión en pausa'}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Controles */}
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setRunning((r) => !r)}
                size="lg"
                aria-label={running ? 'Pausar la práctica' : 'Comenzar la práctica'}
                className="h-14 gap-2.5 rounded-full bg-sage px-9 text-base font-medium text-primary-foreground shadow-lg shadow-sage/25 transition-all hover:opacity-90 hover:shadow-xl"
              >
                {running ? (
                  <>
                    <Pause className="size-5" aria-hidden="true" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="size-5" aria-hidden="true" />
                    {totalSeconds > 0 ? 'Continuar' : 'Comenzar'}
                  </>
                )}
              </Button>
              <Button
                onClick={() => resetSession()}
                variant="outline"
                size="icon"
                aria-label="Reiniciar la sesión"
                className="size-12 rounded-full border-border/80 text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-5" aria-hidden="true" />
              </Button>
              <Button
                onClick={() => setSoundOn((v) => !v)}
                variant="outline"
                size="icon"
                aria-pressed={soundOn}
                aria-label={
                  soundOn
                    ? 'Desactivar la señal sonora de fase'
                    : 'Activar la señal sonora de fase'
                }
                className={`size-12 rounded-full transition-colors ${
                  soundOn
                    ? 'border-gold/60 bg-gold/10 text-gold'
                    : 'border-border/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {soundOn ? (
                  <Bell className="size-5" aria-hidden="true" />
                ) : (
                  <BellOff className="size-5" aria-hidden="true" />
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              La campanita suena al cambiar de fase para guiarte con los ojos
              cerrados.
            </p>

            <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <dt>Ciclos completos</dt>
                <dd className="font-serif text-lg font-semibold text-foreground tabular-nums">
                  {cycles}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>Tiempo en práctica</dt>
                <dd className="font-serif text-lg font-semibold text-foreground tabular-nums">
                  {mmss}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>Ciclo de</dt>
                <dd className="font-serif text-lg font-semibold text-foreground tabular-nums">
                  {cycleSeconds}s
                </dd>
              </div>
            </dl>
          </div>
        </FadeIn>

        {/* Beneficios */}
        <FadeIn delay={0.25}>
          <ul
            className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-3"
            aria-label="Beneficios de la respiración consciente"
          >
            {BENEFITS.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur"
              >
                <b.icon className="size-4 text-sage" aria-hidden="true" />
                {b.label}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
