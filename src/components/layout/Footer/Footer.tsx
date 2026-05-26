import { Globe, GitFork, Mail } from 'lucide-react'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { NAV_ITEMS } from '@/constants/nav'
import { getTechIcon } from '@/utils/techIcons'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/gianbarrionuevo', icon: Globe },
  { label: 'GitHub', href: 'https://github.com/gianbarrionuevo', icon: GitFork },
  { label: 'Email', href: 'mailto:geancarlosbarrionuevo@gmail.com', icon: Mail },
]

const MAIN_STACK = ['React', 'TypeScript', '.NET', 'Tailwind CSS', 'Azure', 'Git', 'SQL Server', 'Figma']

export function Footer() {
  const year = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-1">
      {/* Top gradient separator */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-accent) 35%, var(--color-accent-secondary) 65%, transparent 100%)',
        }}
      />

      <div className="container-custom py-12">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">

          {/* Col 1 – Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GradientText className="text-2xl font-extrabold">GB</GradientText>
                <span className="font-semibold text-[var(--color-text-primary)]">
                  Barrionuevo
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Desarrollador Full Stack · Lima, Perú
              </p>
            </div>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              Navegación
            </p>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Stack */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {MAIN_STACK.map((tech) => {
                const icon = getTechIcon(tech, 14)
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-white/[0.03]"
                  >
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {tech}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="h-px bg-[var(--color-border)] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
          <p>© {year} Gian Carlo Barrionuevo. Todos los derechos reservados.</p>
          <p>
            Diseñado y desarrollado con{' '}
            <span className="text-primary font-medium">React + TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
