import type { Technology } from '@/types/common.types'

export interface ProjectTag {
  name: string
  color?: string
}

export interface ProjectLink {
  label: string
  url: string
  icon: string
}

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  problem: string
  solution: string
  architecture: string
  challenges: string[]
  results: string[]
  learnings: string[]
  technologies: Technology[]
  tags: ProjectTag[]
  links?: ProjectLink[]
  featured: boolean
  gradient: string
  icon: string
}
