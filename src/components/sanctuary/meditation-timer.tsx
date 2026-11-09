'use client'

import * as React from 'react'
import { BellRing, Pause, Play, RotateCcw, Timer as TimerIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n/context'
import { usePremium } from '@/lib/premium'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

const FREE_DURATIONS = [3, 5, 10, 15, 20, 30]
const PREMIUM_DURATIONS = [45, 60]
const INTERVALS = [0, 1, 5, 10]
const PREP_SECONDS = 5

type Phase = 'idle' | 'prep' | 'running' | 'paused' | 'finished'

export function MeditationTimer() {
  const { d } = useI18n()
  const premium = usePremium()

  const [minutes, setMinutes] = React.useState(5)
  const [intervalMin, setIntervalMin] = React.useState(0)
  const [phase, setPhase] = React.useState<Phase>('idle')
  const [secondsLeft, setSecondsLeft] = React.useState(0)
  const [customOpen, setCustomOpen] = React.useState(false)
  const [customValue, setCustomValue] = React.useState('')

  const bellRef = React.useRef<HTMLAudioElement | null>(null)
  const dingRef = React.useRef<HTMLAudioElement | null>(null)
  const endTimeRef = React.useRef(0)
  const loggedRef = React.useRef(false)

  const playBell = React.useCallback((soft = false) => {
    if (!bellRef.current) {
      bellRef.current = new Audio('/audios/campana-presencia.mp3')
    }
    if (!dingRef.current) {
      dingRef.current = new Audio('/audios/ding-fase.mp3')
    }
    const clip = soft ? dingRef.current : bellRef.current
    if (!clip) return
    clip.currentTime = 0
    clip.volume = soft ? 0.5 : 0.85
    clip.play().catch(() => {})
  }, [])

  // Cuenta atrás con precisión basada en timestamp
  React.useEffect(() => {
    if (phase !== 'prep' && phase !== 'running') return

    const id = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
      setSecondsLeft(remaining)

      if (phase === 'running' && intervalMin > 0) {
        const elapsed = minutes * 60 - remaining
        if (elapsed > 0 && elapsed % (intervalMin * 60) === 0) {
          playBell(true)
        }
      }

      if (remaining <= 0) {
        if (phase === 'prep') {
          endTimeRef.current = Date.now() + minutes * 60 * 1000
          setPhase('running')
          setSecondsLeft(minutes * 60)
          playBell(false)
        } else {
          playBell(false)
          setPhase('finished')
          if (!loggedRef.current) {
            loggedRef.current = true
            logPractice({ type: 'timer', minutes })
          }
        }
      }
    }, 250)

    return () => window.clearInterval(id)
  }, [phase, minutes, intervalMin, playBell])

  const start = () => {
    if (minutes > 30 && !premium) return
    loggedRef.current = false
    endTimeRef.current = Date.now() + PREP_SECONDS * 1000
    setSecondsLeft(PREP_SECONDS)
    setPhase('prep')
  }

  const togglePause = () => {
    if (phase === 'running') {
      // Guarda el restante y pausa
      setSecondsLeft(Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000)))
      setPhase('paused')
    } else if (phase === 'paused') {
      endTimeRef.current = Date.now() + secondsLeft * 1000
      setPhase('running')
    }
  }

  const reset = (alsoLog = true) => {
    if (alsoLog && (phase === 'running' || phase === 'paused') && !loggedRef.current) {
      const practiced = minutes - secondsLeft / 60
      if (practiced >= 1) {
        loggedRef.current = true
        logPractice({ type: 'timer', minutes: practiced })
      }
    }
    setPhase('idle')
    setSecondsLeft(0)
  }

  const applyCustom = () => {
    const max = premium ? 90 : 30
    const value = Math.min(max, Math.max(1, parseInt(customValue, 10) || 0))
    if (value > 0) {
      setMinutes(value)
      setCustomOpen(false)
    }
  }

  const total = phase === 'prep' ? PREP_SECONDS : minutes * 60
  const progress = phase === 'idle' ? 0 : 1 - secondsLeft / total
  const mm = Math.floor(secondsLeft / 60)
  const ss = secondsLeft % 60

  return (
    <div className="flex flex-col items-center gap-7">
      {/* Selector de duración */}
      <div className="w-full">
        <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {d.timer.durations}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {[...FREE_DURATIONS, ...(premium ? PREMIUM_DURATIONS : [])].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMinutes(m)
                reset(false)
              }}
              aria-pressed={minutes === m}
              className={cn(
                'h-11 w-11 rounded-2xl border font-serif text-base font-semibold tabular-nums transition-all',
                minutes === m
                  ? 'border-sage bg-sage text-primary-foreground shadow-md'
                  : 'border-border/70 bg-card/70 text-muted-foreground hover:border-sage/50 hover:text-foreground'
              )}
            >
              {m}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustomOpen((v) => !v)}
            aria-expanded={customOpen}
            className={cn(
              'h-11 rounded-2xl border px-4 text-sm font-medium transition-all',
              customOpen
                ? 'border-sage bg-sage-soft/70 text-sage dark:bg-sage-soft/40'
                : 'border-border/70 bg-card/70 text-muted-foreground hover:border-sage/50 hover:text-foreground'
            )}
          >
            {d.timer.custom}
          </button>
        </div>
        {customOpen ? (
          <div className="mx-auto mt-3 flex max-w-64 items-center gap-2">
            <Input
              type="number"
              min={1}
              max={90}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder={d.timer.customMinutes}
              aria-label={d.timer.customMinutes}
              className="bg-background"
              onKeyDown={(e) => e.key === 'Enter' && applyCustom()}
            />
            <Button size="sm" onClick={applyCustom} className="rounded-full bg-sage text-primary-foreground hover:opacity-90">
              OK
            </Button>
          </div>
        ) : null}
      </div>

      {/* Campanas intermedias */}
      <div className="flex flex-col items-center gap-2">
        <Label className="text-xs text-muted-foreground">{d.timer.interval}</Label>
        <div className="flex gap-2">
          {INTERVALS.map((iv) => (
            <button
              key={iv}
              type="button"
              onClick={() => setIntervalMin(iv)}
              aria-pressed={intervalMin === iv}
              className={cn(
                'h-9 rounded-full border px-4 text-xs font-medium transition-all',
                intervalMin === iv
                  ? 'border-gold/60 bg-gold/10 text-gold'
                  : 'border-border/70 bg-card/70 text-muted-foreground hover:text-foreground'
              )}
            >
              {iv === 0 ? d.timer.intervalNone : d.timer.everyMin(iv)}
            </button>
          ))}
        </div>
      </div>

      {/* Círculo de progreso */}
      <div className="relative grid size-64 place-items-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--border)" strokeWidth="1.5" />
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="var(--sage)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.3s linear' }}
          />
        </svg>
        <div className="flex flex-col items-center">
          {phase === 'idle' ? (
            <>
              <TimerIcon className="size-8 text-sage" aria-hidden="true" />
              <p className="mt-2 font-serif text-4xl font-light tabular-nums">
                {minutes} {d.timer.minutesUnit}
              </p>
            </>
          ) : phase === 'finished' ? (
            <>
              <BellRing className="size-8 animate-breathe-soft text-gold" aria-hidden="true" />
              <p className="mt-3 max-w-52 text-center font-serif text-lg font-medium">
                {d.timer.finished}
              </p>
              <p className="mt-1 max-w-56 text-center text-xs text-muted-foreground">
                {d.timer.finishedHint}
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {phase === 'prep' ? d.timer.prepLabel : d.timer.running}
              </p>
              <p className="font-serif text-6xl font-light tabular-nums" aria-live="polite">
                {mm}:{String(ss).padStart(2, '0')}
              </p>
              {phase === 'prep' ? (
                <p className="mt-1 text-xs text-muted-foreground">{d.timer.prepare}</p>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-3">
        {phase === 'idle' || phase === 'finished' ? (
          <Button
            onClick={start}
            className="gap-2 rounded-full bg-sage px-8 text-base font-medium text-primary-foreground shadow-lg shadow-sage/25 hover:opacity-90"
          >
            <Play className="size-5" aria-hidden="true" />
            {d.timer.start}
          </Button>
        ) : (
          <>
            <Button
              onClick={togglePause}
              aria-label={phase === 'paused' ? d.common.play : d.common.pause}
              className="size-14 rounded-full bg-sage text-primary-foreground shadow-lg shadow-sage/25 hover:opacity-90"
            >
              {phase === 'paused' ? (
                <Play className="size-6 translate-x-0.5" aria-hidden="true" />
              ) : (
                <Pause className="size-6" aria-hidden="true" />
              )}
            </Button>
            <Button
              onClick={() => reset()}
              variant="outline"
              aria-label={d.timer.stop}
              className="gap-2 rounded-full border-border/80 px-5 text-sm text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {d.timer.stop}
            </Button>
          </>
        )}
      </div>

      {minutes > 30 && !premium ? (
        <Badge variant="secondary" className="rounded-full bg-gold/10 font-normal text-gold">
          {d.timer.premiumLock}
        </Badge>
      ) : null}
    </div>
  )
}
