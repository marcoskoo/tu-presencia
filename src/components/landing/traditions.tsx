'use client'

import * as React from 'react'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'
import { PAUSE_OPEN_EVENT } from '@/components/landing/navbar'
import { cn } from '@/lib/utils'

type TraditionKey =
  | 'budista'
  | 'cristiana'
  | 'sufi'
  | 'vedanta'
  | 'taoista'
  | 'abierta'

const TRADITIONS: {
  key: TraditionKey
  glyph: string
  tint: string
  bg: string
}[] = [
  { key: 'budista', glyph: '☸', tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'cristiana', glyph: '✝', tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'sufi', glyph: '۞', tint: 'text-gold', bg: 'bg-gold/10' },
  { key: 'vedanta', glyph: 'ॐ', tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'taoista', glyph: '☯', tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'abierta', glyph: '〇', tint: 'text-gold', bg: 'bg-gold/10' },
]

/** Destino de cada práctica: ancla de sección, mini-app del santuario o pausa global */
const TOOL_TARGETS: Record<string, string> = {
  breathing: '#respiracion',
  meditations: '#meditaciones',
  quotes: '#citas',
  topics: '#temas',
  timer: '#santuario-timer',
  walking: '#santuario-caminando',
  mantra: '#santuario-mantras',
  sounds: '#santuario-sonidos',
  gratitude: '#santuario-gratitud',
  nidra: '#santuario-nidra',
  pause: 'event:pause',
}

export function Traditions() {
  const { d } = useI18n()
  const [active, setActive] = React.useState<TraditionKey>('budista')

  const current = TRADITIONS.find((t) => t.key === active) ?? TRADITIONS[0]
  const tradition = d.traditions.items[current.key]

  const openPractice = (tool: string) => {
    const target = TOOL_TARGETS[tool] ?? '#santuario'
    if (target === 'event:pause') {
      window.dispatchEvent(new CustomEvent(PAUSE_OPEN_EVENT))
      return
    }
    // Navegar al destino (los hash de santuario abren la mini-app)
    document.getElementById(target.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + target)
    // Dispara la apertura por hash manualmente (hashchange no salta con replaceState)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  return (
    <section
      id="tradiciones"
      aria-label={d.traditions.eyebrow}
      className="scroll-mt-20 bg-secondary/40 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.traditions.eyebrow}
          title={
            <>
              {d.traditions.titleA}{' '}
              <em className="text-sage">{d.traditions.titleB}</em>
            </>
          }
          description={d.traditions.description}
        />

        {/* Selector de tradición */}
        <FadeIn delay={0.1}>
          <div
            role="tablist"
            aria-label={d.traditions.eyebrow}
            className="mt-12 flex flex-wrap justify-center gap-2.5"
          >
            {TRADITIONS.map((t) => {
              const isActive = active === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t.key)}
                  className={cn(
                    'flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'border-sage bg-sage text-primary-foreground shadow-md'
                      : 'border-border/70 bg-card/70 text-muted-foreground hover:border-sage/50 hover:text-foreground'
                  )}
                >
                  <span aria-hidden="true" className={isActive ? '' : t.tint}>
                    {t.glyph}
                  </span>
                  {d.traditions.items[t.key].name}
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Panel de la tradición */}
        <FadeIn delay={0.15}>
          <Card className="mt-10 border-border/70 bg-card/90 shadow-sm backdrop-blur">
            <CardContent className="p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <span
                  className={`grid size-14 shrink-0 place-items-center rounded-2xl font-serif text-2xl ${current.bg} ${current.tint}`}
                  aria-hidden="true"
                >
                  {current.glyph}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                    {tradition.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {tradition.essence}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {tradition.practices.map((practice) => (
                  <div
                    key={practice.name}
                    className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/60 p-5 transition-colors hover:border-sage/40"
                  >
                    <h4 className="font-serif text-lg font-semibold leading-snug">
                      {practice.name}
                    </h4>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {practice.description}
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => openPractice(practice.tool)}
                      className="mt-4 w-full justify-between px-3 text-sm font-medium text-sage hover:bg-sage-soft/50 hover:text-sage"
                    >
                      {d.common.practiceNow}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Nota sobre la pausa */}
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <Clock3 className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
            {d.pause.title}: {d.pause.phase1.toLowerCase()} · {d.pause.phase2.toLowerCase()} ·{' '}
            {d.pause.phase3.toLowerCase()}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
