import { motion } from 'framer-motion'
import { Download, Globe, GitFork, Mail } from 'lucide-react'
import { Button } from '@/components/common/Button/Button'
import { staggerItem } from '@/animations/variants'
import { cn } from '@/utils/cn'

interface HeroCTAProps {
  cvUrl: string
  linkedIn: string
  github: string
  email: string
  delay?: number
}

const SOCIAL_ITEMS = [
  { label: 'LinkedIn', icon: Globe, key: 'linkedIn' as const },
  { label: 'GitHub', icon: GitFork, key: 'github' as const },
  { label: 'Email', icon: Mail, key: 'email' as const },
]

interface SocialIconProps {
  href: string
  label: string
  icon: React.ElementType
}

function SocialIcon({ href, label, icon: Icon }: SocialIconProps) {
  const isExternal = href.startsWith('http')
  return (
    <div className="group relative">
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={label}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl',
          'border border-[var(--color-border)] hover:border-primary/40',
          'text-[var(--color-text-secondary)] hover:text-primary',
          'transition-all duration-300 hover:shadow-glow',
          'bg-white/[0.03] hover:bg-primary/5'
        )}
      >
        <Icon size={17} />
      </a>
      {/* Tooltip */}
      <span
        className={cn(
          'absolute -top-8 left-1/2 -translate-x-1/2',
          'px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap',
          'bg-dark-800 border border-[var(--color-border)] text-[var(--color-text-primary)]',
          'opacity-0 group-hover:opacity-100 pointer-events-none',
          'transition-opacity duration-200'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export function HeroCTA({ cvUrl, linkedIn, github, email, delay = 0 }: HeroCTAProps) {
  const emailHref = `mailto:${email}`

  const socialLinks = { linkedIn, github, email: emailHref }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className="flex flex-col gap-5"
    >
      {/* CTA buttons */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          size="lg"
          href={cvUrl}
          external
          icon={<Download size={18} />}
          iconPosition="left"
        >
          Visualizar CV
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Ver proyectos
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={staggerItem} className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs text-[var(--color-text-secondary)]">o encuéntrame en</span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </motion.div>

      {/* Social icons */}
      <motion.div variants={staggerItem} className="flex justify-center items-center gap-3">
        {SOCIAL_ITEMS.map(({ label, icon, key }) => (
          <SocialIcon
            key={key}
            href={socialLinks[key]}
            label={label}
            icon={icon}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
