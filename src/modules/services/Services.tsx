import React from 'react'
import { Mail } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { services } from '@/data/services.data'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { Button } from '@/components/common/Button/Button'
import { ServiceCard } from './ServiceCard'

const WA_URL =
  'https://wa.me/51952761415?text=Hola%20Gian%2C%20vi%20tu%20portfolio%20y%20quisiera%20hablar%20sobre%20un%20proyecto.'

// Show highlighted card first
const sortedServices = [...services].sort((a, b) =>
  a.highlighted === b.highlighted ? 0 : a.highlighted ? -1 : 1
)

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          label="Servicios"
          title="Servicios"
          subtitle="¿Qué puedo construir para ti?"
        />

        <RevealOnScroll variant="fadeInUp" delay={0.1}>
          <p className="text-[var(--color-text-secondary)] text-base max-w-2xl mx-rigth text-rigth mt-4 mb-12">
            Trabajo de forma independiente con empresas y emprendedores que necesitan
            soluciones digitales reales. Cada proyecto es tratado con el mismo estándar
            de calidad que aplicaría en cualquier empresa.
          </p>
        </RevealOnScroll>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA block */}
        <RevealOnScroll variant="fadeInUp" delay={0.15}>
          <GlassCard className="max-w-2xl mx-auto mt-12 p-8 text-center">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
              ¿Tu proyecto no encaja en ninguna categoría?
            </h3>
            <p className="text-[var(--color-text-secondary)] mt-2">
              No hay problema. Cuéntame qué necesitas y encontramos la mejor solución
              juntos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Button
                variant="primary"
                size="md"
                href={WA_URL}
                external
                icon={React.createElement(SiWhatsapp as any, { size: 18 })}
                iconPosition="left"
              >
                Hablemos por WhatsApp
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                icon={<Mail size={18} />}
                iconPosition="left"
              >
                Enviar mensaje
              </Button>
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </section>
  )
}
