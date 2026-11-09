'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Flower2, Wind } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'

const ICONS = [Flower2, Eye, Wind]
const TINTS = [
  { tint: 'text-sage', bg: 'bg-sage-soft/70 dark:bg-sage-soft/40' },
  { tint: 'text-terracotta', bg: 'bg-terracotta/10' },
  { tint: 'text-gold', bg: 'bg-gold/10' },
]

export function Practices() {
  const { d } = useI18n()

  return (
    <section
      id="practicas"
      aria-label={d.nav.practices}
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.practices.eyebrow}
          title={
            <>
              {d.practices.titleA}{' '}
              <em className="text-sage">{d.practices.titleB}</em>
            </>
          }
          description={d.practices.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {d.practices.cards.map((practice, i) => {
            const Icon = ICONS[i] ?? Flower2
            return (
              <FadeIn key={practice.title} delay={i * 0.12}>
                <Card className="group h-full border-border/70 bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-sage/50 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-7">
                    <div
                      className={`grid size-14 place-items-center rounded-2xl ${TINTS[i]?.bg ?? TINTS[0].bg}`}
                    >
                      <Icon
                        className={`size-7 ${TINTS[i]?.tint ?? TINTS[0].tint}`}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-medium">
                      {practice.title}
                      {practice.subtitle ? (
                        <span className="mt-1 block text-sm font-normal uppercase tracking-[0.24em] text-muted-foreground">
                          {practice.subtitle}
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {practice.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {practice.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2.5 text-sm text-foreground/85"
                        >
                          <span
                            className={`size-1.5 rounded-full ${(TINTS[i]?.tint ?? TINTS[0].tint).replace('text-', 'bg-')}`}
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p
                      className={`mt-6 border-t border-border/60 pt-4 font-serif text-sm italic leading-relaxed ${TINTS[i]?.tint ?? TINTS[0].tint}`}
                    >
                      {practice.quote}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn className="mt-12 text-center" delay={0.15}>
          <Link
            href="#temas"
            className="inline-flex items-center gap-2 text-sm font-medium text-sage underline-offset-4 transition-colors hover:underline"
          >
            {d.practices.discoverAll}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
