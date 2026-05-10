# 🌸 Slow-Bit Sanctuary — Complete Implementation Plan
## Version 3.0 — Adaptive Navigation + Linear Grid + Phase Completion

---

## EXECUTIVE SUMMARY

**Project Status:** Phase 3 (Bloom) — 70% Complete
**Next Priority:** Implement Floating Side Rail (Desktop) + Garden Grid Fixes
**Timeline:** 3-4 development sessions

### What's Done ✅
- [x] Phase 1: Soil (Setup) — Complete
- [x] Phase 2: Sprout (Core loop) — Complete
- [x] Phase 3A: Bloom (Calendar + Mom Mode) — Complete
- [x] Phase 3B: Growing Tree + 3-win system — Complete (assets exist)
- [ ] Phase 3C: Responsive Layout (Adaptive Navigation) — **IN PROGRESS**
- [ ] Phase 4: Greenhouse (Polish + PWA) — Not started

---

## CRITICAL CONFIRMATIONS ✅

| Item | Status | Details |
|------|--------|---------|
| **Asset Files** | ✅ CONFIRMED | `initial_state.png`, `stage_1.png`, `stage_2.png`, `final_stage.png` exist in `/src/assets/` |
| **Floating Rail Position** | ✅ CONFIRMED | RIGHT side (unique aesthetic) |
| **Rest Icon Consistency** | ✅ CONFIRMED | Use `☕` coffee emoji across ALL pages (Calendar, Garden, Log, Today) |
| **Linear Grid** | ✅ CONFIRMED | 11 columns × 3 rows (33 cells for 31 days) |

---

# PHASE COMPLETION TRACKER

## ✅ PHASE 1: The Soil (Setup)

### Status: COMPLETE

**Deliverables:**
- [x] Initialize Vite + React project
- [x] Configure Tailwind with custom pastel palette tokens
- [x] Set up `/utils/storage.js` with LocalStorage helpers
- [x] Build BottomNav component with 4 tabs (working)
- [x] Set up App.jsx with page routing + Mom Mode state
- [x] Watercolor theme applied (fonts, colours, CSS animations)

**Code Files:**
- `src/main.jsx` ✅
- `src/App.jsx` ✅
- `src/index.css` ✅
- `src/utils/storage.js` ✅ (Updated for 3 wins per day)
- `src/components/BottomNav.jsx` ✅

---

## ✅ PHASE 2: The Sprout (Core Loop)

### Status: COMPLETE

**Deliverables:**
- [x] Build TodayView.jsx — input field, Plant It button, 140-char counter
- [x] Build GardenView.jsx — pixel soil strip, flowers rendered from LocalStorage
- [x] Build WatercolorPlant.jsx — SVG component with growth stages (0-3)
- [x] Build LogView.jsx — scrollable list of past wins with dates
- [x] Wire up LocalStorage: saving wins, reading wins, one-per-day lock
- [x] Support 3 wins per day (MAX_WINS_PER_DAY = 3)

**Code Files:**
- `src/components/TodayView.jsx` ✅ (3-win slots, Bukan Hustle)
- `src/components/GardenView.jsx` ✅ (Meadow scene + new linear grid)
- `src/components/WatercolorPlant.jsx` ✅ (Organic SVG flowers, 4 growth stages)
- `src/components/LogView.jsx` ✅ (Shows all 3 wins per day)
- `src/utils/storage.js` ✅

---

## ✅ PHASE 3A: The Bloom (Mood + Rest)

### Status: COMPLETE

**Deliverables:**
- [x] Build CalendarView.jsx — month grid, flower icons, day detail panel
- [x] Detail panel shows ALL wins (not just first) — **DESIGN FIX APPLIED**
- [x] Build MomModeToggle.jsx — CSS transition (Bright Day ↔ Warm Sunset)
- [x] Add Bukan Hustle button logic — rest message, character animation
- [x] Add pixel character to TodayView (growing tree with image assets)
- [x] Add watering can tip animation (implied in tree stages)

**Code Files:**
- `src/components/CalendarView.jsx` ✅ (Month grid, detail panel shows all wins)
- `src/App.jsx` ✅ (Mom Mode state + theme transitions)
- `src/components/TodayView.jsx` ✅ (Growing tree stages + Bukan Hustle)

