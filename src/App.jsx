// App.jsx
// The root component. Handles:
//   - Which page is currently visible (activePage state)
//   - Mom Mode toggle (day vs sunset atmosphere)
//   - The overall screen layout (top bar + page content + bottom nav)

import { useState, useEffect } from 'react'
import BottomNav    from './components/BottomNav'
import GardenView   from './components/GardenView'
import TodayView    from './components/TodayView'
import CalendarView from './components/CalendarView'
import LogView      from './components/LogView'
import { saveMomMode, loadMomMode } from './utils/storage'

// ── Mom Mode colour themes ────────────────────────────────────
const THEMES = {
  day: {
    skyTop:    '#FDE8C8',
    skyBottom: '#FFF0E0',
    border:    '#E8C99A',
    label:     '☀ bright day',
  },
  sunset: {
    skyTop:    '#FF9A5C',
    skyBottom: '#FFD580',
    border:    '#E07030',
    label:     '✦ warm sunset',
  },
}

export default function App() {
  // ── State ───────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('garden')
  const [momMode,    setMomMode]    = useState('day')    // 'day' | 'sunset'

  // ── Load saved Mom Mode on first open ───────────────────────
  useEffect(() => {
    const saved = loadMomMode()
    setMomMode(saved)
  }, [])

  // ── Toggle Mom Mode and save preference ─────────────────────
  function handleMomModeToggle() {
    const next = momMode === 'day' ? 'sunset' : 'day'
    setMomMode(next)
    saveMomMode(next)
  }

  // ── Which page to render ─────────────────────────────────────
  function renderPage() {
    switch (activePage) {
      case 'garden':   return <GardenView   momMode={momMode} />
      case 'today':    return <TodayView    momMode={momMode} />
      case 'calendar': return <CalendarView />
      case 'log':      return <LogView />
      default:         return <GardenView   momMode={momMode} />
    }
  }

  const theme = THEMES[momMode]

  return (
    <div
      style={{
        // Full viewport, centred, max-width like a phone app
        minHeight:       '100vh',
        display:         'flex',
        justifyContent:  'center',
        alignItems:      'flex-start',
        backgroundColor: '#EDE0D0',   // warm parchment page bg
        padding:         '20px 16px',
      }}
    >
      {/* ── App shell ────────────────────────────────────────── */}
      <div
        style={{
          width:           '100%',
          maxWidth:        '420px',
          border:          `3px solid ${theme.border}`,
          borderRadius:    '16px',
          overflow:        'hidden',
          backgroundColor: theme.skyBottom,
          // 2000ms transition for Mom Mode atmosphere shift
          transition: 'background-color 2000ms ease, border-color 2000ms ease',
        }}
      >

        {/* ── Top bar ──────────────────────────────────────── */}
        <header
          style={{
            display:         'flex',
            justifyContent:  'space-between',
            alignItems:      'center',
            padding:         '14px 18px 10px',
            backgroundColor: theme.skyTop,
            transition:      'background-color 2000ms ease',
          }}
        >
          {/* App name */}
          <div>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '7px',
              color:      '#7B4F2E',
              lineHeight: '1.8',
              margin:     0,
            }}>
              slow-bit<br />sanctuary
            </p>
          </div>

          {/* Mom Mode toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '4px',
              color:      '#9B6B4A',
            }}>
              {theme.label}
            </span>
            <button
              onClick={handleMomModeToggle}
              style={{
                fontFamily:      '"Press Start 2P", monospace',
                fontSize:        '5px',
                color:           '#7B4F2E',
                backgroundColor: '#FFF0D8',
                border:          '2px solid #D4A96A',
                padding:         '5px 8px',
                cursor:          'pointer',
                lineHeight:      '1.8',
                position:        'relative',
              }}
            >
              mom mode
            </button>
          </div>
        </header>

        {/* ── Page content ─────────────────────────────────── */}
        <main style={{ minHeight: '480px' }}>
          {renderPage()}
        </main>

        {/* ── Bottom nav ───────────────────────────────────── */}
        <BottomNav
          activePage={activePage}
          onNavigate={setActivePage}
        />

      </div>
    </div>
  )
}
