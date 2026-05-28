import type { Project } from '@/modules/projects/projects.types'

export const projects: Project[] = [
  {
    id: 'erp-distribucion',
    title: 'Sistema ERP de Distribución Comercial',
    shortDescription:
      'Módulos completos de gestión empresarial con Blazor/.NET 8 para distribución comercial',
    fullDescription:
      'Sistema ERP empresarial desarrollado en RADAR para gestión integral de distribución comercial. Incluye módulos de ventas, compras, inventario, clientes, vendedores y manifiestos de carga con exportación profesional a Excel y PDF.',
    problem:
      'La empresa necesitaba digitalizar y centralizar sus operaciones de distribución comercial, eliminando procesos manuales y reduciendo errores en ventas, compras e inventario.',
    solution:
      'Desarrollé módulos ERP completos con Blazor Server y .NET 8, implementando interfaces intuitivas, exportación a Excel con ClosedXML y generación de comprobantes PDF con QuestPDF incluyendo código QR para documentos SUNAT.',
    architecture:
      'Arquitectura en capas con Blazor Server como frontend, .NET 8 en la capa de negocio, SQL Server como base de datos, y servicios separados para reportes. CSS aislado por componente para consistencia visual.',
    challenges: [
      'Implementar exportación Excel con estilos y formatos corporativos complejos usando ClosedXML',
      'Generar PDFs con QR codes válidos para el sistema de facturación electrónica SUNAT',
      'Gestionar múltiples bases de datos SQL Server en ambientes de desarrollo simultáneos',
      'Mantener consistencia visual entre 10+ módulos con CSS aislado en Blazor',
    ],
    results: [
      '10+ módulos ERP funcionales en producción',
      'Exportación Excel implementada en 7 módulos distintos',
      'Generación automática de comprobantes PDF con QR SUNAT',
      'Reducción significativa de errores en procesos manuales',
    ],
    learnings: [
      'Dominio avanzado de Blazor Server y ciclo de vida de componentes',
      'Generación profesional de documentos Excel y PDF en .NET',
      'Gestión de bases de datos SQL Server en entornos empresariales',
      'Importancia del CSS aislado en aplicaciones Blazor grandes',
    ],
    technologies: [
      { name: 'Blazor Server', color: '#682AD7' },
      { name: '.NET 8', color: '#512BD4' },
      { name: 'C#', color: '#239120' },
      { name: 'SQL Server', color: '#CC2927' },
      { name: 'ClosedXML', color: '#1D6F42' },
      { name: 'QuestPDF', color: '#FF6B35' },
      { name: 'QRCoder', color: '#94A3B8' },
      { name: 'Git', color: '#F05032' },
    ],
    tags: [
      { name: 'ERP', color: '#6366F1' },
      { name: 'Empresarial', color: '#8B5CF6' },
      { name: 'Full Stack' },
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
