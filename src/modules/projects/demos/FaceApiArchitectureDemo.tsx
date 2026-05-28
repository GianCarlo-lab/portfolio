import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, Cpu, Monitor } from 'lucide-react'
import { SiReact } from 'react-icons/si'
import { TbBrandAzure, TbFaceId } from 'react-icons/tb'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ri = (C: any, size: number, color: string) =>
  React.createElement(C, { size, color }) as React.ReactElement

const SEQUENCE = [
  {
    id: 'frontend',
    label: 'React Frontend',
    sublabel: 'Captura + UI',
    color: '#61DAFB',
    icon: ri(SiReact, 22, '#61DAFB'),
    items: [
      'Captura imagen con webcam',
      'Convierte a Base64',
      'Envía a Azure Face API',
      'Dibuja bounding box en canvas',
    ],
  },
  {
    id: 'azure',
    label: 'Azure Face API',
    sublabel: 'Microsoft Cloud',
    color: '#0078D4',
    icon: ri(TbBrandAzure, 22, '#0078D4'),
    badge: 'Microsoft Cloud',
    items: [
      'Face · Detect endpoint',
      'Face · Verify endpoint',
      'Cognitive Services',
      'REST + Subscription Key',
    ],
  },
  {
    id: 'result',
    label: 'Procesamiento',
    sublabel: 'Resultado en UI',
    color: '#34D399',
    icon: <Monitor size={22} color="#34D399" />,
    items: [
      'Procesa JSON response',
      'Muestra Face ID',
      'Renderiza atributos',
      'Similarity score',
    ],
  },
]

const ARROWS = [
  { label: 'Base64 Image' },
  { label: 'Face ID + Attributes' },
]

const CAPABILITIES = [
  {
    icon: <Eye size={16} color="#61DAFB" />,
    label: 'Detección',
    desc: 'Detecta rostros en imágenes, retorna coordenadas y Face ID únicos.',
    color: '#61DAFB',
  },
  {
    icon: <Cpu size={16} color="#F59E0B" />,
    label: 'Atributos',
    desc: 'Edad estimada, emoción, pose facial y detección de accesorios.',
    color: '#F59E0B',
  },
  {
    icon: ri(TbFaceId, 16, '#34D399'),
    label: 'Verificación',
    desc: 'Compara 2 rostros y retorna un similarity score de 0 a 1.',
    color: '#34D399',
  },
]

export function FaceApiArchitectureDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 mb-1">
        {ri(TbFaceId, 16, '#0078D4')}
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Flujo de Reconocimiento Facial con Azure
        </h3>
      </div>

      {/* Sequence diagram */}
      <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
        {SEQUENCE.map((actor, i) => (
          <React.Fragment key={actor.id}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="w-full rounded-2xl border p-4 flex flex-col gap-3 flex-1"
              style={{ background: `${actor.color}06`, borderColor: `${actor.color}25` }}
            >
              <div className="flex items-center gap-2">
                {actor.icon}
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{actor.label}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{actor.sublabel}</p>
                </div>
                {'badge' in actor && (
                  <span
                    className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: `${actor.color}20`, color: actor.color }}
                  >
                    {(actor as { badge?: string }).badge}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {actor.items.map(item => (
                  <div key={item} className="flex items-start gap-1.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: actor.color }}
                    />
                    <span className="text-[11px] text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {i < SEQUENCE.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex-shrink-0 flex flex-col items-center gap-1 sm:pt-8"
              >
                <ArrowRight size={16} className="text-[var(--color-text-muted)] hidden sm:block" />
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8' }}
                >
                  {ARROWS[i]?.label}
                </span>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="rounded-xl border p-3"
            style={{ background: `${cap.color}06`, borderColor: `${cap.color}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              {cap.icon}
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">{cap.label}</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">{cap.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
