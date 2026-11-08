'use client'

import * as React from 'react'
import { Loader2, MessageCircleHeart, RefreshCw, Send } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'

type Reflection = {
  id: string
  name: string
  text: string
  createdAt: string
}

const MAX_CHARS = 500

export function Reflections() {
  const { toast } = useToast()
  const [reflections, setReflections] = React.useState<Reflection[]>([])
  const [loading, setLoading] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)
  const [name, setName] = React.useState('')
  const [text, setText] = React.useState('')

  const loadReflections = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reflections', { cache: 'no-store' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setReflections(data.reflections ?? [])
    } catch {
      toast({
        title: 'No se pudieron cargar las reflexiones',
        description: 'Inténtalo de nuevo en unos instantes.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    loadReflections()
  }, [loadReflections])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      toast({
        title: 'Tu reflexión está vacía',
        description: 'Escribe unas palabras desde el corazón antes de enviar.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || undefined, text: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error')
      setReflections((prev) => [data.reflection, ...prev])
      setText('')
      setName('')
      toast({
        title: 'Gracias por compartir',
        description: 'Tu reflexión ya forma parte de este círculo de consciencia.',
      })
    } catch {
      toast({
        title: 'No se pudo enviar tu reflexión',
        description: 'Comprueba tu conexión e inténtalo de nuevo.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="comunidad"
      aria-label="Reflexiones de la comunidad"
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Comunidad despierta"
          title={
            <>
              Comparte tu <em className="text-sage">reflexión</em>
            </>
          }
          description="¿Qué te ha enseñado la práctica? ¿Qué momento de presencia recuerdas? Deja tus palabras aquí: alguien que camina despertando las necesita."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Formulario */}
          <FadeIn className="lg:order-1">
            <Card className="h-full border-border/70 bg-card/80 shadow-sm backdrop-blur">
              <CardContent className="p-7">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-sage-soft/70 dark:bg-sage-soft/40">
                    <MessageCircleHeart
                      className="size-5 text-sage"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium">
                      Tu voz en el círculo
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Se comparte con respeto, sin juicios ni consejos.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="reflection-name" className="text-sm">
                      Nombre <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <Input
                      id="reflection-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="¿Cómo te llamas?"
                      maxLength={40}
                      autoComplete="off"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <Label htmlFor="reflection-text" className="text-sm">
                        Tu reflexión
                      </Label>
                      <span
                        className={`text-xs tabular-nums ${
                          text.length >= MAX_CHARS
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                        }`}
                        aria-live="polite"
                      >
                        {text.length} / {MAX_CHARS}
                      </span>
                    </div>
                    <Textarea
                      id="reflection-text"
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                      placeholder="Hoy, en la pausa de la respiración, noté que…"
                      rows={6}
                      className="resize-none bg-background leading-relaxed"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-sage font-medium text-primary-foreground transition-all hover:opacity-90"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Enviando con calma…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" aria-hidden="true" />
                        Compartir mi reflexión
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Muro de reflexiones */}
          <FadeIn delay={0.12} className="lg:order-2">
            <Card className="h-full border-border/70 bg-card/80 shadow-sm backdrop-blur">
              <CardContent className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl font-medium">
                    Voces recientes
                    <span className="ml-2 align-middle text-xs font-normal text-muted-foreground">
                      ({reflections.length})
                    </span>
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={loadReflections}
                    aria-label="Actualizar las reflexiones"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="size-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="scroll-serene mt-6 max-h-[430px] flex-1 space-y-5 overflow-y-auto pr-2">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-10 rounded-full" />
                          <div className="space-y-1.5">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full rounded-xl" />
                      </div>
                    ))
                  ) : reflections.length === 0 ? (
                    <div className="grid h-full place-items-center py-14 text-center">
                      <div>
                        <MessageCircleHeart
                          className="mx-auto size-10 text-muted-foreground/50"
                          aria-hidden="true"
                        />
                        <p className="mt-4 max-w-xs font-serif text-base italic text-muted-foreground">
                          Todavía no hay voces. Sé la primera en dejar una
                          huella en este círculo.
                        </p>
                      </div>
                    </div>
                  ) : (
                    reflections.map((r) => (
                      <article
                        key={r.id}
                        className="rounded-2xl border border-border/60 bg-background/60 p-5"
                      >
                        <header className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback className="bg-sage-soft font-serif font-semibold text-sage dark:bg-sage-soft/50 dark:text-sage">
                              {r.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-serif text-sm font-semibold">
                              {r.name}
                            </p>
                            <time className="text-xs text-muted-foreground">
                              {new Date(r.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </time>
                          </div>
                        </header>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                          {r.text}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
