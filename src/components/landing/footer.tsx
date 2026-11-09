'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { EnsoMark } from '@/components/landing/enso-logo'
import { useI18n } from '@/lib/i18n/context'

export function Footer() {
  const { d } = useI18n()

  const exploreLinks = [
    { href: '#practicas', label: d.footer.links.practices },
    { href: '#respiracion', label: d.footer.links.breathing },
    { href: '#meditaciones', label: d.footer.links.meditations },
    { href: '#santuario', label: d.footer.links.sanctuary },
    { href: '#tradiciones', label: d.footer.links.traditions },
    { href: '#temas', label: d.footer.links.topics },
    { href: '#comunidad', label: d.footer.links.community },
  ]

  const practiceLinks = [
    { href: '#temas', label: d.footer.practiceLinks.start },
    { href: '#practicas', label: d.footer.practiceLinks.presence },
    { href: '#respiracion', label: d.footer.practiceLinks.square },
    { href: '#meditaciones', label: d.footer.practiceLinks.sleep },
    { href: '#meditaciones', label: d.footer.practiceLinks.pause },
    { href: '#santuario', label: d.footer.practiceLinks.walking },
  ]

  return (
    <footer className="mt-auto border-t border-border/70 bg-secondary/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-sage">
                <EnsoMark className="size-7" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-wide">
                  AQUÍ <span className="text-gold">y</span> AHORA
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {d.footer.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {d.footer.about}
            </p>
          </div>

          <nav aria-label={d.footer.explore}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {d.footer.explore}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={d.footer.practicesCol}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {d.footer.practicesCol}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {practiceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">{d.footer.copyright}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {d.footer.madeWith}
            <Heart className="size-3.5 fill-terracotta text-terracotta" aria-hidden="true" />
            {d.footer.andPresence}
          </p>
        </div>
      </div>
    </footer>
  )
}
