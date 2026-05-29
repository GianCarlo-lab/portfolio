import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Monitor, Server, Database, RefreshCw } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Data ────────────────────────────────────────────────────────────────────

interface Scenario {
  id: number
  title: string
  symptom: string
  tools: {
    id: string
    icon: React.ReactNode
    label: string
    output: string
  }[]
  options: {
    id: string
    label: string
    pts: number
    feedback: string
  }[]
  gianComment: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Pedido no se crea",
    symptom: "El usuario hace click en 'Confirmar pedido' y no pasa nada. La pantalla se congela 2 segundos.",
    tools: [
      {
        id: 'browser',
        icon: <Monitor size={14} />,
        label: 'Browser DevTools',
        output: `POST /api/pedidos → 400 Bad Request
Response: {
  "error": "Validation failed",
  "field": "clienteId",
  "message": "Required field missing"
}`,
      },
      {
        id: 'server',
        icon: <Server size={14} />,
        label: 'Server Logs',
        output: `[2026-05-29 10:43:17] INFO  POST /api/pedidos
[2026-05-29 10:43:17] WARN  Validation error: ClienteId is null
[2026-05-29 10:43:17] INFO  → 400 Bad Request`,
      },
      {
        id: 'sql',
        icon: <Database size={14} />,
        label: 'SQL Server',
        output: `-- No hay errores en la BD.
-- La request no llegó al repositorio.
-- Última inserción exitosa: hace 2 horas.`,
      },
    ],
    options: [
      { id: 'A', label: 'La BD le falta el campo clienteId', pts: 0, feedback: "No. El SQL log muestra que la request nunca llegó a la BD. El error es anterior." },
      { id: 'B', label: 'El frontend no está enviando clienteId en el body', pts: 40, feedback: "Correcto. El DevTools muestra 400 con 'field: clienteId'. El backend lo validó, el frontend no lo envió. Bug en el form submit." },
      { id: 'C', label: 'El JWT de autenticación falló', pts: 0, feedback: "No. Un 401 indicaría JWT. El 400 con field validation es un problema de datos, no de auth." },
      { id: 'D', label: 'El DTO no mapea correctamente clienteId', pts: 20, feedback: "Parcialmente correcto. Puede ser el DTO. Pero el DevTools ya muestra que el campo no llega en la request — el problema está en el frontend antes del DTO." },
    ],
    gianComment: "Este bug exacto lo tuve en RADAR. El form de pedidos tenía un selector de cliente desconectado del estado de React. Enviaba el form sin el clienteId. 20 minutos de DevTools lo resolvió.",
  },
  {
    id: 2,
    title: "Excel falla con más de 1000 filas",
    symptom: "La exportación a Excel funciona con 50 registros pero falla silenciosamente con 1000+. El usuario espera y no pasa nada.",
    tools: [
      {
        id: 'browser',
        icon: <Monitor size={14} />,
        label: 'Browser DevTools',
        output: `GET /api/ventas/export → 504 Gateway Timeout
Request time: 30,021ms
Response: null (timeout)`,
      },
      {
        id: 'server',
        icon: <Server size={14} />,
        label: 'Server Logs',
        output: `[INFO]  GET /api/ventas/export?rows=1000
[INFO]  Executing query: SELECT * FROM Ventas...
[INFO]  Query elapsed: 31,450ms
[ERROR] Request timeout after 30s
[INFO]  Connection closed`,
      },
      {
        id: 'sql',
        icon: <Database size={14} />,
        label: 'Memory Profiler',
        output: `Generating Excel via ClosedXML...
Rows loaded into memory: 1,247
Memory peak: 512MB (limit: 256MB)
ClosedXML: OutOfMemoryException
Process terminated`,
      },
    ],
    options: [
      { id: 'A', label: 'La query SQL no tiene índice en la columna de fecha', pts: 15, feedback: "Parcialmente correcto. Sin índice la query es lenta. Pero el Memory Profiler muestra OutOfMemoryException — la causa principal es cargar todo en memoria." },
      { id: 'B', label: 'No hay paginación y todo se carga en memoria a la vez', pts: 40, feedback: "Correcto. Timeout en servidor + OutOfMemoryException en ClosedXML = query sin límite + generación sin chunking. La solución es OFFSET/FETCH en SQL y generación por lotes." },
      { id: 'C', label: 'El servidor no tiene suficiente RAM', pts: 0, feedback: "No. El problema es arquitectural, no de hardware. Más RAM solo pospone el problema. La solución es no cargar todo en memoria." },
      { id: 'D', label: 'El timeout del servidor es muy corto', pts: 5, feedback: "No es la causa raíz. Aumentar el timeout solo hace que el usuario espere más antes de fallar. El problema es que la operación no escala." },
    ],
    gianComment: "Este segundo bug lo resolví exactamente en RADAR. El módulo de ventas fallaba con más de 500 registros. Implementé paginación en la query con OFFSET/FETCH y generación por chunks en ClosedXML. El Excel de 10,000 filas ahora genera en 3 segundos.",
  },
]

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 30], message: "El debug fullstack es una habilidad que se desarrolla. Lo clave: siempre empieza por el error más cercano al síntoma.", color: '#F59E0B' },
  { range: [31, 55], message: "Buen razonamiento. Usaste las herramientas correctamente para aislar el problema.", color: '#06B6D4' },
  { range: [56, 80], message: "Pensamiento sistemático sólido. Así es como se debuggea en producción real.", color: '#10B981' },
  { range: [81, 140], message: "Diagnóstico de nivel senior. Conectas síntoma, herramientas y causa raíz sin asumir.", color: '#6366F1' },
]

