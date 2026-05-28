import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, User, ShoppingCart, Zap, Shield, Search } from 'lucide-react'
import { SiWordpress, SiPhp, SiMysql } from 'react-icons/si'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ri = (C: any, size: number, color: string) =>
  React.createElement(C, { size, color }) as React.ReactElement

const FLOW = [
  {
    icon: <User size={18} color="#94A3B8" />,
    label: 'Usuario',
    desc: 'Visita la tienda',
    color: '#94A3B8',
    chips: [] as string[],
  },
  {
    icon: ri(SiWordpress, 18, '#21759B'),
    label: 'WordPress Frontend',
    desc: 'Tema personalizado',
    color: '#21759B',
    chips: ['HTML + CSS', 'Plantillas PHP', 'Mobile First'],
  },
  {
    icon: <ShoppingCart size={18} color="#7F54B3" />,
    label: 'WooCommerce Engine',
    desc: 'Motor de e-commerce',
    color: '#7F54B3',
    chips: ['Carrito', 'Checkout', 'Pedidos', 'Notificaciones'],
    arrowLabel: 'WooCommerce hooks',
  },
  {
    icon: ri(SiPhp, 18, '#777BB4'),
    label: 'Lógica PHP custom',
    desc: 'Personalización avanzada',
    color: '#777BB4',
    chips: ['functions.php', 'Plugins custom', 'Validaciones', 'Pasarela pago'],
    arrowLabel: 'PHP functions.php',
  },
  {
    icon: ri(SiMysql, 18, '#4479A1'),
    label: 'MySQL Database',
    desc: 'Persistencia de datos',
    color: '#4479A1',
    chips: ['Productos', 'Pedidos', 'Clientes', 'Sesiones'],
  },
] as const

const OPTIMIZATIONS = [
  { icon: <Search size={12} color="#F59E0B" />, label: 'SEO Plugin', desc: 'Yoast SEO' },
  { icon: <Zap size={12} color="#06B6D4" />, label: 'Cache', desc: 'WP Super Cache' },
  { icon: <Shield size={12} color="#34D399" />, label: 'SSL', desc: 'HTTPS certificado' },
]

export function EcommerceArchitectureDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <ShoppingCart size={15} className="text-[var(--color-primary)]" />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Arquitectura E-commerce WordPress
        </h3>
      </div>

      <div className="flex gap-4">
        {/* Main flow */}
        <div className="flex-1 flex flex-col items-center gap-0.5">
          {FLOW.map((step, i) => (
            <div key={step.label} className="w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-full rounded-xl border px-4 py-3"
                style={{ background: `${step.color}08`, borderColor: `${step.color}30` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}18` }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {step.label}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
                  </div>
                </div>
                {step.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 pl-12">
                    {step.chips.map(chip => (
                      <span
                        key={chip}
                        className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: `${step.color}18`, color: step.color }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {i < FLOW.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="flex flex-col items-center my-1 gap-0.5"
                >
                  <ArrowDown size={13} className="text-[var(--color-text-muted)] opacity-50" />
                  {'arrowLabel' in FLOW[i + 1] && (FLOW[i + 1] as { arrowLabel?: string }).arrowLabel && (
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(99,102,241,0.1)', color: '#818CF8' }}
                    >
                      {(FLOW[i + 1] as { arrowLabel?: string }).arrowLabel}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Optimizations sidebar */}
        <div className="hidden sm:flex flex-col w-36 flex-shrink-0 gap-2 pt-10">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Optimizaciones
          </p>
          {OPTIMIZATIONS.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-lg border p-2.5"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                {opt.icon}
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">{opt.label}</span>
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)]">{opt.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