---

## ✅ PHASE 3B: Complete Multi-Win System

### Status: COMPLETE

**Deliverables:**
- [x] Support 3 wins per day (MAX_WINS_PER_DAY = 3)
- [x] Each win gets own flower type (rotation: pink-dahlia, lavender-tulip, mint-daisy, peach-rose, sunset-marigold)
- [x] CalendarView: numeric badge shows win count (1/2/3)
- [x] CalendarView: detail panel shows ALL 3 wins with flower types
- [x] LogView: flatten wins array — all 3 wins appear as separate entries ✅
- [x] GardenView: meadow displays all plants (up to 16 visible, scrolls for more)
- [x] TodayView: 3 input slots, one-at-a-time entry, lock after 3 wins

**Code Files:**
- `src/utils/storage.js` ✅ (3-win data structure + helpers)
- `src/components/CalendarView.jsx` ✅ (Numeric badge + detail panel)
- `src/components/LogView.jsx` ✅ (All wins visible)
- `src/components/GardenView.jsx` ✅ (Meadow grid)
- `src/components/TodayView.jsx` ✅ (3 slots)

---

## ⏳ PHASE 3C: Responsive Layout (Adaptive Navigation)

### Status: IN PROGRESS — **NEXT PRIORITY**

**Objectives:**
- Implement Floating Side Rail for desktop (≥1024px)
- Keep Bottom Navigation for mobile (<1024px)
- Add responsive padding to main content
- Glassmorphism effect on floating rail
- Responsive grid gap in GardenView

### 3C.1: Create FloatingRail Component

**New File:** `src/components/FloatingRail.jsx`

**Specs:**
- Position: Fixed, RIGHT side
- Width: 70px
- Padding: 20px vertical
- Gap between icons: 16px
- Distance from right edge: 20px
- Vertical center: 50% (with transform)
- Background: `rgba(253, 251, 247, 0.7)` with `backdrop-filter: blur(12px)`
- Border: `1.5px solid rgba(212, 188, 168, 0.5)`
- Border-radius: 40px
- Z-index: 50
- Trigger: windowWidth ≥ 1024px

**Icons:** Same as BottomNav (Garden, Today, Calendar, Log)

**Interactions:**
- Hover: Icon scales up slightly (scale 1.1)
- Hover: Tooltip appears to right of icon (e.g., "Garden")
- Click: Navigate to page
- Active state: Icon colour changes (same as BottomNav)

**Example Tooltip:**
```
Icon appears → [Tooltip: "Garden" appears] ← 60px distance
```

---

### 3C.2: Update App.jsx Layout Logic

**Changes:**
1. Add responsive content padding
   - Desktop (≥1024px): `paddingRight: '110px'` (70px rail + 20px + 20px margin)
   - Mobile/Tablet: No padding

2. Conditional rendering:
   ```jsx
   {windowWidth < 1024 && <BottomNav {...props} />}
   {windowWidth >= 1024 && <FloatingRail {...props} />}
   ```

3. Update header responsiveness:
   - Mobile: Compact (current)
   - Desktop: Allow more breathing room

---

### 3C.2: Fix GardenView Linear Grid

**Current Issues:**
- Gap sizing: Fixed `6px` on all devices
- Rest icon: Uses `🌙` (should be `☕` for consistency)
- Today indicator: Bottom dot might not be visible

**Fixes:**

```javascript
// 1. Responsive gap
const gap = windowWidth < 768 ? '4px' : windowWidth < 1200 ? '6px' : '8px'

// 2. Rest icon consistency
{entry?.mode === 'rest' && (
  <span style={{ fontSize: '20px' }}>☕</span>  // Changed from 🌙
)}

// 3. Better today indicator
border: isToday 
  ? `2.5px solid #FF9A5C` 
  : `1px solid rgba(194, 163, 138, 0.1)`
