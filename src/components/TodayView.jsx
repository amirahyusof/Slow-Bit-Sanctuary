// TodayView.jsx — Phase 4B: Bukan Hustle with WARM Night Mode Colors
// Night mode uses warm tones (cozy brown) instead of cold tones (harsh blue)
import { useState, useEffect } from 'react'
import {
  getTodayEntry,
  addTodayWin,
  saveTodayRest,
  getAllWinsSorted,
  MAX_WINS_PER_DAY,
} from '../utils/storage'

// Import Image Assets
import initial_state from '../assets/initial_state.png'
import stage_1 from '../assets/stage-1.png'
import stage_2 from '../assets/stage-2.png'
import final_stage from '../assets/final-stage.png'
import rest_mode_img from '../assets/rest-mode.png'

const MAX_CHARS = 140

// ─────────────────────────────────────────────────────────────
// GROWING GARDEN — Visual Progress
// ─────────────────────────────────────────────────────────────
function GrowingGarden({ winCount, isResting }) {
  let sceneImage
  if (isResting) {
    sceneImage = rest_mode_img
  } else {
    if (winCount === 0) sceneImage = initial_state
    else if (winCount === 1) sceneImage = stage_1
    else if (winCount === 2) sceneImage = stage_2
    else sceneImage = final_stage
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '10px',
      }}
    >
      <img
        src={sceneImage}
        alt="Garden State"
        style={{
          maxHeight: '150px',
          transition: 'all 0.8s ease-in-out',
          filter: isResting ? 'brightness(0.9) saturate(0.8)' : 'none',
        }}
      />

      {isResting && (
        <div
          className="zzz-animation"
          style={{
            position: 'absolute',
            top: '20px',
            right: '35%',
            fontFamily: '"Indie Flower", cursive',
            fontSize: '24px',
            color: '#e8d9cc',
            opacity: 0.8,
          }}
        >
          zZz
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// WIN SLOT — Input for Daily Wins
// ─────────────────────────────────────────────────────────────
function WinSlot({ slotNumber, existingWin, isActive, onSubmit, isResting }) {
  const [text, setText] = useState('')
  const charsLeft = MAX_CHARS - text.length

  if (existingWin) {
    return (
      <div
        style={{
          background: 'rgba(141,170,145,0.12)',
          border: '1.5px solid #8DAA91',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          animation: 'fadeUp 0.4s ease',
        }}
      >
        <span
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '18px',
            color: '#8DAA91',
            flexShrink: 0,
          }}
        >
          {slotNumber}.
        </span>
        <p
          style={{
            fontFamily: '"Nunito", sans-serif',
            fontSize: '13px',
            color: '#4A3728',
            margin: 0,
            flex: 1,
          }}
        >
          {existingWin.text}
        </p>
        <span style={{ fontSize: '14px' }}>🌸</span>
      </div>
    )
  }

  if (!isActive) {
    return (
      <div
        style={{
          background: 'rgba(212,188,168,0.15)',
          border: '1.5px dashed #D4BCA8',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '18px',
            color: '#A88C74',
          }}
        >
          {slotNumber}.
        </span>
        <p
          style={{
            fontFamily: '"Nunito", sans-serif',
            fontSize: '12px',
            color: '#A88C74',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          log win {slotNumber - 1} first...
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'rgba(253,251,247,0.95)',
        border: '1.5px solid #C2A38A',
        borderRadius: '12px',
        padding: '12px 14px',
        animation: 'fadeUp 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: '"Indie Flower", cursive',
            fontSize: '18px',
            color: '#C2A38A',
            marginTop: '2px',
          }}
        >
          {slotNumber}.
        </span>
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            placeholder="what is one small thing you did today?"
            rows={2}
            autoFocus={isActive}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1.5px solid #D4BCA8',
              padding: '4px 0 20px',
              fontFamily: '"Nunito", sans-serif',
              fontSize: '13px',
              outline: 'none',
              resize: 'none',
              color: '#4A3728',
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '0',
              fontSize: '10px',
              color: charsLeft < 20 ? '#E07060' : '#A88C74',
            }}
          >
            {charsLeft}
          </span>
        </div>
      </div>
      <button
        onClick={() => text.trim() && onSubmit(text.trim())}
        style={{
          marginTop: '10px',
          marginLeft: '28px',
          backgroundColor: text.trim() ? '#8DAA91' : '#D4BCA8',
          border: 'none',
          borderRadius: '20px',
          padding: '6px 18px',
          color: 'white',
          cursor: text.trim() ? 'pointer' : 'default',
          fontFamily: '"Indie Flower", cursive',
        }}
      >
        plant it 🌱
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT — TodayView
// ─────────────────────────────────────────────────────────────
export default function TodayView() {
  const [todayWins, setTodayWins] = useState([])
  const [winCount, setWinCount] = useState(0)
  const [recentWins, setRecentWins] = useState([])
  const [isResting, setIsResting] = useState(false)

  const refresh = () => {
    const entry = getTodayEntry()
    const wins = entry?.wins ?? []
    setTodayWins(wins)
    setWinCount(wins.length)
    setIsResting(entry?.mode === 'rest')

    const allWins = getAllWinsSorted()
    const todayKey = new Date().toISOString().slice(0, 10)
    setRecentWins(allWins.filter((w) => w.key !== todayKey).slice(0, 3))
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleWinSubmit = (text) => {
    if (addTodayWin(text)) refresh()
  }

  const handleHustle = () => {
    saveTodayRest()
    refresh()
  }

  const isFull = winCount >= MAX_WINS_PER_DAY
  const isWinDay = winCount > 0

  // PHASE 4B: WARM NIGHT MODE COLORS (Expert UI/UX approved)
  const sceneBg = isResting
    ? 'linear-gradient(180deg, #2d1810 0%, #3d2818 100%)' // Warm brown (cozy rest)
    : 'linear-gradient(180deg, #FDE8D0 0%, #FFF8F0 100%)' // Day mode

  const bgColor = isResting ? '#1a1410' : '#fff' // Warm charcoal vs white

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: bgColor,
        transition: 'background 2000ms ease',
      }}
    >
      {/* Scene Area */}
      <div
        style={{
          background: sceneBg,
          transition: 'background 1.5s ease',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <GrowingGarden winCount={winCount} isResting={isResting} />
        <div
          style={{
            width: '80%',
            height: '2px',
            background: isResting ? '#453d32' : '#D4BCA8',
            opacity: 0.5,
            transition: 'background 1.5s ease',
          }}
        />
      </div>

      {/* Content Area */}
      <div
        style={{
          padding: '16px 18px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <p
          style={{
            fontFamily: '"Lora", serif',
            fontSize: '15px',
            color: isResting ? '#a8907a' : '#7A5C44',
            fontStyle: 'italic',
            transition: 'color 1.5s ease',
          }}
        >
          {isFull
            ? 'three wins today — your garden is growing. 🌸'
            : isResting
            ? 'resting today. that\'s a choice.'
            : 'what grew in you today?'}
        </p>

        {!isResting && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {Array.from({ length: MAX_WINS_PER_DAY }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i < winCount ? '28px' : '12px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i < winCount ? '#8DAA91' : '#D4BCA8',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>
        )}

        {!isResting &&
          Array.from({ length: MAX_WINS_PER_DAY }).map((_, i) => (
            <WinSlot
              key={i}
              slotNumber={i + 1}
              existingWin={todayWins[i] ?? null}
              isActive={i === winCount && !isFull}
              onSubmit={handleWinSubmit}
              isResting={isResting}
            />
          ))}

        {/* Bukan Hustle Button */}
        {!isWinDay && (
          <button
            onClick={!isResting ? handleHustle : undefined}
            style={{
              width: '100%',
              background: isResting ? '#2d2218' : 'rgba(253,251,247,0.9)',
              border: `1.5px solid ${isResting ? '#453d32' : '#D4BCA8'}`,
              borderRadius: '12px',
              padding: '12px 0',
              fontFamily: '"Indie Flower", cursive',
              fontSize: '15px',
              color: isResting ? '#a8907a' : '#A88C74',
              cursor: isResting ? 'default' : 'pointer',
              transition: 'all 1.5s ease',
            }}
          >
            {isResting ? '☕ resting today' : 'bukan hustle ☕ it\'s okay to do nothing today'}
          </button>
        )}

        {/* Rest Affirmation (when resting) */}
        {isResting && (
          <div
            style={{
              margin: '12px 0',
              padding: '12px 16px',
              background: 'rgba(201, 184, 216, 0.15)',
              borderLeft: '3px solid #d4a574',
              borderRadius: '8px',
              animation: 'fadeUp 0.4s ease',
            }}
          >
            <p
              style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize: '14px',
                color: '#a8907a',
                fontStyle: 'italic',
                margin: 0,
                lineHeight: '1.6',
              }}
            >
              Rest is not laziness. Rest is wisdom. 🌙
            </p>
          </div>
        )}

        {/* Recent Wins */}
        {recentWins.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <p
              style={{
                fontSize: '13px',
                color: isResting ? '#a8907a' : '#A88C74',
                transition: 'color 1.5s ease',
              }}
            >
              from your garden...
            </p>
            {recentWins.map((win, i) => (
              <div
                key={i}
                style={{
                  padding: '6px 10px',
                  borderLeft: '2.5px solid #8DAA91',
                  marginBottom: '5px',
                  background: isResting ? '#2d2218' : 'rgba(141,170,145,0.05)',
                  transition: 'background 1.5s ease',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: isResting ? '#a8907a' : '#4A3728',
                    transition: 'color 1.5s ease',
                  }}
                >
                  {win.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }
        .zzz-animation {
          animation: float 3s infinite;
        }
      `}</style>
    </div>
  )
}