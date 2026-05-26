import React, { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import '@/styles/globals.css'

const WA_URL =
  'https://wa.me/51952761415?text=Hola%20Gian%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre%20un%20proyecto.'

interface LayoutProps {
  children: ReactNode
}

function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed z-50 bottom-8 right-8 max-sm:bottom-6 max-sm:right-6"
    >
      <div className="relative flex items-center">
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-full mr-3 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-white pointer-events-none"
              style={{ background: 'rgba(37,211,102,0.9)', backdropFilter: 'blur(6px)' }}
            >
              ¡Escríbeme!
            </motion.span>
          )}
        </AnimatePresence>

        {/* FAB button */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear por WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 w-14 h-14 max-sm:w-12 max-sm:h-12"
          style={{
            background: '#25D366',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          }}
        >
          {React.createElement(SiWhatsapp as any, { size: 26, color: 'white' })}
        </a>
      </div>
    </motion.div>
  )
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}
