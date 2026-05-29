import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, RotateCcw } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Challenge data ───────────────────────────────────────────────────────────

interface ChallengeOption {
  id: string
  label: string
  feedback: string
  score: number
  codeAfter?: string
}

interface Challenge {
  id: number
  title: string
  context: string
  question: string
  options: ChallengeOption[]
}

const CHALLENGES: Challenge[] = [
  {
    id: 0,
    title: 'Desafío 1 — Nombres de variables',
    context: `function procesar(d, arr) {
  let r = 0
  for(let i = 0; i < arr.length; i++) {
    r += arr[i] * d
  }
  return r
}`,
    question: '¿Cómo mejorarías esta función?',
    options: [
      {
        id: 'A',
        label: 'Agregar comentarios explicando qué hace',
        feedback:
          'Parcialmente correcto. Los comentarios ayudan, pero no resuelven el problema raíz: los nombres sin significado. Un buen nombre elimina la necesidad del comentario.',
        score: 10,
      },
      {
        id: 'B',
        label: 'Renombrar todo con nombres descriptivos',
        feedback:
          'Correcto. calculateWeightedTotal(discount, prices) es infinitamente más legible. El buen código se documenta solo.',
        score: 30,
        codeAfter: `function calculateWeightedTotal(
  discount: number,
  prices: number[]
): number {
  let total = 0
  for (const price of prices) {
    total += price * discount
  }
  return total
}`,
      },
      {
        id: 'C',
        label: 'Está bien así, es más corto',
        feedback:
          'Error común. La brevedad no es virtud cuando sacrifica legibilidad. Otro dev (o tú en 6 meses) no entenderá esto.',
        score: 0,
      },
    ],
  },
  {
    id: 1,
    title: 'Desafío 2 — Responsabilidad única',
    context: `function handleUser(user, db, email, log) {
  db.save(user)
  email.send(user.email, 'Bienvenido')
  log.write('Usuario creado: ' + user.id)
  return { success: true }
}`,
    question: 'Esta función tiene múltiples responsabilidades. ¿Qué harías?',
    options: [
      {
        id: 'A',
        label: 'Separarla en: saveUser, sendWelcomeEmail, logUserCreation',
        feedback:
          'Principio de Responsabilidad Única (SRP). Cada función hace UNA cosa. Fácil de testear, mantener y reusar.',
        score: 30,
      },
      {
        id: 'B',
        label: 'Está bien, es más eficiente tenerlo junto',
        feedback:
          'Si cambia la lógica de email, tienes que tocar la función de usuario. Alto acoplamiento = deuda técnica garantizada.',
        score: 0,
      },
      {
        id: 'C',
        label: 'Agregar más parámetros para hacerla más flexible',
        feedback:
          'Más parámetros = más complejidad. La solución es dividir, no expandir. Una función con 6+ parámetros es una señal de diseño deficiente.',
        score: 5,
      },
    ],
  },
  {
    id: 2,
    title: 'Desafío 3 — TypeScript y contratos',
    context: `function getUser(id) {
  // retorna un objeto usuario o null
}`,
    question: '¿Cómo mejorarías el contrato de esta función?',
    options: [
      {
        id: 'A',
        label: 'Agregar JSDoc con @param y @returns',
        feedback:
          'JSDoc es útil pero no es verificado por el compilador. Si el tipo cambia, el JSDoc puede quedar desactualizado silenciosamente.',
        score: 10,
      },
      {
        id: 'B',
        label: 'Usar TypeScript: getUser(id: string): Promise<User | null>',
        feedback:
          'El compilador verifica los tipos en tiempo de desarrollo. Si User cambia, TypeScript te avisa en todos los puntos de uso automáticamente.',
        score: 30,
        codeAfter: `interface User {
  id: string
  name: string
  email: string
}

async function getUser(
  id: string
): Promise<User | null> {
  return db.findById(id) ?? null
}`,
      },
      {
        id: 'C',
        label: 'No es necesario, JavaScript es suficiente',
        feedback:
          'En proyectos grandes sin tipos, los bugs de tipo son los más difíciles de encontrar en producción. Un tipo mal asumido puede costar horas.',
        score: 0,
      },
    ],
  },
  {
    id: 3,
    title: "Desafío 4 — DRY: Don't Repeat Yourself",
    context: `function calcTotalVentas(items) {
  return items.reduce(
    (s, i) => s + i.precio * i.qty, 0
  )
}
function calcTotalCompras(items) {
  return items.reduce(
    (s, i) => s + i.precio * i.qty, 0
  )
}`,
    question: '¿Ves el problema? ¿Qué harías?',
    options: [
      {
        id: 'A',
        label: 'Crear una función genérica calculateTotal(items)',
        feedback:
          'DRY en acción. Un solo cambio afecta ambos casos. Si hay un bug, se corrige en un solo lugar, no en cada copia.',
        score: 30,
        codeAfter: `function calculateTotal(
  items: { precio: number; qty: number }[]
): number {
  return items.reduce(
    (sum, item) => sum + item.precio * item.qty,
    0
  )
}

const totalVentas = calculateTotal(ventas)
const totalCompras = calculateTotal(compras)`,
      },
      {
        id: 'B',
        label: 'Dejarlas separadas para mayor claridad',
        feedback:
          'Cuando corrijas un bug en una, debes recordar corregirlo en la otra. Y en la siguiente. Eso es deuda técnica garantizada.',
        score: 0,
      },
      {
        id: 'C',
        label: 'Copiar y pegar siempre que sea necesario',
        feedback:
          'Copy-paste es el origen del 80% de la deuda técnica. Cada copia es un lugar más donde puede vivir un bug.',
        score: 0,
      },
    ],
  },
  {
    id: 4,
    title: 'Desafío 5 — Manejo de errores',
    context: `async function fetchData(url) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}`,
    question: '¿Qué problema crítico tiene esto?',
    options: [
      {
        id: 'A',
        label: 'Falta manejo de errores con try/catch',
        feedback:
          'Si fetch falla o la respuesta no es JSON válido, toda la aplicación puede crashear. El manejo de errores no es opcional en producción.',
        score: 30,
        codeAfter: `async function fetchData<T>(
  url: string
): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}: \${url}\`)
  }
  return res.json() as Promise<T>
}`,
      },
      {
        id: 'B',
        label: 'Nada, funciona correctamente',
        feedback:
          'Funciona en el happy path. Pero en producción las redes fallan, las APIs devuelven HTML en vez de JSON, los servidores se caen.',
        score: 0,
      },
      {
        id: 'C',
        label: 'Solo falta un console.log para debuggear',
        feedback:
          'El console.log no salva a los usuarios cuando la app crashea. Y dejar logs en producción es una mala práctica de seguridad.',
        score: 5,
      },
    ],
  },
]

