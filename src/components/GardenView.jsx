// GardenView.jsx — Phase 3: Lush Layered Garden
// Uses absolute positioning to create depth and overlapping plants.
// Adds floral contribution grid (like GitHub contributions).
// Includes organic SVG soil texture and floating elements.
// ENHANCEMENT: Day labels added below each plant
// Fully responsive with stat chips and streak counter.

import { useState, useEffect } from 'react'
import WatercolorPlant, { getGrowthStage, getFlowerType } from './WatercolorPlant'
import {
  getAllEntriesSorted,
  getEntriesForMonth,
  getMonthWinCount,
  getCurrentStreak,
  todayKey,
  formatDate,
} from '../utils/storage'

export default function GardenView({ momMode }) {
  const [entries, setEntries] = useState([])
  const [monthEntries, setMonthEntries] = useState([])
  const [winCount, setWinCount] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)

    const now = new Date()
    const month = getEntriesForMonth(now.getFullYear(), now.getMonth() + 1)
    setMonthEntries(month)
    setWinCount(getMonthWinCount(now.getFullYear(), now.getMonth() + 1))
    setStreak(getCurrentStreak())
  }, [])

  const now = new Date()
  const monthName = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })

  // Only wins create visible plants
  const plantEntries = entries.filter(e => e.mode === 'win')
  const flowerTypes = new Set(plantEntries.map((e, i) => e.flower || getFlowerType(i)))

  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #F4A87C 0%, #FFB347 60%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8D0 0%, #FFF0E0 60%, #F5DEB3 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Sky scene with layered plants ─────────────────── */}
      <div
        style={{
          background: skyBg,
          transition: 'background 2000ms ease',
          minHeight: '240px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0 0 24px 24px',
        }}
      >
        {/* Floating decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '15%',
            fontSize: '18px',
            animation: 'flutter 4s ease-in-out infinite',
          }}
        >
          🦋
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '20%',
            fontSize: '18px',
            animation: 'flutter 5s ease-in-out infinite 1.5s',
          }}
        >
          🦋
        </div>
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '40%',
            fontSize: '16px',
            animation: 'flutter 3.5s ease-in-out infinite 0.8s',
          }}
        >
          🐝
        </div>

        {/* Sparkles */}
        {[
          { top: '30px', left: '60%' },
          { top: '80px', left: '25%' },
          { top: '40px', right: '30%' },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.8)',
              animation: `sparkle 2s ease-in-out infinite ${i * 0.6}s`,
            }}
          />
        ))}

        {/* ── Layered plants (absolute positioning) ───────── */}
        <div
          style={{
            position: 'relative',
            height: '180px',
            width: '100%',
          }}
        >
          {plantEntries.length === 0 ? (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontFamily: '"Indie Flower", cursive',
                fontSize: '14px',
                color: '#B89C88',
                lineHeight: '1.8',
              }}
            >
              <div>Your first win will plant</div>
              <div>the first flower 🌱</div>
            </div>
          ) : (
            plantEntries.map((entry, i) => {
              const stage = getGrowthStage(entry.timestamp)
              const flowerKey = entry.flower || getFlowerType(i)

              // Spread plants across the width organically
              const leftPercent = ((i * 13) % 88) + 5
              const bottomOffset = ((i % 4) * 8) // Stagger vertically for depth

              // Vary sizes slightly
              const sizeVariants = [0.85, 0.95, 1.0, 0.9, 1.05]
              const size = sizeVariants[i % sizeVariants.length]

              const zIndex = bottomOffset // Higher bottom = higher z-index (less behind)

              return (
                <div
                  key={entry.key || i}
                  title={entry.text}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    bottom: `${bottomOffset}px`,
                    zIndex: zIndex,
                    animation: `plantGrow 0.6s cubic-bezier(0.36, 1.56, 0.64, 1) ${i * 0.05}s both`,
                    filter: 'drop-shadow(0 2px 6px rgba(139,94,46,0.08))',
                    cursor: 'default',
                  }}
                >
                  <WatercolorPlant
                    flowerType={flowerKey}
                    growthStage={stage}
                    size={size}
                    animate={true}
                  />
                </div>
              )
            })
          )}
        </div>

        {/* ── Soil strip ────────────────────────────────── */}
        <SoilStrip winsCount={winCount} />
      </div>

      {/* ── Garden info ───────────────────────────────────── */}
      <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Month label */}
        <p
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '13px',
            color: '#A88C74',
            margin: 0,
          }}
        >
          {monthName} · {plantEntries.length} plant{plantEntries.length !== 1 ? 's' : ''} grown
        </p>

        {/* Stat chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <StatChip value={winCount} label="days\nlogged" />
          <StatChip value={streak} label="day\nstreak" />
          <StatChip value={flowerTypes.size} label="plants\ngrowing" />
        </div>

        {/* Floral contribution grid */}
        <div>
          <p
            style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize: '12px',
              color: '#A88C74',
              margin: '0 0 8px',
            }}
          >
            this month at a glance
          </p>
          <FloralGrid entries={monthEntries} />
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────── */}
      <style>{`
        @keyframes plantGrow {
          from {
            opacity: 0;
            transform: translateY(12px) scaleY(0.7);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }
        @keyframes flutter {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(4px); }
          66% { transform: translateY(-4px) translateX(-3px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ── Stat chip component ────────────────────────────────────
function StatChip({ value, label }) {
  return (
    <div
      style={{
        background: 'rgba(255, 240, 210, 0.6)',
        border: '1.5px solid rgba(194, 163, 138, 0.4)',
        borderRadius: '12px',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        flex: 1,
        minWidth: '70px',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255, 220, 179, 0.8)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255, 240, 210, 0.6)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span
        style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize: '18px',
          fontWeight: '700',
          color: '#5C3D1E',
          lineHeight: '1',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize: '10px',
          color: '#A88C74',
          textAlign: 'center',
          lineHeight: '1.3',
          whiteSpace: 'pre-wrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Floral contribution grid (GitHub-style) ────────────────
function FloralGrid({ entries }) {
  const now = new Date()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay()

  const entryMap = {}
  entries.forEach(e => {
    const day = parseInt(e.key.split('-')[2])
    entryMap[day] = e
  })

  const todayDate = now.getDate()

  return (
    <div>
      {/* Day headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '4px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: '600',
              color: '#A88C74',
              padding: '2px 0',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid with flowers and day numbers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          background: 'rgba(253, 251, 247, 0.5)',
          padding: '10px',
          borderRadius: '12px',
          border: '1px solid rgba(194, 163, 138, 0.15)',
        }}
      >
        {/* Empty cells for days before month */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} style={{ aspectRatio: '1' }} />
        ))}

        {/* Days with entries */}
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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                fontSize: '12px',
                fontWeight: '500',
                background: entry
                  ? entry.mode === 'rest'
                    ? 'rgba(201, 184, 216, 0.3)'
                    : 'rgba(244, 184, 200, 0.4)'
                  : 'rgba(194, 163, 138, 0.08)',
                border: isToday ? '2px solid #FF9A5C' : '1px solid rgba(194, 163, 138, 0.1)',
                color: '#7A5C44',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                if (entry) {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(194,163,138,0.2)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              title={entry ? formatDate(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`) : ''}
            >
              {/* Flower or rest icon */}
              {entry && (
                <span style={{ fontSize: '20px' }}>
                  {entry.mode === 'rest' ? '🌙' : '🌸'}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Organic soil strip ─────────────────────────────────────
function SoilStrip({ winsCount }) {
  const SOIL_COLORS = [
    '#F5DEB3', '#EDD09A', '#E5C882', '#D4A96A',
    '#C8985A', '#BC8A4C', '#B8884A', '#A87840',
    '#9C6C36', '#8B5E2E',
  ]
  const TOTAL_CELLS = 32
  const filledCells = Math.min(winsCount * 2, TOTAL_CELLS)
  const richColorIdx = Math.floor((filledCells / TOTAL_CELLS) * (SOIL_COLORS.length - 1))
  const richColor = SOIL_COLORS[Math.min(richColorIdx + 1, SOIL_COLORS.length - 1)]

  return (
    <div
      style={{
        display: 'flex',
        height: '24px',
        width: '100%',
        overflow: 'hidden',
        background: `linear-gradient(to bottom, ${SOIL_COLORS[0]}, ${SOIL_COLORS[3]})`,
        position: 'relative',
      }}
    >
      {/* SVG texture overlay */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15, mixBlendMode: 'multiply' }}>
        <defs>
          <filter id="soilNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#soilNoise)" />
      </svg>

      {/* Color gradient cells */}
      {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: `${100 / TOTAL_CELLS}%`,
            height: '100%',
            backgroundColor: i < filledCells ? richColor : SOIL_COLORS[0],
            transition: 'background-color 1.5s ease',
            borderRight: '0.5px solid rgba(139,94,46,0.1)',
          }}
        />
      ))}
    </div>
  )
}
