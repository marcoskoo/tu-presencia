'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import {
  Clock3,
  Crown,
  Eye,
  Flower2,
  Footprints,
  Languages,
  Lock,
  Moon,
  Quote,
  Sparkles,
  Sun,
  Timer,
  Waves,
  Wind,
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { EnsoMark } from '@/components/landing/enso-logo'
import { LANGS, useI18n } from '@/lib/i18n/context'
import {
  PALETTE_OPEN_EVENT,
  PAUSE_OPEN_EVENT,
  PLAY_MEDITATION_EVENT,
} from '@/lib/events'

type MeditationId =
  | 'presencia'
  | 'escaneo'
  | 'dormir'
  | 'pausa'
  | 'caminando'
  | 'yogaNidra'
  | 'extendida'

const MEDITATION_ICONS: Record<
  MeditationId,
  { icon: React.ElementType; premium?: boolean }
> = {
  presencia: { icon: Eye },
  escaneo: { icon: Flower2 },
  dormir: { icon: Moon },
  pausa: { icon: Timer },
  caminando: { icon: Footprints },
  yogaNidra: { icon: Waves },
  extendida: { icon: Lock, premium: true },
}

/**
 * Paleta de comandos (Ctrl/⌘ + K): navegación directa, reproducir cualquier
 * melodía, pausa de 3 minutos, idioma y tema. Se abre también desde la lupa
 * del navbar mediante PALETTE_OPEN_EVENT.
 */
export function CommandPalette() {
  const { d, lang, setLang } = useI18n()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpen)
    }
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  /** Navega por hash como los enlaces del sitio (abre herramientas del santuario) */
  const go = (id: string) =>
    run(() => {
      window.location.hash = id
    })

  const playMeditation = (id: MeditationId) =>
    run(() => {
      window.dispatchEvent(
        new CustomEvent(PLAY_MEDITATION_EVENT, { detail: id })
      )
    })

  const navItems = [
    { id: 'inicio', label: d.palette.home },
    { id: 'practicas', label: d.nav.practices },
    { id: 'respiracion', label: d.nav.breathing },
    { id: 'meditaciones', label: d.nav.meditations },
    { id: 'santuario', label: d.nav.sanctuary },
    { id: 'temas', label: d.nav.topics },
    { id: 'tradiciones', label: d.nav.traditions },
    { id: 'comunidad', label: d.nav.community },
    { id: 'premium', label: d.nav.premium },
  ]

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={d.palette.label}
      description={d.palette.placeholder}
      className="rounded-2xl"
    >
      <CommandInput placeholder={d.palette.placeholder} />
      <CommandList className="scroll-serene">
        <CommandEmpty>{d.palette.noResults}</CommandEmpty>

        <CommandGroup heading={d.palette.groups.meditate}>
          {(Object.keys(MEDITATION_ICONS) as MeditationId[]).map((id) => {
            const meta = MEDITATION_ICONS[id]
            const info = d.meditations.items[id]
            const Icon = meta.icon
            return (
              <CommandItem
                key={id}
                value={`${info.title} ${info.tag} ${id}`}
                onSelect={() => playMeditation(id)}
              >
                <Icon
                  className={meta.premium ? 'text-gold' : 'text-sage'}
                  aria-hidden="true"
                />
                <span>{d.palette.play(info.title)}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {info.duration}
                </span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={d.palette.groups.navigate}>
          {navItems.map((item, i) => (
            <CommandItem
              key={item.id}
              value={`${item.label} ${item.id} ${d.palette.groups.navigate}`}
              onSelect={() => go(item.id)}
            >
              {i === 0 ? (
                <span className="text-sage" aria-hidden="true">
                  <EnsoMark className="size-4" />
                </span>
              ) : (
                <Quote className="text-muted-foreground" aria-hidden="true" />
              )}
              <span>{item.label}</span>
              {item.id === 'premium' ? (
                <Crown className="ml-auto size-4 text-gold" aria-hidden="true" />
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={d.palette.groups.actions}>
          <CommandItem
            value={`${d.nav.pause3} pausa break`}
            onSelect={() =>
              run(() =>
                window.dispatchEvent(new CustomEvent(PAUSE_OPEN_EVENT))
              )
            }
          >
            <Clock3 className="text-gold" aria-hidden="true" />
            <span>{d.nav.pause3}</span>
          </CommandItem>
          <CommandItem
            value={`${d.nav.breatheNow} respirar breathing`}
            onSelect={() => go('respiracion')}
          >
            <Wind className="text-sage" aria-hidden="true" />
            <span>{d.nav.breatheNow}</span>
          </CommandItem>
          <CommandItem
            value={`${d.nav.themeDark} ${d.nav.themeLight} tema theme noche amanecer`}
            onSelect={() => run(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? (
              <Sun className="text-gold" aria-hidden="true" />
            ) : (
              <Moon className="text-muted-foreground" aria-hidden="true" />
            )}
            <span>{theme === 'dark' ? d.nav.themeLight : d.nav.themeDark}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={d.palette.groups.language}>
          {LANGS.map((l) => (
            <CommandItem
              key={l.code}
              value={`${l.name} language idioma ${l.code}`}
              onSelect={() => run(() => setLang(l.code))}
            >
              <Languages
                className={lang === l.code ? 'text-sage' : 'text-muted-foreground'}
                aria-hidden="true"
              />
              <span>{l.name}</span>
              {lang === l.code ? (
                <Sparkles
                  className="ml-auto size-4 text-sage"
                  aria-hidden="true"
                />
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
