// BottomNav.jsx — Watercolor Theme

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


function JournalIcon({ active }) {
  const c = active ? '#8DAA91' : '#A88C74'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="3" fill={active ? '#F4D4B8' : '#D4BCA8'} />
      <rect x="4" y="2" width="3"  height="18" rx="2" fill={active ? '#C2A38A' : '#B8A898'} />
      <path d="M 9 7  L 16 7"  stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 9 11 L 16 11" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 9 15 L 13 15" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const TABS = [
  { id: 'garden',   label: 'Garden',   Icon: GardenIcon   },
  { id: 'journal',  label: 'Journal',  Icon: JournalIcon   },
]

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav style={{
      display:         'flex',
      justifyContent:  'space-around',
      alignItems:      'center',
      padding:         '10px 0 16px',
      borderTop:       '1.5px solid #E8D8C8',
      backgroundColor: '#FDFBF7',
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activePage === id
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           '4px',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       '4px 14px',
              opacity:       isActive ? 1 : 0.5,
              transition:    'opacity 0.2s ease, transform 0.15s ease',
              transform:     isActive ? 'translateY(-1px)' : 'none',
            }}
          >
            <Icon active={isActive} />
            <span style={{
              // ↓ change font size here — 11px is comfortable for watercolor style
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '13px',
              color:      isActive ? '#4A3728' : '#A88C74',
              lineHeight: '1',
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
