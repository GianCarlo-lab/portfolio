import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Trophy } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { getTechIcon } from '@/utils/techIcons'

// ─── Timeline data ────────────────────────────────────────────────────────────

interface TimelineItem {
  year: string
  company: string
  color: string
  badge?: string
  icons: string[]
  achievement: string
  projects: string[]
  challenge: string
  change: string
}

const TIMELINE: TimelineItem[] = [
  {
    year: '2026 — Presente',
    company: 'RADAR',
    color: '#6366F1',
    badge: 'Actual',
    icons: ['.NET 8', 'Blazor', 'SQL Server', 'Azure', 'ClosedXML', 'QuestPDF'],
    achievement: 'Sistema ERP con 10+ módulos en producción',
    projects: ['Módulo de Abastecimiento ERP', 'Módulo de Inventario', 'Reportes PDF/Excel corporativos'],
    challenge:
      'Diseñar arquitectura de módulos complejos con alta carga transaccional y reportes en tiempo real.',
    change:
      'Empecé a aplicar Clean Architecture y Domain-Driven Design de forma práctica, no solo teórica.',
  },
  {
    year: '2025',
    company: 'Grupo Centro Tecnológico',
    color: '#06B6D4',
    icons: ['React', 'TypeScript', 'Tailwind CSS', 'Java', 'JWT'],
    achievement: 'Primera experiencia en equipo Scrum real',
    projects: ['Dashboard de Reportes', 'API de Autenticación con JWT', 'UI con React + TypeScript'],
    challenge:
      'Primer trabajo en equipo real con metodología Scrum, pull requests y code reviews diarios.',
    change:
      'Aprendí a comunicarme en PRs, documentar decisiones técnicas y dar feedback constructivo.',
  },
  {
    year: '2024',
    company: 'Gotech (Freelance)',
    color: '#8B5CF6',
    icons: ['WordPress', 'PHP', 'WooCommerce'],
    achievement: 'Primer e-commerce en producción',
    projects: ['E-commerce con WooCommerce', 'Landing pages de alta conversión', 'Integraciones de pago'],
    challenge:
      'Entregar proyectos con plazos reales, clientes no técnicos y presupuestos ajustados.',
    change:
      'Desarrollé criterio para priorizar funcionalidad sobre perfección. El software que funciona es mejor que el perfecto que nunca termina.',
  },
  {
    year: '2023 — Inicio',
    company: 'Cibertec',
    color: '#475569',
    icons: ['HTML5', 'JavaScript', 'CSS3', 'Git'],
    achievement: 'Fundamentos sólidos y primer proyecto personal',
    projects: ['Sistema de votación en Java', 'Portafolio personal (HTML/CSS)', 'CRUD básico con BD'],
    challenge: 'Entender los fundamentos de programación, lógica y arquitectura desde cero.',
    change:
      'Descubrí que me apasiona construir cosas que la gente usa realmente, no solo ejercicios académicos.',
  },
]

// ─── Tech selector data ───────────────────────────────────────────────────────

interface TechData {
  level: number
  time: string
  resources: string[]
  tip: string
  color: string
}

const TECH_DATA: Record<string, TechData> = {
  React: {
    level: 80,
    time: '6 meses para fundamentos, 1 año para fluidez real',
    resources: ['React.dev (docs oficiales)', 'Proyectos reales desde el día 1', 'Frontend Masters'],
    tip: 'Construye un proyecto real desde el día 1. Los tutoriales no reemplazan la práctica.',
    color: '#61DAFB',
  },
  TypeScript: {
    level: 85,
    time: '3 meses para fundamentos, continuo perfeccionamiento',
    resources: ['TypeScript Handbook oficial', 'type-challenges en GitHub', 'Proyectos propios con strict: true'],
    tip: 'Activa strict: true desde el inicio. El dolor al principio te ahorra bugs en producción.',
    color: '#3178C6',
  },
  '.NET': {
    level: 75,
    time: '8 meses para nivel profesional funcional',
    resources: ['Microsoft Learn', 'Nick Chapsas en YouTube', 'Proyectos ERP reales en RADAR'],
    tip: 'Domina C# antes de ASP.NET. Una base sólida de POO acelera todo lo demás.',
    color: '#512BD4',
  },
  Docker: {
    level: 35,
    time: 'En progreso — ~2 meses activos',
    resources: ['Docker Docs oficiales', 'TechWorld with Nana (YouTube)', 'Lab propio con docker-compose'],
    tip: 'Empieza containerizando tu propio proyecto. La teoría sin práctica no sirve.',
    color: '#2496ED',
  },
  AWS: {
    level: 10,
    time: 'Próximamente — planificado para Q4 2026',
    resources: ['AWS Free Tier (laboratorios gratuitos)', 'AWS Skills Builder', 'Arquitecturas de referencia'],
    tip: 'Empieza con S3 + EC2 antes de tocar Lambda o servicios avanzados.',
    color: '#FF9900',
  },
}

