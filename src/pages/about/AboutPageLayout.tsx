import type { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const VALUE_NAV = [
  { label: 'Clean Code', path: '/sobre-mi/clean-code' },
  { label: 'Atención', path: '/sobre-mi/atencion-al-detalle' },
  { label: 'Aprendizaje', path: '/sobre-mi/aprendizaje-continuo' },
  { label: 'Full Stack', path: '/sobre-mi/vision-fullstack' },
  { label: 'Equipo', path: '/sobre-mi/trabajo-en-equipo' },
]

const WA_URL =
  'https://wa.me/51952761415?text=Hola%20Gian%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.'

function ScrollProgressBar({ accentColor }: { accentColor: string }) {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-[100] transition-all duration-100"
      style={{ width: `${progress * 100}%`, background: accentColor }}
    />
  )
}

export interface AboutPageLayoutProps {
  title: string
  description: string
  valueNumber: string
  accentColor: string
  prevPath?: string
  nextPath?: string
  prevLabel?: string
  nextLabel?: string
  children: ReactNode
}

export function AboutPageLayout({
  title,
  description,
  valueNumber,
  accentColor,
  prevPath,
  nextPath,
  prevLabel,
  nextLabel,
  children,
}: AboutPageLayoutProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      <ScrollProgressBar accentColor={accentColor} />

      {/* Navbar */}
      <header
        className="fixed top-0.5 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8"
        style={{
          height: 64,
          background: 'rgba(10,10,15,0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Volver a Sobre mí</span>
          <span className="sm:hidden">Volver</span>
        </button>

        <a href="/" className="flex items-center gap-2 font-display font-bold">
          <GradientText className="text-xl font-bold">GB</GradientText>
          <span className="text-[var(--color-text-primary)] font-semibold hidden sm:block">
            Barrionuevo
          </span>
        </a>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm"
        >
          Contrátame
        </a>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ height: 320, paddingTop: 64 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 25% 60%, ${accentColor}28 0%, transparent 55%),
                         radial-gradient(ellipse at 75% 30%, ${accentColor}14 0%, transparent 50%),
                         var(--color-bg-secondary)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 30%, var(--color-bg-primary) 100%)',
          }}
        />
        <span
          aria-hidden
          className="absolute select-none pointer-events-none font-black"
          style={{
            fontSize: 200,
            fontWeight: 900,
            color: accentColor,
            opacity: 0.06,
            right: -20,
            bottom: -20,
            lineHeight: 1,
          }}
        >
          {valueNumber}
        </span>

        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center"
          style={{ padding: '0 24px 40px' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-sm font-semibold mb-3"
            style={{ color: accentColor }}
          >
            {valueNumber} / 05
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.07 }}
            className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Value nav strip */}
      <div
        className="sticky z-40"
        style={{
          top: 64,
          background: 'rgba(10,10,15,0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2 px-4 py-2.5 max-w-3xl mx-auto overflow-x-auto">
          {VALUE_NAV.map((item) => {
            const isActive = pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0"
                style={{
                  background: isActive ? `${accentColor}20` : 'transparent',
                  color: isActive ? accentColor : 'var(--color-text-muted)',
                  border: `1px solid ${isActive ? accentColor + '55' : 'transparent'}`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: isActive ? accentColor : 'var(--color-text-muted)',
                    opacity: isActive ? 1 : 0.35,
                  }}
                />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px 48px' }}>
        {children}

        {/* Prev / Next */}
        {(prevPath || nextPath) && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPath && prevLabel ? (
              <GlassCard hoverable className="p-5" onClick={() => navigate(prevPath)}>
                <div className="flex items-center gap-3">
                  <ChevronLeft size={18} className="text-[var(--color-text-muted)] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                      Anterior
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {prevLabel}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <div />
            )}

            {nextPath && nextLabel ? (
              <GlassCard hoverable className="p-5" onClick={() => navigate(nextPath)}>
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                      Siguiente
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {nextLabel}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-[var(--color-text-muted)] flex-shrink-0" />
                </div>
              </GlassCard>
            ) : (
              <div />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
