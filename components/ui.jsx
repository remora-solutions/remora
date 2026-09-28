"use client";
/* ============================================================
   REMORA — Shared UI Primitives
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import { C, E, S, waLink } from "../styles/tokens";

/* ── WHATSAPP CONFIG — change number here ── */
export const WA_NUMBER  = "919037099672";  // ← your number
export const WA_DEFAULT = "Hi Remora! I'd like to understand how you can help my business.";

/* ── useInView hook ── */
export function useInView(ref, threshold = 0.12) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref?.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return vis;
}

/* ── Reveal wrapper ── */
export function Reveal({ children, delay = 0, dir = "up", style = {}, className = "" }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  const transforms = {
    up:    "translateY(28px)",
    down:  "translateY(-28px)",
    left:  "translateX(-28px)",
    right: "translateX(28px)",
    scale: "scale(0.92)",
    none:  "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : transforms[dir] || transforms.up,
      transition: `opacity 0.7s ${E.expo} ${delay}s, transform 0.7s ${E.expo} ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>{children}</div>
  );
}

/* ── Brand bars ── */
export function BrandBars({ h = 26, w = 7, gap = 4 }) {
  return (
    <div style={{ display: "flex", gap, flexShrink: 0 }}>
      {[C.red, C.yellow, C.blue, C.green].map((c, i) => (
        <div key={i} style={{ width: w, height: h, borderRadius: w / 2, background: c }} />
      ))}
    </div>
  );
}

/* ── Section label ── */
export function Label({ text, color = C.blue }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2.5, background: color, borderRadius: 2 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "1.2px", textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

/* ── Pulse dot ── */
export function Pulse({ color, size = 8 }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size, flexShrink: 0 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, animation: "pulse-ring 1.6s ease-out infinite" }} />
      <span style={{ position: "absolute", inset: "22%", borderRadius: "50%", background: color }} />
    </span>
  );
}

/* ── WhatsApp button ── */
export function WABtn({
  text = "Chat on WhatsApp",
  size = "md",
  msg = WA_DEFAULT,
  style: extraStyle = {},
  green = false,
}) {
  const [hov, setHov] = useState(false);
  const bg = green ? C.wa : C.dark;
  const pad = size === "lg" ? "16px 32px" : size === "sm" ? "8px 16px" : "12px 24px";
  const fs  = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  return (
    <a
      href={waLink(WA_NUMBER, msg)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: bg, color: "#fff",
        borderRadius: 14, padding: pad, fontSize: fs, fontWeight: 700,
        boxShadow: hov ? `0 12px 40px ${bg}50` : `0 4px 20px ${bg}30`,
        transform: hov ? "translateY(-2px)" : "none",
        transition: `all 0.25s ${E.smooth}`,
        textDecoration: "none",
        ...extraStyle,
      }}
    >
      <svg width={fs + 4} height={fs + 4} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      {text}
    </a>
  );
}

/* ── Card ── */
export function Card({ children, accent = C.border, glow = false, hover = false, style: extra = {}, onClick }) {
  const [hov, setHov] = useState(false);
  const active = hover && hov;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: C.white,
        borderRadius: 20,
        border: `1.5px solid ${active ? accent : accent + "40"}`,
        boxShadow: glow
          ? `0 0 0 4px ${accent}18, ${S.lg}`
          : active ? `0 16px 48px ${accent}20, ${S.sm}` : S.sm,
        overflow: "hidden",
        transition: `border 0.25s ${E.smooth}, box-shadow 0.25s ${E.smooth}, transform 0.25s ${E.smooth}`,
        transform: active ? "translateY(-4px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...extra,
      }}
    >{children}</div>
  );
}

/* ── Card header bar ── */
export function CardHead({ icon, title, accent, badge, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "13px 18px",
      borderBottom: `1px solid ${accent}18`,
      background: accent + "07",
    }}>
      {icon && <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>}
      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark, flex: 1 }}>{title}</span>
      {badge && (
        <span style={{
          fontSize: 10, fontWeight: 700, color: accent,
          background: accent + "18", borderRadius: 99, padding: "3px 10px",
        }}>{badge}</span>
      )}
      {children}
    </div>
  );
}

/* ── Typewriter ── */
export function Typewriter({ text, speed = 24, onDone }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut(""); let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); onDone?.(); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span>
      {out}
      <span style={{ opacity: out.length < text.length ? 1 : 0, animation: "blink-cursor 0.7s infinite" }}>▋</span>
    </span>
  );
}

/* ── Data packet pill ── */
export function Packet({ label, color, visible, delay = 0 }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: color + "14", border: `1px solid ${color}35`,
      borderRadius: 99, padding: "4px 12px",
      fontSize: 11, fontWeight: 600, color,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(6px)",
      transition: `all 0.4s ${E.expo} ${delay}s`,
    }}>
      <Pulse color={color} size={6} />
      {label}
    </span>
  );
}

/* ── Tag chip ── */
export function Chip({ label, color }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, color,
      background: color + "12", border: `1.5px solid ${color}28`,
      borderRadius: 99, padding: "6px 16px",
      display: "inline-block", lineHeight: 1,
    }}>{label}</span>
  );
}

/* ── Step connector (vertical line) ── */
export function StepLine({ from, to, active }) {
  return (
    <div style={{
      width: 2, flex: 1, minHeight: 32,
      background: active ? `linear-gradient(to bottom, ${from}, ${to})` : C.border,
      transition: `background 0.6s ${E.smooth}`,
      margin: "3px 0",
    }} />
  );
}

/* ── Section divider ── */
export function Divider({ style = {} }) {
  return <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "0 auto", ...style }} />;
}

/* ── Counter animation ── */
export function Counter({ to, from = 0, duration = 1400, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(from);
  const raf = useRef(null);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [to, from, duration]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

