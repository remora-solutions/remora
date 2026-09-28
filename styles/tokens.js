/* ============================================================
   REMORA — Design Tokens
   Single source of truth for colors, easing, shadows
   ============================================================ */

export const C = {
  red:    '#E5392A',
  yellow: '#F5A623',
  blue:   '#3B82C4',
  green:  '#3A8C4E',
  purple: '#7C3AED',
  dark:   '#0F172A',
  mid:    '#1E293B',
  text:   '#334155',
  gray:   '#64748B',
  muted:  '#94A3B8',
  border: '#E2E8F0',
  light:  '#F8FAFC',
  white:  '#FFFFFF',
  wa:     '#25D366',   // WhatsApp green
};

export const E = {
  expo:   'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  out:    'cubic-bezier(0, 0, 0.2, 1)',
};

export const S = {
  sm: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
  md: '0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04)',
  lg: '0 12px 40px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.05)',
  xl: '0 24px 64px rgba(15,23,42,0.12), 0 8px 24px rgba(15,23,42,0.06)',
};

/* Brand colour set used for per-industry/per-service theming */
export const PALETTE = [C.red, C.yellow, C.blue, C.green, C.purple];

/* WhatsApp link builder */
export function waLink(number, message = '') {
  const encoded = encodeURIComponent(message || "Hi Remora! I'd like to learn how you can help my business.");
  return `https://wa.me/${number}?text=${encoded}`;
}
