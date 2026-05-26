import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function TimelineConnector() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.05 })

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute left-5 top-7 bottom-7 w-0.5 overflow-hidden rounded-full"
    >
      <motion.div
        initial={{ height: '0%', opacity: 0 }}
        animate={isVisible ? { height: '100%', opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        className="w-full"
        style={{
          background:
            'linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.3) 80%, transparent 100%)',
        }}
      />
    </div>
  )
}
