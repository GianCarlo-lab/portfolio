import { useState, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// ─── UI Inspector ─────────────────────────────────────────────────────────────

interface ErrorDef {
  id: number
  label: string
  tooltip: string
}

const ERRORS: ErrorDef[] = [
  {
    id: 0,
    label: 'Título',
    tooltip: 'Font size fuera del sistema tipográfico. Usa múltiplos de 2: 16, 18, 20, 24px. Este tiene 19px.',
  },
  {
    id: 1,
    label: 'Descripción',
    tooltip: 'Line-height muy bajo para texto de párrafo. Mínimo 1.5 para buena legibilidad. Este tiene 1.3.',
  },
  {
    id: 2,
    label: 'Precio',
    tooltip: 'Alineación inconsistente. Todo el contenido está alineado a la izquierda, el precio está a la derecha.',
  },
  {
    id: 3,
    label: 'Botón Agregar',
    tooltip: 'Padding inconsistente (10px 14px) vs "Ver más" (10px 20px). Los botones del mismo nivel deben ser iguales.',
  },
  {
    id: 4,
    label: 'Botón Ver más',
    tooltip: 'Border-radius diferente: 6px aquí, 8px en "Agregar". Usa un valor único en todo el sistema.',
  },
  {
    id: 5,
    label: 'Imagen',
    tooltip: 'Aspect-ratio incorrecto. La imagen está ligeramente estirada. Usa object-fit: cover siempre.',
  },
]

interface ErrorZoneProps {
  errorId: number
  found: boolean[]
  onFind: (id: number) => void
  tooltip: string
  children: ReactNode
}

function ErrorZone({ errorId, found, onFind, tooltip, children }: ErrorZoneProps) {
  const [hovered, setHovered] = useState(false)
  const isFound = found[errorId]

  return (
    <div
      className="relative"
      style={{ cursor: isFound ? 'default' : 'pointer' }}
      onMouseEnter={() => !isFound && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !isFound && onFind(errorId)}
    >
      <div
        style={{
          outline: isFound
            ? '2px solid rgba(16,185,129,0.5)'
            : hovered
            ? '2px dashed rgba(239,68,68,0.7)'
            : '2px dashed transparent',
          outlineOffset: 2,
          borderRadius: 4,
          transition: 'outline 0.15s',
        }}
      >
        {children}
      </div>

      {/* Found checkmark */}
      <AnimatePresence>
        {isFound && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 z-20 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <span className="text-white text-[10px] font-bold">✓</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && !isFound && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 bottom-full left-0 mb-2 w-60 rounded-xl p-3 text-xs leading-relaxed pointer-events-none"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#FCA5A5',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="font-semibold text-red-300 mb-1">Haz clic para confirmar error</p>
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UIInspector() {
  const [found, setFound] = useState<boolean[]>(Array(6).fill(false))
  const [lastFeedback, setLastFeedback] = useState<string | null>(null)
  const [showCorrected, setShowCorrected] = useState(false)

  const foundCount = found.filter(Boolean).length
  const allFound = foundCount === 6

  const handleFind = (id: number) => {
    setFound((prev) => {
      const next = [...prev]
      next[id] = true
      return next
    })
    setLastFeedback(ERRORS[id].tooltip)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Pasa el cursor sobre los elementos con problemas y haz clic para confirmarlos.
        </p>
        <div
          className="px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: allFound ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
            color: allFound ? '#10B981' : 'var(--color-text-secondary)',
          }}
        >
          {foundCount} / 6 errores encontrados
        </div>
      </div>

      {/* Card with errors */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <AnimatePresence mode="wait">
          {!showCorrected ? (
            <motion.div
              key="buggy"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl overflow-hidden border border-[var(--color-border)] flex-shrink-0"
              style={{ width: 300, background: 'rgba(19,19,31,0.9)' }}
            >
              {/* Image — Error 5: stretched */}
              <ErrorZone errorId={5} found={found} onFind={handleFind} tooltip={ERRORS[5].tooltip}>
                <div
                  style={{
                    height: 180,
                    background: 'linear-gradient(135deg, #1e1e2e, #2a2a3e)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #2a2a3e 0%, #1e1e2e 100%)',
                      transform: 'scaleX(1.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: 48, opacity: 0.25 }}>📷</span>
                  </div>
                </div>
              </ErrorZone>

              <div style={{ padding: 16 }}>
                {/* Title — Error 0: 19px font */}
                <ErrorZone errorId={0} found={found} onFind={handleFind} tooltip={ERRORS[0].tooltip}>
                  <h3
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: 8,
                    }}
                  >
                    Producto Premium
                  </h3>
                </ErrorZone>

                {/* Description — Error 1: line-height 1.3 */}
                <ErrorZone errorId={1} found={found} onFind={handleFind} tooltip={ERRORS[1].tooltip}>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.3,
                      color: 'var(--color-text-secondary)',
                      marginBottom: 12,
                    }}
                  >
                    Una descripción del producto que vende muy bien en la tienda en línea.
                  </p>
                </ErrorZone>

                {/* Price — Error 2: right aligned */}
                <ErrorZone errorId={2} found={found} onFind={handleFind} tooltip={ERRORS[2].tooltip}>
                  <p
                    style={{
                      textAlign: 'right',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      marginBottom: 16,
                    }}
                  >
                    S/. 29.99
                  </p>
                </ErrorZone>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {/* Agregar — Error 3: padding 10px 14px */}
                  <ErrorZone errorId={3} found={found} onFind={handleFind} tooltip={ERRORS[3].tooltip}>
                    <button
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        background: '#6366F1',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Agregar
                    </button>
                  </ErrorZone>

                  {/* Ver más — Error 4: border-radius 6px */}
                  <ErrorZone errorId={4} found={found} onFind={handleFind} tooltip={ERRORS[4].tooltip}>
                    <button
                      style={{
                        padding: '10px 20px',
                        borderRadius: 6,
                        background: 'transparent',
                        color: 'var(--color-text-primary)',
                        fontSize: 14,
                        fontWeight: 500,
                        border: '1px solid rgba(255,255,255,0.12)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Ver más
                    </button>
                  </ErrorZone>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="corrected"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl overflow-hidden border flex-shrink-0"
              style={{ width: 300, background: 'rgba(19,19,31,0.9)', borderColor: 'rgba(16,185,129,0.3)' }}
            >
              <div
                style={{
                  height: 180,
                  background: 'linear-gradient(135deg, #1e1e2e, #2a2a3e)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 48, opacity: 0.35 }}>📷</span>
              </div>
              <div style={{ padding: 16 }}>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 8,
                  }}
                >
                  Producto Premium
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    marginBottom: 12,
                  }}
                >
                  Una descripción del producto que vende muy bien en la tienda en línea.
                </p>
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: 16,
                  }}
                >
                  S/. 29.99
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    style={{
                      flex: 1,
                      padding: '10px 18px',
                      borderRadius: 8,
                      background: '#6366F1',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Agregar
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: '10px 18px',
                      borderRadius: 8,
                      background: 'transparent',
                      color: 'var(--color-text-primary)',
                      fontSize: 14,
                      fontWeight: 500,
                      border: '1px solid rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                    }}
                  >
                    Ver más
                  </button>
                </div>
              </div>
              <div
                className="px-4 py-2 text-xs font-semibold text-emerald-400 text-center"
                style={{ background: 'rgba(16,185,129,0.08)', borderTop: '1px solid rgba(16,185,129,0.2)' }}
              >
                ✓ Todos los errores corregidos
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback panel */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Errores a encontrar
          </p>
          {ERRORS.map((err) => (
            <div
              key={err.id}
              className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: found[err.id] ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${found[err.id] ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: found[err.id] ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${found[err.id] ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.3)'}`,
                }}
              >
                {found[err.id] ? (
                  <span className="text-emerald-400 text-[10px]">✓</span>
                ) : (
                  <span className="text-red-400 text-[10px] font-bold">?</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold"
                  style={{ color: found[err.id] ? '#10B981' : 'var(--color-text-secondary)' }}
                >
                  {err.label}
                </p>
                <AnimatePresence>
                  {found[err.id] && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="text-xs text-[var(--color-text-muted)] leading-relaxed mt-0.5 overflow-hidden"
                    >
                      {err.tooltip}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}

          {allFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-3 mt-2"
            >
              <div
                className="px-4 py-3 rounded-xl text-sm text-emerald-300 font-medium"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                🎯 ¡Ojo clínico! Encontraste todos los errores. Así reviso cada componente antes de
                entregar.
              </div>
              <button
                onClick={() => setShowCorrected((v) => !v)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: '#8B5CF6' }}
              >
                {showCorrected ? '← Ver versión con errores' : 'Ver la versión correcta →'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Design System Playground ─────────────────────────────────────────────────

const ACCENT_OPTIONS = [
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Cyan', value: '#06B6D4' },
  { label: 'Green', value: '#10B981' },
  { label: 'Rose', value: '#F43F5E' },
]

function DesignPlayground() {
  const [spacing, setSpacing] = useState(8)
  const [radius, setRadius] = useState(8)
  const [fontSize, setFontSize] = useState(16)
  const [accentIdx, setAccentIdx] = useState(0)

  const accent = ACCENT_OPTIONS[accentIdx].value

  const previewVars = {
    '--pw-sp': `${spacing}px`,
    '--pw-r': `${radius}px`,
    '--pw-fs': `${fontSize}px`,
    '--pw-accent': accent,
  } as React.CSSProperties

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-5 lg:w-64 flex-shrink-0">
        <div>
          <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
            Grid base: {spacing}px
          </label>
          <input
            type="range"
            min={4}
            max={12}
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            className="w-full accent-[#8B5CF6]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
            Border radius: {radius}px
          </label>
          <input
            type="range"
            min={0}
            max={20}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[#8B5CF6]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
            Font size: {fontSize}px
          </label>
          <input
            type="range"
            min={12}
            max={18}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-[#8B5CF6]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
            Accent color
          </label>
          <div className="flex gap-2">
            {ACCENT_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => setAccentIdx(i)}
                className="w-7 h-7 rounded-full transition-all duration-150 border-2"
                style={{
                  background: opt.value,
                  borderColor: i === accentIdx ? 'white' : 'transparent',
                  transform: i === accentIdx ? 'scale(1.15)' : 'scale(1)',
                }}
                title={opt.label}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setSpacing(8)
            setRadius(8)
            setFontSize(16)
            setAccentIdx(0)
          }}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors text-left"
        >
          ↺ Resetear valores
        </button>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0" style={previewVars as React.CSSProperties}>
        <GlassCard className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Preview en vivo
          </p>
          <div
            className="flex flex-col"
            style={{ gap: 'var(--pw-sp)' } as React.CSSProperties}
          >
            {/* Buttons */}
            <div style={{ display: 'flex', gap: 'var(--pw-sp)' } as React.CSSProperties}>
              <button
                style={{
                  padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`,
                  borderRadius: 'var(--pw-r)',
                  background: 'var(--pw-accent)',
                  color: 'white',
                  fontSize: 'var(--pw-fs)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'default',
                } as React.CSSProperties}
              >
                Primario
              </button>
              <button
                style={{
                  padding: `var(--pw-sp) calc(var(--pw-sp) * 2)`,
                  borderRadius: 'var(--pw-r)',
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--pw-fs)',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'default',
                } as React.CSSProperties}
              >
                Secundario
              </button>
            </div>

            {/* Input */}
            <input
              readOnly
              placeholder="Campo de texto..."
              style={{
                padding: `var(--pw-sp) calc(var(--pw-sp) * 1.5)`,
                borderRadius: 'var(--pw-r)',
                fontSize: 'var(--pw-fs)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text-secondary)',
                outline: 'none',
              } as React.CSSProperties}
            />

            {/* Mini card */}
            <div
              style={{
                padding: `calc(var(--pw-sp) * 1.5)`,
                borderRadius: 'var(--pw-r)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--pw-sp)',
              } as React.CSSProperties}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--pw-r)',
                  background: `${accent}25`,
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontSize: 'var(--pw-fs)', fontWeight: 600, color: 'var(--color-text-primary)' } as React.CSSProperties}>
                  Componente card
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Subtítulo descriptivo</p>
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  padding: `calc(var(--pw-sp) * 0.5) var(--pw-sp)`,
                  borderRadius: 'var(--pw-r)',
                  fontSize: 11,
                  fontWeight: 600,
                  background: `${accent}20`,
                  color: accent,
                } as React.CSSProperties}
              >
                Badge
              </span>
            </div>
          </div>
        </GlassCard>

        <p className="text-xs text-[var(--color-text-muted)] mt-3 leading-relaxed">
          Con un design system, cambiar el spacing de 8px a 12px actualiza{' '}
          <strong className="text-[var(--color-text-secondary)]">TODA</strong> la interfaz de forma
          consistente. Sin excepciones.
        </p>
      </div>
    </div>
  )
}

// ─── Checklist ────────────────────────────────────────────────────────────────

const CHECKLIST = [
  'Spacing basado en grid de 8px',
  'Colores del sistema, no valores hardcodeados',
  'Estados hover, focus y active definidos',
  'Responsive verificado en 3 breakpoints',
  'Contraste de texto ≥ 4.5:1 (WCAG AA)',
  'Animaciones bajo 400ms',
  'Nombres de clases descriptivos',
  'Código revisado antes del commit',
]

function Checklist() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 })

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {CHECKLIST.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -12 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.15)',
          }}
        >
          <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: '#8B5CF6' }} />
          <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AttentionToDetailPage() {
  useScrollToTop()

  return (
    <AboutPageLayout
      title="Atención al Detalle"
      description="Cada píxel y cada función importan. La calidad no es negociable."
      valueNumber="02"
      accentColor="#8B5CF6"
      prevPath="/sobre-mi/clean-code"
      prevLabel="Clean Code"
      nextPath="/sobre-mi/aprendizaje-continuo"
      nextLabel="Aprendizaje continuo"
    >
      {/* Inspector */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            ¿Puedes encontrar los errores?
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Esta card tiene 6 problemas de diseño sutiles. Pasa el cursor sobre cada zona para
            detectarlos y haz clic para confirmarlos.
          </p>
        </div>
        <UIInspector />
      </section>

      {/* Design Playground */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Construye con consistencia
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Ajusta los valores y ve cómo un design system mantiene la coherencia en todos los
            componentes.
          </p>
        </div>
        <DesignPlayground />
      </section>

      {/* Checklist */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Mi checklist real
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Lo que verifico antes de considerar un componente terminado.
          </p>
        </div>
        <Checklist />
      </section>
    </AboutPageLayout>
  )
}
