import type { ReactNode, ElementType } from 'react'
import { cn } from '@/utils/cn'

interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag
      className={cn('inline-block', className)}
      style={{
        background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </Tag>
  )
}
