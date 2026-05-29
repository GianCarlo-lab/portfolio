import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronDown, RefreshCw, Database, Server, Monitor, Layers } from 'lucide-react'
import { AboutPageLayout } from './AboutPageLayout'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

// ── Data ────────────────────────────────────────────────────────────────────

interface Step {
  number: number
  title: string
  description: string
  detail: React.ReactNode
}

interface Feature {
  id: string
  requirement: string
  steps: Step[]
}

const FEATURES: Feature[] = [
  {
    id: 'excel',
    requirement: 'El cliente necesita exportar el inventario a Excel con formato corporativo',
    steps: [
      {
        number: 1,
        title: '¿Qué datos necesito?',
        description: 'Primero voy a la BD. ¿Qué tablas involucra? ¿Cuántos registros puede tener? ¿Necesito paginación o es exportación total?',
        detail: (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>
            {`-- Tablas involucradas
SELECT i.Id, i.Nombre, i.Stock, i.PrecioUnitario,
       c.Nombre AS Categoria, p.Nombre AS Proveedor
FROM Inventario i
JOIN Categorias c ON i.CategoriaId = c.Id
JOIN Proveedores p ON i.ProveedorId = p.Id
-- ~2,500 registros en producción → necesito paginación`}
          </div>
        ),
      },
      {
        number: 2,
        title: '¿Cómo lo estructuro en el backend?',
        description: 'Nuevo endpoint GET /api/inventario/export. Un service que consulta con Dapper. ClosedXML para generar el archivo en memoria. Stream de respuesta para no saturar memoria.',
        detail: (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>
            {`// InventarioController.cs
[HttpGet("export")]
public async Task<IActionResult> ExportInventario()
{
    var items = await _service.GetAllForExportAsync();
    var stream = _excelService.Generate(items);
    return File(stream,
        "application/vnd.openxmlformats...",
        "inventario.xlsx");
}`}
          </div>
        ),
      },
      {
        number: 3,
        title: '¿Cómo lo conecto al frontend?',
        description: 'Blazor llama al endpoint. JS Interop para disparar la descarga. Botón con estado loading mientras genera. Feedback al usuario cuando termina.',
        detail: (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>
            {`@* ExportButton.razor *@
<button @onclick="HandleExport" disabled="@_loading">
    @if (_loading) { <span>Generando...</span> }
    else { <span>Exportar Excel</span> }
</button>

@code {
    async Task HandleExport() {
        _loading = true;
        await JS.InvokeVoidAsync("downloadFile",
            "/api/inventario/export");
        _loading = false;
    }
}`}
          </div>
        ),
      },
      {
        number: 4,
        title: '¿Qué puede salir mal?',
        description: 'Pienso en los edge cases antes de escribir una línea.',
        detail: (
          <div className="flex flex-col gap-2">
            {[
              { icon: '⚠️', case: 'Query lenta con muchos registros', sol: 'Paginación con OFFSET/FETCH' },
              { icon: '⚠️', case: 'Timeout del servidor', sol: 'Streaming de respuesta' },
              { icon: '⚠️', case: 'Formato incorrecto de Excel', sol: 'Template corporativo con ClosedXML' },
              { icon: '🔒', case: 'Usuario sin permisos', sol: 'Middleware de autorización por rol' },
            ].map(item => (
              <div key={item.case} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>{item.icon}</span>
                <span><strong>{item.case}</strong> → {item.sol}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        number: 5,
        title: '¿Cómo lo entrego?',
        description: 'El código es solo el 70% del trabajo. El otro 30% es comunicación.',
        detail: (
          <div className="flex flex-col gap-2">
            {[
              { icon: '📋', item: 'PR con descripción del feature + capturas' },
              { icon: '📖', item: 'README actualizado con nuevo endpoint' },
              { icon: '🎬', item: 'Demo al equipo en el sprint review' },
              { icon: '✅', item: 'Merge a develop después del code review' },
            ].map(i => (
              <div key={i.item} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>{i.icon}</span>
                <span>{i.item}</span>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    id: 'validation',
    requirement: 'Agregar validación de fechas en el formulario de ventas',
    steps: [
      {
        number: 1,
        title: '¿Qué datos necesito?',
        description: '¿Qué reglas de negocio aplican? ¿Qué rangos son válidos? ¿El backend ya valida o solo el frontend?',
        detail: (
          <div className="font-mono text-xs leading-relaxed" style={{ color: '#A5B4FC' }}>
            {`// Reglas de negocio
const reglas = [
  "No fechas futuras (> hoy)",
  "No anteriores a 2020-01-01",
  "Formato: DD/MM/YYYY",
  "Backend también valida (defensa en profundidad)"
]`}
          </div>
        ),
      },
      {
        number: 2,
        title: '¿Cómo lo estructuro en el backend?',
        description: 'Data annotation en el DTO + validación personalizada en el service layer.',
        detail: (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>
            {`// VentaDto.cs
[DataType(DataType.Date)]
[DateRange(minYear: 2020, allowFuture: false)]
public DateTime FechaVenta { get; set; }

// VentaService.cs
if (dto.FechaVenta > DateTime.Today)
    throw new ValidationException("Fecha no válida");`}
          </div>
        ),
      },
      {
        number: 3,
        title: '¿Cómo lo conecto al frontend?',
        description: 'React Hook Form + validación en tiempo real + mensaje de error descriptivo.',
        detail: (
          <div className="font-mono text-xs leading-relaxed overflow-x-auto" style={{ color: '#A5B4FC' }}>
            {`// SalesForm.tsx
const { register, formState: { errors } } = useForm()

<input {...register("fechaVenta", {
  validate: v => {
    const d = new Date(v)
    if (d > new Date()) return "No puede ser futura"
    if (d < new Date("2020-01-01")) return "Muy antigua"
    return true
  }
})} />
{errors.fechaVenta && <Error msg={errors.fechaVenta.message} />}`}
          </div>
        ),
      },
      {
        number: 4,
        title: '¿Qué puede salir mal?',
        description: 'Los casos de borde de fechas son especialmente traicioneros.',
        detail: (
          <div className="flex flex-col gap-2">
            {[
              { icon: '⚠️', case: 'Zona horaria diferente', sol: 'Normalizar a UTC en backend' },
              { icon: '⚠️', case: 'Formato del input browser varía por OS', sol: 'Usar DatePicker controlado' },
              { icon: '⚠️', case: 'Usuario deja el campo vacío', sol: 'required + mensaje claro' },
            ].map(item => (
              <div key={item.case} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span>{item.icon}</span>
                <span><strong>{item.case}</strong> → {item.sol}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        number: 5,
        title: '¿Cómo lo entrego?',
        description: 'Commit con mensaje semántico, tests manuales documentados.',
        detail: (
          <div className="flex flex-col gap-2">
            {[
              { icon: '📝', item: 'feat: add date validation to sales form' },
              { icon: '🧪', item: 'Test manual: fecha futura, fecha antigua, formato inválido' },
              { icon: '📋', item: 'PR con capturas de los 3 casos de validación' },
            ].map(i => (
              <div key={i.item} className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                <span>{i.icon}</span>
                <span>{i.item}</span>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
]

// ── Feature Accordion ─────────────────────────────────────────────────────────

function FeatureAccordion({ feature }: { feature: Feature }) {
  const [openStep, setOpenStep] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {/* Requirement */}
      <GlassCard className="p-4">
        <div className="flex items-start gap-3">
          <div className="px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0" style={{ background: 'rgba(245,158,11,0.15)', color: '#FCD34D' }}>
            Requerimiento
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">"{feature.requirement}"</p>
        </div>
      </GlassCard>

      {/* Steps */}
      {feature.steps.map((step) => {
        const isOpen = openStep === step.number
        return (
          <div key={step.number}>
            <button
              onClick={() => setOpenStep(isOpen ? null : step.number)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all"
              style={{
                background: isOpen ? 'rgba(245,158,11,0.06)' : 'rgba(255,255,255,0.03)',
                borderColor: isOpen ? 'rgba(245,158,11,0.3)' : 'var(--color-border)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B' }}>
                  {step.number}
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{step.title}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{step.description}</p>
                </div>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 ml-2">
                <ChevronDown size={15} style={{ color: 'var(--color-text-muted)' }} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                  <GlassCard className="p-4 mt-1">
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">{step.description}</p>
                    <div className="rounded-lg p-3 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {step.detail}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── Architecture Layers ───────────────────────────────────────────────────────

const LAYERS = [
  { icon: <Monitor size={16} />, label: 'Presentación', tech: 'Blazor / React', color: '#6366F1', desc: 'Componentes UI, estados, interacción con el usuario' },
  { icon: <Layers size={16} />, label: 'API Layer', tech: 'ASP.NET Core', color: '#8B5CF6', desc: 'Controllers, autenticación JWT, validación de entrada' },
  { icon: <Server size={16} />, label: 'Lógica de negocio', tech: '.NET Services', color: '#F59E0B', desc: 'Reglas, transformaciones, orquestación de repositorios' },
  { icon: <Database size={16} />, label: 'Datos', tech: 'Dapper + SQL Server', color: '#10B981', desc: 'Queries optimizadas, transacciones, migrations' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export function FullStackVisionPage() {
  useScrollToTop()
  const [featureIdx, setFeatureIdx] = useState(0)
  const feature = FEATURES[featureIdx]

  return (
    <AboutPageLayout
      title="Visión Fullstack"
      description="Ownership del sistema completo: del schema SQL hasta la vista de usuario. Sin silos, sin dependencias innecesarias."
      valueNumber="04"
      accentColor="#F59E0B"
      prevPath="/sobre-mi/aprendizaje-continuo"
      prevLabel="Aprendizaje continuo"
      nextPath="/sobre-mi/trabajo-en-equipo"
      nextLabel="Trabajo en equipo"
    >
      <div className="flex flex-col gap-12 w-full">

        {/* Quote */}
        <div className="relative pl-6 py-1" style={{ borderLeft: '4px solid #F59E0B' }}>
          <p className="text-[var(--color-text-secondary)] leading-relaxed italic">
            "En RADAR tuve ownership completo del módulo de Abastecimiento: diseñé el schema SQL,
            construí la API REST en .NET, conecté los endpoints desde Blazor y validé cada caso de uso en producción.
            Cuando hay un bug, no espero que alguien del backend lo revise — lo encuentro yo.
            Eso es lo que significa pensar en sistema, no en capas."
          </p>
          <p className="text-xs font-semibold mt-3" style={{ color: '#F59E0B' }}>— Gian, módulo Abastecimiento, RADAR ERP</p>
          <Quote size={16} className="absolute top-1 right-0 opacity-20" style={{ color: '#F59E0B' }} />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {['End-to-end ownership', 'Sin silos', 'Sistema > componentes'].map(p => (
            <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(245,158,11,0.12)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.25)' }}>
              {p}
            </span>
          ))}
        </div>

        {/* Feature thinking */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Del requerimiento al código</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Así pienso cuando me dan una tarea. 5 preguntas antes de escribir una línea.</p>
            </div>
            {featureIdx === 0 && (
              <button
                onClick={() => setFeatureIdx(1)}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all flex-shrink-0"
                style={{ borderColor: 'rgba(245,158,11,0.3)', color: '#F59E0B', background: 'rgba(245,158,11,0.06)' }}
              >
                <RefreshCw size={13} />
                Ver otro ejemplo
              </button>
            )}
            {featureIdx === 1 && (
              <button
                onClick={() => setFeatureIdx(0)}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all flex-shrink-0"
                style={{ borderColor: 'rgba(245,158,11,0.3)', color: '#F59E0B', background: 'rgba(245,158,11,0.06)' }}
              >
                <RefreshCw size={13} />
                Ver primer ejemplo
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureAccordion feature={feature} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Architecture diagram */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Arquitectura en capas</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Las tecnologías reales que uso en RADAR ERP, capa por capa.</p>
          <div className="flex flex-col gap-3">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <GlassCard className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${layer.color}20`, color: layer.color }}>
                      {layer.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{layer.label}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${layer.color}18`, color: layer.color }}>
                          {layer.tech}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </AboutPageLayout>
  )
}
