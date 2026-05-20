// src/utils/flowerMatcher.js
// Ensures flower types are consistent across meadow and grid
// Same flower type = same visual asset everywhere

// Flower order (MUST MATCH your asset imports in GardenView.jsx)
const FLOWER_TYPES = [
  'pink-dahlia',
  'lavender-tulip',
  'mint-daisy',
  'peach-rose',
  'sunset-marigold',
  'mint-daisy',
  'pink-purple-tulip'
]

/**
 * Get flower type by index
 * Used when creating NEW wins to assign a flower type
 */
export function getFlowerTypeByIndex(index) {
  return FLOWER_TYPES[index % FLOWER_TYPES.length]
}

/**
 * Get the display name for a flower type
 */
export function getFlowerName(flowerType) {
  const names = {
    'pink-dahlia': '🌸 pink dahlia',
    'lavender-tulip': '🌷 lavender tulip',
    'mint-daisy': '🌼 mint daisy',
    'peach-rose': '🌹 peach rose',
    'sunset-marigold': '🌻 sunset marigold',
    'mint-daisy': '🌼 mint daisy',
    'pink-purple-tulip': '🌷 pink & purple tulip'
  }
  return names[flowerType] || '🌸 flower'
}

/**
 * Get the correct image/asset for a flower type
 * In your GardenView.jsx, you import:
 *   import dahliaImg from '../assets/pink_dahlia.png'
 *   import tulipImg from '../assets/Purple & Pink Tulips.png'
 *   etc...
 *
 * Then pass them as an array:
 *   flowerMatcher.setFlowerAssets([dahliaImg, tulipImg, ...])
 *
 * This way, flowerMatcher.js doesn't need to import images directly
 */
let flowerAssets = []

export function setFlowerAssets(assets) {
  flowerAssets = assets
}

export function getFlowerImage(flowerType) {
  const index = FLOWER_TYPES.indexOf(flowerType)
  if (index === -1) return flowerAssets[0]  // Default to first
  return flowerAssets[index % flowerAssets.length]
}

/**
 * Verify flower type is valid
 */
export function isValidFlowerType(flowerType) {
  return FLOWER_TYPES.includes(flowerType)
}

/**
 * Get all available flower types
 */
export function getAvailableFlowerTypes() {
  return [...FLOWER_TYPES]
}