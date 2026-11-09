'use client'

import * as React from 'react'
import { CalendarCheck2, Flame, Timer, Trash2, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import {
  clearPractices,
  getPractices,
  getStats,
  PRACTICE_EVENT,
  type PracticeEntry,
} from '@/lib/practice-log'
import { cn } from '@/lib/utils'

export function Analytics() {
  const { d, formatDate } = useI18n()
  const [entries, setEntries] = React.useState<PracticeEntry[]>([])

  React.useEffect(() => {
    const sync = () => setEntries(getPractices())
    sync()
    window.addEventListener(PRACTICE_EVENT, sync)
    return () => window.removeEventListener(PRACTICE_EVENT, sync)
  }, [])

  const stats = React.useMemo(() => getStats(entries), [entries])
  const maxMinutes = Math.max(1, ...stats.last14.map((day) => day.minutes))

  const handleClear = () => {
    if (window.confirm(d.analytics.confirmClear)) {
      clearPractices()
    }
  }

  const cards = [
    {
      icon: TrendingUp,
      label: d.analytics.weekMinutes,
      value: d.analytics.minutesShort(Math.round(stats.weekMinutes)),
      tint: 'text-sage',
      bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
    },
    {
      icon: Timer,
      label: d.analytics.totalSessions,
      value: d.analytics.sessionsShort(stats.totalSessions),
      tint: 'text-terracotta',
      bg: 'bg-terracotta/10',
    },
    {
      icon: Flame,
      label: d.analytics.streakDays,
      value: String(stats.streakDays),
      tint: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      icon: CalendarCheck2,
      label: d.analytics.favorite,
      value: stats.favoriteType ? d.analytics.types[stats.favoriteType] : '—',
      tint: 'text-sage',
      bg: 'bg-sage-soft/70 dark:bg-sage-soft/40',
    },
  ]

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border/80 bg-card/50 p-10 text-center">
          <Timer className="size-10 text-muted-foreground/50" aria-hidden="true" />
          <p className="font-serif text-lg italic text-muted-foreground">
            {d.analytics.empty}
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {d.analytics.emptyHint}
          </p>
        </div>
      ) : (
        <>
          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-border/70 bg-card/70 p-4"
              >
                <span
                  className={cn('grid size-10 place-items-center rounded-xl', card.bg)}
                >
                  <card.icon className={cn('size-5', card.tint)} aria-hidden="true" />
                </span>
                <p className="mt-3 text-xs text-muted-foreground">{card.label}</p>
                <p className="mt-1 font-serif text-xl font-semibold leading-tight">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Gráfico de los últimos 14 días */}
          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {d.analytics.last14}
            </p>
            <div
              className="mt-4 flex h-36 items-end gap-1.5"
              role="img"
              aria-label={d.analytics.last14}
            >
              {stats.last14.map((day, i) => {
                const height = day.minutes > 0 ? Math.max(6, (day.minutes / maxMinutes) * 100) : 2
                const isToday = i === stats.last14.length - 1
                return (
                  <div key={i} className="group relative flex-1">
                    <div
                      className={cn(
                        'w-full rounded-t-md transition-all',
                        day.minutes > 0
                          ? isToday
                            ? 'bg-terracotta/80'
                            : 'bg-sage/70 group-hover:bg-sage'
                          : 'bg-border/70'
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-sm group-hover:block">
                      {formatDate(day.date, { day: 'numeric', month: 'short' })} ·{' '}
                      {d.analytics.minutesShort(Math.round(day.minutes))}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desglose por práctica */}
          <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {d.analytics.byPractice}
            </p>
            <ul className="mt-4 space-y-2.5">
              {stats.byType.map((row) => {
                const pct = Math.round((row.count / stats.totalSessions) * 100)
                return (
                  <li key={row.type} className="flex items-center gap-3 text-sm">
                    <span className="w-36 shrink-0 truncate text-muted-foreground sm:w-44">
                      {d.analytics.types[row.type]}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <span
                        className="block h-full rounded-full bg-sage/70"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-20 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                      {row.count} · {d.analytics.minutesShort(Math.round(row.minutes))}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="gap-2 rounded-full text-xs text-muted-foreground/70 hover:text-destructive"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              {d.analytics.clear}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
