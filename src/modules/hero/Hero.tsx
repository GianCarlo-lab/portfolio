import { motion } from 'framer-motion'
import { heroData } from '@/data/hero.data'
import { GradientText } from '@/components/ui/GradientText/GradientText'
import { HeroTechBadges } from './HeroTechBadges'
import { HeroAvatar } from './HeroAvatar'
import { HeroCTA } from './HeroCTA'

const DOT_GRID_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.12)'/%3E%3C/svg%3E")`

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const { name, role, roleHighlight, description, technologies, cvUrl, linkedIn, github, email } =
    heroData

  const roleParts = role.split(roleHighlight)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-30"
        style={{ backgroundImage: DOT_GRID_SVG }}
      />

      {/* Orb top-left */}
      <div
        aria-hidden
        className="absolute z-0 pointer-events-none"
        style={{
          top: '-10%',
          left: '-15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Orb bottom-right */}
      <div
        aria-hidden
        className="absolute z-0 pointer-events-none"
        style={{
          bottom: '-5%',
          right: '-10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Main content */}
      <div className="container-custom relative z-10 w-full pb-8 pt-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center min-h-screen lg:py-24">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Availability chip */}
            <FadeUp delay={0}>
              <div className="inline-flex">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-hover)] text-sm text-[var(--color-text-tertiary)]"
                  style={{
                    background: 'rgba(19,19,31,0.7)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  Disponible para nuevas oportunidades
                </div>
              </div>
            </FadeUp>

            {/* Greeting */}
            <FadeUp delay={0.1}>
              <p className="text-xl text-[var(--color-text-secondary)] font-medium">
                Hola, soy
              </p>
            </FadeUp>

            {/* Name */}
            <FadeUp delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-[0.025em] text-[var(--color-text-primary)]">
                {name}
              </h1>
            </FadeUp>

            {/* Role with gradient highlight */}
            <FadeUp delay={0.3}>
              <p className="text-3xl md:text-4xl font-bold leading-tight">
                {roleParts[0]}
                <GradientText>{roleHighlight}</GradientText>
                {roleParts[1]}
              </p>
            </FadeUp>

            {/* Accent separator */}
            <FadeUp delay={0.4}>
              <div className="w-16 h-0.5 rounded-full bg-primary" />
            </FadeUp>

            {/* Description */}
            <FadeUp delay={0.5}>
              <p
                className="text-[var(--color-text-secondary)] text-lg leading-relaxed"
                style={{ maxWidth: '520px' }}
              >
                {description}
              </p>
            </FadeUp>

            {/* Tech badges */}
            <FadeUp delay={0.55}>
              <HeroTechBadges technologies={technologies} delay={0.6} />
            </FadeUp>

            {/* CTA buttons + socials */}
            <FadeUp delay={0.65}>
              <HeroCTA
                cvUrl={cvUrl}
                linkedIn={linkedIn}
                github={github}
                email={email}
                delay={0.7}
              />
            </FadeUp>
          </div>

          {/* ── Right column ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </div>

    </section>
  )
}
