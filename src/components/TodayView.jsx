// TodayView.jsx — Watercolor Theme
// - 3 wins per day (each grows one plant)
// - "Come back tomorrow" only after 3rd win
// - Bukan Hustle always visible until a win is logged
// - After pressing Bukan Hustle: stays visible as "resting" state
// - Organic SVG character with hair + sage shirt

import { useState, useEffect } from 'react'
import {
  getTodayEntry,
  getTodayWins,
  getTodayWinCount,
  isTodayFull,
  addTodayWin,
  saveTodayRest,
  getAllWinsSorted,
  getFlowerTypeByIndex,
  getAllEntriesSorted,
  MAX_WINS_PER_DAY,
} from '../utils/storage'
import WatercolorPlant, { getGrowthStage, getFlowerType } from './WatercolorPlant'

const MAX_CHARS = 140

// ─────────────────────────────────────────────────────────────
// WATERCOLOR CHARACTER — organic person with hair + sage shirt
// standing (normal) or sitting (resting)
// ─────────────────────────────────────────────────────────────
function WatercolorPerson({ sitting = false, bouncing = false }) {
  return (
    <svg
      width="52" height="72"
      viewBox="0 0 52 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display:    'block',
        filter:     'drop-shadow(0 2px 6px rgba(139,94,46,0.15))',
        transform:  bouncing ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(.36,1.56,.64,1)',
      }}
    >
      {/* ── Hair ──────────────────────────────────────── */}
      {/* Main hair mass — soft organic shape */}
      <path d="M 15 8 Q 13 2 20 1 Q 26 0 32 2 Q 38 4 37 10 Q 38 6 36 4 Q 28 -1 20 1 Q 13 3 15 8 Z"
            fill="#5C3D1E" opacity="0.95" />
      {/* Hair sides — frames the face */}
      <path d="M 15 8 Q 12 12 13 18 Q 14 14 16 12 Z" fill="#5C3D1E" opacity="0.9" />
      <path d="M 37 10 Q 39 14 38 20 Q 37 15 35 12 Z" fill="#5C3D1E" opacity="0.9" />
      {/* Fringe / bangs */}
      <path d="M 18 6 Q 20 8 23 7 Q 26 6 28 8 Q 26 5 22 5 Q 19 5 18 6 Z"
            fill="#7A5030" opacity="0.6" />

      {/* ── Face ──────────────────────────────────────── */}
      <ellipse cx="26" cy="16" rx="10" ry="11" fill="#FDDCB8" />

      {/* Eyes */}
      <ellipse cx="22" cy="15" rx="2.5" ry="2.8" fill="#4A3020" />
      <ellipse cx="30" cy="15" rx="2.5" ry="2.8" fill="#4A3020" />
      {/* Eye shine */}
      <circle cx="21.5" cy="14" r="0.9" fill="white" opacity="0.8" />
      <circle cx="29.5" cy="14" r="0.9" fill="white" opacity="0.8" />
      {/* Eyelashes — small curved strokes */}
      <path d="M 20 13 Q 19 11 19.5 10.5" stroke="#4A3020" strokeWidth="0.8"
            strokeLinecap="round" fill="none" />
      <path d="M 22 12.5 Q 21.5 10.5 22 10" stroke="#4A3020" strokeWidth="0.8"
            strokeLinecap="round" fill="none" />
      <path d="M 28 12.5 Q 28.5 10.5 28 10" stroke="#4A3020" strokeWidth="0.8"
            strokeLinecap="round" fill="none" />
      <path d="M 30 13 Q 31 11 30.5 10.5" stroke="#4A3020" strokeWidth="0.8"
            strokeLinecap="round" fill="none" />

      {/* Rosy cheeks */}
      <ellipse cx="18" cy="19" rx="3" ry="2" fill="#F4A0A8" opacity="0.35" />
      <ellipse cx="34" cy="19" rx="3" ry="2" fill="#F4A0A8" opacity="0.35" />

      {/* Nose */}
      <path d="M 25 18 Q 24 20 26 21 Q 28 20 27 18" fill="#EDBC94" opacity="0.6" />

      {/* Mouth — smile when standing, content closed when sitting */}
      {!sitting && (
        <path d="M 22 23 Q 26 26 30 23" stroke="#D07060" strokeWidth="1.5"
              fill="none" strokeLinecap="round" />
      )}
      {sitting && (
        <path d="M 23 23 Q 26 25 29 23" stroke="#D07060" strokeWidth="1.4"
              fill="none" strokeLinecap="round" />
      )}

      {/* ── Body — sage green shirt ───────────────────── */}
      {!sitting && (
        <>
          {/* Torso */}
          <path d="M 16 28 Q 14 32 15 42 L 37 42 Q 38 32 36 28 Q 30 26 22 26 Z"
                fill="#7BAE8C" />
          {/* Shirt collar detail */}
          <path d="M 22 26 Q 26 30 30 26" stroke="#5C9070" strokeWidth="1.5"
                fill="none" strokeLinecap="round" />
          {/* Left arm */}
          <path d="M 16 29 Q 10 32 9 40 Q 12 41 14 40 Q 14 34 17 31 Z"
                fill="#7BAE8C" />
          {/* Right arm */}
          <path d="M 36 29 Q 42 32 43 40 Q 40 41 38 40 Q 38 34 35 31 Z"
                fill="#7BAE8C" />
          {/* Hands */}
          <ellipse cx="11" cy="41" rx="3.5" ry="3" fill="#FDDCB8" />
          <ellipse cx="41" cy="41" rx="3.5" ry="3" fill="#FDDCB8" />
          {/* Pants */}
          <path d="M 15 42 L 14 60 L 23 60 L 26 50 L 29 60 L 38 60 L 37 42 Z"
                fill="#9090B8" />
          {/* Shoes */}
          <ellipse cx="19" cy="61" rx="5.5" ry="3" fill="#7A5030" />
          <ellipse cx="33" cy="61" rx="5.5" ry="3" fill="#7A5030" />
        </>
      )}

      {/* Sitting pose */}
      {sitting && (
        <>
          {/* Body slightly leaning */}
          <path d="M 16 28 Q 14 32 15 40 L 37 40 Q 38 32 36 28 Q 30 26 22 26 Z"
                fill="#7BAE8C" />
          <path d="M 22 26 Q 26 30 30 26" stroke="#5C9070" strokeWidth="1.5"
                fill="none" strokeLinecap="round" />
          {/* Arms resting on knees */}
          <path d="M 16 30 Q 10 36 12 44 Q 15 45 16 44 Q 15 37 18 33 Z"
                fill="#7BAE8C" />
          <path d="M 36 30 Q 42 36 40 44 Q 37 45 36 44 Q 37 37 34 33 Z"
                fill="#7BAE8C" />
          <ellipse cx="13" cy="45" rx="3.5" ry="2.5" fill="#FDDCB8" />
          <ellipse cx="39" cy="45" rx="3.5" ry="2.5" fill="#FDDCB8" />
          {/* Legs bent/sitting */}
          <path d="M 15 40 Q 10 48 14 56 L 22 56 L 22 42 Z" fill="#9090B8" />
          <path d="M 37 40 Q 42 48 38 56 L 30 56 L 30 42 Z" fill="#9090B8" />
          {/* Feet */}
          <ellipse cx="14" cy="57" rx="5" ry="2.5" fill="#7A5030" />
          <ellipse cx="38" cy="57" rx="5" ry="2.5" fill="#7A5030" />
        </>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// WATERING CAN — organic watercolor style
// ─────────────────────────────────────────────────────────────
function WateringCan({ tipped = false }) {
  return (
    <svg
      width="44" height="40"
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display:         'block',
        filter:          'drop-shadow(0 2px 4px rgba(139,94,46,0.12))',
        transform:       tipped ? 'rotate(-35deg) translateY(-6px)' : 'rotate(0deg)',
        transition:      'transform 0.6s cubic-bezier(.36,1.56,.64,1)',
        transformOrigin: '80% 70%',
      }}
    >
      {/* Can body — rounded rectangle */}
      <rect x="4"  y="12" width="22" height="18" rx="4" fill="#C9B8D8" />
      {/* Shine */}
      <ellipse cx="10" cy="17" rx="3" ry="4" fill="white" opacity="0.2" />
      {/* Spout */}
      <path d="M 26 18 Q 34 16 38 14 Q 38 18 36 20 Q 32 20 26 22 Z"
            fill="#B8A8C8" />
      {/* Spout tip */}
      <ellipse cx="38" cy="16" rx="2.5" ry="3" fill="#B8A8C8" />
      {/* Handle */}
      <path d="M 5 12 Q 2 8 4 4 Q 7 2 10 4 Q 8 8 8 12"
            stroke="#B8A8C8" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Lid */}
      <rect x="8" y="10" width="14" height="4" rx="2" fill="#B8A8C8" />

      {/* Water drops when tipped */}
      {tipped && (
        <>
          <ellipse cx="40" cy="22" rx="1.5" ry="2.5" fill="#B8E8D0" opacity="0.8" />
          <ellipse cx="38" cy="27" rx="1.2" ry="2" fill="#B8E8D0" opacity="0.7" />
          <ellipse cx="42" cy="28" rx="1" ry="1.8" fill="#B8E8D0" opacity="0.6" />
        </>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// WIN SLOT — shows one of the 3 win input slots
// ─────────────────────────────────────────────────────────────
function WinSlot({ slotNumber, existingWin, isActive, onSubmit }) {
  const [text, setText] = useState('')
  const charsLeft = MAX_CHARS - text.length

  if (existingWin) {
    // Already logged — show the win
    return (
      <div style={{
        background:   'rgba(141,170,145,0.12)',
        border:       '1.5px solid #8DAA91',
        borderRadius: '12px',
        padding:      '10px 14px',
        display:      'flex',
        gap:          '10px',
        alignItems:   'flex-start',
        animation:    'fadeUp 0.4s ease',
      }}>
        <span style={{
          fontFamily:  '"Indie Flower", cursive',
          fontSize:    '18px',
          color:       '#8DAA91',
          flexShrink:  0,
          lineHeight:  '1.3',
        }}>
          {slotNumber}.
        </span>
        <p style={{
          fontFamily:  '"Nunito", sans-serif',
          fontSize:    '13px',
          color:       '#4A3728',
          margin:      0,
          lineHeight:  '1.5',
          flex:        1,
        }}>
          {existingWin.text}
        </p>
        <span style={{ fontSize: '14px', flexShrink: 0 }}>🌸</span>
      </div>
    )
  }

  if (!isActive) {
    // Future slot — shown greyed out
    return (
      <div style={{
        background:   'rgba(212,188,168,0.15)',
        border:       '1.5px dashed #D4BCA8',
        borderRadius: '12px',
        padding:      '10px 14px',
        display:      'flex',
        gap:          '10px',
        alignItems:   'center',
        opacity:      0.5,
      }}>
        <span style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '18px',
          color:      '#A88C74',
        }}>
          {slotNumber}.
        </span>
        <p style={{
          fontFamily: '"Nunito", sans-serif',
          fontSize:   '12px',
          color:      '#A88C74',
          margin:     0,
          fontStyle:  'italic',
        }}>
          log win {slotNumber - 1} first...
        </p>
      </div>
    )
  }

  // Active — show input
  return (
    <div style={{
      background:   'rgba(253,251,247,0.95)',
      border:       '1.5px solid #C2A38A',
      borderRadius: '12px',
      padding:      '12px 14px',
      animation:    'fadeUp 0.3s ease',
    }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '18px',
          color:      '#C2A38A',
          flexShrink: 0,
          marginTop:  '2px',
        }}>
          {slotNumber}.
        </span>
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder={
              slotNumber === 1 ? 'what is one small thing you did today?'
            : slotNumber === 2 ? 'anything else worth celebrating?'
            :                    'one more gentle win...'
            }
            rows={2}
            autoFocus={isActive}
            style={{
              width:        '100%',
              background:   'transparent',
              border:       'none',
              borderBottom: '1.5px solid #D4BCA8',
              borderRadius: '0',
              padding:      '4px 0 20px',
              fontFamily:   '"Nunito", sans-serif',
              fontSize:     '13px',
              color:        '#4A3728',
              outline:      'none',
              resize:       'none',
              lineHeight:   '1.5',
              display:      'block',
            }}
            onKeyDown={e => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (text.trim()) onSubmit(text.trim())
              }
            }}
          />
          <span style={{
            position:   'absolute',
            bottom:     '4px',
            right:      '0',
            fontFamily: '"Nunito", sans-serif',
            fontSize:   '10px',
            color:      charsLeft < 20 ? '#E07060' : '#A88C74',
          }}>
            {charsLeft}
          </span>
        </div>
      </div>
      <button
        onClick={() => { if (text.trim()) onSubmit(text.trim()) }}
        style={{
          marginTop:       '10px',
          marginLeft:      '28px',
          backgroundColor: text.trim() ? '#8DAA91' : '#D4BCA8',
          border:          'none',
          borderRadius:    '20px',
          padding:         '6px 18px',
          fontFamily:      '"Indie Flower", cursive',
          fontSize:        '14px',
          color:           text.trim() ? 'white' : '#A88C74',
          cursor:          text.trim() ? 'pointer' : 'default',
          transition:      'all 0.2s ease',
          boxShadow:       text.trim() ? '0 2px 8px rgba(141,170,145,0.3)' : 'none',
        }}
      >
        plant it 🌱
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function TodayView({ momMode }) {
  const [todayEntry,  setTodayEntry]  = useState(null)
  const [todayWins,   setTodayWins]   = useState([])
  const [winCount,    setWinCount]    = useState(0)
  const [recentWins,  setRecentWins]  = useState([])
  const [isSitting,   setIsSitting]   = useState(false)
  const [isBouncing,  setIsBouncing]  = useState(false)
  const [isTipped,    setIsTipped]    = useState(false)
  const [isResting,   setIsResting]   = useState(false)
  const [latestPlant, setLatestPlant] = useState(null)

  function refresh() {
    const entry = getTodayEntry()
    const wins  = entry?.wins ?? []
    setTodayEntry(entry)
    setTodayWins(wins)
    setWinCount(wins.length)
    setIsResting(entry?.mode === 'rest')
    // Recent wins = last 3 wins from previous days
    const allWins = getAllWinsSorted()
    const todayKey = new Date().toISOString().slice(0, 10).replace(/-/g, '-')
    setRecentWins(allWins.filter(w => w.key !== todayKey).slice(0, 3))
  }

  useEffect(() => {
    refresh()
  }, [])

  // Restore sitting state if already rested today
  useEffect(() => {
    if (isResting) setIsSitting(true)
  }, [isResting])

  function handleWinSubmit(text) {
    const allWins   = getAllWinsSorted()
    const flowerIdx = allWins.length  // total wins ever = index for next flower
    const flower    = getFlowerType(flowerIdx)
    const saved     = addTodayWin(text, flower)
    if (saved) {
      setIsBouncing(true)
      setIsTipped(true)
      setLatestPlant({ flower, timestamp: Date.now() })
      setTimeout(() => setIsBouncing(false), 500)
      setTimeout(() => setIsTipped(false),   1800)
      refresh()
    }
  }

  function handleHustle() {
    saveTodayRest()
    setIsSitting(true)
    setIsResting(true)
    refresh()
  }

  const isFull   = winCount >= MAX_WINS_PER_DAY
  const isWinDay = winCount > 0

  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #F4A87C 0%, #F4D4A0 100%)'
    : 'linear-gradient(180deg, #FDE8D0 0%, #FFF8F0 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Scene ──────────────────────────────────────── */}
      <div style={{
        background:     skyBg,
        transition:     'background 2000ms ease',
        minHeight:      '140px',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        gap:            '12px',
        padding:        '16px 20px 10px',
        position:       'relative',
      }}>
        {/* Ground line */}
        <div style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          right:           0,
          height:          '3px',
          background:      'linear-gradient(90deg, transparent, #C2A38A 20%, #C2A38A 80%, transparent)',
          opacity:         0.4,
        }} />

        <WatercolorPerson sitting={isSitting} bouncing={isBouncing} />
        <div style={{ marginBottom: '8px' }}>
          <WateringCan tipped={isTipped} />
        </div>

        {/* Latest planted flower pops up */}
        {latestPlant && (
          <div style={{ marginBottom: '4px', animation: 'bloom 0.6s ease' }}>
            <WatercolorPlant
              flowerType={latestPlant.flower}
              growthStage={0}
              size={0.8}
              animate={false}
            />
          </div>
        )}
      </div>

      {/* ── Interaction ──────────────────────────────── */}
      <div style={{ padding: '16px 18px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Header */}
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '15px',
          color:      '#7A5C44',
          margin:     0,
          fontStyle:  'italic',
          lineHeight: '1.5',
        }}>
          {isFull
            ? 'three wins today — your garden is growing. 🌸'
            : isResting
            ? 'resting today. that\'s a choice, not a failure.'
            : 'what grew in you today?'}
        </p>

        {/* Win progress indicator */}
        {!isResting && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {Array.from({ length: MAX_WINS_PER_DAY }).map((_, i) => (
              <div key={i} style={{
                width:        i < winCount ? '28px' : '12px',
                height:       '6px',
                borderRadius: '3px',
                background:   i < winCount ? '#8DAA91' : '#D4BCA8',
                transition:   'all 0.4s ease',
              }} />
            ))}
            <span style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize:   '11px',
              color:      '#A88C74',
              marginLeft: '4px',
            }}>
              {winCount}/{MAX_WINS_PER_DAY} wins today
            </span>
          </div>
        )}

        {/* 3 win slots */}
        {!isResting && Array.from({ length: MAX_WINS_PER_DAY }).map((_, i) => (
          <WinSlot
            key={i}
            slotNumber={i + 1}
            existingWin={todayWins[i] ?? null}
            isActive={i === winCount && !isFull}
            onSubmit={handleWinSubmit}
          />
        ))}

        {/* Come back tomorrow — only after 3rd win */}
        {isFull && (
          <div style={{
            background:   'rgba(141,170,145,0.1)',
            border:       '1.5px solid #8DAA91',
            borderRadius: '12px',
            padding:      '12px 16px',
            animation:    'fadeUp 0.5s ease',
          }}>
            <p style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '15px',
              color:      '#5C8C64',
              margin:     0,
              lineHeight: '1.6',
              textAlign:  'center',
            }}>
              three is enough for today. 🌿<br />
              your garden grows slowly, just like real life.<br />
              <span style={{ fontSize: '13px', color: '#8DAA91' }}>
                come back tomorrow for three more moments.
              </span>
            </p>
          </div>
        )}

        {/* Bukan Hustle — visible as long as no wins logged */}
        {!isWinDay && (
          <button
            onClick={!isResting ? handleHustle : undefined}
            style={{
              width:           '100%',
              background:      isResting ? 'rgba(244,212,184,0.4)' : 'rgba(253,251,247,0.9)',
              border:          `1.5px solid ${isResting ? '#C2A38A' : '#D4BCA8'}`,
              borderRadius:    '12px',
              padding:         '12px 0',
              fontFamily:      '"Indie Flower", cursive',
              fontSize:        '15px',
              color:           isResting ? '#9C7A5C' : '#A88C74',
              cursor:          isResting ? 'default' : 'pointer',
              lineHeight:      '1.6',
              boxShadow:       isResting ? 'none' : '0 2px 8px rgba(139,94,46,0.08)',
              transition:      'all 0.2s ease',
            }}
          >
            {isResting
              ? '☕ resting today — and that\'s okay'
              : 'bukan hustle ☕  it\'s okay to do nothing today'
            }
          </button>
        )}

        {/* Rest message */}
        {isResting && (
          <div style={{
            background:   'rgba(244,212,184,0.25)',
            border:       '1.5px solid #D4BCA8',
            borderRadius: '12px',
            padding:      '12px 16px',
            animation:    'fadeUp 0.4s ease',
          }}>
            <p style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '15px',
              color:      '#9C7A5C',
              margin:     0,
              lineHeight: '1.7',
              textAlign:  'center',
            }}>
              your progress is safe. 🌿<br />
              <span style={{ fontSize: '13px', color: '#A88C74' }}>
                rest days are part of the garden, too.
              </span>
            </p>
          </div>
        )}

        {/* Recent wins from previous days */}
        {recentWins.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            <p style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '13px',
              color:      '#A88C74',
              margin:     0,
            }}>
              from your garden...
            </p>
            {recentWins.map((win, i) => (
              <div key={i} style={{
                display:      'flex',
                gap:          '8px',
                padding:      '6px 10px',
                background:   'rgba(141,170,145,0.08)',
                borderLeft:   '2.5px solid #8DAA91',
                borderRadius: '0 8px 8px 0',
              }}>
                <span style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize:   '10px',
                  color:      '#A88C74',
                  flexShrink: 0,
                  marginTop:  '2px',
                  whiteSpace: 'nowrap',
                }}>
                  {win.key.slice(5)}
                </span>
                <span style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize:   '12px',
                  color:      '#4A3728',
                  lineHeight: '1.4',
                }}>
                  {win.text}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
