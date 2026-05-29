import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, GitMerge } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Data ────────────────────────────────────────────────────────────────────

interface CommitTask {
  id: number
  scenario: string
  context: string
  options: { id: string; label: string; pts: number; feedback: string }[]
}

const COMMIT_TASKS: CommitTask[] = [
  {
    id: 1,
    scenario: "Agregaste validación de fechas al formulario de ventas",
    context: "El campo de fecha ahora no acepta fechas futuras ni anteriores a 2020.",
    options: [
      { id: 'A', label: 'fix: form validation', pts: 5, feedback: "Demasiado vago. ¿Qué formulario? ¿Qué validación? El mensaje no da contexto." },
      { id: 'B', label: 'update form', pts: 0, feedback: "Sin tipo semántico, sin contexto. Este mensaje no le dice nada a nadie en 3 meses." },
      { id: 'C', label: 'feat: add date validation to sales form', pts: 30, feedback: "¡Correcto! Tipo claro (feat), qué se hizo (add date validation), dónde (sales form)." },
      { id: 'D', label: 'sales form date fix v2', pts: 2, feedback: "Sin convención semántica, el 'v2' no tiene contexto y el 'fix' no está tipado." },
    ],
  },
  {
    id: 2,
    scenario: "El precio mostraba NaN cuando la cantidad era cero",
    context: "División por cero en el cálculo de precio unitario.",
    options: [
      { id: 'A', label: 'fix: prevent NaN in price when quantity is zero', pts: 30, feedback: "¡Correcto! Tipo (fix), qué se previene (NaN in price), condición exacta (quantity is zero)." },
      { id: 'B', label: 'fix: price calculation bug', pts: 10, feedback: "Mejor que nada, pero '¿qué bug?' queda sin respuesta. El mensaje no da contexto suficiente." },
      { id: 'C', label: 'bugfix precio', pts: 2, feedback: "Sin convención semántica y en español mezclado. No sigue la convención del equipo." },
      { id: 'D', label: 'fix precio cuando cantidad es 0', pts: 5, feedback: "Tiene el contexto pero no sigue Conventional Commits. Inconsistente con el resto del historial." },
    ],
  },
  {
    id: 3,
    scenario: "Dividiste el componente SalesTable en subcomponentes",
    context: "Ahora tienes TableHeader, TableRow y TablePagination como componentes separados.",
    options: [
      { id: 'A', label: 'refactor: split SalesTable into TableHeader, TableRow, TablePagination', pts: 30, feedback: "¡Correcto! Tipo (refactor), qué se hizo (split), qué se creó (los 3 componentes nombrados)." },
      { id: 'B', label: 'refactor: improve sales table structure', pts: 12, feedback: "Buena intención pero vago. ¿Cómo mejoró? ¿Qué cambió? El nombre no documenta la decisión." },
      { id: 'C', label: 'split table component', pts: 5, feedback: "Sin tipo semántico. ¿Split de qué? Falta contexto." },
      { id: 'D', label: 'feat: new table components', pts: 8, feedback: "Tipo incorrecto — refactor, no feat. No se agregó funcionalidad, se reorganizó el código existente." },
    ],
  },
  {
    id: 4,
    scenario: "Actualizaste react-hook-form de v7.48 a v7.51",
    context: "Actualización de dependencia de producción.",
    options: [
      { id: 'A', label: 'chore: update react-hook-form to v7.51', pts: 30, feedback: "¡Correcto! Tipo (chore para deps), librería exacta, versión destino. Perfecto para el changelog." },
      { id: 'B', label: 'fix: update dependencies', pts: 5, feedback: "fix es para bugs, no para actualizaciones de deps. Y 'dependencies' en plural es demasiado vago." },
      { id: 'C', label: 'update deps', pts: 3, feedback: "Sin tipo, sin contexto de qué se actualizó. El historial de git no podrá indicar cuándo se actualizó esta librería." },
      { id: 'D', label: 'chore: update packages', pts: 8, feedback: "Tipo correcto, pero ¿qué paquetes? Demasiado genérico para ser útil." },
    ],
  },
  {
    id: 5,
    scenario: "Documentaste los endpoints de la API en el README",
    context: "Agregaste sección de endpoints con ejemplos de request/response.",
    options: [
      { id: 'A', label: 'docs: add API endpoints to README', pts: 30, feedback: "¡Correcto! Tipo (docs), qué se documentó (API endpoints), dónde (README)." },
      { id: 'B', label: 'feat: document API', pts: 8, feedback: "Tipo incorrecto — docs, no feat. Agregar documentación no es una feature de código." },
      { id: 'C', label: 'update README with API docs', pts: 12, feedback: "Sin tipo semántico. Tiene el contexto pero no sigue la convención, rompiendo el historial." },
      { id: 'D', label: 'readme', pts: 0, feedback: "El mensaje de commit más básico posible. No da información alguna." },
    ],
  },
]

