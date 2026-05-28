import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories } from '@/data/skills.data'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { SkillCategoryCard } from './SkillCategoryCard'
import { SkillPill } from './SkillPill'
import { cn } from '@/utils/cn'

const ALL_TAB = 'all'

const totalSkills = skillCategories.reduce((acc, c) => acc + c.skills.length, 0)

export function Skills() {
  const [activeTab, setActiveTab] = useState(ALL_TAB)

  const tabs = [{ id: ALL_TAB, label: 'Todas' }, ...skillCategories.map((c) => ({ id: c.id, label: c.label }))]

  const filtered =
    activeTab === ALL_TAB
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionTitle
          label="Skills"
          title="Stack Técnico"
          subtitle="Tecnologías y herramientas que domino"
          align="left"
        />

        {/* Tab navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                  isActive
                    ? 'bg-primary border-primary text-white shadow-glow'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40 hover:text-[var(--color-text-primary)]',
                  !isActive && 'bg-white/[0.03]'
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Summary stat */}
        <p className="mt-8 text-sm mb-5 text-[var(--color-text-muted)]">
          {totalSkills}+ tecnologías en {skillCategories.length} categorías
        </p>

        {/* Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {activeTab === ALL_TAB ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((cat, i) => (
                  <SkillCategoryCard key={cat.id} category={cat} index={i} />
                ))}
              </div>
            ) : (
              <div className="w-full min-h-[300px]">
                {filtered.map((cat) => (
                  <div key={cat.id} className="p-8 rounded-2xl border border-[var(--color-border)] bg-white/[0.02]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-5">
                      {cat.skills.length} tecnologías
                    </p>
                    <div className="flex flex-wrap gap-3 items-start">
                      {cat.skills.map((skill, i) => (
                        <SkillPill key={skill.name} skill={skill} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
