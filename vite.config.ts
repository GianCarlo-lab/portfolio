import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-icons')) return 'icons'
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('@emailjs')) return 'emailjs'
          if (id.includes('react-hook-form')) return 'forms'
          if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
