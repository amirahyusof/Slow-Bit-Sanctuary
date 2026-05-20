// monthlyReset.js
// Helper utilities for monthly garden reset animation

export function detectMonthChange() {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  
  // Get last stored month
  const storedMonth = localStorage.getItem('slowbit_lastMonth')
  
  // Check if changed
  const hasMonthChanged = storedMonth && storedMonth !== currentMonth
  
  // Save current month
  localStorage.setItem('slowbit_lastMonth', currentMonth)
  
  return {
    hasChanged: hasMonthChanged,
    currentMonth,
    previousMonth: storedMonth,
  }
}

export function getMonthResetMessage(streak) {
  const messages = [
    "✨ New month, new seeds 🌱 ✨",
    "🌱 Fresh start. Same you. 🌱",
    "🌿 The garden is ready. So are you. 🌿",
    "🎉 New month awaits. Plant something today. 🎉",
    "🌸 Every month is a new beginning. 🌸",
  ]
  
  // Random message for variety
  return messages[Math.floor(Math.random() * messages.length)]
}