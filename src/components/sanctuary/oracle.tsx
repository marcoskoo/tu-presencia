'use client'

import * as React from 'react'
import { Copy, Sparkles, Sunrise } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'
import { cn } from '@/lib/utils'

/**
 * Oráculo contemplativo:
 * - La "carta del día" es determinista (día del año + seed del navegador)
 * - "Robar otra carta" elige al azar del mazo completo
 */
function dayIndex(): number {
  const now = new Date()
  return Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
}

function seededIndex(seed: number, len: number): number {
  return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1 * len | 0
}

export function Oracle() {
  const { d } = useI18n()
  const { toast } = useToast()
  const cards = d.oracle.cards
  const [cardIndex, setCardIndex] = React.useState<number | null>(null)
  const [isDaily, setIsDaily] = React.useState(true)
  const [shuffling, setShuffling] = React.useState(false)
  const [revealed, setRevealed] = React.useState(false)

  // Semilla por navegador para que la carta del día "sea tuya"
  const [seed] = React.useState(() => {
    try {
      const s = window.localStorage.getItem('presencia-seed')
      if (s) return parseInt(s, 10)
      const value = Math.floor(Math.random() * 100000)
      window.localStorage.setItem('presencia-seed', String(value))
      return value
    } catch {
      return 1
    }
  })

  const drawDaily = React.useCallback(() => {
    setCardIndex(seededIndex(dayIndex() + seed, cards.length))
    setIsDaily(true)
    setRevealed(false)
  }, [seed, cards.length])

  React.useEffect(() => {
    drawDaily()
  }, [drawDaily])

  const drawAnother = () => {
    if (shuffling) return
    setShuffling(true)
    setRevealed(false)
    window.setTimeout(() => {
      let next = Math.floor(Math.random() * cards.length)
      if (next === cardIndex) next = (next + 1) % cards.length
      setCardIndex(next)
      setIsDaily(false)
      setShuffling(false)
    }, 700)
  }

  const card = cardIndex !== null ? cards[cardIndex] : null

  const copyMessage = () => {
    if (!card) return
    const message = `${card.name} — ${d.oracle.yourCard}\n\n${card.message}\n\n${d.oracle.practiceTitle}: ${card.practice}\n\n— Presencia AQUÍ y AHORA`
    navigator.clipboard?.writeText(message).then(
      () => {
        toast({ title: d.oracle.copied })
        logPractice({ type: 'oracle', minutes: 0 })
      },
      () => {}
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        {d.oracle.subtitle}
      </p>

      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
        {/* La carta */}
        <div className="mx-auto w-56">
          <button
            type="button"
            onClick={() => {
              if (!revealed) {
                setRevealed(true)
                logPractice({ type: 'oracle', minutes: 0 })
              }
            }}
            disabled={!card || shuffling}
            aria-label={d.oracle.flip}
            className="group relative aspect-[3/4.4] w-full [perspective:1000px]"
          >
            <span
              className={cn(
                'absolute inset-0 rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]',
                revealed ? '[transform:rotateY(180deg)]' : '',
                shuffling && 'animate-pulse'
              )}
            >
              {/* Dorso */}
              <span className="absolute inset-0 grid place-items-center rounded-2xl border border-gold/40 bg-gradient-to-br from-sand via-sage-soft to-sand shadow-lg [backface-visibility:hidden] dark:from-sage-soft/50 dark:via-sand/60 dark:to-sage-soft/30">
                <span className="flex flex-col items-center gap-2 text-gold">
                  <Sunrise className="size-10" aria-hidden="true" />
                  <span className="font-serif text-sm uppercase tracking-[0.3em]">
                    AQUÍ y AHORA
                  </span>
                </span>
              </span>
              {/* Cara */}
              <span className="absolute inset-0 grid place-items-center rounded-2xl border border-sage/50 bg-card p-5 text-center shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="flex flex-col items-center gap-3">
                  <Sparkles className="size-7 text-gold" aria-hidden="true" />
                  <span className="font-serif text-2xl font-semibold leading-tight">
                    {card?.name}
                  </span>
                  <span className="divider-om w-16" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {d.oracle.yourCard}
                  </span>
                </span>
              </span>
            </span>
          </button>

          {isDaily && cardIndex !== null ? (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {d.oracle.sameDayNote}
            </p>
          ) : null}
        </div>

        {/* El mensaje */}
        <div className="space-y-4">
          {card && revealed ? (
            <>
              <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                  {d.oracle.messageTitle}
                </p>
                <p className="mt-2 font-serif text-lg italic leading-relaxed text-foreground/90">
                  {card.message}
                </p>
              </div>
              <div className="rounded-2xl border border-sage/40 bg-sage-soft/50 p-5 dark:bg-sage-soft/25">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                  {d.oracle.practiceTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {card.practice}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={drawAnother}
                  className="gap-2 rounded-full bg-sage px-6 font-medium text-primary-foreground hover:opacity-90"
                >
                  <Sparkles className="size-4" aria-hidden="true" />
                  {shuffling ? d.oracle.shuffling : d.oracle.drawAnother}
                </Button>
                <Button
                  variant="outline"
                  onClick={copyMessage}
                  className="gap-2 rounded-full border-border/70 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="size-4" aria-hidden="true" />
                  {d.oracle.copy}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/80 bg-card/50 p-8 text-center">
              <Sunrise className="size-10 animate-breathe-soft text-gold" aria-hidden="true" />
              <p className="max-w-56 font-serif text-lg italic text-muted-foreground">
                {isDaily ? d.oracle.drawDaily : d.oracle.yourCard}
              </p>
              <Button
                onClick={() => {
                  setRevealed(true)
                  logPractice({ type: 'oracle', minutes: 0 })
                }}
                className="rounded-full bg-sage px-6 font-medium text-primary-foreground hover:opacity-90"
              >
                {d.oracle.flip}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