// (Remove the bottom dot entirely — border is clearer)
```

---

### 3C.4: Update CalendarView Rest Icon

**Change:**
```javascript
{entry.mode === 'rest' ? '☕' : '🌸'}
// (Changed from 🌙 to ☕)
```

---

### 3C.5: Update LogView Rest Icon

**Change:**
```javascript
{isRest && (
  <div style={{ fontSize: '16px' }}>☕</div>  // Changed from no icon
)}
```

---

### Completion Checklist for Phase 3C:

- [ ] Create `src/components/FloatingRail.jsx`
- [ ] Update `src/App.jsx` (conditional rendering + padding logic)
- [ ] Fix `src/components/GardenView.jsx` (gap sizing, rest icon, today indicator)
- [ ] Update `src/components/CalendarView.jsx` (rest icon to ☕)
- [ ] Update `src/components/LogView.jsx` (rest icon to ☕)
- [ ] Test responsiveness on:
  - [ ] Mobile (375px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px, 1440px, 1920px)
- [ ] Verify no content hidden behind floating rail
- [ ] Test Mom Mode theme transitions on all breakpoints

---

## ⏳ PHASE 4: The Greenhouse (Polish + PWA)

### Status: NOT STARTED

**Objectives:**
1. Add flower variety — unlock different flower types
2. Add daily affirmations — contextual by streak
3. Finalize PWA manifest — installable on mobile home screen
4. Add offline support
5. Soft garden reset at month start (old plants fade, new month begins)

### 4.1: Daily Affirmations

**Placement:** Below GardenView meadow, above stats

**Logic:**
```javascript
const affirmations = {
  0: "Every garden starts with a single seed. 🌱",
  3: "Three days of consistency! That's real. 🌿",
  7: "One week! Your dedication is showing. 🌳",
  14: "Two weeks of growth. You're unstoppable. 🌸",
  30: "A full month! Your sanctuary is thriving. 🌼",
  rest: "Rest is not laziness. Rest is wisdom. 🌙",
}

// Show based on current streak
```

**Rotation:** New affirmation each day

---

### 4.2: Night Mode (Dark Theme)

**Colour Palette:**

| Element | Light | Dark |
|---------|-------|------|
| **Background** | `#FDFBF7` (parchment) | `#0f172a` (dark blue-brown) |
| **Text Primary** | `#5C3D1E` (dark brown) | `#f5ede3` (warm cream) |
| **Text Secondary** | `#A88C74` (warm tan) | `#94a3b8` (muted slate) |
| **Accent** | `#8DAA91` (sage) | `#7ba08f` (muted sage) |
| **Border** | `#D4BCA8` (light tan) | `#334155` (dark slate) |

**Implementation:**
- Add toggle in header (☀️ → 🌙)
- Store preference in localStorage
- Smooth transition (2000ms CSS)

---

### 4.3: PWA Setup

**Files to Create:**
- `public/manifest.json` — app metadata
- `public/icon-192.png`, `icon-512.png` — app icons
- Service Worker registration in `main.jsx`

**Manifest Content:**
```json
{
  "name": "The Slow-Bit Sanctuary",
  "short_name": "Sanctuary",
  "description": "A gratitude garden for honest builders",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FDFBF7",
  "theme_color": "#8DAA91",
  "icons": [...]
}
```

---

### 4.4: Monthly Garden Reset

**Logic:**
- On first day of new month, animate old plants fading
- New month counter resets
- Old entries stay in Builder's Log (historical)
- Visual: Plants slowly become transparent, then new fresh plants appear

---

### Completion Checklist for Phase 4:

- [ ] Implement daily affirmations (contextual by streak)
- [ ] Add night mode toggle + persistence
- [ ] Create PWA manifest
- [ ] Generate app icons (192px, 512px)
- [ ] Test offline mode (Service Worker)
- [ ] Implement monthly reset animation
- [ ] Add sound effects (optional)
- [ ] Final polish: micro-interactions, polish

---

# DETAILED IMPLEMENTATION ROADMAP

## IMMEDIATE NEXT STEPS (This Session)

### Priority 1: Create FloatingRail Component
**Estimated Time:** 30 minutes

**Tasks:**
1. Create `src/components/FloatingRail.jsx`
2. Copy icon SVG functions from BottomNav
3. Adapt to vertical layout (flex-direction: column)
4. Add tooltip hover effect
5. Add glassmorphism styling

