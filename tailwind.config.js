/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desia: {
          bg: "#090706",
          surface: "#14100e",
          card: "#1c1613",
          border: "#2e241f",
          borderHover: "#4a3a32",
          red: "#8b251a",
          darkred: "#52140e",
          terracotta: "#c2410c",
          ochre: "#d97706",
          gold: "#f59e0b",
          amber: "#fbbf24",
          clay: "#9a7b66",
          sand: "#e6d7c3",
          cream: "#f7f1e5"
        }
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'wave-bar': 'wave 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wave: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'desia-mesh': 'radial-gradient(at 0% 0%, rgba(139, 37, 26, 0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(194, 65, 12, 0.12) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(245, 158, 11, 0.05) 0px, transparent 60%)',
      }
    },
  },
  plugins: [],
}
