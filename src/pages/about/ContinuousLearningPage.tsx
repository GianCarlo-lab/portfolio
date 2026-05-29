import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronDown, Plus } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { getTechIcon } from '@/utils/techIcons'

// ── Data ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '2023',
    org: 'Cibertec',
    what: 'Los fundamentos',
    borderColor: '#06B6D4',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    knew: 'HTML básico, CSS para dar estilos, algo de JavaScript para hacer cosas en la página.',
    built: 'Mis primeros proyectos estáticos: landing pages, formularios con validación básica, páginas con animaciones CSS.',
    changed: 'JavaScript podía hacer cualquier cosa en el navegador. Git me cambió la vida desde el primer commit — entendí que el código tiene historia.',
    achievement: 'Primer repositorio público en GitHub',
  },
  {
    year: '2024',
    org: 'Gotech',
    what: 'WordPress y el mundo real',
    borderColor: '#8B5CF6',
    techs: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
    knew: 'WordPress básico, PHP principiante, algo de MySQL.',
    built: 'Primer e-commerce en producción: catálogo de productos, carrito de compras, pasarela de pago, panel de administración personalizado.',
    changed: 'El cliente no quiere tecnología, quiere soluciones. PHP me enseñó a pensar en el servidor, no solo en el navegador. Entendí la diferencia entre frontend y backend.',
    achievement: 'Primer e-commerce en producción',
  },
  {
    year: '2025',
    org: 'Grupo Centro Tecnológico',
    what: 'El salto Full Stack',
    borderColor: '#6366F1',
    techs: ['React', 'TypeScript', 'Java', 'Quarkus', 'JWT'],
    knew: 'React con hooks, TypeScript básico, Java desde la universidad.',
    built: 'Sistema de ventas con módulo de clientes, reportes Excel, autenticación JWT, diseño de componentes desde Figma.',
    changed: 'TypeScript me hizo mejor programador en todos los lenguajes que uso. Aprendí que escribir código que funciona y código que otros pueden mantener son dos habilidades distintas.',
    achievement: 'Primera API con JWT en producción',
  },
  {
    year: '2026',
    org: 'RADAR ERP',
    what: 'Sistemas empresariales',
    borderColor: '#10B981',
    badge: 'Hoy',
    techs: ['Blazor', '.NET 8', 'SQL Server', 'Azure'],
    knew: 'Fullstack React + .NET, arquitectura en capas, Dapper, transacciones SQL.',
    built: 'Módulo completo de Abastecimiento: schema SQL, API REST, Blazor UI, 18 plantillas Excel, reportes PDF.',
    changed: 'Aprendí Blazor en 2 semanas leyendo documentación oficial y construyendo features reales. Sin curso, sin mentor. Solo documentación + errores + soluciones.',
    achievement: 'Módulo de Abastecimiento completo en producción',
  },
]

const ROADMAP_VISIBLE = [
  { tech: 'Docker', pct: 15, label: 'En exploración' },
  { tech: 'Azure', pct: 5, label: 'Próximamente' },
  { tech: 'React Native', pct: 10, label: 'En exploración' },
]

const ROADMAP_HIDDEN = [
  { tech: 'GraphQL', pct: 5, label: 'En exploración' },
  { tech: 'Kubernetes', pct: 0, label: 'Próximamente' },
  { tech: 'Next.js', pct: 10, label: 'En exploración' },
]

// ── Components ───────────────────────────────────────────────────────────────

function TimelineNode({ node, index }: { node: typeof TIMELINE[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="relative pl-6" style={{ borderLeft: `2px solid ${node.borderColor}30` }}>
        {/* Dot */}
        <div
          className="absolute left-0 top-4 w-3 h-3 rounded-full -translate-x-[7px]"
          style={{ background: node.borderColor, boxShadow: `0 0 8px ${node.borderColor}60` }}
        />

        <div className="ml-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold" style={{ color: node.borderColor }}>{node.year}</span>
                {node.badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${node.borderColor}20`, color: node.borderColor }}>
                    {node.badge}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{node.org}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{node.what}</p>
            </div>
          </div>

          {/* Tech icons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {node.techs.map(t => (
              <span key={t} className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                {getTechIcon(t, 12)}
                {t}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors mb-3"
            style={{ color: node.borderColor }}
          >
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.div>
            {open ? 'Ocultar detalle' : 'Ver detalle'}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                <GlassCard className="p-4 mb-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">¿Qué sabía?</p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{node.knew}</p>
                    </div>
                    <div className="h-px" style={{ background: 'var(--color-border)' }} />
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">¿Qué construí?</p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{node.built}</p>
                    </div>
                    <div className="h-px" style={{ background: 'var(--color-border)' }} />
                    <div>
                      <p className="text-xs font-semibold mb-1" style={{ color: node.borderColor }}>¿Qué me cambió la forma de pensar?</p>
                      <p className="text-sm leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>"{node.changed}"</p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: `${node.borderColor}18`, color: node.borderColor, border: `1px solid ${node.borderColor}30` }}>
                        🏆 {node.achievement}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function RoadmapCard({ tech, pct, label }: { tech: string; pct: number; label: string }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getTechIcon(tech, 16)}
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{tech}</span>
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }} />
      </div>
      <p className="text-xs text-[var(--color-text-muted)] italic">{label}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function ContinuousLearningPage() {
  useScrollToTop()
  const [showMore, setShowMore] = useState(false)

  return (
    <AboutPageLayout
      title="Aprendizaje Continuo"
      description="Sin mentor, sin cursos obligatorios. Aprendo leyendo documentación oficial, cometiendo errores y construyendo cosas reales."
      valueNumber="03"
      accentColor="#10B981"
      prevPath="/sobre-mi/atencion-al-detalle"
      prevLabel="Atención al detalle"
      nextPath="/sobre-mi/vision-fullstack"
      nextLabel="Visión Fullstack"
    >
      <div className="flex flex-col gap-12 w-full">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #10B981' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "Empecé con WordPress. Después Java. Después me metí a React sin saber por qué, solo sabía que era lo que se usaba.
            En RADAR aprendí Blazor en 2 semanas — sin curso, sin mentor. Solo documentación oficial, errores de compilador y features reales entregadas.
            Eso es lo que significa aprender en serio: no estudiar para aprobar un examen, sino construir cosas que no funcionan hasta que funcionan."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#10B981' }}>— Gian, 2023–2026</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#10B981' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['Autodidacta', 'Learn by doing', 'Documentación oficial primero'].map(p => (
            <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.12)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.25)' }}>
              {p}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-8">Mi evolución real</h3>
          <div className="flex flex-col gap-8">
            {TIMELINE.map((node, i) => (
              <TimelineNode key={node.year} node={node} index={i} />
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Lo que viene</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Tecnologías en mi radar de aprendizaje para 2026–2027.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ROADMAP_VISIBLE.map(r => <RoadmapCard key={r.tech} {...r} />)}
          </div>

          <AnimatePresence>
            {showMore && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {ROADMAP_HIDDEN.map(r => <RoadmapCard key={r.tech} {...r} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-5 flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#10B981' }}
          >
            <Plus size={14} />
            {showMore ? 'Ocultar tecnologías' : 'Ver más tecnologías en el roadmap'}
          </button>
        </div>

      </div>
    </AboutPageLayout>
  )
}
