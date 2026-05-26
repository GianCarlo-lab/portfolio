import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import * as variants from '@/animations/variants'
import { cn } from '@/utils/cn'

type VariantKey = keyof typeof variants

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  variant?: VariantKey
  delay?: number
}

export function RevealOnScroll({
  children,
  className,
  variant = 'fadeInUp',
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref)
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
