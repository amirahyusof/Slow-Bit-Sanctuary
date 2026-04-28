/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Sky / Background colours ──────────────────
        'cream':          '#FFF8F0',
        'peach':          '#FFD6B3',
        'sunset-sky':     '#FF9A5C',
        'sunset-warm':    '#FFB347',

        // ── Plant / Garden colours ────────────────────
        'mint':           '#C8F0DC',
        'mint-dark':      '#81B89A',
        'sage':           '#81B89A',
        'leaf':           '#81C784',
        'leaf-light':     '#A5D6A7',

        // ── Soil colours (dry → rich) ─────────────────
        'soil-0':         '#F5DEB3',   // dry / new
        'soil-1':         '#D4A96A',   // slightly tended
        'soil-2':         '#B8884A',   // well tended
        'soil-3':         '#8B5E2E',   // rich / dark

        // ── Flower colours ────────────────────────────
        'pixel-pink':     '#FFB3C6',   // pink dahlia
        'pixel-purple':   '#C8A8E8',   // lavender tulip
        'pixel-peach':    '#FFD6B3',   // peach rose
        'pixel-orange':   '#FF9A5C',   // sunset marigold

        // ── UI / Text colours ─────────────────────────
        'lavender':       '#E8D5F5',
        'text-dark':      '#5C3D1E',
        'text-mid':       '#9B6B4A',
        'text-light':     '#C4A07A',
        'border-soil':    '#D4A96A',
      },

      fontFamily: {
        // Pixel font for titles and buttons
        'pixel': ['"Press Start 2P"', 'monospace'],
        // Soft round font for body text and inputs
        'sans':  ['"Nunito"', 'sans-serif'],
      },

      // Slow transition for Mom Mode atmosphere shift
      transitionDuration: {
        'mood': '2000ms',
      },

      // Pixel-perfect image rendering utility
      imageRendering: {
        'pixelated': 'pixelated',
      },
    },
  },
  plugins: [],
}
