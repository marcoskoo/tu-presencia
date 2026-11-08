'use client'

import * as React from 'react'
import {
  BarChart3,
  Clock,
  Eye,
  Flower2,
  Footprints,
  Heart,
  Moon,
  Sparkles,
  Wind,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FadeIn, SectionHeader } from '@/components/landing/section-header'

type Topic = {
  icon: React.ElementType
  tint: string
  bg: string
  title: string
  description: string
  duration: string
  level: string
  intro: string
  steps: string[]
  closing: string
}

const TOPICS: Topic[] = [
  {
    icon: Flower2,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
    title: 'Meditación para comenzar',
    description:
      'Tu primera meditación, explicada con calma: postura, ancla y el arte de volver sin juzgarte.',
    duration: '10 min',
    level: 'Iniciación',
    intro:
      'Meditar no es dejar de pensar: es cambiar tu relación con los pensamientos. En esta primera práctica aprenderás a usar la respiración como ancla y a volver a ella, una y otra vez, con amabilidad.',
    steps: [
      'Siéntate con la espalda digna pero cómoda, manos sobre los muslos y ojos cerrados o en mirada suave.',
      'Lleva la atención a la sensación natural de la respiración en la nariz o el abdomen.',
      'Cuenta mentalmente cada exhalación del 1 al 10 y vuelve a empezar.',
      'Cuando la mente se vaya —y se irá—, notalo sin juicio y regresa al 1. Ese retorno ES la práctica.',
    ],
    closing:
      'Cierra con tres respiraciones profundas y abre los ojos lentamente. Ya has dado el primer paso.',
  },
  {
    icon: Eye,
    tint: 'text-terracotta',
    bg: 'bg-terracotta/10',
    title: 'El arte de habitar el presente',
    description:
      'Microprácticas de presencia consciente para despertar del piloto automático en pleno día.',
    duration: '5 min',
    level: 'Todos los días',
    intro:
      'La presencia consciente no requiere cojín ni templo: se entrena en la fila del supermercado, al lavar los platos, en una conversación. AQUÍ y AHORA es un músculo que se fortalece con pequeños gestos.',
    steps: [
      'Detente un instante y pregúntate: «¿Estoy aquí, o estoy en mis pensamientos?».',
      'Nombra en silencio tres cosas que percibes con los sentidos ahora mismo: un sonido, una textura, un color.',
      'Siente el peso de tu cuerpo contra la silla o el suelo. Deja que la gravedad te sostenga.',
      'Observa tu estado emocional sin cambiarlo: «hay calma», «hay prisa», «hay cansancio».',
    ],
    closing:
      'Repite este ciclo varias veces al día. Cada despertar dura segundos; su suma transforma tu vida.',
  },
  {
    icon: Wind,
    tint: 'text-gold',
    bg: 'bg-gold/10',
    title: 'Respiración cuadrada paso a paso',
    description:
      'La técnica 4·4·4·4 que usan Navy SEALs y monjes por igual para centrarse en segundos.',
    duration: '5 min',
    level: 'Todos los niveles',
    intro:
      'La respiración cuadrada dibuja cuatro lados iguales con tu aliento. Su regularidad envía al sistema nervioso un mensaje claro: «estamos a salvo, podemos descansar».',
    steps: [
      'Exhala todo el aire por la boca, preparando el espacio.',
      'Inhala por la nariz contando hasta 4, llenando el vientre primero.',
      'Sostén el aire contando hasta 4, con garganta y hombros relajados.',
      'Exhala suave por la nariz contando hasta 4 y sostén el vacío otros 4. Repite 8 ciclos.',
    ],
    closing:
      'Si te marea, acorta las fases a 3·3·3·3. Puedes practicarla aquí mismo con nuestro círculo guía.',
  },
  {
    icon: Footprints,
    tint: 'text-sage',
    bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
    title: 'Meditación caminando',
    description:
      'Cada paso, un milagro. Convierte un paseo de quince minutos en meditación en movimiento.',
    duration: '15 min',
    level: 'Intermedio',
    intro:
      'Caminar puede ser un traslado o un templo. La diferencia está en la atención. Esta práctica, querida por la tradición zen, te invita a llegar a cada paso con todo tu ser.',
    steps: [
      'Camina más lento de lo habitual, como si no tuvieras destino.',
      'Siente el ciclo completo del paso: talón, planta, dedos, despegue.',
      'Sincroniza un paso con media inhalación y el siguiente con media exhalación.',
      'Abre los sentidos: viento en la piel, aromas, pájaros. El mundo también está meditando contigo.',
    ],
    closing:
      'Al terminar, detente un momento y agradece a tus pies por llevarte, presentes, hasta aquí.',
  },
  {
    icon: Moon,
    tint: 'text-terracotta',
    bg: 'bg-terracotta/10',
    title: 'El observador silencioso',
    description:
      'Descubre al testigo que hay detrás de tus pensamientos: la quietud que todo lo contempla.',
    duration: '12 min',
    level: 'Intermedio',
    intro:
      'Puedes observar tus pensamientos porque no eres tus pensamientos. Detrás del ruido mental hay una presencia quieta que mira: ese es tu hogar más profundo. Esta práctica te acerca a él.',
    steps: [
      'Cierra los ojos y deja que los pensamientos fluyan como nubes en el cielo.',
      'No los sigas ni los rechaces: solo nótalos. «Ahí va un recuerdo», «ahí va una lista de tareas».',
      'Pregúntate con suavidad: «¿quién es el que observa?» y descansa en esa apertura.',
      'Permanece en el silencio entre pensamientos, aunque dure un instante. Ahí estás tú.',
    ],
    closing:
      'El observador no se alcanza con esfuerzo, sino con quietud. Vuelve a esta práctica cuando el mundo pida demasiado.',
  },
  {
    icon: Heart,
    tint: 'text-gold',
    bg: 'bg-gold/10',
    title: 'Gratitud y corazón abierto',
    description:
      'La práctica que reeduca el corazón para notar lo que ya está bien, aquí y ahora.',
    duration: '8 min',
    level: 'Todos los niveles',
    intro:
      'La mente está entrenada para detectar lo que falta. La gratitud la reeduca para celebrar lo que hay. No es optimismo ingenuo: es una forma honesta de mirar la abundancia de este instante.',
    steps: [
      'Lleva una mano al pecho y siente el latido que te acompaña desde antes de nacer.',
      'Nombra tres gracias: algo sencillo de hoy, alguien que te sostiene, algo de ti que aprecias.',
      'Con cada agradecimiento, inhala y siente cómo se expande una calidez en el pecho.',
      'Termina dirigiendo un deseo sincero de bienestar hacia alguien que quieres.',
    ],
    closing:
      'La gratitud practicada a diario convierte lo ordinario en suficiente. Ese es el milagro silencioso.',
  },
]

