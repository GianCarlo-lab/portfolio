import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Types ───────────────────────────────────────────────────────────────────

interface Slot {
  id: string
  label: string
  value: string | null
}

interface DndOption {
  id: string
  label: string
}

// ── Data ────────────────────────────────────────────────────────────────────

const BLANK_LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

const CORRECT_MAP: Record<string, string> = {
  A: 'calculateWeightedTotal',
  B: 'discount',
  C: 'prices',
  D: 'validPrices',
  E: 'sum',
  F: 'price',
}

const ALL_OPTIONS: DndOption[] = [
  { id: 'calculateWeightedTotal', label: 'calculateWeightedTotal' },
  { id: 'discount', label: 'discount' },
  { id: 'prices', label: 'prices' },
  { id: 'validPrices', label: 'validPrices' },
  { id: 'sum', label: 'sum' },
  { id: 'price', label: 'price' },
  { id: 'calc', label: 'calc' },
  { id: 'd', label: 'd' },
  { id: 'arr', label: 'arr' },
  { id: 'r', label: 'r' },
  { id: 's', label: 's' },
  { id: 'x', label: 'x' },
]

const SOLID_LINES = [
  { id: 1, code: "  const order = db.find(orderId)", correct: false },
  { id: 2, code: "  order.status = 'processed'", correct: false },
  { id: 3, code: "  db.save(order)", correct: false },
  { id: 4, code: "  email.send(order.userId, 'Tu pedido...')", correct: true },
  { id: 5, code: "  pdf.generate(order)", correct: true },
  { id: 6, code: "  log.write('Order: ' + orderId)", correct: true },
  { id: 7, code: "  return order", correct: false },
]

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 40], message: "Bien comienzo. Los nombres importan más de lo que parece — cada variable que lees es un contrato con el siguiente dev.", color: '#F59E0B' },
  { range: [41, 80], message: "Buen ojo. Estás aplicando principios reales. Con práctica constante esto se vuelve instintivo.", color: '#06B6D4' },
  { range: [81, 105], message: "Sólido. Escribes código que se explica a sí mismo. Eso ahorra horas de debug a futuro.", color: '#10B981' },
  { range: [106, 120], message: "Excelente. Tu código habla por sí solo. Eso es lo que separa a un dev bueno de uno excelente.", color: '#6366F1' },
]

// ── Exercise 1: Drag & Drop rename ──────────────────────────────────────────

