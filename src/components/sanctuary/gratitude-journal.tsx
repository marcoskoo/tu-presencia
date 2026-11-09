'use client'

import * as React from 'react'
import { BookHeart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useI18n } from '@/lib/i18n/context'
import { logPractice } from '@/lib/practice-log'

type Entry = {
  id: string
  prompt: string
  text: string
  at: string
}

const STORAGE_KEY = 'presencia-gratitude'

function dayIndex(): number {
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return dayOfYear
}

function loadEntries(): Entry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data.filter((e) => e && e.text && e.at) : []
  } catch {
    return []
  }
}

export function GratitudeJournal() {
  const { d, formatDate } = useI18n()
  const { toast } = useToast()
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [text, setText] = React.useState('')

  const prompt = d.gratitude.prompts[dayIndex() % d.gratitude.prompts.length]

  React.useEffect(() => {
    setEntries(loadEntries())
  }, [])

  const save = () => {
    const trimmed = text.trim()
    if (!trimmed) {
      toast({ title: d.gratitude.emptyToast, variant: 'destructive' })
      return
    }
    const entry: Entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      prompt,
      text: trimmed,
      at: new Date().toISOString(),
    }
    const next = [entry, ...entries]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* cuota */
    }
    setEntries(next)
    setText('')
    logPractice({ type: 'gratitude', minutes: 2 })
    toast({ title: d.gratitude.savedToast })
  }

  const remove = (id: string) => {
    if (!window.confirm(d.gratitude.confirmDelete)) return
    const next = entries.filter((e) => e.id !== id)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignorar */
    }
    setEntries(next)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/70 bg-card/70 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {d.gratitude.promptLabel}
        </p>
        <p className="mt-2 font-serif text-xl italic leading-relaxed text-foreground/90">
          {prompt}
        </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 600))}
          placeholder={d.gratitude.writeHere}
          rows={4}
          maxLength={600}
          className="mt-4 resize-none bg-background leading-relaxed"
          aria-label={d.gratitude.promptLabel}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{d.gratitude.privateNote}</p>
          <Button
            onClick={save}
            className="shrink-0 rounded-full bg-sage px-6 font-medium text-primary-foreground hover:opacity-90"
          >
            {d.gratitude.save}
          </Button>
        </div>
      </div>

      <div>
        <h4 className="flex items-center gap-2 font-serif text-lg font-semibold">
          <BookHeart className="size-5 text-sage" aria-hidden="true" />
          {d.gratitude.listTitle}
          <span className="text-sm font-normal text-muted-foreground">({entries.length})</span>
        </h4>

        {entries.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border/80 bg-card/50 p-6 text-center font-serif text-sm italic text-muted-foreground">
            {d.gratitude.empty}
          </p>
        ) : (
          <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1 scroll-serene">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-2xl border border-border/60 bg-background/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.at, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mt-0.5 font-serif text-sm italic text-sage">
                      {entry.prompt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(entry.id)}
                    aria-label={d.gratitude.deleteOne}
                    className="size-8 shrink-0 text-muted-foreground/60 hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {entry.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
