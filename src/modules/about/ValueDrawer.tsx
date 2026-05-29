import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { AboutValue } from './about.types'
import { CleanCodeDemo } from './demos/CleanCodeDemo'
import { SymmetryDemo } from './demos/SymmetryDemo'
import { LearningDemo } from './demos/LearningDemo'
import { FullStackDemo } from './demos/FullStackDemo'
import { TeamworkDemo } from './demos/TeamworkDemo'

const NUMBER_LABELS = ['01', '02', '03', '04', '05']

function DemoRenderer({ type }: { type: string }) {
  switch (type) {
    case 'code':      return <CleanCodeDemo />
    case 'symmetry':  return <SymmetryDemo />
    case 'learning':  return <LearningDemo />
    case 'fullstack': return <FullStackDemo />
    case 'teamwork':  return <TeamworkDemo />
    default:          return null
  }
}

interface ValueDrawerProps {
  value: AboutValue | null
  isOpen: boolean
  onClose: () => void
  index?: number
}

export function ValueDrawer({ value, isOpen, onClose, index = 0 }: ValueDrawerProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && value && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Drawer panel — 780px desktop, 100vw mobile */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full overflow-y-auto overflow-x-hidden"
            style={{
              width: 'min(860px, 100vw)',
              background: 'var(--color-bg-secondary)',
              borderLeft: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-primary hover:border-primary/40 transition-all"
              aria-label="Cerrar panel"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div
              className="relative px-8 pt-10 pb-8 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <span
                aria-hidden
                className="absolute top-4 right-16 text-9xl font-extrabold leading-none select-none pointer-events-none"
                style={{ color: 'var(--color-accent)', opacity: 0.06 }}
              >
                {NUMBER_LABELS[index]}
              </span>

              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] pr-12 mb-3">
                {value.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {value.description}
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-8 flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  Demostración visual
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {value.demo.description}
                </p>
              </div>

              <div className="h-px bg-[var(--color-border)]" />

              <DemoRenderer type={value.demo.type} />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
