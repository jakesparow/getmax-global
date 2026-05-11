/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gx: {
          bg: '#0A0A0F',
          surface: '#0d0d14',
          card: '#111118',
          border: 'rgba(255,255,255,0.06)',
          borderHover: 'rgba(255,255,255,0.12)',
          text: '#e2e8f0',
          muted: '#94a3b8',
          dim: '#64748b',
          purple: '#a78bfa',
          purpleDeep: '#7c3aed',
          emerald: '#34d399',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#ec4899',
          indigo: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
