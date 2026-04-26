# 🌸 PRD: The Slow-Bit Sanctuary
### Version 2.0 — The Full Greenhouse

---

## 1. Project Vision

The Slow-Bit Sanctuary is a "Gratitude Garden" web app — not a to-do list.
Instead of tracking what you *have to do*, it celebrates what you *already did*.

Every small win you log grows a new flower in your pixel garden. Over days and weeks, your garden fills up naturally — slowly, gently, without pressure.

> **The core feeling:** Opening this app should feel like watering a plant on a quiet Sunday morning — not like checking a task manager on a Monday.

### The key difference from a To-Do app

| Traditional To-Do App | The Slow-Bit Sanctuary |
|---|---|
| Pressure: "I have 10 things left." | Peace: "I did this one thing, and it was enough." |
| Focus: The Future (what's next?) | Focus: The Present (what happened?) |
| Punishment: unfinished tasks turn red | Grace: the Bukan Hustle button lets you rest |
| Completion badges and streaks | A garden that grows slowly, like real life |

---

## 2. Target Audience

- The **Honest Builder** — someone learning to code, create, or grow, who values progress over perfection.
- The **Anti-Hustle person** — tired of productivity culture, looking for a gentler daily ritual.
- Fans of **retro-pastel aesthetics** and low-pressure journaling.

---

## 3. App Structure — 4 Pages

The app uses a **bottom navigation bar** with 4 tabs. This is the full layout.

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [ page content ]                   │
│                                                 │
├─────────────────────────────────────────────────┤
│  🌿 Garden  │  ☀️ Today  │  📅 Calendar  │  📖 Log │
└─────────────────────────────────────────────────┘
```

---

### Page 1 — Garden (Home Screen)

**Purpose:** Show the user their growing pixel garden. This is the reward — seeing their consistency made visible.

**Layout (top to bottom):**

```
┌─────────────────────────────────┐
│  [Mom Mode toggle]   [App name] │  ← top bar
├─────────────────────────────────┤
│                                 │
│   🌸  🌺  🌼  🌷  🌻  🌸        │
│   pixel plants growing in soil  │  ← garden scene (70% of screen)
│   (more plants = more wins)     │
│                                 │
│▓▓▓▒▒▓▓▒▒▓▓▓▒▒▓▓  ← pixel soil  │
├─────────────────────────────────┤
│  April 2026 · 12 plants grown   │  ← month label
│  [12 days] [5 streak] [3 types] │  ← stat chips
│  Mini calendar strip (month)    │  ← dots = days with entries
└─────────────────────────────────┘
```

**Behaviour:**
- Each logged win = one new flower planted in the garden.
- Flowers are placed left-to-right, row by row, filling the soil strip.
- Different wins can unlock different flower colours (Phase 4).
- The garden resets softly each new month — old plants fade, new ones start fresh.
- Mom Mode toggle (top right) switches between Bright Day and Warm Sunset atmosphere.
- The mini calendar at the bottom shows the current month — green dot = logged day, orange dot = today.

---

### Page 2 — Today (Daily Action)

**Purpose:** One simple moment. Log one win, or press Bukan Hustle to rest guilt-free.

**Layout (top to bottom):**

```
┌─────────────────────────────────┐
│  pixel scene: your character    │
│  + watering can on the side     │  ← atmosphere area (30% of screen)
│  (watering can tips when u log) │
├─────────────────────────────────┤
│  "What is one small thing you   │
│   did for yourself or your      │
│   work today?"                  │  ← gentle question prompt
│                                 │
│  [ __________________________ ] │  ← single text input (140 char max)
│                                 │
│  [ Plant It 🌱 ] [Bukan Hustle ☕] │  ← two action buttons
│                                 │
│  ── "It's okay to do nothing    │
│      today. Your progress       │
│      is safe." ──               │  ← Bukan Hustle message (hidden until clicked)
│                                 │
│  ── recent wins ──              │
│  · fixed that CSS bug           │  ← scrollable past wins (Builder's Log preview)
│  · read 5 pages before bed      │
│  · took a proper lunch break    │
└─────────────────────────────────┘
```

**Behaviour:**
- Only one entry is allowed per day (the input is locked after logging).
- Pressing "Plant It" adds a flower to the garden and saves the win to LocalStorage.
- Pressing "Bukan Hustle" shows the rest message and the pixel character sits down.
- The recent wins list shows the last 3–4 entries as a soft reminder of progress.

---

### Page 3 — Calendar (Month View)

**Purpose:** See the whole month at a glance. Every day you logged shows a tiny flower. No shame for empty days.

**Layout (top to bottom):**

```
┌─────────────────────────────────┐
│  ‹ April 2026 ›                 │  ← month navigation (prev/next arrows)
├─────────────────────────────────┤
│  S   M   T   W   T   F   S     │
│  -   -   🌸  🌷  -   🌼  🌺    │
│  🌸  -   🌹  🌷  🌻  -   🌸   │
│  🌸  🌸  -   🌸  🌷  ⬤  -    │  ← ⬤ = today (outlined)
│  -   -   -   -   -   -   -     │
└─────────────────────────────────┘
│  tap a day to see your win      │  ← hint text
│                                 │
│  [ Day detail panel ]           │  ← appears when a day is tapped:
│    25 Apr 2026                  │     shows the win text + flower type
│    "read 5 pages before bed"    │
│    🌷 lavender tulip            │
└─────────────────────────────────┘
```

**Behaviour:**
- Days with a logged win show a small pixel flower icon.
- Days without an entry are empty — no red marks, no crossed-out boxes.
- Today is outlined (orange border).
- Tapping a past day opens a small detail panel below the calendar showing the win text and flower type.
- Previous months are viewable (navigating back shows historical gardens).

---

### Page 4 — Builder's Log (Archive)

**Purpose:** A scrollable memory of every win ever logged. Your honest diary, one line at a time.

**Layout (top to bottom):**

```
┌─────────────────────────────────┐
│  Builder's Log                  │  ← page title
│  "your honest garden journal"   │  ← subtitle
├─────────────────────────────────┤
│  26 Apr 2026                    │
│  "fixed the CSS bug that        │
│   bothered me for 2 days"       │
│  🌸 pink dahlia                 │  ← flower badge
│─────────────────────────────────│
│  25 Apr 2026                    │
│  "read 5 pages before bed"      │
│  🌷 lavender tulip              │
│─────────────────────────────────│
│  24 Apr 2026                    │
│  "took a proper lunch break"    │
│  🌼 mint daisy                  │
└─────────────────────────────────┘
```

**Behaviour:**
- Newest entry at the top, oldest at the bottom.
- Each entry shows: date, the win text, and the flower type it grew.
- 140-character limit per entry — enforced at input time.
- No editing or deleting (this is a diary, not a task list). Mistakes are part of the story.

---

## 4. Features & Interactions

### A. The Slow Growth Mechanic

Every logged win plants exactly one new flower in the garden. The garden fills slowly — a few flowers per week, not per hour. This is intentional. The visual reward matches real-life pace.

**Flower growth stages (per plant, over days):**

| Days since planted | Visual state |
|---|---|
| Day 1 | Tiny green sprout (2px stem) |
| Day 3 | Small stem + first leaf |
| Day 7 | Full stem + closed bud |
| Day 14+ | Full flower in bloom |

### B. The Bukan Hustle Button

**What it is:** An "Anti-Hustle" escape hatch for overwhelmed days.

**What it does:**
1. Shows the message: *"It's okay to do nothing today. Your progress is safe."*
2. The pixel character transitions to a sitting/resting animation.
3. The watering can stays upright (no watering = no pressure).
4. The day is marked gently in the calendar (different icon — maybe a small moon or cloud, not a flower).

### C. Mom Mode (Atmosphere Toggle)

**What it is:** A light/mood toggle that simulates time of day.

| Mode | Colours | Feeling |
|---|---|---|
| Bright Day | Cream sky, soft greens, warm white | Morning focus |
| Warm Sunset | Orange-pink sky, amber tones, warm glow | Evening wind-down |

**Technical detail:** Uses a 2000ms CSS `transition` on background and border colours — slow enough to feel like the light is actually shifting.

### D. Builder's Log Constraint

- One entry per day maximum.
- 140-character limit (enforced with a live counter).
- No editing after submission — keeps it honest and guilt-free.

---

## 5. Visual Design

### Aesthetic Direction

32-bit retro pixel art meets soft pastel — like a cozy indie game from 2003, but gentle and feminine. Think Animal Crossing meets a handmade journal.

### Colour Palette (Tailwind custom tokens)

```js
// tailwind.config.js
colors: {
  'cream':      '#FFF8F0',
  'peach':      '#FFD6B3',
  'lavender':   '#E8D5F5',
  'mint':       '#C8F0DC',
  'sage':       '#81B89A',
  'soil-light': '#F5DEB3',
  'soil-mid':   '#D4A96A',
  'soil-dark':  '#8B5E2E',
  'sunset-sky': '#FF9A5C',
  'pixel-pink': '#FFB3C6',
  'pixel-purple': '#C8A8E8',
}
```

### Pixel SVG Assets

All visual assets are built with `<svg>` pixel grids (`image-rendering: pixelated`).

**The Watering Can** (tips on win log)
```xml
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated;">
  <rect x="8"  y="14" width="12" height="10" fill="#F3E5F5" />
  <rect x="20" y="16" width="6"  height="2"  fill="#F3E5F5" />
  <rect x="26" y="14" width="2"  height="4"  fill="#F3E5F5" />
  <rect x="6"  y="12" width="2"  height="8"  fill="#D1C4E9" />
</svg>
```

**The Sprout** (first stage after logging)
```xml
<svg width="32" height="32" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated;">
  <rect x="15" y="20" width="2" height="6" fill="#81C784" />
  <rect x="13" y="18" width="2" height="2" fill="#E8F5E9" />
  <rect x="17" y="18" width="2" height="2" fill="#E8F5E9" />
</svg>
```

**Flower types** (unlocked by logging, Phase 4):

| Flower | Colour | Pixel colour code |
|---|---|---|
| Pink dahlia | Hot pink | `#FFB3C6` |
| Lavender tulip | Soft purple | `#C8A8E8` |
| Mint daisy | Fresh green | `#C8F0DC` |
| Peach rose | Warm peach | `#FFD6B3` |
| Sunset marigold | Orange | `#FF9A5C` |

---

## 6. Technical Specifications

| Component | Technology | Detail |
|---|---|---|
| Framework | React + Vite | Fast HMR, lightweight for indie feel |
| Styling | TailwindCSS | Custom pastel palette via config tokens |
| UI Library | NES.css | 8-bit retro aesthetic for buttons and containers |
| Data Storage | LocalStorage | Private, no accounts needed, stays on device |
| Deployment | PWA | Installable, offline-capable |

### LocalStorage Data Schema

```js
// One entry per day. Key = date string.
{
  "2026-04-26": {
    text: "fixed the CSS bug that bothered me for 2 days",
    flower: "pink-dahlia",
    mode: "rest" | "win",    // "rest" if Bukan Hustle was pressed
    timestamp: 1745625600000
  },
  "2026-04-25": {
    text: "read 5 pages before bed",
    flower: "lavender-tulip",
    mode: "win",
    timestamp: 1745539200000
  }
}
```

### File Structure (after setup)

```
your-project/
├── public/
│   └── manifest.json          ← PWA manifest (Phase 4)
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx      ← navigation bar
│   │   ├── GardenView.jsx     ← Page 1: pixel garden scene
│   │   ├── TodayView.jsx      ← Page 2: input + Bukan Hustle
│   │   ├── CalendarView.jsx   ← Page 3: month grid
│   │   ├── LogView.jsx        ← Page 4: builder's log list
│   │   ├── PixelPlant.jsx     ← reusable pixel plant SVG component
│   │   └── MomModeToggle.jsx  ← atmosphere toggle button
│   ├── utils/
│   │   └── storage.js         ← LocalStorage read/write helpers
│   ├── App.jsx                ← page router + Mom Mode state
│   ├── main.jsx               ← entry point
│   └── index.css              ← Tailwind import + pixel font
├── tailwind.config.js         ← custom colour tokens
├── vite.config.js             ← Vite + Tailwind plugin
├── PRD.md                     ← this document
└── LICENSE
```

---

## 7. Development Roadmap — "Slow is Sustainable"

### Phase 1 — The Soil *(Setup)*
- Initialize Vite + React project in current folder
- Configure Tailwind with custom pastel palette tokens
- Set up `src/utils/storage.js` (LocalStorage read/write)
- Build the `BottomNav` shell with 4 tabs (empty pages)
- Set up `App.jsx` with page routing state and Mom Mode state

**Deliverable:** A running app with 4 empty pages and working bottom nav.

**SVGs needed:** None yet.

---

### Phase 2 — The Sprout *(Core loop)*
- Build `TodayView.jsx` — input field, Plant It button, 140-char counter
- Build `GardenView.jsx` — pixel soil strip, flowers rendered from LocalStorage data
- Build `PixelPlant.jsx` — reusable SVG component with growth stages
- Build `LogView.jsx` — scrollable list of past wins with dates
- Wire up LocalStorage: saving wins, reading wins, one-per-day lock

**Deliverable:** The core loop works — type a win, see a flower appear.

**SVGs needed:** Sprout, small flower, soil cells.

---

### Phase 3 — The Bloom *(Mood + rest)*
- Build `CalendarView.jsx` — month grid, flower icons on logged days, day detail panel
- Build `MomModeToggle.jsx` — 2000ms CSS transition between Bright Day and Warm Sunset
- Add Bukan Hustle button logic — rest message, character sit animation
- Add pixel character to TodayView (standing vs sitting state)
- Add watering can tip animation on win log

**Deliverable:** Full emotional experience — calendar, moods, and rest are all working.

**SVGs needed:** Pixel character (standing + sitting), watering can, full flower types.

---

### Phase 4 — The Greenhouse *(Polish)*
- Add flower variety — different flower types based on win content or unlock order
- Add daily affirmations (gentle quote shown on the Today page each day)
- Finalize PWA manifest — installable on mobile home screen
- Add offline support
- Soft garden reset at month start (old plants fade, new month begins fresh)

**Deliverable:** A complete, installable app ready to share.

---

## 8. A Note for the Builder

Since you are learning while building this, every phase is designed to teach one new concept:

- **Phase 1** teaches: project setup, config files, component structure.
- **Phase 2** teaches: React state, props, LocalStorage, conditional rendering.
- **Phase 3** teaches: CSS transitions, animations, date handling.
- **Phase 4** teaches: PWA concepts, polish, shipping.

If you spend three days perfecting the Sunset Orange transition — that is time well spent tending to your digital greenhouse. Slow is sustainable. 🌱