const MERGE_OPTIONS = [
  {
    id: 'A',
    label: 'Conservar tu versión',
    pts: 10,
    feedback: "Tu versión usa 's.date' que ya no existe (renombrado a 'createdAt'). Compila pero usa el campo incorrecto.",
    code: `// Tu versión
const filtered = sales.filter(s => {
  const d = new Date(s.date)
  return d >= from && d <= to
})`,
  },
  {
    id: 'B',
    label: 'Conservar la versión del compañero',
    pts: 15,
    feedback: "Usa el campo correcto (createdAt) pero nombres menos descriptivos. Funciona en producción.",
    code: `// Versión del compañero
const result = sales.filter(item => {
  const date = new Date(item.createdAt)
  return date >= startDate && date <= endDate
})`,
  },
  {
    id: 'C',
    label: 'Combinar lo mejor de ambas',
    pts: 30,
    feedback: "¡Correcto! Campo correcto (createdAt del compañero) + nombres descriptivos (sale, fromDate, toDate tuyas). Así se resuelve un conflicto en equipo.",
    code: `// Mejor de ambas
const filtered = sales.filter(sale => {
  const date = new Date(sale.createdAt)
  return date >= fromDate && date <= toDate
})`,
  },
]

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 60], message: "Los mensajes de commit son el historial del equipo. Con práctica se vuelve automático.", color: '#F59E0B' },
  { range: [61, 120], message: "Buen criterio. Tu historial de git será legible para tu yo de dentro de 6 meses.", color: '#06B6D4' },
  { range: [121, 160], message: "Comunicación técnica sólida. Tu equipo puede confiar en tu historial.", color: '#10B981' },
  { range: [161, 180], message: "Historial de git perfecto. Eso es respeto por tu equipo en forma de commits.", color: '#6366F1' },
]

// ── Exercise 1: Commit Messages ───────────────────────────────────────────────

