import { cn } from '@/lib/utils'

/**
 * Círculo enso: símbolo zen del instante presente.
 * Cada trazo es único e imperfecto, como este momento.
 */
export function EnsoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn('size-6', className)}
    >
      <circle
        cx="24"
        cy="24"
        r="18.5"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="97 19.4"
        transform="rotate(-50 24 24)"
      />
      <circle
        cx="24"
        cy="24"
        r="4.4"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  )
}
