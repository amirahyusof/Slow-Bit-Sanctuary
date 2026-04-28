// App.jsx — Phase 2 update
// Key change from Phase 1:
//   - Added a `refreshKey` that increments each time the user
//     navigates to a page. This forces GardenView and LogView
//     to re-mount and re-read from LocalStorage, so a newly
//     planted win shows up immediately when switching tabs.

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
  const [activePage,  setActivePage]  = useState('garden')
  const [momMode,     setMomMode]     = useState('day')
  // refreshKey forces re-mount of the target page on tab switch
  const [refreshKey,  setRefreshKey]  = useState(0)

  useEffect(() => {
    setMomMode(loadMomMode())
  }, [])

  function handleNavigate(page) {
    setActivePage(page)
    // Bump the key so the new page re-mounts fresh
    setRefreshKey(k => k + 1)
  }

  function handleMomModeToggle() {
    const next = momMode === 'day' ? 'sunset' : 'day'
    setMomMode(next)
    saveMomMode(next)
  }

  function renderPage() {
    switch (activePage) {
      case 'garden':
        return <GardenView   key={refreshKey} momMode={momMode} />
      case 'today':
        return <TodayView    key={refreshKey} momMode={momMode} />
      case 'calendar':
        return <CalendarView key={refreshKey} />
      case 'log':
        return <LogView      key={refreshKey} />
      default:
        return <GardenView   key={refreshKey} momMode={momMode} />
    }
  }

  const theme = THEMES[momMode]

  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      justifyContent:  'center',
      alignItems:      'flex-start',
      backgroundColor: '#EDE0D0',
      padding:         '20px 16px',
    }}>

      {/* ── App shell ──────────────────────────────────────── */}
      <div style={{
        width:           '100%',
        maxWidth:        '420px',
        border:          `3px solid ${theme.border}`,
        borderRadius:    '16px',
        overflow:        'hidden',
        backgroundColor: theme.skyBottom,
        transition:      'background-color 2000ms ease, border-color 2000ms ease',
      }}>

        {/* ── Top bar ──────────────────────────────────────── */}
        <header style={{
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'center',
          padding:         '14px 18px 10px',
          backgroundColor: theme.skyTop,
          transition:      'background-color 2000ms ease',
        }}>
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
          onNavigate={handleNavigate}
        />

      </div>
    </div>
  )
}
