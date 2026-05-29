import { motion } from 'framer-motion'
import { Trophy, RotateCcw } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

export interface FeedbackRange {
  range: [number, number]
  message: string
  color: string
}

export interface ScoreBoardProps {
  userScore: number
  maxScore: number
  gianScore?: number
  userName?: string
  feedback: FeedbackRange[]
  gianComment: string
  onReset: () => void
  extraInfo?: string
}

export function ScoreBoard({
  userScore,
  maxScore,
  gianScore,
  userName = 'Tú',
  feedback,
  gianComment,
  onReset,
  extraInfo,
}: ScoreBoardProps) {
  const effectiveGianScore = gianScore ?? maxScore
  const displayScore = Math.max(0, userScore)
  const userPct = Math.min(100, (displayScore / maxScore) * 100)
  const gianPct = Math.min(100, (effectiveGianScore / maxScore) * 100)

  const activeFeedback =
    feedback.find((f) => displayScore >= f.range[0] && displayScore <= f.range[1]) ??
    feedback[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={22} style={{ color: '#F59E0B' }} />
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Resultados</h3>
        </div>

        {/* Progress bars */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {userName}
              </span>
              <span className="text-sm font-bold" style={{ color: activeFeedback.color }}>
                {displayScore} / {maxScore} pts
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: activeFeedback.color }}
                initial={{ width: 0 }}
                animate={{ width: `${userPct}%` }}
                transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Gian</span>
              <span className="text-sm font-bold" style={{ color: '#6366F1' }}>
                {effectiveGianScore} / {maxScore} pts
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#6366F1' }}
                initial={{ width: 0 }}
                animate={{ width: `${gianPct}%` }}
                transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{
            background: `${activeFeedback.color}12`,
            border: `1px solid ${activeFeedback.color}35`,
          }}
        >
          <p className="text-sm font-medium leading-relaxed" style={{ color: activeFeedback.color }}>
            {activeFeedback.message}
          </p>
        </div>

        {extraInfo && (
          <p className="text-xs text-[var(--color-text-muted)] mb-5 italic">{extraInfo}</p>
        )}

        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        {/* Gian's take */}
        <div className="flex gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(99,102,241,0.2)', color: '#6366F1' }}
          >
            GB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-accent)' }}>
              ¿Cómo lo resuelvo yo?
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
              "{gianComment}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all"
          >
            <RotateCcw size={14} />
            Intentar de nuevo
          </button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
