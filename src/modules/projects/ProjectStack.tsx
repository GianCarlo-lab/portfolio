import type { Technology } from '@/types/common.types'
import { getTechIcon } from '@/utils/techIcons'

interface ProjectStackProps {
  technologies: Technology[]
  maxVisible?: number
}

export function ProjectStack({ technologies, maxVisible = 5 }: ProjectStackProps) {
  const visible = technologies.slice(0, maxVisible)
  const rest = technologies.length - visible.length

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-secondary)]"
          style={tech.color ? { borderColor: `${tech.color}35` } : undefined}
        >
          {(() => {
            const icon = getTechIcon(tech.name, 14)
            return icon ? (
              <span className="flex-shrink-0">{icon}</span>
            ) : tech.color ? (
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tech.color }} />
            ) : null
          })()}
          {tech.name}
        </span>
      ))}
      {rest > 0 && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-muted)]">
          +{rest} más
        </span>
      )}
    </div>
  )
}
