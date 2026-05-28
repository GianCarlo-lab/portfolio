import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'
import { SiReact, SiTypescript, SiTailwindcss, SiFigma, SiQuarkus } from 'react-icons/si'
import { TbShieldLock, TbApi } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ri = (C: any, size: number, color: string) =>
  React.createElement(C, { size, color }) as React.ReactElement

const FRONTEND_LAYERS = [
  { label: 'Pages / Views', desc: 'React Router v6', color: '#61DAFB' },
  { label: 'Components', desc: 'Tailwind + React Hook Form', color: '#06B6D4' },
  { label: 'Services / Axios', desc: 'Interceptors + error handling', color: '#5A29E4' },
  { label: 'Context / State', desc: 'Estado global React', color: '#61DAFB' },
]

const BACKEND_LAYERS = [
  { label: 'REST Controllers', desc: 'Endpoints tipados', color: '#4695EB' },
  { label: 'Services', desc: 'Lógica de negocio', color: '#ED8B00' },
  { label: 'Repositories', desc: 'Panache ORM', color: '#4695EB' },
  { label: 'Database', desc: 'PostgreSQL', color: '#4169E1' },
]

const API_ARROWS = [
  { label: 'HTTP + JWT', dir: 'right' as const },
  { label: 'JSON Response', dir: 'left' as const },
  { label: 'Interceptors', dir: 'right' as const },
  { label: 'Error handling', dir: 'left' as const },
]

const TRANSVERSAL = [
  { icon: ri(TbShieldLock, 14, '#FB923C'), label: 'JWT Auth' },
  { icon: ri(SiFigma, 14, '#F24E1E'), label: 'Figma → Components' },
  { icon: ri(SiReact, 14, '#61DAFB'), label: 'React Testing Library' },
  { icon: ri(TbApi, 14, '#6366F1'), label: 'Jira Scrum' },
]

export function ReactQuarkusArchitectureDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 mb-1">
        <ArrowLeftRight size={15} className="text-[var(--color-primary)]" />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Arquitectura Frontend ↔ Backend desacoplado
        </h3>
      </div>

      {/* Main diagram */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
        {/* Frontend column */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border p-4 flex flex-col gap-3"
          style={{ background: 'rgba(97,218,251,0.04)', borderColor: 'rgba(97,218,251,0.2)' }}
        >
          <div className="flex items-center gap-2">
            {ri(SiReact, 22, '#61DAFB')}
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">React + TypeScript</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">SPA Frontend</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {ri(SiTypescript, 12, '#3178C6')}
            {ri(SiTailwindcss, 12, '#06B6D4')}
            {ri(SiFigma, 12, '#F24E1E')}
          </div>
          <div className="flex flex-col gap-1.5">
            {FRONTEND_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-lg px-3 py-2 border"
                style={{ background: `${layer.color}08`, borderColor: `${layer.color}25` }}
              >
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{layer.label}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrows column */}
        <div className="flex flex-col gap-3 pt-16 items-center w-16">
          {API_ARROWS.map((arrow, i) => (
            <motion.div
              key={arrow.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div
                className="text-[9px] font-medium px-1.5 py-0.5 rounded-full text-center"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  color: arrow.dir === 'right' ? '#818CF8' : '#34D399',
                  border: `1px solid ${arrow.dir === 'right' ? 'rgba(129,140,248,0.2)' : 'rgba(52,211,153,0.2)'}`,
                }}
              >
                {arrow.dir === 'left' ? '←' : '→'} {arrow.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Backend column */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border p-4 flex flex-col gap-3"
          style={{ background: 'rgba(70,149,235,0.04)', borderColor: 'rgba(70,149,235,0.2)' }}
        >
          <div className="flex items-center gap-2">
            {ri(FaJava, 20, '#ED8B00')}
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">Java Quarkus API</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">REST Backend</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {ri(SiQuarkus, 12, '#4695EB')}
            {ri(FaJava, 12, '#ED8B00')}
          </div>
          <div className="flex flex-col gap-1.5">
            {BACKEND_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-lg px-3 py-2 border"
                style={{ background: `${layer.color}08`, borderColor: `${layer.color}25` }}
              >
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{layer.label}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transversal row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border p-3"
        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Tecnologías transversales
        </p>
        <div className="flex flex-wrap gap-2">
          {TRANSVERSAL.map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border text-[var(--color-text-secondary)]"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
