import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Clock, Users, ListChecks, Palette, GitBranch,
  Code2, Layout, Puzzle, Plug, Monitor, RefreshCw, CheckSquare,
  Rocket, Package, Headphones, Database, Server, Shield,
  FileSpreadsheet, Globe, ShoppingCart, CreditCard, Search,
  FileSearch, FileText, MessageCircle, BarChart2, FolderGit2,
  Terminal, BookOpen, type LucideIcon,
} from 'lucide-react'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'

interface TimelineStep {
  icon: LucideIcon
  title: string
  desc: string
  output: string
}

interface TimelinePhase {
  number: number
  title: string
  desc: string
  duration: string
  color: string
  steps: TimelineStep[]
}

// ─── Timeline data per service ────────────────────────────────────────────────

const WEB_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Descubrimiento',
    desc: 'Entendemos el proyecto, objetivos y contexto antes de escribir una sola línea de código.',
    duration: '1-2 días',
    color: '#06B6D4',
    steps: [
      { icon: Users, title: 'Reunión inicial', desc: 'Llamada de 30-45 min para entender el proyecto, objetivos y contexto del negocio.', output: 'Brief del proyecto documentado' },
      { icon: ListChecks, title: 'Análisis de requerimientos', desc: 'Definición de funcionalidades, páginas y flujos de usuario con prioridades claras.', output: 'Lista de requerimientos priorizada' },
      { icon: Palette, title: 'Revisión de referencias', desc: 'Análisis de referencias visuales y definición del estilo y tono deseado.', output: 'Moodboard y dirección visual' },
    ],
  },
  {
    number: 2,
    title: 'Planificación técnica',
    desc: 'Definimos la arquitectura, el stack y el cronograma antes de comenzar a desarrollar.',
    duration: '1-2 días',
    color: '#A855F7',
    steps: [
      { icon: GitBranch, title: 'Arquitectura frontend', desc: 'Definición de estructura de componentes, rutas y manejo de estado.', output: 'Diagrama de arquitectura' },
      { icon: Code2, title: 'Stack final', desc: 'Confirmación de tecnologías según las necesidades específicas del proyecto.', output: 'Stack document' },
      { icon: Clock, title: 'Estimación detallada', desc: 'Breakdown de tareas con tiempo estimado por módulo y funcionalidad.', output: 'Cronograma de desarrollo' },
    ],
  },
  {
    number: 3,
    title: 'Desarrollo',
    desc: 'Construcción iterativa del proyecto con entregas parciales para validar avances.',
    duration: '1-4 semanas',
    color: '#6366F1',
    steps: [
      { icon: Terminal, title: 'Setup inicial', desc: 'Configuración del proyecto, repositorio Git, estructura base y CI básico.', output: 'Proyecto corriendo localmente' },
      { icon: Layout, title: 'Componentes base', desc: 'Desarrollo del design system: botones, inputs, cards y tipografía.', output: 'UI Kit funcional' },
      { icon: Puzzle, title: 'Módulos principales', desc: 'Desarrollo de cada sección o página según los requerimientos priorizados.', output: 'Funcionalidades implementadas' },
      { icon: Plug, title: 'Integraciones', desc: 'Conexión con APIs externas, formularios y servicios de terceros.', output: 'Sistema integrado y funcional' },
    ],
  },
  {
    number: 4,
    title: 'Revisión y ajustes',
    desc: 'Presentamos el avance, recibimos feedback y refinamos hasta que quede perfecto.',
    duration: '2-4 días',
    color: '#F59E0B',
    steps: [
      { icon: Monitor, title: 'Demo en staging', desc: 'Presentación del avance en ambiente de pruebas para revisión y feedback.', output: 'URL de preview compartida' },
      { icon: RefreshCw, title: 'Ronda de cambios', desc: 'Incorporación del feedback y ajustes de diseño o funcionalidad.', output: 'Versión refinada' },
      { icon: CheckSquare, title: 'Testing cross-browser', desc: 'Verificación en Chrome, Firefox, Safari y dispositivos móviles reales.', output: 'Reporte de compatibilidad' },
    ],
  },
  {
    number: 5,
    title: 'Entrega y soporte',
    desc: 'Deploy a producción, handoff completo del código y 30 días de soporte incluido.',
    duration: '1-2 días',
    color: '#34D399',
    steps: [
      { icon: Rocket, title: 'Deploy a producción', desc: 'Despliegue en Vercel, Netlify o servidor del cliente con dominio real.', output: 'Sitio en vivo con dominio real' },
      { icon: FolderGit2, title: 'Handoff de código', desc: 'Entrega del repositorio con documentación, README y guías de uso.', output: 'Repositorio documentado' },
      { icon: Headphones, title: 'Soporte post-entrega', desc: '30 días de soporte para bugs y consultas técnicas sin costo adicional.', output: 'Canal de comunicación abierto' },
    ],
  },
]

