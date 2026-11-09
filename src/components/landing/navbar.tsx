'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sparkles, Sun, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EnsoMark } from '@/components/landing/enso-logo'

const NAV_LINKS = [
  { href: '#practicas', label: 'Prácticas' },
  { href: '#respiracion', label: 'Respiración' },
  { href: '#meditaciones', label: 'Meditaciones' },
  { href: '#temas', label: 'Temas' },
  { href: '#comunidad', label: 'Comunidad' },
]

export function Navbar() {
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="#inicio"
          className="group flex items-center gap-2.5"
          aria-label="Presencia AQUÍ y AHORA · inicio"
        >
          <span className="text-sage transition-transform duration-500 group-hover:rotate-45">
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
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              mounted && theme === 'dark'
                ? 'Activar modo amanecer'
                : 'Activar modo noche'
            }
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground hover:text-foreground"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-sage px-5 font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md sm:inline-flex"
          >
            <Link href="#respiracion">
              <Wind className="size-4" aria-hidden="true" />
              Respirar ahora
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="text-sage">
                    <EnsoMark className="size-5" />
                  </span>
                  AQUÍ y AHORA
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Navegación móvil"
                className="flex flex-col gap-1 px-4"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 rounded-full bg-sage font-medium text-primary-foreground"
                >
                  <Link href="#respiracion" onClick={() => setOpen(false)}>
                    <Sparkles className="size-4" aria-hidden="true" />
                    Respirar ahora
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
