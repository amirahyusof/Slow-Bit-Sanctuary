# 🌱 PRD: The Slow-Bit Sanctuary
### Version 3.0 — The Quiet Garden

---

## 1. What This App Actually Is

The Slow-Bit Sanctuary is a **daily noticing app**.

Not a to-do list. Not a habit tracker. Not a journaling app with streaks and badges.

It is a place you open once a day to write one honest sentence about something you noticed — something you did, felt, tried, or survived — and watch that sentence become a flower in your garden over time.

The act of noticing is the whole product. The garden is proof that you kept showing up.

> **The one feeling this app must create:** The same feeling as writing one sentence in a paper journal on a quiet morning, then closing it. Complete. Unhurried. Enough.

---

## 2. What Changed From v2.0 — And Why

| v2.0 Decision | Why It Was Wrong | v3.0 Decision |
|---|---|---|
| 3 wins per day | Turns noticing into a quota | 1 entry per day, no exceptions |
| 4-tab navigation | Makes you think about where to go | 2 views only: Home and Journal |
| "Plant It" button language | Celebrates the act, not the noticing | "Write it down" — neutral, honest |
| Stats chips (logged, streak) | Gamification creep | Streak visible but minimal; no "logged count" trophy |
| "Builder's Log" naming | Too hustle-coded for the anti-hustle app | Renamed to **Journal** |
| Log page as separate tab | Separates the garden from its memory | Journal accessible via a soft link inside Home |
| Calendar as primary tab | Adds navigation weight | Calendar dots embedded in Home, month view opens inline |
| Numeric badge on calendar days | Progress metrics | Removed; presence/absence is enough |
| Night mode as feature | Scope creep | Removed for now; Mom Mode (day/sunset) stays |

---

## 3. Target Person

One person. She is tired.

She has been told her whole adult life that productivity is virtue. She has used Notion, Todoist, Habitica, and a paper journal that she abandoned after eleven days because she missed two entries and felt ashamed. She does not want to be optimised. She wants to be seen — by herself, quietly, without an app grading her.

She is also, sometimes, a "he" or a "they." But the feeling is the same: tired of being measured.

**She will use this app if:** it asks her one gentle question, receives her answer without judgment, and shows her something beautiful for her trouble.

**She will abandon this app if:** it reminds her of things she hasn't done, turns her rest into a metric, or makes her feel like she's playing a productivity game with plants as rewards.

---

## 4. App Structure — 2 Views

The app has a single bottom navigation with **2 tabs only**.

```
┌─────────────────────────────────────┐
│                                     │
│         [ page content ]            │
│                                     │
├─────────────────────────────────────┤
│       🌿 Home   │   📖 Journal      │
└─────────────────────────────────────┘
```

There is no Calendar tab. There is no separate Log tab. The FloatingRail for desktop is removed — 2 tabs fit cleanly in a bottom nav even on large screens.

---

## 5. View 1 — Home

**Purpose:** The whole experience in one place. Your garden, today's moment, and this month's story.

### Layout (top to bottom):

```
┌─────────────────────────────────────┐
│  the Slow-Bit Sanctuary  [Mom Mode] │  ← top bar
├─────────────────────────────────────┤
│                                     │
│   🌸  🌺  🌼  🌷  🌻              │
│   your living meadow                │  ← meadow scene (40% of screen)
│   (this month's flowers only)       │
│                                     │
├─────────────────────────────────────┤
│  "What did you notice today?"       │  ← one gentle question, always visible
│                                     │
│  [ __________________________ ]     │  ← single text input (140 char max)
│                                                                            
│  [ Write it down ]  [ Not today ☕ ]│  ← two soft buttons
│                                     │
│  ── or: today's entry (if logged) ──│  ← locked display after logging
│  "fixed that bug i've been          │
│   avoiding all week"                │
│  🌷 lavender tulip · 3 days old    │
├─────────────────────────────────────┤
│  May 2026                           │  ← month label
│  ◦ ◦ ● ● ◦ ● ● ● ◦ ◦ ● ...       │  ← dot strip: filled = logged, empty = not
│  (tap any dot to peek at that day)  │
└─────────────────────────────────────┘
```

### Behaviour:

