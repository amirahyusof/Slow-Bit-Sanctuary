// ClickPage.jsx — v3.1 (Optimized for negative space overlay)
// First screen the user sees on every app open.
// Tap anywhere to proceed to the loading page → garden.

import { useEffect, useState } from 'react'
import { getCurrentStreak, getTodayEntry } from '../utils/storage'
import clickFlower from '../assets/click_page.png'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  if (hour < 21) return 'Good Evening'
  return 'Good Night'
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
        height:          '100vh',      // Fixes container to full viewport height
        width:           '100%',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        backgroundColor: '#FFF8F0',
        cursor:          'pointer',
        userSelect:      'none',
        opacity:         visible ? 1 : 0,
        transition:      'opacity 0.6s ease',
        overflow:        'hidden',
        position:        'relative',   // Anchor for background and hints
      }}
    >
      {/* ── Background Flower Image ────────────────────── */}
      <div style={{
        position: 'absolute',
        top:      0,
        left:     0,
        width:    '100%',
        height:   '100%',
        zIndex:   1,
      }}>
        <img
          src={clickFlower}
          alt="garden flowers"
          style={{
            width:     '100%',
            height:    '100%',
            objectFit: 'cover',        // Ensures the image fills the screen beautifully
            display:   'block',
            animation: 'floatSlow 5s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Top text block (Positioned over upper space) ── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        paddingTop:    '80px',         // Pushes the text down into the image's upper space
        gap:           '6px',
        zIndex:        2,              // Sits safely above the background image
        position:      'relative',
      }}>
        {/* Greeting */}
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '16px',
          color:      '#A88C74',
          margin:     0,
          textAlign:  'center',
        }}>
          {greeting}
        </p>

        {/* App name */}
        <p style={{
          fontFamily:    '"Lora", Georgia, serif',
          fontSize:      '12px',
          color:         '#C2A38A',
          fontStyle:     'italic',
          margin:        '0',
          letterSpacing: '0.5px',
        }}>
          the
        </p>
        <p style={{
          fontFamily:    '"Lora", Georgia, serif',
          fontSize:      '24px',
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
          fontSize:   '14px',
          color:      '#A88C74',
          margin:     '8px 0 0',
          textAlign:  'center',
        }}>
          {dateStr}
        </p>

        {/* Subtext */}
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '14px',
          color:      '#8DAA91',
          fontStyle:  'italic',
          margin:     '8px 0 0',
          textAlign:  'center',
          lineHeight: '1.6',
          maxWidth:   '260px',
        }}>
          {subtext}
        </p>
      </div>

      {/* ── Tap hint ───────────────────────────────────── */}
      <div style={{
        position:       'absolute',
        bottom:         '40px',
        left:           0,
        right:          0,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        zIndex:         2,             // Sits above background
        animation:      'pulse 2.5s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily:      '"Indie Flower", cursive',
          fontSize:        '13px',
          color:           '#7A5C44',
          backgroundColor: 'rgba(255,248,240,0.85)',
          padding:         '6px 18px',
          borderRadius:    '20px',
          border:          '1px solid rgba(194,163,138,0.3)',
        }}>
          tap anywhere to enter ✦
        </span>
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