const FULLSTACK_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Análisis empresarial',
    desc: 'Relevamiento profundo de los procesos del negocio para construir lo que realmente se necesita.',
    duration: '2-3 días',
    color: '#06B6D4',
    steps: [
      { icon: BarChart2, title: 'Relevamiento de procesos', desc: 'Mapeo de los procesos actuales y puntos de dolor del negocio que el sistema debe resolver.', output: 'Documento de procesos AS-IS' },
      { icon: ListChecks, title: 'Definición de módulos', desc: 'Identificación y priorización de los módulos del sistema con sus interdependencias.', output: 'Lista de módulos priorizados' },
      { icon: Database, title: 'Modelado de datos', desc: 'Diseño del esquema de base de datos según las entidades y relaciones del negocio.', output: 'Diagrama entidad-relación' },
    ],
  },
  {
    number: 2,
    title: 'Arquitectura del sistema',
    desc: 'Diseño técnico completo antes de escribir código, para evitar deuda técnica desde el inicio.',
    duration: '2-3 días',
    color: '#A855F7',
    steps: [
      { icon: GitBranch, title: 'Diseño de arquitectura', desc: 'Definición de capas: DTOs, Interfaces, Repositories, Services, Controllers.', output: 'Diagrama de arquitectura' },
      { icon: Server, title: 'Diseño de APIs', desc: 'Definición de endpoints REST, contratos de datos y estrategia de autenticación.', output: 'Documentación de API (Swagger)' },
      { icon: Terminal, title: 'Setup del proyecto', desc: 'Configuración de la solución .NET, base de datos inicial y repositorio Git.', output: 'Proyecto base funcional' },
    ],
  },
  {
    number: 3,
    title: 'Desarrollo backend',
    desc: 'Construcción de la API y la lógica de negocio con arquitectura en capas real.',
    duration: '2-5 semanas',
    color: '#6366F1',
    steps: [
      { icon: Database, title: 'Capas de datos', desc: 'Implementación de DTOs, Repositories con Dapper y migraciones SQL Server.', output: 'Capa de datos funcional' },
      { icon: Code2, title: 'Lógica de negocio', desc: 'Services con validaciones, transacciones y manejo de errores robusto.', output: 'Business logic implementada' },
      { icon: Server, title: 'APIs REST', desc: 'Controllers ASP.NET con endpoints documentados, JWT y Swagger actualizado.', output: 'API documentada y funcional' },
    ],
  },
  {
    number: 4,
    title: 'Desarrollo frontend',
    desc: 'Vistas Blazor conectadas al backend con componentes reutilizables y reportes.',
    duration: '1-4 semanas',
    color: '#06B6D4',
    steps: [
      { icon: Layout, title: 'Componentes Blazor', desc: 'Desarrollo de vistas y componentes reutilizables con CSS modular aislado.', output: 'UI components library' },
      { icon: Plug, title: 'Integración con API', desc: 'Conexión de vistas con el backend, manejo de estados y loading states.', output: 'Frontend integrado' },
      { icon: FileSpreadsheet, title: 'Reportes Excel/PDF', desc: 'Exportaciones con ClosedXML y QuestPDF con formatos corporativos.', output: 'Sistema de reportes funcional' },
    ],
  },
  {
    number: 5,
    title: 'Testing y deploy',
    desc: 'Pruebas integrales, optimización de base de datos y puesta en producción con capacitación.',
    duration: '3-5 días',
    color: '#F59E0B',
    steps: [
      { icon: CheckSquare, title: 'Testing integral', desc: 'Pruebas funcionales de todos los módulos, flujos críticos y casos borde.', output: 'Reporte de testing' },
      { icon: Database, title: 'Optimización SQL', desc: 'Revisión de queries lentas, índices y performance general de la base de datos.', output: 'BD optimizada' },
      { icon: Rocket, title: 'Deploy y capacitación', desc: 'Despliegue en servidor del cliente y sesión de capacitación al equipo usuario.', output: 'Sistema en producción' },
    ],
  },
]

