/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#3b82f6',
            600: '#2563eb',
          },
          // Add dark mode colors
          dark: {
            700: '#1f2937',
            800: '#111827',
            900: '#0f172a',
          }
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          // Add toggle animation
          'toggle-dark': 'toggleDark 0.4s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          // Add toggle animation keyframes
          toggleDark: {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(0.8)' },
            '100%': { transform: 'scale(1)' },
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
      },
    },
    plugins: [
     
    ],
  }