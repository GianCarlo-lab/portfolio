import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects.data'
import type { Project } from './projects.types'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { cn } from '@/utils/cn'

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'Full Stack', label: 'Full Stack' },
  { id: 'ERP', label: 'ERP' },
  { id: 'E-commerce', label: 'E-commerce' },
  { id: 'IA', label: 'IA' },
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.tags.some((t) => t.name === activeFilter))

  const sorted = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          label="Proyectos"
          title="Proyectos"
          subtitle="Casos de estudio y trabajo real"
          align="left"
        />

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                activeFilter === f.id
                  ? 'bg-primary border-primary text-white shadow-glow'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40 hover:text-[var(--color-text-primary)] bg-white/[0.03]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid with layout animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {sorted.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
            {sorted.length === 0 && (
              <p className="text-[var(--color-text-muted)] text-sm col-span-2 py-8 text-center">
                No hay proyectos en esta categoría aún.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
