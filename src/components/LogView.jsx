// LogView.jsx
// Phase 2: The real Builder's Log page.
//
// Shows every logged win from LocalStorage, newest first.
// Each entry shows: date, win text, flower badge, and a tiny
// PixelPlant so the user can see which flower they grew that day.

import { useState, useEffect } from 'react'
import { getAllEntriesSorted, formatDate } from '../utils/storage'
import WatercolorPlant, { getGrowthStage } from './WatercolorPlant'

// ── Flower display name map ───────────────────────────────────
const FLOWER_NAMES = {
  'pink-dahlia':     '🌸 pink dahlia',
  'lavender-tulip':  '🌷 lavender tulip',
  'mint-daisy':      '🌼 mint daisy',
  'peach-rose':      '🌹 peach rose',
  'sunset-marigold': '🌻 sunset marigold',
}

export default function LogView() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const all = getAllEntriesSorted()
    setEntries(all)
  }, [])

  const winEntries  = entries.filter(e => e.mode === 'win' && e.text)
  const restEntries = entries.filter(e => e.mode === 'rest')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div style={{
        padding:         '16px 18px 12px',
        borderBottom:    '2px solid #E8C99A',
        backgroundColor: 'rgba(255, 248, 240, 0.8)',
      }}>
        <p style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize:   '7px',
          color:      '#7B4F2E',
          margin:     '0 0 6px',
          lineHeight: '1.8',
        }}>
          builder's log
        </p>
        <p style={{
          fontFamily: '"Nunito", sans-serif',
          fontSize:   '12px',
          color:      '#9B6B4A',
          margin:     0,
        }}>
          your honest garden journal
        </p>

        {/* Summary stats */}
        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px',
              color:      '#81B89A',
            }}>
              {winEntries.length} wins planted
            </span>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px',
              color:      '#C4A07A',
            }}>
              {restEntries.length} rest days
            </span>
          </div>
        )}
      </div>

      {/* ── Empty state ───────────────────────────────────── */}
      {entries.length === 0 && (
        <div style={{
          padding:        '48px 20px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '12px',
        }}>
          <p style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize:   '6px',
            color:      '#C4A07A',
            textAlign:  'center',
            lineHeight: '2.2',
          }}>
            no wins logged yet.<br />
            head to "today" to<br />
            plant your first one. 🌱
          </p>
        </div>
      )}

      {/* ── Entry list ───────────────────────────────────── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        padding:       '8px 18px 20px',
        gap:           '8px',
        overflowY:     'auto',
        maxHeight:     '420px',
      }}>
        {entries.map((entry, index) => (
          <LogEntry key={entry.key} entry={entry} index={index} />
        ))}
      </div>

    </div>
  )
}

// ── Single log entry ──────────────────────────────────────────
function LogEntry({ entry, index }) {
  const isRest = entry.mode === 'rest'
  const flowerName = FLOWER_NAMES[entry.flower] || '🌱 sprout'
  const stage = getGrowthStage(entry.timestamp)

  return (
    <div
      style={{
        border:          `2px solid ${isRest ? '#E8C99A' : '#D4A96A'}`,
        backgroundColor: isRest
          ? 'rgba(255, 248, 240, 0.5)'
          : 'rgba(255, 240, 210, 0.7)',
        padding:         '10px 12px',
        display:         'flex',
        gap:             '10px',
        alignItems:      'flex-start',
        animation:       `slideIn 0.3s ease ${index * 0.04}s both`,
        position:        'relative',
      }}
    >
      {/* Tiny plant icon (only for wins) */}
      {!isRest && entry.flower && (
        <div style={{ flexShrink: 0, marginTop: '2px' }}>
          <PixelPlant
            flowerType={entry.flower}
            growthStage={stage}
            size={0.7}
          />
        </div>
      )}

      {/* Rest icon */}
      {isRest && (
        <div style={{
          flexShrink:     0,
          width:          '14px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '14px',
          marginTop:      '2px',
        }}>
          ☕
        </div>
      )}

      {/* Entry content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Date */}
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize:   '4px',
          color:      '#C4A07A',
          lineHeight: '1.5',
        }}>
          {formatDate(entry.key)}
        </span>

        {/* Win text */}
        {entry.text && (
          <p style={{
            fontFamily: '"Nunito", sans-serif',
            fontSize:   '13px',
            color:      '#5C3D1E',
            margin:     0,
            lineHeight: '1.4',
          }}>
            "{entry.text}"
          </p>
        )}

        {/* Rest message */}
        {isRest && (
          <p style={{
            fontFamily: '"Nunito", sans-serif',
            fontSize:   '12px',
            color:      '#9B6B4A',
            margin:     0,
            fontStyle:  'italic',
          }}>
            a rest day. that's okay.
          </p>
        )}

        {/* Flower badge (wins only) */}
        {!isRest && entry.flower && (
          <span style={{
            display:         'inline-block',
            backgroundColor: 'rgba(200, 240, 220, 0.5)',
            border:          '1px solid #81B89A',
            padding:         '2px 6px',
            fontFamily:      '"Press Start 2P", monospace',
            fontSize:        '4px',
            color:           '#3B6D11',
            alignSelf:       'flex-start',
            marginTop:       '2px',
          }}>
            {flowerName}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Animations ────────────────────────────────────────────────
const styleTag = document.createElement('style')
styleTag.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`
document.head.appendChild(styleTag)
