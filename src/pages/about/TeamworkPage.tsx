import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, GitBranch, MessageSquare, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Git Simulator ────────────────────────────────────────────────────────────

interface GitOption {
  id: string
  label: string
  result: string
  isCorrect?: boolean
  isWarning?: boolean
}

interface GitStep {
  id: number
  situation: string
  question: string
  options: GitOption[]
}

const GIT_STEPS: GitStep[] = [
  {
    id: 0,
    situation:
      'Tienes una nueva tarea en Jira: FORCE-234 — Agregar filtro por fecha en ventas.',
    question: '¿Qué haces?',
    options: [
      {
        id: 'A',
        label: 'git checkout -b feat/filtro-fecha-ventas',
        result:
          'Branch descriptivo creado. El nombre indica: tipo (feat), módulo (filtro-fecha), contexto (ventas). Otros devs saben exactamente qué hace esta rama.',
        isCorrect: true,
      },
      {
        id: 'B',
        label: 'Trabajo directo en develop',
        result:
          'Riesgo alto. Si otro dev hace merge mientras trabajas, habrá conflictos difíciles de resolver. Los branches aíslan cambios.',
        isWarning: true,
      },
      {
        id: 'C',
        label: 'git checkout -b fix/234',
        result:
          'El nombre no dice qué hace. En 3 semanas, "fix/234" no te dice nada sin consultar Jira.',
        isWarning: true,
      },
    ],
  },
  {
    id: 1,
    situation: 'Terminaste el filtro. Hiciste 3 commits. Es hora de commitear el principal.',
    question: '¿Cómo describes tu commit?',
    options: [
      {
        id: 'A',
        label: "git commit -m 'feat: add date range filter to sales module'",
        result:
          'Conventional Commits: tipo + descripción clara en inglés. El historial de Git se convierte en documentación. En 6 meses sabes exactamente qué se agregó y cuándo.',
        isCorrect: true,
      },
      {
        id: 'B',
        label: "git commit -m 'cambios'",
        result:
          'Este mensaje no dice absolutamente nada. En el historial del proyecto, "cambios" es ruido que hace imposible el git blame.',
        isWarning: false,
      },
      {
        id: 'C',
        label: "git commit -m 'FORCE-234'",
        result:
          'La referencia al ticket es útil, pero ¿qué pasa si Jira no está disponible o el ticket se archiva? El mensaje debe ser autoexplicativo.',
        isWarning: true,
      },
    ],
  },
  {
    id: 2,
    situation:
      'Hay un conflicto al hacer merge — tu compañero también modificó VentasFilter.tsx.',
    question: '¿Cómo lo resuelves?',
    options: [
      {
        id: 'A',
        label: 'Llamo a mi compañero para revisar los cambios juntos',
        result:
          'Code review colaborativo. Entienden ambos cambios y hacen el merge con criterio. El resultado es mejor que cualquiera de los dos cambios por separado.',
        isCorrect: true,
      },
      {
        id: 'B',
        label: 'Acepto mis cambios y descarto los suyos',
        result:
          'Sin leer el código de tu compañero puedes romper su funcionalidad. Los conflictos se resuelven con entendimiento, no con fuerza bruta.',
        isWarning: false,
      },
      {
        id: 'C',
        label: 'Acepto los cambios del repositorio remoto',
        result:
          'Tus 3 horas de trabajo de filtros se pierden. Nunca descartes cambios propios sin leerlos primero.',
        isWarning: false,
      },
    ],
  },
]

interface GitDiagramProps {
  step: number
  choices: number[]
}

