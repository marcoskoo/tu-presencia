'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <FadeIn
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.32em] text-terracotta">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-balance sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
      <div className="divider-om mt-8 w-40" aria-hidden="true" />
    </FadeIn>
  )
}
