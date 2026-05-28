import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitPullRequest, MessageSquare, CheckCircle2, GitMerge } from 'lucide-react'
import { getTechIcon } from '@/utils/techIcons'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Git graph data ───────────────────────────────────────────────────────────

interface Commit {
  cx: number; cy: number; color: string; msg: string; delay: number
}

// 3 branches: main (y=22), develop (y=60), feature (y=95)
const COMMITS: Commit[] = [
  { cx: 28,  cy: 22,  color: '#22C55E', msg: 'initial: project setup',               delay: 0.15 },
  { cx: 90,  cy: 60,  color: '#6366F1', msg: 'chore: project structure',              delay: 0.45 },
  { cx: 155, cy: 95,  color: '#06B6D4', msg: 'feat: create sales module UI',          delay: 0.75 },
  { cx: 230, cy: 95,  color: '#06B6D4', msg: 'feat: add Excel export (ClosedXML)',    delay: 1.0  },
  { cx: 295, cy: 95,  color: '#06B6D4', msg: 'fix: correct currency format',          delay: 1.2  },
  { cx: 350, cy: 95,  color: '#06B6D4', msg: 'test: add sales module tests',          delay: 1.4  },
  { cx: 415, cy: 60,  color: '#6366F1', msg: 'merge: feature/excel-export → develop', delay: 1.6  },
  { cx: 470, cy: 60,  color: '#6366F1', msg: 'feat: add inventory base module',       delay: 1.8  },
  { cx: 540, cy: 22,  color: '#22C55E', msg: 'v1.0.0 — release: ERP módulo ventas',  delay: 2.0  },
]

// ─── Confetti data ────────────────────────────────────────────────────────────

const CONFETTI_DATA = [
  { dx: -90, dy: -60, color: '#6366F1', size: 7 },
  { dx: -55, dy: -100, color: '#8B5CF6', size: 5 },
  { dx: -10, dy: -110, color: '#22C55E', size: 8 },
  { dx: 35,  dy: -95,  color: '#06B6D4', size: 5 },
  { dx: 80,  dy: -60,  color: '#F59E0B', size: 6 },
  { dx: 105, dy: -15,  color: '#F43F5E', size: 4 },
  { dx: 95,  dy: 40,   color: '#6366F1', size: 6 },
  { dx: 55,  dy: 75,   color: '#22C55E', size: 7 },
  { dx: 5,   dy: 85,   color: '#8B5CF6', size: 4 },
  { dx: -50, dy: 70,   color: '#06B6D4', size: 5 },
  { dx: -95, dy: 35,   color: '#F59E0B', size: 6 },
  { dx: -110, dy: -20, color: '#F43F5E', size: 4 },
]

// ─── Tools grid data ──────────────────────────────────────────────────────────

