// src/utils/affirmations.js
// Phase 4A: Daily Affirmations based on streak and rest status

/**
 * Get a contextual affirmation based on user's current streak and rest status
 * @param {number} streak - Current day streak
 * @param {boolean} isResting - Whether user chose Bukan Hustle today
 * @returns {string} Affirmation message with emoji
 */
export const getAffirmation = (streak, isResting) => {
  if (isResting) {
    // Rest affirmations - emphasize peace and gentleness
    const restAffirmations = [
      "Rest is not laziness. Rest is wisdom. 🌙",
      "Your progress is safe here.",
      "You've done enough. Be kind to yourself.",
      "Tomorrow is another chance to grow.",
      "Breathing in peace. Breathing out pressure.",
      "Small steps, big impact. Today, you rest.",
      "Growth needs rest. You're doing it right.",
      "This pause is part of the garden. 🌱",
    ]
    return restAffirmations[Math.floor(Math.random() * restAffirmations.length)]
  }

  // Streak-based affirmations - celebrate milestones
  if (streak === 0) return "Every garden starts with a single seed. 🌱"
  if (streak === 1) return "One day down. You've begun. 🌿"
  if (streak === 2) return "Twice now. Consistency whispers. 🌿"
  if (streak === 3) return "Three days of consistency! That's real. 🌿"
  if (streak === 5) return "Five days. You're finding your rhythm. 🌸"
  if (streak === 7) return "One week! Your dedication is showing. 🌳"
  if (streak === 10) return "Ten days strong. The garden is noticing. 🌳"
  if (streak === 14) return "Two weeks of growth. You're unstoppable. 🌸"
  if (streak === 21) return "Three weeks! Habits are forming. 🌺"
  if (streak === 30) return "A full month! Your sanctuary is thriving. 🌼"
  if (streak === 60) return "Two months of consistency. You're a builder. 🌺"
  if (streak === 100) return "One hundred days. You've become a gardener. 🌸"
  if (streak > 100) return `${streak} days strong. You're unstoppable. 🌺`
  if (streak > 30) return `${streak} days of growth. Keep going! 🌺`

  return "Every small step counts. Keep going! 🌱"
}

/**
 * Get affirmation with formatted streak count
 * Useful for displaying streak info alongside affirmation
 * @param {number} streak
 * @param {boolean} isResting
 * @returns {object} { message, emoji, milestones }
 */
export const getAffirmationWithMetadata = (streak, isResting) => {
  const milestones = [1, 3, 7, 14, 21, 30, 60, 100]
  const nextMilestone = milestones.find((m) => m > streak)
  const previousMilestone = [...milestones].reverse().find((m) => m <= streak)

  return {
    message: getAffirmation(streak, isResting),
    isResting,
    currentStreak: streak,
    nextMilestone: nextMilestone || streak + 10,
    previousMilestone: previousMilestone || 0,
    progressToNext: nextMilestone
      ? Math.round(((streak - (previousMilestone || 0)) / (nextMilestone - (previousMilestone || 0))) * 100)
      : 100,
  }
}

/**
 * Get a rotating affirmation based on the date
 * Same affirmation for the same day across sessions
 * @param {number} streak
 * @param {boolean} isResting
 * @param {Date} date - Optional date for consistency (default: today)
 * @returns {string}
 */
export const getDailyAffirmation = (streak, isResting, date = new Date()) => {
  // Use date-based seed for consistency
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000)
  
  if (isResting) {
    const restAffirmations = [
      "Rest is not laziness. Rest is wisdom. 🌙",
      "Your progress is safe here.",
      "You've done enough. Be kind to yourself.",
      "Tomorrow is another chance to grow.",
      "Breathing in peace. Breathing out pressure.",
      "Small steps, big impact. Today, you rest.",
      "Growth needs rest. You're doing it right.",
      "This pause is part of the garden. 🌱",
    ]
    const index = dayOfYear % restAffirmations.length
    return restAffirmations[index]
  }

  // For winning days, use streak-based affirmation
  return getAffirmation(streak, isResting)
}

/**
 * Get progress toward next milestone
 * @param {number} streak
 * @returns {object} { current, next, daysLeft, percentage }
 */
export const getStreakProgress = (streak) => {
  const milestones = [1, 3, 7, 14, 21, 30, 60, 100]
  const nextMilestone = milestones.find((m) => m > streak) || streak + 10

  return {
    current: streak,
    next: nextMilestone,
    daysLeft: nextMilestone - streak,
    percentage: Math.round((streak / nextMilestone) * 100),
  }
}

/**
 * Check if today's streak hit a milestone
 * @param {number} currentStreak
 * @param {number} previousStreak
 * @returns {boolean|number} False or milestone number
 */
export const checkMilestonePassed = (currentStreak, previousStreak) => {
  const milestones = [1, 3, 7, 14, 21, 30, 60, 100]
  return milestones.find((m) => previousStreak < m && m <= currentStreak) || false
}

/**
 * Get an encouraging message when a milestone is reached
 * @param {number} milestone
 * @returns {string}
 */
export const getMilestoneMessage = (milestone) => {
  const messages = {
    1: "You planted your first seed! 🌱",
    3: "Three days of growth! 🌿",
    7: "One week of consistency! 🌳",
    14: "Two weeks strong! 🌸",
    21: "Three weeks in! 🌺",
    30: "A full month! 🌼",
    60: "Two months of dedication! 🌺",
    100: "One hundred days! You're a master gardener! 🌸",
  }
  return messages[milestone] || `${milestone} days of growth! 🌺`
}