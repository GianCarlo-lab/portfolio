export type SkillLevel = 'experto' | 'avanzado' | 'intermedio'

export interface SkillItem {
  name: string
  icon?: string
  level: SkillLevel
  color?: string
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  skills: SkillItem[]
}
