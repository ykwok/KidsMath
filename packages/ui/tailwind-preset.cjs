/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "space-deep": "#0a0e27",
        "space-navy": "#141b3d",
        starlight: "#e8eaf6",
        "nebula-purple": "#7c4dff",
        "planet-orange": "#ff6d00",
        "achievement-gold": "#ffd600",
        "comet-blue": "#00b0ff",
        "cosmic-pink": "#ff4081",
        "asteroid-gray": "#90a4ae",
        "supernova-green": "#69f0ae",
      },
      fontSize: {
        "child-xs": ["0.875rem", { lineHeight: "1.25rem" }],
        "child-sm": ["1rem", { lineHeight: "1.5rem" }],
        "child-base": ["1.125rem", { lineHeight: "1.75rem" }],
        "child-lg": ["1.25rem", { lineHeight: "1.75rem" }],
        "child-xl": ["1.5rem", { lineHeight: "2rem" }],
        "child-2xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      borderRadius: {
        child: "1rem",
        "child-lg": "1.5rem",
      },
      spacing: {
        touch: "2.75rem",
        "touch-lg": "3.5rem",
      },
    },
  },
  plugins: [],
};