const API_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Análisis de requerimientos',
    desc: 'Definimos exactamente qué hace la API y cómo se integrará con los sistemas existentes.',
    duration: '1-2 días',
    color: '#06B6D4',
    steps: [
      { icon: Users, title: 'Brief técnico', desc: 'Reunión para entender el contexto, los clientes de la API y los casos de uso principales.', output: 'Brief técnico documentado' },
      { icon: Server, title: 'Diseño de contratos', desc: 'Definición de endpoints, formatos de request/response y convenciones REST.', output: 'API contract document' },
      { icon: Database, title: 'Modelado de datos', desc: 'Diseño del esquema de base de datos y relaciones entre entidades.', output: 'Diagrama entidad-relación' },
    ],
  },
  {
    number: 2,
    title: 'Arquitectura backend',
    desc: 'Diseño técnico de la arquitectura en capas con seguridad desde el primer momento.',
    duration: '1-2 días',
    color: '#A855F7',
    steps: [
      { icon: GitBranch, title: 'Diseño de capas', desc: 'Arquitectura: DTOs → Interfaces → Repositories → Services → Controllers.', output: 'Diagrama de arquitectura' },
      { icon: Shield, title: 'Plan de seguridad', desc: 'Definición de estrategia JWT, roles, permisos y validaciones de entrada.', output: 'Security plan documentado' },
      { icon: Terminal, title: 'Setup y scaffolding', desc: 'Configuración del proyecto base, CI/CD básico y repositorio estructurado.', output: 'Proyecto base funcional' },
    ],
  },
  {
    number: 3,
    title: 'Desarrollo de la API',
    desc: 'Construcción de la API con todas las capas, autenticación y validaciones robustas.',
    duration: '2-4 semanas',
    color: '#6366F1',
    steps: [
      { icon: Database, title: 'Repositories y datos', desc: 'Implementación de acceso a datos con Dapper o EF Core según el caso.', output: 'Capa de datos funcional' },
      { icon: Code2, title: 'Services y lógica', desc: 'Business logic con validaciones, manejo de errores y transacciones.', output: 'Lógica de negocio implementada' },
      { icon: Shield, title: 'Controllers + JWT', desc: 'Endpoints REST seguros con autenticación JWT, roles y validación de modelos.', output: 'API segura y funcional' },
    ],
  },
  {
    number: 4,
    title: 'Documentación y testing',
    desc: 'API documentada con Swagger, testeada y lista para integrarse con cualquier cliente.',
    duration: '2-3 días',
    color: '#F59E0B',
    steps: [
      { icon: FileText, title: 'Swagger / OpenAPI', desc: 'Documentación interactiva completa con ejemplos de request y response.', output: 'Swagger UI publicado' },
      { icon: CheckSquare, title: 'Unit + integration tests', desc: 'Tests para servicios críticos y pruebas de integración de endpoints.', output: 'Suite de tests funcional' },
      { icon: Globe, title: 'Integración con Azure', desc: 'Despliegue en Azure App Service o configuración para servidor del cliente.', output: 'API desplegada en cloud' },
    ],
  },
  {
    number: 5,
    title: 'Entrega',
    desc: 'Handoff completo con documentación, colección Postman y soporte incluido.',
    duration: '1 día',
    color: '#34D399',
    steps: [
      { icon: Package, title: 'Colección Postman', desc: 'Colección completa de endpoints para que el equipo cliente pueda integrar fácilmente.', output: 'Colección Postman exportada' },
      { icon: FolderGit2, title: 'Handoff de código', desc: 'Repositorio limpio con README, guía de despliegue y variables de entorno documentadas.', output: 'Repositorio documentado' },
      { icon: Headphones, title: 'Soporte', desc: '30 días de soporte para preguntas técnicas e incidencias post-entrega.', output: 'Canal de soporte activo' },
    ],
  },
]

