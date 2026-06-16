// LoadingPage.jsx — v3.0
// Full screen loading page shown twice:
// 1. On app open (before ClickPage)
// 2. After user taps ClickPage (before Garden)
// Sprout grows through 4 stages using real PNG assets.
// Auto-proceeds via onDone() callback.

import { useEffect, useState } from 'react'
import initialState from '../assets/initial_state.png'
import stage1       from '../assets/stage-1.png'
import stage2       from '../assets/stage-2.png'
import finalStage   from '../assets/final-stage.png'

// Stage order matches the timing below
const STAGES = [initialState, stage1, stage2, finalStage]

export default function LoadingPage({ onDone }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [progress,   setProgress]   = useState(0)
  const [visible,    setVisible]    = useState(false)

  useEffect(() => {
    // Fade in
    const tVisible = setTimeout(() => setVisible(true), 60)

    // Progress bar fills over ~2400ms
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + 1.5
      })
    }, 36)

    // Advance sprout stage every ~600ms
    const t1 = setTimeout(() => setStageIndex(1), 600)
    const t2 = setTimeout(() => setStageIndex(2), 1200)
    const t3 = setTimeout(() => setStageIndex(3), 1900)

    // Auto-proceed
    const done = setTimeout(() => onDone(), 2600)

    return () => {
      clearTimeout(tVisible)
      clearInterval(interval)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(done)
    }
  }, [])

  return (
    <div style={{
      minHeight:       '100dvh',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'space-between',
      backgroundColor: '#FFF8F0',
      overflow:        'hidden',
      opacity:         visible ? 1 : 0,
      transition:      'opacity 0.4s ease',
    }}>

      {/* ── App name — top ───────────────────────────────── */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        paddingTop:    '56px',
        gap:           '4px',
      }}>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '11px',
          color:      '#C2A38A',
          fontStyle:  'italic',
          margin:     0,
        }}>
          the
        </p>
        <p style={{
          fontFamily:    '"Lora", Georgia, serif',
          fontSize:      '22px',
          fontWeight:    '600',
          color:         '#4A3728',
          margin:        0,
          letterSpacing: '0.3px',
        }}>
          Slow-Bit Sanctuary
        </p>

        {/* Tagline */}
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '13px',
          color:      '#C2A38A',
          margin:     '8px 0 0',
          opacity:    stageIndex >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          growing quietly...
        </p>
      </div>

      {/* ── Sprout image — grows through stages ─────────── */}
      <div style={{
        flex:           1,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '24px 0',
      }}>
        <img
          key={stageIndex}          // remount triggers fade-in on each stage
          src={STAGES[stageIndex]}
          alt="growing sprout"
          style={{
            maxHeight:  '280px',
            maxWidth:   '80%',
            objectFit:  'contain',
            animation:  'stageIn 0.5s ease forwards',
          }}
        />
      </div>

      {/* ── Progress bar — bottom ────────────────────────── */}
      <div style={{
        width:         '100%',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        paddingBottom: '52px',
        gap:           '0',
      }}>
        <div style={{
          width:        '160px',
          height:       '4px',
          background:   'rgba(194,163,138,0.2)',
          borderRadius: '4px',
          overflow:     'hidden',
        }}>
          <div style={{
            height:       '100%',
            width:        `${Math.min(progress, 100)}%`,
            background:   'linear-gradient(90deg, #8DAA91, #C9B8D8)',
            borderRadius: '4px',
            transition:   'width 0.1s linear',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes stageIn {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px); }
        }
      `}</style>
    </div>
  )
}