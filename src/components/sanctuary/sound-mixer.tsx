'use client'

import * as React from 'react'
import {
  CloudRain,
  MountainSnow,
  Trees,
  Volume2,
  Waves,
  Wind,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

type LayerKey = 'lluvia' | 'rio' | 'bosque' | 'cuencos' | 'viento'

const LAYERS: { key: LayerKey; icon: React.ElementType; tint: string; bg: string }[] = [
  { key: 'lluvia', icon: CloudRain, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'rio', icon: Waves, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'bosque', icon: Trees, tint: 'text-gold', bg: 'bg-gold/10' },
  { key: 'cuencos', icon: MountainSnow, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'viento', icon: Wind, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
]

const AUTO_STOP_OPTIONS = [0, 15, 30, 60]

/** Motor de audio ambiente: capas sintetizadas con Web Audio API */
class AmbientEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private layers = new Map<LayerKey, { gain: GainNode; stop: () => void }>()
  private startedAt = 0

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.9
      this.master.connect(this.ctx.destination)
      this.startedAt = Date.now()
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  private noiseBuffer(ctx: AudioContext, brown = false): AudioBuffer {
    const len = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    if (brown) {
      let last = 0
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 3.5
      }
    } else {
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    }
    return buffer
  }

  setMasterVolume(v: number) {
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05)
    }
  }

  setLayerVolume(key: LayerKey, v: number) {
    const layer = this.layers.get(key)
    if (layer && this.ctx) {
      layer.gain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.08)
    }
  }

  /** Cuenco tibetano sintetizado (parciales inarmónicos con decaimiento) */
  playBowl(freq: number, volume: number) {
    const ctx = this.ensureCtx()
    if (!this.master) return
    const partials: [number, number, number][] = [
      [1, 1.0, 2.6],
      [2.75, 0.42, 3.4],
      [5.4, 0.22, 5.0],
      [8.93, 0.1, 7.0],
    ]
    for (const [ratio, amp, decay] of partials) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq * ratio
      const t = ctx.currentTime
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(amp * volume, t + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + decay)
      osc.connect(gain)
      gain.connect(this.master)
      osc.start(t)
      osc.stop(t + decay + 0.1)
    }
  }

  private scheduleRandom(
    key: LayerKey,
    action: () => void,
    minMs: number,
    maxMs: number
  ) {
    let timer = 0
    const loop = () => {
      timer = window.setTimeout(() => {
        if (this.layers.has(key)) {
          action()
          loop()
        }
      }, minMs + Math.random() * (maxMs - minMs))
    }
    loop()
    return () => window.clearTimeout(timer)
  }

  enableLayer(key: LayerKey, volume: number) {
    if (this.layers.has(key)) return
    const ctx = this.ensureCtx()
    if (!this.master) return

    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(this.master)
    gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.4)

    const stops: (() => void)[] = []

    if (key === 'lluvia' || key === 'rio' || key === 'viento') {
      const brown = key !== 'lluvia'
      const src = ctx.createBufferSource()
      src.buffer = this.noiseBuffer(ctx, brown)
      src.loop = true

      const filter = ctx.createBiquadFilter()
      if (key === 'lluvia') {
        filter.type = 'bandpass'
        filter.frequency.value = 1400
        filter.Q.value = 0.5
      } else if (key === 'rio') {
        filter.type = 'lowpass'
        filter.frequency.value = 900
      } else {
        filter.type = 'lowpass'
        filter.frequency.value = 400
      }

      // Modulación de amplitud: vida orgánica del sonido
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = key === 'rio' ? 0.9 : key === 'viento' ? 0.14 : 0.3
      lfoGain.gain.value = key === 'lluvia' ? 0.05 : 0.18
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)

      const preGain = ctx.createGain()
      preGain.gain.value = key === 'lluvia' ? 0.5 : key === 'rio' ? 0.7 : 0.9

      src.connect(filter)
      filter.connect(preGain)
      preGain.connect(gain)
      src.start()
      lfo.start()

      // Viento: además modula el filtro
      if (key === 'viento') {
        const sweep = ctx.createOscillator()
        const sweepGain = ctx.createGain()
        sweep.type = 'sine'
        sweep.frequency.value = 0.07
        sweepGain.gain.value = 180
        sweep.connect(sweepGain)
        sweepGain.connect(filter.frequency)
        sweep.start()
        stops.push(() => sweep.stop())
      }

      stops.push(() => {
        src.stop()
        lfo.stop()
      })
    }

    if (key === 'bosque') {
      // Brisa de fondo muy tenue + gorjeos de pájaros sintetizados
      const src = ctx.createBufferSource()
      src.buffer = this.noiseBuffer(ctx, true)
      src.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 350
      const preGain = ctx.createGain()
      preGain.gain.value = 0.22
      src.connect(filter)
      filter.connect(preGain)
      preGain.connect(gain)
      src.start()
      stops.push(() => src.stop())

      const chirpStop = this.scheduleRandom(
        key,
        () => {
          const now = ctx.currentTime
          const base = 2200 + Math.random() * 1400
          const notes = 1 + Math.floor(Math.random() * 3)
          for (let n = 0; n < notes; n++) {
            const osc = ctx.createOscillator()
            const env = ctx.createGain()
            const t = now + n * 0.16
            osc.type = 'sine'
            osc.frequency.setValueAtTime(base, t)
            osc.frequency.exponentialRampToValueAtTime(base * (0.75 + Math.random() * 0.5), t + 0.12)
            env.gain.setValueAtTime(0, t)
            env.gain.linearRampToValueAtTime(0.05, t + 0.02)
            env.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
            osc.connect(env)
            env.connect(gain)
            osc.start(t)
            osc.stop(t + 0.2)
          }
        },
        3000,
        9000
      )
      stops.push(chirpStop)
    }

    if (key === 'cuencos') {
      const scale = [174.6, 196, 220, 261.6, 293.7]
      const bowlStop = this.scheduleRandom(
        key,
        () => this.playBowl(scale[Math.floor(Math.random() * scale.length)], 0.16),
        7000,
        16000
      )
      // Primer cuenco casi inmediato
      window.setTimeout(() => {
        if (this.layers.has(key)) this.playBowl(scale[2], 0.14)
      }, 800)
      stops.push(bowlStop)
    }

    this.layers.set(key, { gain, stop: () => stops.forEach((s) => s()) })
  }

  disableLayer(key: LayerKey) {
    const layer = this.layers.get(key)
    if (!layer || !this.ctx) return
    this.layers.delete(key)
    layer.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3)
    window.setTimeout(() => layer.stop(), 900)
  }

  stopAll() {
    for (const key of [...this.layers.keys()]) this.disableLayer(key)
  }

  activeCount(): number {
    return this.layers.size
  }

  elapsedMinutes(): number {
    return this.startedAt ? (Date.now() - this.startedAt) / 60000 : 0
  }
}

