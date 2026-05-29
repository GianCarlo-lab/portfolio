import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ArrowRight, Monitor, Server, Database } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Debug Simulator data ─────────────────────────────────────────────────────

interface DebugOption {
  id: string
  label: string
  result: string
  nextStep: string
  isOptimal?: boolean
  isMistake?: boolean
}

interface DebugStep {
  id: string
  type: 'question' | 'finding' | 'result'
  title: string
  description: string
  finding?: string
  options?: DebugOption[]
  scoreBonus?: number
}

const SCENARIO_VENTAS: DebugStep[] = [
  {
    id: 'start',
    type: 'question',
    title: 'Los usuarios reportan que el módulo de ventas no guarda.',
    description: '¿Por dónde empiezas la investigación?',
    options: [
      {
        id: 'A',
        label: 'Reviso la consola del navegador (Frontend)',
        result:
          'Network tab: el POST /api/ventas retorna 500. El problema no es el frontend — llegó la petición.',
        nextStep: 'step_found_500',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Reviso los logs del servidor (Backend)',
        result:
          'System.NullReferenceException en VentasService.cs línea 47. Hay un objeto null. Buen instinto, pero ¿por qué llegó null?',
        nextStep: 'step_found_null_direct',
        isOptimal: true,
      },
      {
        id: 'C',
        label: 'Pregunto al usuario qué hizo exactamente',
        result:
          'Útil, pero primero necesitas datos técnicos. El usuario dice "simplemente no funcionó".',
        nextStep: 'start_hint',
        isMistake: true,
      },
    ],
  },
  {
    id: 'start_hint',
    type: 'question',
    title: 'El usuario no tiene más información técnica.',
    description: 'Necesitas datos técnicos. ¿Qué revisas ahora?',
    options: [
      {
        id: 'A',
        label: 'La consola del navegador',
        result: 'Network tab: POST /api/ventas → 500. Ahora tienes datos concretos.',
        nextStep: 'step_found_500',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Los logs del servidor',
        result: 'NullReferenceException en VentasService. Hay algo null que no debería serlo.',
        nextStep: 'step_found_null_direct',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'step_found_500',
    type: 'question',
    title: 'Encontraste el error 500. El server está fallando.',
    description: '¿Qué revisas a continuación para encontrar la causa raíz?',
    options: [
      {
        id: 'A',
        label: 'Los logs del servidor ASP.NET',
        result:
          'NullReferenceException en VentasController.cs: ClienteId es null al crear la venta.',
        nextStep: 'step_found_null',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'La base de datos directamente',
        result:
          'SQL Server no muestra errores. El request nunca llegó a la BD — el problema está antes.',
        nextStep: 'step_found_500',
        isMistake: true,
      },
    ],
  },
  {
    id: 'step_found_null',
    type: 'question',
    title: 'ClienteId llega como null al servidor.',
    description: '¿Por qué ClienteId es null? ¿Dónde se pierde?',
    options: [
      {
        id: 'A',
        label: 'Reviso el payload que envía el frontend (DevTools → Network)',
        result:
          'En el JSON enviado: "clienteId": 42 (minúscula). El DTO del server espera "ClienteId" (mayúscula). Naming mismatch.',
        nextStep: 'result_success',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Reviso la validación del formulario React',
        result:
          'El formulario sí tiene el valor correcto. Se pierde en la serialización. El JSON enviado usa camelCase pero el DTO espera PascalCase.',
        nextStep: 'result_success',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'step_found_null_direct',
    type: 'question',
    title: 'NullReferenceException: ClienteId es null.',
    description: 'Sabiendo que ClienteId llega null desde el frontend, ¿cómo lo confirmas?',
    options: [
      {
        id: 'A',
        label: 'Reviso el payload JSON en DevTools Network',
        result:
          'Confirmado: el frontend envía "clienteId" (camelCase) pero el DTO espera "ClienteId" (PascalCase). Bug encontrado.',
        nextStep: 'result_success',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Agrego breakpoints en el backend',
        result:
          'El debugger confirma que ClienteId es null al entrar al método. El problema está en la deserialización JSON.',
        nextStep: 'result_success',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'result_success',
    type: 'result',
    title: '🐛 Bug encontrado: naming mismatch JSON',
    description:
      'El frontend enviaba clienteId (camelCase) pero el DTO de ASP.NET esperaba ClienteId (PascalCase). La deserialización JSON dejaba ClienteId como null.',
    finding:
      'Solución: agregar [JsonPropertyName("clienteId")] en el DTO o configurar JsonNamingPolicy.CamelCase globalmente en Program.cs.',
    scoreBonus: 100,
  },
]

const SCENARIO_CORS: DebugStep[] = [
  {
    id: 'start',
    type: 'question',
    title: 'Algunos usuarios no pueden hacer login desde el frontend.',
    description:
      'El backend funciona en testing. Solo falla desde la app web. ¿Por dónde empiezas?',
    options: [
      {
        id: 'A',
        label: 'Reviso la consola del navegador',
        result:
          'Error: "Access to XMLHttpRequest at https://api.empresa.com from origin https://app.empresa.com has been blocked by CORS policy."',
        nextStep: 'step_found_cors',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Reviso los logs del servidor',
        result:
          'No hay errores en los logs del servidor. El request nunca llega — el navegador lo bloquea antes.',
        nextStep: 'step_hint_cors',
        isMistake: true,
      },
      {
        id: 'C',
        label: 'Pruebo desde Postman',
        result:
          'Postman funciona perfectamente. El problema es específico del navegador. Eso confirma que es CORS.',
        nextStep: 'step_found_cors',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'step_hint_cors',
    type: 'question',
    title: 'El servidor no registra el error porque el navegador bloquea antes.',
    description: '¿Dónde miras ahora?',
    options: [
      {
        id: 'A',
        label: 'La consola del navegador',
        result: 'CORS policy error en consola. El navegador bloquea el request por política de origen.',
        nextStep: 'step_found_cors',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'step_found_cors',
    type: 'question',
    title: 'CORS: el navegador bloquea el request por política de origen.',
    description: '¿Cuál es el problema real?',
    options: [
      {
        id: 'A',
        label: 'Falta el header Access-Control-Allow-Origin en el servidor',
        result:
          'Correcto. El servidor no incluye los headers CORS que el navegador requiere para permitir peticiones cross-origin.',
        nextStep: 'result_cors',
        isOptimal: true,
      },
      {
        id: 'B',
        label: 'Es un problema de DNS o dominio mal configurado',
        result:
          'No. DNS resuelve correctamente. CORS es una política del servidor, no de DNS.',
        nextStep: 'step_found_cors',
        isMistake: true,
      },
      {
        id: 'C',
        label: 'El token JWT está expirado',
        result:
          'No. El request ni siquiera llega al servidor para validar el JWT. El bloqueo es anterior.',
        nextStep: 'step_found_cors',
        isMistake: true,
      },
    ],
  },
  {
    id: 'result_cors',
    type: 'result',
    title: '🐛 Bug encontrado: CORS no configurado',
    description:
      'El servidor ASP.NET no tenía configurado el middleware de CORS para permitir peticiones desde el origen del frontend.',
    finding:
      'Solución: builder.Services.AddCors() + app.UseCors() en Program.cs, con la política correcta para el dominio del frontend.',
    scoreBonus: 100,
  },
]

const SCENARIOS: Record<string, DebugStep[]> = {
  ventas: SCENARIO_VENTAS,
  cors: SCENARIO_CORS,
}

const SCENARIO_LABELS: Record<string, string> = {
  ventas: 'Módulo de ventas no guarda',
  cors: 'Login bloqueado por CORS',
}

// ─── Debug Simulator ──────────────────────────────────────────────────────────

interface SimState {
  stepId: string
  history: Array<{ stepId: string; choiceId: string; result: string }>
  done: boolean
  score: number
}

function DebugSimulator({ scenario }: { scenario: string }) {
  const steps = SCENARIOS[scenario]

  const [state, setState] = useState<SimState>({
    stepId: 'start',
    history: [],
    done: false,
    score: 0,
  })

  const currentStep = steps.find((s) => s.id === state.stepId)!

  const handleChoice = (opt: DebugOption) => {
    const nextStep = steps.find((s) => s.id === opt.nextStep)!
    const isDone = nextStep.type === 'result'

    setState((s) => ({
      ...s,
      history: [
        ...s.history,
        { stepId: s.stepId, choiceId: opt.id, result: opt.result },
      ],
      stepId: opt.nextStep,
      done: isDone,
      score: isDone ? (nextStep.scoreBonus ?? 0) : s.score,
    }))
  }

  const handleReset = () =>
    setState({ stepId: 'start', history: [], done: false, score: 0 })

  const efficiency =
    state.history.length > 0
      ? Math.max(0, 100 - state.history.filter((h) => {
          const step = steps.find((s) => s.id === h.stepId)
          const opt = step?.options?.find((o) => o.id === h.choiceId)
          return opt?.isMistake
        }).length * 20)
      : 0

  return (
    <div className="flex flex-col gap-4">
      {/* History */}
      {state.history.length > 0 && (
        <div className="flex flex-col gap-2">
          {state.history.map((entry, i) => {
            const step = steps.find((s) => s.id === entry.stepId)
            const opt = step?.options?.find((o) => o.id === entry.choiceId)
            return (
              <div
                key={i}
                className="flex gap-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: opt?.isOptimal
                    ? 'rgba(16,185,129,0.06)'
                    : opt?.isMistake
                    ? 'rgba(239,68,68,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${opt?.isOptimal ? 'rgba(16,185,129,0.2)' : opt?.isMistake ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <span className="flex-shrink-0 font-bold" style={{ color: opt?.isOptimal ? '#10B981' : opt?.isMistake ? '#EF4444' : '#6366F1' }}>
                  {opt?.isOptimal ? '✓' : opt?.isMistake ? '✗' : '→'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--color-text-muted)] mb-0.5 text-xs">{opt?.label}</p>
                  <p className="text-[var(--color-text-secondary)]">{entry.result}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Current step */}
      <AnimatePresence mode="wait">
        {!state.done ? (
          <motion.div
            key={state.stepId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-5 flex flex-col gap-4">
              <div>
                <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {currentStep.title}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {currentStep.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {currentStep.options?.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleChoice(opt)}
                    className="flex items-start gap-3 text-left px-4 py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-white/[0.03] transition-all text-sm"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-white/5 text-[var(--color-text-muted)] mt-0.5">
                      {opt.id}
                    </span>
                    <span className="text-[var(--color-text-primary)]">{opt.label}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-5 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                  {currentStep.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
                  {currentStep.description}
                </p>
                {currentStep.finding && (
                  <div
                    className="p-3 rounded-xl text-sm"
                    style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-accent)] mb-1">
                      Fix
                    </p>
                    <p className="text-[var(--color-text-secondary)]">{currentStep.finding}</p>
                  </div>
                )}
              </div>

              <div
                className="p-4 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <p className="text-sm text-emerald-300 font-medium mb-1">
                  Eficiencia del diagnóstico:{' '}
                  <span className="font-bold">{efficiency}%</span>
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {state.history.length} pasos en total.{' '}
                  {state.history.filter((h) => {
                    const step = steps.find((s) => s.id === h.stepId)
                    return step?.options?.find((o) => o.id === h.choiceId)?.isMistake
                  }).length === 0
                    ? 'Diagnóstico directo — ¡sin rodeos!'
                    : 'Algunos pasos fueron en dirección incorrecta.'}
                </p>
              </div>

              <button
                onClick={handleReset}
                className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all"
              >
                <RotateCcw size={13} />
                Intentar de nuevo
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Layer diagram ────────────────────────────────────────────────────────────

const LAYERS = [
  {
    label: 'Presentación',
    tech: 'React · Blazor · Next.js',
    desc: 'Componentes, estado, UX',
    icon: Monitor,
    color: '#61DAFB',
  },
  {
    label: 'API / Lógica de negocio',
    tech: '.NET 8 · Java · Node.js',
    desc: 'Endpoints, validación, reglas',
    icon: Server,
    color: '#6366F1',
  },
  {
    label: 'Persistencia',
    tech: 'SQL Server · MySQL · MongoDB',
    desc: 'Queries, índices, transacciones',
    icon: Database,
    color: '#10B981',
  },
]

function StackDiagram() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {LAYERS.map((layer, i) => {
        const Icon = layer.icon
        const isHovered = hovered === i
        return (
          <motion.div
            key={layer.label}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <GlassCard className="p-4 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${layer.color}15` }}
              >
                <Icon size={18} style={{ color: layer.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--color-text-primary)] mb-0.5">
                  {layer.label}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">{layer.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p
                  className="text-xs font-medium"
                  style={{ color: isHovered ? layer.color : 'var(--color-text-muted)' }}
                >
                  {layer.tech}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )
      })}

      <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed">
        Entender las tres capas permite tomar mejores decisiones de arquitectura y diagnosticar
        bugs que cruzan fronteras — como el ejemplo del simulador de arriba.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function FullStackVisionPage() {
  useScrollToTop()
  const [scenario, setScenario] = useState<'ventas' | 'cors'>('ventas')

  return (
    <AboutPageLayout
      title="Visión Full Stack"
      description="Domino frontend y backend con la misma profundidad: no hay silos en mi trabajo."
      valueNumber="04"
      accentColor="#6366F1"
      prevPath="/sobre-mi/aprendizaje-continuo"
      prevLabel="Aprendizaje continuo"
      nextPath="/sobre-mi/trabajo-en-equipo"
      nextLabel="Trabajo en equipo"
    >
      {/* Debug Simulator */}
      <section className="mb-16">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Un bug en producción. ¿Dónde está?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Así pienso cuando algo falla. Elige dónde investigar en cada paso.
          </p>

          {/* Scenario selector */}
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(SCENARIOS) as Array<'ventas' | 'cors'>).map((key) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: scenario === key ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                  color: scenario === key ? '#6366F1' : 'var(--color-text-muted)',
                  border: `1px solid ${scenario === key ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <ArrowRight size={10} />
                {SCENARIO_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <DebugSimulator scenario={scenario} />
          </motion.div>
        </AnimatePresence>

        <div
          className="mt-4 p-4 rounded-xl text-sm"
          style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}
        >
          <strong className="text-[var(--color-text-primary)]">La ventaja full stack:</strong>{' '}
          <span className="text-[var(--color-text-secondary)]">
            Sin conocer ambas capas, este tipo de bug puede tardar horas. Conociendo el stack
            completo: minutos.
          </span>
        </div>
      </section>

      {/* Layer Diagram */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Las tres capas que manejo
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Cada capa con las tecnologías que uso y lo que implica dominarla realmente.
          </p>
        </div>
        <StackDiagram />
      </section>
    </AboutPageLayout>
  )
}
