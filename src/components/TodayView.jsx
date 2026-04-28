// TodayView.jsx
// Phase 1: placeholder shell only.
// Phase 2 will add the input, Plant It button, and Bukan Hustle.

export default function TodayView() {
  return (
    <div style={{
      padding:       '32px 20px',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           '16px',
    }}>
      {/* Placeholder input area */}
      <div style={{
        width:           '100%',
        height:          '40px',
        backgroundColor: '#FFF8F0',
        border:          '2px solid #D4A96A',
        borderRadius:    '0',
      }} />

      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize:   '6px',
        color:      '#C4A07A',
        textAlign:  'center',
        lineHeight: '2',
        marginTop:  '24px',
      }}>
        log your win<br />
        here in phase 2 ☀
      </p>
    </div>
  )
}