const TOOLS = [
  { name: 'Git',     icon: 'Git',    desc: 'Branching por feature, commits descriptivos' },
  { name: 'GitHub',  icon: 'GitHub', desc: 'PRs, code review, issues tracking' },
  { name: 'Jira',    icon: 'Jira',   desc: 'Sprints, backlog, seguimiento de tareas' },
  { name: 'Figma',   icon: 'Figma',  desc: 'Revisión de diseños con el equipo' },
  { name: 'Postman', icon: 'Postman',desc: 'Contratos y testing de APIs' },
  { name: 'Scrum',   icon: '',       desc: 'Dailies, planning, retrospectivas' },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function TeamworkDemo() {
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [merged, setMerged] = useState(false)

  const confetti = useMemo(() => CONFETTI_DATA, [])

  return (
    <div className="flex flex-col gap-8 w-full overflow-x-hidden">

      {/* ── PARTE A: Git workflow SVG ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Feature branch workflow
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          {[
            { color: '#22C55E', label: 'main' },
            { color: '#6366F1', label: 'develop' },
            { color: '#06B6D4', label: 'feature/excel-export' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ background: color }} />
              <span className="text-[11px] text-[var(--color-text-muted)]">{label}</span>
            </div>
          ))}
        </div>

        {/* SVG graph */}
        <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'rgba(19,19,31,0.5)' }}>
          <svg viewBox="0 0 575 118" className="w-full" style={{ overflow: 'visible', padding: '8px 0' }}>

            {/* main horizontal line */}
            <motion.path d="M28,22 L540,22" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }} />

            {/* main → develop branch-off */}
            <motion.path d="M28,22 C50,22 90,38 90,60" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.35 }} />

            {/* develop horizontal */}
            <motion.path d="M90,60 L470,60" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }} />

            {/* develop → feature branch-off */}
            <motion.path d="M90,60 C120,60 155,78 155,95" stroke="#06B6D4" strokeWidth="1.8" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.65 }} />

            {/* feature horizontal */}
            <motion.path d="M155,95 L350,95" stroke="#06B6D4" strokeWidth="1.8" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }} />

            {/* feature → develop merge */}
            <motion.path d="M350,95 C385,95 415,78 415,60" stroke="#06B6D4" strokeWidth="1.8" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 1.35 }} />

            {/* develop → main merge */}
            <motion.path d="M470,60 C505,60 540,42 540,22" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 1.9 }} />

            {/* Commit dots */}
            {COMMITS.map((c, idx) => (
              <motion.circle
                key={idx}
                cx={c.cx} cy={c.cy} r={6.5} fill={c.color}
                style={{ cursor: 'pointer', filter: `drop-shadow(0 0 4px ${c.color}80)` }}
                initial={{ opacity: 0, r: 0 }} animate={{ opacity: 1, r: 6.5 }}
                transition={{ delay: c.delay, duration: 0.22, ease: 'backOut' }}
                onMouseEnter={() => setTooltip(c.msg)}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </svg>
        </div>

        {/* Tooltip */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {tooltip ? (
              <motion.span
                key={tooltip}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className="text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap"
                style={{ background: 'rgba(10,10,18,0.96)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--color-text-primary)' }}
              >
                {tooltip}
              </motion.span>
            ) : (
              <motion.span key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[11px] text-[var(--color-text-muted)]"
              >
                Hover sobre los commits para ver los mensajes
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── PARTE B: Pull Request simulation ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Simulación de Pull Request
        </p>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(99,102,241,0.25)' }}
        >
          {/* PR header */}
          <div className="px-5 py-4 flex items-start gap-3" style={{ background: 'rgba(99,102,241,0.06)', borderBottom: '1px solid var(--color-border)' }}>
            <GitPullRequest size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--color-text-primary)] text-sm">
                feat: Excel export en ventas
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                <span className="text-primary font-medium">GianCarlo-lab</span>
                {' '}quiere hacer merge{' '}
                <code className="text-cyan-400 text-[11px]">feature/excel-export</code>
                {' '}→{' '}
                <code className="text-emerald-400 text-[11px]">develop</code>
              </p>
            </div>
          </div>

          {/* Stats & checks */}
          <div className="px-5 py-3 flex flex-wrap gap-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
            {[
              { icon: <GitMerge size={13} />, text: '4 commits', color: '#6366F1' },
              { icon: <CheckCircle2 size={13} />, text: '+247 −12 líneas', color: '#22C55E' },
              { icon: <CheckCircle2 size={13} />, text: 'Tests pasando', color: '#22C55E' },
              { icon: <CheckCircle2 size={13} />, text: 'Sin conflictos', color: '#22C55E' },
            ].map(({ icon, text, color }, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs" style={{ color }}>
                {icon}
                {text}
              </span>
            ))}
          </div>

          {/* Comment thread */}
          <div className="px-5 py-4 flex flex-col gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex gap-2.5">
              <MessageSquare size={14} className="text-[var(--color-text-muted)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-0.5">
                  Revisor · <span className="text-[var(--color-text-muted)]">hace 2h</span>
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  "Buen trabajo, considera extraer el helper de formato a{' '}
                  <code className="text-amber-400 text-[11px]">utils/</code>
                  {' '}para reutilizarlo."
                </p>
              </div>
            </div>
            <div className="flex gap-2.5 pl-4">
              <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-emerald-400 mb-0.5">
                  Tú · <span className="text-[var(--color-text-muted)]">hace 1h</span>
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  "Hecho ✓ Refactorizado en{' '}
                  <code className="text-cyan-400 text-[11px]">src/utils/excelFormatter.ts</code>
                  "
                </p>
              </div>
            </div>
          </div>

          {/* Merge button + confetti */}
          <div className="px-5 py-4 relative overflow-visible">
            <AnimatePresence>
              {merged && confetti.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: c.size, height: c.size,
                    background: c.color,
                    left: '50%', top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: c.dx, y: c.dy, opacity: 0, scale: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {!merged ? (
                <motion.button
                  key="btn"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setMerged(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: 'rgba(34,197,94,0.85)', border: '1px solid rgba(34,197,94,0.5)' }}
                >
                  <GitMerge size={16} />
                  Aprobar y hacer merge
                </motion.button>
              ) : (
                <motion.div
                  key="merged"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm font-semibold text-emerald-400"
                >
                  <CheckCircle2 size={18} />
                  ¡Merged exitosamente! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── PARTE C: Tools grid ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Herramientas de colaboración
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TOOLS.map((tool, i) => {
            const icon = tool.icon ? getTechIcon(tool.icon, 16) : null
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
              >
                <GlassCard className="flex flex-col gap-1.5 p-3 h-full">
                  <div className="flex items-center gap-2">
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                    {tool.desc}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
