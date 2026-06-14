// GardenView.jsx — v3.0 (Home Screen)
// Combines: meadow scene + daily input + flower grid strip
// One entry per day. One sentence. One flower.

import { useState, useEffect } from 'react'
import {
  getTodayEntry,
  saveTodayWin,
  saveTodayRest,
  getEntriesForMonth,
  getMonthDots,
  getCurrentStreak,
  formatDateShort,
} from '../utils/storage'
import { getAffirmation } from '../utils/affirmations'

// ── Asset imports ─────────────────────────────────────────────
import staticBg     from '../assets/static-background.png'
import dahliaImg    from '../assets/pink_dahlia.png'
import tulipImg     from '../assets/Purple & Pink Tulips.png'
import marigoldImg  from '../assets/sunset_marigold.png'
import saplingImg   from '../assets/Small Sapling_Tree.png'
import succulentImg from '../assets/Small Succulent.png'
import lavenderImg from '../assets/lavender_tulip.png'
import mintDaisyImg from '../assets/mint_daisy.png'
import peachRoseImg from '../assets/peach_rose.png'
import pinkpurpleDahliaImg from '../assets/pink_purple_dahlia.png'

const FLOWER_IMAGES = {
  'pink-dahlia':     dahliaImg,
  'lavender-tulip':  lavenderImg,
  'mint-daisy':      mintDaisyImg,
  'peach-rose':      peachRoseImg,
  'sunset-marigold': marigoldImg,
  'pink-purple-dahlia': pinkpurpleDahliaImg,
  'sapling-tree': saplingImg,
  'small-succulent': succulentImg,
  'marigold': marigoldImg,
}
const FLOWER_ASSET_LIST = [
  dahliaImg, lavenderImg, mintDaisyImg, peachRoseImg, marigoldImg, pinkpurpleDahliaImg, saplingImg, succulentImg
]

function getFlowerImg(flower, index) {
  return FLOWER_IMAGES[flower] || FLOWER_ASSET_LIST[index % FLOWER_ASSET_LIST.length]
}

const MEADOW_COORDINATES = [
  { top: '72%', left: '15%', scale: 0.8  },
  { top: '74%', left: '35%', scale: 0.85 },
  { top: '71%', left: '55%', scale: 0.8  },
  { top: '75%', left: '75%', scale: 0.9  },
  { top: '73%', left: '90%', scale: 0.85 },
  { top: '80%', left: '10%', scale: 1.0  },
  { top: '83%', left: '25%', scale: 1.05 },
  { top: '81%', left: '45%', scale: 1.1  },
  { top: '84%', left: '65%', scale: 1.0  },
  { top: '81%', left: '85%', scale: 1.05 },
  { top: '89%', left: '18%', scale: 1.2  },
  { top: '92%', left: '38%', scale: 1.3  },
  { top: '91%', left: '58%', scale: 1.2  },
  { top: '93%', left: '78%', scale: 1.35 },
  { top: '88%', left: '5%',  scale: 1.2  },
  { top: '89%', left: '50%', scale: 1.25 },
]

const MAX_CHARS = 140

// ─────────────────────────────────────────────────────────────