function TopicDialog({ topic }: { topic: Topic }) {
  const [open, setOpen] = React.useState(false)

  const goToBreathing = () => {
    setOpen(false)
    // Espera a que Radix libere el bloqueo de scroll antes de desplazar
    window.setTimeout(() => {
      document
        .getElementById('respiracion')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-4 text-sm font-medium text-sage hover:bg-sage-soft/50 hover:text-sage"
        >
          Abrir la guía
          <Sparkles className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto scroll-serene rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <div
            className={`mb-1 grid size-12 place-items-center rounded-2xl ${topic.bg}`}
          >
            <topic.icon className={`size-6 ${topic.tint}`} aria-hidden="true" />
          </div>
          <DialogTitle className="font-serif text-2xl font-medium">
            {topic.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {topic.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="size-3.5" aria-hidden="true" />
              {topic.level}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {topic.intro}
          </p>
          <div>
            <h4 className="font-serif text-lg font-semibold">
              La práctica, paso a paso
            </h4>
            <ol className="mt-4 space-y-4">
              {topic.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full font-serif text-sm font-semibold ${topic.bg} ${topic.tint}`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <p
            className={`rounded-xl ${topic.bg} p-4 font-serif text-sm italic leading-relaxed ${topic.tint}`}
          >
            {topic.closing}
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col sm:items-stretch">
          <Button
            onClick={goToBreathing}
            className="rounded-full bg-sage font-medium text-primary-foreground hover:opacity-90"
          >
            <Wind className="size-4" aria-hidden="true" />
            Practicar la respiración ahora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Topics() {
  return (
    <section
      id="temas"
      aria-label="Temas para explorar"
      className="scroll-mt-20 bg-secondary/40 py-24 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Biblioteca viva"
          title={
            <>
              Temas para <em className="text-terracotta">explorar</em>
            </>
          }
          description="Guías breves y profundas a la vez: elige un tema, ábrelo con calma y llévalo a tu día. Cada guía incluye la práctica paso a paso."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => (
            <FadeIn key={topic.title} delay={(i % 3) * 0.1}>
              <Card className="flex h-full flex-col border-border/70 bg-card/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div
                      className={`grid size-12 place-items-center rounded-2xl ${topic.bg}`}
                    >
                      <topic.icon
                        className={`size-6 ${topic.tint}`}
                        aria-hidden="true"
                      />
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-secondary font-normal text-muted-foreground"
                    >
                      {topic.duration} · {topic.level}
                    </Badge>
                  </div>
                  <h3 className="pt-3 font-serif text-xl font-medium leading-snug">
                    {topic.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <TopicDialog topic={topic} />
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