// ── Debug Game ────────────────────────────────────────────────────────────────

function DebugGame({ onComplete }: { onComplete: (pts: number) => void }) {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [usedTools, setUsedTools] = useState<Set<string>>(new Set())
  const [openTool, setOpenTool] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [totalPts, setTotalPts] = useState(0)
  const [scenarioPts, setScenarioPts] = useState<number[]>([])
  const [allDone, setAllDone] = useState(false)

  const scenario = SCENARIOS[scenarioIdx]

  const handleToolClick = (toolId: string) => {
    setUsedTools(prev => new Set([...prev, toolId]))
    setOpenTool(openTool === toolId ? null : toolId)
  }

  const handleSubmit = () => {
    if (!answer || submitted) return
    const opt = scenario.options.find(o => o.id === answer)!
    const toolBonus = usedTools.size * 10
    const pts = opt.pts + toolBonus
    const newTotal = totalPts + pts
    const newScenarioPts = [...scenarioPts, pts]

    setTotalPts(newTotal)
    setScenarioPts(newScenarioPts)
    setSubmitted(true)

    if (scenarioIdx === SCENARIOS.length - 1) {
      setAllDone(true)
      onComplete(newTotal)
    }
  }

  const nextScenario = () => {
    setScenarioIdx(s => s + 1)
    setUsedTools(new Set())
    setOpenTool(null)
    setAnswer(null)
    setSubmitted(false)
  }

  const submittedOpt = submitted && answer ? scenario.options.find(o => o.id === answer) : null

  return (
    <div className="flex flex-col gap-5">
      {/* Scenario header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Escenario {scenarioIdx + 1} de {SCENARIOS.length}</p>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{scenario.title}</p>
        </div>
        {scenarioPts.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>
            {scenarioPts.reduce((a, b) => a + b, 0)} pts
          </span>
        )}
      </div>

      {/* Symptom */}
      <GlassCard className="p-4">
        <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">Síntoma reportado por el usuario:</p>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">"{scenario.symptom}"</p>
      </GlassCard>

      {/* Toolbar */}
      <div className="flex gap-2 flex-wrap">
        {scenario.tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: openTool === tool.id ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${usedTools.has(tool.id) ? 'rgba(99,102,241,0.4)' : 'var(--color-border)'}`,
              color: usedTools.has(tool.id) ? '#A5B4FC' : 'var(--color-text-secondary)',
            }}
          >
            {tool.icon}
            {tool.label}
            {usedTools.has(tool.id) && <span style={{ color: '#10B981' }}>+10pts</span>}
          </button>
        ))}
      </div>

      {/* Tool output */}
      <AnimatePresence>
        {openTool && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <GlassCard className="p-4">
              <pre className="text-xs leading-relaxed overflow-x-auto font-mono" style={{ color: '#A5B4FC' }}>
                {scenario.tools.find(t => t.id === openTool)?.output}
              </pre>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      {usedTools.size > 0 && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">¿Dónde está el bug?</p>
            <div className="flex flex-col gap-2">
              {scenario.options.map(opt => {
                const isSelected = answer === opt.id
                const isCorrect = opt.pts >= 35
                let bg = isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)'
                let borderCol = isSelected ? '#6366F1' : 'var(--color-border)'
                if (submitted && isSelected && isCorrect) { bg = 'rgba(16,185,129,0.12)'; borderCol = '#10B981' }
                if (submitted && isSelected && !isCorrect) { bg = 'rgba(245,158,11,0.12)'; borderCol = '#F59E0B' }

                return (
                  <button
                    key={opt.id}
                    disabled={submitted}
                    onClick={() => setAnswer(opt.id)}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all"
                    style={{ background: bg, borderColor: borderCol }}
                  >
                    <span
                      className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: isSelected ? '#6366F1' : 'rgba(255,255,255,0.1)', color: isSelected ? 'white' : 'var(--color-text-muted)' }}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">{opt.label}</span>
                  </button>
                )
              })}
            </div>

            {answer && !submitted && (
              <button
                onClick={handleSubmit}
                className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#6366F1' }}
              >
                Confirmar diagnóstico →
              </button>
            )}

            {submitted && submittedOpt && (
              <div className="flex flex-col gap-3">
                <GlassCard className="p-4">
                  <p className="text-xs font-semibold mb-2" style={{ color: submittedOpt.pts >= 35 ? '#10B981' : '#F59E0B' }}>
                    {submittedOpt.pts >= 35 ? '✓ Diagnóstico correcto' : '⚠ Diagnóstico parcial'}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{submittedOpt.feedback}</p>
                </GlassCard>
                <p className="text-sm font-semibold" style={{ color: '#6366F1' }}>
                  {submittedOpt.pts + usedTools.size * 10} pts (diagnóstico: {submittedOpt.pts} + herramientas: {usedTools.size * 10})
                </p>
                {!allDone && (
                  <button
                    onClick={nextScenario}
                    className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: '#6366F1' }}
                  >
                    <RefreshCw size={14} />
                    Siguiente escenario →
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {usedTools.size === 0 && (
        <p className="text-xs text-[var(--color-text-muted)] italic">
          Usa al menos una herramienta de diagnóstico para desbloquear la pregunta. Cada herramienta usada suma 10pts.
        </p>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function FullStackVisionPage() {
  const [gameScore, setGameScore] = useState<number | null>(null)

  return (
    <AboutPageLayout
      title="Visión Fullstack"
      description="Ownership del sistema completo: del schema SQL hasta la vista de usuario. Sin silos, sin dependencias innecesarias."
      valueNumber="04"
      accentColor="#F59E0B"
      prevPath="/sobre-mi/aprendizaje-continuo"
      prevLabel="Aprendizaje continuo"
      nextPath="/sobre-mi/trabajo-en-equipo"
      nextLabel="Trabajo en equipo"
    >
      <div className="flex flex-col gap-10">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #F59E0B' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "En RADAR tuve ownership completo del módulo de Abastecimiento: diseñé el schema SQL,
            construí la API REST en .NET, conecté los endpoints desde Blazor y validé cada caso de uso en producción.
            Cuando hay un bug, no espero que alguien del backend lo revise — lo encuentro yo.
            Eso es lo que significa pensar en sistema, no en capas."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#F59E0B' }}>— Gian, módulo Abastecimiento, RADAR ERP</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#F59E0B' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['End-to-end ownership', 'Sin silos', 'Sistema > componentes'].map(p => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Exercise */}
        <GlassCard className="p-6">
          <ChallengeCard
            number={1}
            total={1}
            title="Debug fullstack en producción"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                2 escenarios de producción real. Usa las herramientas de diagnóstico disponibles (cada una suma 10pts) y luego identifica la causa raíz del bug.
              </span>
            }
            question="Reproduce el proceso de debug que usaría un fullstack: observa el síntoma, investiga con las herramientas disponibles, diagnostica la causa raíz."
            points={140}
          >
            <DebugGame onComplete={setGameScore} />
          </ChallengeCard>
        </GlassCard>

        {/* ScoreBoard */}
        <AnimatePresence>
          {gameScore !== null && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ScoreBoard
                userScore={gameScore}
                maxScore={140}
                gianScore={140}
                feedback={FEEDBACK}
                gianComment="Este segundo bug lo resolví exactamente en RADAR. El módulo de ventas fallaba con más de 500 registros. Implementé paginación en la query con OFFSET/FETCH y generación por chunks en ClosedXML. El Excel de 10,000 filas ahora genera en 3 segundos."
                onReset={() => setGameScore(null)}
                onNext={() => { window.location.href = '/sobre-mi/trabajo-en-equipo' }}
                nextLabel="Siguiente: Trabajo en equipo →"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AboutPageLayout>
  )
}
