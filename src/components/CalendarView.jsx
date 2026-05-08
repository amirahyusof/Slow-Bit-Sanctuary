// CalendarView.jsx — Phase 3: Complete Calendar Implementation
// Shows a month grid with flower icons for logged days, rest days as coffee icon ☕.
// Tap any day to see ALL wins (not just first) + flower type.
// Navigate between months with prev/next arrows.
// ENHANCEMENT: Detail panel shows all 3 wins from multi-win days
// Responsive on mobile + desktop.

import { useState } from 'react'
import {
  getEntriesForMonth,
  formatDate,
} from '../utils/storage'

const FLOWER_NAMES = {
  'pink-dahlia':     '🌸 pink dahlia',
  'lavender-tulip':  '🌷 lavender tulip',
  'mint-daisy':      '🌼 mint daisy',
  'peach-rose':      '🌹 peach rose',
  'sunset-marigold': '🌻 sunset marigold',
}

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear())

  const now = new Date()
  const todayDate = now.getDate()
  const todayMonth = now.getMonth()
  const todayYear = now.getFullYear()

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate()
  const firstDay = new Date(displayYear, displayMonth, 1).getDay()
  const monthName = new Date(displayYear, displayMonth).toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const entries = getEntriesForMonth(displayYear, displayMonth + 1)
  const entryMap = {}
  entries.forEach(e => {
    const dayNum = parseInt(e.key.split('-')[2])
    entryMap[dayNum] = e
  })

  function handlePrevMonth() {
    if (displayMonth === 0) {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
    setSelectedDay(null)
  }

  function handleNextMonth() {
    if (displayMonth === 11) {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
    setSelectedDay(null)
  }

  function handleSelectDay(day) {
    setSelectedDay(selectedDay === day ? null : day)
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Build calendar grid
  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null) // Empty cell for days before month starts
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
  }

  const selectedEntry = selectedDay ? entryMap[selectedDay] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── Header with navigation ──────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 18px 8px',
          background: 'linear-gradient(to bottom, rgba(253,235,198,0.4), transparent)',
        }}
      >
        <button
          onClick={handlePrevMonth}
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1.5px solid #D4BCA8',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#F5DEB3'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255,255,255,0.7)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          ‹
        </button>

        <h2
          style={{
            fontFamily: '"Lora", Georgia, serif',
            fontSize: '18px',
            fontWeight: '600',
            color: '#5C3D1E',
            margin: 0,
          }}
        >
          {monthName}
        </h2>

        <button
          onClick={handleNextMonth}
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1.5px solid #D4BCA8',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#F5DEB3'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255,255,255,0.7)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          ›
        </button>
      </div>

      {/* ── Day labels ────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          padding: '8px 18px',
          margin: '4px 0',
        }}
      >
        {dayLabels.map(day => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: '600',
              color: '#A88C74',
              padding: '4px 0',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ─────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          padding: '0 18px 12px',
        }}
      >
        {calendarDays.map((day, index) => {
          const isToday =
            day &&
            day === todayDate &&
            displayMonth === todayMonth &&
            displayYear === todayYear
          const isSelected = day === selectedDay
          const entry = day ? entryMap[day] : null

          return (
            <div
              key={index}
              onClick={() => day && handleSelectDay(day)}
              style={{
                minHeight: '48px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: day
                  ? isSelected
                    ? 'rgba(244,184,200,0.2)'
                    : 'rgba(253,251,247,0.6)'
                  : 'transparent',
                border: isToday
                  ? '2.5px solid #FF9A5C'
                  : isSelected
                  ? '1.5px solid #C2A38A'
                  : '1px solid rgba(194,163,138,0.15)',
                cursor: day ? 'pointer' : 'default',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (day) {
                  e.currentTarget.style.background = 'rgba(255,240,210,0.3)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseLeave={e => {
                if (day) {
                  e.currentTarget.style.background = isSelected
                    ? 'rgba(244,184,200,0.2)'
                    : 'rgba(253,251,247,0.6)'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {/* Flower or rest icon */}
              {entry && (
                <div style={{ fontSize: '16px' }}>
                  {entry.mode === 'rest' ? '☕' : '🌸'}
                  {/* Numeric badge (Shows how many wins) — DESIGN_DECISIONS requirement */}
                  {entry && entry.mode === 'win' && entry.wins && entry.wins.length > 1 && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: '#5C8C64',
                        background: 'rgba(141, 170, 145, 0.3)',
                        padding: '1px 4px',
                        borderRadius: '10px',
                        lineHeight: '1',
                      }}
                    >
                      {entry.wins.length}
                    </span>
                  )}
                </div>
              )}

              {/* Day number + Win count badge */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    color: day ? '#5C3D1E' : '#E5C5A0',
                    fontWeight: day ? '500' : '400',
                  }}
                >
                  {day}
                </span>
                
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Detail panel (ENHANCEMENT 2: Shows ALL wins) ─ */}
      {selectedDay && (
        <div
          style={{
            margin: '12px 18px 8px',
            padding: '14px',
            background: 'rgba(253,251,247,0.7)',
            border: '1.5px solid #D4BCA8',
            borderRadius: '12px',
            animation: 'fadeUp 0.3s ease',
          }}
        >
          <p
            style={{
              fontFamily: '"Indie Flower", cursive',
              fontSize: '12px',
              color: '#A88C74',
              margin: '0 0 8px',
            }}
          >
            {formatDate(
              `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
            )}
          </p>

          {selectedEntry ? (
            <>
              {selectedEntry.mode === 'rest' ? (
                <p
                  style={{
                    fontFamily: '"Lora", Georgia, serif',
                    fontSize: '13px',
                    color: '#7A5C44',
                    margin: '0 0 10px',
                    fontStyle: 'italic',
                    lineHeight: '1.6',
                  }}
                >
                  You chose rest today. And that was enough. ☕
                </p>
              ) : (
                <>
                  {/* Show ALL wins from this day (ENHANCEMENT 2) */}
                  {selectedEntry.wins && selectedEntry.wins.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedEntry.wins.map((win, idx) => (
                        <div key={idx}>
                          <p
                            style={{
                              fontFamily: '"Lora", Georgia, serif',
                              fontSize: '13px',
                              color: '#5C3D1E',
                              margin: '0 0 6px',
                              fontStyle: 'italic',
                              lineHeight: '1.6',
                            }}
                          >
                            "{win.text}"
                          </p>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              color: '#7A5C44',
                              background: 'rgba(200,240,220,0.3)',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              border: '1px solid #81B89A',
                            }}
                          >
                            🌸 {FLOWER_NAMES[win.flower] || 'flower'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: '"Lora", Georgia, serif',
                        fontSize: '13px',
                        color: '#5C3D1E',
                        margin: 0,
                        fontStyle: 'italic',
                        lineHeight: '1.6',
                      }}
                    >
                      "{selectedEntry.text}"
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <p
              style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize: '12px',
                color: '#A88C74',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              No entry for this day — and that's perfectly okay.
            </p>
          )}
        </div>
      )}

      {/* ── Hint text ─────────────────────────────────── */}
      {!selectedDay && (
        <p
          style={{
            textAlign: 'center',
            fontFamily: '"Indie Flower", cursive',
            fontSize: '12px',
            color: '#A88C74',
            padding: '8px 18px',
            margin: '4px 0',
            fontStyle: 'italic',
          }}
        >
          tap a day to see your win
        </p>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}