'use client'

import * as React from 'react'
import {
  BarChart3,
  BedDouble,
  Bell,
  BookHeart,
  Footprints,
  Sparkles,
  Sunrise,
  Timer,
  Waves,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'
import { MeditationTimer } from '@/components/sanctuary/meditation-timer'
import { SoundMixer } from '@/components/sanctuary/sound-mixer'
import { WalkingTool } from '@/components/sanctuary/walking-tool'
import { NidraTool } from '@/components/sanctuary/nidra-tool'
import { MantraMala } from '@/components/sanctuary/mantra-mala'
import { GratitudeJournal } from '@/components/sanctuary/gratitude-journal'
import { Oracle } from '@/components/sanctuary/oracle'
import { Analytics } from '@/components/sanctuary/analytics'
import { Reminders } from '@/components/sanctuary/reminders'
import { cn } from '@/lib/utils'

type ToolKey =
  | 'timer'
  | 'sounds'
  | 'walking'
  | 'nidra'
  | 'mantra'
  | 'gratitude'
  | 'oracle'
  | 'analytics'
  | 'reminders'

const TOOLS: {
  key: ToolKey
  icon: React.ElementType
  tint: string
  bg: string
}[] = [
  { key: 'timer', icon: Timer, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'sounds', icon: Waves, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'walking', icon: Footprints, tint: 'text-gold', bg: 'bg-gold/10' },
  { key: 'nidra', icon: BedDouble, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'mantra', icon: Sparkles, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'gratitude', icon: BookHeart, tint: 'text-gold', bg: 'bg-gold/10' },
  { key: 'oracle', icon: Sunrise, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'analytics', icon: BarChart3, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'reminders', icon: Bell, tint: 'text-gold', bg: 'bg-gold/10' },
]

function ToolContent({ toolKey }: { toolKey: ToolKey }) {
  switch (toolKey) {
    case 'timer':
      return <MeditationTimer />
    case 'sounds':
      return <SoundMixer />
    case 'walking':
      return <WalkingTool />
    case 'nidra':
      return <NidraTool />
    case 'mantra':
      return <MantraMala />
    case 'gratitude':
      return <GratitudeJournal />
    case 'oracle':
      return <Oracle />
    case 'analytics':
      return <Analytics />
    case 'reminders':
      return <Reminders />
  }
}

export function Sanctuary() {
  const { d } = useI18n()
  const [openTool, setOpenTool] = React.useState<ToolKey | null>(null)

  const toolName = (key: ToolKey) => d.sanctuary[key].name
  const toolShort = (key: ToolKey) => d.sanctuary[key].short

  // Apertura por hash: #santuario-timer, #santuario-oraculo, #santuario-mantra…
  const toolFromHash = React.useCallback((hash: string): ToolKey | null => {
    if (!hash.startsWith('#santuario-')) return null
    const slug = hash.replace('#santuario-', '')
    const map: Record<string, ToolKey> = {
      timer: 'timer',
      sonidos: 'sounds',
      caminando: 'walking',
      nidra: 'nidra',
      mantras: 'mantra',
      gratitud: 'gratitude',
      oraculo: 'oracle',
      analitica: 'analytics',
      recordatorio: 'reminders',
      // también acepta el nombre en inglés
      sounds: 'sounds',
      walking: 'walking',
      mantra: 'mantra',
      gratitude: 'gratitude',
      oracle: 'oracle',
      analytics: 'analytics',
      reminders: 'reminders',
    }
    return map[slug] ?? null
  }, [])

  React.useEffect(() => {
    const sync = () => {
      const tool = toolFromHash(window.location.hash)
      if (tool) setOpenTool(tool)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [toolFromHash])

  const closeDialog = (isOpen: boolean) => {
    if (!isOpen) {
      setOpenTool(null)
      // Limpia el hash sin saltar
      if (window.location.hash.startsWith('#santuario-')) {
        history.replaceState(null, '', window.location.pathname + '#santuario')
      }
    }
  }

  return (
    <section
      id="santuario"
      aria-label={d.sanctuary.sectionLabel}
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.sanctuary.eyebrow}
          title={
            <>
              {d.sanctuary.titleA}{' '}
              <em className="text-terracotta">{d.sanctuary.titleB}</em>
            </>
          }
          description={d.sanctuary.description}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <FadeIn key={tool.key} delay={(i % 3) * 0.08}>
              <Card
                className={cn(
                  'group h-full border-border/70 bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-lg',
                  openTool === tool.key && 'border-sage'
                )}
              >
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div
                    className={`grid size-12 place-items-center rounded-2xl ${tool.bg}`}
                  >
                    <tool.icon className={`size-6 ${tool.tint}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold leading-snug">
                      {toolName(tool.key)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {toolShort(tool.key)}
                    </p>
                  </div>
                  <Button
                    onClick={() => setOpenTool(tool.key)}
                    variant="ghost"
                    className="w-full justify-between px-3 text-sm font-medium text-sage hover:bg-sage-soft/50 hover:text-sage"
                  >
                    {d.sanctuary.open(toolName(tool.key))}
                    <Sparkles className="size-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Mini-apps en diálogo */}
      <Dialog open={openTool !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto scroll-serene rounded-2xl">
          {openTool ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2.5 font-serif text-2xl font-medium">
                  {(() => {
                    const meta = TOOLS.find((t) => t.key === openTool)
                    if (!meta) return null
                    return (
                      <span className={`grid size-10 place-items-center rounded-xl ${meta.bg}`}>
                        <meta.icon className={`size-5 ${meta.tint}`} aria-hidden="true" />
                      </span>
                    )
                  })()}
                  {toolName(openTool)}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {toolShort(openTool)}
                </DialogDescription>
              </DialogHeader>
              <ToolContent toolKey={openTool} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
