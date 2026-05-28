import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, FileText, Cpu, Layers, AlertCircle, Lightbulb,
  CheckCircle2, BookOpen, Globe, ShoppingCart, Eye,
  type LucideIcon,
} from 'lucide-react'
import type { Project } from './projects.types'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { getTechIcon } from '@/utils/techIcons'
import { cn } from '@/utils/cn'
import { ErpArchitectureDemo } from './demos/ErpArchitectureDemo'
import { ReactQuarkusArchitectureDemo } from './demos/ReactQuarkusArchitectureDemo'
import { EcommerceArchitectureDemo } from './demos/EcommerceArchitectureDemo'
import { FaceApiArchitectureDemo } from './demos/FaceApiArchitectureDemo'
import { DefaultArchitectureDemo } from './demos/DefaultArchitectureDemo'

type Tab = 'info' | 'demo' | 'stack'

const ICON_MAP: Record<string, LucideIcon> = { Layers, Globe, ShoppingCart, Eye }

const GRADIENT_MAP: Record<string, string> = {
  'from-indigo-500/20 to-purple-500/20':
    'linear-gradient(135deg, rgba(99,102,241,0.45) 0%, rgba(168,85,247,0.45) 100%)',
  'from-cyan-500/20 to-blue-500/20':
    'linear-gradient(135deg, rgba(6,182,212,0.45) 0%, rgba(59,130,246,0.45) 100%)',
  'from-amber-500/20 to-orange-500/20':
    'linear-gradient(135deg, rgba(245,158,11,0.45) 0%, rgba(249,115,22,0.45) 100%)',
  'from-blue-500/20 to-indigo-500/20':
    'linear-gradient(135deg, rgba(59,130,246,0.45) 0%, rgba(99,102,241,0.45) 100%)',
}

const PROJECT_METRICS: Record<string, [string, string][]> = {
  'erp-distribucion': [
    ['10+', 'Módulos'],
    ['18', 'Plantillas Excel'],
    ['4', 'Capas arquitectura'],
  ],
  'plataforma-react': [
    ['2', 'Devs'],
    ['JWT', 'Auth'],
    ['REST', 'APIs'],
  ],
  'ecommerce-gotech': [
    ['1', 'Tienda'],
    ['WooCommerce', 'Engine'],
    ['SEO', 'Optimizado'],
  ],
  'reconocimiento-facial': [
    ['Azure', 'API'],
    ['Real-time', 'Procesamiento'],
    ['Face', 'Detection'],
  ],
}

const STACK_CATEGORIES: Record<string, Record<string, string[]>> = {
  'erp-distribucion': {
    Frontend: ['MAUI Blazor', 'JS Interop'],
    Backend: ['ASP.NET Core', 'C#'],
    'Base de datos': ['SQL Server', 'Dapper'],
    Herramientas: ['ClosedXML', 'QuestPDF', 'Git'],
  },
  'plataforma-react': {
    Frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    Backend: ['Java', 'Quarkus', 'REST API'],
    Autenticación: ['JWT'],
  },
  'ecommerce-gotech': {
    Frontend: ['HTML5', 'CSS', 'JavaScript'],
    Backend: ['PHP'],
    'Base de datos': ['MySQL'],
    Plataforma: ['WordPress', 'WooCommerce'],
  },
  'reconocimiento-facial': {
    Frontend: ['React.js', 'JavaScript'],
    Cloud: ['Azure Cognitive Services', 'Face API'],
    Integración: ['REST API'],
  },
}

const STACK_RATIONALE: Record<string, string> = {
  'erp-distribucion':
    'Blazor y .NET 9 fueron elegidos por la naturaleza empresarial del sistema, la necesidad de componentes reutilizables y la integración nativa con el ecosistema Microsoft ya establecido.',
  'plataforma-react':
    'Stack desacoplado para máxima flexibilidad. React por su ecosistema maduro en frontend, Quarkus por su arranque ultrarrápido y bajo consumo de memoria en backend.',
  'ecommerce-gotech':
    'WordPress + WooCommerce como base probada para e-commerce, extensible con PHP personalizado para adaptar la lógica de negocio específica sin reinventar la rueda.',
  'reconocimiento-facial':
    'Azure Cognitive Services elimina la necesidad de entrenar modelos propios. Integración REST directa desde React sin backend intermedio.',
}

function DemoRouter({ projectId }: { projectId: string }) {
  switch (projectId) {
    case 'erp-distribucion':
      return <ErpArchitectureDemo />
    case 'plataforma-react':
      return <ReactQuarkusArchitectureDemo />
    case 'ecommerce-gotech':
      return <EcommerceArchitectureDemo />
    case 'reconocimiento-facial':
      return <FaceApiArchitectureDemo />
    default:
      return <DefaultArchitectureDemo />
  }
}

