/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Child app space theme
        space: {
          900: "#0a0e27",
          800: "#0f172a",
          700: "#1e293b",
        },
        nebula: {
          purple: "#8b5cf6",
          pink: "#ec4899",
          blue: "#6366f1",
        },
        planet: {
          orange: "#f59e0b",
          teal: "#14b8a6",
          red: "#ef4444",
        },
        achievement: {
          gold: "#fbbf24",
          silver: "#94a3b8",
          bronze: "#b45309",
        },
        // Parent app warm theme
        brand: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
        },
        warm: {
          50: "#faf9f7",
          100: "#f5f3ef",
          200: "#e8e4dc",
          300: "#d4cec2",
          400: "#a89f8d",
          500: "#8a7f6b",
          600: "#6b6354",
          700: "#4a453c",
        },
      },
      fontFamily: {
        rounded: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        mobile: "428px",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