const ECOMMERCE_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Brief y planificación',
    desc: 'Definimos la tienda ideal para el negocio antes de tocar el servidor.',
    duration: '1-2 días',
    color: '#06B6D4',
    steps: [
      { icon: Users, title: 'Relevamiento del negocio', desc: 'Reunión para entender los productos, el cliente ideal y las necesidades específicas de la tienda.', output: 'Brief de tienda documentado' },
      { icon: ShoppingCart, title: 'Arquitectura de tienda', desc: 'Definición de categorías, estructura de navegación y flujo de compra completo.', output: 'Mapa de sitio y flujo' },
      { icon: Puzzle, title: 'Selección de plugins', desc: 'Elección de plugins de pago, envíos, SEO y optimización según el presupuesto.', output: 'Lista de plugins confirmada' },
    ],
  },
  {
    number: 2,
    title: 'Setup WordPress y WooCommerce',
    desc: 'Instalación y configuración base del servidor, WordPress y WooCommerce.',
    duration: '1-2 días',
    color: '#A855F7',
    steps: [
      { icon: Server, title: 'Instalación y configuración', desc: 'Setup de servidor, WordPress optimizado, WooCommerce y plugins esenciales.', output: 'Tienda base funcionando' },
      { icon: Palette, title: 'Tema base', desc: 'Instalación o creación del tema con estructura responsive y colores de marca.', output: 'Tema visual configurado' },
      { icon: Database, title: 'Estructura de categorías', desc: 'Configuración de categorías, atributos de productos y variaciones.', output: 'Catálogo estructurado' },
    ],
  },
  {
    number: 3,
    title: 'Personalización PHP',
    desc: 'Funciones PHP custom para adaptar WooCommerce exactamente al negocio.',
    duration: '1-2 semanas',
    color: '#6366F1',
    steps: [
      { icon: Code2, title: 'Tema custom', desc: 'Personalización del diseño con HTML, CSS y PHP en functions.php y templates.', output: 'Diseño personalizado listo' },
      { icon: Puzzle, title: 'Funciones PHP', desc: 'Hooks, filtros y funciones custom para adaptar el comportamiento de WooCommerce.', output: 'Lógica custom implementada' },
      { icon: CreditCard, title: 'Pasarela de pago', desc: 'Integración y configuración de la pasarela de pago (Culqi, PayPal, Stripe u otra).', output: 'Pagos funcionando en modo test' },
    ],
  },
  {
    number: 4,
    title: 'Productos, pagos y notificaciones',
    desc: 'Carga de productos, activación de pagos y configuración de notificaciones automáticas.',
    duration: '3-5 días',
    color: '#F59E0B',
    steps: [
      { icon: ShoppingCart, title: 'Carga de productos', desc: 'Ingreso o importación de productos con imágenes, precios, variaciones y stock.', output: 'Catálogo cargado y listo' },
      { icon: CreditCard, title: 'Activación de pagos', desc: 'Configuración final de pagos en producción con pruebas de transacciones reales.', output: 'Pasarela en producción' },
      { icon: MessageCircle, title: 'Notificaciones', desc: 'Emails automáticos de confirmación, envío, cancelación y recuperación de carrito.', output: 'Emails automáticos activos' },
    ],
  },
  {
    number: 5,
    title: 'SEO, velocidad y lanzamiento',
    desc: 'Optimización final para posicionarse en Google y un lanzamiento sin sorpresas.',
    duration: '2-3 días',
    color: '#34D399',
    steps: [
      { icon: Search, title: 'SEO técnico', desc: 'Yoast SEO configurado, meta tags, schema markup y sitemap XML.', output: 'SEO on-page completado' },
      { icon: Rocket, title: 'Optimización de velocidad', desc: 'Cache, compresión de imágenes, CDN y Core Web Vitals optimizados.', output: 'Lighthouse 80+ garantizado' },
      { icon: Globe, title: 'Go-live', desc: 'Lanzamiento oficial, verificación en Google Search Console y monitoreo inicial.', output: 'Tienda en producción' },
    ],
  },
]

