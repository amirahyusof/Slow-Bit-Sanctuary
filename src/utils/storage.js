// ─────────────────────────────────────────────────────────────
// storage.js
// All LocalStorage interactions live here.
// Every other component imports from this file — never touches
// localStorage directly.
//
// Data shape (one entry per calendar day):
// {
//   "2026-04-26": {
//     text:      "fixed the CSS bug that bothered me for 2 days",
//     flower:    "pink-dahlia",
//     mode:      "win" | "rest",   // "rest" = Bukan Hustle pressed
//     timestamp: 1745625600000
//   },
//   "2026-04-25": { ... }
// }
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'slowbit_entries'

// ── Helpers ──────────────────────────────────────────────────

/**
 * Returns today's date as a "YYYY-MM-DD" string.
 * Used as the key for today's entry.
 */
export function todayKey() {
  const d = new Date()
  const year  = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day   = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Turns a "YYYY-MM-DD" string into a readable date like "26 Apr 2026".
 */
export function formatDate(key) {
  const [year, month, day] = key.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

// ── Core read / write ─────────────────────────────────────────

/**
 * Returns all entries as an object: { "YYYY-MM-DD": { ... } }
 * Returns an empty object if nothing is saved yet.
 */
export function getAllEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (error) {
    console.error('Could not read from LocalStorage:', error)
    return {}
  }
}

/**
 * Returns the entry for a specific date key, or null if none.
 * @param {string} key - "YYYY-MM-DD"
 */
export function getEntry(key) {
  const all = getAllEntries()
  return all[key] ?? null
}

/**
 * Returns today's entry, or null if nothing logged today.
 */
export function getTodayEntry() {
  return getEntry(todayKey())
}

/**
 * Saves a new entry for today.
 * Will not overwrite an existing entry (one per day rule).
 *
 * @param {string} text   - The win text (max 140 chars)
 * @param {string} mode   - "win" or "rest"
 * @param {string} flower - Flower type slug e.g. "pink-dahlia"
 * @returns {boolean} true if saved, false if today already has an entry
 */
export function saveTodayEntry(text, mode = 'win', flower = 'pink-dahlia') {
  const key = todayKey()
  const all = getAllEntries()

  // One entry per day — don't overwrite
  if (all[key]) {
    return false
  }

  all[key] = {
    text:      text.slice(0, 140),  // enforce 140-char limit
    flower,
    mode,
    timestamp: Date.now(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    return true
  } catch (error) {
    console.error('Could not save to LocalStorage:', error)
    return false
  }
}

/**
 * Returns all entries for a given year and month as an array,
 * sorted newest first.
 *
 * @param {number} year  - e.g. 2026
 * @param {number} month - 1–12
 * @returns {Array} [{ key: "YYYY-MM-DD", ...entry }, ...]
 */
export function getEntriesForMonth(year, month) {
  const all = getAllEntries()
  const prefix = `${year}-${String(month).padStart(2, '0')}`

  return Object.entries(all)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => b.key.localeCompare(a.key))  // newest first
}

/**
 * Returns ALL entries as a sorted array (newest first).
 * Used by the Builder's Log page.
 */
export function getAllEntriesSorted() {
  const all = getAllEntries()
  return Object.entries(all)
    .map(([key, entry]) => ({ key, ...entry }))
    .sort((a, b) => b.key.localeCompare(a.key))
}

// ── Stats helpers ─────────────────────────────────────────────

/**
 * Returns the total number of logged wins (mode = "win") this month.
 */
export function getMonthWinCount(year, month) {
  return getEntriesForMonth(year, month)
    .filter(e => e.mode === 'win')
    .length
}

/**
 * Returns the current streak: how many consecutive days ending
 * today (or yesterday) have at least one entry.
 */
export function getCurrentStreak() {
  const all = getAllEntries()
  let streak = 0
  const check = new Date()

  // If nothing logged today, check if yesterday starts the streak
  const todayStr = todayKey()
  if (!all[todayStr]) {
    check.setDate(check.getDate() - 1)
  }

  while (true) {
    const y = check.getFullYear()
    const m = String(check.getMonth() + 1).padStart(2, '0')
    const d = String(check.getDate()).padStart(2, '0')
    const key = `${y}-${m}-${d}`

    if (all[key]) {
      streak++
      check.setDate(check.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

// ── Mom Mode preference ───────────────────────────────────────

const MODE_KEY = 'slowbit_mommode'

/**
 * Saves the user's current Mom Mode preference.
 * @param {'day' | 'sunset'} mode
 */
export function saveMomMode(mode) {
  try {
    localStorage.setItem(MODE_KEY, mode)
  } catch (e) { /* silently fail */ }
}

/**
 * Returns the saved Mom Mode, defaulting to 'day'.
 * @returns {'day' | 'sunset'}
 */
export function loadMomMode() {
  try {
    return localStorage.getItem(MODE_KEY) || 'day'
  } catch (e) {
    return 'day'
  }
}
