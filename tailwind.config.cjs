/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'parchment':      '#FDFBF7',
        'cream':          '#FFF8F0',
        'sage':           '#8DAA91',
        'sage-light':     '#B8D4BC',
        'sage-dark':      '#5C8C64',
        'terracotta':     '#C2A38A',
        'terracotta-dk':  '#9C7A5C',
        'dusty-rose':     '#F4B8C8',
        'wc-lavender':    '#C9B8D8',
        'wc-peach':       '#F4D4B8',
        'marigold':       '#F4C87C',
        'wc-mint':        '#B8E8D0',
        'text-dark':      '#4A3728',
        'text-mid':       '#7A5C44',
        'text-light':     '#A88C74',
        'wc-border':      '#D4BCA8',
        // Mom Mode skies
        'sky-day-top':    '#FDE8D0',
        'sky-day-btm':    '#FFF8F0',
        'sky-sunset-top': '#F4A87C',
        'sky-sunset-btm': '#F4D4A0',
      },
      fontFamily: {
        'heading':     ['"Lora"', 'Georgia', 'serif'],
        'handwritten': ['"Indie Flower"', 'cursive'],
        'sans':        ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'wc':    '0 2px 12px rgba(139,94,46,0.08)',
        'wc-md': '0 4px 20px rgba(139,94,46,0.12)',
      },
      transitionDuration: {
        'mood': '2000ms',
      },
    },
  },
  plugins: [],
}
