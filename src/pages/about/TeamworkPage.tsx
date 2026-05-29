import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, GitBranch, MessageSquare, CheckCircle2, Clock, Users } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { getTechIcon } from '@/utils/techIcons'

// ── Data ────────────────────────────────────────────────────────────────────

const TICKETS = [
  { id: 'FORCE-234', title: 'Filtro de fechas en ventas', pts: 5, type: 'feat', done: true },
  { id: 'FORCE-235', title: 'Export Excel inventario', pts: 8, type: 'feat', done: true },
  { id: 'FORCE-236', title: 'Fix bug precio NaN', pts: 2, type: 'fix', done: true },
]

const COMMITS = [
  { hash: 'a3f2c1e', type: 'feat', msg: 'add date range filter to sales form', time: '10:23' },
  { hash: 'b7d4e2f', type: 'feat', msg: 'implement inventory Excel export', time: '14:05' },
  { hash: 'c1a8f3b', type: 'fix', msg: 'prevent NaN in price when quantity is zero', time: '16:30' },
  { hash: 'd5e9c4a', type: 'refactor', msg: 'extract ExcelHelper to utils/', time: '17:12' },
]

const COMMIT_COLORS: Record<string, string> = {
  feat: '#10B981',
  fix: '#EF4444',
  refactor: '#8B5CF6',
  chore: '#94A3B8',
  docs: '#06B6D4',
}

const PR_COMMENTS = [
  {
    author: 'Compañero',
    avatar: 'CA',
    color: '#8B5CF6',
    text: '¿Por qué usas `item.date` aquí? El backend lo renombró a `createdAt` en el último sprint.',
    type: 'question',
  },
  {
    author: 'Gian',
    avatar: 'GB',
    color: '#6366F1',
    text: 'Buena captura. Actualicé a `item.createdAt` y agregué un alias en el tipo para mantener retrocompatibilidad. También renombré las variables locales para que sean más descriptivas.',
    type: 'reply',
    resolved: true,
  },
]

const TOOLS = [
  { name: 'Git', icon: 'Git / GitHub', desc: 'Cada feature en su rama. Commits semánticos. Historial limpio.' },
  { name: 'GitHub', icon: 'Git / GitHub', desc: 'Pull Requests con descripción detallada. Code review antes de mergear.' },
  { name: 'Jira', icon: 'Jira', desc: 'Tickets bien especificados. Story points reales. Sprint planning honesto.' },
  { name: 'Figma', icon: 'Figma', desc: 'Diseño como fuente de verdad. Componentes pixel-perfect.' },
  { name: 'Postman', icon: 'Postman', desc: 'Colecciones de API compartidas con el equipo.' },
]

// ── Components ────────────────────────────────────────────────────────────────

