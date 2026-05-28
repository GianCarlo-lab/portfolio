import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import type { ExperienceItem } from './experience.types'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getTechIcon } from '@/utils/techIcons'
import { fadeInLeft, fadeInRight } from '@/animations/variants'
import { cn } from '@/utils/cn'

const TYPE_STYLES: Record<ExperienceItem['type'], { label: string; className: string }> = {
  'full-time': {
    label: 'Tiempo completo',
    className: 'bg-primary/10 text-primary border-primary/30',
  },
  freelance: {
    label: 'Freelance',
    className: 'bg-secondary/10 text-secondary border-secondary/30',
  },
}

interface TimelineItemProps {
  item: ExperienceItem
  index: number
  isLast: boolean
}

const VISIBLE_COUNT = 3

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 })

  const variant = index % 2 === 0 ? fadeInLeft : fadeInRight
  const typeStyle = TYPE_STYLES[item.type]
  const extra = item.responsibilities.slice(VISIBLE_COUNT)
  const hasMore = extra.length > 0

  return (
    <div ref={ref} className="flex gap-2">
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="relative flex items-center justify-center w-10 h-10 z-10 flex-shrink-0">
          {item.current && (
            <span className="absolute inline-flex h-7 w-7 rounded-full bg-primary opacity-30 animate-ping" />
          )}
          <div
            className={cn(
              'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300',
              item.current
                ? 'border-primary bg-primary shadow-glow'
                : 'border-[var(--color-border)] bg-dark-800'
            )}
          >
            {item.current && (
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
            )}
          </div>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-[var(--color-border)]" />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 pb-10"
        variants={variant}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ delay: index * 0.12 }}
      >
        <GlassCard className="p-6" hoverable>
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border',
                  typeStyle.className
                )}
              >
                {typeStyle.label}
              </span>
              {item.current && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Actual
                </span>
              )}
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap',
                item.current
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'bg-white/[0.04] border-[var(--color-border)] text-[var(--color-text-muted)]'
              )}
            >
              <Calendar size={11} />
              {item.startDate} → {item.endDate}
            </span>
          </div>

          {/* Company & role */}
          <div className="mb-3">
            {item.current ? (
              <GradientText as="h3" className="text-xl font-bold">
                {item.company}
              </GradientText>
            ) : (
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {item.company}
              </h3>
            )}
            <p className="text-[var(--color-text-secondary)] font-medium mt-0.5">{item.role}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-secondary)] italic mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Responsibilities */}
          <ul className="flex flex-col gap-2 mb-4">
            {item.responsibilities.slice(0, VISIBLE_COUNT).map((r, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          {/* Collapsible extra responsibilities */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="extra"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <ul className="flex flex-col gap-2 mb-4">
                  {extra.map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand toggle */}
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium mb-5',
                'text-primary hover:text-primary/80 transition-colors duration-200'
              )}
            >
              {expanded ? (
                <>
                  <ChevronUp size={14} />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Ver {extra.length} más
                </>
              )}
            </button>
          )}

          {/* Technology badges */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
            {item.technologies.map((tech) => {
              const icon = getTechIcon(tech.name, 14)
              const color = tech.color ?? 'var(--color-accent)'
              return (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-secondary)]"
                  style={tech.color ? { borderColor: `${tech.color}35` } : undefined}
                >
                  {icon ? (
                    <span className="flex-shrink-0">{icon}</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  )}
                  {tech.name}
                </span>
              )
            })}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
