// ClickPage.jsx — v3.0
// First screen the user sees on every app open.
// Tap anywhere to proceed to the loading page → garden.

import { useEffect, useState } from 'react'
import { getCurrentStreak, getTodayEntry } from '../utils/storage'
import clickFlower from '../assets/click_page.png'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'good morning'
  if (hour < 17) return 'good afternoon'
  if (hour < 21) return 'good evening'
  return 'good night'
}

function getSubtext(streak, todayEntry) {
  if (todayEntry?.mode === 'win') {
    return "you've already written today. your garden is growing."
  }
  if (todayEntry?.mode === 'rest') {
    return "you chose rest today. your garden remembers you."
  }
  if (streak >= 7) {
    return `${streak} days in a row. your garden is flourishing.`
  }
  if (streak >= 3) {
    return `${streak} days and counting. something is growing.`
  }
  if (streak === 1) {
    return "yesterday you showed up. today is a new chance."
  }
  return "your garden is waiting. no rush."
}

export default function ClickPage({ onEnter }) {
  const [streak,     setStreak]     = useState(0)
  const [todayEntry, setTodayEntry] = useState(null)
  const [visible,    setVisible]    = useState(false)

  useEffect(() => {
    setStreak(getCurrentStreak())
    setTodayEntry(getTodayEntry())
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const greeting = getGreeting()
  const subtext  = getSubtext(streak, todayEntry)
  const now      = new Date()
  const dateStr  = now.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div
      onClick={onEnter}
      style={{
        minHeight:       '100%',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'space-between',
        backgroundColor: '#FFF8F0',
        cursor:          'pointer',
        userSelect:      'none',
        opacity:         visible ? 1 : 0,
        transition:      'opacity 0.6s ease',
        overflow:        'hidden',
      }}
    >

      {/* ── Top text block ──────────────────────────────── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        paddingTop:    '52px',
        gap:           '6px',
        zIndex:        2,
      }}>
        {/* Greeting */}
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '15px',
          color:      '#A88C74',
          margin:     0,
          textAlign:  'center',
        }}>
          {greeting}
        </p>

        {/* App name */}
        <p style={{
          fontFamily:    '"Lora", Georgia, serif',
          fontSize:      '11px',
          color:         '#C2A38A',
          fontStyle:     'italic',
          margin:        '0',
          letterSpacing: '0.5px',
        }}>
          the
        </p>
        <p style={{
          fontFamily:    '"Lora", Georgia, serif',
          fontSize:      '22px',
          fontWeight:    '600',
          color:         '#4A3728',
          margin:        0,
          letterSpacing: '0.3px',
          textAlign:     'center',
        }}>
          Slow-Bit Sanctuary
        </p>

        {/* Date */}
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '13px',
          color:      '#A88C74',
          margin:     '8px 0 0',
          textAlign:  'center',
        }}>
          {dateStr}
        </p>

        {/* Subtext */}
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '13px',
          color:      '#8DAA91',
          fontStyle:  'italic',
          margin:     '4px 0 0',
          textAlign:  'center',
          lineHeight: '1.6',
          maxWidth:   '240px',
        }}>
          {subtext}
        </p>
      </div>

      {/* ── Flower image — fills bottom half ───────────── */}
      <div style={{
        width:    '100%',
        position: 'relative',
        flexShrink: 0,
      }}>
        <img
          src={clickFlower}
          alt="garden flowers"
          style={{
            width:     '100%',
            display:   'block',
            animation: 'floatSlow 5s ease-in-out infinite',
          }}
        />

        {/* Tap hint — floats over the image bottom */}
        <div style={{
          position:       'absolute',
          bottom:         '28px',
          left:           0,
          right:          0,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '6px',
          animation:      'pulse 2.5s ease-in-out infinite',
        }}>
          <span style={{
            fontFamily:      '"Indie Flower", cursive',
            fontSize:        '13px',
            color:           '#7A5C44',
            backgroundColor: 'rgba(255,248,240,0.85)',
            padding:         '4px 16px',
            borderRadius:    '20px',
            border:          '1px solid rgba(194,163,138,0.3)',
          }}>
            tap anywhere to enter ✦
          </span>
        </div>
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}