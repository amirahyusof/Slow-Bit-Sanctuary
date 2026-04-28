// PixelPlant.jsx
// A reusable pixel SVG plant that renders differently based on:
//   - growthStage: 0 (sprout) → 1 (seedling) → 2 (bud) → 3 (bloom)
//   - flowerType:  'pink-dahlia' | 'lavender-tulip' | 'mint-daisy' |
//                  'peach-rose' | 'sunset-marigold'
//
// Growth stage is calculated from how many days ago the entry was made:
//   Day 1      → stage 0 (tiny sprout)
//   Days 2–3   → stage 1 (stem + leaves)
//   Days 4–6   → stage 2 (closed bud)
//   Day 7+     → stage 3 (full bloom)

// ── Flower colour map ─────────────────────────────────────────
const FLOWER_COLOURS = {
  'pink-dahlia':      { petals: '#FFB3C6', center: '#FF7096', stem: '#81C784', leaf: '#A5D6A7' },
  'lavender-tulip':   { petals: '#C8A8E8', center: '#A080C8', stem: '#81C784', leaf: '#A5D6A7' },
  'mint-daisy':       { petals: '#C8F0DC', center: '#FFE08A', stem: '#81C784', leaf: '#A5D6A7' },
  'peach-rose':       { petals: '#FFD6B3', center: '#FFB380', stem: '#81C784', leaf: '#A5D6A7' },
  'sunset-marigold':  { petals: '#FF9A5C', center: '#FFD06A', stem: '#81C784', leaf: '#A5D6A7' },
}

// ── Growth stage calculator ───────────────────────────────────
export function getGrowthStage(timestamp) {
  if (!timestamp) return 0
  const daysSince = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24))
  if (daysSince >= 7) return 3   // full bloom
  if (daysSince >= 4) return 2   // closed bud
  if (daysSince >= 2) return 1   // stem + leaves
  return 0                        // tiny sprout
}

// ── Flower type assigner ──────────────────────────────────────
// Cycles through flower types in order of entry index.
const FLOWER_ORDER = [
  'pink-dahlia',
  'lavender-tulip',
  'mint-daisy',
  'peach-rose',
  'sunset-marigold',
]

export function getFlowerType(entryIndex) {
  return FLOWER_ORDER[entryIndex % FLOWER_ORDER.length]
}

// ── The pixel plant SVG ───────────────────────────────────────
// All drawn on a 20×32 pixel grid.
// Each growth stage adds more visual complexity.

export default function PixelPlant({ flowerType = 'pink-dahlia', growthStage = 0, size = 1 }) {
  const c   = FLOWER_COLOURS[flowerType] || FLOWER_COLOURS['pink-dahlia']
  const w   = 20 * size
  const h   = 32 * size

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 20 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* ── Stage 0: tiny sprout ─────────────────────────── */}
      {growthStage >= 0 && (
        <>
          {/* Short stem */}
          <rect x="9"  y="22" width="2" height="8"  fill={c.stem} />
          {/* Pot */}
          <rect x="6"  y="28" width="8" height="4"  fill="#D4A96A" />
          <rect x="7"  y="26" width="6" height="2"  fill="#B8884A" />
          {/* Tiny sprout tip */}
          <rect x="8"  y="20" width="4" height="2"  fill={c.leaf} />
        </>
      )}

      {/* ── Stage 1: stem + first leaves ─────────────────── */}
      {growthStage >= 1 && (
        <>
          {/* Taller stem (overwrites short one) */}
          <rect x="9"  y="14" width="2" height="16" fill={c.stem} />
          {/* Left leaf */}
          <rect x="5"  y="18" width="4" height="2"  fill={c.leaf} />
          <rect x="4"  y="16" width="2" height="2"  fill={c.leaf} />
          {/* Right leaf */}
          <rect x="11" y="15" width="4" height="2"  fill={c.leaf} />
          <rect x="14" y="13" width="2" height="2"  fill={c.leaf} />
        </>
      )}

      {/* ── Stage 2: closed bud ──────────────────────────── */}
      {growthStage >= 2 && (
        <>
          {/* Stem goes higher */}
          <rect x="9"  y="8"  width="2" height="22" fill={c.stem} />
          {/* Bud (closed) */}
          <rect x="8"  y="4"  width="4" height="4"  fill={c.petals} />
          <rect x="9"  y="2"  width="2" height="4"  fill={c.center} />
          {/* Bud leaves */}
          <rect x="6"  y="6"  width="2" height="2"  fill={c.leaf} />
          <rect x="12" y="6"  width="2" height="2"  fill={c.leaf} />
        </>
      )}

      {/* ── Stage 3: full bloom ───────────────────────────── */}
      {growthStage >= 3 && (
        <>
          {/* Full flower — petals in 4 directions */}
          <rect x="9"  y="0"  width="2" height="3"  fill={c.petals} />  {/* top */}
          <rect x="9"  y="7"  width="2" height="3"  fill={c.petals} />  {/* bottom */}
          <rect x="6"  y="3"  width="3" height="2"  fill={c.petals} />  {/* left */}
          <rect x="11" y="3"  width="3" height="2"  fill={c.petals} />  {/* right */}
          {/* Diagonal petals */}
          <rect x="6"  y="5"  width="2" height="2"  fill={c.petals} />
          <rect x="12" y="5"  width="2" height="2"  fill={c.petals} />
          {/* Flower center */}
          <rect x="8"  y="3"  width="4" height="4"  fill={c.center} />
          {/* Center dot */}
          <rect x="9"  y="4"  width="2" height="2"  fill={c.petals} />
        </>
      )}
    </svg>
  )
}