function Ex1({ onComplete }: { onComplete: (pts: number) => void }) {
  const initialSlots: Slot[] = BLANK_LABELS.map(id => ({ id, label: id, value: null }))
  const [slots, setSlots] = useState<Slot[]>(initialSlots)
  const [pool, setPool] = useState<DndOption[]>(ALL_OPTIONS)
  const [dragging, setDragging] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [shaking, setShaking] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [pts, setPts] = useState(0)

  const placeOption = useCallback((slotId: string, optionId: string) => {
    const option = ALL_OPTIONS.find(o => o.id === optionId)
    if (!option) return
    const correct = CORRECT_MAP[slotId] === optionId

    if (!correct) {
      setShaking(slotId)
      setTimeout(() => setShaking(null), 600)
      setPool(p => p.some(o => o.id === optionId) ? p : [...p, option])
      return
    }

    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, value: optionId } : s))
    setPool(p => p.filter(o => o.id !== optionId))
  }, [])

  const handleDrop = (slotId: string) => {
    if (!dragging) return
    placeOption(slotId, dragging)
    setDragging(null)
  }

  const handleSlotClick = (slotId: string) => {
    if (submitted) return
    if (slots.find(s => s.id === slotId)?.value) return
    if (!selected) return
    placeOption(slotId, selected)
    setSelected(null)
  }

  const handleSubmit = () => {
    let score = 0
    slots.forEach(s => {
      if (s.value && CORRECT_MAP[s.id] === s.value) score += 10
    })
    setPts(score)
    setSubmitted(true)
    onComplete(score)
  }

  const allFilled = slots.every(s => s.value !== null)

  const renderSlot = (id: string) => {
    const slot = slots.find(s => s.id === id)!
    const val = slot.value
    const isCorrect = val && CORRECT_MAP[id] === val
    const color = submitted ? (isCorrect ? '#10B981' : '#EF4444') : '#6366F1'
    const isShaking = shaking === id

    return (
      <motion.span
        key={id}
        animate={isShaking ? { x: [-3, 3, -3, 3, 0] } : {}}
        transition={{ duration: 0.3 }}
        onDragOver={(e) => { e.preventDefault() }}
        onDrop={() => handleDrop(id)}
        onClick={() => handleSlotClick(id)}
        style={{
          display: 'inline-block',
          minWidth: val ? 'auto' : 100,
          padding: '1px 8px',
          borderRadius: 6,
          border: `1px dashed ${val ? color : 'rgba(99,102,241,0.4)'}`,
          color: val ? color : 'rgba(99,102,241,0.6)',
          cursor: selected && !val ? 'pointer' : 'default',
          background: val ? `${color}18` : 'rgba(99,102,241,0.06)',
          fontWeight: val ? 600 : 400,
          verticalAlign: 'middle',
        }}
      >
        {val ?? `___${id}___`}
      </motion.span>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <GlassCard className="p-5">
        <pre className="text-sm leading-loose overflow-x-auto whitespace-pre-wrap">
          <span style={{ color: '#8B5CF6' }}>function </span>{renderSlot('A')}<span style={{ color: 'var(--color-text-secondary)' }}>(</span>{renderSlot('B')}<span style={{ color: 'var(--color-text-secondary)' }}>, </span>{renderSlot('C')}<span style={{ color: 'var(--color-text-secondary)' }}>{') {'}</span>{'\n'}
          <span style={{ color: 'var(--color-text-secondary)' }}>{'  '}</span><span style={{ color: '#06B6D4' }}>const </span>{renderSlot('D')}<span style={{ color: 'var(--color-text-secondary)' }}> = </span><span style={{ color: 'var(--color-text-secondary)' }}>prices</span><span style={{ color: 'var(--color-text-secondary)' }}>.filter(Boolean)</span>{'\n'}
          <span style={{ color: 'var(--color-text-secondary)' }}>{'  '}</span><span style={{ color: '#06B6D4' }}>return </span>{renderSlot('D')}<span style={{ color: 'var(--color-text-secondary)' }}>.reduce((</span>{renderSlot('E')}<span style={{ color: 'var(--color-text-secondary)' }}>, </span>{renderSlot('F')}<span style={{ color: 'var(--color-text-secondary)' }}>{') => '}</span>{renderSlot('E')}<span style={{ color: 'var(--color-text-secondary)' }}> + </span>{renderSlot('F')}<span style={{ color: 'var(--color-text-secondary)' }}> * </span>{renderSlot('B')}<span style={{ color: 'var(--color-text-secondary)' }}>, 0)</span>{'\n'}
          <span style={{ color: 'var(--color-text-secondary)' }}>{'}'}</span>
        </pre>
      </GlassCard>

      {/* Option pool */}
      <div className="flex flex-wrap gap-2">
        {pool.map(opt => (
          <motion.span
            key={opt.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            draggable
            onDragStart={() => setDragging(opt.id)}
            onDragEnd={() => setDragging(null)}
            onClick={() => setSelected(selected === opt.id ? null : opt.id)}
            className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium cursor-grab select-none transition-all"
            style={{
              background: selected === opt.id ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.1)',
              border: `1px solid ${selected === opt.id ? 'rgba(99,102,241,0.6)' : 'rgba(99,102,241,0.3)'}`,
              color: '#A5B4FC',
            }}
          >
            {opt.label}
          </motion.span>
        ))}
        {pool.length === 0 && !submitted && (
          <p className="text-xs text-[var(--color-text-muted)] italic">Todos los espacios asignados.</p>
        )}
      </div>

      {selected && (
        <p className="text-xs text-[var(--color-text-muted)] italic">
          Seleccionado: <span style={{ color: '#6366F1' }} className="font-semibold">{selected}</span> — haz click en un espacio en blanco para colocarlo.
        </p>
      )}

      {!submitted && allFilled && (
        <button
          onClick={handleSubmit}
          className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#6366F1' }}
        >
          Confirmar nombres →
        </button>
      )}

      {submitted && (
        <p className="text-sm font-semibold" style={{ color: pts >= 50 ? '#10B981' : '#F59E0B' }}>
          {pts === 60 ? '¡Perfecto! Todos los nombres son descriptivos y correctos.' : `${pts}/60 pts`}
        </p>
      )}
    </div>
  )
}

// ── Exercise 2: SOLID violations ────────────────────────────────────────────

function Ex2({ onComplete }: { onComplete: (pts: number) => void }) {
  const [clicked, setClicked] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [pts, setPts] = useState(0)
  const [bonusEarned, setBonusEarned] = useState(false)
  const [showRefactor, setShowRefactor] = useState(false)

  const handleLineClick = (lineId: number, correct: boolean) => {
    if (submitted) return
    if (clicked[lineId] !== undefined) return
    setClicked(prev => ({ ...prev, [lineId]: correct }))
  }

  const handleSubmit = () => {
    let score = 0
    let noWrong = true
    Object.entries(clicked).forEach(([, correct]) => {
      if (correct) score += 15
      else { score -= 5; noWrong = false }
    })
    const bonus = noWrong && Object.values(clicked).filter(Boolean).length === 3 ? 15 : 0
    score = Math.max(0, score + bonus)
    setBonusEarned(noWrong && bonus > 0)
    setPts(score)
    setSubmitted(true)
    onComplete(score)
  }

  const selectedCount = Object.keys(clicked).length

  return (
    <div className="flex flex-col gap-5">
      <GlassCard className="p-5">
        <pre className="text-sm leading-loose overflow-x-auto">
          <span style={{ color: '#8B5CF6' }}>function </span>
          <span style={{ color: '#06B6D4' }}>processOrder</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>(orderId, db, email, pdf, log) {'{'}</span>
          {SOLID_LINES.map(line => {
            const state = clicked[line.id]
            let bg = 'transparent'
            let borderColor = 'transparent'
            if (state === true && submitted) { bg = 'rgba(16,185,129,0.12)'; borderColor = '#10B981' }
            if (state === false && submitted) { bg = 'rgba(239,68,68,0.12)'; borderColor = '#EF4444' }
            if (state !== undefined && !submitted) { bg = 'rgba(99,102,241,0.12)'; borderColor = '#6366F1' }

            return (
              <div
                key={line.id}
                onClick={() => handleLineClick(line.id, line.correct)}
                className="cursor-pointer rounded px-2 py-0.5 transition-all select-none"
                style={{ background: bg, borderLeft: `3px solid ${borderColor}` }}
              >
                <span style={{ color: '#64748B', userSelect: 'none', marginRight: 12 }}>{line.id}</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{line.code}</span>
                {state !== undefined && !submitted && <span className="ml-2 text-xs" style={{ color: '#6366F1' }}>✓ seleccionada</span>}
                {submitted && state === true && <span className="ml-2 text-xs" style={{ color: '#10B981' }}>+15pts ✓</span>}
                {submitted && state === false && <span className="ml-2 text-xs" style={{ color: '#EF4444' }}>-5pts ✗</span>}
              </div>
            )
          })}
          <span style={{ color: 'var(--color-text-secondary)' }}>{'}'}</span>
        </pre>
      </GlassCard>

      {!submitted && (
        <div className="flex items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">{selectedCount} línea(s) seleccionada(s)</p>
          {selectedCount > 0 && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: '#6366F1' }}
            >
              Confirmar selección →
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold" style={{ color: pts >= 40 ? '#10B981' : '#F59E0B' }}>
            {pts}pts{bonusEarned && ' + 15 bonus por precisión perfecta'}
          </p>
          <button
            onClick={() => setShowRefactor(!showRefactor)}
            className="self-start text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            {showRefactor ? 'Ocultar' : 'Ver versión refactorizada →'}
          </button>
          <AnimatePresence>
            {showRefactor && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <GlassCard className="p-4">
                  <pre className="text-xs leading-loose overflow-x-auto" style={{ color: 'var(--color-text-secondary)' }}>{`// Cada función hace UNA sola cosa
function processOrder(orderId, db) {
  const order = db.find(orderId)
  order.status = 'processed'
  db.save(order)
  return order
}

function notifyUser(order, email) {
  email.send(order.userId, 'Tu pedido...')
}

function generateDocument(order, pdf) {
  pdf.generate(order)
}

function auditOrder(orderId, log) {
  log.write('Order: ' + orderId)
}`}</pre>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function CleanCodePage() {
  useScrollToTop()
  const [ex1Score, setEx1Score] = useState<number | null>(null)
  const [ex2Score, setEx2Score] = useState<number | null>(null)

  const totalScore = (ex1Score ?? 0) + (ex2Score ?? 0)
  const allDone = ex1Score !== null && ex2Score !== null

  return (
    <AboutPageLayout
      title="Clean Code"
      description="El código limpio no es un lujo, es respeto por quienes vienen después — y por ti mismo seis meses más tarde."
      valueNumber="01"
      accentColor="#6366F1"
      nextPath="/sobre-mi/atencion-al-detalle"
      nextLabel="Atención al detalle"
    >
      <div className="flex flex-col gap-10">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #6366F1' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "En el módulo de Abastecimiento de RADAR, heredé funciones de 80 líneas con variables como{' '}
            <code className="not-italic font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>d</code>,{' '}
            <code className="not-italic font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>arr</code>,{' '}
            <code className="not-italic font-mono text-xs px-1 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>r</code>.
            Tardé 3 días en entender qué hacían. Cuando las reescribí con nombres descriptivos, el siguiente desarrollador lo entendió en 20 minutos.
            Esa diferencia es lo que me enseñó que el clean code no es vanidad, es productividad real."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#6366F1' }}>— Gian, módulo Abastecimiento, RADAR ERP</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#6366F1' }} />
        </div>

        {/* Philosophy pills */}
        <div className="flex flex-wrap gap-2">
          {['Nombres que documentan', 'Una función, una responsabilidad', 'TypeScript siempre'].map(p => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.25)' }}
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
            title="Nombra la función y sus parámetros"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                Esta función existe en producción. Los nombres originales son inútiles. Arrastra (o haz click) las opciones correctas a cada espacio.
              </span>
            }
            question="¿Qué nombre descriptivo le darías a cada variable?"
            points={60}
          >
            <Ex1 onComplete={setEx1Score} />
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
                  title="Encuentra las violaciones SOLID"
                  context={
                    <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                      Esta función mezcla lógica de negocio, persistencia, notificaciones y auditoría.
                    </span>
                  }
                  question="Haz click en las líneas que violan el Principio de Responsabilidad Única (SRP) — las que debería manejar otra función."
                  points={60}
                >
                  <Ex2 onComplete={setEx2Score} />
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
                maxScore={120}
                gianScore={120}
                feedback={FEEDBACK}
                gianComment="En RADAR aplico exactamente esto. El módulo de Abastecimiento tiene interfaces TypeScript para cada DTO, nombres descriptivos en cada variable y cada función del servicio hace exactamente una cosa. Cuando revisé el código después de 3 meses, lo entendí en minutos."
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