export default function GardenView({ momMode }) {
  const now          = new Date()
  const currentYear  = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const todayDate    = now.getDate()

  const [todayEntry,   setTodayEntry]   = useState(null)
  const [inputText,    setInputText]    = useState('')
  const [monthEntries, setMonthEntries] = useState([])
  const [dots,         setDots]         = useState([])
  const [streak,       setStreak]       = useState(0)
  const [peekedDot,    setPeekedDot]    = useState(null)
  const [justLogged,   setJustLogged]   = useState(false)

  function refresh() {
    setTodayEntry(getTodayEntry())
    setMonthEntries(getEntriesForMonth(currentYear, currentMonth))
    setDots(getMonthDots(currentYear, currentMonth))
    setStreak(getCurrentStreak())
  }

  useEffect(() => { refresh() }, [])

  function handleSubmit() {
    if (!inputText.trim()) return
    const ok = saveTodayWin(inputText.trim())
    if (ok) {
      setJustLogged(true)
      setTimeout(() => setJustLogged(false), 1200)
      setInputText('')
      refresh()
    }
  }

  function handleRest() {
    const ok = saveTodayRest()
    if (ok) refresh()
  }

  function handleSquareClick(dot) {
    if (!dot.mode) return
    setPeekedDot(prev => prev?.key === dot.key ? null : dot)
  }

  const hasLogged  = !!todayEntry
  const isResting  = todayEntry?.mode === 'rest'
  const charsLeft  = MAX_CHARS - inputText.length
  const winEntries = monthEntries.filter(e => e.mode === 'win')
  const monthName  = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
  const affirmation = getAffirmation(streak, isResting)

  return (
    <div style={{
      display:         'flex',
      flexDirection:   'column',
      minHeight:       '100%',
      backgroundColor: '#FDFBF7',
    }}>

      {/* ── 1. MEADOW ────────────────────────────────────── */}
      <div style={{
        height:             '42vh',
        position:           'relative',
        backgroundImage:    `url(${staticBg})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        overflow:           'hidden',
        borderRadius:       '0 0 28px 28px',
        flexShrink:         0,
      }}>
        {momMode === 'sunset' && (
          <div style={{
            position:      'absolute',
            inset:         0,
            background:    'linear-gradient(180deg, rgba(255,140,0,0.22) 0%, rgba(255,80,0,0.10) 100%)',
            pointerEvents: 'none',
            zIndex:        1,
            transition:    'opacity 2000ms ease',
          }} />
        )}

        {winEntries.slice(0, MEADOW_COORDINATES.length).map((entry, i) => {
          const coord = MEADOW_COORDINATES[i]
          const isNewest = justLogged && i === winEntries.length - 1
          return (
            <div
              key={entry.key}
              style={{
                position:       'absolute',
                top:            coord.top,
                left:           coord.left,
                zIndex:         2,
                transform:      `scale(${coord.scale}) translate(-50%, -85%)`,
                width:          '90px',
                opacity:        0.95,
                animation:      isNewest
                  ? 'bloom 0.7s ease forwards'
                  : `sway ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: isNewest ? '0s' : `${i * 0.3}s`,
              }}
            >
              <img
                src={getFlowerImg(entry.flower, i)}
                alt="flower"
                style={{
                  width:   '100%',
                  height:  'auto',
                  filter:  'drop-shadow(0 3px 5px rgba(0,0,0,0.07))',
                  display: 'block',
                }}
              />
            </div>
          )
        })}

        {winEntries.length === 0 && (
          <div style={{
            position:   'absolute',
            bottom:     '20px',
            left:       0,
            right:      0,
            textAlign:  'center',
            fontFamily: '"Indie Flower", cursive',
            fontSize:   '13px',
            color:      'rgba(255,255,255,0.75)',
            zIndex:     2,
          }}>
            your garden is waiting 🌱
          </div>
        )}
      </div>

      {/* ── 2. AFFIRMATION ───────────────────────────────── */}
      <div style={{ padding: '14px 20px 0', textAlign: 'center' }}>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '13px',
          color:      '#8DAA91',
          fontStyle:  'italic',
          margin:     0,
          lineHeight: '1.6',
        }}>
          {affirmation}
        </p>
      </div>

      {/* ── 3. DAILY INPUT ───────────────────────────────── */}
      <div style={{
        padding:       '16px 20px',
        display:       'flex',
        flexDirection: 'column',
        gap:           '12px',
      }}>
        <p style={{
          fontFamily: '"Lora", Georgia, serif',
          fontSize:   '16px',
          fontWeight: '600',
          color:      '#4A3728',
          margin:     0,
          lineHeight: '1.5',
        }}>
          What did you notice today?
        </p>

        {/* State A: not yet logged */}
        {!hasLogged && (
          <>
            <div style={{ position: 'relative' }}>
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value.slice(0, MAX_CHARS))}
                placeholder="one small thing..."
                rows={3}
                style={{
                  width:        '100%',
                  boxSizing:    'border-box',
                  background:   'rgba(253,251,247,0.95)',
                  border:       '1.5px solid #D4BCA8',
                  borderRadius: '12px',
                  padding:      '12px 14px 28px',
                  fontFamily:   '"Nunito", sans-serif',
                  fontSize:     '14px',
                  color:        '#4A3728',
                  outline:      'none',
                  resize:       'none',
                  lineHeight:   '1.6',
                  transition:   'border-color 0.2s ease',
                }}
                onFocus={e => { e.target.style.borderColor = '#8DAA91' }}
                onBlur={e  => { e.target.style.borderColor = '#D4BCA8' }}
              />
              <span style={{
                position:   'absolute',
                bottom:     '10px',
                right:      '12px',
                fontSize:   '11px',
                color:      charsLeft < 20 ? '#C87060' : '#C2A38A',
                fontFamily: '"Indie Flower", cursive',
                transition: 'color 0.2s',
              }}>
                {charsLeft}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim()}
                style={{
                  flex:            1,
                  padding:         '11px 0',
                  backgroundColor: inputText.trim() ? '#8DAA91' : '#D4BCA8',
                  border:          'none',
                  borderRadius:    '12px',
                  fontFamily:      '"Indie Flower", cursive',
                  fontSize:        '15px',
                  color:           'white',
                  cursor:          inputText.trim() ? 'pointer' : 'default',
                  transition:      'background-color 0.2s ease, transform 0.1s ease',
                  boxShadow:       inputText.trim() ? '0 2px 8px rgba(141,170,145,0.3)' : 'none',
                }}
                onMouseEnter={e => { if (inputText.trim()) e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Write it down
              </button>

              <button
                onClick={handleRest}
                style={{
                  padding:         '11px 16px',
                  backgroundColor: 'transparent',
                  border:          '1.5px solid #D4BCA8',
                  borderRadius:    '12px',
                  fontFamily:      '"Indie Flower", cursive',
                  fontSize:        '15px',
                  color:           '#A88C74',
                  cursor:          'pointer',
                  transition:      'all 0.2s ease',
                  whiteSpace:      'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C2A38A'; e.currentTarget.style.color = '#7A5C44' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4BCA8'; e.currentTarget.style.color = '#A88C74' }}
              >
                Not today ☕
              </button>
            </div>
          </>
        )}

        {/* State B: win logged */}
        {hasLogged && todayEntry.mode === 'win' && (
          <div style={{
            background:   'rgba(141,170,145,0.10)',
            border:       '1.5px solid rgba(141,170,145,0.35)',
            borderRadius: '12px',
            padding:      '14px 16px',
            animation:    'fadeUp 0.4s ease',
          }}>
            <p style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize:   '14px',
              color:      '#4A3728',
              margin:     '0 0 8px',
              lineHeight: '1.6',
              fontStyle:  'italic',
            }}>
              "{todayEntry.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily:   '"Indie Flower", cursive',
                fontSize:     '12px',
                color:        '#8DAA91',
                background:   'rgba(141,170,145,0.15)',
                border:       '1px solid rgba(141,170,145,0.3)',
                borderRadius: '20px',
                padding:      '3px 10px',
              }}>
                🌸 {todayEntry.flower?.replace(/-/g, ' ') || 'flower'}
              </span>
              <span style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize:   '11px',
                color:      '#C2A38A',
              }}>
                planted today
              </span>
            </div>
          </div>
        )}

        {/* State C: rest day */}
        {hasLogged && todayEntry.mode === 'rest' && (
          <div style={{
            background:   'rgba(201,184,216,0.12)',
            border:       '1.5px solid rgba(201,184,216,0.35)',
            borderRadius: '12px',
            padding:      '14px 16px',
            animation:    'fadeUp 0.4s ease',
          }}>
            <p style={{
              fontFamily: '"Lora", Georgia, serif',
              fontSize:   '14px',
              color:      '#7A5C44',
              margin:     0,
              lineHeight: '1.6',
              fontStyle:  'italic',
            }}>
              That's okay. Your garden remembers you. ☕
            </p>
          </div>
        )}
      </div>

      {/* ── 4. FLOWER GRID STRIP ─────────────────────────── */}
      <div style={{ padding: '0 20px 28px' }}>

        {/* Label */}
        <p style={{
          fontFamily: '"Indie Flower", cursive',
          fontSize:   '12px',
          color:      '#A88C74',
          margin:     '0 0 8px',
        }}>
          {monthName} · tap any day to read it
        </p>

        {/* Grid — 11 columns, same layout as before */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          gap:                 '5px',
        }}>
          {dots.map((dot, i) => {
            const isToday    = dot.day === todayDate
            const isSelected = peekedDot?.key === dot.key
            const hasEntry   = !!dot.mode

            // Background colour per state
            let bg = 'rgba(194,163,138,0.08)'
            if (dot.mode === 'win')  bg = 'rgba(244,184,200,0.45)'
            if (dot.mode === 'rest') bg = 'rgba(201,184,216,0.35)'

            return (
              <div
                key={dot.key}
                onClick={() => handleSquareClick(dot)}
                style={{
                  aspectRatio:    '1',
                  borderRadius:   '7px',
                  background:     bg,
                  border:         isToday
                    ? '2px solid #FF9A5C'
                    : isSelected
                    ? '2px solid #8DAA91'
                    : '1px solid rgba(194,163,138,0.12)',
                  cursor:         hasEntry ? 'pointer' : 'default',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  transition:     'transform 0.15s ease, box-shadow 0.15s ease',
                  transform:      isSelected ? 'scale(1.12)' : 'scale(1)',
                  boxShadow:      isSelected ? '0 2px 8px rgba(141,170,145,0.25)' : 'none',
                  position:       'relative',
                  overflow:       'hidden',
                }}
                onMouseEnter={e => {
                  if (hasEntry && !isSelected) e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Flower image for win days */}
                {dot.mode === 'win' && dot.flower && (
                  <img
                    src={getFlowerImg(dot.flower, i)}
                    alt="flower"
                    style={{
                      width:      '80%',
                      height:     '80%',
                      objectFit:  'contain',
                    }}
                  />
                )}

                {/* Rest icon */}
                {dot.mode === 'rest' && (
                  <span style={{ fontSize: '11px', lineHeight: 1 }}>☕</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Popover — appears below grid when a square is tapped */}
        {peekedDot && (
          <div style={{
            marginTop:    '10px',
            padding:      '12px 14px',
            background:   'rgba(253,251,247,0.97)',
            border:       '1.5px solid #D4BCA8',
            borderRadius: '12px',
            animation:    'fadeUp 0.25s ease',
          }}>
            <p style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize:   '11px',
              color:      '#A88C74',
              margin:     '0 0 6px',
            }}>
              {formatDateShort(peekedDot.key)}
            </p>

            {peekedDot.mode === 'win' && (
              <>
                <p style={{
                  fontFamily: '"Lora", Georgia, serif',
                  fontSize:   '13px',
                  color:      '#4A3728',
                  margin:     '0 0 8px',
                  fontStyle:  'italic',
                  lineHeight: '1.5',
                }}>
                  "{peekedDot.text}"
                </p>
                <span style={{
                  fontFamily:   '"Indie Flower", cursive',
                  fontSize:     '11px',
                  color:        '#8DAA91',
                  background:   'rgba(141,170,145,0.15)',
                  border:       '1px solid rgba(141,170,145,0.3)',
                  borderRadius: '20px',
                  padding:      '2px 8px',
                }}>
                  🌸 {peekedDot.flower?.replace(/-/g, ' ') || 'flower'}
                </span>
              </>
            )}

            {peekedDot.mode === 'rest' && (
              <p style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize:   '13px',
                color:      '#7A5C44',
                margin:     0,
                fontStyle:  'italic',
              }}>
                A rest day. ☕
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Animations ───────────────────────────────────── */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: scale(var(--s,1)) rotate(-1.5deg) translate(-50%, -85%); }
          50%       { transform: scale(var(--s,1)) rotate( 1.5deg) translate(-50%, -85%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes bloom {
          0%   { opacity: 0; transform: scale(0.4) translate(-50%, -85%); }
          60%  { transform: scale(1.15) translate(-50%, -85%); }
          100% { opacity: 1; transform: scale(1)   translate(-50%, -85%); }
        }
      `}</style>
    </div>
  )
}