**Testing:**
- Verify icons appear on right side
- Test hover animations
- Check tooltip positioning

---

### Priority 2: Update App.jsx
**Estimated Time:** 20 minutes

**Tasks:**
1. Import FloatingRail component
2. Add responsive padding logic
3. Add conditional rendering (mobile vs desktop)
4. Update theme transitions for rail

**Testing:**
- Test at 1023px (should show BottomNav)
- Test at 1024px (should show FloatingRail)
- Verify no content hidden

---

### Priority 3: Fix GardenView Grid
**Estimated Time:** 20 minutes

**Tasks:**
1. Make gap responsive
2. Change rest icon from 🌙 to ☕
3. Remove bottom dot indicator (use border instead)
4. Test on mobile/tablet/desktop

---

### Priority 4: Update Rest Icons Consistency
**Estimated Time:** 15 minutes

**Tasks:**
1. CalendarView: Change 🌙 → ☕
2. LogView: Add ☕ icon for rest entries
3. Verify consistency across all pages

---

# FILE-BY-FILE CHECKLIST

## Files to Create:
- [ ] `src/components/FloatingRail.jsx` — NEW

## Files to Modify:
- [ ] `src/App.jsx` — Add responsive layout logic + FloatingRail
- [ ] `src/components/GardenView.jsx` — Fix grid gap + rest icon
- [ ] `src/components/CalendarView.jsx` — Change rest icon to ☕
- [ ] `src/components/LogView.jsx` — Add rest icon visibility

## Files Unchanged (Already Complete):
- ✅ `src/components/BottomNav.jsx`
- ✅ `src/components/TodayView.jsx`
- ✅ `src/components/WatercolorPlant.jsx`
- ✅ `src/utils/storage.js`
- ✅ `src/index.css`
- ✅ `src/main.jsx`

---

# DESIGN DECISIONS STATUS

## From DESIGN_DECISIONS_SUMMARY.md — Implementation Status

| Decision | Status | Notes |
|----------|--------|-------|
| **Responsive Layout (Desktop-First)** | 🟡 IN PROGRESS | FloatingRail component needed |
| **Growing Tree in TodayView** | ✅ DONE | Assets confirmed to exist |
| **Multi-win Display (Calendar)** | ✅ DONE | Numeric badge + detail panel complete |
| **All Wins in LogView** | ✅ DONE | Wins array flattened |
| **Day Labels in GardenView** | 🟡 IN PROGRESS | Grid exists, needs minor refinements |
| **Rest Icon Consistency** | 🟡 IN PROGRESS | Change 🌙 → ☕ across all pages |
| **Night Mode (Phase 4)** | ⏳ NOT STARTED | Planned for Phase 4 |
| **Daily Affirmations (Phase 4)** | ⏳ NOT STARTED | Planned for Phase 4 |

---

# TECHNICAL SPECIFICATIONS

## FloatingRail Component Specs

```jsx
// src/components/FloatingRail.jsx

Props:
- activePage (string): Current active page
- onNavigate (function): Callback to change page
- momMode (string): 'day' or 'sunset'

Layout:
- Position: fixed
- Right: 20px
- Top: 50%
- Transform: translateY(-50%)
- Width: 70px
- Height: auto
- Z-index: 50

Styling:
- Background: rgba(253, 251, 247, 0.7)
- Backdrop: blur(12px)
- Border: 1.5px solid rgba(212, 188, 168, 0.5)
- Border-radius: 40px
- Padding: 20px 0
- Gap between icons: 16px

Hover Behavior:
- Icon scale: 1.1
- Tooltip appears: "Garden" / "Today" / "Calendar" / "Log"
- Tooltip position: left of icon, 8px distance
```

---

## Responsive Breakpoints

```
Mobile:     0 – 767px    → BottomNav (bottom fixed)
Tablet:     768 – 1023px → BottomNav (bottom fixed)
Desktop:    1024px +     → FloatingRail (right fixed)
```

---

## Mom Mode Theme Mapping (Updated for Rail)