const RESULT_LEVELS = [
  {
    min: 0,
    max: 50,
    title: 'Sigue practicando',
    message:
      'El clean code se aprende con tiempo y experiencia. Cada proyecto es una oportunidad de mejorar.',
    color: '#F59E0B',
    emoji: '📖',
  },
  {
    min: 51,
    max: 99,
    title: 'Buen nivel',
    message:
      'Tienes buenas bases, sigue refinando tu criterio. La diferencia está en los detalles.',
    color: '#06B6D4',
    emoji: '🎯',
  },
  {
    min: 100,
    max: 130,
    title: 'Excelente',
    message:
      'Piensas como un desarrollador que cuida su código. Este nivel marca la diferencia en equipos.',
    color: '#10B981',
    emoji: '✨',
  },
  {
    min: 131,
    max: 999,
    title: 'Clean Coder',
    message:
      'Compartes la misma filosofía que aplico en cada proyecto. El código limpio no es un extra, es el estándar.',
    color: '#6366F1',
    emoji: '🏆',
  },
]

function getResultLevel(score: number) {
  return RESULT_LEVELS.find((l) => score >= l.min && score <= l.max) ?? RESULT_LEVELS[0]
}

// ─── Simulator ────────────────────────────────────────────────────────────────

interface SimState {
  currentChallenge: number
  score: number
  selectedOption: ChallengeOption | null
  completed: boolean
}

