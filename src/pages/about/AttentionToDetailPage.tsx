import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Timer, Eye, Check } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { ChallengeCard } from '@/components/common/ChallengeCard/ChallengeCard'
import { ScoreBoard } from '@/components/common/ScoreBoard/ScoreBoard'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import type { FeedbackRange } from '@/components/common/ScoreBoard/ScoreBoard'

// ── Data ────────────────────────────────────────────────────────────────────

// 5 most educational errors (removed subtle icon-size and header-text alignment ones)
const ERRORS = [
  { id: 1, label: "Indentación inconsistente en nav", detail: "Clientes está desalineado 4px respecto a los demás ítems de la navegación." },
  { id: 2, label: "Stat cards de diferente altura", detail: "La card de 'Ingresos' mide 92px y la de 'Pedidos' 104px. Deberían ser iguales." },
  { id: 3, label: "Formato de moneda inconsistente", detail: "'S/. 12k' vs 'S/.120' — sin espacio y sin formato unificado." },
  { id: 4, label: "Padding diferente por fila en tabla", detail: "Fila 1: py-3, Fila 2: py-2, Fila 3: py-3. El espaciado irregular rompe el ritmo visual." },
  { id: 5, label: "Peso tipográfico inconsistente en estado", detail: "'Pagado' en bold, 'Pendiente' en regular. Mismo tipo de dato, misma columna." },
]

const ACCENT_OPTIONS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']

const FEEDBACK: FeedbackRange[] = [
  { range: [0, 30], message: "Buen ojo en entrenamiento. Con práctica empiezas a ver lo que el usuario siente pero no puede nombrar.", color: '#F59E0B' },
  { range: [31, 60], message: "Estás notando más de lo que la mayoría. Eso es atención al detalle real.", color: '#06B6D4' },
  { range: [61, 90], message: "Muy buen ojo clínico. Captas inconsistencias que afectan la percepción de calidad.", color: '#10B981' },
  { range: [91, 110], message: "¡Ojo clínico perfecto! Encontraste todos los errores. Así se construye un producto premium.", color: '#6366F1' },
]

// ── Exercise 1: Dashboard Inspector ─────────────────────────────────────────

