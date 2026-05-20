import { useState, useEffect } from 'react'
import {
  getEntriesForMonth,
  getMonthWinCount,
  getCurrentStreak,
  formatDate,
  todayKey,
} from '../utils/storage'
import {getAffirmation} from '../utils/affirmations'

// ── IMPORT ASSETS ──
import staticBg from '../assets/static-background.png'
import dahliaImg from '../assets/pink_dahlia.png'
import tulipImg from '../assets/pink_purple_tulip.png'
import marigoldImg from '../assets/sunset_marigold.png'
import saplingImg from '../assets/Small Sapling_Tree.png'
import succulentImg from '../assets/Small Succulent.png'
import lavenderImg from '../assets/lavender_tulip.png'
import mintDaisyImg from '../assets/mint_daisy.png'
import peachRoseImg from '../assets/peach_rose.png'
import pinkpurpleDahliaImg from '../assets/pink_purple_dahlia.png'

import {setFlowerAssets, getFlowerImage} from '../utils/flowerMatcher'

const FLOWER_ASSETS = [
  dahliaImg, 
  tulipImg, 
  marigoldImg, 
  saplingImg, 
  succulentImg, 
  lavenderImg, 
  mintDaisyImg, 
  peachRoseImg, 
  pinkpurpleDahliaImg
]

setFlowerAssets(FLOWER_ASSETS) // Initialize flower assets in matcher

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

export default function GardenView({ momMode, isResting }) {
  const [monthEntries, setMonthEntries] = useState([])
  const [monthWinCount, setMonthWinCount] = useState(0) // FIXED: Current month only
  const [monthPlantCount, setMonthPlantCount] = useState(0) // FIXED: Count plants in grid
  const [allTimeStreak, setAllTimeStreak] = useState(0) // All-time streak
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const affirmation = getAffirmation(allTimeStreak, isResting)

  useEffect(() => {
    const now = new Date()
    
    // Get current month entries
    const month = getEntriesForMonth(now.getFullYear(), now.getMonth() + 1)
    setMonthEntries(month)
    
    // FIXED: Count wins in current month only
    setMonthWinCount(getMonthWinCount(now.getFullYear(), now.getMonth() + 1))
    
    // FIXED: Count plants (win entries) in current month only
    const currentMonthPlants = month.filter((e) => e.mode === 'win').length
    setMonthPlantCount(currentMonthPlants)
    
    // All-time streak
    setAllTimeStreak(getCurrentStreak())
  }, [])

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // FIXED: Filter to CURRENT MONTH wins only (not all-time)
  const currentMonthWins = monthEntries.filter((e) => e.mode === 'win')

  const now = new Date()
  const monthName = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })

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
      {/* 1. MEADOW SCENE (responsive height)  */}
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

        {/* FIXED: Show CURRENT MONTH wins only in meadow */}
        {currentMonthWins.slice(0, MEADOW_COORDINATES.length).map((entry, i) => {
          const coord = MEADOW_COORDINATES[i]
          const flowerImg = getFlowerImage(entry.wins[0]?.flower || 'pink-dahlia')

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: coord.top,
                left: coord.left,
                zIndex: parseInt(coord.top),
                // FIXED: Flowers anchored to soil (use -85% instead of -100%)
                transform: `scale(${coord.scale}) translate(-50%, -85%)`,
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

      {/* New: Daily Affirmation */}
      <div style={{
        margin: '12px 0',
        padding: '12px 16px',
        background: 'rgba(141, 170, 145, 0.1)',
        borderLeft: '3px solid #8DAA91',
        borderRadius: '8px',
      }}>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize: '14px',
          color: '#5C8C64',
          fontStyle: 'italic',
        }}>
          {affirmation}
        </p>
      </div>

      {/* ── 2. GARDEN INFO & STATS (responsive, fills remaining space) ────────────────────────── */}
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
              {/* FIXED: Show current month plant count */}
              {monthPlantCount} plant{monthPlantCount !== 1 ? 's' : ''} grown this month
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* FIXED: StatChips show current month only */}
            <StatChip value={monthPlantCount} label="This Month" />
            <StatChip value={allTimeStreak} label="Current Streak" />
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
          <FloralGrid entries={monthEntries} />
        </div>
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% {
            transform: scale(var(--tw-scale-x, 1)) rotate(-1.5deg) translate(-50%, -85%);
          }
          50% {
            transform: scale(var(--tw-scale-x, 1)) rotate(1.5deg) translate(-50%, -85%);
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
function FloralGrid({ entries }) {
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
        gap: '6px',
        width: '100%',
      }}
    >
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1
        const entry = entryMap[day]
        const isToday = day === todayDate

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
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(194,163,138,0.2)'
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
                src={getFlowerImage(entry.wins[0]?.flower || 'pink-dahlia')}
                alt="win"
                style={{ width: '75%', height: '75%', objectFit: 'contain' }}
              />
            )}

            {/* Rest icon - Changed from 🌙 to ☕ for consistency */}
            {entry?.mode === 'rest' && (
              <span style={{ fontSize: '20px' }}>☕</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

