'use client'

import * as React from 'react'
import { Check, RotateCcw, Vibrate, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

type MantraKey = 'om' | 'mani' | 'soham' | 'maranatha' | 'la'
const MANTRA_KEYS: MantraKey[] = ['om', 'mani', 'soham', 'maranatha', 'la']

const MALA_SIZE = 108

/** Drone de Om: fundamental 136,1 Hz (afinación clásica del Om) + quinta */
class OmDrone {
  private ctx: AudioContext | null = null
  private gain: GainNode | null = null
  private oscs: OscillatorNode[] = []

  start(volume = 0.12) {
    if (this.ctx) return
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AC()
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.gain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.8)
    this.gain.connect(this.ctx.destination)

    const freqs: [number, number][] = [
      [136.1, 1],
      [204.15, 0.4],
      [272.2, 0.18],
    ]
    for (const [freq, amp] of freqs) {
      const osc = this.ctx.createOscillator()
      const oscGain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      oscGain.gain.value = amp
      // Batido lento para que respire
      const lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = 0.1 + Math.random() * 0.08
      lfoGain.gain.value = amp * 0.25
      lfo.connect(lfoGain)
      lfoGain.connect(oscGain.gain)
      osc.connect(oscGain)
      oscGain.connect(this.gain)
      osc.start()
      lfo.start()
      this.oscs.push(osc, lfo)
    }
  }

  stop() {
    if (!this.ctx || !this.gain) return
    const ctx = this.ctx
    this.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.5)
    window.setTimeout(() => {
      this.oscs.forEach((o) => o.stop())
      void ctx.close()
    }, 1200)
    this.ctx = null
    this.gain = null
    this.oscs = []
  }
}

export function MantraMala() {
  const { d } = useI18n()
  const { toast } = useToast()
  const [mantra, setMantra] = React.useState<MantraKey>('om')
  const [count, setCount] = React.useState(0)
  const [rounds, setRounds] = React.useState(0)
  const [omOn, setOmOn] = React.useState(false)
  const [vibrateOn, setVibrateOn] = React.useState(true)
  const droneRef = React.useRef<OmDrone | null>(null)

  React.useEffect(() => {
    return () => droneRef.current?.stop()
  }, [])

  const advance = React.useCallback(() => {
    setCount((prev) => {
      const next = prev + 1
      if (vibrateOn && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(next % 27 === 0 ? 60 : 18)
      }
      if (next >= MALA_SIZE) {
        const newRounds = rounds + 1
        setRounds(newRounds)
        logPractice({ type: 'mantra', minutes: MALA_SIZE / 60 })
        toast({
          title: d.mantra.roundComplete,
          description: d.mantra.logged(newRounds),
        })
        return 0
      }
      return next
    })
  }, [vibrateOn, rounds, toast, d.mantra])

  // Barra espaciadora para contar
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target as HTMLElement)?.closest('input, textarea, button')) {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  const toggleOm = () => {
    if (omOn) {
      droneRef.current?.stop()
      droneRef.current = null
      setOmOn(false)
    } else {
      droneRef.current = new OmDrone()
      droneRef.current.start()
      setOmOn(true)
    }
  }

  const restart = () => {
    setCount(0)
  }

  const progress = count / MALA_SIZE
  const currentMantra = d.mantra.mantras[mantra]
  const beadsLeft = MALA_SIZE - count

  return (
    <div className="space-y-6">
      {/* Selector de mantra */}
      <div>
        <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {d.mantra.chooseMantra}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {MANTRA_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMantra(key)}
              aria-pressed={mantra === key}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                mantra === key
                  ? 'border-sage bg-sage-soft/80 text-foreground shadow-sm dark:bg-sage-soft/50'
                  : 'border-border/70 bg-card/70 text-muted-foreground hover:text-foreground'
              )}
            >
              {d.mantra.mantras[key].name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center font-serif text-xl italic text-sage">
          {currentMantra.text}
        </p>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {currentMantra.meaning}
        </p>
      </div>

      {/* Mala */}
      <div className="flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={advance}
          aria-label={`${d.mantra.count}: ${count + 1}`}
          className="group relative grid size-56 place-items-center rounded-full outline-none transition-transform active:scale-95"
        >
          {/* Anillo de progreso (mala visual) */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="100" cy="100" r="92" fill="none" stroke="var(--border)" strokeWidth="6" />
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="var(--sage)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 92}
              strokeDashoffset={2 * Math.PI * 92 * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.25s ease' }}
            />
          </svg>

          {/* Cuentas decorativas */}
          <span className="absolute inset-6 rounded-full border border-dashed border-sage/40" aria-hidden="true" />

          <span className="relative z-10 flex flex-col items-center">
            <span className="font-serif text-6xl font-light tabular-nums text-ink">
              {count === 0 ? '·' : count}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {d.mantra.of}
            </span>
            {count > 0 ? (
              <span className="mt-2 flex items-center gap-1 text-[10px] font-medium text-sage">
                <Check className="size-3" aria-hidden="true" />
                {beadsLeft}
              </span>
            ) : null}
          </span>
        </button>

        <p className="max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
          {d.mantra.beadHint}
        </p>

        <dl className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <dt>{d.mantra.round}</dt>
            <dd className="font-serif text-lg font-semibold text-foreground tabular-nums">
              {rounds}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={restart}
            className="gap-2 rounded-full border-border/70 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            {d.mantra.restart}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleOm}
            aria-pressed={omOn}
            title={d.mantra.omHint}
            className={cn(
              'gap-2 rounded-full transition-colors',
              omOn
                ? 'border-gold/60 bg-gold/10 text-gold hover:text-gold'
                : 'border-border/70 text-muted-foreground hover:text-foreground'
            )}
          >
            {omOn ? (
              <Volume2 className="size-4" aria-hidden="true" />
            ) : (
              <VolumeX className="size-4" aria-hidden="true" />
            )}
            {d.mantra.omToggle}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVibrateOn((v) => !v)}
            aria-pressed={vibrateOn}
            className={cn(
              'gap-2 rounded-full transition-colors',
              vibrateOn
                ? 'border-sage/60 bg-sage-soft/70 text-sage dark:bg-sage-soft/40'
                : 'border-border/70 text-muted-foreground hover:text-foreground'
            )}
          >
            <Vibrate className="size-4" aria-hidden="true" />
            {d.mantra.vibration}
          </Button>
        </div>
      </div>
    </div>
  )
}
