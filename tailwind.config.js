/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          DEFAULT: "#B91C1C",
          dark: "#7F1D1D",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light:   "#E5C158",
          dark:    "#B5952F",
        },
        maroon: {
          DEFAULT: "#6B1A1A",
          dark:    "#4A1010",
          light:   "#8B2525",
        },
        primary: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1E40AF",
          600: "#1E3A8A",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554",
        },
        secondary: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        footer: {
          DEFAULT: "#0F172A",
          light:   "#1E293B",
        },
        background: {
          DEFAULT: "#FFFFFF",
          subtle:  "#F8FAFC",
        },
      },
      fontFamily: {
        sans:   ["Inter", "system-ui", "sans-serif"],
        script: ["'Dancing Script'", "cursive"],
        serif:  ["'Playfair Display'", "Georgia", "serif"],
      },
      borderRadius: {
        card:   "1rem",
        button: "0.5rem",
      },
      boxShadow: {
        card:   "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        container: "1700px",
      },
    },
  },
  plugins: [],
};