function CommitExercise({ onComplete }: { onComplete: (pts: number) => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [pts, setPts] = useState(0)

  const handleSubmit = () => {
    let score = 0
    COMMIT_TASKS.forEach(task => {
      const sel = answers[task.id]
      if (sel) {
        const opt = task.options.find(o => o.id === sel)!
        score += opt.pts
      }
    })
    setPts(score)
    setSubmitted(true)
    onComplete(score)
  }

  const allAnswered = COMMIT_TASKS.every(t => answers[t.id])

  return (
    <div className="flex flex-col gap-6">
      {COMMIT_TASKS.map(task => (
        <div key={task.id} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{task.scenario}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{task.context}</p>
          </div>
          <div className="flex flex-col gap-2">
            {task.options.map(opt => {
              const isSelected = answers[task.id] === opt.id
              const isCorrect = opt.pts >= 25
              let bg = isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)'
              let borderCol = isSelected ? '#6366F1' : 'var(--color-border)'
              if (submitted && isSelected && isCorrect) { bg = 'rgba(16,185,129,0.12)'; borderCol = '#10B981' }
              if (submitted && isSelected && !isCorrect) { bg = 'rgba(245,158,11,0.12)'; borderCol = '#F59E0B' }
              if (submitted && !isSelected && isCorrect) { bg = 'rgba(16,185,129,0.05)'; borderCol = 'rgba(16,185,129,0.3)' }

              return (
                <button
                  key={opt.id}
                  disabled={submitted}
                  onClick={() => setAnswers(prev => ({ ...prev, [task.id]: opt.id }))}
                  className="flex flex-col gap-1 px-4 py-3 rounded-xl border text-left transition-all"
                  style={{ background: bg, borderColor: borderCol }}
                >
                  <code className="text-xs font-mono" style={{ color: isSelected ? '#A5B4FC' : 'var(--color-text-secondary)' }}>
                    {opt.label}
                  </code>
                  {submitted && isSelected && (
                    <p className="text-xs leading-relaxed" style={{ color: isCorrect ? '#6EE7B7' : '#FCD34D' }}>
                      {opt.feedback} (+{opt.pts}pts)
                    </p>
                  )}
                  {submitted && !isSelected && isCorrect && (
                    <p className="text-xs text-[var(--color-text-muted)]">← respuesta correcta (+{opt.pts}pts)</p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {!submitted && allAnswered && (
        <button
          onClick={handleSubmit}
          className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#6366F1' }}
        >
          Ver puntuación →
        </button>
      )}

      {submitted && (
        <p className="text-sm font-semibold" style={{ color: pts >= 120 ? '#10B981' : '#F59E0B' }}>
          {pts}/150 pts — {pts >= 120 ? 'Excelente convención de commits.' : 'Hay margen para mejorar los mensajes.'}
        </p>
      )}
    </div>
  )
}

// ── Exercise 2: Merge Conflict ────────────────────────────────────────────────

function MergeConflict({ onComplete }: { onComplete: (pts: number) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const selectedOpt = MERGE_OPTIONS.find(o => o.id === selected)

  const handleSubmit = () => {
    if (!selected || submitted) return
    setSubmitted(true)
    onComplete(selectedOpt!.pts)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Conflict context */}
      <GlassCard className="p-4">
        <div className="flex items-start gap-2 mb-3">
          <GitMerge size={14} style={{ color: '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold" style={{ color: '#F59E0B' }}>Conflicto en: src/utils/filterSales.ts</p>
        </div>
        <pre className="text-xs leading-loose font-mono overflow-x-auto" style={{ color: 'var(--color-text-secondary)' }}>{`<<<<<<< HEAD (tu versión)
const filtered = sales.filter(s => {
  const d = new Date(s.date)
  return d >= from && d <= to
})
=======
const result = sales.filter(item => {
  const date = new Date(item.createdAt)
  return date >= startDate && date <= endDate
})
>>>>>>> compañero/feature-date-filter`}</pre>
        <p className="text-xs text-[var(--color-text-muted)] mt-3 leading-relaxed">
          Tu compañero renombró el campo de <code className="font-mono" style={{ color: '#A5B4FC' }}>date</code> a <code className="font-mono" style={{ color: '#A5B4FC' }}>createdAt</code> en el backend sin avisar.
          Tú usaste nombres más descriptivos (<code className="font-mono" style={{ color: '#A5B4FC' }}>fromDate</code>, <code className="font-mono" style={{ color: '#A5B4FC' }}>toDate</code>). ¿Cómo resuelves el conflicto?
        </p>
      </GlassCard>

      <div className="flex flex-col gap-3">
        {MERGE_OPTIONS.map(opt => {
          const isSelected = selected === opt.id
          const isCorrect = opt.pts >= 25
          let bg = isSelected ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)'
          let borderCol = isSelected ? '#6366F1' : 'var(--color-border)'
          if (submitted && isSelected && isCorrect) { bg = 'rgba(16,185,129,0.12)'; borderCol = '#10B981' }
          if (submitted && isSelected && !isCorrect) { bg = 'rgba(245,158,11,0.12)'; borderCol = '#F59E0B' }

          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelected(opt.id)}
              className="flex flex-col gap-2 px-4 py-4 rounded-xl border text-left transition-all"
              style={{ background: bg, borderColor: borderCol }}
            >
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{opt.label}</p>
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>{opt.code}</pre>
              {submitted && isSelected && (
                <p className="text-xs leading-relaxed" style={{ color: isCorrect ? '#6EE7B7' : '#FCD34D' }}>
                  {opt.feedback} (+{opt.pts}pts)
                </p>
              )}
            </button>
          )
        })}
      </div>

      {selected && !submitted && (
        <button
          onClick={handleSubmit}
          className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#6366F1' }}
        >
          Confirmar resolución →
        </button>
      )}

      {submitted && (
        <p className="text-sm font-semibold" style={{ color: selectedOpt!.pts >= 25 ? '#10B981' : '#F59E0B' }}>
          {selectedOpt!.pts}/30 pts
        </p>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function TeamworkPage() {
  const [ex1Score, setEx1Score] = useState<number | null>(null)
  const [ex2Score, setEx2Score] = useState<number | null>(null)

  const totalScore = (ex1Score ?? 0) + (ex2Score ?? 0)
  const allDone = ex1Score !== null && ex2Score !== null

  return (
    <AboutPageLayout
      title="Trabajo en Equipo"
      description="El código que otros pueden leer, revisar y mantener es la forma más concreta de respeto en un equipo de desarrollo."
      valueNumber="05"
      accentColor="#EC4899"
      prevPath="/sobre-mi/vision-fullstack"
      prevLabel="Visión Fullstack"
    >
      <div className="flex flex-col gap-10">

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
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(236,72,153,0.12)', color: '#F9A8D4', border: '1px solid rgba(236,72,153,0.25)' }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Exercise 1 */}
        <GlassCard className="p-6">
          <ChallengeCard
            number={1}
            total={2}
            title="Escribe el commit correcto"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                5 situaciones reales de desarrollo. Para cada una, elige el mensaje de commit que mejor sigue la convención Conventional Commits y da contexto útil al equipo.
              </span>
            }
            question="¿Qué mensaje de commit escribirías para cada situación?"
            points={150}
          >
            <CommitExercise onComplete={setEx1Score} />
          </ChallengeCard>
        </GlassCard>

        {/* Exercise 2 — unlocks after ex1 */}
        <AnimatePresence>
          {ex1Score !== null && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <GlassCard className="p-6">
                <ChallengeCard
                  number={2}
                  total={2}
                  title="Resuelve el conflicto de merge"
                  context={
                    <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                      Situación real: conflicto entre tu rama y la de tu compañero. El backend cambió un nombre de campo sin avisar.
                    </span>
                  }
                  question="¿Cómo resuelves este conflicto? Elige la estrategia correcta."
                  points={30}
                >
                  <MergeConflict onComplete={setEx2Score} />
                </ChallengeCard>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ScoreBoard */}
        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ScoreBoard
                userScore={totalScore}
                maxScore={180}
                gianScore={180}
                feedback={FEEDBACK}
                gianComment="En Grupo Centro Tecnológico tuvimos un conflicto exactamente así. El backend había cambiado el nombre del campo de 'date' a 'createdAt' sin avisar. Lo detecté en el code review antes de que llegara a producción. Eso es lo que significa trabajar en equipo: revisar el código del otro como si fuera tuyo."
                onReset={() => {
                  setEx1Score(null)
                  setEx2Score(null)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AboutPageLayout>
  )
}