function DashboardInspector({ onComplete }: { onComplete: (pts: number) => void }) {
  const [found, setFound] = useState<number[]>([])
  const [wrong, setWrong] = useState<number>( 0)
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
      setWrong(w => w + 1)
      return
    }
    const newFound = [...found, id]
    setFound(newFound)
    setShownDetail(id)
    if (newFound.length === ERRORS.length) finalize(newFound, wrong)
  }

  const finalize = (foundIds: number[], wrongCount: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    let score = 0
    foundIds.forEach((_, i) => {
      if (i < 3) score += 15
      else score += 20
    })
    score = Math.max(0, score - wrongCount * 5)
    setPts(score)
    setSubmitted(true)
    onComplete(score)
  }

  const handleSubmit = () => finalize(found, wrong)

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  // Reusable error zone wrapper
  const zone = (id: number, children: React.ReactNode, className = '') => (
    <div
      key={id}
      onClick={() => handleErrorClick(id)}
      className={`relative cursor-pointer transition-all select-none ${className}`}
      style={{
        outline: found.includes(id) ? '2px solid #10B981' : 'none',
        outlineOffset: 2,
      }}
    >
      {children}
      {found.includes(id) && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-xs z-10 font-bold">
          ✓
        </span>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Timer + score */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Timer size={14} />
          <span className="font-mono">Tiempo explorando: {mm}:{ss}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={14} style={{ color: '#06B6D4' }} />
          <span className="text-sm font-semibold" style={{ color: '#06B6D4' }}>{found.length}/{ERRORS.length} errores</span>
          {wrong > 0 && <span className="text-xs text-red-400">-{wrong * 5}pts por clicks incorrectos</span>}
        </div>
      </div>

      {/* Fake dashboard — click zones */}
      <GlassCard className="p-0 overflow-hidden">
        <div style={{ background: 'rgba(10,10,20,0.95)', borderRadius: 12 }}>
          {/* Header */}
          <div className="flex items-center justify-between py-3 px-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="font-bold text-sm text-[var(--color-text-primary)]">Dashboard</span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white/10" />
              <div className="w-5 h-5 rounded bg-white/10" />
            </div>
          </div>

          <div className="flex" style={{ minHeight: 200 }}>
            {/* Sidebar with nav indentation error */}
            {zone(1,
              <div className="w-28 py-3 border-r flex flex-col gap-0.5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {['Inicio', 'Ventas', 'Clientes', 'Reportes'].map((item) => (
                  <div
                    key={item}
                    className="py-1.5 text-xs text-[var(--color-text-secondary)]"
                    style={{ paddingLeft: item === 'Clientes' ? 20 : 16 }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {/* Main */}
            <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">
              {/* Stat cards with different heights */}
              <div className="flex gap-2">
                {zone(2,
                  <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', height: 92 }}>
                    {zone(3,
                      <div>
                        <p className="text-xs text-[var(--color-text-muted)]">Ingresos</p>
                        <p className="text-lg font-bold text-[var(--color-text-primary)] mt-1">S/.12k</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', height: 104 }}>
                  <p className="text-xs text-[var(--color-text-muted)]">Pedidos</p>
                  <p className="text-lg font-bold text-[var(--color-text-primary)] mt-1">S/. 120</p>
                </div>
              </div>

              {/* Table with inconsistent row padding and text weight */}
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1.5">Ventas recientes</p>
                <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {[
                    { name: 'Producto A', amount: 'S/. 320', status: 'Pagado', py: 'py-3' },
                    { name: 'Producto B', amount: 'S/. 180', status: 'Pendiente', py: 'py-2' },
                    { name: 'Producto C', amount: 'S/. 540', status: 'Pagado', py: 'py-3' },
                  ].map((row, i) => (
                    zone(i === 1 ? 4 : 0,
                      zone(5,
                        <div className={`flex items-center justify-between px-3 text-xs ${row.py} border-b`} style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{row.name}</span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{row.amount}</span>
                          <span style={{ color: row.status === 'Pagado' ? '#10B981' : '#F59E0B', fontWeight: row.status === 'Pagado' ? 700 : 400 }}>
                            {row.status}
                          </span>
                        </div>
                      )
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Error detail */}
      <AnimatePresence>
        {shownDetail !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
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

      {/* Found list */}
      {found.length > 0 && (
        <div className="flex flex-col gap-1">
          {found.map(id => (
            <p key={id} className="text-xs text-[var(--color-text-muted)] flex gap-2">
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
          <p className="text-sm font-semibold" style={{ color: pts >= 60 ? '#10B981' : '#F59E0B' }}>
            {pts}/110 pts — {found.length === 5 ? '¡Ojo clínico perfecto!' : `Encontraste ${found.length} de 5 errores.`}
          </p>
          <button
            onClick={() => setShowFixed(!showFixed)}
            className="self-start text-xs font-medium px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            {showFixed ? 'Ver versión con errores' : 'Ver versión corregida →'}
          </button>

          <AnimatePresence mode="wait">
            {showFixed ? (
              <motion.div
                key="fixed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-4">
                  <p className="text-xs font-semibold mb-3" style={{ color: '#10B981' }}>✓ Versión corregida</p>
                  <div style={{
                    padding: '16px',
                    background: 'rgba(19,19,31,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                  }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-text-primary)', fontWeight: 700 }}>Dashboard</h3>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ padding: '12px 16px', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', flex: 1 }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>S/. 12k</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>Ventas</div>
                      </div>
                      <div style={{ padding: '12px 16px', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', flex: 1 }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>234</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>Clientes</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ padding: '10px 20px', background: '#6366F1', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', cursor: 'default' }}>Guardar</button>
                      <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #6366F1', borderRadius: '8px', color: '#6366F1', fontSize: '14px', cursor: 'default' }}>Cancelar</button>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-3 leading-relaxed">
                    Correcciones: nav alineado (16px), cards misma altura (96px), moneda unificada (S/. 12k), tabla con py-3 uniforme, estados en font-medium.
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="broken"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-4">
                  <p className="text-xs font-semibold mb-3" style={{ color: '#F59E0B' }}>✗ Versión con errores (la que inspeccionaste)</p>
                  <div style={{
                    padding: '8px 20px 15px 10px',
                    background: 'rgba(19,19,31,0.8)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                  }}>
                    <h3 style={{ fontSize: '19px', marginBottom: '11px', color: 'var(--color-text-primary)', fontWeight: 700 }}>Dashboard</h3>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
                      <div style={{ padding: '10px 8px', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '6px', flex: 1 }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>S/.12k</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>Ventas</div>
                      </div>
                      <div style={{ padding: '10px 16px', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '9px', flex: 1 }}>
                        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>234</div>
                        <div style={{ fontSize: '13px', color: '#94A3B8' }}>Clientes</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ padding: '10px 14px', background: '#6366F1', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', cursor: 'default' }}>Guardar</button>
                      <button style={{ padding: '10px 22px', background: 'transparent', border: '1px solid #6366F1', borderRadius: '6px', color: '#6366F1', fontSize: '14px', cursor: 'default' }}>Cancelar</button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
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
  const [accent, setAccent] = useState('#6366F1')
  const [submitted, setSubmitted] = useState(false)

  const previewVars = {
    '--pw-sp': `${spacing}px`,
    '--pw-r': `${radius}px`,
    '--pw-fs': `${fontSize}px`,
    '--pw-sh': `0 0 ${shadow}px rgba(0,0,0,0.4)`,
    '--pw-accent': accent,
  } as React.CSSProperties

  const handleDone = () => {
    if (submitted) return
    const gian = { spacing: 8, radius: 8, fontSize: 14, shadow: 10, accent: '#6366F1' }
    let score = 50
    score -= Math.abs(spacing - gian.spacing) * 2
    score -= Math.abs(radius - gian.radius) * 2
    score -= Math.abs(fontSize - gian.fontSize) * 2
    score -= Math.abs(shadow - gian.shadow) * 2
    if (accent !== gian.accent) score -= 10
    setSubmitted(true)
    onComplete(Math.max(0, Math.min(50, score)))
  }

  const SliderRow = ({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) => (
    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
      <span className="text-xs text-[var(--color-text-muted)] w-32 flex-shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} disabled={submitted} className="flex-1 accent-[#6366F1] min-w-0" />
      <span className="text-xs font-mono text-[var(--color-text-secondary)] w-8 text-right">{value}</span>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 w-full">
      <GlassCard className="p-5">
        <div className="flex flex-col gap-4">
          <SliderRow label="Spacing base (px)" value={spacing} min={4} max={12} onChange={setSpacing} />
          <SliderRow label="Border radius (px)" value={radius} min={0} max={20} onChange={setRadius} />
          <SliderRow label="Font size (px)" value={fontSize} min={12} max={18} onChange={setFontSize} />
          <SliderRow label="Shadow blur (px)" value={shadow} min={0} max={20} onChange={setShadow} />
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[var(--color-text-muted)] w-32 flex-shrink-0">Accent color</span>
            <div className="flex gap-2">
              {ACCENT_OPTIONS.map(c => (
                <button key={c} onClick={() => !submitted && setAccent(c)} className="w-6 h-6 rounded-full transition-all" style={{ background: c, outline: accent === c ? '2px solid white' : 'none', outlineOffset: 2, transform: accent === c ? 'scale(1.2)' : 'scale(1)' }} />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <div style={previewVars}>
        <GlassCard className="p-5">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-4">Preview</p>
          <div className="flex flex-wrap gap-3 items-start">
            <button className="font-semibold text-white" style={{ padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`, borderRadius: `var(--pw-r)`, fontSize: `var(--pw-fs)`, boxShadow: `var(--pw-sh)`, background: `var(--pw-accent)` }}>Confirmar</button>
            <button className="font-medium" style={{ padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`, borderRadius: `var(--pw-r)`, fontSize: `var(--pw-fs)`, border: `1px solid var(--pw-accent)`, color: `var(--pw-accent)`, background: 'transparent' }}>Cancelar</button>
            <input placeholder="usuario@correo.com" className="outline-none bg-transparent" style={{ padding: `var(--pw-sp) calc(var(--pw-sp) * 1.5)`, borderRadius: `var(--pw-r)`, fontSize: `var(--pw-fs)`, border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-text-secondary)', minWidth: 0, maxWidth: '100%' }} />
            <span className="font-semibold" style={{ padding: `calc(var(--pw-sp) * 0.4) var(--pw-sp)`, borderRadius: `calc(var(--pw-r) * 2)`, fontSize: `calc(var(--pw-fs) - 2px)`, background: `${accent}20`, color: `var(--pw-accent)` }}>Badge</span>
          </div>
        </GlassCard>
      </div>

      {!submitted && (
        <button onClick={handleDone} className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: '#6366F1' }}>
          Guardar configuración →
        </button>
      )}
      {submitted && (
        <p className="text-sm font-semibold" style={{ color: '#10B981' }}>
          Configuración guardada. Sistema de Gian: spacing:8 · radius:8 · fontSize:14 · shadow:10 · accent:#6366F1.
        </p>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AttentionToDetailPage() {
  useScrollToTop()
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
      <div className="flex flex-col gap-10 w-full">

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
            <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(6,182,212,0.12)', color: '#67E8F9', border: '1px solid rgba(6,182,212,0.25)' }}>
              {p}
            </span>
          ))}
        </div>

        {/* Exercise 1 */}
        <GlassCard className="p-4 sm:p-6">
          <ChallengeCard
            number={1}
            total={2}
            title="Encuentra los errores de UI"
            context={
              <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                Este dashboard tiene 5 errores de inconsistencia visual. Haz click en las zonas problemáticas para identificarlos. Un timer registra cuánto tiempo llevas explorando.
              </span>
            }
            question="¿Cuántos errores de diseño puedes detectar? Los primeros 3 valen 15pts cada uno, los últimos 2 valen 20pts."
            points={110}
          >
            <DashboardInspector onComplete={setEx1Score} />
          </ChallengeCard>
        </GlassCard>

        {/* Exercise 2 */}
        <AnimatePresence>
          {ex1Score !== null && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <GlassCard className="p-4 sm:p-6">
                <ChallengeCard
                  number={2}
                  total={2}
                  title="Construye tu sistema de diseño"
                  context={
                    <span className="text-xs block" style={{ color: 'var(--color-text-muted)' }}>
                      Un sistema de diseño consistente es la base de cualquier UI profesional. Ajusta los parámetros y observa cómo cambia la percepción visual.
                    </span>
                  }
                  question="¿Puedes llegar a los mismos valores que usa Gian en producción?"
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
                maxScore={160}
                gianScore={160}
                feedback={FEEDBACK}
                gianComment="En el proyecto de React con Grupo Centro Tecnológico revisaba cada componente contra el diseño de Figma píxel a píxel antes de hacer commit. Una vez encontré 11 inconsistencias en una sola card. El cliente nunca lo notó, pero el producto se sentía premium."
                onReset={() => { setEx1Score(null); setEx2Score(null) }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AboutPageLayout>
  )
}