const TECH_PILLS = Object.keys(TECH_DATA)

// ─── Roadmap data ─────────────────────────────────────────────────────────────

interface RoadmapItem {
  name: string
  current: number
  why: string
  when: string
  color: string
}

const ROADMAP_A: RoadmapItem[] = [
  {
    name: 'Docker & DevOps',
    current: 35,
    why: 'Todo proyecto moderno necesita containerización para despliegue reproducible y consistente.',
    when: 'Q3 2026',
    color: '#2496ED',
  },
  {
    name: 'AWS Cloud',
    current: 10,
    why: 'El mercado exige conocimiento de cloud. AWS es el estándar en la industria peruana y regional.',
    when: 'Q4 2026',
    color: '#FF9900',
  },
  {
    name: 'React Native',
    current: 5,
    why: 'La demanda de apps móviles es enorme y mi background en React acelera el aprendizaje considerablemente.',
    when: '2027',
    color: '#61DAFB',
  },
]

const ROADMAP_B: RoadmapItem[] = [
  {
    name: 'GraphQL',
    current: 15,
    why: 'Alternativa a REST para APIs complejas con múltiples consumidores y necesidades distintas.',
    when: 'Q4 2026',
    color: '#E10098',
  },
  {
    name: 'Kubernetes',
    current: 5,
    why: 'Orquestación de contenedores para sistemas de alta disponibilidad a escala.',
    when: '2027',
    color: '#326CE5',
  },
  {
    name: 'Next.js avanzado',
    current: 40,
    why: 'SSR/SSG para proyectos que necesitan SEO óptimo y rendimiento de primer nivel.',
    when: 'Q3 2026',
    color: '#ffffff',
  },
]

// ─── Timeline component ───────────────────────────────────────────────────────

