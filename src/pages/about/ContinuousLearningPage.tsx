import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Data ────────────────────────────────────────────────────────────────────

const MAX_WEEKS = 12

const TECHS = [
  { id: 'react', label: 'React avanzado', gian: 3 },
  { id: 'ts', label: 'TypeScript', gian: 2 },
  { id: 'backend', label: 'Backend .NET', gian: 2 },
  { id: 'db', label: 'Base de datos SQL', gian: 2 },
  { id: 'cloud', label: 'Cloud Azure', gian: 1 },
  { id: 'projects', label: 'Proyectos reales', gian: 2 },
]

const TIMELINE_NODES = [
  {
    year: '2023',
    org: 'Cibertec',
    what: 'Fundamentos',
    knew: 'HTML, CSS básico, algo de JavaScript',
    built: 'Landing pages estáticas, formularios simples',
    changed: 'Entendí que el frontend no es solo diseño — hay lógica detrás de cada interacción.',
  },
  {
    year: '2024',
    org: 'Gotech',
    what: 'React + .NET',
    knew: 'React básico con hooks, C# principiante',
    built: 'Dashboard de ventas, API REST con .NET 6, integración con SQL Server',
    changed: 'Por primera vez vi el sistema completo: del formulario en React hasta el dato en la BD. Eso cambió cómo pienso cualquier feature.',
  },
  {
    year: '2025',
    org: 'Grupo Centro Tecnológico',
    what: 'Producción real',
    knew: 'React con TypeScript, .NET con Entity Framework, SQL Server avanzado',
    built: 'Sistema de ventas con reportes Excel, módulo de clientes, integración con Figma para diseño de componentes',
    changed: 'Aprendí que escribir código que funciona y escribir código que los demás pueden mantener son dos habilidades completamente distintas.',
  },
  {
    year: '2026',
    org: 'RADAR ERP',
    what: 'Ownership fullstack',
    knew: 'Fullstack React + .NET + SQL, Blazor básico, diseño de sistemas',
    built: 'Módulo completo de Abastecimiento: schema SQL, API REST, Blazor UI, reportes Excel',
    changed: 'Aprendí Blazor en 2 semanas leyendo documentación oficial y construyendo features reales. Sin curso, sin mentor. Solo documentación + errores + soluciones.',
  },
]

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 20], message: "La distribución tiene margen de mejora. Reflexiona sobre qué necesitas más para el siguiente nivel.", color: '#F59E0B' },
  { range: [21, 40], message: "Buena intención. La mezcla de teoría y práctica te llevará más lejos.", color: '#06B6D4' },
  { range: [41, 55], message: "Distribución sólida. Frontend + Backend + BD es el triángulo mínimo viable.", color: '#10B981' },
  { range: [56, 60], message: "¡Muy cerca de la distribución óptima! Así es como Gian distribuye su tiempo.", color: '#6366F1' },
]

// ── Exercise 1: Time Distribution ────────────────────────────────────────────

