'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Check, Clock3, Download, Languages, Menu, Moon, Search, Sparkles, Sun, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { EnsoMark } from '@/components/landing/enso-logo'
import { LANGS, useI18n } from '@/lib/i18n/context'
import { usePwaInstall } from '@/components/pwa/use-install'
import { PALETTE_OPEN_EVENT, PAUSE_OPEN_EVENT } from '@/lib/events'

// Re-exportado para mantener las importaciones existentes (pause-overlay)
export { PAUSE_OPEN_EVENT }

export function Navbar() {
  const { d, lang, setLang } = useI18n()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { canInstall, installed, promptInstall } = usePwaInstall()

  React.useEffect(() => setMounted(true), [])

  const navLinks = [
    { href: '#practicas', label: d.nav.practices },
    { href: '#respiracion', label: d.nav.breathing },
    { href: '#meditaciones', label: d.nav.meditations },
    { href: '#santuario', label: d.nav.sanctuary },
    { href: '#temas', label: d.nav.topics },
    { href: '#tradiciones', label: d.nav.traditions },
    { href: '#comunidad', label: d.nav.community },
  ]

  const openPause = () => window.dispatchEvent(new CustomEvent(PAUSE_OPEN_EVENT))

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        aria-label={d.nav.mainNav}
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="#inicio"
          className="group flex items-center gap-2.5"
          aria-label={d.nav.home}
        >
          <span className="text-sage transition-transform duration-500 group-hover:rotate-45">
            <EnsoMark className="size-7" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide">
              AQUÍ <span className="text-gold">y</span> AHORA
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {d.nav.brandTagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {canInstall && !installed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={promptInstall}
              aria-label={d.pwa.install}
              title={d.pwa.install}
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <Download className="size-[18px]" />
            </Button>
          ) : null}

          {/* Búsqueda / paleta de comandos (Ctrl·⌘ + K) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(PALETTE_OPEN_EVENT))
            }
            aria-label={d.palette.trigger}
            title={d.palette.trigger}
            className="h-9 gap-2 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Search className="size-[18px]" aria-hidden="true" />
            <kbd className="hidden rounded-md border border-border bg-secondary px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground xl:inline-block">
              ⌘K
            </kbd>
          </Button>

          {/* Selector de idioma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={d.nav.language}
                className="h-9 gap-1.5 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Languages className="size-[18px]" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wider">
                  {LANGS.find((l) => l.code === lang)?.short ?? 'ES'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
              {LANGS.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-checked={lang === l.code}
                  className="gap-2"
                >
                  <Check
                    className={`size-4 ${lang === l.code ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  />
                  {l.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            aria-label={
              mounted && theme === 'dark' ? d.nav.themeLight : d.nav.themeDark
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
            onClick={openPause}
            size="sm"
            aria-label={d.nav.pause3}
            title={d.nav.pause3}
            className="hidden rounded-full border-gold/40 bg-gold/10 px-3.5 font-medium text-gold shadow-none transition-all hover:bg-gold/20 hover:text-gold sm:inline-flex"
          >
            <Clock3 className="size-4" aria-hidden="true" />
            <span className="hidden lg:inline">{d.nav.pause3}</span>
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-full bg-sage px-5 font-medium text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
          >
            <Link href="#respiracion">
              <Wind className="size-4" aria-hidden="true" />
              <span className="hidden md:inline">{d.nav.breatheNow}</span>
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                aria-label={d.nav.menuOpen}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="text-sage">
                    <EnsoMark className="size-5" />
                  </span>
                  AQUÍ y AHORA
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label={d.nav.mobileNav}
                className="flex flex-col gap-1 px-4"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#premium"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-gold transition-colors hover:bg-gold/10"
                >
                  {d.nav.premium}
                </Link>
                <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-4">
                  <Button
                    onClick={() => {
                      setOpen(false)
                      openPause()
                    }}
                    className="rounded-full border-gold/40 bg-gold/10 font-medium text-gold hover:bg-gold/20 hover:text-gold"
                  >
                    <Clock3 className="size-4" aria-hidden="true" />
                    {d.nav.pause3}
                  </Button>
                  {canInstall && !installed ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false)
                        promptInstall()
                      }}
                      className="rounded-full font-medium"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      {d.pwa.install}
                    </Button>
                  ) : null}
                  <Button
                    asChild
                    className="rounded-full bg-sage font-medium text-primary-foreground"
                  >
                    <Link href="#respiracion" onClick={() => setOpen(false)}>
                      <Sparkles className="size-4" aria-hidden="true" />
                      {d.nav.breatheNow}
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
