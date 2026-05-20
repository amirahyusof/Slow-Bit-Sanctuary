// App.jsx — Phase 3C: FIXED - No padding from main container
// FloatingRail is positioned OUTSIDE the main app container
// Main container stays full width, FloatingRail overlays on top

import { useState, useEffect } from 'react'
import BottomNav from './components/BottomNav'
import FloatingRail from './components/FloatingRail'
import GardenView from './components/GardenView'
import TodayView from './components/TodayView'
import CalendarView from './components/CalendarView'
import LogView from './components/LogView'
import { saveMomMode, loadMomMode } from './utils/storage'

const THEMES = {
  day: {
    bg: '#FDE8D0',
    shell: '#FFF8F0',
    border: '#D4BCA8',
    label: '☀️ Bright Day',
  },
  sunset: {
    bg: '#F4A87C',
    shell: '#FFF0DC',
    border: '#C8784A',
    label: '✦ Warm Sunset',
  },
}

export default function App() {
  const [activePage, setActivePage] = useState('garden')
  const [momMode, setMomMode] = useState('day')
  const [refreshKey, setRefreshKey] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  // Load Mom Mode from storage
  useEffect(() => {
    setMomMode(loadMomMode())
  }, [])

  // Track window width for responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleNavigate(page) {
    setActivePage(page)
    setRefreshKey((k) => k + 1)
  }

  function handleMomModeToggle() {
    const next = momMode === 'day' ? 'sunset' : 'day'
    setMomMode(next)
    saveMomMode(next)
  }
  
  function renderPage() {
    const theme = THEMES[momMode]
    
    switch (activePage) {
      case 'garden':   return <GardenView   key={refreshKey} momMode={momMode} theme={theme} />
      case 'today':    return <TodayView    key={refreshKey} momMode={momMode} theme={theme} />
      case 'calendar': return <CalendarView key={refreshKey} momMode={momMode} theme={theme} />
      case 'log':      return <LogView      key={refreshKey} momMode={momMode} theme={theme} />
      default:         return <GardenView   key={refreshKey} momMode={momMode} theme={theme} />
    }
  }

  const theme = THEMES[momMode]

  // Responsive breakpoints
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024
  const borderRadius = isMobile ? '12px' : isTablet ? '20px' : '8px'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#EDE4D8',
        padding: isMobile ? '8px' : isTablet ? '12px' : '8px',
        position: 'relative',
      }}
    >
      {/* FIXED: Removed paddingRight from here - FloatingRail is outside this container */}
      <div
        style={{
          width: isMobile ? '100%' : isTablet ? '95%' : '100%',
          maxWidth: isDesktop ? '1400px' : 'none',
          border: `2px solid ${theme.border}`,
          borderRadius: borderRadius,
          overflow: 'hidden',
          backgroundColor: theme.shell,
          boxShadow: isMobile
            ? '0 2px 12px rgba(139,94,46,0.08)'
            : '0 4px 24px rgba(139,94,46,0.12)',
          transition: 'background-color 2000ms ease, border-color 2000ms ease, border-radius 300ms ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          maxHeight: '100vh',
        }}
      >
        {/* ── Top bar ──────────────────────────────────── */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile
              ? '12px 16px'
              : isTablet
              ? '14px 18px'
              : '16px 20px',
            backgroundColor: theme.bg,
            transition: 'background-color 2000ms ease',
            flexShrink: 0,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize: isMobile ? '15px' : isTablet ? '16px' : '17px',
                fontWeight: '600',
                color: '#4A3728',
                margin: 0,
              }}
            >
              Slow-Bit Sanctuary
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: isMobile ? '9px' : isTablet ? '10px' : '11px',
                color: '#A88C74',
              }}
            >
              {theme.label}
            </span>
            <button
              onClick={handleMomModeToggle}
              style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: isMobile ? '13px' : isTablet ? '14px' : '16px',
                color: '#7A5C44',
                backgroundColor: 'rgba(253,251,247,0.8)',
                border: `1.5px solid ${theme.border}`,
                borderRadius: '20px',
                padding: isMobile ? '3px 10px' : '4px 12px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(139,94,46,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              Mom Mode
            </button>
          </div>
        </header>

        {/* ── Main content (scrollable) ──────────────────── */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: isMobile ? '0' : isTablet ? '0' : isDesktop ? '16px' : '0',
            backgroundColor: theme.shell,
            transition: 'background-color 2000ms ease',
          }}
        >
          {renderPage()}
        </main>

        {/* ── Conditional Navigation ────────────────────── */}
        {/* BottomNav for mobile/tablet */}
        {!isDesktop && <BottomNav activePage={activePage} onNavigate={handleNavigate} />}
      </div>

      {/* ── FloatingRail for desktop (FIXED position outside main container) ── */}
      {isDesktop && (
        <FloatingRail
          activePage={activePage}
          onNavigate={handleNavigate}
          momMode={momMode}
        />
      )}
    </div>
  )
}
