// GardenView.jsx
// Phase 2: The full garden scene.
//
// Shows:
//   - A pixel garden filled with plants from LocalStorage entries
//   - Plants grow taller/bloom based on how many days ago they were logged
//   - A pixel soil strip below the garden
//   - Month label + stats (days logged, streak, plant count)
//   - Mini month-at-a-glance calendar strip at the bottom

import { useState, useEffect } from 'react'
import PixelPlant, { getGrowthStage, getFlowerType } from './PixelPlant'
import {
  getAllEntriesSorted,
  getEntriesForMonth,
  getMonthWinCount,
  getCurrentStreak,
  todayKey,
} from '../utils/storage'

// ── Pixel watering can SVG ────────────────────────────────────
// Shown in the garden scene as a decorative element
function WateringCan({ tipped = false }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering: 'pixelated',
        transform:      tipped ? 'rotate(-30deg)' : 'none',
        transition:     'transform 0.6s ease',
        display:        'block',
      }}
    >
      {/* Can body */}
      <rect x="4"  y="10" width="14" height="10" fill="#C8A8E8" />
      {/* Spout */}
      <rect x="18" y="12" width="6"  height="2"  fill="#C8A8E8" />
      <rect x="22" y="10" width="2"  height="4"  fill="#C8A8E8" />
      {/* Handle */}
      <rect x="2"  y="8"  width="2"  height="8"  fill="#A080C8" />
      {/* Lid */}
      <rect x="5"  y="8"  width="12" height="2"  fill="#A080C8" />
      {/* Water drops when tipped */}
      {tipped && (
        <>
          <rect x="22" y="15" width="2" height="3" fill="#C8F0DC" />
          <rect x="24" y="18" width="2" height="2" fill="#C8F0DC" />
          <rect x="20" y="19" width="2" height="2" fill="#C8F0DC" />
        </>
      )}
    </svg>
  )
}

