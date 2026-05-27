import type { HeroData } from '@/modules/hero/hero.types'
import cvPdf from '@/assets/documents/CV_GianCarlo_Barrionuevo.pdf'

export const heroData: HeroData = {
  name: 'Gian Barrionuevo',
  role: 'Full Stack Developer',
  roleHighlight: 'Full Stack',
  description:
    'Desarrollador Full Stack especializado en React.js y .NET, con experiencia en sistemas empresariales ERP, APIs REST y servicios cloud. Apasionado por el código limpio y las interfaces que generan impacto real.',
  technologies: [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: '.NET', color: '#512BD4' },
    { name: 'Blazor', color: '#682AD7' },
    { name: 'Azure', color: '#0089D6' },
    { name: 'SQL Server', color: '#CC2927' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
  ],

  cvUrl: cvPdf,
  linkedIn: 'https://linkedin.com/in/gianbarrionuevo',
  github: 'https://github.com/gianbarrionuevo',
  email: 'geancarlosbarrionuevo@gmail.com',
}
