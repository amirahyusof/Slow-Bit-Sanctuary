import { useState, useEffect } from 'react'
import WatercolorPlant, { getGrowthStage, getFlowerType } from './WatercolorPlant'
import {
  getAllEntriesSorted,
  getEntriesForMonth,
  getMonthWinCount,
  getCurrentStreak,
  todayKey,
} from '../utils/storage'

// ── Stat chip component (Menggunakan HEX terus untuk kestabilan) ──
function EnhancedStatChip({ value, label }) {
  return (
    <div style={{
      flex: 1,
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '80px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      border: '1.5px solid #D4BCA8',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(139, 94, 46, 0.08)'
    }}>
      <span style={{ fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 'bold', color: '#4A3728' }}>
        {value}
      </span>
      <span style={{ 
        fontFamily: '"Indie Flower", cursive', 
        fontSize: '10px', 
        color: '#7A5C44', 
        textAlign: 'center', 
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {label}
      </span>
    </div>
  );
}

// ── GitHub-style Floral Grid (7 Kolum) ──
function FloralContributionGrid({ year, month, entries }) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const entryMap = new Map(entries.map(e => [new Date(e.timestamp).getDate(), e]));

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
      padding: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '24px',
      border: '1px solid rgba(212, 188, 168, 0.4)'
    }}>
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const entry = entryMap.get(day);
        
        return (
          <div key={day} style={{ aspectRatio: '1/1', position: 'relative' }}>
            {/* Background Kotak (Dusty Rose jika ada entry, Parchment jika tiada) */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              backgroundColor: entry ? '#F4B8C8' : '#FDFBF7',
              opacity: entry ? 0.4 : 0.6,
              transition: 'all 0.5s ease'
            }} />
            
            {/* Bunga Mikro */}
            {entry && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WatercolorPlant 
                  flowerType={entry.flower || getFlowerType(day)} 
                  growthStage={3} 
                  size={0.45} 
                  animate={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function GardenView({ momMode }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(getAllEntriesSorted())
  }, [])

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const monthName = now.toLocaleString('en-GB', { month: 'long' })
  const monthEntries = getEntriesForMonth(year, month)
  const winCount = getMonthWinCount(year, month)
  const streak = getCurrentStreak()
  const plantEntries = entries.filter(e => e.mode === 'win')

  const skyBg = momMode === 'sunset'
    ? 'linear-gradient(180deg, #FF9A5C 0%, #FFB347 60%, #FFD580 100%)'
    : 'linear-gradient(180deg, #FDE8C8 0%, #FFF0E0 60%, #F5DEB3 100%)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* ── 1. LUSH GARDEN AREA ── */}
      <div style={{ 
        position: 'relative', 
        minHeight: '280px', 
        background: skyBg, 
        borderTopLeftRadius: '24px', 
        borderTopRightRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        
        {/* Layer Hiasan Latar */}
        <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, height: '2px', borderBottom: '2px dashed rgba(194, 163, 138, 0.3)' }} />

        {/* Kontena Pokok Berlapis (Absolute) */}
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          {plantEntries.map((entry, index) => {
            const leftPos = (index * 15) % 85; 
            const bottomPos = (index % 3) * 10; 
            return (
              <div key={entry.key} style={{
                position: 'absolute',
                left: `${leftPos}%`,
                bottom: `${bottomPos}px`,
                zIndex: bottomPos,
                animation: `fadeUp 0.6s ease ${index * 0.05}s both`,
                filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.05))'
              }}>
                <WatercolorPlant
                  flowerType={entry.flower || getFlowerType(index)}
                  growthStage={getGrowthStage(entry.timestamp)}
                  size={0.9 + (Math.random() * 0.3)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 2. ORGANIC SOIL STRIP ── */}
      <SoilStrip winsCount={winCount} />

      {/* ── 3. STATS & GRID AREA ── */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: 'Lora, serif', fontSize: '14px', color: '#7B4F2E', margin: 0 }}>
            {monthName} {year}
          </p>
          <p style={{ fontFamily: '"Indie Flower", cursive', fontSize: '16px', color: '#A88C74', margin: 0 }}>
            {plantEntries.length} plants grown
          </p>
        </div>

        {/* Stat Chips */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <EnhancedStatChip value={winCount} label={'days\nlogged'} />
          <EnhancedStatChip value={streak} label={'day\nstreak'} />
          <EnhancedStatChip value={plantEntries.length} label={'plants\ngrowing'} />
        </div>

        {/* Grid Kalendar Floral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontFamily: 'Lora, serif', fontSize: '12px', color: '#C4A07A', margin: 0 }}>
            This month at a glance
          </p>
          <FloralContributionGrid year={year} month={month} entries={monthEntries} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function SoilStrip({ winsCount }) {
  const baseSoil = '#C2A38A';
  const richSoil = '#9C7A5C';
  return (
    <div style={{
      position: 'relative', width: '100%', height: '28px',
      background: `linear-gradient(to bottom, ${baseSoil}, ${richSoil})`,
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" style={{ opacity: 0.3, mixBlendMode: 'multiply' }}>
        <filter id="soilNoise"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" /></filter>
        <rect width="100%" height="100%" filter="url(#soilNoise)" />
      </svg>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${Math.min(winsCount * 5, 100)}%`, height: '4px',
        background: '#8DAA91', filter: 'blur(2px)', opacity: 0.6, transition: 'width 2s ease'
      }} />
    </div>
  );
}
