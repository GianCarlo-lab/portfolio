import { motion } from 'framer-motion'
import type { Technology } from '@/types/common.types'
import { staggerItem } from '@/animations/variants'
import { getTechIcon } from '@/utils/techIcons'
import { cn } from '@/utils/cn'

interface HeroTechBadgesProps {
  technologies: Technology[]
  delay?: number
}

export function HeroTechBadges({ technologies, delay = 0 }: HeroTechBadgesProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06, delayChildren: delay },
        },
      }}
      className="flex flex-wrap gap-2"
    >
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          variants={staggerItem}
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
        >
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
              'text-xs font-medium cursor-default select-none',
              'border bg-white/[0.03] transition-colors duration-200',
              'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
            style={{
              borderColor: tech.color ? `${tech.color}40` : 'var(--color-border)',
            }}
          >
            {(() => {
              const icon = getTechIcon(tech.name, 16)
              return icon ? (
                <span className="flex-shrink-0">{icon}</span>
              ) : (
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: tech.color ?? 'var(--color-accent)' }}
                />
              )
            })()}
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
