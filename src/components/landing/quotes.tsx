'use client'

import * as React from 'react'
import { Download, Loader2 } from 'lucide-react'
import type { CarouselApi } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { FadeIn } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'
import { useToast } from '@/hooks/use-toast'

/** Índice determinista de la cita del día (0–364) */
function dailyIndex(len: number): number {
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return dayOfYear % len
}

export function Quotes() {
  const { d, formatDate } = useI18n()
  const { toast } = useToast()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [generating, setGenerating] = React.useState(false)

  const quotes = d.quotes.list
  const daily = quotes[dailyIndex(quotes.length)]

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

  /** Dibuja la frase del día en un canvas y la descarga como PNG */
  const downloadDaily = async () => {
    if (generating) return
    setGenerating(true)
    try {
      const W = 1080
      const H = 1350
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('canvas')

      // Fondo: degradado cálido tipo papel
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#f7f5f0')
      grad.addColorStop(0.55, '#efe9dd')
      grad.addColorStop(1, '#e6ddcd')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Halo suave sage
      const halo = ctx.createRadialGradient(W / 2, H * 0.42, 60, W / 2, H * 0.42, 520)
      halo.addColorStop(0, 'rgba(138, 160, 133, 0.22)')
      halo.addColorStop(1, 'rgba(138, 160, 133, 0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, W, H)

      // Ensō decorativo
      ctx.save()
      ctx.translate(W / 2, H * 0.42)
      ctx.rotate(-0.5)
      ctx.strokeStyle = 'rgba(122, 144, 117, 0.35)'
      ctx.lineWidth = 16
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(0, 0, 300, 0, Math.PI * 1.86)
      ctx.stroke()
      ctx.restore()

      // Texto de la cita (envuelto manualmente)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#3d3a33'
      ctx.font = 'italic 500 54px Georgia, "Times New Roman", serif'
      const maxWidth = W - 220
      const words = daily.text.split(' ')
      const lines: string[] = []
      let line = ''
      for (const word of words) {
        const test = line ? `${line} ${word}` : word
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line)
          line = word
        } else {
          line = test
        }
      }
      if (line) lines.push(line)

      const startY = H * 0.42 - (lines.length - 1) * 34
      lines.forEach((l, i) => {
        ctx.fillText(l, W / 2, startY + i * 68)
      })

      // Autor y rol
      ctx.font = '600 40px Georgia, serif'
      ctx.fillStyle = '#4a5d45'
      ctx.fillText(`— ${daily.author}`, W / 2, startY + lines.length * 68 + 60)
      ctx.font = '300 28px Helvetica, Arial, sans-serif'
      ctx.fillStyle = '#8a8577'
      ctx.fillText(daily.role.toUpperCase(), W / 2, startY + lines.length * 68 + 110)

      // Marca
      ctx.font = '300 26px Helvetica, Arial, sans-serif'
      ctx.fillStyle = '#8a8577'
      ctx.fillText(
        'AQUÍ y AHORA · ' + d.quotes.dailyCaption,
        W / 2,
        H - 150
      )
      ctx.font = '300 24px Helvetica, Arial, sans-serif'
      ctx.fillText(
        formatDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' }),
        W / 2,
        H - 108
      )

      // Descargar
      const link = document.createElement('a')
      link.download = `presencia-frase-${new Date().toISOString().slice(0, 10)}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      toast({
        title: d.premium.error,
        description: d.premium.errorHint,
        variant: 'destructive',
      })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <section
      id="citas"
      aria-label={d.quotes.sectionLabel}
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="animate-breathe-soft absolute left-1/4 top-8 size-72 rounded-full bg-sage-soft/50 blur-3xl dark:bg-sage-soft/30" />
        <div
          className="animate-breathe-soft absolute bottom-8 right-1/4 size-72 rounded-full bg-terracotta/10 blur-3xl"
          style={{ animationDelay: '-3s' }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-xs font-medium uppercase tracking-[0.32em] text-terracotta">
            {d.quotes.eyebrow}
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
              aria-label={d.quotes.carouselLabel}
            >
              <CarouselContent>
                {quotes.map((quote) => (
                  <CarouselItem key={quote.author + quote.text.slice(0, 12)}>
                    <figure className="px-4 text-center sm:px-10">
                      <blockquote className="font-serif text-2xl font-light italic leading-snug text-balance sm:text-3xl">
                        {quote.text}
                      </blockquote>
                      <figcaption className="mt-8">
                        <span
                          className="divider-om mx-auto block w-24"
                          aria-hidden="true"
                        />
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
              <CarouselPrevious
                className="-left-2 border-border/70 bg-background/70 text-muted-foreground backdrop-blur sm:-left-14"
                aria-label={d.quotes.prev}
              />
              <CarouselNext
                className="-right-2 border-border/70 bg-background/70 text-muted-foreground backdrop-blur sm:-right-14"
                aria-label={d.quotes.next}
              />
            </Carousel>

            <div
              className="mt-8 flex items-center justify-center gap-2"
              role="tablist"
              aria-label={d.quotes.selectLabel}
            >
              {quotes.map((quote, i) => (
                <button
                  key={quote.author + i}
                  type="button"
                  role="tab"
                  aria-selected={current === i}
                  aria-label={d.quotes.goTo(i, quote.author)}
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

          {/* Frase del día descargable */}
          <div className="mt-14 rounded-3xl border border-border/70 bg-card/80 p-7 text-center shadow-sm backdrop-blur sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              {d.quotes.dailyTitle}
            </p>
            <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
              «{daily.text}»
            </p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              — {daily.author} · {daily.role}
            </p>
            <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-muted-foreground">
              {d.quotes.dailyHint}
            </p>
            <Button
              onClick={downloadDaily}
              disabled={generating}
              className="mt-6 gap-2 rounded-full bg-sage px-7 font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              {generating ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {d.quotes.generating}
                </>
              ) : (
                <>
                  <Download className="size-4" aria-hidden="true" />
                  {d.quotes.dailyButton}
                </>
              )}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
