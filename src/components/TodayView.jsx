// TodayView.jsx — Phase 2 (fixed)
//
// Fixes:
//   1. Bukan Hustle button is ALWAYS visible (not gated by input text)
//   2. After planting, "already logged" card shows — no blank screen bug
//   3. New character: pixel cat (loaf mode when resting)

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
// PIXEL CAT — standing or loaf (sitting)
// ─────────────────────────────────────────────────────────────
function PixelCat({ sitting = false, bouncing = false }) {
  return (
    <svg
      width="48" height="52"
      viewBox="0 0 48 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        imageRendering: 'pixelated',
        display:        'block',
        transform:      bouncing ? 'translateY(-8px)' : 'translateY(0)',
        transition:     'transform 0.35s cubic-bezier(.36,1.56,.64,1)',
      }}
    >
      {/* Ears */}
      <rect x="10" y="0"  width="6"  height="8"  fill="#FFDAB9" />
      <rect x="32" y="0"  width="6"  height="8"  fill="#FFDAB9" />
      <rect x="11" y="1"  width="4"  height="5"  fill="#FFB3C6" />
      <rect x="33" y="1"  width="4"  height="5"  fill="#FFB3C6" />
      {/* Head */}
      <rect x="8"  y="6"  width="32" height="20" fill="#FFDAB9" />
      <rect x="6"  y="8"  width="2"  height="16" fill="#FFDAB9" />
      <rect x="40" y="8"  width="2"  height="16" fill="#FFDAB9" />
      {/* Open eyes (when not sitting) */}
      {!sitting && (
        <>
          <rect x="13" y="12" width="6"  height="5"  fill="#5C3D1E" />
          <rect x="14" y="11" width="4"  height="1"  fill="#5C3D1E" />
          <rect x="14" y="12" width="2"  height="2"  fill="#FFF8F0" />
          <rect x="29" y="12" width="6"  height="5"  fill="#5C3D1E" />
          <rect x="30" y="11" width="4"  height="1"  fill="#5C3D1E" />
          <rect x="30" y="12" width="2"  height="2"  fill="#FFF8F0" />
        </>
      )}
      {/* Happy closed eyes (when sitting / loaf) */}
      {sitting && (
        <>
          <rect x="13" y="15" width="6"  height="2"  fill="#5C3D1E" />
          <rect x="14" y="14" width="4"  height="1"  fill="#5C3D1E" />
          <rect x="29" y="15" width="6"  height="2"  fill="#5C3D1E" />
          <rect x="30" y="14" width="4"  height="1"  fill="#5C3D1E" />
        </>
      )}
      {/* Nose */}
      <rect x="22" y="18" width="4"  height="3"  fill="#FFB3C6" />
      {/* Whiskers */}
      <rect x="8"  y="19" width="8"  height="1"  fill="#C4A07A" />
      <rect x="8"  y="21" width="8"  height="1"  fill="#C4A07A" />
      <rect x="32" y="19" width="8"  height="1"  fill="#C4A07A" />
      <rect x="32" y="21" width="8"  height="1"  fill="#C4A07A" />
      {/* Mouth */}
      <rect x="20" y="22" width="3"  height="2"  fill="#E07060" />
      <rect x="25" y="22" width="3"  height="2"  fill="#E07060" />
      <rect x="22" y="23" width="4"  height="1"  fill="#E07060" />

      {/* Body */}
      <rect x="12" y="26" width="24" height="14" fill="#C8A8E8" />
      <rect x="18" y="27" width="12" height="10" fill="#FFE4F0" />

      {/* Standing: arms + legs + tail up */}
      {!sitting && (
        <>
          <rect x="6"  y="26" width="6"  height="8"  fill="#C8A8E8" />
          <rect x="36" y="26" width="6"  height="8"  fill="#C8A8E8" />
          <rect x="7"  y="33" width="4"  height="3"  fill="#FFDAB9" />
          <rect x="37" y="33" width="4"  height="3"  fill="#FFDAB9" />
          <rect x="15" y="40" width="7"  height="10" fill="#C8A8E8" />
          <rect x="26" y="40" width="7"  height="10" fill="#C8A8E8" />
          <rect x="13" y="48" width="9"  height="4"  fill="#FFDAB9" />
          <rect x="26" y="48" width="9"  height="4"  fill="#FFDAB9" />
          {/* Tail up */}
          <rect x="36" y="28" width="4"  height="2"  fill="#FFDAB9" />
          <rect x="38" y="24" width="2"  height="6"  fill="#FFDAB9" />
          <rect x="40" y="22" width="4"  height="2"  fill="#FFDAB9" />
        </>
      )}

      {/* Loaf cat: everything tucked, tail wraps front */}
      {sitting && (
        <>
          <rect x="8"  y="36" width="8"  height="6"  fill="#C8A8E8" />
          <rect x="32" y="36" width="8"  height="6"  fill="#C8A8E8" />
          <rect x="12" y="40" width="24" height="8"  fill="#C8A8E8" />
          <rect x="14" y="46" width="20" height="4"  fill="#FFDAB9" />
          {/* Tail wraps around front */}
          <rect x="4"  y="36" width="2"  height="6"  fill="#FFDAB9" />
          <rect x="6"  y="40" width="4"  height="2"  fill="#FFDAB9" />
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
    // If already rested today, show the cat in loaf mode
    if (entry?.mode === 'rest') setIsSitting(true)
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
    if (isSitting && !todayEntry) {
      setIsSitting(false)
      setHustleMsg(false)
    }
  }

  const charsLeft     = MAX_CHARS - text.length
  const alreadyLogged = !!todayEntry
  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #FF9A5C 0%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8C8 0%, #FFF8F0 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Scene ────────────────────────────────────────── */}
      <div style={{
        background:     skyBg,
        transition:     'background 2000ms ease',
        minHeight:      '120px',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'center',
        gap:            '16px',
        padding:        '12px 20px 10px',
      }}>
        <PixelCat sitting={isSitting || (alreadyLogged && todayEntry?.mode === 'win')} bouncing={isBouncing} />
        <div style={{ marginBottom: '6px' }}>
          <WateringCan tipped={isTipped} />
        </div>
        {justPlanted && todayEntry && (
          <div style={{ marginBottom: '2px', animation: 'popIn 0.4s ease' }}>
            <PixelPlant flowerType={todayEntry.flower || 'pink-dahlia'} growthStage={0} size={1.1} />
          </div>
        )}
      </div>

      {/* ── Interaction ──────────────────────────────────── */}
      <div style={{ padding: '14px 18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Already logged — WIN */}
        {alreadyLogged && todayEntry.mode === 'win' && (
          <div style={{
            backgroundColor: 'rgba(200,240,220,0.45)',
            border:          '2px solid #81B89A',
            padding:         '12px 14px',
            animation:       'fadeIn 0.4s ease',
          }}>
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '5px', color: '#3B6D11', margin: '0 0 8px', lineHeight: '2' }}>
              ✦ today's win is planted
            </p>
            <p style={{ fontFamily: '"Nunito", sans-serif', fontSize: '14px', color: '#5C3D1E', margin: '0 0 8px', lineHeight: '1.5' }}>
              "{todayEntry.text}"
            </p>
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '4px', color: '#81B89A', margin: 0 }}>
              come back tomorrow 🌱
            </p>
          </div>
        )}

        {/* Already logged — REST */}
        {alreadyLogged && todayEntry.mode === 'rest' && (
          <div style={{
            backgroundColor: 'rgba(255,240,210,0.7)',
            border:          '2px solid #D4A96A',
            padding:         '12px 14px',
            animation:       'fadeIn 0.4s ease',
          }}>
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '5px', color: '#9B6B4A', margin: 0, lineHeight: '2.2' }}>
              resting today. ☕<br />your progress is safe.
            </p>
          </div>
        )}

        {/* Nothing logged yet — show input + BOTH buttons */}
        {!alreadyLogged && (
          <>
            <p style={{ fontFamily: '"Nunito", sans-serif', fontSize: '13px', color: '#9B6B4A', margin: 0, lineHeight: '1.6' }}>
              what is one small thing you did for yourself or your work today?
            </p>

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
                  padding: '8px 10px 20px', fontFamily: '"Nunito", sans-serif',
                  fontSize: '13px', color: '#5C3D1E',
                  outline: 'none', resize: 'none', lineHeight: '1.5', display: 'block',
                }}
                onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handlePlant() }}
              />
              <span style={{ position: 'absolute', bottom: '6px', right: '8px', fontFamily: '"Press Start 2P", monospace', fontSize: '4px', color: charsLeft < 20 ? '#E07060' : '#C4A07A' }}>
                {charsLeft}
              </span>
            </div>

            {/* BOTH buttons — always rendered */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePlant}
                style={{
                  flex: 1,
                  backgroundColor: text.trim() ? '#C8F0DC' : '#F0EAE0',
                  border: `2px solid ${text.trim() ? '#81B89A' : '#C8B898'}`,
                  padding: '10px 0',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '6px',
                  color: text.trim() ? '#2E6B4A' : '#A89070',
                  cursor: text.trim() ? 'pointer' : 'default',
                  lineHeight: '1.8',
                  transition: 'all 0.2s ease',
                }}
              >
                plant it 🌱
              </button>

              <button
                onClick={handleHustle}
                style={{
                  flex: 1,
                  backgroundColor: '#FFF0D8',
                  border: '2px solid #D4A96A',
                  padding: '10px 0',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '5px',
                  color: '#9B6B4A',
                  cursor: 'pointer',
                  lineHeight: '2',
                }}
              >
                bukan<br />hustle ☕
              </button>
            </div>

            {hustleMsg && (
              <div style={{ backgroundColor: '#FEF3E2', border: '1.5px solid #D4A96A', padding: '10px 14px', animation: 'fadeIn 0.4s ease' }}>
                <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '5px', color: '#9B6B4A', margin: 0, lineHeight: '2.4', textAlign: 'center' }}>
                  it's okay to do nothing today.<br />your progress is safe. 🌿
                </p>
              </div>
            )}
          </>
        )}

        {/* Recent wins */}
        {recentWins.filter(e => e.mode === 'win' && e.text).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '5px', color: '#C4A07A', margin: 0 }}>
              recent wins
            </p>
            {recentWins.filter(e => e.mode === 'win' && e.text).slice(0, 3).map(entry => (
              <div key={entry.key} style={{ display: 'flex', gap: '8px', padding: '6px 8px', backgroundColor: 'rgba(200,240,220,0.35)', borderLeft: '2px solid #81B89A' }}>
                <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '4px', color: '#C4A07A', flexShrink: 0, marginTop: '3px', whiteSpace: 'nowrap' }}>
                  {entry.key.slice(5)}
                </span>
                <span style={{ fontFamily: '"Nunito", sans-serif', fontSize: '12px', color: '#5C3D1E', lineHeight: '1.4' }}>
                  {entry.text}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn  { from { opacity:0; transform:scale(0.4); }      to { opacity:1; transform:scale(1); } }
      `}</style>
    </div>
  )
}
