// LoadingPage.jsx — v3.0
// Shown on every app open. Auto-proceeds after ~2.5s.
// A sprout grows from soil while a soft progress bar fills.

import { useEffect, useState } from 'react'

export default function LoadingPage({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [stage,    setStage]    = useState(0) // 0=seed 1=sprout 2=stem 3=bloom

  useEffect(() => {
    // Progress bar fills over 2400ms
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 1.5
      })
    }, 36)

    // Sprout growth stages
    const t1 = setTimeout(() => setStage(1), 600)
    const t2 = setTimeout(() => setStage(2), 1200)
    const t3 = setTimeout(() => setStage(3), 1900)

    // Auto-proceed
    const done = setTimeout(() => onDone(), 2600)

    return () => {
      clearInterval(interval)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(done)
    }
  }, [])

  return (
    <div style={{
      minHeight:       '100%',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      backgroundColor: '#FFF8F0',
      gap:             '0',
      padding:         '0 32px 40px',
    }}>

      {/* App name — top */}
      <div style={{
        position:  'absolute',
        top:       '52px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '11px',
          color:      '#C2A38A',
          fontStyle:  'italic',
          margin:     '0 0 4px',
        }}>
          the
        </p>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '20px',
          fontWeight: '600',
          color:      '#4A3728',
          margin:     0,
          letterSpacing: '0.3px',
        }}>
          Slow-Bit Sanctuary
        </p>
      </div>

      {/* Growing sprout SVG */}
      <div style={{
        width:          '120px',
        height:         '160px',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        marginBottom:   '32px',
        position:       'relative',
      }}>
        <svg
          width="120" height="160"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soil */}
          <ellipse cx="60" cy="148" rx="36" ry="8"
            fill="#C2A38A" opacity="0.5" />

          {/* Stage 0 — seed (always visible) */}
          <ellipse
            cx="60" cy="142" rx="6" ry="4"
            fill="#D4A87C"
            style={{ transition: 'opacity 0.5s ease' }}
          />

          {/* Stage 1 — tiny sprout stem */}
          {stage >= 1 && (
            <path
              d="M 60 142 Q 59 130 60 118"
              stroke="#8DAA91" strokeWidth="3"
              strokeLinecap="round" fill="none"
              style={{ animation: 'growUp 0.5s ease forwards' }}
            />
          )}

          {/* Stage 1 — first two seed leaves */}
          {stage >= 1 && (
            <>
              <ellipse cx="52" cy="120" rx="9" ry="5"
                fill="#A8C8AC" opacity="0.9"
                transform="rotate(-30 52 120)"
                style={{ animation: 'fadeIn 0.4s ease forwards' }}
              />
              <ellipse cx="68" cy="120" rx="9" ry="5"
                fill="#A8C8AC" opacity="0.9"
                transform="rotate(30 68 120)"
                style={{ animation: 'fadeIn 0.4s ease forwards' }}
              />
            </>
          )}

          {/* Stage 2 — taller stem + bigger leaves */}
          {stage >= 2 && (
            <>
              <path
                d="M 60 142 Q 57 122 60 96"
                stroke="#8DAA91" strokeWidth="3"
                strokeLinecap="round" fill="none"
                style={{ animation: 'growUp 0.5s ease forwards' }}
              />
              <path
                d="M 60 118 Q 44 110 40 98 Q 50 102 60 118"
                fill="#8DAA91" opacity="0.8"
                style={{ animation: 'fadeIn 0.4s ease forwards' }}
              />
              <path
                d="M 60 112 Q 76 104 80 92 Q 70 97 60 112"
                fill="#8DAA91" opacity="0.8"
                style={{ animation: 'fadeIn 0.4s ease forwards' }}
              />
            </>
          )}

          {/* Stage 3 — full bloom */}
          {stage >= 3 && (
            <>
              {/* Full stem */}
              <path
                d="M 60 142 Q 56 118 60 78"
                stroke="#8DAA91" strokeWidth="3"
                strokeLinecap="round" fill="none"
              />
              {/* Petals */}
              <ellipse cx="60" cy="64" rx="10" ry="13"
                fill="#F4B8C8" opacity="0.9"
                style={{ animation: 'bloom 0.5s ease forwards' }}
              />
              <ellipse cx="60" cy="64" rx="10" ry="13"
                fill="#F4B8C8" opacity="0.85"
                transform="rotate(72 60 74)"
                style={{ animation: 'bloom 0.5s ease 0.05s forwards' }}
              />
              <ellipse cx="60" cy="64" rx="10" ry="13"
                fill="#F4B8C8" opacity="0.85"
                transform="rotate(144 60 74)"
                style={{ animation: 'bloom 0.5s ease 0.1s forwards' }}
              />
              <ellipse cx="60" cy="64" rx="10" ry="13"
                fill="#F4B8C8" opacity="0.85"
                transform="rotate(216 60 74)"
                style={{ animation: 'bloom 0.5s ease 0.15s forwards' }}
              />
              <ellipse cx="60" cy="64" rx="10" ry="13"
                fill="#F4B8C8" opacity="0.85"
                transform="rotate(288 60 74)"
                style={{ animation: 'bloom 0.5s ease 0.2s forwards' }}
              />
              {/* Center */}
              <circle cx="60" cy="74" r="8"
                fill="#F4C87C"
                style={{ animation: 'bloom 0.4s ease 0.2s forwards' }}
              />
              <circle cx="58" cy="72" r="2"
                fill="white" opacity="0.5" />
            </>
          )}
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        width:        '160px',
        height:       '4px',
        background:   'rgba(194,163,138,0.2)',
        borderRadius: '4px',
        overflow:     'hidden',
      }}>
        <div style={{
          height:          '100%',
          width:           `${Math.min(progress, 100)}%`,
          background:      'linear-gradient(90deg, #8DAA91, #C9B8D8)',
          borderRadius:    '4px',
          transition:      'width 0.1s linear',
        }} />
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: '"Indie Flower", cursive',
        fontSize:   '13px',
        color:      '#C2A38A',
        margin:     '16px 0 0',
        textAlign:  'center',
        opacity:    stage >= 1 ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        growing quietly...
      </p>

      <style>{`
        @keyframes growUp {
          from { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
          to   { opacity: 1; transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1);   }
        }
        @keyframes bloom {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1);   }
        }
      `}</style>
    </div>
  )
}