function TimeDistribution({ onComplete }: { onComplete: (pts: number) => void }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(TECHS.map(t => [t.id, 0]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [pts, setPts] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'warn' | 'ok'; msg: string }[]>([])

  const total = Object.values(values).reduce((a, b) => a + b, 0)

  const handleChange = (id: string, raw: number) => {
    const others = TECHS.filter(t => t.id !== id).reduce((s, t) => s + (values[t.id] ?? 0), 0)
    const capped = Math.min(raw, MAX_WEEKS - others)
    setValues(prev => ({ ...prev, [id]: capped }))
  }

  const handleSubmit = () => {
    const msgs: { type: 'warn' | 'ok'; msg: string }[] = []

    if (values['projects'] === 0) {
      msgs.push({ type: 'warn', msg: "Sin proyectos reales, el conocimiento teórico no se consolida. Puedes saber todo sobre React y no saber cómo estructurar una app real." })
    }

    const overSpec = TECHS.find(t => (values[t.id] ?? 0) > 4)
    if (overSpec) {
      msgs.push({ type: 'warn', msg: `La hiperespecialización temprana en ${overSpec.label} limita las oportunidades. Un fullstack diversificado puede atacar cualquier problema.` })
    }

    if (msgs.length === 0) {
      msgs.push({ type: 'ok', msg: "Buena distribución. Frontend + Backend + BD es el triángulo mínimo viable para un fullstack productivo." })
    }

    let score = 60
    TECHS.forEach(t => {
      const diff = Math.abs((values[t.id] ?? 0) - t.gian)
      score -= diff * 4
    })
    score = Math.max(0, Math.min(60, score))
    setPts(score)
    setFeedback(msgs)
    setSubmitted(true)
    onComplete(score)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sliders */}
      <GlassCard className="p-5">
        <div className="flex flex-col gap-4">
          {TECHS.map(t => (
            <div key={t.id} className="flex items-center gap-4">
              <span className="text-xs text-[var(--color-text-secondary)] w-36 flex-shrink-0">{t.label}</span>
              <input
                type="range" min={0} max={MAX_WEEKS}
                value={values[t.id] ?? 0}
                disabled={submitted}
                onChange={e => handleChange(t.id, Number(e.target.value))}
                className="flex-1 accent-[#6366F1]"
              />
              <span className="text-xs font-mono font-semibold w-16 text-right" style={{ color: '#6366F1' }}>
                {values[t.id] ?? 0} sem
              </span>
              {submitted && (
                <span className="text-xs font-mono text-[var(--color-text-muted)] w-16 text-right">
                  Gian: {t.gian}
                </span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">
          <span className="font-semibold" style={{ color: total === MAX_WEEKS ? '#10B981' : total > 0 ? '#6366F1' : 'var(--color-text-muted)' }}>
            {total}
          </span>
          {' '}semanas asignadas de {MAX_WEEKS}
        </p>
        {total > 0 && !submitted && (
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: '#6366F1' }}
          >
            Ver análisis →
          </button>
        )}
      </div>

      {/* Feedback messages */}
      {submitted && (
        <div className="flex flex-col gap-3">
          {feedback.map((f, i) => (
            <div
              key={i}
              className="flex gap-2 p-3 rounded-xl"
              style={{
                background: f.type === 'ok' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                border: `1px solid ${f.type === 'ok' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
              }}
            >
              {f.type === 'ok'
                ? <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                : <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
              }
              <p className="text-xs leading-relaxed" style={{ color: f.type === 'ok' ? '#6EE7B7' : '#FCD34D' }}>
                {f.msg}
              </p>
            </div>
          ))}
          <p className="text-sm font-semibold" style={{ color: pts >= 45 ? '#10B981' : '#F59E0B' }}>
            {pts}/60 pts — similitud con la distribución de Gian
          </p>
        </div>
      )}

      {/* Comparison bars */}
      {submitted && (
        <GlassCard className="p-5">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-4">Comparación semana a semana</p>
          <div className="flex flex-col gap-3">
            {TECHS.map(t => {
              const userVal = values[t.id] ?? 0
              const userPct = (userVal / MAX_WEEKS) * 100
              const gianPct = (t.gian / MAX_WEEKS) * 100
              return (
                <div key={t.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[var(--color-text-muted)]">{t.label}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">Tú: {userVal} | Gian: {t.gian}</span>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="absolute top-0 left-0 h-full rounded-full opacity-50" style={{ width: `${gianPct}%`, background: '#6366F1' }} />
                    <div className="absolute top-0 left-0 h-full rounded-full" style={{ width: `${userPct}%`, background: '#10B981', opacity: 0.8 }} />
                  </div>
                </div>
              )
            })}
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-2 rounded-full bg-green-500 opacity-80" />
                <span className="text-xs text-[var(--color-text-muted)]">Tú</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-2 rounded-full opacity-50" style={{ background: '#6366F1' }} />
                <span className="text-xs text-[var(--color-text-muted)]">Gian</span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  )
}

// ── Timeline ──────────────────────────────────────────────────────────────────

function LearningTimeline() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-4">
      {TIMELINE_NODES.map((node, i) => (
        <div key={node.year}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border transition-all text-left"
            style={{
              background: open === i ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.03)',
              borderColor: open === i ? 'rgba(99,102,241,0.3)' : 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold" style={{ color: '#6366F1' }}>{node.year}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{node.org}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{node.what}</p>
              </div>
            </div>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard className="p-5 mt-2">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">¿Qué sabía?</p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{node.knew}</p>
                    </div>
                    <div className="h-px" style={{ background: 'var(--color-border)' }} />
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">¿Qué construí?</p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{node.built}</p>
                    </div>
                    <div className="h-px" style={{ background: 'var(--color-border)' }} />
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: '#6366F1' }}>¿Qué me cambió la forma de pensar?</p>
                      <p className="text-sm leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>"{node.changed}"</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function ContinuousLearningPage() {
  const [ex1Score, setEx1Score] = useState<number | null>(null)

  return (
    <AboutPageLayout
      title="Aprendizaje Continuo"
      description="Sin mentor, sin cursos obligatorios. Aprendo leyendo documentación oficial, cometiendo errores y construyendo cosas reales."
      valueNumber="03"
      accentColor="#10B981"
      prevPath="/sobre-mi/atencion-al-detalle"
      prevLabel="Atención al detalle"
      nextPath="/sobre-mi/vision-fullstack"
      nextLabel="Visión Fullstack"
    >
      <div className="flex flex-col gap-10">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #10B981' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "Empecé con WordPress. Después Java. Después me metí a React sin saber por qué, solo sabía que era lo que se usaba.
            En RADAR aprendí Blazor en 2 semanas — sin curso, sin mentor. Solo documentación oficial, errores de compilador y features reales entregadas.
            Eso es lo que significa aprender en serio: no estudiar para aprobar un examen, sino construir cosas que no funcionan hasta que funcionan."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#10B981' }}>— Gian, 2023–2026</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#10B981' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['Autodidacta', 'Learn by doing', 'Documentación oficial primero'].map(p => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Exercise 1 */}
        <GlassCard className="p-6">
          <ChallengeCard
            number={1}
            total={1}
            title="Distribuye 12 semanas de aprendizaje"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                Tienes 12 semanas para aprender. No tienes que usar todas. Reflexiona sobre qué priorizarías para convertirte en fullstack productivo.
              </span>
            }
            question="¿Cómo distribuirías tu tiempo para maximizar el aprendizaje fullstack en 12 semanas?"
            points={60}
          >
            <TimeDistribution onComplete={setEx1Score} />
          </ChallengeCard>
        </GlassCard>

        {/* ScoreBoard */}
        <AnimatePresence>
          {ex1Score !== null && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ScoreBoard
                userScore={ex1Score}
                maxScore={60}
                gianScore={60}
                feedback={FEEDBACK}
                gianComment="Mi distribución real: React avanzado: 3 semanas, TypeScript: 2, Backend .NET: 2, SQL: 2, Cloud Azure: 1, Proyectos reales: 2. El secreto es que los 'proyectos reales' consolidan todo lo demás. Sin eso, el conocimiento no se instala."
                onReset={() => setEx1Score(null)}
                onNext={() => { window.location.href = '/sobre-mi/vision-fullstack' }}
                nextLabel="Siguiente: Visión Fullstack →"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <div>
          <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-5">Mi línea de aprendizaje</h4>
          <LearningTimeline />
        </div>

      </div>
    </AboutPageLayout>
  )
}
