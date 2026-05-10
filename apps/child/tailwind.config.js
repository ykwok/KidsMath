/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0a0e27',
          800: '#0f172a',
          700: '#1e293b',
        },
        nebula: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#6366f1',
        },
        planet: {
          orange: '#f59e0b',
          teal: '#14b8a6',
          red: '#ef4444',
        },
        achievement: {
          gold: '#fbbf24',
          silver: '#94a3b8',
          bronze: '#b45309',
        },
        kid: {
          primary: '#f59e0b',
          success: '#22c55e',
          warning: '#f97316',
          error: '#ef4444',
        }
      },
      fontFamily: {
        rounded: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
