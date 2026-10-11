/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        carbon: { 950: '#F9FAFB', 900: '#FFFFFF', 800: '#F3F4F6', 700: '#E5E7EB', 600: '#4B5563' },
        amber: { 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706' },
        cyan: { 400: '#22D3EE', 500: '#06B6D4', 600: '#0891B2' },
        emerald: { 400: '#34D399', 500: '#10B981' },
        crimson: { 400: '#F87171', 500: '#EF4444' },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    }
  },
  plugins: [],
}