function DecisionSimulator() {
  const [state, setState] = useState<SimState>({
    currentChallenge: 0,
    score: 0,
    selectedOption: null,
    completed: false,
  })

  const challenge = CHALLENGES[state.currentChallenge]

  const handleSelect = (opt: ChallengeOption) => {
    if (state.selectedOption) return
    setState((s) => ({ ...s, selectedOption: opt }))
  }

  const handleNext = () => {
    const addedScore = state.selectedOption?.score ?? 0
    const isLast = state.currentChallenge === CHALLENGES.length - 1
    setState((s) => ({
      currentChallenge: isLast ? s.currentChallenge : s.currentChallenge + 1,
      score: s.score + addedScore,
      selectedOption: null,
      completed: isLast,
    }))
  }

  const handleReset = () =>
    setState({ currentChallenge: 0, score: 0, selectedOption: null, completed: false })

  const finalScore = state.score + (state.selectedOption?.score ?? 0)
  const result = getResultLevel(finalScore)

  if (state.completed && state.selectedOption !== null) {
    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-10 text-center"
      >
        <div
          className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
          style={{ background: `${result.color}15`, border: `2px solid ${result.color}40` }}
        >
          <span className="text-2xl">{result.emoji}</span>
          <span className="text-xl font-black" style={{ color: result.color }}>
            {finalScore}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            {result.title}
          </h3>
          <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed">
            {result.message}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {RESULT_LEVELS.map((l) => (
            <div
              key={l.title}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: finalScore >= l.min && finalScore <= l.max ? `${l.color}20` : 'rgba(255,255,255,0.04)',
                color: finalScore >= l.min && finalScore <= l.max ? l.color : 'var(--color-text-muted)',
                border: `1px solid ${finalScore >= l.min && finalScore <= l.max ? l.color + '40' : 'transparent'}`,
              }}
            >
              {l.min}–{l.max === 999 ? '150' : l.max}: {l.title}
            </div>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all"
        >
          <RotateCcw size={14} />
          Intentar de nuevo
        </button>
      </motion.div>
    )
  }

  const scoreForOpt = (opt: ChallengeOption) =>
    opt.score === 30 ? '#10B981' : opt.score === 0 ? '#EF4444' : '#F59E0B'

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex gap-1.5 flex-1">
          {CHALLENGES.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                flex: i === state.currentChallenge ? 3 : 1,
                background:
                  i < state.currentChallenge
                    ? '#6366F1'
                    : i === state.currentChallenge
                    ? '#6366F1'
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">
          {state.currentChallenge + 1} / {CHALLENGES.length}
        </span>
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: '#6366F1' }}>
          {state.score} pts
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentChallenge}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-4"
        >
          {/* Code context */}
          <GlassCard className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              {challenge.title}
            </p>
            <pre
              className="text-sm leading-relaxed overflow-x-auto"
              style={{
                fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                color: 'var(--color-text-secondary)',
                background: 'rgba(255,255,255,0.02)',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {challenge.context}
            </pre>
          </GlassCard>

          {/* Question */}
          <p className="font-semibold text-[var(--color-text-primary)] text-base">
            {challenge.question}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {challenge.options.map((opt) => {
              const isSelected = state.selectedOption?.id === opt.id
              const isDisabled = state.selectedOption !== null && !isSelected
              const color = state.selectedOption ? scoreForOpt(opt) : '#6366F1'

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  disabled={state.selectedOption !== null}
                  className="text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-start gap-3"
                  style={{
                    background: isSelected ? `${scoreForOpt(opt)}12` : 'rgba(255,255,255,0.02)',
                    borderColor: isSelected
                      ? `${scoreForOpt(opt)}55`
                      : isDisabled
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.08)',
                    opacity: isDisabled ? 0.4 : 1,
                    cursor: isDisabled ? 'default' : 'pointer',
                  }}
                >
                  <span
                    className="text-xs font-bold mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center"
                    style={{
                      background: isSelected ? `${scoreForOpt(opt)}25` : 'rgba(255,255,255,0.06)',
                      color: isSelected ? scoreForOpt(opt) : color,
                    }}
                  >
                    {opt.id}
                  </span>
                  <span className="text-sm text-[var(--color-text-primary)]">{opt.label}</span>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {state.selectedOption && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                <GlassCard className="p-4 flex gap-3">
                  {state.selectedOption.score === 30 ? (
                    <CheckCircle2 size={18} className="flex-shrink-0 text-emerald-400 mt-0.5" />
                  ) : state.selectedOption.score === 0 ? (
                    <XCircle size={18} className="flex-shrink-0 text-red-400 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="flex-shrink-0 text-amber-400 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {state.selectedOption.feedback}
                    </p>
                    <p
                      className="text-xs font-bold mt-1.5"
                      style={{
                        color:
                          state.selectedOption.score === 30
                            ? '#10B981'
                            : state.selectedOption.score === 0
                            ? '#EF4444'
                            : '#F59E0B',
                      }}
                    >
                      {state.selectedOption.score > 0
                        ? `+${state.selectedOption.score} pts`
                        : '+0 pts'}
                    </p>
                  </div>
                </GlassCard>

                {state.selectedOption.codeAfter && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <GlassCard className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                        Versión refactorizada
                      </p>
                      <pre
                        className="text-sm leading-relaxed overflow-x-auto"
                        style={{
                          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                          color: '#86EFAC',
                          background: 'rgba(16,185,129,0.05)',
                          padding: '12px 14px',
                          borderRadius: 8,
                          border: '1px solid rgba(16,185,129,0.15)',
                        }}
                      >
                        {state.selectedOption.codeAfter}
                      </pre>
                    </GlassCard>
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  className="self-end px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: '#6366F1' }}
                >
                  {state.currentChallenge === CHALLENGES.length - 1
                    ? 'Ver resultado →'
                    : 'Siguiente desafío →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Principles ───────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    title: 'SOLID en la práctica',
    description:
      'SRP, OCP, LSP, ISP, DIP. No como reglas abstractas, sino como guías que aplico en los módulos ERP de RADAR.',
    color: '#6366F1',
  },
  {
    title: 'DRY siempre',
    description:
      'Cada función tiene un único propósito. Si copio y pego, me pregunto por qué no existe una abstracción adecuada.',
    color: '#8B5CF6',
  },
  {
    title: 'Naming que documenta',
    description:
      'getUsersByRole() no necesita comentario. Una variable llamada "data" necesita uno urgente.',
    color: '#A78BFA',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CleanCodePage() {
  useScrollToTop()

  return (
    <AboutPageLayout
      title="Clean Code"
      description="El código limpio no es opcional. Es la diferencia entre un sistema que dura y uno que se convierte en deuda técnica."
      valueNumber="01"
      accentColor="#6366F1"
      nextPath="/sobre-mi/atencion-al-detalle"
      nextLabel="Atención al detalle"
    >
      <section className="mb-12">
        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
          Escribir código que funciona es el mínimo esperado. Escribir código que otros puedan
          leer, mantener y extender sin miedo — eso es lo que separa un desarrollador junior de uno
          senior.
        </p>
      </section>

      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            ¿Cómo escribirías esto?
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            5 desafíos reales. Elige la mejor respuesta y ve por qué importa cada decisión.
          </p>
        </div>
        <DecisionSimulator />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
          Principios que aplico en cada proyecto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PRINCIPLES.map((p) => (
            <GlassCard key={p.title} className="p-5">
              <div className="w-8 h-1 rounded-full mb-4" style={{ background: p.color }} />
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </AboutPageLayout>
  )
}
