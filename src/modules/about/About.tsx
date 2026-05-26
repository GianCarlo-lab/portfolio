import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  Code2,
  Layers,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { aboutData } from '@/data/about.data'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { staggerItem } from '@/animations/variants'
import { cn } from '@/utils/cn'

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Code2,
  Layers,
  Globe,
}

function HighlightGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-2 gap-3"
    >
      {aboutData.highlights.map((h) => {
        const Icon = ICON_MAP[h.icon]
        return (
          <motion.div key={h.label} variants={staggerItem}>
            <GlassCard className="p-4 flex flex-col gap-2" hoverable>
              <Icon size={22} className="text-primary" />
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{h.value}</p>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium">{h.label}</p>
            </GlassCard>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

const NUMBER_LABELS = ['01', '02', '03', '04', '05']

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6">
            <SectionTitle
              label="Sobre mí"
              title="Quién soy y qué me mueve"
              align="left"
            />

            <div className="flex flex-col gap-5">
              {aboutData.bio.map((para, i) => (
                <RevealOnScroll key={i} variant="fadeInUp" delay={i * 0.1}>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                    {para}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll variant="fadeInUp" delay={0.2}>
              <HighlightGrid />
            </RevealOnScroll>
          </div>

          {/* ── Divider (desktop only) ── */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px pointer-events-none">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(99,102,241,0.2) 0px, rgba(99,102,241,0.2) 4px, transparent 4px, transparent 12px)',
              }}
            />
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-5">
            {aboutData.values.map((val, i) => (
              <RevealOnScroll key={val.title} variant="fadeInRight" delay={i * 0.12}>
                <ValueCard title={val.title} description={val.description} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 group',
        'border-[var(--color-border)] hover:border-primary/40',
        'hover:shadow-glow cursor-default'
      )}
      style={{ background: 'rgba(19,19,31,0.7)', backdropFilter: 'blur(12px)' }}
    >
      {/* Decorative number */}
      <span
        aria-hidden
        className="absolute top-3 right-4 text-6xl font-extrabold leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
        style={{ color: 'var(--color-accent)', opacity: 0.12 }}
      >
        {NUMBER_LABELS[index]}
      </span>

      <p className="font-semibold text-[var(--color-text-primary)] mb-2 relative z-10">
        {title}
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  )
}
