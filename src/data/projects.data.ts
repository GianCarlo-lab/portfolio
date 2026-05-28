import type { Project } from '@/modules/projects/projects.types'

export const projects: Project[] = [
  {
    id: 'erp-distribucion',
    title: 'Módulo de Abastecimiento — ERP Distribución',
    shortDescription:
      'Módulo completo de abastecimiento para ERP de distribución comercial con MAUI Blazor y ASP.NET Core 9',
    fullDescription:
      'Desarrollo completo del Módulo de Abastecimiento dentro de un ERP empresarial en RADAR. Incluye gestión de surtido con 8 acciones CRUD, matrices de abastecimiento, sistema de carga masiva para 18 plantillas Excel, calendario de proveedores y sucursales, y arquitectura en capas completa de DTOs hasta vistas Blazor.',
    problem:
      'La empresa necesitaba digitalizar y automatizar el proceso de abastecimiento de su red de distribución comercial, eliminando la gestión manual en Excel y reduciendo errores en la planificación de surtido, exclusiones y promociones entre formatos y sucursales.',
    solution:
      'Desarrollé el módulo completo de Abastecimiento con MAUI Blazor y ASP.NET Core 9, implementando arquitectura en capas (DTOs → Repositories con Dapper → Controllers → Services → Vistas), sistema de carga masiva por Excel con validación fila por fila y staging en SQL Server, y componentes reutilizables como CargaMasivaModal.',
    architecture:
      'Arquitectura de abajo hacia arriba: DTOs tipados → Interfaces de repositorio → Repositories con Dapper + SQL Server → Controllers ASP.NET Core → Services con lógica de negocio → Vistas MAUI Blazor. CSS modular con prefijo rep-* para aislamiento de estilos. JS Interop para operaciones nativas MAUI.',
    challenges: [
      'Implementar sistema de carga masiva para 18 plantillas Excel distintas con validación fila por fila y flujo de staging antes del ETL',
      'Desarrollar el componente CargaMasivaModal reutilizable compatible con FilePicker nativo de MAUI Blazor',
      'Diseñar arquitectura en capas completa manteniendo consistencia en validaciones entre frontend Blazor y backend ASP.NET Core',
      'Implementar dropdowns posicionados correctamente con JS Interop en el contexto de MAUI',
      'Gestionar múltiples ambientes de base de datos (BDForceDistribucion + ForceDistribucionAuth) con sqlcmd',
    ],
    results: [
      'Módulo de Abastecimiento completo en producción con 8 submódulos funcionales',
      'Sistema de carga masiva para 18 plantillas Excel con validación y staging implementado',
      'Componente CargaMasivaModal reutilizable aplicado en todo el módulo',
      'Arquitectura en capas completa y documentada desde DTOs hasta vistas',
      'Sistema CSS modular con prefijo rep-* garantizando consistencia visual',
    ],
    learnings: [
      'Dominio de MAUI Blazor y sus diferencias con Blazor Server estándar',
      'ASP.NET Core 9 con arquitectura en capas real en entorno empresarial',
      'Dapper como alternativa eficiente a Entity Framework para queries complejas',
      'Gestión de ETL con staging en SQL Server para carga masiva de datos',
      'Patrones de validación consistentes entre frontend y backend en sistemas grandes',
    ],
    technologies: [
      { name: 'MAUI Blazor', color: '#512BD4' },
      { name: 'ASP.NET Core', color: '#512BD4' },
      { name: 'C#', color: '#239120' },
      { name: 'SQL Server', color: '#CC2927' },
      { name: 'Dapper', color: '#512BD4' },
      { name: 'ClosedXML', color: '#217346' },
      { name: 'QuestPDF', color: '#FF0000' },
      { name: 'JS Interop', color: '#F7DF1E' },
      { name: 'Git', color: '#F05032' },
    ],
    tags: [
      { name: 'ERP', color: '#6366F1' },
      { name: 'Empresarial', color: '#8B5CF6' },
      { name: 'Full Stack', color: '#94A3B8' },
    ],
    featured: true,
    gradient: 'from-indigo-500/20 to-purple-500/20',
    icon: 'Layers',
  },
  {
    id: 'plataforma-react',
    title: 'Plataforma Web Full Stack con React + Quarkus',
    shortDescription:
      'Sistema web moderno con React.js frontend y Java/Quarkus backend, con autenticación JWT y APIs REST',
    fullDescription:
      'Plataforma web completa desarrollada en Grupo Centro Tecnológico con arquitectura desacoplada. Frontend en React con TypeScript y Tailwind, backend en Java/Quarkus con APIs REST y autenticación JWT segura.',
    problem:
      'El cliente necesitaba una plataforma web moderna con gestión de usuarios, pedidos y autenticación segura, reemplazando un sistema legacy poco escalable.',
    solution:
      'Arquitectura desacoplada con React.js + TypeScript en frontend y Java/Quarkus en backend. Implementé autenticación JWT, formularios dinámicos con React Hook Form + Yup, integración REST con Axios y pruebas con React Testing Library.',
    architecture:
      'Frontend SPA con React + TypeScript + Tailwind CSS. Backend RESTful con Java/Quarkus y Panache ORM. Autenticación stateless con JWT. Comunicación via APIs REST con contratos de datos definidos en equipo.',
    challenges: [
      'Coordinar contratos de API entre equipo frontend y backend',
      'Implementar validaciones robustas en formularios complejos con React Hook Form + Yup',
      'Asegurar compatibilidad cross-browser y performance en diferentes dispositivos',
      'Implementar autenticación JWT segura con refresh tokens',
    ],
    results: [
      'Sistema en producción con múltiples módulos funcionales',
      'Cobertura de pruebas con React Testing Library',
      'Performance optimizada en múltiples navegadores y dispositivos',
      'Autenticación JWT implementada y funcionando en producción',
    ],
    learnings: [
      'Profundización en arquitecturas desacopladas frontend/backend',
      'Manejo avanzado de formularios con React Hook Form',
      'Primer acercamiento serio a metodologías Scrum en equipo real',
      'Java/Quarkus como alternativa eficiente a Spring Boot',
    ],
    technologies: [
      { name: 'React.js', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#06B6D4' },
      { name: 'Java', color: '#ED8B00' },
      { name: 'Quarkus', color: '#4695EB' },
      { name: 'JWT', color: '#D63AFF' },
      { name: 'REST API', color: '#6366F1' },
      { name: 'Figma', color: '#F24E1E' },
    ],
    tags: [
      { name: 'Full Stack', color: '#6366F1' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Java' },
    ],
    featured: true,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    icon: 'Globe',
  },
  {
    id: 'ecommerce-gotech',
    title: 'E-commerce Completo con WooCommerce',
    shortDescription:
      'Tienda online completa con carrito, pasarela de pago personalizada y sistema de notificaciones',
    fullDescription:
      'E-commerce completo desarrollado en Gotech con WordPress y WooCommerce. Incluye carrito de compras, integración con pasarela de pago, sistema de notificaciones y funciones PHP personalizadas para lógica de negocio específica.',
    problem:
      'El cliente necesitaba una tienda online completa con flujo de compra personalizado, gestión de productos y notificaciones automáticas, sin depender de soluciones genéricas.',
    solution:
      'E-commerce con WordPress y WooCommerce como base, extensamente personalizado con PHP para adaptar el flujo de compra, gestión de pedidos y notificaciones a las necesidades específicas del negocio.',
    architecture:
      'WordPress + WooCommerce como CMS y e-commerce engine. Funciones PHP personalizadas en functions.php y plugins a medida. Integración con base de datos MySQL para consultas específicas. Plugins optimizados para SEO y rendimiento.',
    challenges: [
      'Personalizar el flujo de compra de WooCommerce sin romper la compatibilidad con plugins',
      'Implementar pasarela de pago personalizada con validaciones de seguridad',
      'Optimizar la velocidad del sitio manteniendo todas las funcionalidades activas',
      'Garantizar responsive design completo en todos los dispositivos',
    ],
    results: [
      'Tienda online funcional en producción',
      'Pasarela de pago personalizada implementada',
      'Sistema de notificaciones automáticas funcionando',
      'Performance y SEO optimizados',
    ],
    learnings: [
      'Profundización en WordPress y WooCommerce a nivel avanzado',
      'PHP para personalización de lógica de negocio compleja',
      'Optimización de rendimiento en sitios WordPress',
      'Importancia del SEO técnico desde el desarrollo',
    ],
    technologies: [
      { name: 'WordPress', color: '#21759B' },
      { name: 'WooCommerce', color: '#7F54B3' },
      { name: 'PHP', color: '#777BB4' },
      { name: 'HTML5', color: '#E34F26' },
      { name: 'CSS', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'MySQL', color: '#4479A1' },
    ],
    tags: [
      { name: 'E-commerce', color: '#F59E0B' },
      { name: 'WordPress' },
      { name: 'PHP' },
    ],
    featured: false,
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: 'ShoppingCart',
  },
  {
    id: 'reconocimiento-facial',
    title: 'Sistema de Reconocimiento Facial con Azure',
    shortDescription:
      'Aplicación con reconocimiento facial usando Azure Cognitive Services Face API',
    fullDescription:
      'Sistema de reconocimiento facial desarrollado integrando Azure Cognitive Services Face API. Permite identificación y verificación de personas, registro de rostros y análisis de atributos faciales usando servicios cloud de Microsoft.',
    problem:
      'Necesidad de implementar identificación biométrica confiable usando servicios cloud sin construir modelos de ML desde cero.',
    solution:
      'Integración con Azure Cognitive Services Face API para reconocimiento, verificación y análisis facial. Frontend construido con React para la interfaz de captura y visualización de resultados.',
    architecture:
      'Frontend React para captura de imágenes y visualización. Integración directa con Azure Face API via REST. Gestión de grupos de personas y rostros registrados en Azure.',
    challenges: [
      'Integrar correctamente la Azure Face API con autenticación y manejo de errores',
      'Optimizar la captura de imágenes para mejorar la precisión del reconocimiento',
      'Manejar los límites de la API y respuestas asíncronas correctamente',
    ],
    results: [
      'Sistema funcional de reconocimiento facial en tiempo real',
      'Integración exitosa con Azure Cognitive Services',
      'Interfaz intuitiva para registro y verificación de personas',
    ],
    learnings: [
      'Integración con servicios cognitivos de Azure',
      'Manejo de APIs de visión computacional',
      'Primeros pasos en IA aplicada con servicios cloud',
    ],
    technologies: [
      { name: 'React.js', color: '#61DAFB' },
      { name: 'Azure Cognitive Services', color: '#0078D4' },
      { name: 'Face API', color: '#0078D4' },
      { name: 'REST API', color: '#6366F1' },
      { name: 'JavaScript', color: '#F7DF1E' },
    ],
    tags: [
      { name: 'IA', color: '#0078D4' },
      { name: 'Azure', color: '#0078D4' },
      { name: 'React' },
    ],
    featured: false,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    icon: 'Eye',
  },
]
