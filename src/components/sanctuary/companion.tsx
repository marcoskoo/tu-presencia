'use client'

import * as React from 'react'
import { HeartHandshake, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n/context'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Message = {
  role: 'user' | 'companion'
  text: string
}

const MAX_CHARS = 400

/**
 * Diálogo con el silencio: compañero contemplativo con IA.
 * Conversación de una sentada (no se persiste): la IA de /api/companion
 * responde con calidez; si el servicio no está disponible, el servidor
 * responde con el mazo contemplativo local.
 */
export function Companion() {
  const { d, lang } = useI18n()
  const { toast } = useToast()

  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'companion', text: d.companion.greeting },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // La conversación no se guarda: al cambiar de idioma, el saludo se traduce
  React.useEffect(() => {
    setMessages([{ role: 'companion', text: d.companion.greeting }])
  }, [lang])

  // Mantener el final de la conversación visible
  React.useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, loading])

  const send = async (text: string) => {
    const message = text.trim()
    if (!message || loading) return

    setMessages((prev) => [...prev, { role: 'user', text: message }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang }),
      })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('respuesta vacía')
      }
      setMessages((prev) => [...prev, { role: 'companion', text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'companion', text: d.companion.error }])
      toast({ title: d.companion.error, description: d.companion.retry })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Conversación */}
      <div
        ref={listRef}
        className="scroll-serene max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-border/60 bg-secondary/30 p-4"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'flex gap-2.5',
              m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {m.role === 'companion' ? (
              <span
                className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-sage-soft text-sage dark:bg-sage-soft/40"
                aria-hidden="true"
              >
                <HeartHandshake className="size-4" />
              </span>
            ) : null}
            <p
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'user'
                  ? 'rounded-tr-sm bg-sage text-primary-foreground'
                  : 'rounded-tl-sm bg-card text-foreground shadow-sm'
              )}
            >
              {m.text}
            </p>
          </div>
        ))}
        {loading ? (
          <div className="flex items-center gap-2.5">
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full bg-sage-soft text-sage dark:bg-sage-soft/40"
              aria-hidden="true"
            >
              <HeartHandshake className="size-4" />
            </span>
            <p className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {d.companion.thinking}
            </p>
          </div>
        ) : null}
      </div>

      {/* Sugerencias para empezar */}
      {messages.length === 1 && !loading ? (
        <div className="flex flex-wrap gap-2">
          {d.companion.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-sage/40 bg-sage-soft/50 px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-sage hover:bg-sage-soft dark:bg-sage-soft/30"
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      {/* Entrada */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
          placeholder={d.companion.placeholder}
          aria-label={d.companion.placeholder}
          maxLength={MAX_CHARS}
          className="h-11 rounded-full bg-card"
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label={d.companion.send}
          className="size-11 shrink-0 rounded-full bg-sage text-primary-foreground shadow-sm transition-all hover:opacity-90"
        >
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        {d.companion.disclaimer}
      </p>
    </div>
  )
}