function DayCard({ day, children, accent = '#6366F1' }: { day: string; label: string; children: React.ReactNode; accent?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.3 }}>
      <GlassCard className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>{day}</p>
        {children}
      </GlassCard>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function TeamworkPage() {
  useScrollToTop()
  const [activeDay, setActiveDay] = useState<string>('all')

  const days = [
    { id: 'planning', label: 'Lunes', short: 'Lun' },
    { id: 'dev', label: 'Mar–Mié', short: 'Mar–Mié' },
    { id: 'review', label: 'Jueves', short: 'Jue' },
    { id: 'retro', label: 'Viernes', short: 'Vie' },
  ]

  return (
    <AboutPageLayout
      title="Trabajo en Equipo"
      description="El código que otros pueden leer, revisar y mantener es la forma más concreta de respeto en un equipo de desarrollo."
      valueNumber="05"
      accentColor="#EC4899"
      prevPath="/sobre-mi/vision-fullstack"
      prevLabel="Visión Fullstack"
    >
      <div className="flex flex-col gap-12 w-full">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #EC4899' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "En Grupo Centro Tecnológico éramos dos: yo en frontend, mi compañero en backend.
            Hacíamos daily standups de 10 minutos — cortos pero constantes. Cada PR tenía al menos un review
            antes de mergear. Cuando mi compañero renombró un campo del backend sin avisar, lo detecté
            en el code review antes de que llegara a producción. Eso es lo que significa trabajar en equipo:
            revisar el código del otro como si fuera tuyo."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#EC4899' }}>— Gian, Grupo Centro Tecnológico</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#EC4899' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['Comunicación > código', 'PRs que enseñan', 'Scrum en serio'].map(p => (
            <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(236,72,153,0.12)', color: '#F9A8D4', border: '1px solid rgba(236,72,153,0.25)' }}>
              {p}
            </span>
          ))}
        </div>

        {/* Sprint Week */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Un sprint real con Scrum</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Una semana de trabajo basada en experiencia real en GCT.</p>

          <div className="flex flex-col gap-4">

            {/* LUNES — Planning */}
            <DayCard day="Lunes — Planning" label="planning" accent="#EC4899">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-xs text-[var(--color-text-muted)]">Sprint goal: completar módulo de reportes</span>
                </div>
                <div className="flex flex-col gap-2">
                  {TICKETS.map(t => (
                    <div key={t.id} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{t.id}</span>
                        <span className="text-xs text-[var(--color-text-secondary)] truncate">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: t.type === 'fix' ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.15)', color: t.type === 'fix' ? '#FCA5A5' : '#A5B4FC' }}>
                          {t.type}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: '#F59E0B' }}>{t.pts}pts</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-3">Total estimado: {TICKETS.reduce((s, t) => s + t.pts, 0)} story points</p>
              </div>
            </DayCard>

            {/* MARTES-MIÉRCOLES — Desarrollo */}
            <DayCard day="Martes–Miércoles — Desarrollo" label="dev" accent="#6366F1">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-xs text-[var(--color-text-muted)]">feature/reportes-modulo</span>
                </div>
                <div className="flex flex-col gap-2">
                  {COMMITS.map(c => (
                    <div key={c.hash} className="flex items-center gap-3">
                      <Clock size={11} className="flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                      <span className="text-xs text-[var(--color-text-muted)] w-10 flex-shrink-0">{c.time}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0" style={{ background: `${COMMIT_COLORS[c.type]}20`, color: COMMIT_COLORS[c.type] }}>
                        {c.type}
                      </span>
                      <span className="text-xs font-mono text-[var(--color-text-secondary)] truncate min-w-0">{c.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DayCard>

            {/* JUEVES — Code Review */}
            <DayCard day="Jueves — Code Review" label="review" accent="#F59E0B">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-xs font-medium text-[var(--color-text-primary)]">PR #47: feat/reportes-modulo → develop</span>
                </div>
                <div className="flex flex-col gap-3">
                  {PR_COMMENTS.map((comment, i) => (
                    <div key={i} className={`flex gap-3 ${comment.resolved ? 'opacity-80' : ''}`}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${comment.color}20`, color: comment.color }}>
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-semibold text-[var(--color-text-primary)]">{comment.author}</span>
                          {comment.resolved && (
                            <span className="flex items-center gap-1 text-xs" style={{ color: '#10B981' }}>
                              <CheckCircle2 size={10} /> Resuelto
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                  <span className="text-xs font-medium" style={{ color: '#10B981' }}>Approved — mergeado a develop</span>
                </div>
              </div>
            </DayCard>

            {/* VIERNES — Retro */}
            <DayCard day="Viernes — Demo + Retrospectiva" label="retro" accent="#10B981">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">3 tickets completados ✅</span>
                </div>
                <div className="flex flex-col gap-2 pl-4">
                  {[
                    'Demo del filtro de fechas y export Excel al cliente',
                    '1 impedimento resuelto: conflicto de campo renombrado detectado en PR',
                    'Feedback para el próximo sprint: agregar validación en el backend también',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 text-xs text-[var(--color-text-secondary)]">
                      <span className="flex-shrink-0">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 flex-wrap gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <span className="text-xs text-[var(--color-text-muted)]">Velocidad del sprint:</span>
                  <span className="text-sm font-bold" style={{ color: '#10B981' }}>15 / 15 story points</span>
                </div>
              </div>
            </DayCard>

          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">Herramientas de colaboración</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <GlassCard className="p-4 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      {getTechIcon(tool.icon, 18)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{tool.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </AboutPageLayout>
  )
}