function GitDiagram({ step, choices }: GitDiagramProps) {
  const hasBranch = step > 0 || choices.length > 0
  const hasCommits = step >= 2
  const hasMerge = step >= 3

  return (
    <div className="p-4 rounded-xl font-mono text-xs overflow-x-auto" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <p className="text-[var(--color-text-muted)] mb-3">— Estado del repositorio —</p>

      {/* main */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-emerald-400 w-20 flex-shrink-0">main</span>
        <span className="text-emerald-400">●</span>
        <span className="text-emerald-400">────────────────────</span>
        {hasMerge && <span className="text-emerald-400">──●</span>}
      </div>

      {/* develop */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-cyan-400 w-20 flex-shrink-0">develop</span>
        <span className="text-cyan-400">●</span>
        <span className="text-cyan-400">──────────────────</span>
        {hasMerge && <span className="text-cyan-400">────●</span>}
      </div>

      {/* feature branch */}
      {hasBranch && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1"
        >
          <span className="text-violet-400 w-20 flex-shrink-0 text-[10px]">feat/filtro</span>
          <span className="text-violet-400 ml-4">●</span>
          {hasCommits && (
            <>
              <span className="text-violet-400">──●──●──●</span>
              {hasMerge && <span className="text-violet-400 line-through opacity-50">──●</span>}
            </>
          )}
          {!hasCommits && <span className="text-violet-400 opacity-50">── (working)</span>}
        </motion.div>
      )}

      {!hasBranch && (
        <div className="text-[var(--color-text-muted)] mt-1 opacity-40">
          feat: (sin crear aún)
        </div>
      )}
    </div>
  )
}

function GitSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [choices, setChoices] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<GitOption | null>(null)
  const [done, setDone] = useState(false)

  const step = GIT_STEPS[currentStep]

  const handleOption = (opt: GitOption) => {
    if (selectedOption) return
    setSelectedOption(opt)
  }

  const handleNext = () => {
    setChoices((prev) => [...prev, currentStep])
    if (currentStep < GIT_STEPS.length - 1) {
      setCurrentStep((s) => s + 1)
      setSelectedOption(null)
    } else {
      setDone(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setChoices([])
    setSelectedOption(null)
    setDone(false)
  }

  const correctCount = choices.filter((i) => {
    const opt = GIT_STEPS[i].options.find((_, j) => j === 0)
    return opt?.isCorrect
  }).length

  return (
    <div className="flex flex-col gap-4">
      <GitDiagram step={currentStep} choices={choices} />

      {!done ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-5 flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <GitBranch size={16} className="text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    {step.situation}
                  </p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{step.question}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {step.options.map((opt) => {
                  const isSelected = selectedOption?.id === opt.id
                  const isDisabled = selectedOption !== null && !isSelected

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOption(opt)}
                      disabled={selectedOption !== null}
                      className="text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-mono"
                      style={{
                        background: isSelected
                          ? opt.isCorrect
                            ? 'rgba(16,185,129,0.08)'
                            : opt.isWarning
                            ? 'rgba(245,158,11,0.08)'
                            : 'rgba(239,68,68,0.08)'
                          : 'rgba(255,255,255,0.02)',
                        borderColor: isSelected
                          ? opt.isCorrect
                            ? 'rgba(16,185,129,0.4)'
                            : opt.isWarning
                            ? 'rgba(245,158,11,0.4)'
                            : 'rgba(239,68,68,0.4)'
                          : isDisabled
                          ? 'rgba(255,255,255,0.04)'
                          : 'rgba(255,255,255,0.08)',
                        opacity: isDisabled ? 0.4 : 1,
                        cursor: isDisabled ? 'default' : 'pointer',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col gap-3 overflow-hidden"
                  >
                    <GlassCard className="p-3 flex gap-2.5">
                      {selectedOption.isCorrect ? (
                        <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-400 mt-0.5" />
                      ) : selectedOption.isWarning ? (
                        <AlertCircle size={15} className="flex-shrink-0 text-amber-400 mt-0.5" />
                      ) : (
                        <XCircle size={15} className="flex-shrink-0 text-red-400 mt-0.5" />
                      )}
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {selectedOption.result}
                      </p>
                    </GlassCard>

                    <button
                      onClick={handleNext}
                      className="self-end px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                      style={{ background: '#6366F1' }}
                    >
                      {currentStep === GIT_STEPS.length - 1 ? 'Ver resultado →' : 'Siguiente paso →'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <GlassCard className="p-5 flex flex-col gap-4">
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <p className="font-bold text-[var(--color-text-primary)] text-lg mb-1">
                Flujo completado
              </p>
              <p className="text-sm text-emerald-300">Así manejo Git en proyectos reales.</p>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Branch descriptivo → commits con Conventional Commits → merge colaborativo.
              El historial de Git es documentación viva del proyecto.
            </p>
            <button
              onClick={handleReset}
              className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all"
            >
              <RotateCcw size={13} />
              Reiniciar
            </button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}

// ─── Daily Scrum Simulator ────────────────────────────────────────────────────

interface DailyQuestion {
  question: string
  options: Array<{ id: string; label: string; isGood: boolean; feedback: string }>
}

const DAILY_QUESTIONS: DailyQuestion[] = [
  {
    question: '¿Qué hiciste ayer?',
    options: [
      {
        id: 'A',
        label: 'Trabajé en el módulo de ventas',
        isGood: false,
        feedback: 'Muy vago. ¿Qué exactamente? ¿Está terminado? El equipo no puede planificar con esa info.',
      },
      {
        id: 'B',
        label: 'Completé el CRUD de clientes y empecé la validación del formulario',
        isGood: true,
        feedback: 'Específico y claro. El equipo sabe exactamente el estado y puede bloquear o continuar en consecuencia.',
      },
    ],
  },
  {
    question: '¿Qué harás hoy?',
    options: [
      {
        id: 'A',
        label: 'Continuar con lo de ayer',
        isGood: false,
        feedback: 'Idem que antes: vago. Si alguien del equipo depende de tu trabajo, no sabe cuándo estará listo.',
      },
      {
        id: 'B',
        label: 'Terminar validaciones, crear el endpoint POST /clientes y hacer PR antes de las 5pm',
        isGood: true,
        feedback: 'Concreto, con tiempo estimado. El equipo puede coordinarse y anticipar el review.',
      },
    ],
  },
  {
    question: '¿Tienes algún impedimento?',
    options: [
      {
        id: 'A',
        label: 'No, todo bien',
        isGood: false,
        feedback: 'A veces hay que pedir ayuda. Bloquearse en silencio cuesta más tiempo que pedir apoyo a tiempo.',
      },
      {
        id: 'B',
        label: 'Necesito acceso al ambiente de staging para probar la integración',
        isGood: true,
        feedback: 'Comunicación proactiva. El Scrum Master puede desbloquearte antes de que pierdas medio día esperando.',
      },
    ],
  },
]

function DailyScrumSimulator() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Array<{ option: { id: string; label: string; isGood: boolean; feedback: string } }>>([])
  const [selected, setSelected] = useState<DailyQuestion['options'][0] | null>(null)
  const [done, setDone] = useState(false)

  const question = DAILY_QUESTIONS[currentQ]

  const handleSelect = (opt: DailyQuestion['options'][0]) => {
    if (selected) return
    setSelected(opt)
  }

  const handleNext = () => {
    if (!selected) return
    setAnswers((prev) => [...prev, { option: selected }])
    if (currentQ < DAILY_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers([])
    setSelected(null)
    setDone(false)
  }

  const goodCount = answers.filter((a) => a.option.isGood).length + (selected?.isGood ? 1 : 0)

  if (done && selected) {
    const finalGood = goodCount
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
        <GlassCard className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare size={20} style={{ color: '#10B981' }} />
            <h3 className="font-bold text-[var(--color-text-primary)]">
              {finalGood === 3
                ? 'Comunicación clara = equipo eficiente'
                : finalGood >= 2
                ? 'Buena comunicación con oportunidades de mejora'
                : 'La comunicación clara hace al equipo más rápido'}
            </h3>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Cada daily bien ejecutada ahorra horas de confusión semanal. La transparencia no es
            opcional en un equipo ágil.
          </p>
          <div className="flex flex-col gap-2">
            {[...answers, { option: selected }].map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs"
                style={{
                  background: a.option.isGood ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)',
                  border: `1px solid ${a.option.isGood ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                }}
              >
                {a.option.isGood ? (
                  <CheckCircle2 size={12} className="flex-shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle size={12} className="flex-shrink-0 text-amber-400 mt-0.5" />
                )}
                <span className="text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text-primary)]">P{i + 1}:</strong>{' '}
                  {a.option.label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
          >
            <RotateCcw size={13} />
            Reiniciar
          </button>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        {DAILY_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i < currentQ ? '#10B981' : i === currentQ ? '#6366F1' : 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>

      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wider font-semibold">
          Pregunta {currentQ + 1} de {DAILY_QUESTIONS.length}
        </p>
        <p className="font-semibold text-[var(--color-text-primary)]">{question.question}</p>
      </div>

      <div className="flex flex-col gap-2">
        {question.options.map((opt) => {
          const isSelected = selected?.id === opt.id
          const isDisabled = selected !== null && !isSelected
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className="text-left px-4 py-3 rounded-xl border transition-all text-sm"
              style={{
                background: isSelected
                  ? opt.isGood ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'
                  : 'rgba(255,255,255,0.02)',
                borderColor: isSelected
                  ? opt.isGood ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.4)'
                  : isDisabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? 'default' : 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <div
              className="p-3 rounded-xl text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3"
              style={{
                background: selected.isGood ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                border: `1px solid ${selected.isGood ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
              }}
            >
              {selected.feedback}
            </div>
            <button
              onClick={handleNext}
              className="self-end px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: '#6366F1' }}
            >
              {currentQ === DAILY_QUESTIONS.length - 1 ? 'Ver resultado →' : 'Siguiente →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}

// ─── Code Review Simulator ────────────────────────────────────────────────────

const CODE_DIFF = `// VentasFilter.tsx
+ const [startDate, setStartDate] = useState<Date | null>(null)
+ const [endDate, setEndDate] = useState<Date | null>(null)
+
+ const filteredSales = sales.filter(s => {
+   if (!startDate || !endDate) return true
+   const date = new Date(s.fecha)
+   return date >= startDate && date <= endDate
+ })`

interface ReviewComment {
  id: number
  author: string
  text: string
  options: Array<{ id: string; label: string; isGood: boolean; feedback: string }>
}

const REVIEW_COMMENTS: ReviewComment[] = [
  {
    id: 0,
    author: 'compañero_dev',
    text: 'Considera usar useMemo aquí para evitar recalcular en cada render. En listas grandes puede afectar el rendimiento.',
    options: [
      {
        id: 'A',
        label: 'Tienes razón, agrego useMemo ahora mismo',
        isGood: true,
        feedback:
          'Colaboración constructiva. Tu compañero mejoró tu código y tú lo recibes con criterio. Así crece el equipo.',
      },
      {
        id: 'B',
        label: 'La lista nunca será grande, está bien así',
        isGood: false,
        feedback:
          'Puede ser cierto ahora, pero en code review es mejor documentar la razón. Escríbelo como comentario.',
      },
      {
        id: 'C',
        label: '¿Puedes explicar por qué useMemo ayuda aquí?',
        isGood: true,
        feedback:
          'Pedir explicación es válido y demuestra curiosidad real. Tu compañero responde y ambos aprenden.',
      },
    ],
  },
  {
    id: 1,
    author: 'tech_lead',
    text: 'El nombre "filteredSales" es bueno pero considera moverlo fuera del render si el array sales viene de props — así evitas la referencia a sales.filter en cada ciclo.',
    options: [
      {
        id: 'A',
        label: 'Lo muevo a un hook personalizado useFilteredSales',
        isGood: true,
        feedback:
          'Excelente. Extraer a un hook hace el componente más limpio y el filtro reutilizable.',
      },
      {
        id: 'B',
        label: 'Acepto el feedback y lo refactorizo',
        isGood: true,
        feedback:
          'Actitud correcta ante feedback del tech lead. El código mejora con cada revisión.',
      },
      {
        id: 'C',
        label: 'Está bien donde está, lo cambié aquí con intención',
        isGood: false,
        feedback:
          'Defender decisiones técnicas está bien, pero debes argumentar por qué. Sin razón técnica, parece resistencia.',
      },
    ],
  },
]

function CodeReviewSimulator() {
  const [commentIdx, setCommentIdx] = useState(0)
  const [replies, setReplies] = useState<Array<{ option: ReviewComment['options'][0]; commentId: number }>>([])
  const [selected, setSelected] = useState<ReviewComment['options'][0] | null>(null)
  const [done, setDone] = useState(false)

  const comment = REVIEW_COMMENTS[commentIdx]

  const handleSelect = (opt: ReviewComment['options'][0]) => {
    if (selected) return
    setSelected(opt)
  }

  const handleNext = () => {
    if (!selected) return
    setReplies((prev) => [...prev, { option: selected, commentId: comment.id }])
    if (commentIdx < REVIEW_COMMENTS.length - 1) {
      setCommentIdx((i) => i + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const handleReset = () => {
    setCommentIdx(0)
    setReplies([])
    setSelected(null)
    setDone(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Diff */}
      <GlassCard className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          feat/filtro-fecha-ventas — VentasFilter.tsx
        </p>
        <pre
          className="text-xs leading-relaxed overflow-x-auto"
          style={{
            fontFamily: "'Fira Code', 'Consolas', monospace",
            background: 'rgba(0,0,0,0.3)',
            padding: '12px 14px',
            borderRadius: 8,
          }}
        >
          {CODE_DIFF.split('\n').map((line, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                color: line.startsWith('+')
                  ? '#86EFAC'
                  : line.startsWith('//')
                  ? '#6B7280'
                  : 'var(--color-text-muted)',
                background: line.startsWith('+') ? 'rgba(16,185,129,0.05)' : 'transparent',
              }}
            >
              {line}
            </span>
          ))}
        </pre>
      </GlassCard>

      {!done ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={commentIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-5 flex flex-col gap-4">
              {/* Comment */}
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.2)', color: '#6366F1' }}
                >
                  {comment.author[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">
                    {comment.author} comentó:
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                ¿Cómo respondes?
              </p>

              <div className="flex flex-col gap-2">
                {comment.options.map((opt) => {
                  const isSelected = selected?.id === opt.id
                  const isDisabled = selected !== null && !isSelected
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt)}
                      disabled={selected !== null}
                      className="text-left px-4 py-3 rounded-xl border transition-all text-sm"
                      style={{
                        background: isSelected
                          ? opt.isGood ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)'
                          : 'rgba(255,255,255,0.02)',
                        borderColor: isSelected
                          ? opt.isGood ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.4)'
                          : isDisabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                        opacity: isDisabled ? 0.4 : 1,
                        cursor: isDisabled ? 'default' : 'pointer',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden flex flex-col gap-3"
                  >
                    <div
                      className="p-3 rounded-xl text-sm"
                      style={{
                        background: selected.isGood ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                        border: `1px solid ${selected.isGood ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {selected.feedback}
                    </div>
                    <button
                      onClick={handleNext}
                      className="self-end px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                      style={{ background: '#10B981' }}
                    >
                      {commentIdx === REVIEW_COMMENTS.length - 1 ? 'Ver resultado →' : 'Siguiente comentario →'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <GlassCard className="p-5 flex flex-col gap-3">
            <p className="font-bold text-[var(--color-text-primary)]">
              PR revisado correctamente
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              El code review no es un obstáculo — es la forma en que el equipo se mejora mutuamente.
              Cada comentario bien recibido eleva el nivel del código y del equipo.
            </p>
            <button
              onClick={handleReset}
              className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
            >
              <RotateCcw size={13} />
              Revisar de nuevo
            </button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function TeamworkPage() {
  useScrollToTop()
  const [showCodeReview, setShowCodeReview] = useState(false)

  return (
    <AboutPageLayout
      title="Trabajo en Equipo"
      description="El mejor código nace de la colaboración, la comunicación clara y el respeto mutuo."
      valueNumber="05"
      accentColor="#10B981"
      prevPath="/sobre-mi/vision-fullstack"
      prevLabel="Visión Full Stack"
    >
      {/* Git Simulator */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Simula un día de trabajo en equipo
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Toma decisiones reales de flujo Git. Cada elección afecta al equipo.
          </p>
        </div>
        <GitSimulator />
      </section>

      {/* Daily Scrum */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            ¿Cómo es tu daily?
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            La comunicación en la daily marca la diferencia entre un equipo que avanza y uno que se
            bloquea.
          </p>
        </div>
        <DailyScrumSimulator />
      </section>

      {/* Code Review */}
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Code Review colaborativo
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Así manejo los comentarios en Pull Requests.
            </p>
          </div>
          <button
            onClick={() => setShowCodeReview((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all flex-shrink-0"
          >
            {showCodeReview ? '↑ Ocultar' : '↓ Ver ejemplo de trabajo en equipo'}
          </button>
        </div>

        <AnimatePresence>
          {showCodeReview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <CodeReviewSimulator />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </AboutPageLayout>
  )
}
