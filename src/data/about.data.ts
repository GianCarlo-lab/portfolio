import type { AboutData } from '@/modules/about/about.types'

export const aboutData: AboutData = {
  greeting: 'Sobre mí',
  bio: [
    'Soy Gian Barrionuevo, desarrollador Full Stack egresado de Computación e Informática en Cibertec. Me especializo en construir sistemas empresariales robustos con React.js y .NET, con atención real al detalle tanto en frontend como en backend.',
    'Actualmente desarrollo módulos ERP en RADAR con Blazor/.NET 8, y anteriormente trabajé como freelance construyendo interfaces modernas con React, integrando APIs REST y desarrollando backends con Java/Quarkus. Me impulsa escribir código limpio, escalable y que genere impacto real.',
  ],
  highlights: [
    { icon: 'Briefcase', label: 'Experiencia', value: '2+ años' },
    { icon: 'Code2', label: 'Tecnologías', value: '15+' },
    { icon: 'Layers', label: 'Módulos ERP', value: '10+' },
    { icon: 'Globe', label: 'Proyectos', value: '8+' },
  ],
  values: [
    {
      title: 'Clean Code',
      description: 'Código legible, mantenible y escalable como estándar mínimo.',
    },
    {
      title: 'Atención al detalle',
      description: 'Cada píxel y cada función importan. La calidad no es negociable.',
    },
    {
      title: 'Aprendizaje continuo',
      description: 'Tecnología evoluciona constantemente. Yo también.',
    },
    {
      title: 'Visión Full Stack real',
      description: 'Domino frontend y backend con la misma profundidad: no hay silos en mi trabajo.',
    },
    {
      title: 'Trabajo en equipo',
      description: 'El mejor código nace de la colaboración, la comunicación clara y el respeto mutuo.',
    },
  ],
}