// ─── Info tab ────────────────────────────────────────────────────────────────

function InfoTab({ project, metrics }: { project: Project; metrics: [string, string][] }) {
  return (
    <div className="flex flex-col gap-5">
      {metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {metrics.map(([value, label]) => (
            <GlassCard key={label} className="p-4 text-center">
              <div className="text-xl font-bold text-[var(--color-primary)] leading-none mb-1">
                {value}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] leading-tight">{label}</div>
            </GlassCard>
          ))}
        </div>
      )}

      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
            El problema
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.problem}</p>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-[var(--color-primary)] flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            La solución
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.solution}</p>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Retos técnicos
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {project.challenges.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-primary)]" />
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Resultados
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {project.results.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div
        className="rounded-2xl p-5 border"
        style={{ background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={14} className="text-[var(--color-primary)] flex-shrink-0" />
          <span className="text-sm font-semibold text-[var(--color-primary)]">¿Qué aprendí?</span>
        </div>
        <ul className="flex flex-col gap-2">
          {project.learnings.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-primary)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Stack tab ───────────────────────────────────────────────────────────────

function StackTab({
  project,
  categories,
  rationale,
}: {
  project: Project
  categories: Record<string, string[]>
  rationale: string
}) {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(categories).map(([category, techNames]) => {
        if (!techNames.length) return null
        return (
          <GlassCard key={category} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {techNames.map(name => {
                const tech = project.technologies.find(t => t.name === name)
                return (
                  <span
                    key={name}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)]"
                    style={tech?.color ? { borderColor: `${tech.color}30` } : undefined}
                  >
                    {getTechIcon(name, 17)}
                    {name}
                  </span>
                )
              })}
            </div>
          </GlassCard>
        )
      })}

      {rationale && (
        <div
          className="rounded-2xl p-5 border"
          style={{ background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.2)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">
            ¿Por qué este stack?
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{rationale}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main modal ──────────────────────────────────────────────────────────────

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setActiveTab('info')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [activeTab])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!project) return null

  const Icon = ICON_MAP[project.icon] ?? Globe
  const gradientBg = GRADIENT_MAP[project.gradient] ?? GRADIENT_MAP['from-indigo-500/20 to-purple-500/20']
  const metrics = PROJECT_METRICS[project.id] ?? []
  const stackCategories = STACK_CATEGORIES[project.id] ?? {}
  const rationale = STACK_RATIONALE[project.id] ?? ''

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: 'info', label: 'Info', icon: FileText },
    { id: 'demo', label: 'Demo', icon: Cpu },
    { id: 'stack', label: 'Stack', icon: Layers },
  ]

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

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="absolute right-0 top-0 h-full flex flex-col"
            style={{
              width: 'min(920px, 100vw)',
              background: 'var(--color-bg-secondary)',
              borderLeft: '1px solid rgba(99,102,241,0.15)',
            }}
          >
            {/* ── HEADER (140px fixed) ── */}
            <div
              className="flex-shrink-0 relative flex items-end px-7 pb-5"
              style={{ height: 140, background: gradientBg }}
            >
              <div className="absolute inset-0" style={{ background: 'rgba(10,10,15,0.55)' }} />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5 transition-all"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="relative z-10 flex items-end gap-4 w-full pr-12">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(99,102,241,0.2)',
                    border: '1px solid rgba(99,102,241,0.3)',
                  }}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-white leading-tight">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/80 text-white font-semibold flex-shrink-0">
                        Destacado
                      </span>
                    )}
                  </div>
                  <p className="text-white/55 text-xs mt-0.5 line-clamp-1">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag.name}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/65 font-medium"
                        style={tag.color ? { background: `${tag.color}22` } : undefined}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── TABS NAV (sticky) ── */}
            <div
              className="flex-shrink-0 flex"
              style={{
                background: 'var(--color-bg-secondary)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {tabs.map(({ id, label, icon: TabIcon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors relative',
                    activeTab === id
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  )}
                  style={activeTab === id ? { background: 'rgba(99,102,241,0.05)' } : undefined}
                >
                  <TabIcon size={14} />
                  {label}
                  {activeTab === id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── CONTENT (scrollable) ── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="p-8"
                >
                  {activeTab === 'info' && <InfoTab project={project} metrics={metrics} />}
                  {activeTab === 'demo' && <DemoRouter projectId={project.id} />}
                  {activeTab === 'stack' && (
                    <StackTab project={project} categories={stackCategories} rationale={rationale} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
