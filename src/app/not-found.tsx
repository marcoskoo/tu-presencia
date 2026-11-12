'use client'

import Link from 'next/link'
import { Clock3, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EnsoMark } from '@/components/landing/enso-logo'
import { PAUSE_OPEN_EVENT } from '@/lib/events'
import { useI18n } from '@/lib/i18n/context'

/** 404 sereno: esta página también es impermanente */
export default function NotFound() {
  const { d } = useI18n()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <span className="text-sage/80" aria-hidden="true">
        <EnsoMark className="size-20 animate-breathe-soft" />
      </span>
      <p className="mt-8 font-serif text-6xl font-light tracking-widest text-muted-foreground/70">
        404
      </p>
      <h1 className="mt-4 max-w-md font-serif text-2xl font-medium leading-snug sm:text-3xl">
        {d.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {d.notFound.message}
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          asChild
          className="rounded-full bg-sage px-6 font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90"
        >
          <Link href="/">
            <Wind className="size-4" aria-hidden="true" />
            {d.notFound.back}
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            window.dispatchEvent(new CustomEvent(PAUSE_OPEN_EVENT))
          }
          className="rounded-full border-gold/40 bg-gold/10 px-6 font-medium text-gold hover:bg-gold/20 hover:text-gold"
        >
          <Clock3 className="size-4" aria-hidden="true" />
          {d.notFound.breathe}
        </Button>
      </div>
    </main>
  )
}
