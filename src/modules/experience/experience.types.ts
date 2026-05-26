import type { Technology } from '@/types/common.types'

export interface ExperienceItem {
  id: string
  company: string
  role: string
  type: 'full-time' | 'freelance'
  startDate: string
  endDate: string | 'Actualidad'
  description: string
  responsibilities: string[]
  technologies: Technology[]
  current?: boolean
}
