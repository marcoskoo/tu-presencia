'use client'

import * as React from 'react'
import { BellRing, Footprints, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

const BELL_INTERVALS = [30, 60, 120]

/** Herramienta de meditación caminando: melodía de fondo o modo solo campanas */
export function WalkingTool() {
  const { d } = useI18n()
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const bellTimerRef = React.useRef(0)
  const [mode, setMode] = React.useState<'audio' | 'bells'>('audio')
  const [bellEvery, setBellEvery] = React.useState(60)
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  const clearBellTimer = () => {
    if (bellTimerRef.current) {
      window.clearInterval(bellTimerRef.current)
      bellTimerRef.current = 0
    }
  }

  React.useEffect(() => clearBellTimer, [])

  const playBell = () => {
    const bell = new Audio('/audios/ding-fase.mp3')
    bell.volume = 0.6
    bell.play().catch(() => {})
  }

  const toggle = () => {
    if (mode === 'audio') {
      const audio = audioRef.current
      if (!audio) return
      if (playing) {
        audio.pause()
      } else {
        audio.play().catch(() => {})
      }
    } else {
      if (playing) {
        clearBellTimer()
        setPlaying(false)
        logPractice({ type: 'walking', minutes: time / 60 })
      } else {
        setPlaying(true)
        playBell()
        bellTimerRef.current = window.setInterval(() => {
          playBell()
          setTime((t) => {
            const next = t + bellEvery
            return next
          })
        }, bellEvery * 1000)
      }
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setTime(0)
    if (duration > 60) {
      logPractice({ type: 'walking', minutes: duration / 60 })
    }
  }

  const mmss = (s: number) =>
    Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '--:--'

  return (
    <div className="space-y-6">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        {d.walking.intro}
      </p>

      {/* Selector de modo */}
      <div className="mx-auto flex w-fit gap-2 rounded-full border border-border/70 bg-card/70 p-1">
        {(['audio', 'bells'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              if (playing) toggle()
              setMode(m)
              setTime(0)
            }}
            aria-pressed={mode === m}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              mode === m
                ? 'bg-sage text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {m === 'audio' ? d.walking.audioMode : d.walking.bellMode}
          </button>
        ))}
      </div>

      {mode === 'bells' ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">{d.walking.bellEvery}</span>
          {BELL_INTERVALS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setBellEvery(s)}
              aria-pressed={bellEvery === s}
              className={cn(
                'h-9 rounded-full border px-4 text-xs font-medium tabular-nums transition-all',
                bellEvery === s
                  ? 'border-gold/60 bg-gold/10 text-gold'
                  : 'border-border/70 text-muted-foreground hover:text-foreground'
              )}
            >
              {s} {d.common.sec}
            </button>
          ))}
        </div>
      ) : null}

      {/* Botón principal */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? d.walking.pauseGuide : d.walking.playGuide}
          className={cn(
            'relative grid size-40 place-items-center rounded-full border transition-all hover:scale-[1.03]',
            playing
              ? 'border-sage bg-sage-soft/70 shadow-lg dark:bg-sage-soft/40'
              : 'border-border/70 bg-card/80'
          )}
        >
          <span
            className={cn(
              'absolute inset-3 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40',
              playing && 'animate-breathe'
            )}
            aria-hidden="true"
          />
          <span className="relative z-10 grid size-16 place-items-center rounded-full bg-card/90 text-sage shadow-md">
            {playing ? (
              <Pause className="size-7" aria-hidden="true" />
            ) : (
              <Play className="size-7 translate-x-0.5" aria-hidden="true" />
            )}
          </span>
        </button>

        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Footprints className="size-4 text-terracotta" aria-hidden="true" />
          {mode === 'audio'
            ? playing
              ? d.walking.pauseGuide
              : d.walking.playGuide
            : playing
              ? d.common.pause
              : d.common.begin}
          {playing || time > 0 ? (
            <span className="tabular-nums text-muted-foreground/80">· {mmss(time)}</span>
          ) : null}
        </p>

        {mode === 'audio' ? (
          <div className="w-full max-w-sm">
            <Slider
              value={[Math.min(time, duration || 0)]}
              max={duration || 1}
              step={0.1}
              onValueChange={(v) => {
                const audio = audioRef.current
                if (!audio) return
                audio.currentTime = v[0]
                setTime(v[0])
              }}
              aria-label={d.meditations.player.position}
            />
            <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
              <span>{mmss(time)}</span>
              <span>{mmss(duration)}</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Recordatorios de la práctica */}
      <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
          {d.walking.whileWalking}
        </p>
        <ul className="mt-3 space-y-2.5">
          {d.walking.steps.map((step) => (
            <li key={step} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <BellRing className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
              {step}
            </li>
          ))}
        </ul>
      </div>

      {mode === 'audio' ? (
        <audio
          ref={audioRef}
          src="/audios/meditacion-caminando.mp3"
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={handleEnded}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration)
            setTime(0)
          }}
          className="hidden"
        >
          <track kind="captions" />
        </audio>
      ) : null}
    </div>
  )
}
