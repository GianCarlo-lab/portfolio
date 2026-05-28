import {motion} from 'framer-motion'
import {Code2} from 'lucide-react'
import {fadeInRight} from '@/animations/variants'
import perfilPrincipal from '@/assets/images/perfil1.jpeg'
import perfilPrincipal2 from '@/assets/images/perfil2.jpeg'

export function HeroAvatar() {
    return (
        <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{delay: 0.3, duration: 0.5}}
            className="flex justify-center lg:justify-end"
        >
            <div className="relative">
                {/* Glow behind avatar */}
                <div
                    aria-hidden
                    className="absolute inset-0 z-0 rounded-3xl"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        transform: 'scale(1.3)',
                    }}
                />

                {/* Rotating gradient border */}
                <div
                    className="relative z-10 overflow-hidden"
                    style={{
                        width: '380px',
                        height: '450px',
                        borderRadius: '24px',
                        padding: '2px',
                    }}
                >
                    {/* Rotating conic gradient layer */}
                    <div
                        aria-hidden
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '200%',
                            height: '200%',
                            transform: 'translate(-50%, -50%)',
                            background:
                                'conic-gradient(from 0deg, #6366F1, #8B5CF6, #A78BFA, transparent 50%, #6366F1)',
                            animation: 'rotate-border 8s linear infinite',
                        }}
                    />
                    {/* Content layer */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: '22px',
                            background: 'var(--color-surface)',
                            zIndex: 1,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* GB placeholder */}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                fontWeight: 800,
                                color: 'white',
                                fontFamily: 'var(--font-display)',
                                letterSpacing: '-0.02em',
                                userSelect: 'none',
                            }}
                        >
                            <motion.img
                                src={perfilPrincipal}
                                alt="Foto de Gian Carlo"
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: 'center 25%',
                                }}
                                animate={{
                                    scale: [1, 1.06, 1],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Floating decoration: Clean Code card (top-right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1, y: [0, -8, 0]}}
                    transition={{
                        opacity: {delay: 0.7, duration: 0.4},
                        scale: {delay: 0.7, duration: 0.4},
                        y: {duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.7},
                    }}
                    className="absolute -top-4 -right-12 z-20 mr-10"
                >
                    <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap"
                        style={{
                            background: 'rgba(19,19,31,0.85)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                        }}
                    >
                        <Code2 size={14} className="text-primary flex-shrink-0"/>
                        Clean Code
                    </div>
                </motion.div>

                {/* Floating decoration: Exp card (bottom-left) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1, y: [0, -8, 0]}}
                    transition={{
                        opacity: {delay: 0.85, duration: 0.4},
                        scale: {delay: 0.85, duration: 0.4},
                        y: {duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.35},
                    }}
                    className="absolute -bottom-4 -left-12 z-20 ml-10"
                >
                    <div
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap"
                        style={{
                            background: 'rgba(19,19,31,0.85)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                        }}
                    >
                        <span className="text-secondary font-bold">2+</span>
                        años de exp.
                    </div>
                </motion.div>

                {/* Floating decoration: Available dot (bottom-right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 1, duration: 0.3, type: 'spring'}}
                    className="absolute -bottom-2 -right-2 z-20"
                >
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-emerald-500/30 text-xs font-medium text-emerald-400"
                        style={{
                            background: 'rgba(16,185,129,0.1)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"/>
            </span>
                        Disponible
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