const LANDING_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Descubrimiento',
    desc: 'Entendemos el negocio, el cliente ideal y el objetivo principal de la landing.',
    duration: '1 día',
    color: '#06B6D4',
    steps: [
      { icon: Users, title: 'Reunión de brief', desc: 'Sesión para entender el negocio, propuesta de valor y el CTA principal de la página.', output: 'Brief de conversión documentado' },
      { icon: Palette, title: 'Referencias visuales', desc: 'Análisis de competidores y definición del estilo visual que inspire confianza.', output: 'Moodboard aprobado' },
      { icon: ListChecks, title: 'Estructura de la landing', desc: 'Definición del wireframe: hero, beneficios, social proof, CTA y secciones clave.', output: 'Wireframe aprobado' },
    ],
  },
  {
    number: 2,
    title: 'Diseño y planificación',
    desc: 'Definimos el stack, las animaciones y la estructura técnica antes de codear.',
    duration: '1 día',
    color: '#A855F7',
    steps: [
      { icon: Layout, title: 'Sistema de diseño', desc: 'Colores, tipografía, espaciado y componentes base de la landing page.', output: 'Design tokens definidos' },
      { icon: Code2, title: 'Stack técnico', desc: 'React + TypeScript + Tailwind, con Framer Motion para animaciones premium.', output: 'Stack confirmado' },
      { icon: Clock, title: 'Cronograma', desc: 'Timeline detallado con milestones y fecha de entrega comprometida.', output: 'Fecha de entrega confirmada' },
    ],
  },
  {
    number: 3,
    title: 'Desarrollo',
    desc: 'Construcción de la landing con animaciones, optimización y formularios funcionales.',
    duration: '3-7 días',
    color: '#6366F1',
    steps: [
      { icon: Terminal, title: 'Estructura y base', desc: 'Setup del proyecto con Vite, Tailwind configurado y estructura de componentes.', output: 'Base lista para desarrollo' },
      { icon: Puzzle, title: 'Secciones principales', desc: 'Hero, features, testimonios, pricing y todas las secciones del wireframe.', output: 'Landing completa sin pulir' },
      { icon: Plug, title: 'Formularios y CTA', desc: 'Formulario de contacto funcional con EmailJS o webhook y validaciones.', output: 'Formularios operativos' },
    ],
  },
  {
    number: 4,
    title: 'Pulido y optimización',
    desc: 'Refinamiento visual, optimización de performance y testing en todos los dispositivos.',
    duration: '2-3 días',
    color: '#F59E0B',
    steps: [
      { icon: Palette, title: 'Refinamiento visual', desc: 'Ajuste de animaciones, microinteracciones y detalles de diseño premium.', output: 'Landing con UX premium' },
      { icon: Search, title: 'SEO on-page', desc: 'Meta tags, Open Graph, schema markup, alt texts y optimización técnica.', output: 'SEO completado' },
      { icon: CheckSquare, title: 'Testing multi-dispositivo', desc: 'Verificación en móvil, tablet y desktop en Chrome, Firefox y Safari.', output: 'Lighthouse 90+ en todos' },
    ],
  },
  {
    number: 5,
    title: 'Lanzamiento',
    desc: 'Deploy a producción con tu dominio real y soporte incluido.',
    duration: '1 día',
    color: '#34D399',
    steps: [
      { icon: Rocket, title: 'Deploy a producción', desc: 'Despliegue en Vercel o Netlify con dominio personalizado y HTTPS.', output: 'Landing en vivo' },
      { icon: FolderGit2, title: 'Entrega de código', desc: 'Repositorio Git con README, variables de entorno documentadas y guía de edición.', output: 'Código entregado' },
      { icon: Headphones, title: 'Soporte', desc: '30 días para ajustes de texto, imágenes y corrección de bugs sin costo.', output: 'Soporte activo 30 días' },
    ],
  },
]

const CONSULTING_PHASES: TimelinePhase[] = [
  {
    number: 1,
    title: 'Acceso al código',
    desc: 'Obtenemos acceso seguro al repositorio y hacemos un primer mapeo del proyecto.',
    duration: '1 día',
    color: '#06B6D4',
    steps: [
      { icon: FolderGit2, title: 'Acceso al repositorio', desc: 'Configuración de acceso de lectura al repo y entorno de desarrollo local.', output: 'Entorno configurado' },
      { icon: FileSearch, title: 'Primera exploración', desc: 'Lectura del README, estructura de carpetas, dependencias y configuración general.', output: 'Mapa mental del proyecto' },
      { icon: ListChecks, title: 'Plan de análisis', desc: 'Definición de las áreas a revisar con mayor profundidad según las necesidades.', output: 'Plan de revisión aprobado' },
    ],
  },
  {
    number: 2,
    title: 'Análisis profundo',
    desc: 'Revisión exhaustiva del código, arquitectura y potenciales problemas de seguridad.',
    duration: '2-3 días',
    color: '#A855F7',
    steps: [
      { icon: FileSearch, title: 'Code review completo', desc: 'Análisis de patrones, code smells, duplicación, complejidad y mantenibilidad.', output: 'Lista de observaciones' },
      { icon: GitBranch, title: 'Análisis de arquitectura', desc: 'Evaluación de la estructura de capas, separación de responsabilidades y escalabilidad.', output: 'Evaluación arquitectural' },
      { icon: Shield, title: 'Seguridad y vulnerabilidades', desc: 'Revisión de inputs sin sanitizar, secretos expuestos y dependencias vulnerables.', output: 'Reporte de seguridad' },
    ],
  },
  {
    number: 3,
    title: 'Informe y propuestas',
    desc: 'Documentamos los hallazgos con propuestas concretas y un roadmap priorizado.',
    duration: '1-2 días',
    color: '#6366F1',
    steps: [
      { icon: FileText, title: 'Documento de hallazgos', desc: 'Informe detallado con cada problema encontrado, severidad y evidencia de código.', output: 'Informe PDF entregado' },
      { icon: BarChart2, title: 'Propuestas de mejora', desc: 'Recomendaciones priorizadas por impacto y esfuerzo para cada hallazgo.', output: 'Backlog de mejoras' },
      { icon: BookOpen, title: 'Roadmap de cambios', desc: 'Plan de acción con orden sugerido para aplicar mejoras sin romper producción.', output: 'Roadmap documentado' },
    ],
  },
  {
    number: 4,
    title: 'Sesión de revisión',
    desc: 'Presentación del informe, sesión de preguntas y plan de acción conjunto.',
    duration: '1 día',
    color: '#34D399',
    steps: [
      { icon: Monitor, title: 'Presentación del informe', desc: 'Sesión de 60-90 minutos para revisar todos los hallazgos con el equipo técnico.', output: 'Revisión completada' },
      { icon: MessageCircle, title: 'Q&A técnico', desc: 'Espacio para preguntas, aclaraciones y discusión de las propuestas de mejora.', output: 'Dudas resueltas' },
      { icon: ListChecks, title: 'Plan de acción', desc: 'Definición conjunta del próximo paso concreto a ejecutar en el proyecto.', output: 'Siguiente paso acordado' },
    ],
  },
]

