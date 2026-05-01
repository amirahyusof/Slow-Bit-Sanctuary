// storage.js — updated for 3 wins per day
//
// Data shape (up to 3 wins per day):
// {
//   "2026-04-26": {
//     wins: [
//       { text: "fixed the CSS bug", flower: "pink-dahlia", timestamp: 123 },
//       { text: "read 5 pages",      flower: "lavender-tulip", timestamp: 456 },
//       { text: "went for a walk",   flower: "mint-daisy", timestamp: 789 },
//     ],
//     mode: "win" | "rest",
//     restTimestamp: null | number,
//   }
// }

const STORAGE_KEY = 'slowbit_entries'
const MODE_KEY    = 'slowbit_mommode'
export const MAX_WINS_PER_DAY = 3

// ── Date helpers ──────────────────────────────────────────────

export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export function formatDate(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m-1, d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
}

// ── Core read / write ─────────────────────────────────────────

export function getAllEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch { return {} }
}

export function getEntry(key) {
  return getAllEntries()[key] ?? null
}

export function getTodayEntry() {
  return getEntry(todayKey())
}

// Returns wins array for today (empty array if none)
export function getTodayWins() {
  return getTodayEntry()?.wins ?? []
}

// How many wins logged today (0–3)
export function getTodayWinCount() {
  return getTodayWins().length
}

// True if today has reached the 3-win limit
export function isTodayFull() {
  return getTodayWinCount() >= MAX_WINS_PER_DAY
}

// True if today has any entry (win or rest)
export function hasTodayEntry() {
  const entry = getTodayEntry()
  if (!entry) return false
  return entry.mode === 'rest' || (entry.wins && entry.wins.length > 0)
}

/**
 * Add a single win to today's entry.
 * Returns false if already at 3 wins or if mode is 'rest'.
 */
export function addTodayWin(text, flower) {
  const key = todayKey()
  const all = getAllEntries()
  const today = all[key] ?? { wins: [], mode: 'win' }

  if (today.mode === 'rest') return false
  if ((today.wins?.length ?? 0) >= MAX_WINS_PER_DAY) return false

  today.wins = today.wins ?? []
  today.wins.push({ text: text.slice(0, 140), flower, timestamp: Date.now() })
  today.mode = 'win'

  try {
    all[key] = today
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch { return false }
}

/**
 * Mark today as a rest day.
 * Returns false if wins already exist today.
 */
export function saveTodayRest() {
  const key = todayKey()
  const all = getAllEntries()
  const today = all[key]

  // Don't overwrite wins with rest
  if (today?.wins?.length > 0) return false

  all[key] = { wins: [], mode: 'rest', restTimestamp: Date.now() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch { return false }
}

// ── Query helpers ─────────────────────────────────────────────

/**
 * Returns all individual win objects across all days, newest first.
 * Each item: { key, text, flower, timestamp }
 */
export function getAllWinsSorted() {
  const all = getAllEntries()
  const wins = []
  Object.entries(all).forEach(([key, entry]) => {
    if (entry.wins) {
      entry.wins.forEach(w => wins.push({ key, ...w }))
    }
  })
  return wins.sort((a, b) => b.timestamp - a.timestamp)
}

/**
 * Returns all day entries as sorted array (newest first).
 * Used by Builder's Log.
 */
export function getAllEntriesSorted() {
  const all = getAllEntries()
  return Object.entries(all)
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => b.key.localeCompare(a.key))
}

export function getEntriesForMonth(year, month) {
  const all = getAllEntries()
  const prefix = `${year}-${String(month).padStart(2,'0')}`
  return Object.entries(all)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => b.key.localeCompare(a.key))
}

export function getMonthWinCount(year, month) {
  return getEntriesForMonth(year, month)
    .reduce((sum, e) => sum + (e.wins?.length ?? 0), 0)
}

export function getCurrentStreak() {
  const all = getAllEntries()
  let streak = 0
  const check = new Date()
  const todayStr = todayKey()
  const todayE = all[todayStr]
  if (!todayE || (!todayE.wins?.length && todayE.mode !== 'rest')) {
    check.setDate(check.getDate() - 1)
  }
  while (true) {
    const k = `${check.getFullYear()}-${String(check.getMonth()+1).padStart(2,'0')}-${String(check.getDate()).padStart(2,'0')}`
    if (all[k]) { streak++; check.setDate(check.getDate()-1) }
    else break
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

// ── Legacy compat (used by old PixelPlant getFlowerType) ──────
export function getFlowerTypeByIndex(index) {
  const order = ['pink-dahlia','lavender-tulip','mint-daisy','peach-rose','sunset-marigold']
  return order[index % order.length]
}
