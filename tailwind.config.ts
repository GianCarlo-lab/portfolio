import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          50: '#EDEFFD',
          100: '#C7CAFB',
          200: '#A5A9F8',
          300: '#8387F6',
          400: '#6164F3',
          500: '#6366F1',
          600: '#4F52EE',
          700: '#3B3EEB',
          800: '#2729E8',
          900: '#1315E5',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          50: '#F3EEFE',
          100: '#DDD0FC',
          200: '#C7B1FA',
          300: '#B193F8',
          400: '#9B74F7',
          500: '#8B5CF6',
          600: '#7748F4',
          700: '#6334F2',
          800: '#4F20F0',
          900: '#3B0CEE',
        },
        dark: {
          950: '#0A0A0F',
          900: '#0F0F1A',
          800: '#13131F',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(99,102,241,0.15)',
        'glow-lg': '0 0 80px rgba(99,102,241,0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        mesh: 'conic-gradient(from 180deg at 50% 50%, #0A0A0F 0deg, #0F0F1A 60deg, #0A0A0F 120deg, #0F0F1A 180deg, #0A0A0F 240deg, #0F0F1A 300deg, #0A0A0F 360deg)',
      },
    },
  },
  plugins: [],
}

export default config
