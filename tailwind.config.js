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
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          borderLight: '#f1f5f9',
          text: '#1a1a2e',
          muted: '#64748b',
          indigo: '#4f46e5',
          indigoLight: '#6366f1',
          indigoBg: '#eef2ff',
          cyan: '#0891b2',
          cyanBg: '#ecfeff',
          emerald: '#059669',
          emeraldBg: '#ecfdf5',
          amber: '#d97706',
          amberBg: '#fffbeb',
          rose: '#e11d48',
          roseBg: '#fff1f2',
          purple: '#7c3aed',
          purpleBg: '#f5f3ff',
          sky: '#0284c7',
          skyBg: '#f0f9ff',
          teal: '#0d9488',
          tealBg: '#f0fdfa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
