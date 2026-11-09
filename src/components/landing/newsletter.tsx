'use client'

import * as React from 'react'
import { Loader2, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { FadeIn } from '@/components/landing/section-header'
import { EnsoMark } from '@/components/landing/enso-logo'
import { useI18n } from '@/lib/i18n/context'

export function Newsletter() {
  const { d } = useI18n()
  const { toast } = useToast()
  const [email, setEmail] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Error')
      toast({
        title: d.newsletter.toastOk,
        description: data.message,
      })
      setEmail('')
    } catch (err) {
      toast({
        title: d.newsletter.toastError,
        description:
          err instanceof Error && err.message !== 'Error'
            ? err.message
            : d.newsletter.toastErrorHint,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="circulo"
      aria-label={d.newsletter.sectionLabel}
      className="scroll-mt-20 pb-24 pt-4 sm:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-sage px-6 py-16 text-center text-primary-foreground shadow-xl sm:px-12 sm:py-20">
            {/* Marca de agua enso */}
            <EnsoMark
              className="pointer-events-none absolute -right-10 -top-10 size-56 text-primary-foreground/10"
              
            />
            <EnsoMark
              className="pointer-events-none absolute -bottom-12 -left-12 size-64 text-primary-foreground/10"
            />
            <div
              className="animate-breathe-soft pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary-foreground/80">
                {d.newsletter.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-balance sm:text-4xl">
                {d.newsletter.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                {d.newsletter.description}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/60"
                    aria-hidden="true"
                  />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={d.newsletter.placeholder}
                    aria-label={d.newsletter.emailLabel}
                    className="h-12 rounded-full border-white/25 bg-white/15 pl-11 text-primary-foreground placeholder:text-primary-foreground/55 backdrop-blur focus-visible:ring-white/60"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full bg-primary-foreground px-7 font-medium text-sage shadow-md transition-all hover:bg-white hover:shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      {d.newsletter.sending}
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      {d.newsletter.cta}
                    </>
                  )}
                </Button>
              </form>
              <p className="mt-4 text-xs text-primary-foreground/70">
                {d.newsletter.calm}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
