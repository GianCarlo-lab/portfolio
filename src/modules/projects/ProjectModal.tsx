import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, AlertCircle, Lightbulb, GitBranch, Zap, CheckCircle, BookOpen,
  Layers, Globe, ShoppingCart, Eye,
  type LucideIcon,
} from 'lucide-react'
import type { Project } from './projects.types'
import { ProjectStack } from './ProjectStack'
import { cn } from '@/utils/cn'

const ICON_MAP: Record<string, LucideIcon> = { Layers, Globe, ShoppingCart, Eye }

const GRADIENT_MAP: Record<string, string> = {
  'from-indigo-500/20 to-purple-500/20':
    'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.25) 100%)',
  'from-cyan-500/20 to-blue-500/20':
    'linear-gradient(135deg, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.25) 100%)',
  'from-amber-500/20 to-orange-500/20':
    'linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(249,115,22,0.25) 100%)',
  'from-blue-500/20 to-indigo-500/20':
    'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.25) 100%)',
}

interface ModalSectionProps {
  icon: LucideIcon
  title: string
  iconClass?: string
  children: React.ReactNode
}

function ModalSection({ icon: Icon, title, iconClass = 'text-primary', children }: ModalSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="p-1.5 rounded-lg bg-white/5">
          <Icon size={16} className={iconClass} />
        </div>
        <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
      </div>
      {children}
      <div className="mt-5 h-px bg-[var(--color-border)]" />
    </div>
  )
}

function BulletList({ items, dotClass = 'bg-primary' }: { items: string[]; dotClass?: string }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-[var(--color-text-secondary)]">
          <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0', dotClass)} />
          {item}
        </li>
      ))}
    </ul>
  )
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!project) return null

  const Icon = ICON_MAP[project.icon] ?? Globe
  const gradientStyle =
    GRADIENT_MAP[project.gradient] ?? GRADIENT_MAP['from-indigo-500/20 to-purple-500/20']

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="absolute right-0 top-0 h-full overflow-y-auto"
            style={{
              width: 'min(680px, 100vw)',
              background: 'var(--color-bg-secondary)',
              borderLeft: '1px solid rgba(99,102,241,0.15)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {/* Header with gradient */}
            <div
              className="px-8 pt-10 pb-8 flex flex-col gap-4"
              style={{ background: gradientStyle }}
            >
              <div className="p-4 rounded-2xl bg-white/10 w-fit">
                <Icon size={36} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] pr-10">
                {project.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 font-medium"
                    style={tag.color ? { background: `${tag.color}30` } : undefined}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="px-8 py-6 flex flex-col gap-5">
              {/* Tech stack */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                  Stack tecnológico
                </p>
                <ProjectStack technologies={project.technologies} maxVisible={20} />
                <div className="mt-5 h-px bg-[var(--color-border)]" />
              </div>

              {/* Problem */}
              <ModalSection icon={AlertCircle} title="El problema" iconClass="text-amber-400">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.problem}
                </p>
              </ModalSection>

              {/* Solution */}
              <ModalSection icon={Lightbulb} title="La solución" iconClass="text-emerald-400">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.solution}
                </p>
              </ModalSection>

              {/* Architecture */}
              <ModalSection icon={GitBranch} title="Arquitectura" iconClass="text-primary">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.architecture}
                </p>
              </ModalSection>

              {/* Challenges */}
              <ModalSection icon={Zap} title="Retos técnicos" iconClass="text-yellow-400">
                <BulletList items={project.challenges} dotClass="bg-yellow-400" />
              </ModalSection>

              {/* Results */}
              <ModalSection icon={CheckCircle} title="Resultados" iconClass="text-emerald-400">
                <BulletList items={project.results} dotClass="bg-emerald-400" />
              </ModalSection>

              {/* Learnings - no bottom divider needed on last */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <BookOpen size={16} className="text-secondary" />
                  </div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Aprendizajes</h4>
                </div>
                <BulletList items={project.learnings} dotClass="bg-secondary" />
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
