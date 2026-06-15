// App.jsx — v3.1
// Flow: LoadingPage → ClickPage → Post-Click LoadingPage → Garden / Journal

import { useState, useEffect } from 'react'
import LoadingPage  from './components/LoadingPage'
import WelcomePage  from './components/WelcomePage'
import BottomNav    from './components/BottomNav'
import GardenView   from './components/GardenView'
import JournalView  from './components/JournalView'
import { saveMomMode, loadMomMode } from './utils/storage'

// ── Mom Mode themes ───────────────────────────────────────────
const THEMES = {
  day: {
    bg:     '#FDE8D0',
    shell:  '#FFF8F0',
    border: '#D4BCA8',
    label:  '☀️ bright day',
  },
  sunset: {
    bg:     '#F4A87C',
    shell:  '#FFF0DC',
    border: '#C8784A',
    label:  '✦ warm sunset',
  },
}

// App-level screens updated to handle the extra transitional state
const SCREEN = { 
  LOADING: 'loading', 
  CLICK: 'click', 
  POST_CLICK_LOADING: 'post_click_loading', // Added state for the 2nd load
  APP: 'app' 
}

export default function App() {
  const [screen,     setScreen]     = useState(SCREEN.LOADING)
  const [activePage, setActivePage] = useState('garden')
  const [momMode,    setMomMode]    = useState('day')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setMomMode(loadMomMode())
  }, [])

  function handleNavigate(page) {
    setActivePage(page)
    setRefreshKey(k => k + 1)
  }

  function handleMomModeToggle() {
    const next = momMode === 'day' ? 'sunset' : 'day'
    setMomMode(next)
    saveMomMode(next)
  }

  const theme = THEMES[momMode]

  // ── 1. First Loading screen (On initial app open) ───────────
  if (screen === SCREEN.LOADING) {
    return (
      <AppShell theme={theme} showHeader={false} showNav={false}>
        <LoadingPage onDone={() => setScreen(SCREEN.CLICK)} />
      </AppShell>
    )
  }

  // ── 2. Click / entry screen (Waits for tap) ─────────────────
  if (screen === SCREEN.CLICK) {
    return (
      <AppShell theme={theme} showHeader={false} showNav={false}>
        <WelcomePage onEnter={() => setScreen(SCREEN.POST_CLICK_LOADING)} />
      </AppShell>
    )
  }

  // ── 3. Second Loading screen (Runs right after tap) ─────────
  if (screen === SCREEN.POST_CLICK_LOADING) {
    return (
      <AppShell theme={theme} showHeader={false} showNav={false}>
        <LoadingPage onDone={() => setScreen(SCREEN.APP)} />
      </AppShell>
    )
  }

  // ── 4. Main app (Garden / Journal) ──────────────────────────
  return (
    <AppShell
      theme={theme}
      showHeader={true}
      showNav={true}
      momModeLabel={theme.label}
      onMomModeToggle={handleMomModeToggle}
      activePage={activePage}
      onNavigate={handleNavigate}
    >
      {activePage === 'garden'
        ? <GardenView  key={refreshKey} momMode={momMode} />
        : <JournalView key={refreshKey} />
      }
    </AppShell>
  )
}

// ── Shared shell wrapper ──────────────────────────────────────
function AppShell({
  theme,
  showHeader,
  showNav,
  momModeLabel,
  onMomModeToggle,
  activePage,
  onNavigate,
  children,
}) {
  return (
    <div style={{
      minHeight:       '100vh',
      display:         'flex',
      justifyContent:  'center',
      alignItems:      'flex-start',
      backgroundColor: '#EDE4D8',
      padding:         '8px',
    }}>
      <div style={{
        width:           '100%',
        maxWidth:        '480px',
        border:          `2px solid ${theme.border}`,
        borderRadius:    '20px',
        overflow:        'hidden',
        backgroundColor: theme.shell,
        boxShadow:       '0 4px 24px rgba(139,94,46,0.10)',
        transition:      'background-color 2000ms ease, border-color 2000ms ease',
        display:         'flex',
        flexDirection:   'column',
        minHeight:       'calc(100vh - 16px)',
      }}>

        {showHeader && (
          <header style={{
            display:         'flex',
            justifyContent:  'space-between',
            alignItems:      'center',
            padding:         '14px 18px',
            backgroundColor: theme.bg,
            transition:      'background-color 2000ms ease',
            flexShrink:      0,
            borderBottom:    `1px solid ${theme.border}`,
          }}>
            <div>
              <p style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize:   '11px',
                color:      '#A88C74',
                margin:     '0 0 1px',
                fontStyle:  'italic',
              }}>
                the
              </p>
              <p style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize:   '16px',
                fontWeight: '600',
                color:      '#4A3728',
                margin:     0,
              }}>
                Slow-Bit Sanctuary
              </p>
            </div>

            <div style={{
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'flex-end',
              gap:           '3px',
            }}>
              <span style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize:   '10px',
                color:      '#A88C74',
              }}>
                {momModeLabel}
              </span>
              <button
                onClick={onMomModeToggle}
                style={{
                  fontFamily:      '"Indie Flower", cursive',
                  fontSize:        '13px',
                  color:           '#7A5C44',
                  backgroundColor: 'rgba(253,251,247,0.8)',
                  border:          `1.5px solid ${theme.border}`,
                  borderRadius:    '20px',
                  padding:         '3px 12px',
                  cursor:          'pointer',
                  boxShadow:       '0 1px 4px rgba(139,94,46,0.08)',
                  transition:      'all 2000ms ease',
                }}
              >
                Mom Mode
              </button>
            </div>
          </header>
        )}

        <main style={{
          flex:      1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          {children}
        </main>

        {showNav && (
          <BottomNav activePage={activePage} onNavigate={onNavigate} />
        )}

      </div>
    </div>
  )
}