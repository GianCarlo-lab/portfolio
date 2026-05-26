import type { ReactNode } from 'react'

export interface Technology {
  name: string
  icon?: string
  color?: string
}

export interface SectionProps {
  id?: string
  className?: string
  children?: ReactNode
}

export interface NavItem {
  label: string
  href: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export type ButtonSize = 'sm' | 'md' | 'lg'
