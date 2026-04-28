// TodayView.jsx
// Phase 2: The full Today page.
//
// Shows:
//   - Pixel character scene (standing or sitting based on state)
//   - Gentle question prompt
//   - Text input with 140-char counter
//   - "Plant It" button → saves win, grows a flower
//   - "Bukan Hustle" button → rest message + character sits
//   - If already logged today → shows what was logged
//   - Recent wins preview (last 3 entries)

import { useState, useEffect } from 'react'
import {
  getTodayEntry,
  saveTodayEntry,
  getAllEntriesSorted,
  todayKey,
  formatDate,
} from '../utils/storage'
import { getFlowerType, getGrowthStage } from './PixelPlant'
import PixelPlant from './PixelPlant'

const MAX_CHARS = 140

// ── Pixel character SVG ───────────────────────────────────────
// Two states: standing (normal) and sitting (Bukan Hustle)
function PixelCharacter({ sitting = false, bouncing = false }) {
  return (
    <svg
      width="44"
      height="56"
      viewBox="0 0 44 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering: 'pixelated',
        display:        'block',
        transform:      bouncing ? 'translateY(-6px)' : 'translateY(0)',
        transition:     'transform 0.3s ease',
      }}
    >
      {/* ── Head ──────────────────────────────────────── */}
      <rect x="16" y="2"  width="12" height="11" fill="#FFDAB9" />
      {/* Ears */}
      <rect x="13" y="4"  width="3"  height="7"  fill="#FFDAB9" />
      <rect x="28" y="4"  width="3"  height="7"  fill="#FFDAB9" />
      {/* Eyes */}
      <rect x="17" y="6"  width="3"  height="2"  fill="#5C3D1E" />
      <rect x="24" y="6"  width="3"  height="2"  fill="#5C3D1E" />
      {/* Eye shine */}
      <rect x="18" y="6"  width="1"  height="1"  fill="#FFF8F0" />
      <rect x="25" y="6"  width="1"  height="1"  fill="#FFF8F0" />
      {/* Smile */}
      <rect x="18" y="10" width="8"  height="2"  fill={sitting ? '#FFB3C6' : '#E07060'} />

      {/* ── Body ──────────────────────────────────────── */}
      <rect x="14" y="13" width="16" height="13" fill="#C8A8E8" />

      {/* ── Arms ──────────────────────────────────────── */}
      {!sitting && (
        <>
          {/* Standing: arms at sides */}
          <rect x="9"  y="13" width="5"  height="9"  fill="#C8A8E8" />
          <rect x="30" y="13" width="5"  height="9"  fill="#C8A8E8" />
        </>
      )}
      {sitting && (
        <>
          {/* Sitting: arms resting on knees */}
          <rect x="9"  y="20" width="5"  height="4"  fill="#C8A8E8" />
          <rect x="30" y="20" width="5"  height="4"  fill="#C8A8E8" />
          {/* Hands resting */}
          <rect x="8"  y="28" width="5"  height="4"  fill="#FFDAB9" />
          <rect x="31" y="28" width="5"  height="4"  fill="#FFDAB9" />
        </>
      )}

      {/* ── Legs ──────────────────────────────────────── */}
      {!sitting && (
        <>
          {/* Standing legs */}
          <rect x="16" y="26" width="5"  height="14" fill="#9090C0" />
          <rect x="23" y="26" width="5"  height="14" fill="#9090C0" />
          {/* Shoes */}
          <rect x="14" y="40" width="7"  height="4"  fill="#7B4F2E" />
          <rect x="23" y="40" width="7"  height="4"  fill="#7B4F2E" />
        </>
      )}
      {sitting && (
        <>
          {/* Sitting: legs bent forward */}
          <rect x="14" y="26" width="6"  height="6"  fill="#9090C0" />
          <rect x="24" y="26" width="6"  height="6"  fill="#9090C0" />
          {/* Lower legs horizontal */}
          <rect x="8"  y="32" width="10" height="5"  fill="#9090C0" />
          <rect x="26" y="32" width="10" height="5"  fill="#9090C0" />
          {/* Shoes */}
          <rect x="6"  y="36" width="6"  height="4"  fill="#7B4F2E" />
          <rect x="32" y="36" width="6"  height="4"  fill="#7B4F2E" />
        </>
      )}
    </svg>
  )
}