- **The question** ("What did you notice today?") is always the first thing you see after the garden.
- **After logging**, the input disappears and is replaced by a soft display of today's entry — the text, the flower name, and how old it is. Read-only.
- **"Not today ☕"** replaces "Bukan Hustle." Same meaning, slightly more universal. Tapping it shows: *"That's okay. Your garden remembers you."* The dot for today fills with a soft ☕ symbol.
- **The dot strip** shows every day of the current month. Filled dot = logged. Empty dot = nothing. ☕ dot = rest chosen. No colour coding for "good" or "bad." Tapping a dot shows a small popover with that day's entry text.
- **One entry per day, maximum.** No quota. The input locks after submission.
- The month dot strip is the only calendar. There is no separate calendar page.

---

## 6. View 2 — Journal

**Purpose:** A quiet, unadorned archive of every entry ever written. Your words, in order, forever.

### Layout:

```
┌─────────────────────────────────────┐
│  Journal                            │  ← page title
│  "everything you've noticed"        │  ← subtitle
├─────────────────────────────────────┤
│  May 2026                           │  ← month group header
│  ─────────────────────────────────  │
│  14 May                             │
│  "fixed that bug i've been          │
│   avoiding all week"                │
│  🌷 lavender tulip                  │
│                                     │
│  13 May                             │
│  "sat in the sun for 10 minutes"    │
│  🌸 pink dahlia                     │
│                                     │
│  11 May · ☕ rest                   │
│                                     │
│  ─────────────────────────────────  │
│  April 2026                         │
│  ...                                │
└─────────────────────────────────────┘
```

### Behaviour:

- Newest at top, oldest at bottom.
- Entries grouped by month with a simple month/year label.
- Rest days appear as single-line entries: `date · ☕ rest`. No guilt, no explanation.
- No editing. No deleting. This is your record, not a draft.
- No stats, no counters, no "X wins planted" badges. The entries speak for themselves.
- Empty state: *"Your journal is empty. Head home to write something down."*

---

## 7. Features — What Stays, What Goes, What Changes

### Stays (refined):

| Feature | Notes |
|---|---|
| **Watercolor plant growth stages** | Stages 0–3, same as before. Plants grow from sprout to bloom over 14 days. |
| **Mom Mode** (day/sunset) | 2000ms CSS transition. Still lives in top bar. |
| **Bukan Hustle / Not today** | Renamed for clarity. Same function. |
| **LocalStorage** | All data stays on-device. No accounts. |
| **140-character limit** | Enforced with live counter. One sentence is enough. |
| **Flower variety** | 5 types, assigned in rotation. No unlocking mechanic needed. |
| **Daily affirmation** | Shown below the garden scene in Home. Streak-based, quiet. |
| **Floating plant animation** | Gentle sway. Kept because it makes the garden feel alive. |

### Changed:

| Feature | Old | New |
|---|---|---|
| **Entry limit** | 3 per day | 1 per day |
| **Button label** | "Plant It 🌱" | "Write it down" |
| **Rest button label** | "Bukan Hustle ☕" | "Not today ☕" |
| **Log page name** | Builder's Log | Journal |
| **Calendar** | Separate tab with 7-column grid | Dot strip embedded in Home |
| **Stats display** | Two chips (logged, streak) | Streak only, shown softly below affirmation |
| **Garden scope** | All-time or ambiguous | Current month only, always |
| **Navigation** | 4 tabs (Garden, Today, Calendar, Log) | 2 tabs (Home, Journal) |
| **FloatingRail** | Desktop-only right rail | Removed; 2-tab nav works everywhere |
| **Multiple win slots** | 3 visible input slots | Single input, single moment |

### Removed:

| Feature | Reason |
|---|---|
| **3-win-per-day system** | Contradicts the "one moment" philosophy |
| **Numeric badge on calendar** | Turns presence into a score |
| **Win count stat chip** | Gamification creep |
| **"Builder's Log" branding** | Too hustle-coded |
| **FloatingRail navigation** | Unnecessary complexity for 2 tabs |
| **Night mode (dark theme)** | Scope creep for v3; Mom Mode handles mood sufficiently |
| **Monthly reset animation** | Adds complexity without adding meaning |
| **WatercolorPlant icon in Log entries** | Visual clutter in a text-first view |

---

## 8. Writing & Language

Every word in this app is a design decision. The tone is:

