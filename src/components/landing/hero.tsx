'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CHIPS = ['Meditación guiada', 'Presencia consciente', 'Respiración', 'Audio con campanas', 'Silencio', 'Gratitud']

export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Bienvenida"
      className="hero-grain relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
    >
      {/* Orbes flotantes de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-24 top-24 size-72 rounded-full bg-sage-soft/70 blur-3xl dark:bg-sage-soft/40" />
        <div
          className="animate-float-slow absolute -right-20 bottom-24 size-80 rounded-full bg-terracotta/10 blur-3xl"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="animate-float-slow absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
          style={{ animationDelay: '-7s' }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6">
        {/* Enso que respira */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative mb-10 grid size-56 place-items-center sm:size-64"
          aria-hidden="true"
        >
          <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-sage/40" />
          <div className="animate-ripple absolute inset-4 rounded-full border border-sage/30" />
          <div
            className="animate-ripple absolute inset-4 rounded-full border border-terracotta/20"
            style={{ animationDelay: '-2.2s' }}
          />
          <div className="animate-breathe absolute inset-6 rounded-full bg-gradient-to-br from-sage-soft via-sand to-sage-soft shadow-[0_0_70px_-12px_var(--sage)] dark:from-sage-soft/60 dark:via-sand/60 dark:to-sage-soft/40" />
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="absolute inset-0 size-full text-sage"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="110 21.9"
              transform="rotate(-50 24 24)"
            />
          </svg>
          <p className="relative z-10 font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
            AQUÍ
            <br />
            <span className="italic text-gold">y</span> AHORA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-gold" aria-hidden="true" />
            Espíritu · Práctica · Comunidad
          </p>

          <h1 className="mt-7 font-serif text-4xl font-medium leading-[1.12] text-balance sm:text-5xl md:text-6xl">
            La vida sucede{' '}
            <em className="text-sage">AQUÍ</em> y{' '}
            <em className="text-terracotta">AHORA</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Un espacio abierto para compartir y cultivar la espiritualidad en el
            día a día: meditación, práctica de la presencia consciente y
            respiración consciente para volver, instante a instante, al único
            lugar donde la vida realmente sucede.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-sage px-8 text-base font-medium text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          >
            <Link href="#respiracion">
              <Wind className="size-5" aria-hidden="true" />
              Respirar ahora
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-sage/50 px-8 text-base font-medium text-sage transition-colors hover:bg-sage-soft/60 hover:text-sage"
          >
            <Link href="#practicas">Explorar las prácticas</Link>
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
          aria-label="Temas del espacio"
        >
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border/80 bg-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur"
            >
              {chip}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="grid size-10 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground backdrop-blur"
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
