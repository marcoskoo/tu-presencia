'use client'

import * as React from 'react'
import { Clock3, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { PAUSE_OPEN_EVENT } from '@/components/landing/navbar'
import { cn } from '@/lib/utils'

/** Fases de la pausa: respirar (60s) → silencio (90s) → volver (30s) */
const PHASE_SECONDS = [60, 90, 30]

export function PauseOverlay() {
  const { d } = useI18n()
  const [open, setOpen] = React.useState(false)
  const [phase, setPhase] = React.useState(0)
  const [secondsLeft, setSecondsLeft] = React.useState(PHASE_SECONDS[0])
  const [done, setDone] = React.useState(false)
  const endTimeRef = React.useRef(0)
  const phaseRef = React.useRef(0)

  const phases = [
    { title: d.pause.phase1, desc: d.pause.phase1Desc },
    { title: d.pause.phase2, desc: d.pause.phase2Desc },
    { title: d.pause.phase3, desc: d.pause.phase3Desc },
  ]

  const playBell = (soft = false) => {
    const bell = new Audio(soft ? '/audios/ding-fase.mp3' : '/audios/campana-presencia.mp3')
    bell.volume = soft ? 0.45 : 0.8
    bell.play().catch(() => {})
  }

  const start = () => {
    phaseRef.current = 0
    setPhase(0)
    setDone(false)
    setSecondsLeft(PHASE_SECONDS[0])
    endTimeRef.current = Date.now() + PHASE_SECONDS[0] * 1000
    playBell(true)
  }

  const close = () => {
    setOpen(false)
    setDone(false)
  }

  const openPause = () => {
    setOpen(true)
    start()
  }

  React.useEffect(() => {
    window.addEventListener(PAUSE_OPEN_EVENT, openPause)
    // Atajo de la PWA instalada: /?atajo=pausa
    if (new URLSearchParams(window.location.search).get('atajo') === 'pausa') {
      window.setTimeout(() => {
        setOpen(true)
        start()
      }, 400)
    }
    return () => window.removeEventListener(PAUSE_OPEN_EVENT, openPause)
     
  }, [])

  // Cuenta atrás por fases
  React.useEffect(() => {
    if (!open || done) return
    const id = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining <= 0) {
        if (phaseRef.current < 2) {
          phaseRef.current += 1
          const nextPhase = phaseRef.current
          setPhase(nextPhase)
          endTimeRef.current = Date.now() + PHASE_SECONDS[nextPhase] * 1000
          setSecondsLeft(PHASE_SECONDS[nextPhase])
          playBell(nextPhase === 2)
        } else {
          setDone(true)
          playBell(false)
          logPractice({ type: 'pause', minutes: 3 })
        }
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [open, done])

  // Escape para salir
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
     
  }, [open])

  const skipPhase = () => {
    if (done) return
    if (phaseRef.current < 2) {
      phaseRef.current += 1
      const nextPhase = phaseRef.current
      setPhase(nextPhase)
      endTimeRef.current = Date.now() + PHASE_SECONDS[nextPhase] * 1000
      setSecondsLeft(PHASE_SECONDS[nextPhase])
    } else {
      setDone(true)
      logPractice({ type: 'pause', minutes: 3 })
    }
  }

  if (!open) return null

  const current = phases[phase]
  const mm = Math.floor(secondsLeft / 60)
  const ss = secondsLeft % 60

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={d.pause.ariaDialog}
      className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-background via-background to-sage-soft/40 backdrop-blur-md dark:via-background dark:to-sage-soft/10"
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          <Clock3 className="size-4 text-gold" aria-hidden="true" />
          {d.pause.title}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={close}
          aria-label={d.pause.exit}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16">
        {done ? (
          <>
            <div className="relative grid size-48 place-items-center">
              <div className="animate-breathe absolute inset-0 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft shadow-[0_0_80px_-16px_var(--sage)] dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40" aria-hidden="true" />
              <p className="relative font-serif text-2xl italic text-ink">{d.pause.done}</p>
            </div>
            <p className="max-w-sm text-center text-sm text-muted-foreground">
              {d.pause.doneHint}
            </p>
            <Button
              onClick={close}
              className="rounded-full bg-sage px-8 font-medium text-primary-foreground hover:opacity-90"
            >
              {d.common.close}
            </Button>
          </>
        ) : (
          <>
            {/* Círculo central */}
            <div className="relative grid size-64 place-items-center sm:size-72">
              {phase === 0 ? (
                <div className="pause-breathe absolute inset-8 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft shadow-[0_0_90px_-14px_var(--sage)] dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40" aria-hidden="true" />
              ) : (
                <div
                  className={cn(
                    'absolute inset-10 rounded-full border',
                    phase === 1 ? 'animate-breathe-soft border-sage/30' : 'border-gold/40'
                  )}
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="font-serif text-3xl font-medium italic text-ink sm:text-4xl">
                  {current.title}
                </p>
                <p className="mt-2 max-w-56 text-sm text-muted-foreground">
                  {current.desc}
                </p>
                <p className="mt-4 font-serif text-5xl font-light tabular-nums text-ink/90" aria-live="polite">
                  {mm}:{String(ss).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* Indicadores de fase */}
            <ol className="flex items-center gap-2" aria-hidden="true">
              {phases.map((p, i) => (
                <li
                  key={p.title}
                  className={cn(
                    'h-2 rounded-full transition-all duration-500',
                    i === phase ? 'w-10 bg-sage' : i < phase ? 'w-4 bg-sage/50' : 'w-4 bg-border'
                  )}
                />
              ))}
            </ol>

            <Button
              variant="ghost"
              size="sm"
              onClick={skipPhase}
              className="rounded-full text-xs text-muted-foreground hover:text-foreground"
            >
              {d.pause.skip} →
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
