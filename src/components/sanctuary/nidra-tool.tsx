'use client'

import * as React from 'react'
import { BedDouble, Pause, Play } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

/** Yoga nidra: reproductor de la melodía de relajación profunda */
export function NidraTool() {
  const { d } = useI18n()
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setTime(0)
    if (duration > 60) {
      logPractice({ type: 'nidra', minutes: duration / 60 })
    }
  }

  const mmss = (s: number) =>
    Number.isFinite(s)
      ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
      : '--:--'

  return (
    <div className="space-y-6">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        {d.nidra.intro}
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? d.nidra.pause : d.nidra.listen}
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
              <BedDouble className="size-7" aria-hidden="true" />
            )}
          </span>
        </button>

        <p className="text-sm font-medium text-muted-foreground">
          {playing ? d.nidra.pause : d.nidra.listen}
          <span className="ml-2 tabular-nums text-muted-foreground/80">
            {mmss(time)} / {mmss(duration)}
          </span>
        </p>

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
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const audio = audioRef.current
            if (!audio) return
            audio.currentTime = 0
            audio.play().catch(() => {})
          }}
          className="rounded-full border-border/70 text-muted-foreground hover:text-foreground"
        >
          {d.common.reset}
        </Button>
      </div>

      <ul className="space-y-2.5 rounded-2xl border border-border/70 bg-card/70 p-5">
        {d.nidra.tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
            {tip}
          </li>
        ))}
      </ul>

      <audio
        ref={audioRef}
        src="/audios/meditacion-yoga-nidra.mp3"
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="hidden"
      >
        <track kind="captions" />
      </audio>
    </div>
  )
}