```
Bright Day Mode:
- Rail background: rgba(253, 251, 247, 0.7)
- Rail border: rgba(212, 188, 168, 0.5)
- Icon colors: #8DAA91 (active), #A88C74 (inactive)
- Sky gradient: #FDE8D0 → #FFF8F0

Warm Sunset Mode:
- Rail background: rgba(255, 240, 224, 0.8)
- Rail border: rgba(200, 120, 74, 0.5)
- Icon colors: #C8784A (active), #A88C74 (inactive)
- Sky gradient: #F4A87C → #F4D4A0
```

---

# QUALITY ASSURANCE CHECKLIST

## Before marking Phase 3C as COMPLETE:

### Functionality
- [ ] FloatingRail appears at 1024px+ breakpoint
- [ ] BottomNav hidden at 1024px+ breakpoint
- [ ] Navigation works from both BottomNav and FloatingRail
- [ ] Active page indicator works on rail
- [ ] Hover animations smooth and responsive

### Responsiveness
- [ ] Mobile (375px): BottomNav visible, no rail
- [ ] Tablet (768px): BottomNav visible, no rail
- [ ] Desktop (1024px): FloatingRail visible, no nav bar
- [ ] Large desktop (1920px): Layout not stretched, padding correct

### Visual
- [ ] Glassmorphism effect visible
- [ ] Icons clearly visible (not obscured)
- [ ] Tooltip text readable
- [ ] No content hidden behind rail
- [ ] Mom Mode transitions smooth on rail

### Content
- [ ] GardenView grid gaps responsive
- [ ] Rest icons consistent (☕) across all pages
- [ ] Today indicator clear on all devices

### Accessibility
- [ ] Icons have semantic meaning (hover tooltip)
- [ ] Colour contrast sufficient
- [ ] Touch targets minimum 44px on mobile

---

# ESTIMATED TIMELINE

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 3C.1 | Create FloatingRail.jsx | 30 min | Not started |
| 3C.2 | Update App.jsx layout | 20 min | Not started |
| 3C.3 | Fix GardenView grid | 20 min | Not started |
| 3C.4 | Update CalendarView icon | 10 min | Not started |
| 3C.5 | Update LogView icon | 10 min | Not started |
| Test | QA across all breakpoints | 20 min | Not started |
| **Total Phase 3C** | | **110 min** | |
| 4 | Phase 4 (Affirmations + PWA) | 4-6 hours | Not started |

---

# EXPERT RECOMMENDATIONS

## Key Decisions Made ✅

1. **Floating Rail on RIGHT** — Creates unique aesthetic, doesn't interfere with F-pattern reading
2. **1024px Breakpoint** — Sweet spot for tablet/desktop transition
3. **Glassmorphism** — Matches indie game aesthetic, doesn't hide garden
4. **☕ Consistency** — Unifies rest days concept across all views
5. **Responsive Grid Gap** — Improves readability on mobile without stretching desktop

## Potential Enhancements (Phase 4+)

1. **Animated Rail Entry** — Rail slides in on page load
2. **Micro-interactions** — Icons bounce on hover
3. **Smart Tooltips** — Only show on first visit (UX onboarding)
4. **Keyboard Navigation** — Arrow keys + numbers (1/2/3/4) to navigate
5. **Accessibility Mode** — High contrast toggle

---

# NEXT IMMEDIATE ACTION

**Ready to execute Phase 3C?**

**Confirm these before I start coding:**

1. ✅ FloatingRail on RIGHT side — confirmed
2. ✅ Rest icon as ☕ everywhere — confirmed
3. ✅ Assets exist in `/src/assets/` — confirmed
4. ✅ 1024px breakpoint — confirmed

**Then I'll proceed with:**
1. Create `FloatingRail.jsx` (30 min)
2. Update `App.jsx` (20 min)
3. Fix `GardenView.jsx` (20 min)
4. Update rest icons in `CalendarView.jsx` + `LogView.jsx` (20 min)
5. Full QA testing

**Total execution time: ~110 minutes for Phase 3C**

Then we move to Phase 4 (Daily Affirmations + Night Mode + PWA setup).

---

*This plan is comprehensive, phased, and ready for execution. All decisions aligned with expert UI/UX best practices for cozy indie app design.* 🌸
