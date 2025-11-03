/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta morado/azul del diseño original
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#667eea', // Color principal
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          500: '#764ba2', // Color secundario del gradiente
        },
        accent: {
          green: '#2ecc71',
          red: '#e74c3c',
          'green-dark': '#27ae60',
          'red-dark': '#c0392b',
        },
        dark: {
          500: '#2c3e50',
          600: '#34495e',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2c3e50, #34495e)',
        'gradient-success': 'linear-gradient(90deg, #2ecc71, #27ae60)',
        'gradient-danger': 'linear-gradient(90deg, #e74c3c, #c0392b)',
      },
      boxShadow: {
        'card': '0 8px 25px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 12px 35px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
