import { motion } from 'framer-motion'
import { Layers, Globe, ShoppingCart, Eye, type LucideIcon } from 'lucide-react'
import type { Project } from './projects.types'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { ProjectStack } from './ProjectStack'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { cn } from '@/utils/cn'

const ICON_MAP: Record<string, LucideIcon> = { Layers, Globe, ShoppingCart, Eye }

const GRADIENT_MAP: Record<string, string> = {
  'from-indigo-500/20 to-purple-500/20':
    'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.18) 100%)',
  'from-cyan-500/20 to-blue-500/20':
    'linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.18) 100%)',
  'from-amber-500/20 to-orange-500/20':
    'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.18) 100%)',
  'from-blue-500/20 to-indigo-500/20':
    'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.18) 100%)',
}

const GRADIENT_MAP_HOVER: Record<string, string> = {
  'from-indigo-500/20 to-purple-500/20':
    'linear-gradient(135deg, rgba(99,102,241,0.30) 0%, rgba(168,85,247,0.30) 100%)',
  'from-cyan-500/20 to-blue-500/20':
    'linear-gradient(135deg, rgba(6,182,212,0.30) 0%, rgba(59,130,246,0.30) 100%)',
  'from-amber-500/20 to-orange-500/20':
    'linear-gradient(135deg, rgba(245,158,11,0.30) 0%, rgba(249,115,22,0.30) 100%)',
  'from-blue-500/20 to-indigo-500/20':
    'linear-gradient(135deg, rgba(59,130,246,0.30) 0%, rgba(99,102,241,0.30) 100%)',
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const Icon = ICON_MAP[project.icon] ?? Globe
  const gradientStyle = GRADIENT_MAP[project.gradient] ?? GRADIENT_MAP['from-indigo-500/20 to-purple-500/20']
  const gradientHover = GRADIENT_MAP_HOVER[project.gradient] ?? GRADIENT_MAP_HOVER['from-indigo-500/20 to-purple-500/20']

  return (
    <RevealOnScroll variant="fadeInUp" delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="h-full"
        style={{ minHeight: 380 }}
      >
        <GlassCard
          className="h-full flex flex-col overflow-hidden cursor-pointer group"
          hoverable
          onClick={onClick}
        >
          {/* Gradient header 160px */}
          <motion.div
            className="flex items-center justify-center relative flex-shrink-0"
            style={{ height: 160, background: gradientStyle }}
            whileHover={{ background: gradientHover } as never}
            transition={{ duration: 0.25 }}
          >
            <Icon size={48} className="text-white/70" />
            {project.featured && (
              <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-primary/90 text-white font-semibold">
                Destacado
              </span>
            )}
          </motion.div>

          {/* Body */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span
                  key={tag.name}
                  className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]"
                  style={tag.color ? { borderColor: `${tag.color}50`, color: tag.color } : undefined}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug">
              {project.title}
            </h3>

            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 flex-1">
              {project.shortDescription}
            </p>

            <div className="h-px bg-[var(--color-border)]" />

            <ProjectStack technologies={project.technologies} maxVisible={4} />

            {/* Tab indicator */}
            <div className="flex items-center gap-1 text-[var(--color-text-muted)]">
              {(['Info', 'Demo', 'Stack'] as const).map((tab, i) => (
                <span key={tab} className="flex items-center gap-1 text-[10px]">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)] opacity-50" />
                  <span>{tab}</span>
                  {i < 2 && <span className="opacity-30 ml-0.5">·</span>}
                </span>
              ))}
            </div>

            {/* Footer CTA */}
            <div
              className={cn(
                'flex items-center gap-1.5 text-primary text-sm font-medium pt-0.5',
                'group-hover:gap-2.5 transition-all duration-200'
              )}
            >
              Explorar caso de estudio
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </RevealOnScroll>
  )
}
