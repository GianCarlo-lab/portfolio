import { motion } from 'framer-motion'
import {
  Monitor, Layers, Server, ShoppingCart, Zap, MessageSquare,
  CheckCircle2, type LucideIcon,
} from 'lucide-react'
import type { ServiceItem } from './services.types'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { getTechIcon } from '@/utils/techIcons'

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Layers, Server, ShoppingCart, Zap, MessageSquare,
}

interface ServiceCardProps {
  service: ServiceItem
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] ?? Monitor

  return (
    <RevealOnScroll variant="fadeInUp" delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-2xl flex flex-col h-full overflow-hidden"
        style={{
          background: 'rgba(19,19,31,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: service.highlighted
            ? '1px solid rgba(99,102,241,0.4)'
            : '1px solid rgba(255,255,255,0.06)',
          boxShadow: service.highlighted
            ? '0 0 40px rgba(99,102,241,0.1)'
            : undefined,
        }}
      >
        {/* Top accent line for highlighted card */}
        {service.highlighted && (
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
            }}
          />
        )}

        {/* Tag badge */}
        {service.tag && (
          <span className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            {service.tag}
          </span>
        )}

        <div className="flex flex-col flex-1 p-6">
          {/* Header */}
          <div className="mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] leading-snug pr-20">
              {service.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">
              {service.description}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px bg-[var(--color-border)] mb-5" />

          {/* Features */}
          <ul className="flex flex-col gap-2.5 flex-1 mb-5">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <div className="h-px bg-[var(--color-border)] mb-4" />

          {/* Tech stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2.5">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech) => {
                const icon = getTechIcon(tech, 12)
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-secondary)]"
                  >
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {tech}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  )
}
