import { useRef } from 'react'
import { stats } from '@/data/stats.data'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { StatCounter } from './StatCounter'

const DOT_GRID_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.08)'/%3E%3C/svg%3E")`

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.25 })

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background:
          'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-primary) 100%)',
      }}
    >
      {/* Dot grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DOT_GRID_SVG }}
      />

      {/* Orb top-right */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Orb bottom-left */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%',
          left: '-10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          label="Métricas"
          title="En números"
          subtitle="Mi trayectoria resumida"
          align="center"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.id} variant="scaleIn" delay={i * 0.1}>
              <StatCounter stat={stat} isActive={isVisible} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
