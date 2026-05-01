// WatercolorPlant.jsx
// Replaces PixelPlant.jsx with organic, curved SVG illustrations.
// Growth stages use path curves instead of pixel rects.
// Each flower type has its own petal shape and colour.

export function getGrowthStage(timestamp) {
  if (!timestamp) return 0
  const days = Math.floor((Date.now() - timestamp) / 86400000)
  if (days >= 7) return 3
  if (days >= 4) return 2
  if (days >= 2) return 1
  return 0
}

export function getFlowerType(index) {
  const types = ['pink-dahlia','lavender-tulip','mint-daisy','peach-rose','sunset-marigold']
  return types[index % types.length]
}

const FLOWERS = {
  'pink-dahlia':     { petal: '#F4B8C8', center: '#F4907C', stem: '#8DAA91', leaf: '#A8C8AC' },
  'lavender-tulip':  { petal: '#C9B8D8', center: '#A890C0', stem: '#8DAA91', leaf: '#A8C8AC' },
  'mint-daisy':      { petal: '#B8E8D0', center: '#F4D87C', stem: '#8DAA91', leaf: '#A8C8AC' },
  'peach-rose':      { petal: '#F4D4B8', center: '#E8A87C', stem: '#8DAA91', leaf: '#A8C8AC' },
  'sunset-marigold': { petal: '#F4C87C', center: '#E89050', stem: '#8DAA91', leaf: '#A8C8AC' },
}

export default function WatercolorPlant({
  flowerType = 'pink-dahlia',
  growthStage = 0,
  size = 1,
  animate = true,
  style = {},
}) {
  const c = FLOWERS[flowerType] || FLOWERS['pink-dahlia']
  const w = 36 * size
  const h = 52 * size

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 36 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        animation: animate ? `float ${3 + (size * 0.5)}s ease-in-out infinite` : 'none',
        ...style,
      }}
    >
      {/* ── Pot (all stages) ──────────────────────────── */}
      {/* Pot body — rounded trapezoid */}
      <path d="M 10 46 L 8 52 L 28 52 L 26 46 Z" fill="#C2A38A" />
      <path d="M 9  46 L 27 46" stroke="#9C7A5C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pot rim */}
      <rect x="8" y="43" width="20" height="4" rx="2" fill="#D4B898" />
      {/* Soil in pot */}
      <ellipse cx="18" cy="43" rx="9" ry="2.5" fill="#9C7A5C" opacity="0.6" />

      {/* ── Stage 0: Tiny sprout ─────────────────────── */}
      {growthStage >= 0 && (
        <>
          {/* Short curved stem */}
          <path d="M 18 43 Q 17 38 18 34" stroke={c.stem} strokeWidth="2"
                fill="none" strokeLinecap="round" />
          {/* Two tiny seed leaves */}
          <ellipse cx="15" cy="35" rx="3.5" ry="2" fill={c.leaf}
                   transform="rotate(-30 15 35)" opacity="0.9" />
          <ellipse cx="21" cy="35" rx="3.5" ry="2" fill={c.leaf}
                   transform="rotate(30 21 35)" opacity="0.9" />
        </>
      )}

      {/* ── Stage 1: Stem + bigger leaves ───────────── */}
      {growthStage >= 1 && (
        <>
          {/* Taller organic stem — slight curve */}
          <path d="M 18 43 Q 16 35 18 24" stroke={c.stem} strokeWidth="2.5"
                fill="none" strokeLinecap="round" />
          {/* Left leaf — teardrop shape */}
          <path d="M 18 34 Q 10 30 9 24 Q 14 26 18 34" fill={c.leaf} opacity="0.85" />
          {/* Right leaf */}
          <path d="M 18 30 Q 26 26 27 20 Q 22 23 18 30" fill={c.leaf} opacity="0.85" />
          {/* Leaf vein details */}
          <path d="M 18 34 Q 12 29 10 24" stroke={c.stem} strokeWidth="0.6"
                fill="none" opacity="0.4" strokeLinecap="round" />
          <path d="M 18 30 Q 24 26 26 21" stroke={c.stem} strokeWidth="0.6"
                fill="none" opacity="0.4" strokeLinecap="round" />
        </>
      )}

      {/* ── Stage 2: Closed bud ──────────────────────── */}
      {growthStage >= 2 && (
        <>
          {/* Taller stem */}
          <path d="M 18 43 Q 15 32 18 14" stroke={c.stem} strokeWidth="2.5"
                fill="none" strokeLinecap="round" />
          {/* Closed bud — oval */}
          <ellipse cx="18" cy="12" rx="4" ry="6" fill={c.petal} opacity="0.9" />
          <ellipse cx="18" cy="10" rx="2.5" ry="4" fill={c.center} opacity="0.7" />
          {/* Sepal leaves at bud base */}
          <path d="M 14 16 Q 12 12 14 10" stroke={c.stem} strokeWidth="1.5"
                fill="none" strokeLinecap="round" />
          <path d="M 22 16 Q 24 12 22 10" stroke={c.stem} strokeWidth="1.5"
                fill="none" strokeLinecap="round" />
        </>
      )}

      {/* ── Stage 3: Full bloom ──────────────────────── */}
      {growthStage >= 3 && (
        <>
          {/* Full stem */}
          <path d="M 18 43 Q 15 32 18 14" stroke={c.stem} strokeWidth="2.5"
                fill="none" strokeLinecap="round" />

          {/* Petals — 5 organic ovals radiating from center */}
          <ellipse cx="18" cy="5"  rx="4" ry="5.5" fill={c.petal} opacity="0.88"
                   transform="rotate(0 18 12)" />
          <ellipse cx="25" cy="8"  rx="4" ry="5.5" fill={c.petal} opacity="0.82"
                   transform="rotate(72 18 12)" />
          <ellipse cx="23" cy="16" rx="4" ry="5.5" fill={c.petal} opacity="0.85"
                   transform="rotate(144 18 12)" />
          <ellipse cx="13" cy="16" rx="4" ry="5.5" fill={c.petal} opacity="0.82"
                   transform="rotate(216 18 12)" />
          <ellipse cx="11" cy="8"  rx="4" ry="5.5" fill={c.petal} opacity="0.88"
                   transform="rotate(288 18 12)" />

          {/* Flower center */}
          <circle cx="18" cy="12" r="5" fill={c.center} opacity="0.95" />
          {/* Center texture dots */}
          <circle cx="17" cy="11" r="1" fill="white" opacity="0.5" />
          <circle cx="20" cy="13" r="0.8" fill="white" opacity="0.4" />
        </>
      )}
    </svg>
  )
}