// ── Watering can SVG (tips when Plant It is pressed) ──────────
function WateringCan({ tipped = false }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering: 'pixelated',
        display:        'block',
        transform:      tipped ? 'rotate(-40deg) translateY(-4px)' : 'rotate(0deg)',
        transition:     'transform 0.5s ease',
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

// ── Main component ────────────────────────────────────────────
export default function TodayView({ momMode }) {
  const [text,       setText]       = useState('')
  const [todayEntry, setTodayEntry] = useState(null)
  const [recentWins, setRecentWins] = useState([])
  const [isSitting,  setIsSitting]  = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [isTipped,   setIsTipped]   = useState(false)
  const [hustleMsg,  setHustleMsg]  = useState(false)
  const [justPlanted, setJustPlanted] = useState(false)

  // Load today's entry and recent wins on mount
  useEffect(() => {
    const entry = getTodayEntry()
    setTodayEntry(entry)

    const all = getAllEntriesSorted()
    setRecentWins(all.slice(0, 4))
  }, [])

  // ── Plant a win ─────────────────────────────────────────────
  function handlePlant() {
    const trimmed = text.trim()
    if (!trimmed) return

    // Work out what flower index this will be
    const all         = getAllEntriesSorted()
    const flowerType  = getFlowerType(all.length)  // next index

    const saved = saveTodayEntry(trimmed, 'win', flowerType)

    if (saved) {
      // Animate: bounce character, tip watering can
      setIsBouncing(true)
      setIsTipped(true)
      setJustPlanted(true)

      setTimeout(() => setIsBouncing(false), 500)
      setTimeout(() => setIsTipped(false),   1500)

      // Refresh state
      const entry = getTodayEntry()
      setTodayEntry(entry)
      setRecentWins(getAllEntriesSorted().slice(0, 4))
      setText('')
    }
  }

  // ── Bukan Hustle ────────────────────────────────────────────
  function handleHustle() {
    setIsSitting(true)
    setHustleMsg(true)

    // If nothing logged today, also log a rest entry
    if (!todayEntry) {
      saveTodayEntry('', 'rest', null)
      const entry = getTodayEntry()
      setTodayEntry(entry)
    }
  }

  // Stand back up if they change their mind and start typing
  function handleInputFocus() {
    if (isSitting && !todayEntry) {
      setIsSitting(false)
      setHustleMsg(false)
    }
  }

  const charsLeft = MAX_CHARS - text.length
  const alreadyLogged = !!todayEntry

  // Sky gradient for Today page atmosphere
  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #FF9A5C 0%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8C8 0%, #FFF8F0 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Pixel scene area ─────────────────────────────── */}
      <div
        style={{
          background:     skyBg,
          transition:     'background 2000ms ease',
          minHeight:      '110px',
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'center',
          gap:            '20px',
          padding:        '12px 20px 8px',
          position:       'relative',
        }}
      >
        <PixelCharacter sitting={isSitting} bouncing={isBouncing} />
        <div style={{ marginBottom: '4px' }}>
          <WateringCan tipped={isTipped} />
        </div>

        {/* Plant preview when just planted */}
        {justPlanted && todayEntry && (
          <div style={{
            marginBottom:  '0px',
            animation:     'popIn 0.4s ease',
          }}>
            <PixelPlant
              flowerType={todayEntry.flower || 'pink-dahlia'}
              growthStage={0}
              size={1.2}
            />
          </div>
        )}
      </div>

      {/* ── Input area ───────────────────────────────────── */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Already logged today */}
        {alreadyLogged && todayEntry.mode === 'win' && (
          <div style={{
            backgroundColor: 'rgba(200, 240, 220, 0.45)',
            border:          '2px solid #81B89A',
            padding:         '10px 12px',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px',
              color:      '#3B6D11',
              margin:     '0 0 6px',
              lineHeight: '2',
            }}>
              ✦ today's win is planted
            </p>
            <p style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize:   '13px',
              color:      '#5C3D1E',
              margin:     0,
            }}>
              "{todayEntry.text}"
            </p>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '4px',
              color:      '#81B89A',
              margin:     '6px 0 0',
            }}>
              come back tomorrow 🌱
            </p>
          </div>
        )}

        {alreadyLogged && todayEntry.mode === 'rest' && (
          <div style={{
            backgroundColor: 'rgba(255, 240, 210, 0.7)',
            border:          '2px solid #D4A96A',
            padding:         '10px 12px',
          }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px',
              color:      '#9B6B4A',
              margin:     0,
              lineHeight: '2.2',
            }}>
              resting today. ☕<br />your progress is safe.
            </p>
          </div>
        )}

        {/* Input — hidden if already logged */}
        {!alreadyLogged && (
          <>
            {/* Gentle question */}
            <p style={{
              fontFamily: '"Nunito", sans-serif',
              fontSize:   '13px',
              color:      '#9B6B4A',
              margin:     0,
              lineHeight: '1.6',
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
                  width:           '100%',
                  background:      '#FFF8F0',
                  border:          '2px solid #D4A96A',
                  borderRadius:    '0',
                  padding:         '8px 10px',
                  fontFamily:      '"Nunito", sans-serif',
                  fontSize:        '13px',
                  color:           '#5C3D1E',
                  outline:         'none',
                  resize:          'none',
                  lineHeight:      '1.5',
                }}
                onKeyDown={e => {
                  // Ctrl/Cmd + Enter to plant
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handlePlant()
                }}
              />
              {/* Character counter */}
              <span style={{
                position:   'absolute',
                bottom:     '6px',
                right:      '8px',
                fontFamily: '"Press Start 2P", monospace',
                fontSize:   '4px',
                color:      charsLeft < 20 ? '#E07060' : '#C4A07A',
              }}>
                {charsLeft}
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Plant It */}
              <button
                onClick={handlePlant}
                disabled={!text.trim()}
                style={{
                  flex:            1,
                  backgroundColor: text.trim() ? '#C8F0DC' : '#F5DEB3',
                  border:          `2px solid ${text.trim() ? '#81B89A' : '#D4A96A'}`,
                  padding:         '8px 0',
                  fontFamily:      '"Press Start 2P", monospace',
                  fontSize:        '6px',
                  color:           text.trim() ? '#2E6B4A' : '#C4A07A',
                  cursor:          text.trim() ? 'pointer' : 'not-allowed',
                  position:        'relative',
                  transition:      'all 0.15s ease',
                }}
              >
                plant it 🌱
              </button>

              {/* Bukan Hustle */}
              <button
                onClick={handleHustle}
                style={{
                  flex:            1,
                  backgroundColor: '#FFF0D8',
                  border:          '2px solid #D4A96A',
                  padding:         '8px 0',
                  fontFamily:      '"Press Start 2P", monospace',
                  fontSize:        '5px',
                  color:           '#9B6B4A',
                  cursor:          'pointer',
                  lineHeight:      '1.8',
                }}
              >
                bukan<br />hustle ☕
              </button>
            </div>

            {/* Bukan Hustle message */}
            {hustleMsg && (
              <div style={{
                backgroundColor: '#FEF3E2',
                border:          '1.5px solid #D4A96A',
                padding:         '10px 12px',
                animation:       'fadeIn 0.4s ease',
              }}>
                <p style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize:   '5px',
                  color:      '#9B6B4A',
                  margin:     0,
                  lineHeight: '2.2',
                  textAlign:  'center',
                }}>
                  it's okay to do nothing today.<br />
                  your progress is safe. 🌿
                </p>
              </div>
            )}
          </>
        )}

        {/* ── Recent wins ──────────────────────────────── */}
        {recentWins.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize:   '5px',
              color:      '#C4A07A',
              margin:     0,
            }}>
              recent wins
            </p>
            {recentWins
              .filter(e => e.mode === 'win' && e.text)
              .slice(0, 3)
              .map(entry => (
                <div
                  key={entry.key}
                  style={{
                    display:         'flex',
                    alignItems:      'flex-start',
                    gap:             '8px',
                    padding:         '6px 8px',
                    backgroundColor: 'rgba(200, 240, 220, 0.35)',
                    borderLeft:      '2px solid #81B89A',
                  }}
                >
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize:   '4px',
                    color:      '#C4A07A',
                    flexShrink: 0,
                    marginTop:  '2px',
                    whiteSpace: 'nowrap',
                  }}>
                    {entry.key.slice(5)}  {/* MM-DD */}
                  </span>
                  <span style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize:   '12px',
                    color:      '#5C3D1E',
                    lineHeight: '1.4',
                  }}>
                    {entry.text}
                  </span>
                </div>
              ))
            }
          </div>
        )}

      </div>

      {/* ── CSS animations ───────────────────────────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  )
}
