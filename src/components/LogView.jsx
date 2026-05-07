// LogView.jsx — Phase 3 & 4: Builder's Log Archive
// Shows chronological diary of every logged win.
// Rest days shown with moon icon 🌙.
// Flower badges show which type was planted.
// No editing/deleting — keeps it honest and guilt-free.
// Fully animated and responsive.

import { useState, useEffect } from 'react'
import { getAllEntriesSorted, formatDate } from '../utils/storage'
import WatercolorPlant, { getGrowthStage } from './WatercolorPlant'

const FLOWER_NAMES = {
  'pink-dahlia': '🌸 pink dahlia',
  'lavender-tulip': '🌷 lavender tulip',
  'mint-daisy': '🌼 mint daisy',
  'peach-rose': '🌹 peach rose',
  'sunset-marigold': '🌻 sunset marigold',
}

export default function LogView() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)
  }, [])

  const winEntries = entries.filter(e => e.mode === 'win' && e.text)
  const restEntries = entries.filter(e => e.mode === 'rest')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ────────────────────────────────────────── */}
      <div
        style={{
          padding: '20px 18px 12px',
          background: 'linear-gradient(to bottom, rgba(253,235,198,0.3), transparent)',
          borderBottom: '1px solid rgba(194,163,138,0.1)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Lora", Georgia, serif',
            fontSize: '24px',
            fontWeight: '600',
            color: '#5C3D1E',
            margin: '0 0 4px',
          }}
        >
          Builder's Log
        </h1>
        <p
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '13px',
            color: '#A88C74',
            margin: 0,
          }}
        >
          your honest garden journal
        </p>

        {/* Summary stats */}
        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: '14px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: '12px',
                color: '#81B89A',
                background: 'rgba(141,170,145,0.15)',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(141,170,145,0.3)',
              }}
            >
              {winEntries.length} wins planted
            </span>
            <span
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: '12px',
                color: '#C9B8D8',
                background: 'rgba(201,184,216,0.15)',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(201,184,216,0.3)',
              }}
            >
              {restEntries.length} rest days
            </span>
          </div>
        )}
      </div>

      {/* ── Empty state ───────────────────────────────────── */}
      {entries.length === 0 && (
        <div
          style={{
            padding: '48px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize: '16px',
              color: '#A88C74',
              lineHeight: '1.8',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            Your garden journal is empty.
            <br />
            Head to <strong>"Today"</strong> to plant your first win. 🌱
          </p>
        </div>
      )}

      {/* ── Entry list ────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 18px 20px',
          gap: '10px',
        }}
      >
        {entries.map((entry, index) => (
          <LogEntry key={entry.key} entry={entry} index={index} />
        ))}
      </div>

      {/* ── CSS animations ────────────────────────────────── */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ── Single log entry ───────────────────────────────────────
function LogEntry({ entry, index }) {
  const isRest = entry.mode === 'rest'
  const flowerName = FLOWER_NAMES[entry.flower] || '🌸 flower'
  const stage = getGrowthStage(entry.timestamp)

  return (
    <div
      style={{
        background: isRest
          ? 'rgba(201, 184, 216, 0.12)'
          : 'rgba(244, 184, 200, 0.12)',
        border: `1.5px solid ${isRest ? 'rgba(201,184,216,0.3)' : 'rgba(244,184,200,0.3)'}`,
        borderRadius: '16px',
        padding: '16px 16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        animation: `slideIn 0.4s ease ${index * 0.04}s both`,
        transition: 'all 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isRest
          ? 'rgba(201, 184, 216, 0.18)'
          : 'rgba(244, 184, 200, 0.18)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,94,46,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isRest
          ? 'rgba(201, 184, 216, 0.12)'
          : 'rgba(244, 184, 200, 0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Tiny plant icon (only for wins) */}
      {!isRest && entry.flower && (
        <div style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }}>
          <WatercolorPlant
            flowerType={entry.flower}
            growthStage={stage}
            size={0.6}
            animate={false}
          />
        </div>
      )}

      {/* Rest icon */}
      {isRest && (
        <div
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          🌙
        </div>
      )}

      {/* Entry content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          minWidth: 0,
        }}
      >
        {/* Date */}
        <span
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '11px',
            color: '#A88C74',
            lineHeight: '1.3',
          }}
        >
          {formatDate(entry.key)}
        </span>

        {/* Win text */}
        {entry.text && (
          <p
            style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize: '14px',
              color: '#5C3D1E',
              margin: 0,
              lineHeight: '1.5',
              fontStyle: 'italic',
            }}
          >
            "{entry.text}"
          </p>
        )}

        {/* Rest message */}
        {isRest && (
          <p
            style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize: '13px',
              color: '#9B6B4A',
              margin: 0,
              fontStyle: 'italic',
              lineHeight: '1.5',
            }}
          >
            You chose rest today. And that was enough.
          </p>
        )}

        {/* Flower badge (wins only) */}
        {!isRest && entry.flower && (
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(141, 170, 145, 0.2)',
              border: '1px solid rgba(141, 170, 145, 0.4)',
              padding: '4px 10px',
              fontFamily: '"Indie Flower", cursive',
              fontSize: '11px',
              color: '#5C8C64',
              borderRadius: '18px',
              marginTop: '4px',
              alignSelf: 'flex-start',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(141, 170, 145, 0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(141, 170, 145, 0.2)'
            }}
          >
            {flowerName}
          </div>
        )}
      </div>
    </div>
  )
}
