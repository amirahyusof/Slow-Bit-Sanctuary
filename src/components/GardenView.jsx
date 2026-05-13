import { useState, useEffect } from 'react'
import {
  getAllEntriesSorted,
  getEntriesForMonth,
  getMonthWinCount,
  getCurrentStreak,
  formatDate,
} from '../utils/storage'

// ── IMPORT ASSETS ──
import staticBg from '../assets/static-background.png'
import dahliaImg from '../assets/pink_dahlia.png'
import tulipImg from '../assets/Purple & Pink Tulips.png'
import marigoldImg from '../assets/sunset_marigold.png'
import saplingImg from '../assets/Small Sapling_Tree.png'
import succulentImg from '../assets/Small Succulent.png'

const FLOWER_ASSETS = [dahliaImg, tulipImg, marigoldImg, saplingImg, succulentImg]

const MEADOW_COORDINATES = [
  { top: '72%', left: '15%', scale: 0.8 },
  { top: '74%', left: '35%', scale: 0.85 },
  { top: '71%', left: '55%', scale: 0.8 },
  { top: '75%', left: '75%', scale: 0.9 },
  { top: '73%', left: '90%', scale: 0.85 },
  { top: '80%', left: '10%', scale: 1.0 },
  { top: '83%', left: '25%', scale: 1.05 },
  { top: '81%', left: '45%', scale: 1.1 },
  { top: '84%', left: '65%', scale: 1.0 },
  { top: '81%', left: '85%', scale: 1.05 },
  { top: '89%', left: '18%', scale: 1.2 },
  { top: '92%', left: '38%', scale: 1.3 },
  { top: '91%', left: '58%', scale: 1.2 },
  { top: '93%', left: '78%', scale: 1.35 },
  { top: '88%', left: '5%', scale: 1.2 },
  { top: '89%', left: '50%', scale: 1.25 },
]

export default function GardenView({ momMode }) {
  const [entries, setEntries] = useState([])
  const [monthEntries, setMonthEntries] = useState([])
  const [winCount, setWinCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)
    const now = new Date()
    const month = getEntriesForMonth(now.getFullYear(), now.getMonth() + 1)
    setMonthEntries(month)
    setWinCount(getMonthWinCount(now.getFullYear(), now.getMonth() + 1))
    setStreak(getCurrentStreak())
  }, [])

  // Track window width for responsive grid gap
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const plantEntries = entries.filter((e) => e.mode === 'win')
  const now = new Date()
  const monthName = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })

  // Responsive gap calculation
  const gridGap = windowWidth < 768 ? '4px' : windowWidth < 1200 ? '6px' : '8px'
  
  // Responsive meadow height
  const isMobile = windowWidth < 768
  const isDesktop = windowWidth >= 1024
  const meadowHeight = isMobile ? '45vh' : isDesktop ? '55vh' : '50vh'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        height: '100%',
        backgroundColor: '#FDFBF7',
        boxSizing: 'border-box',
        gap: '12px',
      }}
    >
      {/* ── 1. MEADOW SCENE (responsive height) ────────────────────────────── */}
      <div
        style={{
          height: meadowHeight,
          position: 'relative',
          backgroundImage: `url(${staticBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          borderRadius: '30px',
          border: '1px solid rgba(139, 94, 46, 0.1)',
          flexShrink: 0,
        }}
      >
        {/* Sunset overlay when Mom Mode is 'sunset' */}
        {momMode === 'sunset' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,140,0,0.2) 0%, rgba(255,69,0,0.1) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}

        {/* Render flower assets in meadow */}
        {plantEntries.slice(0, MEADOW_COORDINATES.length).map((entry, i) => {
          const coord = MEADOW_COORDINATES[i]
          const flowerImg = FLOWER_ASSETS[i % FLOWER_ASSETS.length]

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: coord.top,
                left: coord.left,
                zIndex: parseInt(coord.top),
                transform: `scale(${coord.scale}) translate(-50%, -100%)`,
                width: '100px',
                mixBlendMode: 'normal',
                opacity: 0.95,
                animation: `sway ${4 + (i % 2)}s ease-in-out infinite`,
                imageRendering: 'auto',
                cursor: 'default',
              }}
            >
              <img
                src={flowerImg}
                alt="flower"
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))',
                  display: 'block',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* ── 2. GARDEN INFO & STATS (50vh) ────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: '16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          color: '#4A3728',
        }}
      >
        {/* Row 1: Month title + StatChips */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: '22px',
                color: '#A88C74',
                margin: 0,
              }}
            >
              {monthName}
            </h2>
            <p
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: '13px',
                color: '#A88C74',
                margin: 0,
              }}
            >
              {winCount} plant{winCount !== 1 ? 's' : ''} grown this month
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <StatChip value={winCount} label="Logged" />
            <StatChip value={streak} label="Day Streak" />
          </div>
        </div>

        {/* Row 2: Floral contribution grid */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(241, 228, 216, 0.25)',
            borderRadius: '20px',
            padding: '12px 16px',
            border: '1px solid rgba(194, 163, 138, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <p
            style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize: '13px',
              color: '#A88C74',
              margin: '0 0 10px 4px',
            }}
          >
            this month at a glance
          </p>
          <FloralGrid
            entries={monthEntries}
            flowerAssets={FLOWER_ASSETS}
            gap={gridGap}
          />
        </div>
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% {
            transform: scale(var(--tw-scale-x, 1)) rotate(-1.5deg) translate(-50%, -100%);
          }
          50% {
            transform: scale(var(--tw-scale-x, 1)) rotate(1.5deg) translate(-50%, -100%);
          }
        }
      `}</style>
    </div>
  )
}

