'use client'

/**
 * Registro local de práctica: cada sesión (meditación, respiración, japa…)
 * se guarda en localStorage y se emite un evento para que la interfaz
 * (analítica, navbar) se actualice en vivo.
 */

export type PracticeType =
  | 'meditation'
  | 'timer'
  | 'breathing'
  | 'walking'
  | 'nidra'
  | 'mantra'
  | 'sounds'
  | 'pause'
  | 'gratitude'
  | 'oracle'

export type PracticeEntry = {
  id: string
  type: PracticeType
  /** minutos practicados (0 para prácticas sin duración, p. ej. oráculo) */
  minutes: number
  /** ISO date-time */
  at: string
}

const STORAGE_KEY = 'presencia-practices'
export const PRACTICE_EVENT = 'presencia:practice'

function safeParse(raw: string | null): PracticeEntry[] {
  if (!raw) return []
  try {
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.filter(
      (e): e is PracticeEntry =>
        e && typeof e.type === 'string' && typeof e.at === 'string'
    )
  } catch {
    return []
  }
}

export function getPractices(): PracticeEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return safeParse(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

/** Registra una sesión de práctica. `minutes` se redondea a múltiplos de 0.5. */
export function logPractice(entry: {
  type: PracticeType
  minutes?: number
  at?: Date
}): void {
  if (typeof window === 'undefined') return
  try {
    const list = safeParse(window.localStorage.getItem(STORAGE_KEY))
    list.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: entry.type,
      minutes: Math.max(0, Math.round((entry.minutes ?? 0) * 2) / 2),
      at: (entry.at ?? new Date()).toISOString(),
    })
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    window.dispatchEvent(new CustomEvent(PRACTICE_EVENT))
  } catch {
    /* ignorar cuotas */
  }
}

export function clearPractices(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(PRACTICE_EVENT))
  } catch {
    /* ignorar */
  }
}

/* ---------- Estadísticas ---------- */

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export type PracticeStats = {
  weekMinutes: number
  totalSessions: number
  totalMinutes: number
  streakDays: number
  favoriteType: PracticeType | null
  favoriteCount: number
  byType: { type: PracticeType; count: number; minutes: number }[]
  /** minutos por día, del más antiguo al más reciente */
  last14: { date: Date; minutes: number }[]
}

export function getStats(practices: PracticeEntry[] = getPractices()): PracticeStats {
  const now = new Date()
  const today = dayKey(now)

  // Últimos 14 días (incluye hoy)
  const last14: PracticeStats['last14'] = []
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    last14.push({ date, minutes: 0 })
  }
  const last14Keys = new Map(last14.map((entry) => [dayKey(entry.date), entry]))

  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - 6)
  weekStart.setHours(0, 0, 0, 0)

  const byTypeMap = new Map<PracticeType, { count: number; minutes: number }>()
  const daySet = new Set<string>()
  let weekMinutes = 0
  let totalMinutes = 0

  for (const entry of practices) {
    const at = new Date(entry.at)
    const key = dayKey(at)
    totalMinutes += entry.minutes
    if (at >= weekStart) weekMinutes += entry.minutes
    if (entry.minutes > 0 || entry.type !== 'oracle') daySet.add(key)

    const agg = byTypeMap.get(entry.type) ?? { count: 0, minutes: 0 }
    agg.count += 1
    agg.minutes += entry.minutes
    byTypeMap.set(entry.type, agg)

    const bucket = last14Keys.get(key)
    if (bucket) bucket.minutes += entry.minutes
  }

  // Racha: días consecutivos con práctica terminando hoy (o ayer)
  let streakDays = 0
  const cursor = new Date(now)
  if (!daySet.has(today)) cursor.setDate(now.getDate() - 1)
  while (daySet.has(dayKey(cursor))) {
    streakDays += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const byType = [...byTypeMap.entries()]
    .map(([type, agg]) => ({ type, ...agg }))
    .sort((a, b) => b.count - a.count)

  return {
    weekMinutes,
    totalSessions: practices.length,
    totalMinutes,
    streakDays,
    favoriteType: byType[0]?.type ?? null,
    favoriteCount: byType[0]?.count ?? 0,
    byType,
    last14,
  }
}
