import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronDown, Layers, FileSpreadsheet, ArrowRight } from 'lucide-react'
import { SiDotnet, SiBlazor } from 'react-icons/si'
import { TbBrandJavascript, TbDatabase, TbBrandCSharp } from 'react-icons/tb'

// Helper to avoid TS2786 with react-icons in JSX context (react 19 types)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ri = (C: any, size: number, color: string) =>
  React.createElement(C, { size, color }) as React.ReactElement

interface Layer {
  id: string
  label: string
  sublabel: string
  color: string
  chips: string[]
  detail: string
  icon: React.ReactNode
}

const LAYERS: Layer[] = [
  {
    id: 'frontend',
    label: 'MAUI Blazor Views',
    sublabel: 'Capa de Presentación',
    color: '#6366F1',
    chips: ['CargaMasivaModal', 'Dropdowns', 'Modales', 'DataGrids'],
    detail:
      'Componentes Blazor reutilizables con prefijo rep-*. CSS modular para aislamiento de estilos. Razor components para cada submódulo de abastecimiento.',
    icon: ri(SiBlazor, 20, '#6366F1'),
  },
  {
    id: 'interop',
    label: 'JS Interop Layer',
    sublabel: 'Integración JavaScript',
    color: '#F59E0B',
    chips: ['FilePicker nativo', 'Descarga Excel', 'DOM positioning', 'Scroll ops'],
    detail:
      'Módulo JavaScript invocado desde C# para operaciones que MAUI requiere nativamente: apertura de file picker, descarga de archivos y posicionamiento de dropdowns.',
    icon: ri(TbBrandJavascript, 20, '#F59E0B'),
  },
  {
    id: 'controllers',
    label: 'ASP.NET Core 9 Controllers',
    sublabel: 'Capa de API REST',
    color: '#A855F7',
    chips: ['Endpoints REST', 'Validaciones', 'Auth middleware', 'DTOs'],
    detail:
      'Controllers tipados con atributos de ruta y validación. Inyección de dependencias para Services. Manejo centralizado de errores y logging.',
    icon: ri(SiDotnet, 20, '#A855F7'),
  },
  {
    id: 'services',
    label: 'Business Logic Services',
    sublabel: 'Capa de Servicios',
    color: '#06B6D4',
    chips: ['ETL de carga masiva', 'Validaciones negocio', 'Transacciones', 'Staging flow'],
    detail:
      'Servicios con interfaces para testabilidad. Lógica de ETL para procesamiento de 18 plantillas Excel: lectura con ClosedXML, validación fila por fila, inserción en staging y confirmación.',
    icon: <Layers size={20} color="#06B6D4" />,
  },
  {
    id: 'repositories',
    label: 'Repositories + Dapper',
    sublabel: 'Capa de Acceso a Datos',
    color: '#F97316',
    chips: ['Queries SQL tipadas', 'Stored Procedures', 'Mappings DTO', 'Multi-DB'],
    detail:
      'Patrón Repository con interfaces. Dapper como micro-ORM para queries complejas con mejor control que EF Core. Soporte para BDForceDistribucion y ForceDistribucionAuth.',
    icon: ri(TbDatabase, 20, '#F97316'),
  },
  {
    id: 'database',
    label: 'SQL Server',
    sublabel: 'Capa de Persistencia',
    color: '#EF4444',
    chips: ['BDForceDistribucion', 'Staging tables', 'Backups sqlcmd', 'Índices optimizados'],
    detail:
      'SQL Server con esquemas separados por módulo. Tablas de staging para validación previa al ETL. Scripts de migración con sqlcmd para múltiples ambientes.',
    icon: ri(TbDatabase, 20, '#EF4444'),
  },
]

const EXCEL_FLOW = [
  'Excel (.xlsx)',
  'ClosedXML Parse',
  'Validación fila × fila',
  'Staging SQL',
  'Confirmación UI',
  'ETL → Producción',
]

export function ErpArchitectureDemo() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const toggle = (idx: number) => setExpandedIdx(prev => (prev === idx ? null : idx))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        {ri(TbBrandCSharp, 16, '#512BD4')}
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Arquitectura del Módulo de Abastecimiento
        </h3>
      </div>

      <div className="flex gap-4">
        {/* Main diagram */}
        <div className="flex-1 flex flex-col items-stretch gap-0.5">
          {LAYERS.map((layer, i) => (
            <div key={layer.id}>
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => toggle(i)}
                className="w-full text-left rounded-xl border px-4 py-3 flex items-center gap-3 transition-all"
                style={{
                  background: expandedIdx === i ? `${layer.color}12` : 'rgba(255,255,255,0.02)',
                  borderColor: expandedIdx === i ? `${layer.color}50` : 'rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${layer.color}18` }}
                >
                  {layer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                    {layer.label}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{layer.sublabel}</p>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1 mr-2 justify-end max-w-[160px]">
                  {layer.chips.slice(0, 2).map(chip => (
                    <span
                      key={chip}
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                      style={{ background: `${layer.color}18`, color: layer.color }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <ChevronDown
                  size={14}
                  className="flex-shrink-0 text-[var(--color-text-muted)] transition-transform"
                  style={{ transform: expandedIdx === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </motion.button>

              <AnimatePresence>
                {expandedIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="mx-2 mb-1 rounded-b-xl px-4 py-3 border border-t-0"
                      style={{ background: `${layer.color}08`, borderColor: `${layer.color}30` }}
                    >
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-2">
                        {layer.detail}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {layer.chips.map(chip => (
                          <span
                            key={chip}
                            className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                            style={{ background: `${layer.color}20`, color: layer.color }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {i < LAYERS.length - 1 && (
                <div className="flex justify-center my-0.5 text-[var(--color-text-muted)] opacity-40">
                  <ArrowDown size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Excel flow sidebar */}
        <div className="hidden lg:flex flex-col w-44 flex-shrink-0">
          <div
            className="rounded-xl border p-3 flex flex-col gap-2"
            style={{
              background: 'rgba(33,115,70,0.06)',
              borderColor: 'rgba(33,115,70,0.25)',
              borderStyle: 'dashed',
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <FileSpreadsheet size={13} color="#217346" />
              <span className="text-[11px] font-semibold text-emerald-400">Flujo Carga Masiva</span>
            </div>
            {EXCEL_FLOW.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="w-full text-center rounded-lg py-1.5 px-2"
                  style={{
                    background: 'rgba(33,115,70,0.12)',
                    border: '1px solid rgba(33,115,70,0.2)',
                  }}
                >
                  <span className="text-[10px] text-emerald-300 font-medium">{step}</span>
                </motion.div>
                {i < EXCEL_FLOW.length - 1 && (
                  <ArrowDown size={10} className="my-0.5 opacity-40 text-emerald-400" />
                )}
              </div>
            ))}
            <div className="flex justify-center mt-1 items-center gap-1 text-[var(--color-text-muted)] opacity-50">
              <ArrowRight size={10} />
              <span className="text-[9px]">→ Repositories</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] text-center pt-1">
        Haz clic en cada capa para ver detalles de implementación
      </p>
    </div>
  )
}
