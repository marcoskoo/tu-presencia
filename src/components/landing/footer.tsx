import Link from 'next/link'
import { Heart } from 'lucide-react'
import { EnsoMark } from '@/components/landing/enso-logo'

const EXPLORE_LINKS = [
  { href: '#practicas', label: 'Prácticas' },
  { href: '#respiracion', label: 'Respiración guiada' },
  { href: '#meditaciones', label: 'Meditaciones con audio' },
  { href: '#temas', label: 'Temas' },
  { href: '#comunidad', label: 'Comunidad' },
]

const PRACTICE_LINKS = [
  { href: '#temas', label: 'Meditación para comenzar' },
  { href: '#temas', label: 'Presencia consciente' },
  { href: '#respiracion', label: 'Respiración cuadrada' },
  { href: '#meditaciones', label: 'Calma profunda para dormir' },
  { href: '#meditaciones', label: 'Pausa de un minuto' },
]

export function Footer() {
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
                  espacio de consciencia
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Un espacio abierto para compartir prácticas de meditación,
              presencia consciente y respiración. La vida sucede ahora: el
              resto, solo lo recordamos.
            </p>
          </div>

          <nav aria-label="Explorar">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Explorar
            </h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
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

          <nav aria-label="Prácticas">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Prácticas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRACTICE_LINKS.map((link) => (
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
          <p className="text-xs text-muted-foreground">
            © 2026 Presencia AQUÍ y AHORA · Un espacio para compartir
            espiritualidad
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Hecho con
            <Heart className="size-3.5 fill-terracotta text-terracotta" aria-hidden="true" />
            y presencia
          </p>
        </div>
      </div>
    </footer>
  )
}
