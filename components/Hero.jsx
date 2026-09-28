"use client";
import { useEffect, useRef, useState } from "react";
import { C, E } from "../styles/tokens";
import { BrandBars, WABtn, Reveal, Chip } from "./ui";

const SERVICES = [
  ["Odoo ERP", C.red], ["Voice AI", C.blue], ["RAG", C.green],
  ["AI Chatbot", C.yellow], ["Automation", C.purple], ["WhatsApp ERP", C.green],
  ["eCommerce", C.blue], ["MCP Agents", C.red], ["Email Integration", C.purple],
];

const STATS = [
  { value: "0", label: "Manual data entry", accent: C.green },
  { value: "24/7", label: "System uptime", accent: C.blue },
  { value: "100%", label: "Custom built", accent: C.red },
  { value: "6+", label: "Industries served", accent: C.purple },
];

/* Animated connection lines SVG */
function ConnectionWeb() {
  const nodes = [
    { x: 12,  y: 20, label: "ERP",        color: C.red    },
    { x: 88,  y: 20, label: "Voice AI",   color: C.blue   },
    { x: 12,  y: 80, label: "RAG",        color: C.green  },
    { x: 88,  y: 80, label: "Automation", color: C.purple },
    { x: 50,  y: 50, label: "Remora",     color: C.dark   },
  ];
  const edges = [[0,4],[1,4],[2,4],[3,4],[0,1],[2,3]];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
        style={{ opacity: 0.06 }}>
        {edges.map(([a,b], i) => (
          <line key={i}
            x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
            x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
            stroke={C.dark} strokeWidth="0.3"
            strokeDasharray="2 1"
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100svh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px clamp(20px,4vw,40px) 100px",
      background: C.white,
      overflow: "hidden",
      textAlign: "center",
    }}>

      {/* Ambient gradient blobs */}
      {[
        { color: C.red,    top: "-5%",  left: "-8%",  size: 500 },
        { color: C.blue,   top: "5%",   right: "-5%", size: 420 },
        { color: C.green,  bottom: "5%",left: "-3%",  size: 380 },
        { color: C.yellow, bottom: "0%",right: "-2%", size: 440 },
        { color: C.purple, top: "40%",  left: "38%",  size: 360 },
      ].map(({ color, size, ...pos }, i) => (
        <div key={i} style={{
          position: "absolute", width: size, height: size,
          borderRadius: "50%", pointerEvents: "none",
          background: `radial-gradient(circle, ${color}09 0%, transparent 68%)`,
          ...pos,
          animation: `float-slow ${6 + i * 1.4}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}

      <ConnectionWeb />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>

        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: C.light, border: `1.5px solid ${C.border}`,
          borderRadius: 99, padding: "7px 18px", marginBottom: 32,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(12px)",
          transition: `all 0.6s ${E.expo} 0.1s`,
        }}>
          <BrandBars h={14} w={4} gap={3} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.gray, letterSpacing: "0.4px" }}>
            Custom AI + ERP for SMBs — India &amp; GCC
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 6.5vw, 72px)",
          fontWeight: 900, color: C.dark,
          lineHeight: 1.05, letterSpacing: "-1.5px",
          marginBottom: 24,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(20px)",
          transition: `all 0.7s ${E.expo} 0.18s`,
        }}>
          One backbone<br />
          <span style={{
            background: `linear-gradient(135deg, ${C.red} 0%, ${C.purple} 50%, ${C.blue} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>for every part</span><br />
          of your business.
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)", color: C.gray,
          maxWidth: 560, margin: "0 auto 40px",
          lineHeight: 1.8, fontWeight: 400,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(16px)",
          transition: `all 0.7s ${E.expo} 0.26s`,
        }}>
          Remora connects Odoo ERP, automation, voice AI, RAG and chatbots into a single 
          custom system — built specifically for clinics, law firms, manufacturers, traders, 
          builders and any business that runs on data.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 64,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(14px)",
          transition: `all 0.7s ${E.expo} 0.34s`,
        }}>
          <WABtn text="Talk to us on WhatsApp" size="lg" green />
          <a href="#how-it-works" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 28px", borderRadius: 14,
            border: `2px solid ${C.border}`, color: C.text,
            fontSize: 15, fontWeight: 600,
            transition: `all 0.2s ${E.smooth}`,
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.dark; e.currentTarget.style.color = C.dark; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
          >
            See how it works
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1, borderRadius: 20, overflow: "hidden",
          border: `1.5px solid ${C.border}`,
          background: C.border,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(12px)",
          transition: `all 0.7s ${E.expo} 0.44s`,
          maxWidth: 640, margin: "0 auto 56px",
        }}>
          {STATS.map(({ value, label, accent }) => (
            <div key={label} style={{
              background: C.white, padding: "20px 16px", textAlign: "center",
            }}>
              <div style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: accent, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Service chips */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
          opacity: mounted ? 1 : 0,
          transition: `opacity 0.7s ${E.expo} 0.52s`,
        }}>
          {SERVICES.map(([label, color]) => <Chip key={label} label={label} color={color} />)}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: mounted ? 0.5 : 0, transition: `opacity 1s ${E.expo} 1.2s`,
      }}>
        <span style={{ fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: 1.5, height: 40,
          background: `linear-gradient(to bottom, ${C.muted}, transparent)`,
          animation: "float-slow 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

