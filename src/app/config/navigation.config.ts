/**
 * Navigation configuration
 * Centralized section IDs for navigation and intersection observer
 */
export const NAVIGATION_SECTIONS = [
  'hero',
  'home',
  'how-it-works',
  'about-app',
  'app-showcase',
  'statistics',
  'problem-mission',
  'testimonials',
  'faq',
  'newsletter',
  'cta-banner',
] as const;

export type SectionId = typeof NAVIGATION_SECTIONS[number];
