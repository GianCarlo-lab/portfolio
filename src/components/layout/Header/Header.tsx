import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/nav'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useActiveSection } from '@/hooks/useActiveSection'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { Button } from '@/components/common/Button/Button'
import { cn } from '@/utils/cn'

const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'skills',
  'stats',
  'services',
  'projects',
  'contact',
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const progress = useScrollProgress()
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href: string) => href === `#${activeSection}`

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-dark-950/80 border-b border-[var(--color-border)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav
          role="navigation"
          aria-label="Navegación principal"
          className="flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            className="flex items-center gap-2 font-display font-bold text-xl"
            aria-label="Ir al inicio"
          >
            <GradientText className="text-2xl font-bold">GB</GradientText>
            <span className="text-[var(--color-text-primary)] font-semibold hidden sm:block">
              Barrionuevo
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      active
                        ? 'text-primary'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5'
                    )}
                  >
                    {item.label}
                    {/* Sliding underline indicator */}
                    {active && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('#contact')}
            >
              Contrátame
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Scroll progress bar */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-100 rounded-full"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)] backdrop-blur-md bg-dark-950/95"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <button
                    key={item.href}
                    role="menuitem"
                    onClick={() => handleNavClick(item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-left px-4 py-3 rounded-lg text-sm font-medium transition-all',
                      active
                        ? 'text-primary bg-primary/10 border-l-2 border-primary pl-3.5'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5'
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleNavClick('#contact')}
                >
                  Contrátame
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