export function SoundMixer() {
  const { d } = useI18n()
  const engineRef = React.useRef<AmbientEngine | null>(null)
  const [active, setActive] = React.useState<Record<LayerKey, boolean>>({
    lluvia: false,
    rio: false,
    bosque: false,
    cuencos: false,
    viento: false,
  })
  const [volumes, setVolumes] = React.useState<Record<LayerKey, number>>({
    lluvia: 0.7,
    rio: 0.7,
    bosque: 0.7,
    cuencos: 0.7,
    viento: 0.7,
  })
  const [master, setMaster] = React.useState(0.9)
  const [autoStop, setAutoStop] = React.useState(0)
  const stopTimerRef = React.useRef(0)

  React.useEffect(() => {
    return () => {
      engineRef.current?.stopAll()
      window.clearTimeout(stopTimerRef.current)
    }
  }, [])

  const getEngine = () => {
    if (!engineRef.current) engineRef.current = new AmbientEngine()
    return engineRef.current
  }

  const activeCount = LAYERS.filter((l) => active[l.key]).length

  const toggleLayer = (key: LayerKey) => {
    const engine = getEngine()
    const next = !active[key]
    setActive((prev) => ({ ...prev, [key]: next }))
    if (next) {
      engine.enableLayer(key, volumes[key] * 0.6)
      armAutoStop()
    } else {
      engine.disableLayer(key)
      if (engine.activeCount() === 0) flushPractice()
    }
  }

  const changeVolume = (key: LayerKey, v: number) => {
    setVolumes((prev) => ({ ...prev, [key]: v }))
    if (active[key]) engineRef.current?.setLayerVolume(key, v * 0.6)
  }

  const stopAll = () => {
    engineRef.current?.stopAll()
    setActive({ lluvia: false, rio: false, bosque: false, cuencos: false, viento: false })
    flushPractice()
  }

  const flushPractice = React.useCallback(() => {
    const engine = engineRef.current
    if (!engine) return
    const minutes = engine.elapsedMinutes()
    if (minutes >= 2) {
      logPractice({ type: 'sounds', minutes })
    }
  }, [])

  const armAutoStop = () => {
    window.clearTimeout(stopTimerRef.current)
    if (autoStop > 0) {
      stopTimerRef.current = window.setTimeout(
        () => {
          stopAll()
        },
        autoStop * 60000
      )
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        {d.sounds.hint}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {LAYERS.map((layer) => {
          const isActive = active[layer.key]
          return (
            <div
              key={layer.key}
              className={cn(
                'rounded-2xl border p-4 transition-all duration-300',
                isActive
                  ? 'border-sage bg-sage-soft/60 shadow-md dark:bg-sage-soft/30'
                  : 'border-border/70 bg-card/70'
              )}
            >
              <button
                type="button"
                onClick={() => toggleLayer(layer.key)}
                aria-pressed={isActive}
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-2xl',
                    layer.bg,
                    isActive && 'animate-breathe-soft'
                  )}
                >
                  <layer.icon className={cn('size-5', layer.tint)} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-base font-semibold">
                    {d.sounds.layers[layer.key]}
                  </span>
                  <span className="text-xs text-muted-foreground" aria-hidden="true">
                    {isActive ? '●' : '○'}
                  </span>
                </span>
              </button>
              {isActive ? (
                <div className="mt-3 px-1">
                  <Slider
                    value={[volumes[layer.key]]}
                    min={0.05}
                    max={1}
                    step={0.05}
                    onValueChange={(v) => changeVolume(layer.key, v[0])}
                    aria-label={d.sounds.layerVolume(d.sounds.layers[layer.key])}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Volumen general + control de capas */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/70 p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Volume2 className="size-4 text-sage" aria-hidden="true" />
            {d.sounds.master}
          </span>
          <div className="w-40">
            <Slider
              value={[master]}
              min={0}
              max={1}
              step={0.05}
              onValueChange={(v) => {
                setMaster(v[0])
                engineRef.current?.setMasterVolume(v[0])
              }}
              aria-label={d.sounds.master}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {d.sounds.activeLayers(activeCount)}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {AUTO_STOP_OPTIONS.map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => {
                  setAutoStop(min)
                  if (min > 0 && activeCount > 0) armAutoStop()
                }}
                aria-pressed={autoStop === min}
                className={cn(
                  'h-8 rounded-full border px-3 text-xs font-medium transition-all',
                  autoStop === min
                    ? 'border-gold/60 bg-gold/10 text-gold'
                    : 'border-border/70 text-muted-foreground hover:text-foreground'
                )}
              >
                {min === 0 ? d.sounds.timerOff : `${min} ${d.timer.minutesUnit}`}
              </button>
            ))}
            {activeCount > 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={stopAll}
                className="h-8 rounded-full border-border/70 px-4 text-xs text-muted-foreground hover:text-foreground"
              >
                {d.sounds.stopAll}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
