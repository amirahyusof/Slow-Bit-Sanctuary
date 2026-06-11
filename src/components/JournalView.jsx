// LogView.jsx — Phase 3C: Rest Icon Consistency
// Changed from no icon to ☕ (coffee) for rest entries to match theme

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

export default function JournalView({momMode, theme}) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)
  }, [])

  const winEntries = entries.filter((e) => e.mode === 'win')
  const restEntries = entries.filter((e) => e.mode === 'rest')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ────────────────────────────────────────── */}
      <div
        style={{
          padding: '20px 18px 12px',
          background: theme.shell,
          transition: 'background-color 2000ms ease',
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
          Builder's Journal
        </h1>
        <p
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '13px',
            color: '#A88C74',
            margin: 0,
          }}
        >
          Your honest garden journal
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
            Head to <strong>"Garden"</strong> to plant your first honest win. 🌱
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
          <JournalEntry key={`${entry.key}-${entry.winIndex || 0}`} entry={entry} index={index} />
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

// ── Single journal entry ───────────────────────────────────────
function JournalEntry({ entry, index }) {
  const isRest = entry.mode === 'rest'
  const hasMultipleWins = entry.mode === 'win' && entry.wins && entry.wins.length > 1

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
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isRest
          ? 'rgba(201, 184, 216, 0.18)'
          : 'rgba(244, 184, 200, 0.18)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,94,46,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isRest
          ? 'rgba(201, 184, 216, 0.12)'
          : 'rgba(244, 184, 200, 0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Tiny plant icon (only for single win entries) */}
      {!isRest && !hasMultipleWins && entry.flower && (
        <div style={{ flexShrink: 0, marginTop: '2px', opacity: 0.8 }}>
          <WatercolorPlant
            flowerType={entry.flower}
            growthStage={getGrowthStage(entry.timestamp)}
            size={0.6}
            animate={false}
          />
        </div>
      )}

      {/* PHASE 3C FIX: Rest icon now visible with ☕ */}
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
          ☕
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

        {/* Single win (one entry per day) */}
        {entry.mode === 'win' && entry.wins && entry.wins.length === 1 && (
          <>
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
              "{entry.wins[0].text}"
            </p>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(141, 170, 145, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(141, 170, 145, 0.2)'
              }}
            >
              {FLOWER_NAMES[entry.wins[0].flower] || '🌸 flower'}
            </div>
          </>
        )}

        {/* Multiple wins (all 3 on same date as one entry) */}
        {entry.mode === 'win' && entry.wins && entry.wins.length > 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {entry.wins.map((win, idx) => (
              <div key={idx}>
                <p
                  style={{
                    fontFamily: '"Lora", Georgia, serif',
                    fontSize: '14px',
                    color: '#5C3D1E',
                    margin: '0 0 6px',
                    lineHeight: '1.5',
                    fontStyle: 'italic',
                  }}
                >
                  "{win.text}"
                </p>
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
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(141, 170, 145, 0.35)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(141, 170, 145, 0.2)'
                  }}
                >
                  {FLOWER_NAMES[win.flower] || '🌸 flower'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
