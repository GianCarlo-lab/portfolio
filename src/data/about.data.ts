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
      demo: {
        type: 'code',
        title: 'Código limpio vs código sucio',
        description:
          'La diferencia entre código que dura y código que se convierte en deuda técnica.',
      },
    },
    {
      title: 'Atención al detalle',
      description: 'Cada píxel y cada función importan. La calidad no es negociable.',
      demo: {
        type: 'symmetry',
        title: 'Cada píxel importa',
        description:
          'El perfeccionismo en UI/UX marca la diferencia entre bueno y memorable.',
      },
    },
    {
      title: 'Aprendizaje continuo',
      description: 'Tecnología evoluciona constantemente. Yo también.',
      demo: {
        type: 'learning',
        title: 'Stack en evolución',
        description:
          'De WordPress a .NET y Azure. El aprendizaje nunca se detiene.',
      },
    },
    {
      title: 'Visión Full Stack real',
      description:
        'Domino frontend y backend con la misma profundidad: no hay silos en mi trabajo.',
      demo: {
        type: 'fullstack',
        title: 'Frontend ↔ Backend sin silos',
        description:
          'Entender ambos lados permite tomar mejores decisiones de arquitectura.',
      },
    },
    {
      title: 'Trabajo en equipo',
      description:
        'El mejor código nace de la colaboración, la comunicación clara y el respeto mutuo.',
      demo: {
        type: 'teamwork',
        title: 'Colaboración real con Git',
        description:
          'Branching strategy, code reviews y comunicación clara en cada PR.',
      },
    },
  ],
}
