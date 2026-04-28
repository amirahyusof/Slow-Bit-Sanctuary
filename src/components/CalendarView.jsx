// CalendarView.jsx
// Phase 1: placeholder shell only.
// Phase 3 will add the full month grid with flower icons.

export default function CalendarView() {
  const now   = new Date()
  const month = now.toLocaleString('en-GB', { month: 'long' })
  const year  = now.getFullYear()

  return (
    <div style={{
      padding:       '32px 20px',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '16px',
    }}>
      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '7px',
        color:      '#7B4F2E',
        textAlign:  'center',
        lineHeight: '2',
      }}>
        {month} {year}
      </p>

      {/* Placeholder grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap:                 '4px',
        width:               '100%',
      }}>
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            style={{
              height:          '28px',
              backgroundColor: '#F5DEB3',
              borderRadius:    '3px',
              opacity:         0.4,
            }}
          />
        ))}
      </div>

      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '5px',
        color:      '#C4A07A',
        textAlign:  'center',
        lineHeight: '2',
        marginTop:  '16px',
      }}>
        full calendar<br />
        coming in phase 3 📅
      </p>
    </div>
  )
}
