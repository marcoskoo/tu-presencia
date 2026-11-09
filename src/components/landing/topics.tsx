'use client'

import * as React from 'react'
import {
  BarChart3,
  Clock,
  Eye,
  Flower2,
  Footprints,
  Heart,
  Moon,
  Sparkles,
  Wind,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'

type TopicKey = 'iniciar' | 'presente' | 'cuadrada' | 'caminando' | 'observador' | 'gratitud'

const TOPIC_META: {
  key: TopicKey
  icon: React.ElementType
  tint: string
  bg: string
}[] = [
  { key: 'iniciar', icon: Flower2, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'presente', icon: Eye, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'cuadrada', icon: Wind, tint: 'text-gold', bg: 'bg-gold/10' },
  { key: 'caminando', icon: Footprints, tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { key: 'observador', icon: Moon, tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { key: 'gratitud', icon: Heart, tint: 'text-gold', bg: 'bg-gold/10' },
]

function TopicDialog({ meta }: { meta: (typeof TOPIC_META)[number] }) {
  const { d } = useI18n()
  const [open, setOpen] = React.useState(false)
  const topic = d.topics.items[meta.key]

  const goToBreathing = () => {
    setOpen(false)
    // Espera a que Radix libere el bloqueo de scroll antes de desplazar
    window.setTimeout(() => {
      document
        .getElementById('respiracion')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-4 text-sm font-medium text-sage hover:bg-sage-soft/50 hover:text-sage"
        >
          {d.common.openGuide}
          <Sparkles className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto scroll-serene rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <div
            className={`mb-1 grid size-12 place-items-center rounded-2xl ${meta.bg}`}
          >
            <meta.icon className={`size-6 ${meta.tint}`} aria-hidden="true" />
          </div>
          <DialogTitle className="font-serif text-2xl font-medium">
            {topic.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {topic.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="size-3.5" aria-hidden="true" />
              {topic.level}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {topic.intro}
          </p>
          <div>
            <h4 className="font-serif text-lg font-semibold">
              {d.topics.stepsTitle}
            </h4>
            <ol className="mt-4 space-y-4">
              {topic.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full font-serif text-sm font-semibold ${meta.bg} ${meta.tint}`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <p
            className={`rounded-xl ${meta.bg} p-4 font-serif text-sm italic leading-relaxed ${meta.tint}`}
          >
            {topic.closing}
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col sm:items-stretch">
          <Button
            onClick={goToBreathing}
            className="rounded-full bg-sage font-medium text-primary-foreground hover:opacity-90"
          >
            <Wind className="size-4" aria-hidden="true" />
            {d.topics.practiceBreathing}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Topics() {
  const { d } = useI18n()

  return (
    <section
      id="temas"
      aria-label={d.topics.sectionLabel}
      className="scroll-mt-20 bg-secondary/40 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.topics.eyebrow}
          title={
            <>
              {d.topics.titleA}{' '}
              <em className="text-terracotta">{d.topics.titleB}</em>
            </>
          }
          description={d.topics.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_META.map((meta, i) => {
            const topic = d.topics.items[meta.key]
            return (
              <FadeIn key={meta.key} delay={(i % 3) * 0.1}>
                <Card className="flex h-full flex-col border-border/70 bg-card/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={`grid size-12 place-items-center rounded-2xl ${meta.bg}`}
                      >
                        <meta.icon
                          className={`size-6 ${meta.tint}`}
                          aria-hidden="true"
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-secondary font-normal text-muted-foreground"
                      >
                        {topic.duration} · {topic.level}
                      </Badge>
                    </div>
                    <h3 className="pt-3 font-serif text-xl font-medium leading-snug">
                      {topic.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {topic.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <TopicDialog meta={meta} />
                  </CardFooter>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
