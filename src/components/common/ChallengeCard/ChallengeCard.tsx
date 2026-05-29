import type { ReactNode } from 'react'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

export interface ChallengeCardProps {
  number: number
  total: number
  title: string
  context?: ReactNode
  question: string
  children: ReactNode
  points: number
}

export function ChallengeCard({
  number,
  total,
  title,
  context,
  question,
  children,
  points,
}: ChallengeCardProps) {
  const pct = Math.round((number / total) * 100)

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            Desafío {number} de {total}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}
          >
            {points} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
          />
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{title}</h4>

      {/* Context block */}
      {context && (
        <GlassCard className="p-4">
          <div
            className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed"
            style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '12px 14px' }}
          >
            {context}
          </div>
        </GlassCard>
      )}

      {/* Question */}
      <p className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
        {question}
      </p>

      {/* Exercise content */}
      {children}

      {/* Footer */}
      <p className="text-xs text-[var(--color-text-muted)]">
        Puntos disponibles en este desafío: <span className="font-semibold" style={{ color: '#6366F1' }}>{points}</span>
      </p>
    </div>
  )
}
