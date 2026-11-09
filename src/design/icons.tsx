import type { CSSProperties } from 'react';

// Professional SVG icon set - UI Magic / Material style
// No emojis, pure SVG icons for professional interface

export const PATHS = {
  // Core navigation
  home: 'M12 3l-9 9h5v11h6V12h5l9-9z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 13 12.94c-3.331 0-6-2.669-6-6s2.669-6 6-6c3.331 0 6 2.669 6 6 0 .124-.01.247-.03.368L15.54 8.46l.79-.79a2.003 2.003 0 0 1 2.828 2.828l-.79.79a4.018 4.018 0 0 0-.368.03zM5.5 7A3.5 3.5 0 1 1 9 3.5a3.5 3.5 0 0 1-7 0z',
  menu: 'M3 6h18M3 10h18M3 14h18',

  // Learn (Education)
  learn: 'M12 3l8 9h-6v11H6V12z',
  book: 'M4 4h16v14H4zM6 7h4v2H6zm0 4h4v2H6zm0 4h4v2H6z',
  graduation: 'M9 7v9M12 3l5 5M12 15l-5 5M12 9v6',

  // Work (Career)
  work: 'M12 3v12M3 12h18M12 21v-9',
  briefcase: 'M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 7v8h8V7H8z',
  laptop: 'M4 4h16v14H4zM2 11h20V9H2z',
  settings: 'M12 15v3m0 0v3m0-3v-3m0-3v-3M3.343 10.74a9 9 0 1 0 12.728 0M16.121 18.278a3 3 0 1 0-4.242 0',

  // Earn (Finance/Money)
  earn: 'M12 3v12l4 4m-8-4V3h4v12l4-4',
  dollar: 'M12 3h4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4v4H8V19h-4a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h4V7m0-4h4a4 4 0 0 0 4-4V3a4 4 0 0 0-4-4h-4v4H8V3h-4a4 4 0 0 0 4 4z',
  creditCard: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM2 8h20M2 12h20M2 16h20',
  trendingUp: 'M3 12l5-5m0 0l5 5m-5-5v6M5 18h14',
  wallet: 'M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13zM21 9H13a2 2 0 0 0 0 4h8',
  coins: 'M8 16a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM15.5 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z',

  // UI Components
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zM14 5h4v14h-4z',
  check: 'M5 13l4 4L19 7',
  checkCircle: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  close: 'M6 18L18 6M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M5 10l7 7M5 10l7-7',
  upload: 'M5 4v10l7 7M5 14l7-7',
  edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
  delete: 'M19 7l-.867 5.142A2 2 0 0 1 16.13 14H4a2 2 0 0 1-1.867-3.142L5 6M6 6v12',
  filter: 'M3 7h18M3 11h18M3 15h18',
  sort: 'M3 7h6M3 11h6M3 15h6',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.36 4.73L12 17.27z',
  heart: 'M12 21.35l-1.45-6.06-11.32-.76L0 12.2l5.15-4.08L12 5l1.25 3.11 7.45 2.56L12 21.35z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  clock: 'M12 8v4l4 4M12 8V4a8 8 0 1 0 0 16z',
  bell: 'M13 10V3a4 4 0 0 0-8 0v7',
  user: 'M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a8 8 0 1 0-16 0 8 8 0 0 1 16 0zm3 6a5 5 0 0 0-10 0 5 5 0 0 1 10 0',
  users: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  messageSquare: 'M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
  link: 'M10 13a5 5 0 0 0 7.54-.54l3-3a5 5 0 0 0-7.54-7.54l-3 3a5 5 0 0 0 7.54 7.54z',
  link2: 'M13 7h-3v4H6V6h5V4a2 2 0 0 1 4 0v3h-5v4h3z',
  gitBranch: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  gitCommit: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  gitPullRequest: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  copy: 'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  fileText: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  eyeOff: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22',
  mic: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4',
  video: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16 8l-2 6-6 2 2-6z',
  key: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4',
  lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4',
  flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 13V9a5 5 0 0 1 5-5h2',
  sparkles: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0zM20 3v4M22 5h-4M4 17v2M5 18H3',
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  wand: 'M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M15 9h0M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5',

  // Direction / navigation
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M6 15l6-6 6 6',
  chevronRight: 'M9 6l6 6-6 6',
  chevronLeft: 'M15 6l-6 6 6 6',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',

  // Theme
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',

  // Social/Sharing
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
  twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 1 .08-.83A7.72 7.72 0 0 0 23 3z',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  instagram: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z',
  youtube: 'M10 15L5 9l6-6v12l6-6z',

  // Commerce/Transactions
  shoppingCart: 'M3 3h2l.9 2H7L11 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 0-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 0-2-2V5a2 2 0 0 1 2-2z',
  checkout: 'M7 3v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3h4zm10 6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v4l-3 3 3 3 3-3-3-3 3-3v4h2a2 2 0 0 1 2 2v-4a2 2 0 0 1-2-2z',
  gift: 'M10 9V3.5a2.5 2.5 0 0 1 5 0V9h-5zM16.61 13.39l-2.25 2.25a.5.5 0 0 1-.707 0l-1.22-1.22a2.5 2.5 0 0 1 3.53 3.53l1.22 1.22a.5.5 0 0 1 .707 0z',
  package: 'M17.5 4.09c-1.16.69-2.34 1.18-3.31 1.52l-3.91 1.14a2 2 0 0 0-2.09 0l-3.91-1.14a2 2 0 0 0-2.09 0l-.09-.28a2 2 0 0 1 3.99-.41l4.95 1.45c1.4-.41 2.59-.98 3.31-1.52z',

  // Miscellaneous
  info: 'M12 8v4m0 0v4m0-4v-4',
  helpCircle: 'M9.09 9a3 3 0 0 0 4.242-4.242L15 9H9l-.09.09z',
  alertTriangle: 'M7.228 13.272a3 3 0 0 1 4.242 0L12 7l-.772 3.272z',
  alertCircle: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  calendar: 'M16 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2 2V5a2 2 0 0 0 2 2z',
  archive: 'M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5zm-2 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2-2h-4a2 2 0 0 1-2-2z',
  volume2: 'M4 8.5v7a2 2 0 0 0 2 2h9.58l-1.17-.53a2.002 2.002 0 0 0-1.44-1.39l-2.16-1.07a2 2 0 0 0 0-3.08z',
  volume1: 'M4 10.5v3a2 2 0 0 0 2 2h3.58l-1.17-.53a2.002 2.002 0 0 0-1.44-1.39l-2.16-1.07a2 2 0 0 0 0-1.58z',
  volumeOff: 'M6 8.59l1.41-1.41a4.996 4.996 0 0 0 5.66 5.66l1.41 1.41A3 3 0 0 1 11 13V3h-1a2 2 0 0 0-2 2v8a4.996 4.996 0 0 0-4 4z',
  maximize2: 'M15 13h-3v3H9v6H4v-2h6v-3h3V8l3 3z',
  minimize2: 'M4 14h16v2H4z',
  externalLink: 'M15 12H9l3-3m0 0l-3 3m3 3V7a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707 1.707l-.707.707-1.414 1.415A2 2 0 0 1 12 9H3v2h9z',
};

export const SIZE = 24;
export const STROKE_WIDTH = 2;

export default PATHS;

const FALLBACK_PATH = 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z';

export interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = SIZE, strokeWidth = STROKE_WIDTH, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={PATHS[name as keyof typeof PATHS] ?? FALLBACK_PATH} />
    </svg>
  );
}