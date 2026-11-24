/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#08050A',
        burgundy: '#270819',
        'burgundy-deep': '#1A0410',
        'romantic-pink': '#FF4FA3',
        'soft-pink': '#FFB6D9',
        'rose-red': '#FF315D',
        'card-pink': '#F9C7DF',
        'blush': '#FFE3EE',
        'glow-pink': 'rgba(255, 79, 163, 0.45)',
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'pink-glow': '0 0 25px rgba(255, 79, 163, 0.55)',
        'pink-glow-lg': '0 0 50px rgba(255, 79, 163, 0.7)',
        'rose-glow': '0 0 30px rgba(255, 49, 93, 0.55)',
        'card-shadow': '0 20px 40px -10px rgba(39, 8, 25, 0.6), 0 0 20px rgba(255, 79, 163, 0.2)',
      },
      animation: {
        'heartbeat': 'heartbeat 1.6s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.25)' },
          '70%': { transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
