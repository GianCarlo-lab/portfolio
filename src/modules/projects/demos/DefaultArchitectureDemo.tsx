import { motion } from 'framer-motion'
import { Layers, ArrowDown, Globe, Server, Database } from 'lucide-react'

const LAYERS = [
  { label: 'Frontend', icon: Globe, color: '#61DAFB', bg: 'rgba(97,218,251,0.1)', desc: 'Interfaz de usuario' },
  { label: 'Backend', icon: Server, color: '#6366F1', bg: 'rgba(99,102,241,0.1)', desc: 'Lógica de negocio y APIs' },
  { label: 'Base de datos', icon: Database, color: '#34D399', bg: 'rgba(52,211,153,0.1)', desc: 'Persistencia y almacenamiento' },
]

export function DefaultArchitectureDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <Layers size={16} className="text-[var(--color-primary)]" />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Arquitectura general del proyecto
        </h3>
      </div>

      <div className="flex flex-col items-center gap-1">
        {LAYERS.map((layer, i) => (
          <div key={layer.label} className="w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className="w-full rounded-xl p-4 flex items-center gap-4 border"
              style={{ background: layer.bg, borderColor: `${layer.color}30` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${layer.color}20` }}
              >
                <layer.icon size={20} style={{ color: layer.color }} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--color-text-primary)]">{layer.label}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{layer.desc}</p>
              </div>
            </motion.div>
            {i < LAYERS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.12 + 0.1 }}
                className="my-1 text-[var(--color-text-muted)]"
              >
                <ArrowDown size={16} />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-4 rounded-xl p-4 border text-center"
        style={{ background: 'rgba(99,102,241,0.04)', borderColor: 'rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs text-[var(--color-text-muted)]">Demo interactivo próximamente</p>
      </div>
    </div>
  )
}