function InteractiveTimeline() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-2">
      {TIMELINE.map((item, i) => {
        const isOpen = activeIdx === i
        return (
          <div key={item.year}>
            <button
              onClick={() => setActiveIdx(isOpen ? null : i)}
              className="w-full flex gap-4 pb-0 text-left group"
            >
              {/* Rail */}
              <div className="flex flex-col items-center w-5 flex-shrink-0 mt-1">
                <motion.div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  animate={{ scale: isOpen ? 1.2 : 1, boxShadow: isOpen ? `0 0 12px ${item.color}90` : 'none' }}
                  style={{ background: item.color }}
                />
                {i < TIMELINE.length - 1 && (
                  <div
                    className="w-px mt-1"
                    style={{
                      height: 36,
                      background: `linear-gradient(to bottom, ${item.color}50, ${TIMELINE[i + 1].color}25)`,
                    }}
                  />
                )}
              </div>

              {/* Header row */}
              <div className="flex items-center gap-3 flex-1 min-w-0 py-1">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold" style={{ color: item.color }}>
                      {item.year}
                    </span>
                    {item.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.company}</p>
                </div>
                <ChevronDown
                  size={14}
                  className="text-[var(--color-text-muted)] flex-shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </div>
            </button>

            {/* Expanded detail */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pl-9 pb-4 flex flex-col gap-4">
                    {/* Achievement */}
                    <GlassCard className="flex items-center gap-2.5 px-3 py-2">
                      <Trophy size={13} className="flex-shrink-0" style={{ color: item.color }} />
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {item.achievement}
                      </span>
                    </GlassCard>

                    {/* Tech icons */}
                    <div className="flex flex-wrap gap-2">
                      {item.icons.map((name) => {
                        const icon = getTechIcon(name, 14)
                        return (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]"
                          >
                            {icon}
                            {name}
                          </span>
                        )
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Projects */}
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] mb-2">
                          Proyectos
                        </p>
                        <ul className="flex flex-col gap-1">
                          {item.projects.map((p) => (
                            <li key={p} className="text-xs text-[var(--color-text-secondary)]">
                              · {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Challenge */}
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
                      >
                        <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: item.color }}>
                          Desafío principal
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          {item.challenge}
                        </p>
                      </div>

                      {/* Change */}
                      <div
                        className="p-3 rounded-xl"
                        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
                      >
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 mb-2">
                          Qué cambió
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          {item.change}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      <p className="text-xs italic pl-9 mt-1" style={{ color: 'var(--color-accent)' }}>
        Y esto no para aquí.
      </p>
    </div>
  )
}

// ─── Tech selector ────────────────────────────────────────────────────────────

function TechSelector() {
  const [selected, setSelected] = useState('React')
  const data = TECH_DATA[selected]

  return (
    <div className="flex flex-col gap-5">
      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {TECH_PILLS.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelected(tech)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: selected === tech ? `${TECH_DATA[tech].color}20` : 'rgba(255,255,255,0.04)',
              color: selected === tech ? TECH_DATA[tech].color : 'var(--color-text-muted)',
              border: `1px solid ${selected === tech ? TECH_DATA[tech].color + '40' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {tech}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <GlassCard className="p-5 flex flex-col gap-4">
            {/* Level bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Nivel actual en {selected}
                </p>
                <span className="text-sm font-bold" style={{ color: data.color }}>
                  {data.level}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: data.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${data.level}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Time */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] mb-1.5">
                  Tiempo para aprender
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {data.time}
                </p>
              </div>

              {/* Resources */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] mb-1.5">
                  Recursos que usé
                </p>
                <ul className="flex flex-col gap-1">
                  {data.resources.map((r) => (
                    <li key={r} className="text-xs text-[var(--color-text-secondary)]">
                      · {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tip */}
              <div
                className="p-3 rounded-xl"
                style={{ background: `${data.color}0d`, border: `1px solid ${data.color}25` }}
              >
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1.5" style={{ color: data.color }}>
                  Tip para aprender más rápido
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{data.tip}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────

function RoadmapSection() {
  const [showExtra, setShowExtra] = useState(false)
  const items = showExtra ? [...ROADMAP_A, ...ROADMAP_B] : ROADMAP_A

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
          >
            <GlassCard className="p-5 flex flex-col gap-3 h-full">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm">{item.name}</p>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.when}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.current}%` }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{item.current}% actual</p>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed flex-1">
                {item.why}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setShowExtra((v) => !v)}
        className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all"
      >
        {showExtra ? '↑ Mostrar menos' : '↓ Ver más tecnologías'}
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContinuousLearningPage() {
  useScrollToTop()

  return (
    <AboutPageLayout
      title="Aprendizaje Continuo"
      description="Tecnología evoluciona constantemente. Yo también."
      valueNumber="03"
      accentColor="#06B6D4"
      prevPath="/sobre-mi/atencion-al-detalle"
      prevLabel="Atención al detalle"
      nextPath="/sobre-mi/vision-fullstack"
      nextLabel="Visión Full Stack"
    >
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            Mi evolución como desarrollador
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Cada etapa trajo nuevos desafíos y formas de pensar. Haz clic en cada nodo para ver
            más detalle.
          </p>
        </div>
        <InteractiveTimeline />
      </section>

      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            ¿Cuánto tardé en aprender X?
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Selecciona una tecnología para ver mi nivel, cuánto tiempo tomó y cómo aprenderla más
            rápido.
          </p>
        </div>
        <TechSelector />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Lo que sigue</h2>
          <p className="text-[var(--color-text-secondary)]">
            Tecnologías en mi roadmap activo, con progreso actual y fecha estimada.
          </p>
        </div>
        <RoadmapSection />
      </section>
    </AboutPageLayout>
  )
}