// ── StatChip Component ────────────────────────────────────────────
function StatChip({ value, label }) {
  return (
    <div
      style={{
        background: 'rgba(255, 240, 210, 0.6)',
        border: '1.5px solid rgba(194, 163, 138, 0.3)',
        borderRadius: '14px',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '65px',
        transition: 'all 0.2s',
      }}
    >
      <span
        style={{
          fontFamily: '"Lora", serif',
          fontSize: '18px',
          fontWeight: '700',
          color: '#5C3D1E',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize: '9px',
          color: '#A88C74',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── FloralGrid Component (Linear 11-column grid) ──────────────────────
function FloralGrid({ entries, flowerAssets, gap }) {
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

  const entryMap = {}
  entries.forEach((e) => {
    const day = parseInt(e.key.split('-')[2])
    entryMap[day] = e
  })

  const todayDate = now.getDate()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(11, 1fr)',
        background: 'rgba(253, 251, 247, 0.5)',
        gap: gap,
        width: '100%',
      }}
    >
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const entry = entryMap[day]
        const isToday = day === todayDate
        const flowerImg = flowerAssets[i % flowerAssets.length]

        return (
          <div
            key={day}
            style={{
              aspectRatio: '1',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: entry
                ? entry.mode === 'rest'
                  ? 'rgba(201, 184, 216, 0.3)'
                  : 'rgba(244, 184, 200, 0.4)'
                : 'rgba(194, 163, 138, 0.08)',
              border: isToday
                ? '2.5px solid #FF9A5C'
                : '1px solid rgba(194, 163, 138, 0.1)',
              position: 'relative',
              color: '#7A5C44',
              transition: 'all 0.2s ease',
              cursor: entry ? 'pointer' : 'default',
            }}
            onMouseEnter={(e) => {
              if (entry) {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.boxShadow =
                  '0 2px 8px rgba(194,163,138,0.2)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Display flower for win days */}
            {entry?.mode === 'win' && (
              <img
                src={flowerImg}
                alt="win"
                style={{ width: '75%', height: '75%', objectFit: 'contain' }}
              />
            )}

            {/* PHASE 3C: Changed from 🌙 to ☕ for consistency */}
            {entry?.mode === 'rest' && (
              <span style={{ fontSize: '20px' }}>☕</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

