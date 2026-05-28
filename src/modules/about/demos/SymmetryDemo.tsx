import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Login form mockups ───────────────────────────────────────────────────────

function BadgeRed({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit text-[10px] px-1.5 py-0.5 mt-1 rounded font-medium whitespace-nowrap"
          style={{
              background: 'rgba(239,68,68,0.12)',
              color: '#F87171',
          }}>
      {children}
    </span>
  )
}
function BadgeGreen({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit text-[10px] px-1.5 py-0.5 mt-1 rounded font-medium whitespace-nowrap"
          style={{
              background: 'rgba(34,197,94,0.12)',
              color: '#34D399'
          }}>
      {children}
    </span>
  )
}

function BeforeForm() {
  return (
    <div className="flex flex-col" style={{ gap: '10px' }}>
      {/* Title: wrong size */}
      <div className="flex flex-col gap-0.5">
        <p className="font-bold" style={{ fontSize: '22px', lineHeight: 1 }}>Login</p>
        <BadgeRed>↑ font-size: 22px (no sistemático)</BadgeRed>
      </div>

      {/* Input usuario: inconsistent padding */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '3px' }}>
          Usuario
        </label>
        <input
          readOnly
          placeholder="usuario@email.com"
          className="w-full rounded-md text-sm text-[var(--color-text-secondary)] bg-transparent"
          style={{
            padding: '7px 8px 7px 6px',
            border: '1px solid rgba(255,255,255,0.12)',
            outline: 'none',
            fontSize: '13px',
          }}
        />
        <BadgeRed>↑ padding-left: 6px (inconsistente)</BadgeRed>
      </div>

      {/* Input password: different padding */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '8px' }}>
          Password
        </label>
        <input
          readOnly
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg text-sm text-[var(--color-text-secondary)] bg-transparent"
          style={{
            padding: '9px 8px 6px 14px',
            border: '1px solid rgba(255,255,255,0.07)',
            outline: 'none',
            fontSize: '13px',
          }}
        />
        <BadgeRed>↑ padding-left: 14px (diferente al anterior)</BadgeRed>
      </div>

      {/* Button: left aligned */}
      <div className="flex flex-col gap-1">
        <button
          className="px-5 py-2 rounded-md text-sm font-medium text-white w-fit"
          style={{ background: 'rgba(99,102,241,0.6)', fontSize: '13px' }}
        >
          Entrar
        </button>
        <BadgeRed>↑ alineado a la izquierda (desalineado)</BadgeRed>
      </div>
    </div>
  )
}

function AfterForm() {
  return (
    <div className="flex flex-col gap-3">
      {/* Title: consistent */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xl font-bold text-[var(--color-text-primary)]">Bienvenido</p>
        <BadgeGreen>↑ text-xl — sistemático y consistente</BadgeGreen>
      </div>

      {/* Input usuario: uniform */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[var(--color-text-muted)]">Usuario</label>
        <input
          readOnly
          placeholder="usuario@email.com"
          className="w-full rounded-lg text-sm text-[var(--color-text-secondary)] bg-transparent"
          style={{
            padding: '10px 12px',
            border: '1px solid rgba(255,255,255,0.1)',
            outline: 'none',
            fontSize: '13px',
          }}
        />
        <BadgeGreen>↑ padding: 10px 12px — grid de 8px</BadgeGreen>
      </div>

      {/* Input password: same style */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[var(--color-text-muted)]">Contraseña</label>
        <input
          readOnly
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg text-sm text-[var(--color-text-secondary)] bg-transparent"
          style={{
            padding: '10px 12px',
            border: '1px solid rgba(255,255,255,0.1)',
            outline: 'none',
            fontSize: '13px',
          }}
        />
        <BadgeGreen>↑ padding: 10px 12px — idéntico al anterior</BadgeGreen>
      </div>

      {/* Button: full width */}
      <div className="flex flex-col gap-1.5">
        <button
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: 'rgba(99,102,241,0.85)', fontSize: '13px' }}
        >
          Iniciar sesión
        </button>
        <BadgeGreen>↑ full-width — alineado con los inputs</BadgeGreen>
      </div>
    </div>
  )
}

// ─── Checklist ────────────────────────────────────────────────────────────────

const CHECKS = [
  'Espaciado basado en grid de 8px',
  'Paleta con máximo 3 tonos principales',
  'Tipografía con máximo 2 pesos distintos',
  'Border radius consistente en toda la UI',
  'Estados hover / focus / active definidos',
  'Contraste WCAG AA cumplido',
  'Animaciones bajo 400ms',
  'Feedback visual en cada interacción',
]

// ─── Metric comparison bars ───────────────────────────────────────────────────

function CompareBar({
  label, before, after,
}: { label: string; before: number; after: number }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--color-text-muted)] w-14 flex-shrink-0">Antes</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-red-500/60"
              initial={{ width: 0 }}
              animate={{ width: `${before}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-red-400 w-8 text-right">{before}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--color-text-muted)] w-14 flex-shrink-0">Después</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500/70"
              initial={{ width: 0 }}
              animate={{ width: `${after}%` }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            />
          </div>
          <span className="text-[11px] text-emerald-400 w-8 text-right">{after}%</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SymmetryDemo() {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div className="flex flex-col gap-8 w-full overflow-x-hidden">

      {/* ── PARTE A: Before / After forms ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            {showAfter ? 'Con atención al detalle' : 'Sin atención al detalle'}
          </p>
          <button
            onClick={() => setShowAfter((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: showAfter ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              border: `1px solid ${showAfter ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
              color: showAfter ? '#34D399' : '#F87171',
            }}
          >
            {showAfter ? '✅ Después' : '❌ Antes'}
            <span className="text-[var(--color-text-muted)] text-xs">— clic para cambiar</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAfter ? 'after' : 'before'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-6">
              {showAfter ? <AfterForm /> : <BeforeForm />}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── PARTE B: Checklist ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Checklist de atención al detalle
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CHECKS.map((check, i) => (
            <motion.div
              key={check}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-2.5"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
              </motion.div>
              <span className="text-sm text-[var(--color-text-secondary)]">{check}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PARTE C: Metrics ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Impacto en métricas
        </p>
        <GlassCard className="p-5 flex flex-col gap-5">
          <CompareBar label="Tasa de conversión" before={30} after={67} />
          <CompareBar label="Tiempo promedio en página" before={35} after={82} />
        </GlassCard>
      </div>
    </div>
  )
}
