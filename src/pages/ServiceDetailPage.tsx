import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Mail, Clock, MessageSquare, RefreshCw, Shield,
  Monitor, Layers, Server, ShoppingCart, Zap, MessageSquare as MsgSq,
  CheckCircle2, type LucideIcon,
} from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { services } from '@/data/services.data'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { Button } from '@/components/common/Button/Button'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { ServiceTimeline } from '@/modules/services/ServiceTimeline'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { getTechIcon } from '@/utils/techIcons'

// ─── Static data maps ─────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Layers, Server, ShoppingCart, Zap, MessageSquare: MsgSq,
}

const SERVICE_GRADIENTS: Record<string, string> = {
  'web-apps': 'linear-gradient(135deg, rgba(99,102,241,0.45) 0%, rgba(168,85,247,0.45) 100%)',
  'fullstack-systems': 'linear-gradient(135deg, rgba(6,182,212,0.45) 0%, rgba(59,130,246,0.45) 100%)',
  'api-backend': 'linear-gradient(135deg, rgba(168,85,247,0.45) 0%, rgba(99,102,241,0.45) 100%)',
  'ecommerce': 'linear-gradient(135deg, rgba(245,158,11,0.45) 0%, rgba(249,115,22,0.45) 100%)',
  'landing-pages': 'linear-gradient(135deg, rgba(52,211,153,0.35) 0%, rgba(6,182,212,0.35) 100%)',
  'consulting': 'linear-gradient(135deg, rgba(251,146,60,0.35) 0%, rgba(245,158,11,0.35) 100%)',
}

const FEATURE_SUBTEXTS: Record<string, string[]> = {
  'web-apps': [
    'Código escalable, tipado y mantenible a largo plazo',
    'Se ve perfecto en celular, tablet y desktop',
    'Conexión con cualquier backend o servicio externo',
    'React Hook Form + Zod para máxima confiabilidad',
    'Core Web Vitals optimizados para mejor SEO',
  ],
  'fullstack-systems': [
    'Ventas, inventario, compras, reportes y más',
    '.NET 8 o Java con JWT y manejo de roles',
    'SQL Server con queries eficientes y backups',
    'ClosedXML y QuestPDF con formatos corporativos',
    'Dashboards con métricas y visualizaciones',
  ],
  'api-backend': [
    'Endpoints RESTful bien documentados con Swagger',
    'Tokens, refresh tokens, roles y permisos',
    'SQL Server, PostgreSQL y MongoDB',
    'Excel y PDF generados bajo demanda',
    'Despliegue y servicios cloud de Microsoft',
  ],
  'ecommerce': [
    'Plataforma probada con millones de tiendas activas',
    'Integración con Culqi, PayPal, Stripe u otra',
    'Panel completo para administrar tu tienda',
    'Optimización técnica desde el primer día',
    'Experiencia de compra fluida en cualquier dispositivo',
  ],
  'landing-pages': [
    'Estructura pensada para convertir visitas en clientes',
    'Experiencia premium que genera confianza inmediata',
    'Lighthouse 90+ garantizado para mejor posicionamiento',
    'Meta tags, estructura semántica, Open Graph y sitemap',
    'EmailJS o backend propio según la necesidad',
  ],
  'consulting': [
    'Detección de bugs, code smells y mejoras de rendimiento',
    'Diagramas y recomendaciones documentadas',
    'Plan de migración progresivo sin romper producción',
    'Sesiones 1:1 en React, TypeScript y .NET',
    'README, ADRs y guías de contribución',
  ],
}

const SERVICE_INFO: Record<string, { duration: string; revisions: string }> = {
  'web-apps': { duration: '2 - 6 semanas', revisions: '3 rondas de revisión' },
  'fullstack-systems': { duration: '4 - 12 semanas', revisions: 'Revisiones continuas' },
  'api-backend': { duration: '2 - 5 semanas', revisions: '2 rondas de revisión' },
  'ecommerce': { duration: '2 - 4 semanas', revisions: '3 rondas de revisión' },
  'landing-pages': { duration: '1 - 2 semanas', revisions: '2 rondas de revisión' },
  'consulting': { duration: '1 semana por revisión', revisions: 'Informe detallado incluido' },
}

