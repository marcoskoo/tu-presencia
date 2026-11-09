'use client'

import * as React from 'react'
import { Check, Crown, Loader2, ShieldCheck, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'
import { useI18n } from '@/lib/i18n/context'
import { setPremium, usePremium } from '@/lib/premium'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function Premium() {
  const { d } = useI18n()
  const { toast } = useToast()
  const premium = usePremium()
  const [loading, setLoading] = React.useState(false)
  const [demoAvailable, setDemoAvailable] = React.useState(false)

  // Verificación de pago tras volver de Stripe
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') !== 'success') return

    const sessionId = params.get('session_id')
    if (!sessionId) return

    fetch('/api/stripe/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setPremium(true)
          toast({ title: d.premium.successToast })
        }
      })
      .catch(() => {})
      .finally(() => {
        // Limpiar la URL sin recargar
        window.history.replaceState(null, '', window.location.pathname + '#premium')
      })
  }, [d.premium.successToast, toast])

  const startCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
        return
      }
      if (data.demo) {
        setDemoAvailable(true)
        toast({ title: d.premium.demoTitle, description: d.premium.demoHint })
      } else {
        throw new Error(data.error ?? 'error')
      }
    } catch {
      toast({
        title: d.premium.error,
        description: d.premium.errorHint,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleDemo = () => {
    if (premium) {
      setPremium(false)
      toast({ title: d.premium.deactivated })
    } else {
      setPremium(true)
      toast({ title: d.premium.activated })
    }
  }

  return (
    <section
      id="premium"
      aria-label={d.premium.eyebrow}
      className="scroll-mt-20 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={d.premium.eyebrow}
          title={
            <>
              {d.premium.titleA}
              <em className="text-gold">{d.premium.titleB}</em>
            </>
          }
          description={d.premium.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Círculo abierto (gratis) */}
          <FadeIn>
            <Card className="h-full border-border/70 bg-card/80 shadow-sm backdrop-blur">
              <CardContent className="flex h-full flex-col p-7 sm:p-8">
                <h3 className="font-serif text-2xl font-medium">{d.premium.freeName}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.premium.freeDesc}</p>
                <p className="mt-5 font-serif text-4xl font-light">{d.premium.freePrice}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {d.premium.freeFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  disabled
                  className="mt-7 rounded-full border-sage/40 text-sage"
                >
                  {d.premium.freeCta}
                </Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Presencia+ */}
          <FadeIn delay={0.12}>
            <Card className="relative h-full overflow-hidden border-gold/50 bg-card/90 shadow-lg backdrop-blur">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gold/10 blur-3xl"
                aria-hidden="true"
              />
              <CardContent className="relative flex h-full flex-col p-7 sm:p-8">
                {premium ? (
                  <Badge className="w-fit gap-1.5 rounded-full bg-gold/15 font-medium text-gold hover:bg-gold/15">
                    <Crown className="size-3.5" aria-hidden="true" />
                    {d.premium.activeBadge}
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="w-fit gap-1.5 rounded-full bg-gold/10 font-medium text-gold"
                  >
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Presencia+
                  </Badge>
                )}
                <h3 className="mt-4 font-serif text-2xl font-medium">{d.premium.plusName}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.premium.plusDesc}</p>
                <p className="mt-5 font-serif text-4xl font-light">{d.premium.plusPrice}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {d.premium.plusFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {premium ? (
                  <Button
                    variant="outline"
                    onClick={toggleDemo}
                    className="mt-7 rounded-full border-gold/50 text-gold hover:bg-gold/10 hover:text-gold"
                  >
                    {d.premium.demoOff}
                  </Button>
                ) : (
                  <Button
                    onClick={startCheckout}
                    disabled={loading}
                    className="mt-7 gap-2 rounded-full bg-gold px-7 font-medium text-primary-foreground shadow-md shadow-gold/20 transition-all hover:opacity-90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        {d.premium.processing}
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" aria-hidden="true" />
                        {d.premium.plusCta}
                      </>
                    )}
                  </Button>
                )}

                {(demoAvailable || premium) && !loading ? (
                  <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                    {premium ? d.premium.demoActive : d.premium.demoHint}
                    {!premium ? (
                      <>
                        {' '}
                        <button
                          type="button"
                          onClick={toggleDemo}
                          className="font-medium text-gold underline underline-offset-2"
                        >
                          {d.premium.demoCta}
                        </button>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
