import type { ReactNode, MouseEvent } from 'react'
import { cn } from '@/utils/cn'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  hoverable?: boolean
}

export function GlassCard({ children, className, onClick, hoverable = false }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border transition-all duration-300',
        'border-[var(--color-border)]',
        hoverable &&
          'cursor-pointer hover:border-[var(--color-border-hover)] hover:shadow-glow',
        className
      )}
      style={{
        background: 'rgba(19,19,31,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </div>
  )
}
