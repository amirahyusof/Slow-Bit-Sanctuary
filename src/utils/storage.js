// storage.js — v3.0
//
// One entry per day. One sentence. One flower. No quota.
//
// Shape of each entry:
// {
//   "2026-05-14": {
//     text:      "fixed that bug i'd been avoiding all week",
//     flower:    "lavender-tulip",
//     mode:      "win" | "rest",
//     timestamp: 1747180800000
//   }
// }

const STORAGE_KEY = 'slowbit_entries'
const MODE_KEY    = 'slowbit_mommode'

// ── Flower rotation ───────────────────────────────────────────
// Each new win gets the next flower in the cycle.
// Based on total number of wins ever logged — not per day.

const FLOWER_TYPES = [
  'pink-dahlia',
  'lavender-tulip',
  'mint-daisy',
  'peach-rose',
  'sunset-marigold',
]

export function getNextFlower() {
  const all       = getAllEntries()
  const totalWins = Object.values(all).filter(e => e.mode === 'win').length
  return FLOWER_TYPES[totalWins % FLOWER_TYPES.length]
}

// ── Date helpers ──────────────────────────────────────────────

export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// "2026-05-14" → "14 May 2026"
export function formatDate(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

// "2026-05-14" → "14 May"
export function formatDateShort(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short',
  })
}

// How many days ago was this timestamp? Used for plant growth stage.
export function daysAgo(timestamp) {
  return Math.floor((Date.now() - timestamp) / 86400000)
}

// ── Core read / write ─────────────────────────────────────────

export function getAllEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function getEntry(key) {
  return getAllEntries()[key] ?? null
}

export function getTodayEntry() {
  return getEntry(todayKey())
}

// Has the user done anything today (win or rest)?
export function hasTodayEntry() {
  return !!getTodayEntry()
}

// ── Write actions ─────────────────────────────────────────────

/**
 * Save today's win.
 * Flower is assigned automatically — UI doesn't need to know about it.
 * Returns false if today already has any entry.
 */
export function saveTodayWin(text) {
  if (hasTodayEntry()) return false

  const key    = todayKey()
  const all    = getAllEntries()
  const flower = getNextFlower()

  all[key] = {
    text:      text.slice(0, 140),
    flower,
    mode:      'win',
    timestamp: Date.now(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch {
    return false
  }
}

/**
 * Mark today as a rest day.
 * Returns false if today already has any entry.
 */
export function saveTodayRest() {
  if (hasTodayEntry()) return false

  const key = todayKey()
  const all = getAllEntries()

  all[key] = {
    text:      null,
    flower:    null,
    mode:      'rest',
    timestamp: Date.now(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch {
    return false
  }
}

// ── Query helpers ─────────────────────────────────────────────

/**
 * All entries sorted newest first.
 * Used by JournalView.
 */
export function getAllEntriesSorted() {
  const all = getAllEntries()
  return Object.entries(all)
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => b.key.localeCompare(a.key))
}

/**
 * Entries for a specific month, oldest first (for grid display).
 * month is 1-based (1 = January).
 */
export function getEntriesForMonth(year, month) {
  const all    = getAllEntries()
  const prefix = `${year}-${String(month).padStart(2, '0')}`
  return Object.entries(all)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => a.key.localeCompare(b.key))
}

/**
 * Returns one dot object per calendar day for the month dot strip.
 * Days with no entry have mode: null.
 *
 * Each dot: { day, key, mode, text, flower, timestamp }
 */
export function getMonthDots(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate()
  const all         = getAllEntries()
  const dots        = []

  for (let d = 1; d <= daysInMonth; d++) {
    const key   = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const entry = all[key] ?? null
    dots.push({
      day:       d,
      key,
      mode:      entry?.mode      ?? null,
      text:      entry?.text      ?? null,
      flower:    entry?.flower    ?? null,
      timestamp: entry?.timestamp ?? null,
    })
  }

  return dots
}

/**
 * Count of win entries in a given month.
 */
export function getMonthWinCount(year, month) {
  return getEntriesForMonth(year, month).filter(e => e.mode === 'win').length
}

/**
 * Current consecutive day streak.
 * Both 'win' and 'rest' days count — showing up to rest is showing up.
 * If today has no entry yet, starts counting from yesterday.
 */
export function getCurrentStreak() {
  const all      = getAllEntries()
  let   streak   = 0
  const check    = new Date()
  const todayStr = todayKey()

  if (!all[todayStr]) {
    check.setDate(check.getDate() - 1)
  }

  while (true) {
    const k = `${check.getFullYear()}-${String(check.getMonth() + 1).padStart(2, '0')}-${String(check.getDate()).padStart(2, '0')}`
    if (all[k]) {
      streak++
      check.setDate(check.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

// ── Mom Mode ──────────────────────────────────────────────────

export function saveMomMode(mode) {
  try { localStorage.setItem(MODE_KEY, mode) } catch {}
}

export function loadMomMode() {
  try { return localStorage.getItem(MODE_KEY) || 'day' } catch { return 'day' }
}
