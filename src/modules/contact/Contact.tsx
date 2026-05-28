import React from 'react'
import { Mail, Globe, GitFork, MapPin, type LucideIcon } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import type { ContactInfo } from './contact.types'
import { SectionTitle } from '@/components/common/SectionTitle/SectionTitle'
import { RevealOnScroll } from '@/components/common/RevealOnScroll/RevealOnScroll'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { ContactForm } from './ContactForm'

const ICON_MAP: Record<string, LucideIcon> = { Mail, Globe, GitFork, MapPin }

const WA_URL =
  'https://wa.me/51952761415?text=Hola%20Gian%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.'

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: 'Mail',
    label: 'Email',
    value: 'geancarlosbarrionuevo@gmail.com',
    href: 'mailto:geancarlosbarrionuevo@gmail.com',
  },
  {
    icon: 'Globe',
    label: 'LinkedIn',
    value: 'linkedin.com/in/gianbarrionuevo',
    href: 'https://linkedin.com/in/gianbarrionuevo',
  },
  {
    icon: 'GitFork',
    label: 'GitHub',
    value: 'github.com/gianbarrionuevo',
    href: 'https://github.com/gianbarrionuevo',
  },
  {
    icon: 'MapPin',
    label: 'Ubicación',
    value: 'Lima, Perú',
    href: '#',
  },
]

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          label="Contacto"
          title="¿Tienes un proyecto en mente?"
          subtitle="Hablemos. Estoy disponible para nuevas oportunidades."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 mt-10">
          {/* ── Left: info ── */}
          <RevealOnScroll variant="fadeInLeft">
            <div className="flex flex-col gap-6">
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Estoy disponible para proyectos freelance, posiciones full-time y
                colaboraciones interesantes. Respondo en menos de 24 horas.
              </p>

              <div className="flex flex-col gap-3">
                {CONTACT_INFO.map((info) => {
                  const Icon = ICON_MAP[info.icon] ?? Mail
                  const isExternal = info.href.startsWith('http')
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="block group"
                    >
                      <GlassCard
                        className="flex items-center gap-3 px-4 py-3 hover:border-primary/30 transition-all duration-200"
                        hoverable
                      >
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--color-text-muted)] font-medium">
                            {info.label}
                          </p>
                          <p className="text-sm text-[var(--color-text-secondary)] group-hover:text-primary transition-colors truncate">
                            {info.value}
                          </p>
                        </div>
                      </GlassCard>
                    </a>
                  )
                })}
              </div>

              {/* WhatsApp button */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-1 w-full px-6 py-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(37,211,102,0.08)',
                  borderColor: 'rgba(37,211,102,0.25)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.16)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.45)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.08)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.25)'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  {React.createElement(SiWhatsapp as any, { size: 22, color: '#25D366' })}
                  <span className="font-medium text-white">Chatear por WhatsApp</span>
                </div>
                <span className="text-xs" style={{ color: 'rgba(37,211,102,0.7)' }}>
                  Respuesta rápida y directa
                </span>
              </a>

              {/* Availability badge */}
              <GlassCard className="flex items-center gap-3 px-4 py-3">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Disponible para nuevas oportunidades
                </p>
              </GlassCard>
            </div>
          </RevealOnScroll>

          {/* ── Right: form ── */}
          <RevealOnScroll variant="fadeInRight">
            <GlassCard className="p-6 md:p-8">
              <ContactForm />
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
