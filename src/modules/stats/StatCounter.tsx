import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, Code2, Layers, CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import type { StatItem } from './stats.types'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Code2,
  Layers,
  CheckCircle,
}

interface StatCounterProps {
  stat: StatItem
  isActive: boolean
}

export function StatCounter({ stat, isActive }: StatCounterProps) {
  const count = useAnimatedCounter(stat.value, 1800, 0, isActive)
  const Icon = ICON_MAP[stat.icon] ?? Briefcase
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlassCard className="p-6 flex flex-col items-center text-center gap-3 h-full" hoverable>
        {/* Icon */}
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon size={32} className="text-primary" />
        </div>

        {/* Animated number */}
        <div className="flex items-end gap-1 leading-none">
          <span className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
            {count}
          </span>
          <span className="text-2xl font-bold text-primary mb-0.5">{stat.suffix}</span>
        </div>

        {/* Label */}
        <p className="font-semibold text-[var(--color-text-primary)] text-sm leading-snug">
          {stat.label}
        </p>

        {/* Description */}
        <p className="text-xs text-[var(--color-text-muted)]">{stat.description}</p>

        {/* Animated bottom accent line */}
        <motion.div
          className="h-0.5 rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: hovered ? 40 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </GlassCard>
    </motion.div>
  )
}
