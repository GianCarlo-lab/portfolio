import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SkillItem, SkillLevel } from './skills.types'
import { getTechIcon } from '@/utils/techIcons'
import { cn } from '@/utils/cn'

const LEVEL_STYLES: Record<SkillLevel, { label: string; className: string }> = {
  experto: {
    label: 'Experto',
    className: 'text-primary bg-primary/10 border border-primary/20',
  },
  avanzado: {
    label: 'Avanzado',
    className: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
  },
  intermedio: {
    label: 'Intermedio',
    className: 'text-amber-400 bg-amber-400/10 border border-amber-400/20',
  },
}

interface SkillPillProps {
  skill: SkillItem
  index: number
}

export function SkillPill({ skill, index }: SkillPillProps) {
  const [hovered, setHovered] = useState(false)
  const levelStyle = LEVEL_STYLES[skill.level]
  const safeColor = skill.color ?? 'var(--color-accent)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-default select-none whitespace-nowrap transition-all duration-200"
      style={{
        border: `1px solid ${hovered ? safeColor + '60' : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? `${safeColor}0D` : 'rgba(19,19,31,0.6)',
      }}
    >
      {/* Tech icon or color dot */}
      {(() => {
        const icon = getTechIcon(skill.name, 16)
        return icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : (
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: safeColor }} />
        )
      })()}

      {/* Skill name */}
      <span className="text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">
        {skill.name}
      </span>

      {/* Level badge */}
      <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', levelStyle.className)}>
        {levelStyle.label}
      </span>
    </motion.div>
  )
}
