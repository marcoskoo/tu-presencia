'use client'

import * as React from 'react'
import {
  Eye,
  FastForward,
  Flower2,
  Footprints,
  Lock,
  Moon,
  Pause,
  Play,
  Rewind,
  Timer,
  Waves,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'
import { usePremium } from '@/lib/premium'
import { logPractice } from '@/lib/practice-log'
import { useToast } from '@/hooks/use-toast'
import { PLAY_MEDITATION_EVENT } from '@/lib/events'

type MeditationId =
  | 'presencia'
  | 'escaneo'
  | 'dormir'
  | 'pausa'
  | 'caminando'
  | 'yogaNidra'
  | 'extendida'

type Meditation = {
  id: MeditationId
  file: string
  icon: React.ElementType
  tint: string
  bg: string
  premium?: boolean
}

const MEDITATIONS: Meditation[] = [
  {
    id: 'presencia',
    file: '/audios/meditacion-presencia.mp3',
    icon: Eye,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
  },
  {
    id: 'escaneo',
    file: '/audios/meditacion-escaneo.mp3',
    icon: Flower2,
    tint: 'text-terracotta',
    bg: 'bg-terracotta/10',
  },
  {
    id: 'dormir',
    file: '/audios/meditacion-dormir.mp3',
    icon: Moon,
    tint: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    id: 'pausa',
    file: '/audios/meditacion-pausa.mp3',
    icon: Timer,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
  },
  {
    id: 'caminando',
    file: '/audios/meditacion-caminando.mp3',
    icon: Footprints,
    tint: 'text-terracotta',
    bg: 'bg-terracotta/10',
  },
  {
    id: 'yogaNidra',
    file: '/audios/meditacion-yoga-nidra.mp3',
    icon: Waves,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
  },
  {
    id: 'extendida',
    file: '/audios/meditacion-presencia-extendida.mp3',
    icon: Moon,
    tint: 'text-gold',
    bg: 'bg-gold/10',
    premium: true,
  },
]

const RATES = [0.75, 1, 1.25]

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function Meditations() {
  const { d, lang } = useI18n()
  const { toast } = useToast()
  const premium = usePremium()

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const bellRef = React.useRef<HTMLAudioElement | null>(null)
  const autoplayRef = React.useRef(false)
  const loggedRef = React.useRef(false)

  const [selectedId, setSelectedId] = React.useState<MeditationId>('presencia')
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [rateIndex, setRateIndex] = React.useState(1)
  const [bellPlaying, setBellPlaying] = React.useState(false)

  const selected = MEDITATIONS.find((m) => m.id === selectedId) ?? MEDITATIONS[0]
  const item = d.meditations.items[selected.id]
  const rate = RATES[rateIndex]

  // Al cambiar de meditación: reinicia y reproduce si se solicitó
  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = rate
    if (autoplayRef.current) {
      autoplayRef.current = false
      audio.play().catch(() => {})
    }
  }, [selectedId, rate])

  React.useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
  }

  const selectMeditation = (m: Meditation) => {
    if (m.premium && !premium) {
      toast({
        title: d.timer.premiumLock,
        description: d.premium.plusDesc,
      })
      document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (m.id === selectedId) {
      togglePlay()
      return
    }
    autoplayRef.current = true
    setSelectedId(m.id)
    setPlaying(false)
    setTime(0)
    setDuration(0)
    loggedRef.current = false
  }

  // Reproducción externa desde la paleta de comandos (presencia:play-meditation)
  const selectMeditationRef = React.useRef(selectMeditation)
  React.useEffect(() => {
    selectMeditationRef.current = selectMeditation
  })

  React.useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<MeditationId>).detail
      const m = MEDITATIONS.find((x) => x.id === id)
      if (!m) return
      document
        .getElementById('meditaciones')
        ?.scrollIntoView({ behavior: 'smooth' })
      selectMeditationRef.current(m)
    }
    window.addEventListener(PLAY_MEDITATION_EVENT, handler)
    return () => window.removeEventListener(PLAY_MEDITATION_EVENT, handler)
  }, [])

  const skip = (delta: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(
      Math.max(0, audio.currentTime + delta),
      audio.duration || Infinity
    )
    setTime(audio.currentTime)
  }

  // Registrar la práctica al terminar la reproducción
  const handleEnded = () => {
    setPlaying(false)
    setTime(0)
    if (!loggedRef.current && duration > 60) {
      loggedRef.current = true
      const type = selected.id === 'yogaNidra' ? 'nidra' : selected.id === 'caminando' ? 'walking' : 'meditation'
      logPractice({ type, minutes: duration / 60 })
    }
  }

  const playBell = () => {
    if (!bellRef.current) {
      const bell = new Audio('/audios/campana-presencia.mp3')
      bell.volume = 0.9
      bell.onplay = () => setBellPlaying(true)
      bell.onpause = () => setBellPlaying(false)
      bell.onended = () => setBellPlaying(false)
      bellRef.current = bell
    }
    if (bellPlaying) {
      bellRef.current.pause()
      bellRef.current.currentTime = 0
      setBellPlaying(false)
    } else {
      bellRef.current.play().catch(() => {})
    }
  }

  return (
    <section
      id="meditaciones"
      aria-label={d.meditations.sectionLabel}
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.meditations.eyebrow}
          title={
            <>
              {d.meditations.titleA}{' '}
              <em className="text-sage">{d.meditations.titleB}</em>
            </>
          }
          description={d.meditations.description}
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Lista de meditaciones */}
          <FadeIn>
            <div
              role="listbox"
              aria-label={d.meditations.listLabel}
              className="space-y-3"
            >
              {MEDITATIONS.map((m) => {
                const info = d.meditations.items[m.id]
                const active = m.id === selectedId
                const isThisPlaying = active && playing
                const locked = m.premium && !premium
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => selectMeditation(m)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      active
                        ? 'border-sage bg-sage-soft/70 shadow-md dark:bg-sage-soft/40'
                        : 'border-border/70 bg-card/70 hover:border-sage/50 hover:bg-sage-soft/40'
                    }`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ${m.bg} ${
                        isThisPlaying ? 'animate-breathe-soft' : ''
                      }`}
                    >
                      <m.icon className={`size-6 ${m.tint}`} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-base font-semibold leading-snug sm:text-lg">
                        {info.title}
                      </span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span>{info.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span>{info.tag}</span>
                        {lang !== 'es' ? (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{d.common.audioEs}</span>
                          </>
                        ) : null}
                        {m.premium ? (
                          <span className={`ml-auto inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold ${locked ? '' : 'hidden'}`}>
                            <Lock className="size-3" aria-hidden="true" />
                            {d.common.premium}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors ${
                        active
                          ? 'border-sage bg-sage text-primary-foreground'
                          : 'border-border/80 text-muted-foreground'
                      }`}
                      aria-hidden="true"
                    >
                      {isThisPlaying ? (
                        <Pause className="size-4" />
                      ) : (
                        <Play className="size-4 translate-x-px" />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 px-1 text-xs leading-relaxed text-muted-foreground">
              {d.meditations.tip}
            </p>
          </FadeIn>

          {/* Reproductor */}
          <FadeIn delay={0.12}>
            <Card className="overflow-hidden border-border/70 bg-card/90 shadow-lg backdrop-blur">
              <CardContent className="p-7 sm:p-9">
                {/* Disco enso + botón principal */}
                <div className="mx-auto grid size-56 place-items-center sm:size-64">
                  <div className="relative grid size-full place-items-center">
                    <div
                      className={`absolute inset-0 rounded-full border border-dashed border-sage/40 ${
                        playing ? 'animate-spin-slower' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <div
                      className={`absolute inset-5 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft shadow-[0_0_70px_-16px_var(--sage)] dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40 ${
                        playing ? 'animate-breathe' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <Button
                      onClick={togglePlay}
                      aria-label={
                        playing
                          ? d.meditations.player.pauseTitle(item.title)
                          : d.meditations.player.playTitle(item.title)
                      }
                      className="relative z-10 size-20 rounded-full border border-white/40 bg-card/85 text-sage shadow-lg backdrop-blur transition-transform hover:scale-105"
                    >
                      {playing ? (
                        <Pause className="size-8" aria-hidden="true" />
                      ) : (
                        <Play className="size-8 translate-x-0.5" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="mt-7 text-center">
                  <Badge
                    variant="secondary"
                    className={`rounded-full ${selected.bg} ${selected.tint} font-medium`}
                  >
                    {item.tag} · {item.duration}
                  </Badge>
                  <h3 className="mt-3 font-serif text-2xl font-medium leading-snug sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Barra de progreso */}
                <div className="mt-7">
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
                    aria-valuetext={`${formatTime(time)} / ${formatTime(duration)}`}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs tabular-nums text-muted-foreground">
                    <span>{formatTime(time)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controles */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => skip(-10)}
                    aria-label={d.meditations.player.rewind}
                    className="size-11 rounded-full border-border/80 text-muted-foreground hover:text-foreground"
                  >
                    <Rewind className="size-5" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={togglePlay}
                    aria-label={playing ? d.meditations.player.pause : d.meditations.player.play}
                    className="size-14 rounded-full bg-sage text-primary-foreground shadow-lg shadow-sage/25 transition-all hover:opacity-90 hover:shadow-xl"
                  >
                    {playing ? (
                      <Pause className="size-6" aria-hidden="true" />
                    ) : (
                      <Play className="size-6 translate-x-0.5" aria-hidden="true" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => skip(10)}
                    aria-label={d.meditations.player.forward}
                    className="size-11 rounded-full border-border/80 text-muted-foreground hover:text-foreground"
                  >
                    <FastForward className="size-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRateIndex((i) => (i + 1) % RATES.length)}
                    aria-label={d.meditations.player.speed(rate)}
                    className="h-11 min-w-16 rounded-full border-border/80 px-3 font-serif text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {rate === 1 ? '1×' : `${rate}×`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Campana de presencia */}
        <FadeIn delay={0.15}>
          <Card className="mt-10 border-border/70 bg-card/80 shadow-sm backdrop-blur">
            <CardContent className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:p-7 sm:text-left">
              <Button
                onClick={playBell}
                aria-label={
                  bellPlaying ? d.meditations.bell.stop : d.meditations.bell.play
                }
                aria-pressed={bellPlaying}
                className={`grid size-16 shrink-0 place-items-center rounded-full border transition-all ${
                  bellPlaying
                    ? 'border-gold/60 bg-gold/15 text-gold shadow-lg shadow-gold/20'
                    : 'border-sage/50 bg-sage-soft/70 text-sage hover:scale-105 dark:bg-sage-soft/40'
                }`}
              >
                <span
                  className={bellPlaying ? 'animate-breathe-soft' : ''}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8"
                  >
                    <path d="M12 3a6 6 0 0 0-6 6c0 4-1.5 5.5-2 6h16c-.5-.5-2-2-2-6a6 6 0 0 0-6-6Z" />
                    <path d="M10 19a2 2 0 0 0 4 0" />
                    <path d="M12 3V1.5" />
                  </svg>
                </span>
              </Button>
              <div>
                <h3 className="font-serif text-xl font-medium">
                  {d.meditations.bell.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {d.meditations.bell.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Elementos de audio (ocultos) */}
      <audio
        ref={audioRef}
        src={selected.file}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleEnded}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onSeeked={(e) => setTime(e.currentTarget.currentTime)}
        className="hidden"
      >
        <track kind="captions" />
      </audio>
    </section>
  )
}
