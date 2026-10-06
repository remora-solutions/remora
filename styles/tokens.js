/* ============================================================
   REMORA — Design Tokens
   Single source of truth for colors, easing, shadows, spacing.

   Everything that existed before is unchanged — same names,
   same values. Everything below "NEW" is additive, so nothing
   that already imports from this file will break.
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

  /* ── NEW: one accent for every interactive element ──
     Buttons, links, active nav state, focus rings — all of it.
     Keep red/yellow/green/purple for the product itself (the
     live demo, integration logos) — not for UI chrome. */
  accent:     '#3B82C4',   // = C.blue, named for its job
  accentSoft: '#3B82C415', // accent at low opacity, for tints/backgrounds
  accentDark: '#2E6CA3',   // accent hover/pressed state

  /* ── NEW: warm page background, separate from card white ──
     Use `bg` behind sections; let cards stay `white` on top
     of it. This is what makes a page feel soft instead of
     stark — white-on-white has no depth. */
  bg:     '#FAFAFC',
  bgAlt:  '#F4F6F9',
};

export const E = {
  expo:   'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  out:    'cubic-bezier(0, 0, 0.2, 1)',

  /* ── NEW: the "house" curve ──
     Use E.house anywhere you'd have reached for expo/smooth/
     spring inconsistently. One curve, used everywhere, is what
     makes motion feel designed rather than assembled. Reserve
     E.spring only for small playful pops (icons, badges) —
     never for page-level reveals or hovers. */
  house: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

/* ── NEW: ready-made transition strings ──
   Import T and use these directly instead of writing a new
   `all 0.Xs <curve>` string in every component. Consistent
   duration + consistent curve = the site reads as one piece. */
export const T = {
  fast: `all 0.2s ${E.house}`,
  base: `all 0.3s ${E.house}`,
  slow: `all 0.6s ${E.house}`,
};

/* ── NEW: radius scale ──
   Pick from these instead of inventing a number per component.
   Softer corners read as approachable; keep them consistent
   across buttons, cards, and tiles. */
export const R = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  pill: 999,
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
