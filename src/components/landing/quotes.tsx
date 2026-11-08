'use client'

import * as React from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { FadeIn } from '@/components/landing/section-header'

const QUOTES = [
  {
    text: 'La vida está disponible solo en el momento presente.',
    author: 'Thich Nhat Hanh',
    role: 'Maestro zen y poeta de la paz',
  },
  {
    text: 'Date cuenta profundamente de que el momento presente es lo único que tienes. Haz del ahora el foco principal de tu vida.',
    author: 'Eckhart Tolle',
    role: 'Autor de «El poder del ahora»',
  },
  {
    text: 'La naturaleza no tiene prisa, y sin embargo todo se realiza.',
    author: 'Lao Tse',
    role: 'Tao Te Ching',
  },
  {
    text: 'Ayer era inteligente, quería cambiar el mundo. Hoy soy sabio, me estoy cambiando a mí mismo.',
    author: 'Rumi',
    role: 'Poeta sufí',
  },
  {
    text: 'Tu propia autorrealización es el mayor servicio que puedes prestar al mundo.',
    author: 'Ramana Maharshi',
    role: 'Sabio de Arunachala',
  },
]

export function Quotes() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Avance sereno automático, una cita cada 7 segundos
  React.useEffect(() => {
    if (!api) return
    const id = setInterval(() => api.scrollNext(), 7000)
    return () => clearInterval(id)
  }, [api])

  return (
    <section
      aria-label="Citas que inspiran presencia"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="animate-breathe-soft absolute left-1/4 top-8 size-72 rounded-full bg-sage-soft/50 blur-3xl dark:bg-sage-soft/30" />
        <div className="animate-breathe-soft absolute bottom-8 right-1/4 size-72 rounded-full bg-terracotta/10 blur-3xl" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-xs font-medium uppercase tracking-[0.32em] text-terracotta">
            Voces que iluminan
          </p>

          <div className="relative mt-10">
            <span
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-serif text-[7rem] leading-none text-sage/20"
              aria-hidden="true"
            >
              “
            </span>
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              aria-label="Carrusel de citas espirituales"
            >
              <CarouselContent>
                {QUOTES.map((quote) => (
                  <CarouselItem key={quote.author}>
                    <figure className="px-4 text-center sm:px-10">
                      <blockquote className="font-serif text-2xl font-light italic leading-snug text-balance sm:text-3xl">
                        {quote.text}
                      </blockquote>
                      <figcaption className="mt-8">
                        <span className="divider-om mx-auto block w-24" aria-hidden="true" />
                        <cite className="mt-4 block font-serif text-base font-semibold not-italic">
                          {quote.author}
                        </cite>
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {quote.role}
                        </span>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 border-border/70 bg-background/70 text-muted-foreground backdrop-blur sm:-left-14" aria-label="Cita anterior" />
              <CarouselNext className="-right-2 border-border/70 bg-background/70 text-muted-foreground backdrop-blur sm:-right-14" aria-label="Cita siguiente" />
            </Carousel>

            <div
              className="mt-8 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Seleccionar cita"
            >
              {QUOTES.map((quote, i) => (
                <button
                  key={quote.author}
                  type="button"
                  role="tab"
                  aria-selected={current === i}
                  aria-label={`Ir a la cita ${i + 1}: ${quote.author}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === i
                      ? 'w-8 bg-sage'
                      : 'w-2 bg-border hover:bg-sage/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
