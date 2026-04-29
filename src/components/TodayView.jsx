// TodayView.jsx — Phase 2 (v3)
//
// Fixes:
//   - Bukan Hustle button stays visible after pressing (shows dimmed/active state)
//   - One win per day is intentional — UI now explains this warmly instead of hiding
//   - Character is the original person, now with hair and a sage-green shirt

import { useState, useEffect } from 'react'
import {
  getTodayEntry,
  saveTodayEntry,
  getAllEntriesSorted,
} from '../utils/storage'
import { getFlowerType } from './PixelPlant'
import PixelPlant from './PixelPlant'

const MAX_CHARS = 140

// ─────────────────────────────────────────────────────────────
// PIXEL PERSON
// Original person shape, now with:
//   - Short wavy hair (dark brown)
//   - Sage-green shirt instead of purple
//   - Sitting pose when resting
// ─────────────────────────────────────────────────────────────
function PixelPerson({ sitting = false, bouncing = false }) {
  // Shirt colour — change this to customise
  const SHIRT = '#7BAE8C'       // sage green
  const SHIRT_DARK = '#5C9070'  // shirt shadow / arm shade
  const HAIR  = '#5C3D1E'       // dark brown hair
  const SKIN  = '#FFDAB9'
  const PANTS = '#9090C0'
  const SHOES = '#7B4F2E'

  return (
    <svg
      width="44" height="58"
      viewBox="0 0 44 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering: 'pixelated',
        display:        'block',
        transform:      bouncing ? 'translateY(-8px)' : 'translateY(0)',
        transition:     'transform 0.35s cubic-bezier(.36,1.56,.64,1)',
      }}
    >
      {/* ── Hair ─────────────────────────────────────────── */}
      {/* Top of hair */}
      <rect x="14" y="0"  width="16" height="4"  fill={HAIR} />
      {/* Hair sides */}
      <rect x="12" y="2"  width="4"  height="8"  fill={HAIR} />
      <rect x="28" y="2"  width="4"  height="6"  fill={HAIR} />
      {/* Hair back / volume */}
      <rect x="14" y="2"  width="16" height="6"  fill={HAIR} />
      {/* Small wavy fringe detail */}
      <rect x="16" y="6"  width="3"  height="2"  fill={HAIR} />
      <rect x="22" y="5"  width="3"  height="3"  fill={HAIR} />

      {/* ── Head ─────────────────────────────────────────── */}
      <rect x="14" y="6"  width="16" height="12" fill={SKIN} />
      {/* Head sides */}
      <rect x="12" y="8"  width="2"  height="8"  fill={SKIN} />
      <rect x="30" y="8"  width="2"  height="8"  fill={SKIN} />

      {/* ── Eyes ─────────────────────────────────────────── */}
      <rect x="16" y="10" width="4"  height="3"  fill="#3A2010" />
      <rect x="24" y="10" width="4"  height="3"  fill="#3A2010" />
      {/* Eye shine */}
      <rect x="17" y="10" width="1"  height="1"  fill="#FFF8F0" />
      <rect x="25" y="10" width="1"  height="1"  fill="#FFF8F0" />

      {/* ── Smile ────────────────────────────────────────── */}
      <rect x="17" y="15" width="10" height="2"  fill="#E07060" />
      {/* Rosy cheeks */}
      <rect x="14" y="14" width="3"  height="2"  fill="#FFB3C6" style={{ opacity: 0.6 }} />
      <rect x="27" y="14" width="3"  height="2"  fill="#FFB3C6" style={{ opacity: 0.6 }} />

      {/* ── Body / Shirt ─────────────────────────────────── */}
      {!sitting && (
        <>
          <rect x="14" y="18" width="16" height="14" fill={SHIRT} />
          {/* Shirt collar */}
          <rect x="19" y="18" width="6"  height="3"  fill={SHIRT_DARK} />
          {/* Arms */}
          <rect x="8"  y="18" width="6"  height="10" fill={SHIRT} />
          <rect x="30" y="18" width="6"  height="10" fill={SHIRT} />
          {/* Hands */}
          <rect x="8"  y="27" width="6"  height="4"  fill={SKIN} />
          <rect x="30" y="27" width="6"  height="4"  fill={SKIN} />
          {/* Legs */}
          <rect x="16" y="32" width="6"  height="14" fill={PANTS} />
          <rect x="24" y="32" width="6"  height="14" fill={PANTS} />
          {/* Shoes */}
          <rect x="14" y="44" width="8"  height="4"  fill={SHOES} />
          <rect x="24" y="44" width="8"  height="4"  fill={SHOES} />
        </>
      )}

      {/* ── Sitting pose ─────────────────────────────────── */}
      {sitting && (
        <>
          {/* Body */}
          <rect x="14" y="18" width="16" height="12" fill={SHIRT} />
          <rect x="19" y="18" width="6"  height="3"  fill={SHIRT_DARK} />
          {/* Arms resting on knees */}
          <rect x="8"  y="22" width="6"  height="6"  fill={SHIRT} />
          <rect x="30" y="22" width="6"  height="6"  fill={SHIRT} />
          {/* Hands on knees */}
          <rect x="8"  y="28" width="7"  height="4"  fill={SKIN} />
          <rect x="29" y="28" width="7"  height="4"  fill={SKIN} />
          {/* Upper legs (horizontal when sitting) */}
          <rect x="14" y="30" width="8"  height="6"  fill={PANTS} />
          <rect x="22" y="30" width="8"  height="6"  fill={PANTS} />
          {/* Lower legs (hanging down) */}
          <rect x="10" y="36" width="8"  height="10" fill={PANTS} />
          <rect x="26" y="36" width="8"  height="10" fill={PANTS} />
          {/* Shoes */}
          <rect x="8"  y="44" width="8"  height="4"  fill={SHOES} />
          <rect x="28" y="44" width="8"  height="4"  fill={SHOES} />
        </>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// WATERING CAN
// ─────────────────────────────────────────────────────────────
function WateringCan({ tipped = false }) {
  return (
    <svg
      width="32" height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering:  'pixelated',
        display:         'block',
        transform:       tipped ? 'rotate(-40deg) translateY(-4px)' : 'rotate(0deg)',
        transition:      'transform 0.5s ease',
        transformOrigin: 'bottom right',
      }}
    >
      <rect x="4"  y="12" width="14" height="10" fill="#C8A8E8" />
      <rect x="18" y="14" width="8"  height="2"  fill="#C8A8E8" />
      <rect x="24" y="12" width="2"  height="6"  fill="#C8A8E8" />
      <rect x="2"  y="10" width="2"  height="8"  fill="#A080C8" />
      <rect x="4"  y="10" width="14" height="2"  fill="#A080C8" />
      {tipped && (
        <>
          <rect x="25" y="18" width="2" height="4" fill="#C8F0DC" />
          <rect x="27" y="22" width="2" height="3" fill="#C8F0DC" />
          <rect x="23" y="22" width="2" height="3" fill="#C8F0DC" />
        </>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function TodayView({ momMode }) {
  const [text,        setText]        = useState('')
  const [todayEntry,  setTodayEntry]  = useState(null)
  const [recentWins,  setRecentWins]  = useState([])
  const [isSitting,   setIsSitting]   = useState(false)
  const [isBouncing,  setIsBouncing]  = useState(false)
  const [isTipped,    setIsTipped]    = useState(false)
  const [hustleMsg,   setHustleMsg]   = useState(false)
  const [justPlanted, setJustPlanted] = useState(false)

  useEffect(() => {
    const entry = getTodayEntry()
    setTodayEntry(entry)
    if (entry?.mode === 'rest') {
      setIsSitting(true)
      setHustleMsg(true)
    }
    setRecentWins(getAllEntriesSorted().slice(0, 4))
  }, [])

  function handlePlant() {
    const trimmed = text.trim()
    if (!trimmed) return
    const all        = getAllEntriesSorted()
    const flowerType = getFlowerType(all.length)
    const saved      = saveTodayEntry(trimmed, 'win', flowerType)
    if (saved) {
      setIsBouncing(true)
      setIsTipped(true)
      setJustPlanted(true)
      setTimeout(() => setIsBouncing(false), 500)
      setTimeout(() => setIsTipped(false),   1500)
      setTodayEntry(getTodayEntry())
      setRecentWins(getAllEntriesSorted().slice(0, 4))
      setText('')
    }
  }

  function handleHustle() {
    setIsSitting(true)
    setHustleMsg(true)
    if (!todayEntry) {
      saveTodayEntry('', 'rest', null)
      setTodayEntry(getTodayEntry())
      setRecentWins(getAllEntriesSorted().slice(0, 4))
    }
  }

  function handleInputFocus() {
    // If they clicked Hustle but haven't saved yet, let them come back
    if (isSitting && !todayEntry) {
      setIsSitting(false)
      setHustleMsg(false)
    }
  }

  const charsLeft     = MAX_CHARS - text.length
  const alreadyLogged = !!todayEntry
  const isWin         = todayEntry?.mode === 'win'
  const isRest        = todayEntry?.mode === 'rest'

  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #FF9A5C 0%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8C8 0%, #FFF8F0 100%)'

  // ── Render ─────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Scene area ───────────────────────────────────── */}
      <div style={{
        background:     skyBg,
        transition:     'background 2000ms ease',
        minHeight:      '130px',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        gap:            '16px',
        padding:        '12px 20px 10px',
      }}>
        <PixelPerson
          sitting={isSitting || isWin}
          bouncing={isBouncing}
        />
        <div style={{ marginBottom: '6px' }}>
          <WateringCan tipped={isTipped} />
        </div>
        {justPlanted && todayEntry && (
          <div style={{ marginBottom: '2px', animation: 'popIn 0.4s ease' }}>
            <PixelPlant
              flowerType={todayEntry.flower || 'pink-dahlia'}
              growthStage={0}
              size={1.1}
            />
          </div>
        )}
      </div>

      {/* ── Interaction area ─────────────────────────────── */}
      <div style={{
        padding:       '14px 18px 20px',
        display:       'flex',
        flexDirection: 'column',
        gap:           '12px',
      }}>

        {/* ══════════════════════════════════════════════════
            STATE A: Logged a WIN today
            Show the win card + a warm "one per day" note.
            Bukan Hustle is hidden (no longer relevant).
        ══════════════════════════════════════════════════ */}
        {isWin && (
          <div style={{
            backgroundColor: 'rgba(200,240,220,0.45)',
            border:          '2px solid #81B89A',
            padding:         '12px 14px',
            animation:       'fadeIn 0.4s ease',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px', color: '#3B6D11',
              margin: '0 0 8px', lineHeight: '2',
            }}>
              ✦ today's win is planted
            </p>
            <p style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize: '14px', color: '#5C3D1E',
              margin: '0 0 10px', lineHeight: '1.5',
            }}>
              "{todayEntry.text}"
            </p>
            {/* One-per-day explanation — warm, not punishing */}
            <div style={{
              backgroundColor: 'rgba(255,248,240,0.8)',
              border:          '1px dashed #D4A96A',
              padding:         '7px 10px',
              marginBottom:    '4px',
            }}>
              <p style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize:   '4px', color: '#A0785A',
                margin: 0, lineHeight: '2.2',
              }}>
                one win a day is enough. 🌱<br />
                your garden grows slowly,<br />
                just like real life.<br />
                come back tomorrow!
              </p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STATE B: Took a REST today
            Show rest card + keep Bukan Hustle visible
            (dimmed so they know it was pressed).
        ══════════════════════════════════════════════════ */}
        {isRest && (
          <div style={{
            backgroundColor: '#FEF3E2',
            border:          '2px solid #D4A96A',
            padding:         '12px 14px',
            animation:       'fadeIn 0.4s ease',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px', color: '#9B6B4A',
              margin: '0 0 6px', lineHeight: '2.2',
            }}>
              it's okay to do nothing today.
            </p>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '4px', color: '#C4A07A',
              margin: 0, lineHeight: '2.2',
            }}>
              your progress is safe. 🌿<br />
              rest days are part of the garden.
            </p>
          </div>
        )}

        {/* Bukan Hustle — visible whenever no WIN is logged.
            Before press: clickable peach button.
            After press (isRest): stays visible, darker, shows active state.
            This fixes the "button disappears after pressing" bug. */}
        {!isWin && (
          <button
            onClick={!isRest ? handleHustle : undefined}
            style={{
              width:           '100%',
              backgroundColor: isRest ? '#FFE4B8' : '#FFF0D8',
              border:          `2px solid ${isRest ? '#C8984A' : '#D4A96A'}`,
              padding:         '10px 0',
              fontFamily:      '"Press Start 2P", monospace',
              fontSize:        '5px',
              color:           isRest ? '#7B4F2E' : '#9B6B4A',
              cursor:          isRest ? 'default' : 'pointer',
              lineHeight:      '2',
              transition:      'all 0.2s ease',
            }}
          >
            {isRest ? '☕ resting today — bukan hustle' : 'bukan hustle ☕'}
          </button>
        )}

        {/* ══════════════════════════════════════════════════
            STATE C: Nothing logged yet
            Show input + Plant It + Bukan Hustle buttons.
            Bukan Hustle is ALWAYS clickable here.
        ══════════════════════════════════════════════════ */}
        {!alreadyLogged && (
          <>
            <p style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize:   '13px', color: '#9B6B4A',
              margin: 0, lineHeight: '1.6',
            }}>
              what is one small thing you did for yourself or your work today?
            </p>

            {/* Text input */}
            <div style={{ position: 'relative' }}>
              <textarea
                value={text}
                onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
                onFocus={handleInputFocus}
                placeholder="type something gentle here..."
                rows={2}
                style={{
                  width: '100%', background: '#FFF8F0',
                  border: '2px solid #D4A96A', borderRadius: '0',
                  padding: '8px 10px 22px',
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: '13px', color: '#5C3D1E',
                  outline: 'none', resize: 'none',
                  lineHeight: '1.5', display: 'block',
                }}
                onKeyDown={e => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handlePlant()
                }}
              />
              <span style={{
                position: 'absolute', bottom: '6px', right: '8px',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '4px',
                color: charsLeft < 20 ? '#E07060' : '#C4A07A',
              }}>
                {charsLeft}
              </span>
            </div>

            {/* Action buttons — rendered ALWAYS in this state */}
            <div style={{ display: 'flex', gap: '8px' }}>

              {/* Plant It — lights up when there's text */}
              <button
                onClick={handlePlant}
                style={{
                  flex:            1,
                  backgroundColor: text.trim() ? '#C8F0DC' : '#F0EAE0',
                  border:          `2px solid ${text.trim() ? '#81B89A' : '#C8B898'}`,
                  padding:         '10px 0',
                  fontFamily:      '"Press Start 2P", monospace',
                  fontSize:        '6px',
                  color:           text.trim() ? '#2E6B4A' : '#A89070',
                  cursor:          text.trim() ? 'pointer' : 'default',
                  lineHeight:      '1.8',
                  transition:      'all 0.2s ease',
                }}
              >
                plant it 🌱
              </button>

            </div>
          </>
        )}

        {/* ── Recent wins — always at the bottom ───────── */}
        {recentWins.filter(e => e.mode === 'win' && e.text).length > 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: '6px', marginTop: '4px',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '5px', color: '#C4A07A', margin: 0,
            }}>
              recent wins
            </p>
            {recentWins
              .filter(e => e.mode === 'win' && e.text)
              .slice(0, 3)
              .map(entry => (
                <div key={entry.key} style={{
                  display: 'flex', gap: '8px',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(200,240,220,0.35)',
                  borderLeft: '2px solid #81B89A',
                }}>
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '4px', color: '#C4A07A',
                    flexShrink: 0, marginTop: '3px', whiteSpace: 'nowrap',
                  }}>
                    {entry.key.slice(5)}
                  </span>
                  <span style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: '12px', color: '#5C3D1E', lineHeight: '1.4',
                  }}>
                    {entry.text}
                  </span>
                </div>
              ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  )
}
