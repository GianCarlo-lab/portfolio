import { cn } from '@/utils/cn'

interface BadgeProps {
  label: string
  color?: string
  className?: string
}

export function Badge({ label, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        'bg-white/5 border border-[var(--color-border)]',
        'text-[var(--color-text-secondary)]',
        className
      )}
      style={color ? { borderColor: color, color } : undefined}
    >
      {label}
    </span>
  )
}
