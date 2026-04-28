// BottomNav.jsx
// The bottom navigation bar with 4 tabs.
// Props:
//   activePage  - string: 'garden' | 'today' | 'calendar' | 'log'
//   onNavigate  - function(page): called when a tab is tapped

// ── Pixel SVG icons for each tab ─────────────────────────────
// These are tiny 16×16 pixel SVGs drawn with <rect> elements.

function GardenIcon({ active }) {
  const color = active ? '#81B89A' : '#C4A07A'
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      {/* stem */}
      <rect x="7" y="8"  width="2" height="6" fill={color} />
      {/* left leaf */}
      <rect x="4" y="7"  width="3" height="2" fill={color} />
      {/* right leaf */}
      <rect x="9" y="5"  width="3" height="2" fill={color} />
      {/* flower center */}
      <rect x="6" y="2"  width="4" height="4" fill={active ? '#FFB3C6' : '#D4A96A'} />
      {/* pot */}
      <rect x="5" y="14" width="6" height="2" fill={active ? '#D4A96A' : '#C4A07A'} />
    </svg>
  )
}

function TodayIcon({ active }) {
  const color = active ? '#FF9A5C' : '#C4A07A'
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      {/* watering can body */}
      <rect x="3"  y="6"  width="7" height="6" fill={color} />
      {/* spout */}
      <rect x="10" y="8"  width="4" height="2" fill={color} />
      {/* handle */}
      <rect x="2"  y="5"  width="2" height="5" fill={color} />
      {/* water drop */}
      <rect x="13" y="10" width="2" height="3" fill={active ? '#C8F0DC' : '#D4A96A'} />
    </svg>
  )
}

function CalendarIcon({ active }) {
  const color = active ? '#C8A8E8' : '#C4A07A'
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      {/* calendar body */}
      <rect x="2"  y="3"  width="12" height="11" fill="none" stroke={color} strokeWidth="2" />
      {/* top bar */}
      <rect x="2"  y="3"  width="12" height="3"  fill={color} />
      {/* date dots */}
      <rect x="4"  y="9"  width="2"  height="2"  fill={color} />
      <rect x="7"  y="9"  width="2"  height="2"  fill={active ? '#FFB3C6' : '#C4A07A'} />
      <rect x="10" y="9"  width="2"  height="2"  fill={color} />
    </svg>
  )
}

function LogIcon({ active }) {
  const color = active ? '#85B7EB' : '#C4A07A'
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      {/* book body */}
      <rect x="3"  y="2"  width="10" height="12" fill="none" stroke={color} strokeWidth="2" />
      {/* spine */}
      <rect x="3"  y="2"  width="2"  height="12" fill={color} />
      {/* lines */}
      <rect x="6"  y="6"  width="5"  height="1"  fill={color} />
      <rect x="6"  y="9"  width="5"  height="1"  fill={color} />
      <rect x="6"  y="12" width="3"  height="1"  fill={color} />
    </svg>
  )
}

// ── Tab config ────────────────────────────────────────────────
const TABS = [
  {
    id:    'garden',
    label: 'garden',
    Icon:  GardenIcon,
  },
  {
    id:    'today',
    label: 'today',
    Icon:  TodayIcon,
  },
  {
    id:    'calendar',
    label: 'calendar',
    Icon:  CalendarIcon,
  },
  {
    id:    'log',
    label: 'log',
    Icon:  LogIcon,
  },
]

// ── Component ─────────────────────────────────────────────────
export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav
      style={{
        display:         'flex',
        justifyContent:  'space-around',
        alignItems:      'center',
        padding:         '10px 0 14px',
        borderTop:       '2px solid #D4A96A',
        backgroundColor: '#FFF8F0',
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activePage === id

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              gap:            '5px',
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              padding:        '4px 12px',
              opacity:        isActive ? 1 : 0.5,
              transition:     'opacity 0.15s ease',
            }}
          >
            <Icon active={isActive} />
            <span
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize:   '5px',
                color:      isActive ? '#5C3D1E' : '#9B6B4A',
                lineHeight: '1',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
