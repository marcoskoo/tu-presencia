'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Flower2, Wind } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'

const PRACTICES = [
  {
    icon: Flower2,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
    title: 'Meditación',
    description:
      'El arte de aquietar la mente y habitar el silencio que ya eres. Guías paso a paso para asentar la atención, sin exigencias ni prisa.',
    points: [
      'Postura y anclaje corporal',
      'Atención a la respiración',
      'Amable retorno al presente',
    ],
    quote: '«Aprende a estar quieto y descubre quién eres en el silencio.»',
  },
  {
    icon: Eye,
    tint: 'text-terracotta',
    bg: 'bg-terracotta/10',
    title: 'Presencia consciente',
    subtitle: 'AQUÍ y AHORA',
    description:
      'Despertar del piloto automático. La práctica de notar este instante mientras sucede: los sonidos, el cuerpo, la vida tal como es.',
    points: [
      'Observación sin juicio',
      'Desapego del ruido mental',
      'Presencia en lo cotidiano',
    ],
    quote: '«El presente es el único tiempo que existe. Todo lo demás es recuerdo o imaginación.»',
  },
  {
    icon: Wind,
    tint: 'text-gold',
    bg: 'bg-gold/10',
    title: 'Respiración consciente',
    description:
      'El puente más directo entre cuerpo y mente. Técnicas guiadas de respiración para calmarte, centrarte y volver a casa en cualquier momento.',
    points: [
      'Respiración cuadrada',
      'Respiración coherente',
      'Soplo relajante 4·7·8',
    ],
    quote: '«Donde va la respiración, va la atención. Donde va la atención, va la vida.»',
  },
]

export function Practices() {
  return (
    <section
      id="practicas"
      aria-label="Prácticas principales"
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Las tres puertas"
          title={
            <>
              Caminos hacia el <em className="text-sage">presente</em>
            </>
          }
          description="No hace falta retirarse a una montaña. Estas tres prácticas se cultivan aquí, entre el café de la mañana y el ruido del mundo, para recordar lo que nunca dejaste de ser."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRACTICES.map((practice, i) => (
            <FadeIn key={practice.title} delay={i * 0.12}>
              <Card className="group h-full border-border/70 bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-sage/50 hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-7">
                  <div
                    className={`grid size-14 place-items-center rounded-2xl ${practice.bg}`}
                  >
                    <practice.icon
                      className={`size-7 ${practice.tint}`}
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
                          className={`size-1.5 rounded-full ${practice.tint.replace('text-', 'bg-')}`}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-6 border-t border-border/60 pt-4 font-serif text-sm italic leading-relaxed ${practice.tint}`}
                  >
                    {practice.quote}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center" delay={0.15}>
          <Link
            href="#temas"
            className="inline-flex items-center gap-2 text-sm font-medium text-sage underline-offset-4 transition-colors hover:underline"
          >
            Descubrir todos los temas
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
