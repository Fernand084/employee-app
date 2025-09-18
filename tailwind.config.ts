// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita modo oscuro con clase CSS
  theme: {
    extend: {
      // Aquí puedes personalizar colores para el modo oscuro
      colors: {
        // Ejemplo de colores personalizados
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        foreground: {
          light: '#000000',
          dark: '#ffffff',
        }
      }
    },
  },
} satisfies Config