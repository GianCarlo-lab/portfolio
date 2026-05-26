import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { cn } from '@/utils/cn'

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-2', align === 'center' && 'text-center', className)}>
      <RevealOnScroll variant="fadeInUp">
        <div
          className={cn(
            'flex items-center gap-2 mb-4',
            align === 'center' && 'justify-center'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {label}
          </span>
        </div>
      </RevealOnScroll>

      <RevealOnScroll variant="fadeInUp" delay={0.08}>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
          {title}
        </h2>
      </RevealOnScroll>

      <RevealOnScroll variant="fadeInUp" delay={0.12}>
        <div
          className={cn(
            'mt-4 h-0.5 w-10 bg-primary rounded-full',
            align === 'center' && 'mx-auto'
          )}
        />
      </RevealOnScroll>

      {subtitle && (
        <RevealOnScroll variant="fadeInUp" delay={0.16}>
          <p className={cn('mt-4 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl', align === 'center' && 'mx-auto')}>
            {subtitle}
          </p>
        </RevealOnScroll>
      )}
    </div>
  )
}
