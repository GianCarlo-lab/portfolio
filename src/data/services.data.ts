import type { ServiceItem } from '@/modules/services/services.types'

export const services: ServiceItem[] = [
  {
    id: 'web-apps',
    icon: 'Monitor',
    title: 'Aplicaciones Web a Medida',
    description:
      'Desarrollo interfaces modernas, rápidas y responsivas que se adaptan a cualquier dispositivo. Desde landing pages hasta sistemas web complejos con lógica de negocio real.',
    features: [
      'Interfaces React con TypeScript limpio y escalable',
      'Diseño responsive y mobile-first',
      'Integraciones con APIs REST y servicios externos',
      'Formularios dinámicos con validaciones robustas',
      'Optimización de rendimiento y experiencia de usuario',
    ],
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    highlighted: true,
    tag: 'Más solicitado',
  },
  {
    id: 'fullstack-systems',
    icon: 'Layers',
    title: 'Sistemas Full Stack Empresariales',
    description:
      'Construyo sistemas completos de principio a fin: frontend, backend, base de datos y despliegue. Ideal para empresas que necesitan digitalizar procesos o construir plataformas internas.',
    features: [
      'Módulos ERP y sistemas de gestión personalizados',
      'APIs REST robustas con autenticación y seguridad',
      'Bases de datos relacionales optimizadas',
      'Exportación de reportes en Excel y PDF profesional',
      'Paneles administrativos y dashboards',
    ],
    technologies: ['React.js', '.NET 8', 'Blazor', 'SQL Server', 'Azure'],
    highlighted: false,
  },
  {
    id: 'api-backend',
    icon: 'Server',
    title: 'Backend & APIs REST',
    description:
      'Desarrollo backends sólidos y bien estructurados. Desde microservicios hasta APIs completas con autenticación, validaciones y documentación.',
    features: [
      'APIs REST con .NET 8 o Java/Quarkus',
      'Autenticación segura con JWT',
      'Integración con bases de datos SQL y NoSQL',
      'Generación de reportes Excel y PDF automatizados',
      'Integración con servicios cloud de Azure',
    ],
    technologies: ['.NET 8', 'Java', 'Node.js', 'SQL Server', 'JWT'],
    highlighted: false,
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    title: 'Tiendas Online & E-commerce',
    description:
      'Implemento tiendas online completas con carrito de compras, pasarela de pagos y gestión de pedidos. Soluciones listas para vender desde el primer día.',
    features: [
      'E-commerce con WordPress y WooCommerce',
      'Pasarelas de pago personalizadas',
      'Gestión de productos, pedidos y clientes',
      'SEO técnico y optimización de velocidad',
      'Diseño atractivo y experiencia de compra fluida',
    ],
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'JavaScript'],
    highlighted: false,
  },
  {
    id: 'landing-pages',
    icon: 'Zap',
    title: 'Landing Pages de Alto Impacto',
    description:
      'Páginas de aterrizaje diseñadas para convertir visitas en clientes. Rápidas, atractivas y optimizadas para posicionarse en Google.',
    features: [
      'Diseño moderno y profesional orientado a conversión',
      'Animaciones y microinteracciones premium',
      'Velocidad de carga optimizada (Core Web Vitals)',
      'SEO on-page desde el primer commit',
      'Formularios de contacto y CTAs estratégicos',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Next.js', 'TypeScript'],
    highlighted: false,
  },
  {
    id: 'consulting',
    icon: 'MessageSquare',
    title: 'Consultoría & Code Review',
    description:
      'Reviso tu código, propongo mejoras de arquitectura y te ayudo a tomar mejores decisiones técnicas. Ideal para equipos pequeños o proyectos que necesitan una segunda opinión.',
    features: [
      'Revisión de código y detección de problemas',
      'Propuestas de arquitectura frontend y backend',
      'Migración de proyectos legacy a tecnologías modernas',
      'Mentoring en React, TypeScript y .NET',
      'Documentación técnica clara y mantenible',
    ],
    technologies: ['React.js', 'TypeScript', '.NET', 'Clean Code', 'Git'],
    highlighted: false,
  },
]
