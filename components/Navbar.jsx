"use client";
import { useEffect, useState } from "react";
import { C, E } from "../styles/tokens";
import { BrandBars, WABtn } from "./ui";

const NAV_LINKS = [
  { label: "Industries",    href: "#industries"   },
  { label: "How it works",  href: "#how-it-works" },
  { label: "Capabilities",  href: "#capabilities" },
  { label: "Integrations",  href: "#integrations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 56);
      // track active section
      const sections = NAV_LINKS.map(l => document.querySelector(l.href));
      sections.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActive(NAV_LINKS[i].href);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "rgba(255,255,255,0.92)"
    : "transparent";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: navBg,
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: `background 0.4s ${E.smooth}, border 0.4s ${E.smooth}`,
      }}>
        <div style={{
          maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,40px)",
          display: "flex", alignItems: "center", height: 68, gap: 40,
        }}>
          {/* Logo */}
          <a href="/" style={{
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none", flexShrink: 0,
          }}>
            <BrandBars h={24} w={6} gap={3} />
            <span style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: "-0.3px" }}>Remora</span>
          </a>

          {/* Desktop links */}
          <div style={{
            display: "flex", gap: 4, marginLeft: "auto",
            "@media(max-width:768px)": { display: "none" },
          }} className="hide-mobile">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <a key={href} href={href} style={{
                  fontSize: 13, fontWeight: 600,
                  color: isActive ? C.dark : C.gray,
                  padding: "8px 14px", borderRadius: 10,
                  background: isActive ? C.light : "transparent",
                  transition: `all 0.2s ${E.smooth}`,
                  textDecoration: "none",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = C.dark; e.currentTarget.style.background = C.light; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = C.gray; e.currentTarget.style.background = "transparent"; }}}
                >{label}</a>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ marginLeft: 8, flexShrink: 0 }} className="hide-mobile">
            <WABtn text="WhatsApp us" size="sm" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              marginLeft: "auto", width: 40, height: 40,
              borderRadius: 10, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 5,
              background: menuOpen ? C.light : "transparent",
              border: `1.5px solid ${C.border}`,
              transition: "background 0.2s",
            }}
          >
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: i === 1 ? 14 : 20, height: 1.5,
                background: C.dark, borderRadius: 1,
                transition: "width 0.2s",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${C.border}`,
            padding: "16px 24px 24px",
            animation: "fadeUp 0.2s ease",
          }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", padding: "13px 0",
                  fontSize: 15, fontWeight: 600, color: C.dark,
                  borderBottom: `1px solid ${C.border}`,
                  textDecoration: "none",
                }}>{label}</a>
            ))}
            <div style={{ marginTop: 20 }}>
              <WABtn text="Chat on WhatsApp" size="md" style={{ width: "100%", justifyContent: "center" }} />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

