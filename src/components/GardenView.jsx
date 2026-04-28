// GardenView.jsx
// Phase 1: placeholder shell only.
// Phase 2 will fill this with the real pixel garden scene.

export default function GardenView({ momMode }) {
  return (
    <div style={{
      padding:    '32px 20px',
      display:    'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap:        '16px',
    }}>
      {/* Placeholder pixel soil strip */}
      <div style={{
        display:   'flex',
        gap:       '3px',
        flexWrap:  'wrap',
        justifyContent: 'center',
        width:     '200px',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              width:           '12px',
              height:          '12px',
              backgroundColor: '#F5DEB3',   // soil-0 (dry)
              borderRadius:    '1px',
            }}
          />
        ))}
      </div>

      {/* Phase 2 coming soon label */}
      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '6px',
        color:      '#C4A07A',
        textAlign:  'center',
        lineHeight: '2',
        marginTop:  '24px',
      }}>
        your garden<br />
        grows here<br />
        in phase 2 🌱
      </p>

      <p style={{
        fontFamily: '"Nunito", sans-serif',
        fontSize:   '12px',
        color:      '#9B6B4A',
        textAlign:  'center',
      }}>
        current mode: {momMode}
      </p>
    </div>
  )
}
