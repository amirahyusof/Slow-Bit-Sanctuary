// JournalView.jsx — v3.0
// A quiet diary. Every entry ever written, newest first, grouped by month.
// No stats. No editing. No deleting. Just your words.

import { useState, useEffect } from 'react'
import { getAllEntriesSorted, formatDate } from '../utils/storage'

const FLOWER_NAMES = {
  'pink-dahlia':     '🌸 pink dahlia',
  'lavender-tulip':  '🌷 lavender tulip',
  'mint-daisy':      '🌼 mint daisy',
  'peach-rose':      '🌹 peach rose',
  'sunset-marigold': '🌻 sunset marigold',
}

// "2026-05-14" → "May 2026"
function monthLabel(key) {
  const [y, m] = key.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleString('en-GB', { month: 'long', year: 'numeric' })
}

// Group a flat sorted array of entries by their month
function groupByMonth(entries) {
  const groups = []
  let currentLabel = null
  let currentGroup = []

  entries.forEach(entry => {
    const label = monthLabel(entry.key)
    if (label !== currentLabel) {
      if (currentGroup.length > 0) groups.push({ label: currentLabel, entries: currentGroup })
      currentLabel = label
      currentGroup = [entry]
    } else {
      currentGroup.push(entry)
    }
  })

  if (currentGroup.length > 0) groups.push({ label: currentLabel, entries: currentGroup })
  return groups
}

// ── Main component ────────────────────────────────────────────

export default function JournalView() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(getAllEntriesSorted())
  }, [])

  const groups = groupByMonth(entries)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        padding:      '20px 20px 14px',
        borderBottom: '1px solid rgba(194,163,138,0.15)',
      }}>
        <h1 style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '22px',
          fontWeight: '600',
          color:      '#4A3728',
          margin:     '0 0 4px',
        }}>
          Your Journal
        </h1>
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '13px',
          color:      '#A88C74',
          margin:     0,
        }}>
          Your honest garden journal, where every win and rest day is recorded.
        </p>
      </div>

      {/* ── Empty state ────────────────────────────────────── */}
      {entries.length === 0 && (
        <div style={{
          flex:           1,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '48px 24px',
          textAlign:      'center',
        }}>
          <p style={{
            fontFamily: '"Lora", Georgia, serif',
            fontSize:   '15px',
            color:      '#A88C74',
            lineHeight: '1.8',
            fontStyle:  'italic',
            margin:     0,
          }}>
            Your garden journal is empty.
            <br />
            Head to <strong>"Garden"</strong> to plant your first honest win. 🌱
          </p>
        </div>
      )}

      {/* ── Entry list grouped by month ─────────────────────── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        padding:       '8px 20px 32px',
        gap:           '0',
      }}>
        {groups.map(group => (
          <div key={group.label}>

            {/* Month group header */}
            <div style={{
              padding:    '18px 0 8px',
              display:    'flex',
              alignItems: 'center',
              gap:        '10px',
            }}>
              <span style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize:   '13px',
                fontWeight: '600',
                color:      '#7A5C44',
              }}>
                {group.label}
              </span>
              <div style={{
                flex:        1,
                height:      '1px',
                background:  'rgba(194,163,138,0.25)',
              }} />
            </div>

            {/* Entries in this month */}
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '8px',
              paddingBottom: '4px',
            }}>
              {group.entries.map((entry, index) => (
                <JournalEntry key={entry.key} entry={entry} index={index} />
              ))}
            </div>

          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
      `}</style>
    </div>
  )
}

// ── Single entry ──────────────────────────────────────────────

function JournalEntry({ entry, index }) {
  const isRest = entry.mode === 'rest'

  // Rest day — single compact line
  if (isRest) {
    return (
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '8px',
        padding:    '8px 0',
        animation:  `slideIn 0.3s ease ${index * 0.03}s both`,
        opacity:    0.7,
      }}>
        <span style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '11px',
          color:      '#A88C74',
          minWidth:   '48px',
        }}>
          {formatDate(entry.key).split(' ')[0]} {formatDate(entry.key).split(' ')[1]}
        </span>
        <span style={{
          width:        '1px',
          height:       '12px',
          background:   'rgba(194,163,138,0.4)',
          flexShrink:   0,
        }} />
        <span style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '12px',
          color:      '#A88C74',
        }}>
          ☕ rest
        </span>
      </div>
    )
  }

  // Win day — full card
  return (
    <div
      style={{
        background:    'rgba(253,251,247,0.8)',
        border:        '1.5px solid rgba(194,163,138,0.2)',
        borderRadius:  '14px',
        padding:       '14px 16px',
        animation:     `slideIn 0.3s ease ${index * 0.03}s both`,
        transition:    'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = 'rgba(244,184,200,0.10)'
        e.currentTarget.style.borderColor  = 'rgba(244,184,200,0.4)'
        e.currentTarget.style.transform    = 'translateY(-1px)'
        e.currentTarget.style.boxShadow    = '0 3px 10px rgba(139,94,46,0.07)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = 'rgba(253,251,247,0.8)'
        e.currentTarget.style.borderColor  = 'rgba(194,163,138,0.2)'
        e.currentTarget.style.transform    = 'translateY(0)'
        e.currentTarget.style.boxShadow    = 'none'
      }}
    >
      {/* Date */}
      <span style={{
        fontFamily:  '"Indie Flower", cursive',
        fontSize:    '11px',
        color:       '#A88C74',
        display:     'block',
        marginBottom: '6px',
      }}>
        {formatDate(entry.key)}
      </span>

      {/* Entry text */}
      <p style={{
        fontFamily:   '"Lora", Georgia, serif',
        fontSize:     '14px',
        color:        '#4A3728',
        margin:       '0 0 10px',
        lineHeight:   '1.6',
        fontStyle:    'italic',
      }}>
        "{entry.text}"
      </p>

      {/* Flower badge */}
      {entry.flower && (
        <span style={{
          display:      'inline-block',
          fontFamily:   '"Indie Flower", cursive',
          fontSize:     '11px',
          color:        '#5C8C64',
          background:   'rgba(141,170,145,0.15)',
          border:       '1px solid rgba(141,170,145,0.3)',
          borderRadius: '20px',
          padding:      '3px 10px',
        }}>
          {FLOWER_NAMES[entry.flower] || '🌸 flower'}
        </span>
      )}
    </div>
  )
}