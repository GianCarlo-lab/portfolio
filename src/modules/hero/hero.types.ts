import type { Technology } from '@/types/common.types'

export interface HeroData {
  name: string
  role: string
  roleHighlight: string
  description: string
  technologies: Technology[]
  cvUrl: string
  linkedIn: string
  github: string
  email: string
}

export interface TechBadgeProps {
  tech: Technology
  index: number
}
