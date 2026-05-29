import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Timer, Eye, Check } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Data ────────────────────────────────────────────────────────────────────

const ERRORS = [
  { id: 1, label: "Indentación inconsistente en nav", detail: "Clientes está desalineado 4px respecto a los demás ítems." },
  { id: 2, label: "Stat cards de diferente altura", detail: "La card de 'Ingresos' mide 92px y la de 'Pedidos' 104px." },
  { id: 3, label: "Formato de moneda inconsistente", detail: "'S/. 12k' vs 'S/.120' — sin espacio y sin formato unificado." },
  { id: 4, label: "Padding diferente por fila en tabla", detail: "Fila 1: py-3, Fila 2: py-2, Fila 3: py-3. No es consistente." },
  { id: 5, label: "Peso tipográfico inconsistente en estado", detail: "'Pagado' en bold, 'Pendiente' en regular. Mismo componente." },
  { id: 6, label: "Header desalineado con el contenido", detail: "'Dashboard' tiene padding-left: 24px, el contenido usa 20px." },
  { id: 7, label: "Íconos de diferente tamaño en header", detail: "Ícono Perfil: 20px, ícono Menu: 22px." },
]

const ACCENT_OPTIONS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 40], message: "Buen ojo en entrenamiento. Con práctica empiezas a ver lo que el usuario siente pero no puede nombrar.", color: '#F59E0B' },
  { range: [41, 80], message: "Estás notando más de lo que la mayoría. Eso es atención al detalle real.", color: '#06B6D4' },
  { range: [81, 110], message: "Muy buen ojo clínico. Captas inconsistencias que afectan la percepción de calidad.", color: '#10B981' },
  { range: [111, 130], message: "¡Ojo clínico perfecto! Encontraste todos los errores. Así se construye un producto premium.", color: '#6366F1' },
]

// ── Exercise 1: Dashboard Inspector ─────────────────────────────────────────

