import type { SkillCategory } from '@/modules/skills/skills.types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'React.js', level: 'experto', color: '#61DAFB' },
      { name: 'TypeScript', level: 'avanzado', color: '#3178C6' },
      { name: 'JavaScript ES6+', level: 'experto', color: '#F7DF1E' },
      { name: 'Blazor Server', level: 'avanzado', color: '#512BD4' },
      { name: 'Next.js', level: 'intermedio', color: '#AAAAAA' },
      { name: 'Tailwind CSS', level: 'experto', color: '#06B6D4' },
      { name: 'HTML5 / CSS3', level: 'experto', color: '#E34F26' },
      { name: 'Framer Motion', level: 'intermedio', color: '#FF0055' },
      { name: 'React Hook Form', level: 'avanzado', color: '#EC5990' },
      { name: 'Material UI', level: 'avanzado', color: '#007FFF' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    skills: [
      { name: '.NET 8 / C#', level: 'avanzado', color: '#512BD4' },
      { name: 'Java / Quarkus', level: 'intermedio', color: '#ED8B00' },
      { name: 'Node.js', level: 'intermedio', color: '#339933' },
      { name: 'NestJS', level: 'intermedio', color: '#E0234E' },
      { name: 'APIs REST', level: 'experto', color: '#6366F1' },
      { name: 'JWT / Auth', level: 'avanzado', color: '#FB923C' },
      { name: 'Entity Framework', level: 'avanzado', color: '#512BD4' },
    ],
  },
  {
    id: 'databases',
    label: 'Bases de datos',
    icon: 'Database',
    skills: [
      { name: 'SQL Server', level: 'avanzado', color: '#CC2927' },
      { name: 'PostgreSQL', level: 'intermedio', color: '#4169E1' },
      { name: 'MySQL', level: 'intermedio', color: '#4479A1' },
      { name: 'MongoDB', level: 'intermedio', color: '#47A248' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & IA',
    icon: 'Cloud',
    skills: [
      { name: 'Azure', level: 'intermedio', color: '#0078D4' },
      { name: 'Azure Cognitive Services', level: 'intermedio', color: '#0078D4' },
      { name: 'Face API', level: 'intermedio', color: '#0078D4' },
    ],
  },
  {
    id: 'tools',
    label: 'Herramientas',
    icon: 'Wrench',
    skills: [
      { name: 'Git / GitHub', level: 'experto', color: '#F05032' },
      { name: 'Figma', level: 'avanzado', color: '#F24E1E' },
      { name: 'Postman', level: 'avanzado', color: '#FF6C37' },
      { name: 'Jira', level: 'avanzado', color: '#0052CC' },
      { name: 'Docker', level: 'intermedio', color: '#2496ED' },
      { name: 'Visual Studio', level: 'experto', color: '#5C2D91' },
    ],
  },
  {
    id: 'reports',
    label: 'Reportes & Docs',
    icon: 'FileText',
    skills: [
      { name: 'ClosedXML (Excel)', level: 'avanzado', color: '#217346' },
      { name: 'QuestPDF', level: 'avanzado', color: '#6366F1' },
      { name: 'QRCoder', level: 'avanzado', color: '#94A3B8' },
      { name: 'JS Interop', level: 'avanzado', color: '#F7DF1E' },
    ],
  },
]
