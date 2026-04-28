// LogView.jsx
// Phase 1: placeholder shell only.
// Phase 2 will populate this from LocalStorage entries.

export default function LogView() {
  return (
    <div style={{
      padding:       '32px 20px',
      display:       'flex',
      flexDirection: 'column',
      gap:           '12px',
    }}>
      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '7px',
        color:      '#7B4F2E',
        lineHeight: '2',
        margin:     0,
      }}>
        builder's log
      </p>

      {/* Placeholder entries */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          style={{
            border:          '2px solid #D4A96A',
            padding:         '10px 12px',
            backgroundColor: 'rgba(255, 240, 210, 0.6)',
            opacity:         0.4,
          }}
        >
          <div style={{
            width:           '60px',
            height:          '8px',
            backgroundColor: '#D4A96A',
            borderRadius:    '2px',
            marginBottom:    '6px',
          }} />
          <div style={{
            width:           '100%',
            height:          '10px',
            backgroundColor: '#D4A96A',
            borderRadius:    '2px',
          }} />
        </div>
      ))}

      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '5px',
        color:      '#C4A07A',
        textAlign:  'center',
        lineHeight: '2',
        marginTop:  '16px',
      }}>
        your wins appear<br />
        here in phase 2 📖
      </p>
    </div>
  )
}