const TIMELINE_DATA: Record<string, TimelinePhase[]> = {
  'web-apps': WEB_PHASES,
  'fullstack-systems': FULLSTACK_PHASES,
  'api-backend': API_PHASES,
  'ecommerce': ECOMMERCE_PHASES,
  'landing-pages': LANDING_PHASES,
  'consulting': CONSULTING_PHASES,
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ServiceTimelineProps {
  serviceId: string
}

export function ServiceTimeline({ serviceId }: ServiceTimelineProps) {
  const phases = TIMELINE_DATA[serviceId] ?? WEB_PHASES
  const [activePhase, setActivePhase] = useState<number>(0)

  const toggle = (idx: number) =>
    setActivePhase(prev => (prev === idx ? -1 : idx))

  return (
    <div className="flex flex-col gap-0">
      {phases.map((phase, idx) => (
        <div key={phase.number}>
          <RevealOnScroll variant="fadeInUp" delay={idx * 0.07}>
            <div
              className="rounded-2xl border overflow-hidden transition-all duration-300"
              style={{
                borderColor: activePhase === idx ? `${phase.color}40` : 'rgba(255,255,255,0.07)',
                borderLeft: `3px solid ${activePhase === idx ? phase.color : 'rgba(255,255,255,0.1)'}`,
                background: activePhase === idx ? `${phase.color}06` : 'rgba(19,19,31,0.5)',
              }}
            >
              {/* Phase header */}
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Phase number circle */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: activePhase === idx ? phase.color : `${phase.color}40` }}
                >
                  {phase.number}
                </div>

                {/* Phase info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                      {phase.title}
                    </h4>
                    <span
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{ background: `${phase.color}15`, color: phase.color }}
                    >
                      <Clock size={10} />
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                    {phase.desc}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-300"
                  style={{ transform: activePhase === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Steps (expandable) */}
              <AnimatePresence initial={false}>
                {activePhase === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1">
                      <div className="h-px mb-5" style={{ background: `${phase.color}20` }} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {phase.steps.map((step) => (
                          <div
                            key={step.title}
                            className="rounded-xl p-4 border"
                            style={{
                              background: 'rgba(255,255,255,0.02)',
                              borderColor: 'rgba(255,255,255,0.07)',
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: `${phase.color}15` }}
                              >
                                <step.icon size={14} style={{ color: phase.color }} />
                              </div>
                              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                                {step.title}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-2.5">
                              {step.desc}
                            </p>
                            <div
                              className="flex items-center gap-1.5 text-[10px] font-medium px-2 py-1 rounded-lg w-fit"
                              style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399' }}
                            >
                              <span>↗</span>
                              {step.output}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>

          {/* Connector between phases */}
          {idx < phases.length - 1 && (
            <div className="flex justify-start pl-[34px] py-1">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-4 border-l border-dashed border-[var(--color-border)]" />
                <div className="text-[var(--color-text-muted)] opacity-40">▼</div>
                <div className="w-px h-1 border-l border-dashed border-[var(--color-border)]" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
