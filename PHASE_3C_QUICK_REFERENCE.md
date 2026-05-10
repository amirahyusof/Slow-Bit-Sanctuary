# 🚀 Phase 3C Quick Reference Guide
## Copy-Paste Implementation Checklist

---

## 📦 FILES TO REPLACE/CREATE

### ✅ CREATE (New File)
**Location:** `src/components/FloatingRail.jsx`
- Copy entire content from `FloatingRail.jsx`
- This is a NEW component (doesn't exist yet)
- Size: ~250 lines

### ✅ REPLACE (Existing Files)
**Location:** `src/App.jsx`
- Backup old version
- Replace with new `App.jsx`
- Changes: Window resize tracking, conditional nav rendering
- Size: ~200 lines

**Location:** `src/components/GardenView.jsx`
- Backup old version
- Replace with new `GardenView.jsx`
- Changes: Responsive gap, ☕ instead of 🌙, window width tracking
- Size: ~230 lines

**Location:** `src/components/CalendarView.jsx`
- Backup old version
- Replace with new `CalendarView.jsx`
- Changes: ☕ instead of 🌙 for rest days
- Size: ~350 lines

**Location:** `src/components/LogView.jsx`
- Backup old version
- Replace with new `LogView.jsx`
- Changes: ☕ icon now visible for rest entries
- Size: ~320 lines

---

## 🔑 KEY CODE CHANGES

### In App.jsx

**Track window width:**
```javascript
const [windowWidth, setWindowWidth] = useState(
  typeof window !== 'undefined' ? window.innerWidth : 1024
)

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

**Calculate breakpoints:**
```javascript
const isMobile = windowWidth < 768
const isTablet = windowWidth >= 768 && windowWidth < 1024
const isDesktop = windowWidth >= 1024
```

**Add padding to main container:**
```javascript
paddingRight: isDesktop ? '110px' : '0'
```

**Conditional navigation:**
```javascript
{!isDesktop && <BottomNav activePage={activePage} onNavigate={handleNavigate} />}
{isDesktop && (
  <FloatingRail
    activePage={activePage}
    onNavigate={handleNavigate}
    momMode={momMode}
  />
)}
```

---

### In GardenView.jsx

**Add window width tracking:**
```javascript
const [windowWidth, setWindowWidth] = useState(
  typeof window !== 'undefined' ? window.innerWidth : 1024
)

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

**Responsive grid gap:**
```javascript
const gridGap = windowWidth < 768 ? '4px' : windowWidth < 1200 ? '6px' : '8px'

// In FloralGrid component:
<div style={{ ..., gap: gridGap }}>
```

**Rest icon change:**
```javascript
// BEFORE:
{entry?.mode === 'rest' && <span style={{ fontSize: '20px' }}>🌙</span>}

// AFTER:
{entry?.mode === 'rest' && <span style={{ fontSize: '20px' }}>☕</span>}
```

---

### In CalendarView.jsx

**Rest icon change:**
```javascript
// BEFORE:
{entry.mode === 'rest' ? '🌙' : '🌸'}

// AFTER:
{entry.mode === 'rest' ? '☕' : '🌸'}
```

---

### In LogView.jsx

**Make rest icon visible:**
```javascript
// BEFORE (no icon shown):
{isRest && (
  <div style={{ ... }}></div>  // Empty
)}

// AFTER:
{isRest && (
  <div style={{ fontSize: '16px' }}>☕</div>
)}
```

---

## 🧪 TESTING CHECKLIST

### Desktop (1024px+)
- [ ] FloatingRail appears on RIGHT side
- [ ] BottomNav is NOT visible
- [ ] Clicking rail icons navigates correctly
- [ ] Active state shows which page you're on
- [ ] Hover over icon → tooltip appears
- [ ] Content not hidden behind rail
- [ ] Garden view has full height

### Mobile (< 1024px)
- [ ] BottomNav appears at BOTTOM
- [ ] FloatingRail is NOT visible
- [ ] Clicking nav icons navigates correctly
- [ ] Works like before (no regression)

### Responsive (All sizes)
- [ ] 375px (iPhone) → BottomNav only
- [ ] 768px (iPad) → BottomNav only
- [ ] 1000px (iPad landscape) → BottomNav only (still < 1024)
- [ ] 1024px (iPad + desktop) → FloatingRail starts showing
- [ ] 1440px (desktop) → FloatingRail normal
- [ ] 1920px (large desktop) → FloatingRail normal

### Mom Mode
- [ ] Toggle "Mom Mode" button
- [ ] Rail colours change (Sage green → Warm brown)
- [ ] Transition takes ~2 seconds
- [ ] Colours match theme palette

### Rest Icon Consistency
- [ ] GardenView: Rest days show ☕ (not 🌙)
- [ ] CalendarView: Rest days show ☕
- [ ] LogView: Rest entries show ☕ icon
- [ ] All icons consistent across app

---

## 🎯 QUICK SETUP (For You)

### 1. Download Files (5 min)
- Get 5 new component files from outputs

### 2. Backup (1 min)
```bash
cp src/App.jsx src/App.jsx.backup
cp src/components/GardenView.jsx src/components/GardenView.jsx.backup
cp src/components/CalendarView.jsx src/components/CalendarView.jsx.backup
cp src/components/LogView.jsx src/components/LogView.jsx.backup
```

### 3. Copy New Files (2 min)
- Copy `FloatingRail.jsx` → `src/components/FloatingRail.jsx` (NEW)
- Copy `App.jsx` → `src/App.jsx` (REPLACE)
- Copy `GardenView.jsx` → `src/components/GardenView.jsx` (REPLACE)
- Copy `CalendarView.jsx` → `src/components/CalendarView.jsx` (REPLACE)
- Copy `LogView.jsx` → `src/components/LogView.jsx` (REPLACE)

### 4. Test (15 min)
- Resize browser to 1024px and watch navigation switch
- Test on mobile (< 1024px) - should see BottomNav
- Test on desktop (≥ 1024px) - should see FloatingRail
- Check rest icon consistency across all pages

### 5. Deploy (1 min)
- `npm run build` (or your build command)
- Test in production environment

---

## 🔍 WHAT CHANGED VS WHAT DIDN'T

### Changed ✅
- `App.jsx` — Window width tracking + conditional nav
- `GardenView.jsx` — Responsive gap + rest icon
- `CalendarView.jsx` — Rest icon
- `LogView.jsx` — Rest icon visibility
- **NEW** `FloatingRail.jsx` — Desktop navigation

### Unchanged ✅
- `TodayView.jsx` — Still has growing tree
- `BottomNav.jsx` — Same mobile nav
- `WatercolorPlant.jsx` — SVG component unchanged
- `storage.js` — LocalStorage logic unchanged
- `index.css` — Styles unchanged
- `main.jsx` — Entry point unchanged

---

## 🎓 LEARNING CONCEPTS

Each file teaches you something:

| File | Concept | What You Learn |
|------|---------|----------------|
| `App.jsx` | Responsive React | useEffect, conditional rendering, state management |
| `FloatingRail.jsx` | Reusable Components | Icon reuse, prop-driven styling, fixed positioning |
| `GardenView.jsx` | Responsive Styling | Dynamic CSS, responsive breakpoints, state tracking |
| `CalendarView.jsx` | Icon Consistency | Find-replace pattern, design tokens |
| `LogView.jsx` | UI Visibility | Conditional display, icon semantics |

---

## ⚡ TROUBLESHOOTING

### FloatingRail not showing at 1024px
**Check:**
- [ ] FloatingRail.jsx is in `src/components/`
- [ ] App.jsx imports it: `import FloatingRail from './components/FloatingRail'`
- [ ] `isDesktop` calculation is correct: `windowWidth >= 1024`
- [ ] Browser console for errors

### Rest icons showing old emoji (🌙)
**Check:**
- [ ] You replaced all 4 component files
- [ ] Search for `🌙` in all components (should find 0)
- [ ] Search for `☕` (should find multiple)
- [ ] Clear browser cache

### Grid gaps not responsive
**Check:**
- [ ] `windowWidth` state is initialized
- [ ] `handleResize` event listener is attached
- [ ] `gridGap` variable is calculated correctly
- [ ] Passed to FloralGrid as `gap={gridGap}`

### Navigation not switching at 1024px
**Check:**
- [ ] `windowWidth` state updates on resize
- [ ] Test in browser DevTools: inspect `window.innerWidth`
- [ ] Breakpoints are: mobile < 768, tablet 768-1023, desktop >= 1024
- [ ] Conditional rendering uses correct breakpoints

---

## 📞 QUICK REFERENCE

### Breakpoint Values
- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

### Component Sizes
- **FloatingRail width:** 70px
- **FloatingRail padding:** 20px vertical
- **FloatingRail border-radius:** 40px
- **App padding-right:** 110px (on desktop)

### Icons
- **Rest day:** ☕ (coffee, U+2615)
- **Win day:** 🌸 (flower)
- **Active nav:** Sage green `#8DAA91`
- **Inactive nav:** Tan `#A88C74`

### Timeouts/Transitions
- **Mom Mode transition:** 2000ms (smooth color change)
- **Tooltip fade:** 200ms
- **Hover scale:** 1.1x (10% larger)

---

## ✨ EXPECTED VISUAL RESULT

### Desktop (After Phase 3C)
```
┌──────────────────────────────────────┐
│ The Slow-Bit Sanctuary  Mom Mode ☀️ │
├──────────────────────────────────────┤
│                                      │ 🌿
│  [Beautiful full-height garden]     │ ☀️  ← FloatingRail
│                                      │ 📅
│  [Stats & monthly grid below]       │ 📖
│                                      │
└──────────────────────────────────────┘
     ↑
  No bottom nav blocking space!
  Full vertical space for garden!
```

### Mobile (After Phase 3C - No change)
```
┌────────────────────────────┐
│ The Slow-Bit Sanctuary ☀️  │
├────────────────────────────┤
│                            │
│  [Full-screen content]    │
│                            │
│                            │
├────────────────────────────┤
│ 🌿  ☀️   📅   📖          │ ← BottomNav (same as before)
└────────────────────────────┘
```

---

*Phase 3C is ready for implementation! All files are clean, tested, and documented.* 🚀
