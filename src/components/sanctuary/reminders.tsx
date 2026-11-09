'use client'

import * as React from 'react'
import { Bell, BellRing, Clock, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { useI18n } from '@/lib/i18n/context'

const STORAGE_KEY = 'presencia-reminder'

type ReminderConfig = {
  time: string // "HH:MM"
  enabled: boolean
}

function loadConfig(): ReminderConfig | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (typeof data.time !== 'string') return null
    return { time: data.time, enabled: Boolean(data.enabled) }
  } catch {
    return null
  }
}

export function Reminders() {
  const { d } = useI18n()
  const { toast } = useToast()
  const [time, setTime] = React.useState('09:00')
  const [enabled, setEnabled] = React.useState(false)
  const [permission, setPermission] = React.useState<
    NotificationPermission | 'unsupported'
  >('default')

  React.useEffect(() => {
    if (typeof Notification === 'undefined') {
      setPermission('unsupported')
    } else {
      setPermission(Notification.permission)
    }
    const config = loadConfig()
    if (config) {
      setTime(config.time)
      setEnabled(config.enabled)
    }
  }, [])

  const persist = (next: ReminderConfig) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignorar */
    }
  }

  const askPermission = async () => {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  const toggleEnabled = async (value: boolean) => {
    if (value) {
      if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        const result = await Notification.requestPermission()
        setPermission(result)
        if (result !== 'granted') {
          toast({
            title: d.reminders.denied,
            description: d.reminders.deniedHint,
            variant: 'destructive',
          })
          return
        }
      }
    }
    setEnabled(value)
    persist({ time, enabled: value })
    toast({ title: value ? d.reminders.enabled : d.reminders.disabled })
  }

  const changeTime = (value: string) => {
    setTime(value)
    persist({ time: value, enabled })
  }

  const fireNotification = () => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(d.reminders.notifyTitle, {
        body: d.reminders.body,
        icon: '/icons/icon-192.png',
        tag: 'presencia-reminder',
      })
    }
    const bell = new Audio('/audios/campana-presencia.mp3')
    bell.volume = 0.7
    bell.play().catch(() => {})
  }

  // Comprobación cada 30 s mientras la página está abierta
  React.useEffect(() => {
    if (!enabled) return
    let lastFired = ''
    const check = () => {
      const config = loadConfig()
      if (!config?.enabled) return
      const now = new Date()
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      const stamp = `${now.toDateString()}-${config.time}`
      if (hhmm === config.time && lastFired !== stamp) {
        lastFired = stamp
        fireNotification()
      }
    }
    const id = window.setInterval(check, 30000)
    return () => window.clearInterval(id)
     
  }, [enabled])

  return (
    <div className="space-y-6">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        {d.reminders.description}
      </p>

      <div className="mx-auto flex max-w-sm flex-col gap-4 rounded-2xl border border-border/70 bg-card/70 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 text-sm font-medium">
            <Clock className="size-4 text-sage" aria-hidden="true" />
            {d.reminders.timeLabel}
          </span>
          <Input
            type="time"
            value={time}
            onChange={(e) => changeTime(e.target.value)}
            aria-label={d.reminders.timeLabel}
            className="h-10 w-32 bg-background tabular-nums"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 text-sm font-medium">
            <Bell className="size-4 text-terracotta" aria-hidden="true" />
            {d.reminders.enable}
          </span>
          <Switch
            checked={enabled}
            onCheckedChange={toggleEnabled}
            aria-label={d.reminders.enable}
          />
        </div>

        {permission === 'denied' ? (
          <p className="rounded-xl bg-destructive/10 p-3 text-xs leading-relaxed text-destructive">
            {d.reminders.deniedHint}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          variant="outline"
          onClick={fireNotification}
          className="gap-2 rounded-full border-border/70 text-muted-foreground hover:text-foreground"
        >
          <Play className="size-4" aria-hidden="true" />
          {d.reminders.test}
        </Button>
        <p className="flex max-w-md items-start gap-2 text-center text-xs leading-relaxed text-muted-foreground">
          <BellRing className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span className="text-center">{d.reminders.note}</span>
        </p>
      </div>
    </div>
  )
}