function DashboardInspector({ onComplete }: { onComplete: (pts: number) => void }) {
  const [found, setFound] = useState<number[]>([])
  const [wrong, setWrong] = useState<number[]>([])
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pts, setPts] = useState(0)
  const [shownDetail, setShownDetail] = useState<number | null>(null)
  const [showFixed, setShowFixed] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (running) return
    setRunning(true)
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const handleErrorClick = (id: number) => {
    if (submitted) return
    startTimer()
    if (found.includes(id)) { setShownDetail(id); return }
    const isError = ERRORS.some(e => e.id === id)
    if (!isError) {
      setWrong(prev => [...prev, id])
      return
    }
    const newFound = [...found, id]
    setFound(newFound)
    setShownDetail(id)
    if (newFound.length === ERRORS.length) {
      finalize(newFound)
    }
  }

  const finalize = (foundIds: number[]) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    let score = 0
    foundIds.forEach((_, i) => {
      if (i < 3) score += 15
      else if (i < 6) score += 20
      else score += 25
    })
    const wrongPenalty = wrong.length * 5
    score = Math.max(0, score - wrongPenalty)
    setPts(score)
    setSubmitted(true)
    onComplete(score)
  }

  const handleSubmit = () => finalize(found)

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  // Dashboard click zones (fake UI)
  const zone = (id: number, children: React.ReactNode, className?: string, extraStyle?: React.CSSProperties) => (
    <div
      onClick={() => handleErrorClick(id)}
      className={`relative cursor-pointer transition-all select-none ${className ?? ''}`}
      style={{
        ...extraStyle,
        outline: found.includes(id)
          ? '2px solid #10B981'
          : shownDetail === id
          ? '2px dashed #6366F1'
          : 'none',
        outlineOffset: 2,
      }}
      title={`Zona ${id}`}
    >
      {children}
      {found.includes(id) && (
        <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-xs z-10">
          ✓
        </span>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Timer + score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Timer size={14} />
          <span className="font-mono">{mm}:{ss}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={14} style={{ color: '#6366F1' }} />
          <span className="text-sm font-semibold" style={{ color: '#6366F1' }}>{found.length}/{ERRORS.length} errores</span>
          {wrong.length > 0 && <span className="text-xs text-red-400">-{wrong.length * 5}pts por clicks incorrectos</span>}
        </div>
      </div>

      {/* Fake dashboard */}
      <GlassCard className="p-0 overflow-hidden">
        <div style={{ background: 'rgba(10,10,20,0.95)', borderRadius: 12 }}>
          {/* Header */}
          {zone(6,
            <div className="flex items-center justify-between py-3 px-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="font-bold text-[var(--color-text-primary)]" style={{ paddingLeft: 4 }}>Dashboard</span>
              <div className="flex items-center gap-3">
                {zone(7,
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded bg-white/10" style={{ width: 20, height: 20 }} />
                    <div className="rounded bg-white/10" style={{ width: 22, height: 20 }} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex">
            {/* Sidebar */}
            <div className="w-36 py-4 border-r flex flex-col gap-1" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {zone(1,
                <div className="flex flex-col gap-1">
                  {['Inicio', 'Ventas', 'Clientes', 'Reportes'].map((item, i) => (
                    <div
                      key={item}
                      className="px-4 py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                      style={{ paddingLeft: item === 'Clientes' ? 20 : 16 }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 flex flex-col gap-4">
              {/* Stat cards */}
              <div className="flex gap-3">
                {zone(2,
                  <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', height: 92 }}>
                    <p className="text-xs text-[var(--color-text-muted)]">Ingresos</p>
                    {zone(3,
                      <p className="text-xl font-bold text-[var(--color-text-primary)] mt-1">S/. 12k</p>
                    )}
                  </div>
                )}
                <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', height: 104 }}>
                  <p className="text-xs text-[var(--color-text-muted)]">Pedidos</p>
                  <p className="text-xl font-bold text-[var(--color-text-primary)] mt-1">S/.120</p>
                </div>
              </div>

              {/* Table */}
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">Ventas recientes</p>
                <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {[
                    { name: 'Producto A', amount: 'S/. 320', status: 'Pagado', py: 'py-3' },
                    { name: 'Producto B', amount: 'S/. 180', status: 'Pendiente', py: 'py-2' },
                    { name: 'Producto C', amount: 'S/. 540', status: 'Pagado', py: 'py-3' },
                  ].map((row, i) =>
                    zone(i === 1 ? 4 : (i === 0 ? 0 : 0),
                      zone(5,
                        <div className={`flex items-center justify-between px-3 text-xs ${row.py} border-b`} style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{row.name}</span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{row.amount}</span>
                          <span style={{ color: row.status === 'Pagado' ? '#10B981' : '#F59E0B', fontWeight: row.status === 'Pagado' ? 700 : 400 }}>{row.status}</span>
                        </div>,
                        undefined,
                        { cursor: 'pointer' }
                      ),
                      undefined,
                      { cursor: 'pointer' }
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Error detail */}
      <AnimatePresence>
        {shownDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#10B981' }}>
                    Error #{shownDetail}: {ERRORS.find(e => e.id === shownDetail)?.label}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {ERRORS.find(e => e.id === shownDetail)?.detail}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error list */}
      {found.length > 0 && (
        <div className="flex flex-col gap-1">
          {found.map(id => (
            <p key={id} className="text-xs text-[var(--color-text-muted)] flex gap-2 items-center">
              <span style={{ color: '#10B981' }}>✓</span>
              {ERRORS.find(e => e.id === id)?.label}
            </p>
          ))}
        </div>
      )}

      {!submitted && found.length > 0 && found.length < ERRORS.length && (
        <button
          onClick={handleSubmit}
          className="self-start px-4 py-2 rounded-xl text-sm font-medium border transition-all"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
        >
          Terminar con {found.length} encontrado(s)
        </button>
      )}

      {submitted && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold" style={{ color: pts >= 90 ? '#10B981' : '#F59E0B' }}>
            {pts}/130 pts — {found.length === 7 ? '¡Ojo clínico perfecto!' : `Encontraste ${found.length} de 7 errores.`}
          </p>
          <button
            onClick={() => setShowFixed(!showFixed)}
            className="self-start text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            {showFixed ? 'Volver al original' : 'Ver versión corregida →'}
          </button>
          {showFixed && (
            <GlassCard className="p-4">
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Versión corregida: indentación uniforme (16px en nav), stat cards misma altura (96px),
                moneda unificada (S/ 12,000), padding de tabla py-3 en todas las filas,
                estado en font-medium uniforme, header con padding-left: 20px, íconos 20px en header.
              </p>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  )
}

// ── Exercise 2: Design System Playground ─────────────────────────────────────

function DesignPlayground({ onComplete }: { onComplete: (pts: number) => void }) {
  const [spacing, setSpacing] = useState(8)
  const [radius, setRadius] = useState(8)
  const [fontSize, setFontSize] = useState(14)
  const [shadow, setShadow] = useState(10)
  const [animSpeed, setAnimSpeed] = useState(300)
  const [accent, setAccent] = useState('#6366F1')
  const [submitted, setSubmitted] = useState(false)

  const previewVars = {
    '--pw-sp': `${spacing}px`,
    '--pw-r': `${radius}px`,
    '--pw-fs': `${fontSize}px`,
    '--pw-sh': `0 0 ${shadow}px rgba(0,0,0,0.4)`,
    '--pw-accent': accent,
  } as React.CSSProperties

  const gianValues = { spacing: 8, radius: 8, fontSize: 14, shadow: 10, accent: '#6366F1' }

  const handleDone = () => {
    if (submitted) return
    let score = 50
    const diffs = [
      Math.abs(spacing - gianValues.spacing),
      Math.abs(radius - gianValues.radius),
      Math.abs(fontSize - gianValues.fontSize),
      Math.abs(shadow - gianValues.shadow),
    ]
    diffs.forEach(d => { score -= d * 2 })
    if (accent !== gianValues.accent) score -= 10
    const finalScore = Math.max(0, Math.min(50, score))
    setSubmitted(true)
    onComplete(finalScore)
  }

  const SliderRow = ({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) => (
    <div className="flex items-center gap-4">
      <span className="text-xs text-[var(--color-text-muted)] w-28 flex-shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        disabled={submitted}
        className="flex-1 accent-[#6366F1]"
      />
      <span className="text-xs font-mono text-[var(--color-text-secondary)] w-10 text-right">{value}</span>
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Sliders */}
      <GlassCard className="p-5">
        <div className="flex flex-col gap-4">
          <SliderRow label="Spacing base (px)" value={spacing} min={4} max={12} onChange={setSpacing} />
          <SliderRow label="Border radius (px)" value={radius} min={0} max={20} onChange={setRadius} />
          <SliderRow label="Font size (px)" value={fontSize} min={12} max={18} onChange={setFontSize} />
          <SliderRow label="Shadow blur (px)" value={shadow} min={0} max={20} onChange={setShadow} />
          <SliderRow label="Anim speed (ms)" value={animSpeed} min={100} max={600} onChange={setAnimSpeed} />

          {/* Accent colors */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--color-text-muted)] w-28 flex-shrink-0">Accent color</span>
            <div className="flex gap-2">
              {ACCENT_OPTIONS.map(c => (
                <button
                  key={c}
                  onClick={() => !submitted && setAccent(c)}
                  className="w-6 h-6 rounded-full transition-all"
                  style={{
                    background: c,
                    outline: accent === c ? `2px solid white` : 'none',
                    outlineOffset: 2,
                    transform: accent === c ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Preview */}
      <div style={previewVars}>
        <GlassCard className="p-5">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-4">Preview del sistema</p>
          <div className="flex flex-wrap gap-3 items-start">
            {/* Primary button */}
            <button
              className="font-semibold text-white transition-all"
              style={{
                padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`,
                borderRadius: `var(--pw-r)`,
                fontSize: `var(--pw-fs)`,
                boxShadow: `var(--pw-sh)`,
                background: `var(--pw-accent)`,
                transitionDuration: `${animSpeed}ms`,
              }}
            >
              Confirmar
            </button>
            {/* Secondary button */}
            <button
              className="font-medium transition-all"
              style={{
                padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`,
                borderRadius: `var(--pw-r)`,
                fontSize: `var(--pw-fs)`,
                boxShadow: `var(--pw-sh)`,
                border: `1px solid var(--pw-accent)`,
                color: `var(--pw-accent)`,
                background: 'transparent',
                transitionDuration: `${animSpeed}ms`,
              }}
            >
              Cancelar
            </button>
            {/* Input */}
            <input
              placeholder="usuario@correo.com"
              className="outline-none bg-transparent"
              style={{
                padding: `var(--pw-sp) calc(var(--pw-sp) * 1.5)`,
                borderRadius: `var(--pw-r)`,
                fontSize: `var(--pw-fs)`,
                border: `1px solid rgba(255,255,255,0.15)`,
                color: 'var(--color-text-secondary)',
              }}
            />
            {/* Badge */}
            <span
              className="font-semibold"
              style={{
                padding: `calc(var(--pw-sp) * 0.4) calc(var(--pw-sp))`,
                borderRadius: `calc(var(--pw-r) * 2)`,
                fontSize: `calc(var(--pw-fs) - 2px)`,
                background: `${accent}20`,
                color: `var(--pw-accent)`,
              }}
            >
              Badge
            </span>
            {/* Card */}
            <div
              style={{
                padding: `var(--pw-sp)`,
                borderRadius: `var(--pw-r)`,
                fontSize: `var(--pw-fs)`,
                boxShadow: `var(--pw-sh)`,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--color-text-secondary)',
                minWidth: 120,
              }}
            >
              Card de ejemplo
            </div>
          </div>
        </GlassCard>
      </div>

      {!submitted && (
        <button
          onClick={handleDone}
          className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#6366F1' }}
        >
          Guardar configuración →
        </button>
      )}

      {submitted && (
        <p className="text-sm font-semibold" style={{ color: '#10B981' }}>
          Configuración guardada. El sistema de diseño de Gian usa spacing:8, radius:8, fontSize:14, shadow:10, accent:#6366F1.
        </p>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AttentionToDetailPage() {
  const [ex1Score, setEx1Score] = useState<number | null>(null)
  const [ex2Score, setEx2Score] = useState<number | null>(null)

  const totalScore = (ex1Score ?? 0) + (ex2Score ?? 0)
  const allDone = ex1Score !== null && ex2Score !== null

  return (
    <AboutPageLayout
      title="Atención al Detalle"
      description="El 80% de la percepción de calidad viene del 20% de detalles visuales que la mayoría ignora."
      valueNumber="02"
      accentColor="#06B6D4"
      prevPath="/sobre-mi/clean-code"
      prevLabel="Clean Code"
      nextPath="/sobre-mi/aprendizaje-continuo"
      nextLabel="Aprendizaje continuo"
    >
      <div className="flex flex-col gap-10">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #06B6D4' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "En el proyecto de React con Grupo Centro Tecnológico, revisaba cada componente contra el diseño de Figma
            píxel a píxel antes de hacer commit. El cliente nunca lo notó explícitamente — pero el producto se sentía premium.
            Eso es exactamente lo que el detalle compra: la sensación de calidad que nadie puede nombrar pero todos sienten."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#06B6D4' }}>— Gian, proyecto React, Grupo Centro Tecnológico</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#06B6D4' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['Grid de 8px siempre', 'Diseño = comunicación', 'El usuario siente lo que no ve'].map(p => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(6,182,212,0.12)', color: '#67E8F9', border: '1px solid rgba(6,182,212,0.25)' }}
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
            title="Encuentra los errores de UI"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                Este dashboard tiene 7 errores de inconsistencia visual. Hay un timer activo — cuanto antes los encuentres, más cerca estás de un ojo clínico real. Haz click en las zonas problemáticas.
              </span>
            }
            question="¿Cuántos errores de diseño puedes detectar? Los primeros 3 valen 15pts, los siguientes 3 valen 20pts, el último vale 25pts."
            points={130}
          >
            <DashboardInspector onComplete={setEx1Score} />
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
                  title="Construye tu sistema de diseño"
                  context={
                    <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                      Un sistema de diseño consistente es la base de cualquier UI profesional. Ajusta los parámetros y observa cómo cambia la percepción visual.
                    </span>
                  }
                  question="Configura los valores del sistema de diseño. ¿Puedes llegar a los mismos valores que usa Gian en producción?"
                  points={50}
                >
                  <DesignPlayground onComplete={setEx2Score} />
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
                gianComment="En el proyecto de React con Grupo Centro Tecnológico revisaba cada componente contra el diseño de Figma píxel a píxel antes de hacer commit. Una vez encontré 11 inconsistencias en una sola card. El cliente nunca lo notó, pero el producto se sentía premium."
                onReset={() => {
                  setEx1Score(null)
                  setEx2Score(null)
                }}
                onNext={() => { window.location.href = '/sobre-mi/aprendizaje-continuo' }}
                nextLabel="Siguiente: Aprendizaje continuo →"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AboutPageLayout>
  )
}
