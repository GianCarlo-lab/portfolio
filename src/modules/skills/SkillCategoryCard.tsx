import {
  Monitor, Server, Database, Cloud, Wrench, FileText,
  type LucideIcon,
} from 'lucide-react'
import type { SkillCategory } from './skills.types'
import { SkillPill } from './SkillPill'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Wrench,
  FileText,
}

interface SkillCategoryCardProps {
  category: SkillCategory
  index: number
}

export function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const Icon = ICON_MAP[category.icon] ?? Monitor

  return (
    <RevealOnScroll variant="scaleIn" delay={index * 0.08}>
      <GlassCard className="p-5 h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon size={18} className="text-primary" />
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">
              {category.label}
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            {category.skills.length} tecnologías
          </span>
        </div>

        {/* Separator */}
        <div className="h-px bg-[var(--color-border)]" />

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <SkillPill key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </GlassCard>
    </RevealOnScroll>
  )
}
