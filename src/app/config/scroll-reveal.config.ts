/**
 * Scroll reveal animation configuration
 * Constants used for scroll-based animations
 */
export const SCROLL_REVEAL_CONFIG = {
  // Hero section scroll progress calculation
  HERO_PROGRESS_MULTIPLIER: 0.7,
  
  // Scale animation
  SCALE_START: 0.3,
  SCALE_END: 1.0,
  
  // Opacity animation
  OPACITY_START: 0,
  OPACITY_END: 1.0,
  
  // Translation animation
  TRANSLATE_Y_MULTIPLIER: 2.0,
  TRANSLATE_X_START: 800,
  TRANSLATE_X_END: 0,
  
  // Z-index animation (keep below DNA which is at -2)
  Z_INDEX_START: -1,
  Z_INDEX_END: 0, // Changed from 1 to 0 to stay below DNA animation
} as const;
