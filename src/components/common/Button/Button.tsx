import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { ButtonVariant, ButtonSize } from '@/types/common.types'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary hover:bg-primary/90 text-white shadow-glow hover:shadow-glow-lg',
  secondary:
    'bg-dark-800 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text-primary)]',
  ghost:
    'hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  external,
  disabled,
  loading,
  className,
  icon,
  iconPosition = 'left',
  type = 'button',
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950',
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      {loading && <Spinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={base}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={base}>
      {content}
    </button>
  )
}
