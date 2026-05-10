// FloatingRail.jsx — Phase 3C: Adaptive Navigation for Desktop
// Right-side floating pill with glassmorphism effect
// Shows on desktop (≥1024px), hidden on mobile/tablet
// Replaces BottomNav on large screens

import { useState } from 'react'

// Reuse icon SVG functions from BottomNav
function GardenIcon({ active }) {
  const c = active ? '#5C8C64' : '#A88C74'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M 11 20 Q 10 14 11 8" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 11 14 Q 6 10 5 6 Q 9 8 11 14" fill={active ? '#8DAA91' : '#C2A38A'} opacity="0.8" />
      <path d="M 11 12 Q 16 8 17 4 Q 13 7 11 12" fill={active ? '#8DAA91' : '#C2A38A'} opacity="0.8" />
      <ellipse cx="11" cy="20" rx="4" ry="2" fill={active ? '#C2A38A' : '#D4BCA8'} />
    </svg>
  )
}

function TodayIcon({ active }) {
  const c = active ? '#C2A38A' : '#A88C74'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="8" width="12" height="9" rx="3" fill={active ? '#C9B8D8' : '#D4BCA8'} />
      <path d="M 15 10 Q 19 9 20 8 Q 20 11 18 12 Q 15 12 15 11 Z" fill={active ? '#B8A8C8' : '#C4B4A4'} />
      <path d="M 4 7 Q 4 4 6 4 Q 8 3 9 5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {active && <ellipse cx="18" cy="15" rx="1.2" ry="2" fill="#B8E8D0" opacity="0.9" />}
    </svg>
  )
}

function CalendarIcon({ active }) {
  const c = active ? '#C9B8D8' : '#D4BCA8'
  const tc = active ? '#7A5C8C' : '#A88C74'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="4" width="18" height="15" rx="3" fill={c} />
      <rect x="2" y="4" width="18" height="5" rx="3" fill={active ? '#B8A8C8' : '#C4B4A4'} />
      <circle cx="7" cy="13" r="1.5" fill={active ? '#F4B8C8' : '#C4B4A4'} />
      <circle cx="11" cy="13" r="1.5" fill={active ? '#8DAA91' : '#C4B4A4'} />
      <circle cx="15" cy="13" r="1.5" fill={tc} opacity="0.7" />
    </svg>
  )
}

function LogIcon({ active }) {
  const c = active ? '#8DAA91' : '#A88C74'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="3" fill={active ? '#F4D4B8' : '#D4BCA8'} />
      <rect x="4" y="2" width="3" height="18" rx="2" fill={active ? '#C2A38A' : '#B8A898'} />
      <path d="M 9 7  L 16 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 9 11 L 16 11" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 9 15 L 13 15" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const TABS = [
  { id: 'garden', label: 'Garden', Icon: GardenIcon },
  { id: 'today', label: 'Today', Icon: TodayIcon },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { id: 'log', label: 'Log', Icon: LogIcon },
]

export default function FloatingRail({ activePage, onNavigate, momMode }) {
  const [hoveredTab, setHoveredTab] = useState(null)

  // Theme colors based on Mom Mode
  const theme = momMode === 'sunset'
    ? {
        bg: 'rgba(255, 240, 224, 0.8)',
        border: 'rgba(200, 120, 74, 0.5)',
        activeColor: '#C8784A',
        inactiveColor: '#A88C74',
      }
    : {
        bg: 'rgba(253, 251, 247, 0.7)',
        border: 'rgba(212, 188, 168, 0.5)',
        activeColor: '#8DAA91',
        inactiveColor: '#A88C74',
      }

  return (
    <>
      {/* Fixed floating rail container */}
      <nav
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 0',
          background: theme.bg,
          backdropFilter: 'blur(12px)',
          borderRadius: '40px',
          border: `1.5px solid ${theme.border}`,
          zIndex: 50,
          transition: 'all 2000ms ease', // Mom Mode transition
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activePage === id
          const isHovered = hoveredTab === id

          return (
            <div key={id} style={{ position: 'relative' }}>
              {/* Main Icon Button */}
              <button
                onClick={() => onNavigate(id)}
                onMouseEnter={() => setHoveredTab(id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: isActive
                    ? `rgba(141, 170, 145, 0.2)`
                    : 'transparent',
                  border: isActive ? '1.5px solid rgba(141, 170, 145, 0.3)' : 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                <Icon active={isActive} />
              </button>

              {/* Tooltip on hover (LEFT side of rail) */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    left: '-80px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(74, 55, 40, 0.95)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: '"Indie Flower", cursive',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    animation: 'tooltipFade 0.2s ease',
                    zIndex: 100,
                  }}
                >
                  {label}
                  {/* Tooltip arrow */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-4px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '0',
                      height: '0',
                      borderLeft: '4px solid rgba(74, 55, 40, 0.95)',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* CSS animations */}
      <style>{`
        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(8px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
      `}</style>
    </>
  )
}