// ── Mini calendar strip ───────────────────────────────────────
function MiniCalendar({ year, month, entries }) {
  const today  = todayKey()
  const daysIn = new Date(year, month, 0).getDate()    // total days in month
  const entryKeys = new Set(entries.map(e => e.key))

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
      {Array.from({ length: daysIn }).map((_, i) => {
        const dayNum = i + 1
        const key    = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
        const hasEntry = entryKeys.has(key)
        const isToday  = key === today

        return (
          <div
            key={key}
            title={hasEntry ? key : ''}
            style={{
              width:           '10px',
              height:          '10px',
              borderRadius:    isToday ? '50%' : '1px',
              backgroundColor: isToday  ? '#FFB347'
                             : hasEntry ? '#81C784'
                             : '#F5DEB3',
              border:          isToday ? '1.5px solid #E07030' : 'none',
              flexShrink:      0,
            }}
          />
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function GardenView({ momMode }) {
  const [entries, setEntries] = useState([])
  const [showTipped, setShowTipped] = useState(false)

  // Reload entries when the garden tab is opened
  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)
  }, [])

  // Briefly tip the watering can as a welcome animation
  useEffect(() => {
    const t = setTimeout(() => setShowTipped(true),  600)
    const t2 = setTimeout(() => setShowTipped(false), 2000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const now         = new Date()
  const year        = now.getFullYear()
  const month       = now.getMonth() + 1
  const monthName   = now.toLocaleString('en-GB', { month: 'long' })
  const monthEntries = getEntriesForMonth(year, month)
  const winCount    = getMonthWinCount(year, month)
  const streak      = getCurrentStreak()

  // Only "win" entries grow plants in the garden
  const plantEntries = entries.filter(e => e.mode === 'win')

  // Sky colour based on mom mode
  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #FF9A5C 0%, #FFB347 60%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8C8 0%, #FFF0E0 60%, #F5DEB3 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Garden sky scene ─────────────────────────────── */}
      <div
        style={{
          background:     skyBg,
          transition:     'background 2000ms ease',
          minHeight:      '220px',
          padding:        '16px 16px 0',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'flex-end',
        }}
      >

        {/* Watering can — top right */}
        <div style={{
          position:      'absolute',
          // We use relative positioning trick via flex instead
          alignSelf:     'flex-end',
          marginBottom:  '8px',
          marginRight:   '8px',
        }}>
          <WateringCan tipped={showTipped} />
        </div>

        {/* Empty garden message */}
        {plantEntries.length === 0 && (
          <div style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            flex:           1,
            paddingBottom:  '32px',
            gap:            '8px',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '6px',
              color:      '#C4A07A',
              textAlign:  'center',
              lineHeight: '2.2',
            }}>
              your garden is waiting.<br />
              log your first win<br />
              to plant something. 🌱
            </p>
          </div>
        )}

        {/* ── Plant rows ───────────────────────────────── */}
        {plantEntries.length > 0 && (
          <div style={{
            display:        'flex',
            flexWrap:       'wrap',
            alignItems:     'flex-end',
            gap:            '6px',
            paddingBottom:  '4px',
            justifyContent: 'flex-start',
            minHeight:      '140px',
          }}>
            {plantEntries.map((entry, index) => {
              const stage      = getGrowthStage(entry.timestamp)
              const flowerType = entry.flower || getFlowerType(index)
              // Vary plant sizes slightly for a natural look
              const sizeVariants = [1, 1.1, 0.9, 1.05, 0.95]
              const size = sizeVariants[index % sizeVariants.length]

              return (
                <div
                  key={entry.key}
                  title={entry.text}
                  style={{
                    // Staggered entrance animation via inline style
                    animation:       `plantGrow 0.4s ease ${index * 0.05}s both`,
                    cursor:          'default',
                  }}
                >
                  <PixelPlant
                    flowerType={flowerType}
                    growthStage={stage}
                    size={size}
                  />
                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* ── Pixel soil strip ─────────────────────────────── */}
      <SoilStrip winsCount={winCount} />

      {/* ── Stats + mini calendar ────────────────────────── */}
      <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Month label */}
        <p style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize:   '6px',
          color:      '#7B4F2E',
          margin:     0,
          lineHeight: '1.8',
        }}>
          {monthName} {year} · {plantEntries.length} plant{plantEntries.length !== 1 ? 's' : ''} grown
        </p>

        {/* Stat chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <StatChip value={winCount}     label={'days\nlogged'} />
          <StatChip value={streak}       label={'day\nstreak'} />
          <StatChip value={plantEntries.length} label={'plants\ngrowing'} />
        </div>

        {/* Mini calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize:   '5px',
            color:      '#C4A07A',
            margin:     0,
          }}>
            this month at a glance
          </p>
          <MiniCalendar year={year} month={month} entries={monthEntries} />
        </div>

      </div>

      {/* ── CSS keyframe for plant entrance ──────────────── */}
      <style>{`
        @keyframes plantGrow {
          from { opacity: 0; transform: translateY(8px) scale(0.8); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }
      `}</style>

    </div>
  )
}

// ── Soil strip component ──────────────────────────────────────
// Gets richer/darker as more wins are logged
function SoilStrip({ winsCount }) {
  const SOIL_COLOURS = [
    '#F5DEB3', '#EDD09A', '#E5C882', '#D4A96A',
    '#C8985A', '#BC8A4C', '#B8884A', '#A87840',
    '#9C6C36', '#8B5E2E',
  ]
  const TOTAL = 32
  const filled  = Math.min(winsCount * 2, TOTAL)   // 2 cells per win
  const richIdx = Math.floor((filled / TOTAL) * (SOIL_COLOURS.length - 1))
  const richCol = SOIL_COLOURS[Math.min(richIdx + 1, SOIL_COLOURS.length - 1)]

  return (
    <div style={{
      display:   'flex',
      flexWrap:  'wrap',
      padding:   '0',
      gap:       '0',
      width:     '100%',
      height:    '16px',
      overflow:  'hidden',
    }}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          style={{
            width:           `${100 / TOTAL}%`,
            height:          '16px',
            backgroundColor: i < filled ? richCol : SOIL_COLOURS[0],
            transition:      'background-color 1.5s ease',
          }}
        />
      ))}
    </div>
  )
}

// ── Stat chip component ───────────────────────────────────────
function StatChip({ value, label }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 214, 179, 0.6)',
      border:          '1.5px solid #D4A96A',
      padding:         '6px 12px',
      display:         'flex',
      alignItems:      'center',
      gap:             '7px',
    }}>
      <span style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '11px',
        color:      '#7B4F2E',
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '4px',
        color:      '#A0785A',
        lineHeight: '2',
        whiteSpace: 'pre',
      }}>
        {label}
      </span>
    </div>
  )
}
