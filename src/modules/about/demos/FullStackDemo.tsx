import { motion } from 'framer-motion'
import { User, Server, Database, Zap } from 'lucide-react'
import { getTechIcon } from '@/utils/techIcons'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ─── Request flow steps ───────────────────────────────────────────────────────

interface FlowStep {
  num: number
  direction: 'request' | 'response'
  layer: string
  layerColor: string
  Icon: React.FC<{ size?: number; className?: string }>
  code: string
  badge: string
  delay: number
}

const FLOW_STEPS: FlowStep[] = [
  {
    num: 1, direction: 'request',
    layer: 'Usuario',        layerColor: '#22C55E',
    Icon: User,
    code: 'clic en "Ver pedidos"',
    badge: 'Browser',
    delay: 0.1,
  },
  {
    num: 2, direction: 'request',
    layer: 'React Frontend', layerColor: '#61DAFB',
    Icon: User, // replaced below with tech icon
    code: "ordersService.getAll(userId)",
    badge: 'Axios · JWT Header',
    delay: 0.3,
  },
  {
    num: 3, direction: 'request',
    layer: '.NET Controller', layerColor: '#512BD4',
    Icon: Server,
    code: '[HttpGet] GetOrders(int userId)',
    badge: 'Validación JWT ✓',
    delay: 0.55,
  },
  {
    num: 4, direction: 'request',
    layer: 'Service Layer',  layerColor: '#8B5CF6',
    Icon: Zap,
    code: 'var orders = await _repo.GetByUser(id)',
    badge: 'Business Logic',
    delay: 0.8,
  },
  {
    num: 5, direction: 'request',
    layer: 'SQL Server',     layerColor: '#CC2927',
    Icon: Database,
    code: 'SELECT * FROM Orders WHERE UserId = @id',
    badge: 'Entity Framework',
    delay: 1.05,
  },
  {
    num: 6, direction: 'response',
    layer: 'React State',    layerColor: '#61DAFB',
    Icon: User,
    code: '{ orders: [...], total: 42 }',
    badge: 'UI actualizada ✓',
    delay: 1.3,
  },
]

// ─── Advantages ───────────────────────────────────────────────────────────────

const ADVANTAGES = [
  { text: 'Detecto el bug en cualquier capa sin depender de otro dev' },
  { text: 'Tomo decisiones de arquitectura completas, frontend + backend' },
  { text: 'Menor fricción = entregas más rápidas y menos reuniones de sync' },
]

// ─── Tech by layer ────────────────────────────────────────────────────────────

const LAYERS = [
  {
    label: 'Frontend',
    color: '#61DAFB',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    color: '#512BD4',
    techs: ['.NET 8', 'C#', 'Java', 'APIs REST', 'JWT'],
  },
  {
    label: 'Data & Cloud',
    color: '#0078D4',
    techs: ['SQL Server', 'Azure', 'Entity Framework', 'Git'],
  },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function FullStackDemo() {
  return (
    <div className="flex flex-col gap-8 w-full overflow-x-hidden">

      {/* ── PARTE A: Request flow ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Flujo completo de una petición real
        </p>

        <div className="flex flex-col gap-1">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num}>
              <motion.div
                initial={{ opacity: 0, x: step.direction === 'request' ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <GlassCard className="flex items-center gap-3 px-4 py-3">
                  {/* Step number */}
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: `${step.layerColor}20`, color: step.layerColor }}
                  >
                    {step.num}
                  </span>

                  {/* Layer label */}
                  <span
                    className="text-xs font-semibold w-28 flex-shrink-0 whitespace-nowrap"
                    style={{ color: step.layerColor }}
                  >
                    {step.layer}
                  </span>

                  {/* Code snippet */}
                  <code
                    className="text-[11px] flex-1 min-w-0 truncate"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {step.code}
                  </code>

                  {/* Badge */}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 whitespace-nowrap"
                    style={{ background: `${step.layerColor}15`, color: step.layerColor }}
                  >
                    {step.badge}
                  </span>
                </GlassCard>
              </motion.div>

              {/* Arrow */}
              {i < FLOW_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay + 0.2 }}
                  className="flex justify-center py-0.5"
                >
                  <span
                    className="text-[var(--color-text-muted)] text-sm"
                    style={{ lineHeight: 1 }}
                  >
                    {i === 4 ? '↑' : '↓'}
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── PARTE B: Advantages ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Ventajas de ser Full Stack real
        </p>
        <div className="flex flex-col gap-2">
          {ADVANTAGES.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
            >
              <GlassCard className="flex items-start gap-3 px-4 py-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-primary"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">{adv.text}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PARTE C: Tech by layer ── */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Tecnologías por capa
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LAYERS.map((layer, li) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + li * 0.12, duration: 0.35 }}
            >
              <GlassCard className="p-4 flex flex-col gap-3 h-full">
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: layer.color }}
                >
                  {layer.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {layer.techs.map((tech) => {
                    const icon = getTechIcon(tech, 13)
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]"
                      >
                        {icon && <span className="flex-shrink-0">{icon}</span>}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
