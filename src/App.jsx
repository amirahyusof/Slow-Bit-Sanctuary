// App.jsx — Watercolor Theme

import { useState, useEffect } from 'react'
import BottomNav    from './components/BottomNav'
import GardenView   from './components/GardenView'
import TodayView    from './components/TodayView'
import CalendarView from './components/CalendarView'
import LogView      from './components/LogView'
import { saveMomMode, loadMomMode } from './utils/storage'

const THEMES = {
  day: {
    bg:       '#FDE8D0',
    shell:    '#FFF8F0',
    border:   '#D4BCA8',
    label:    '☀ bright day',
  },
  sunset: {
    bg:       '#F4A87C',
    shell:    '#FFF0DC',
    border:   '#C8784A',
    label:    '✦ warm sunset',
  },
}

export default function App() {
  const [activePage, setActivePage] = useState('garden')
  const [momMode,    setMomMode]    = useState('day')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => { setMomMode(loadMomMode()) }, [])

  function handleNavigate(page) {
    setActivePage(page)
    setRefreshKey(k => k + 1)
  }

  function handleMomModeToggle() {
    const next = momMode === 'day' ? 'sunset' : 'day'
    setMomMode(next)
    saveMomMode(next)
  }

  function renderPage() {
    switch (activePage) {
      case 'garden':   return <GardenView   key={refreshKey} momMode={momMode} />
      case 'today':    return <TodayView    key={refreshKey} momMode={momMode} />
      case 'calendar': return <CalendarView key={refreshKey} />
      case 'log':      return <LogView      key={refreshKey} />
      default:         return <GardenView   key={refreshKey} momMode={momMode} />
    }
  }

  const theme = THEMES[momMode]

  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      justifyContent:  'center',
      alignItems:      'flex-start',
      backgroundColor: '#EDE4D8',
      padding:         '24px 16px',
    }}>
      <div style={{
        width:           '100%',
        maxWidth:        '420px',
        border:          `2px solid ${theme.border}`,
        borderRadius:    '24px',
        overflow:        'hidden',
        backgroundColor: theme.shell,
        boxShadow:       '0 4px 24px rgba(139,94,46,0.12)',
        transition:      'background-color 2000ms ease, border-color 2000ms ease',
      }}>

        {/* Top bar */}
        <header style={{
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'center',
          padding:         '16px 20px 12px',
          backgroundColor: theme.bg,
          transition:      'background-color 2000ms ease',
        }}>
          <div>
            <p style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize:   '14px',
              color:      '#4A3728',
              margin:     '0 0 2px',
              fontStyle:  'italic',
            }}>
              the
            </p>
            <p style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize:   '17px',
              fontWeight: '600',
              color:      '#4A3728',
              margin:     0,
            }}>
              Slow-Bit Sanctuary
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '11px',
              color:      '#A88C74',
            }}>
              {theme.label}
            </span>
            <button
              onClick={handleMomModeToggle}
              style={{
                fontFamily:      '"Indie Flower", cursive',
                fontSize:        '16px',
                color:           '#7A5C44',
                backgroundColor: 'rgba(253,251,247,0.8)',
                border:          '1.5px solid #D4BCA8',
                borderRadius:    '20px',
                padding:         '4px 12px',
                cursor:          'pointer',
                boxShadow:       '0 1px 4px rgba(139,94,46,0.1)',
              }}
            >
              Mom Mode
            </button>
          </div>
        </header>

        {/* Page */}
        <main style={{ minHeight: '480px' }}>
          {renderPage()}
        </main>

        {/* Nav */}
        <BottomNav activePage={activePage} onNavigate={handleNavigate} />
      </div>
    </div>
  )
}