- **Gentle, not cheerful.** This is not a celebration app. It is a witnessing app.
- **Direct, not motivational.** No "You're doing amazing!" No exclamation marks in UI copy.
- **Honest, not poetic.** The poetic moments come from the user's own words, not the interface.

### Copy guide:

| Moment | Copy |
|---|---|
| Daily question | "What did you notice today?" |
| Input placeholder | "one small thing..." |
| Submit button | "Write it down" |
| Rest button | "Not today ☕" |
| After rest is chosen | "That's okay. Your garden remembers you." |
| After logging | *(show the entry itself, no congratulations)* |
| Journal empty state | "Your journal is empty. Head home to write something down." |
| Affirmation (streak 0) | "Every garden starts with a single seed." |
| Affirmation (streak 7) | "One week. That's real." |
| Affirmation (rest day) | "Rest is not absence. It's part of growing." |
| Month dot strip label | "May 2026 · tap any day to read it" |

---

## 9. Technical Specifications

| Component | Technology | Notes |
|---|---|---|
| Framework | React + Vite | Unchanged |
| Styling | Tailwind + custom CSS vars | Unchanged |
| Fonts | Lora (headings), Indie Flower (accents), Nunito (body) | Unchanged |
| Data storage | LocalStorage | Unchanged |
| Data schema | Simplified (see below) | 1 win per day, no `wins[]` array |

### Simplified LocalStorage Schema

```js
// One entry per day. Key = date string.
{
  "2026-05-14": {
    text: "fixed that bug i've been avoiding all week",
    flower: "lavender-tulip",
    mode: "win",               // "win" | "rest"
    timestamp: 1747180800000
  },
  "2026-05-11": {
    text: null,
    flower: null,
    mode: "rest",
    timestamp: 1747008000000
  }
}
```

The `wins[]` array is removed. Each day has exactly one `text`, one `flower`, one `mode`.

### File Structure (Simplified)

```
src/
├── components/
│   ├── BottomNav.jsx          ← 2 tabs only (Home, Journal)
│   ├── HomeView.jsx           ← merged Garden + Today + Calendar strip
│   ├── JournalView.jsx        ← renamed LogView, simplified
│   └── WatercolorPlant.jsx    ← unchanged
├── utils/
│   ├── storage.js             ← simplified for 1 win per day
│   └── affirmations.js        ← unchanged
├── assets/                    ← all existing image assets
├── App.jsx                    ← 2-view router, Mom Mode state
├── main.jsx                   ← entry point
└── index.css                  ← unchanged
```

---

## 10. What Makes This Version Work

The v3 app earns daily use by doing one thing well: it receives your one honest sentence and keeps it safe.

The garden is not a reward system. It is a **record made visible** — proof to yourself that you kept showing up, at whatever pace you managed. A month with 8 flowers is not worse than a month with 22. Both tell a true story.

The Journal is not an archive with analytics. It is a **quiet diary** — your words, in order, without interpretation.

The two views are not a stripped-down MVP waiting to grow. They are the **complete product**. Every feature removed was removed because it diluted the core experience, not because it was unimportant.

This app is finished when someone opens it every morning the way they would make a cup of tea — not because they have to, but because the ritual is its own reward.

---

## 11. Development Roadmap

### Phase 1 — Simplify the Data Layer
- Migrate `storage.js` to single-entry-per-day schema
- Remove all multi-win (`wins[]` array) helper functions
- Add dot strip data helper: `getMonthDots(year, month)` returns array of `{day, mode, text, flower}`

### Phase 2 — Build HomeView
- Merge GardenView + TodayView + Calendar strip into one `HomeView.jsx`
- Meadow scene (current month wins only)
- Daily affirmation (below meadow)
- Single input question + two buttons
- Locked display after logging
- Dot strip at bottom with tap-to-peek popover

### Phase 3 — Build JournalView
- Rename and simplify LogView into `JournalView.jsx`
- Group entries by month
- Rest days as single-line entries
- Remove WatercolorPlant icon from entries (text-first)
- Clean empty state

### Phase 4 — Navigation & Polish
- Simplify BottomNav to 2 tabs
- Remove FloatingRail
- Remove 3-win UI from TodayView (replaced by HomeView)
- Final Mom Mode integration into HomeView
- PWA manifest (unchanged from v2 plan)

---

*Version 3.0 — Written June 2026*
*The best version of this app is the one that gets out of its own way.*