const STACK_CATEGORIES: Record<string, Record<string, string[]>> = {
  'web-apps': {
    Frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    Framework: ['Next.js'],
  },
  'fullstack-systems': {
    Frontend: ['MAUI Blazor'],
    Backend: ['.NET 8', 'ASP.NET Core', 'C#'],
    'Base de datos': ['SQL Server'],
    Cloud: ['Azure'],
  },
  'api-backend': {
    Backend: ['.NET 8', 'Java'],
    'Bases de datos': ['SQL Server'],
    Autenticación: ['JWT'],
    'Otras opciones': ['Node.js'],
  },
  'ecommerce': {
    Plataforma: ['WordPress', 'WooCommerce'],
    Backend: ['PHP'],
    'Base de datos': ['MySQL'],
    Frontend: ['JavaScript'],
  },
  'landing-pages': {
    Frontend: ['React.js', 'TypeScript', 'Tailwind CSS'],
    Framework: ['Next.js'],
  },
  'consulting': {
    Frontend: ['React.js', 'TypeScript'],
    Backend: ['.NET'],
    Prácticas: ['Clean Code', 'Git'],
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-[100] transition-all duration-100"
      style={{
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
      }}
    />
  )
}

function ReturnNavbar({ onBack }: { onBack: () => void }) {
  return (
    <header
      className="fixed top-0.5 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8"
      style={{
        height: 64,
        background: 'rgba(var(--color-bg-secondary-rgb, 19,19,31), 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Volver al portfolio</span>
        <span className="sm:hidden">Volver</span>
      </button>

      <a href="/" className="flex items-center gap-2 font-display font-bold">
        <GradientText className="text-xl font-bold">GB</GradientText>
        <span className="text-[var(--color-text-primary)] font-semibold hidden sm:block">
          Barrionuevo
        </span>
      </a>

      <Button
        variant="primary"
        size="sm"
        href="#contact-cta"
        onClick={() => document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Contrátame
      </Button>
    </header>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ServiceDetailPage() {
  useScrollToTop()
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()

  const service = services.find((s) => s.id === serviceId)

  if (!service) {
    navigate('/', { replace: true })
    return null
  }

  const Icon = ICON_MAP[service.icon] ?? Monitor
  const gradient = SERVICE_GRADIENTS[service.id] ?? SERVICE_GRADIENTS['web-apps']
  const featureSubtexts = FEATURE_SUBTEXTS[service.id] ?? []
  const serviceInfo = SERVICE_INFO[service.id] ?? { duration: 'A convenir', revisions: '2 rondas' }
  const stackCategories = STACK_CATEGORIES[service.id] ?? {}
  const waMessage = encodeURIComponent(
    `Hola Gian, me interesa el servicio de "${service.title}". ¿Podemos hablar?`
  )
  const WA_URL = `https://wa.me/51952761415?text=${waMessage}`

  return (
    <>
      <Helmet>
        <title>{service.title} — GianCarlo Barrionuevo</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <ScrollProgressBar />
      <ReturnNavbar onBack={() => navigate(-1)} />

      <main
        className="min-h-screen"
        style={{ background: 'var(--color-bg-primary)', paddingTop: 64 }}
      >
        {/* ── HERO ── */}
        <section
          className="relative flex items-center justify-center"
          style={{ minHeight: 380, background: gradient }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(10,10,15,0.55)' }} />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 gap-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-5"
            >
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(99,102,241,0.2)',
                  border: '1px solid rgba(99,102,241,0.4)',
                }}
              >
                <Icon size={36} className="text-white" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-white/65 max-w-2xl leading-relaxed">
                {service.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium bg-white/10 text-white/80 border border-white/15"
                  >
                    {getTechIcon(tech, 13)}
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button
                  variant="primary"
                  size="md"
                  href={WA_URL}
                  external
                  icon={React.createElement(SiWhatsapp as any, { size: 18 })}
                  iconPosition="left"
                >
                  Iniciar proyecto
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="/#projects"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Ver mis proyectos
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <div
          className="mx-auto px-4 sm:px-6"
          style={{ maxWidth: 1100, paddingTop: 80, paddingBottom: 80 }}
        >
          {/* ── SECTION 1: What's included ── */}
          <section className="mb-20">
            <RevealOnScroll variant="fadeInUp">
              <SectionTitle
                label="Alcance"
                title="¿Qué incluye este servicio?"
                align="left"
              />
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-8">
              {/* Features list */}
              <RevealOnScroll variant="fadeInUp" delay={0.08}>
                <GlassCard className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-5">
                    Lo que obtienes:
                  </p>
                  <ul className="flex flex-col gap-5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2
                          size={20}
                          className="text-primary flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">{feature}</p>
                          {featureSubtexts[i] && (
                            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                              {featureSubtexts[i]}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </RevealOnScroll>

              {/* Service info sidebar */}
              <RevealOnScroll variant="fadeInUp" delay={0.14}>
                <GlassCard className="p-6 flex flex-col gap-5 h-fit">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Información del servicio
                  </p>

                  <InfoRow icon={Clock} label="Tiempo estimado" value={serviceInfo.duration} />
                  <InfoRow icon={MessageSquare} label="Comunicación" value="WhatsApp + reuniones por Meet" />
                  <InfoRow icon={RefreshCw} label="Revisiones incluidas" value={serviceInfo.revisions} />
                  <InfoRow icon={Shield} label="Garantía" value="30 días de soporte post-entrega" />

                  <div className="h-px bg-[var(--color-border)]" />

                  <Button
                    variant="primary"
                    size="md"
                    href={WA_URL}
                    external
                    className="w-full justify-center"
                    icon={React.createElement(SiWhatsapp as any, { size: 18 })}
                    iconPosition="left"
                  >
                    Solicitar este servicio
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    href="/#contact"
                    className="w-full justify-center"
                  >
                    Enviar mensaje
                  </Button>
                </GlassCard>
              </RevealOnScroll>
            </div>
          </section>

          {/* ── SECTION 2: Timeline ── */}
          <section className="mb-20">
            <RevealOnScroll variant="fadeInUp">
              <SectionTitle
                label="Proceso"
                title="¿Cómo trabajamos juntos?"
                subtitle="Un proceso claro, transparente y enfocado en resultados"
                align="left"
              />
            </RevealOnScroll>
            <div className="mt-8">
              <ServiceTimeline serviceId={service.id} />
            </div>
          </section>

          {/* ── SECTION 3: Tech stack ── */}
          <section className="mb-20">
            <RevealOnScroll variant="fadeInUp">
              <SectionTitle
                label="Stack"
                title="Tecnologías que utilizaré en tu proyecto"
                align="left"
              />
            </RevealOnScroll>
            <div className="mt-8 flex flex-col gap-4">
              {Object.entries(stackCategories).map(([category, techs], i) => (
                <RevealOnScroll key={category} variant="fadeInUp" delay={i * 0.07}>
                  <GlassCard className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)]"
                        >
                          {getTechIcon(tech, 17)}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </RevealOnScroll>
              ))}

              <RevealOnScroll variant="fadeInUp" delay={0.2}>
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.2)' }}
                >
                  <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                    ¿Necesitas una tecnología específica?
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Si tu proyecto requiere un stack diferente, cuéntame y lo evaluamos juntos.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    href={WA_URL}
                    external
                    icon={React.createElement(SiWhatsapp as any, { size: 15 })}
                    iconPosition="left"
                  >
                    Consultar por WhatsApp
                  </Button>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* ── SECTION 4: Final CTA ── */}
          <section id="contact-cta">
            <RevealOnScroll variant="fadeInUp">
              <div className="max-w-2xl mx-auto">
                <div
                  className="rounded-2xl border p-10 sm:p-14 text-center"
                  style={{ background: 'rgba(99,102,241,0.05)', borderColor: 'rgba(99,102,241,0.2)' }}
                >
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">
                    ¿Listo para empezar?
                  </h2>
                  <p className="text-[var(--color-text-secondary)] mt-3 max-w-md mx-auto leading-relaxed">
                    Cuéntame tu proyecto y te respondo en menos de 24 horas con una propuesta.
                  </p>

                  {/* Guarantees */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                    {['Sin compromisos', 'Primera consulta gratis', 'Respuesta en 24h'].map((g) => (
                      <span
                        key={g}
                        className="flex items-center gap-1.5 text-sm text-emerald-400 font-medium"
                      >
                        <CheckCircle2 size={14} />
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      href={WA_URL}
                      external
                      icon={React.createElement(SiWhatsapp as any, { size: 20 })}
                      iconPosition="left"
                    >
                      Escribir por WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      href="/#contact"
                      icon={<Mail size={18} />}
                      iconPosition="left"
                    >
                      Enviar mensaje
                    </Button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </section>
        </div>
      </main>
    </>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5">
        <Icon size={15} className="text-primary" />
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
      </div>
    </div>
  )
}
