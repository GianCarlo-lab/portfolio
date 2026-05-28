import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { getTechIcon } from '@/utils/techIcons'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Timeline data ────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '2026 — Presente',
    company: 'RADAR',
    color: '#6366F1',
    badge: 'Actual',
    icons: ['.NET 8', 'Blazor', 'SQL Server', 'Azure', 'ClosedXML', 'QuestPDF'],
    achievement: 'Sistema ERP con 10+ módulos en producción',
  },
  {
    year: '2025',
    company: 'Grupo Centro Tecnológico',
    color: '#06B6D4',
    badge: undefined,
    icons: ['React', 'TypeScript', 'Tailwind CSS', 'Java', 'JWT'],
    achievement: 'Primera experiencia en equipo Scrum real',
  },
  {
    year: '2024',
    company: 'Gotech (Freelance)',
    color: '#8B5CF6',
    badge: undefined,
    icons: ['WordPress', 'PHP'],
    achievement: 'Primer e-commerce en producción',
  },
  {
    year: '2023 — Inicio',
    company: 'Cibertec',
    color: '#475569',
    badge: undefined,
    icons: ['HTML5', 'JavaScript', 'CSS3', 'Git'],
    achievement: 'Fundamentos sólidos y primer proyecto personal',
  },
]

// ─── Bar chart data ───────────────────────────────────────────────────────────

const BARS = [
  { year: '2023', pct: 20, label: 'Inicio' },
  { year: '2024', pct: 45, label: 'Freelance' },
  { year: '2025', pct: 72, label: 'Equipo' },
  { year: '2026', pct: 95, label: 'ERP' },
]

// ─── Upcoming technologies ────────────────────────────────────────────────────

const UPCOMING = [
  { name: 'Docker & DevOps',       badge: 'En progreso', pct: 35, color: '#2496ED' },
  { name: 'AWS Cloud',             badge: 'Próximamente', pct: 10, color: '#FF9900' },
  { name: 'React Native',          badge: 'Próximamente', pct: 5,  color: '#61DAFB' },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function LearningDemo() {
  return (
    <div className="flex flex-col gap-8 w-full overflow-x-hidden">

      {/* ── PARTE A: Timeline ── */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Mi evolución como desarrollador
        </p>

        {TIMELINE.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex gap-4 pb-4 last:pb-0"
          >
            {/* Rail */}
            <div className="flex flex-col items-center w-5 flex-shrink-0">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{ background: item.color, boxShadow: `0 0 10px ${item.color}70` }}
              />
              {i < TIMELINE.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                  className="w-px flex-1 mt-1 origin-top"
                  style={{
                    background: `linear-gradient(to bottom, ${item.color}50, ${TIMELINE[i + 1].color}25)`,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold" style={{ color: item.color }}>
                  {item.year}
                </span>
                {item.badge && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-[var(--color-text-muted)]">{item.company}</p>

              {/* Tech icons */}
              <div className="flex flex-wrap gap-2">
                {item.icons.map((name) => {
                  const icon = getTechIcon(name, 15)
                  return icon ? (
                    <span
                      key={name}
                      title={name}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]"
                    >
                      {icon}
                      {name}
                    </span>
                  ) : null
                })}
              </div>

              {/* Achievement */}
              <GlassCard className="flex items-center gap-2.5 px-3 py-2">
                <Trophy size={13} className="flex-shrink-0" style={{ color: item.color }} />
                <span className="text-xs text-[var(--color-text-secondary)]">{item.achievement}</span>
              </GlassCard>
            </div>
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xs italic mt-1 pl-9"
          style={{ color: 'var(--color-accent)' }}
        >
          Y esto no para aquí.
        </motion.p>
      </div>

      {/* ── PARTE B: Learning curve bar chart ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Curva de complejidad de proyectos
        </p>
        <GlassCard className="p-5">
          <div className="flex items-end gap-3 h-28">
            {BARS.map((bar, i) => (
              <div key={bar.year} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[10px] text-[var(--color-text-muted)]">{bar.label}</span>
                <div className="w-full rounded-t-lg overflow-hidden flex items-end" style={{ height: '80px' }}>
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{
                      background: `linear-gradient(to top, rgba(99,102,241,0.4), rgba(99,102,241,0.8))`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.pct}%` }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                  {bar.year}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ── PARTE C: Upcoming ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          ¿Qué sigue?
        </p>
        <div className="flex flex-col gap-2">
          {UPCOMING.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.3 }}
            >
              <GlassCard className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {item.name}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: item.color }}>
                  {item.pct}%
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
