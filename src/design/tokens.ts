export const COLORS = {
  // Learn (teal)
  learn: '#2fd4a3',
  learnDark: '#1a9c6e',
  learnLight: '#d4f8eb',
  // Work (indigo)
  work: '#7c8cff',
  workDark: '#5a6be0',
  workLight: '#e2e6ff',
  // Earn (amber)
  earn: '#ffc861',
  earnDark: '#e0a23e',
  earnLight: '#fff3d6',
  // Udemy-aligned accents
  violet: '#a435f0',
  indigo: '#4435bb',
  flamingo: '#f4522d',
  easternBlue: '#199fa3',
  california: '#f69c08',
  // Neutral
  ink: '#07090f',
  ink80: 'rgba(7,9,15,0.8)',
  ink60: 'rgba(7,9,15,0.6)',
  ink40: 'rgba(7,9,15,0.4)',
  ink20: 'rgba(7,9,15,0.2)',
  ink10: 'rgba(7,9,15,0.1)',
  ink5: 'rgba(7,9,15,0.05)',
  white: '#ffffff',
  offWhite: '#f8f9fa',
  lightGray: '#f1f3f5',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#868e96',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
  // Semantic
  success: '#2fd4a3',
  warning: '#ffc861',
  danger: '#f4522d',
  info: '#7c8cff',
};

export const GRADIENTS = {
  learn: 'linear-gradient(135deg, #2fd4a3 0%, #1a9c6e 100%)',
  work: 'linear-gradient(135deg, #7c8cff 0%, #5a6be0 100%)',
  earn: 'linear-gradient(135deg, #ffc861 0%, #e0a23e 100%)',
  hero: 'linear-gradient(135deg, #07090f 0%, #1a1f2e 50%, #07090f 100%)',
  card: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
  brand: 'linear-gradient(90deg, #2fd4a3 0%, #7c8cff 50%, #ffc861 100%)',
};

export const RADIUS = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export const FONT = {
  family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weights: {
    thin: 300,
    light: 400,
    regular: 500,
    medium: 600,
    semibold: 700,
    bold: 800,
  },
};

export const tabPalette = {
  learn: COLORS.learn,
  work: COLORS.work,
  earn: COLORS.earn,
};

export const ANIMATION = {
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const SHADOWS = {
  sm: '0 1px 2px rgba(7,9,15,0.06)',
  md: '0 4px 12px rgba(7,9,15,0.08)',
  lg: '0 8px 24px rgba(7,9,15,0.12)',
  xl: '0 16px 48px rgba(7,9,15,0.16)',
};

export const DESIGN_TOKENS = {
  COLORS,
  GRADIENTS,
  RADIUS,
  SPACING,
  FONT,
  tabPalette,
  ANIMATION,
  SHADOWS,
};

export default DESIGN_TOKENS;
