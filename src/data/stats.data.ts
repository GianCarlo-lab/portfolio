import type { StatItem } from '@/modules/stats/stats.types'

export const stats: StatItem[] = [
  {
    id: 'exp',
    value: 2,
    suffix: '+',
    label: 'Años de experiencia',
    icon: 'Briefcase',
    description: 'Desarrollando soluciones reales',
  },
  {
    id: 'tech',
    value: 15,
    suffix: '+',
    label: 'Tecnologías dominadas',
    icon: 'Code2',
    description: 'Frontend, Backend, Cloud y más',
  },
  {
    id: 'modules',
    value: 10,
    suffix: '+',
    label: 'Módulos ERP desarrollados',
    icon: 'Layers',
    description: 'Ventas, compras, inventario y más',
  },
  {
    id: 'projects',
    value: 8,
    suffix: '+',
    label: 'Proyectos completados',
    icon: 'CheckCircle',
    description: 'Freelance y proyectos empresariales',
  },
]
