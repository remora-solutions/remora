"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { C, E } from "../styles/tokens";

/* ============================================================
   REMORA — How it works
   Live demo player: 5 workflows, auto-playing, tabbed.
   - Time-driven (no scroll-jacking) → never blank on mobile
   - Layout is reserved up-front → no jumping while it plays
   - Desktop: auto-advances, pauses on hover
   - Mobile: plays once per demo, "Next demo" button, no auto-jump
   - Respects prefers-reduced-motion (shows finished state)
   Only depends on C and E from ../styles/tokens.
   ============================================================ */

const EXPO   = (E && E.expo)   || "cubic-bezier(0.16,1,0.3,1)";
const SPRING = (E && E.spring) || "cubic-bezier(0.34,1.56,0.64,1)";
const SMOOTH = (E && E.smooth) || "cubic-bezier(0.4,0,0.2,1)";
const SH = "0 1px 4px rgba(15,23,42,0.06)";
const HOLD = 3200; // ms to rest on the finished state before auto-advancing (desktop)

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const inr = (n) => {
  const s = String(Math.round(n));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return "₹" + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "") + last3;
};

/* ── Styles: layout, keyframes, responsive rules ── */
const CSS = `
.hw-wrap{max-width:1120px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
.hw-tabs{position:relative;display:flex;gap:8px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.hw-tabs::-webkit-scrollbar{display:none}
.hw-tab{position:relative;flex:1 1 0;min-width:max-content;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 18px;border-radius:14px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-family:inherit;font-size:13.5px;font-weight:700;color:#64748b;overflow:hidden;white-space:nowrap;transition:background .3s,border-color .3s,color .3s,transform .2s}
.hw-tab:hover{transform:translateY(-1px)}
.hw-tab:focus-visible,.hw-btn:focus-visible,.hw-pill:focus-visible{outline:2px solid #3b82f6;outline-offset:2px}
.hw-stage{margin-top:14px;border:1.5px solid;border-radius:26px;padding:clamp(16px,3vw,34px);box-shadow:0 20px 60px rgba(15,23,42,.06);transition:border-color .5s,background .5s}
.hw-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:clamp(16px,3vw,28px)}
.hw-btn{width:38px;height:38px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;color:#0f172a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,background .2s}
.hw-btn:hover{background:#f1f5f9;transform:translateY(-1px)}
.hw-scene{animation:hw-in .6s cubic-bezier(.16,1,.3,1) both}
.hw-scene-head{text-align:center;margin-bottom:clamp(22px,4vw,40px)}
.hw-col{display:flex;flex-direction:column;gap:14px;min-width:0}
.hw-g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:start}
.hw-gv{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:24px;align-items:start}
.hw-gr{display:grid;grid-template-columns:minmax(0,290px) minmax(0,1fr);gap:24px;align-items:start}
.hw-g-erp{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:32px;align-items:start}
.hw-kpis{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}
.hw-foot{display:none;gap:10px;margin-top:22px}
.hw-pill{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 16px;border-radius:14px;border:1.5px solid #e2e8f0;background:#fff;color:#0f172a;font-family:inherit;font-size:13.5px;font-weight:700;cursor:pointer}
.hw-dots{display:inline-flex;align-items:center;height:14px}
.hw-dots span{width:6px;height:6px;margin:0 2px;border-radius:50%;background:#94a3b8;display:inline-block;animation:hw-dot 1s infinite ease-in-out}
.hw-dots span:nth-child(2){animation-delay:.15s}
.hw-dots span:nth-child(3){animation-delay:.3s}
.hw-caret{display:inline-block;width:2px;height:1em;background:currentColor;margin-left:1px;vertical-align:-2px;animation:hw-blink 1s steps(1) infinite}
.hw-pop{animation:hw-pop .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes hw-in{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
@keyframes hw-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.6);opacity:0}}
@keyframes hw-mic{0%{transform:scale(.9);opacity:.6}100%{transform:scale(1.3);opacity:0}}
@keyframes hw-bar{from{transform:scaleY(.35)}to{transform:scaleY(1)}}
@keyframes hw-dot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}
@keyframes hw-blink{50%{opacity:0}}
@keyframes hw-pop{0%{transform:scale(.85);opacity:.3}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}
@media(max-width:820px){
  .hw-g2,.hw-gv,.hw-gr,.hw-g-erp{grid-template-columns:minmax(0,1fr);gap:16px}
  .hw-foot{display:flex}
  .hw-tab{padding:12px 15px;font-size:13px}
  .hw-stage{border-radius:20px}
}
@media(prefers-reduced-motion:reduce){.hw-scene,.hw-anim,.hw-pop,.hw-dots span,.hw-caret{animation:none!important}}
`;

/* ── Small building blocks ── */
const Ico = {
  play:   <path d="M8 5v14l11-7z" fill="currentColor" />,
  pause:  <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />,
  replay: <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor" />,
  prev:   <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  next:   <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
};
function Icon({ name, size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{Ico[name]}</svg>;
}

function Label({ text, color }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 13px", borderRadius: 99,
      background: color + "12", border: `1px solid ${color}30`, color,
      fontSize: 11, fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 14,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {text}
    </div>
  );
}

function Card({ accent, glow = false, children, style }) {
  const a = accent || C.border;
  return (
    <div style={{
      background: C.white, borderRadius: 18, border: `1.5px solid ${a}30`, minWidth: 0,
      boxShadow: glow ? `0 0 0 4px ${a}12, 0 12px 40px ${a}22` : "0 6px 24px rgba(15,23,42,0.06)",
      transition: `box-shadow 0.6s ${SMOOTH}`,
      ...style,
    }}>{children}</div>
  );
}

function CardHead({ icon, title, accent, badge }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "13px 16px",
      background: accent + "0d", borderBottom: `1px solid ${accent}20`,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 700, color: C.dark, lineHeight: 1.35 }}>{title}</span>
      {badge && (
        <span style={{
          fontSize: 10, fontWeight: 700, color: accent, background: accent + "14",
          borderRadius: 99, padding: "3px 10px", whiteSpace: "nowrap", flexShrink: 0,
        }}>{badge}</span>
      )}
    </div>
  );
}

function Pulse({ color, size = 9 }) {
  return (
    <span style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "inline-block" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
      <span className="hw-anim" style={{
        position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.5,
        animation: "hw-ring 1.8s ease-out infinite",
      }} />
    </span>
  );
}

function StepLine({ from, to, active }) {
  return (
    <div style={{ width: 3, flex: 1, minHeight: 22, margin: "4px 0", borderRadius: 2, background: C.border, overflow: "hidden" }}>
      <div style={{
        width: "100%", height: active ? "100%" : "0%",
        background: `linear-gradient(${from}, ${to})`, transition: `height 0.7s ${EXPO}`,
      }} />
    </div>
  );
}

function Packet({ color, label, show }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color,
      background: color + "12", border: `1px solid ${color}30`, borderRadius: 99, padding: "4px 11px",
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(6px)", transition: `all .5s ${EXPO}`,
    }}>
      <Pulse color={color} size={7} />{label}
    </span>
  );
}

/* Types text based on progress p (deterministic, replayable). Space is reserved. */
function Typed({ text, p, from, to }) {
  const t = clamp01((p - from) / (to - from));
  const n = Math.floor(text.length * t);
  return (
    <>
      {text.slice(0, n)}
      {t > 0 && t < 1 && <span className="hw-caret" />}
      <span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </>
  );
}

function Banner({ show, color, title, text, style }) {
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 14,
      background: `linear-gradient(135deg, ${color}12, ${C.blue}08)`, border: `1.5px solid ${color}30`,
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px)", transition: `all .55s ${EXPO}`,
      ...style,
    }}>
      <div style={{ fontSize: 13, fontWeight: 800, color, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function Kpi({ label, value, color, pop = true }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: 12, background: color + "0a", border: `1px solid ${color}22`, minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div key={pop ? String(value) : "static"} className={pop ? "hw-pop" : undefined}
        style={{ fontSize: 19, fontWeight: 900, color, letterSpacing: "-0.5px", wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

/* Chat message. Space is always reserved; it fades in when `show`. Bot messages show typing dots first. */
function Msg({ mine, show, typing, bg, fg, border, avatar, source, srcColor, children }) {
  const radius = mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px";
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", alignItems: "flex-start", gap: 8 }}>
      {!mine && avatar && (
        <div style={{ opacity: show || typing ? 1 : 0, transition: "opacity .3s", marginTop: 2, flexShrink: 0 }}>{avatar}</div>
      )}
      <div style={{ position: "relative", maxWidth: "88%", minWidth: 0 }}>
        <div style={{
          padding: "10px 14px", borderRadius: radius, background: bg, color: fg || C.dark, border: border || "none",
          fontSize: 13, lineHeight: 1.65, boxShadow: SH, whiteSpace: "pre-line", wordBreak: "break-word",
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px) scale(0.97)", transition: `all .45s ${EXPO}`,
        }}>
          {children}
          {source && (
            <span style={{
              display: "block", whiteSpace: "normal", marginTop: 9, fontSize: 11, fontWeight: 700,
              color: srcColor, background: srcColor + "12", borderRadius: 8, padding: "5px 9px",
            }}>📄 Source: {source}</span>
          )}
        </div>
        {!mine && (
          <div style={{
            position: "absolute", left: 0, top: 0, padding: "12px 14px", borderRadius: radius,
            background: bg, border: border || "none", boxShadow: SH,
            opacity: typing ? 1 : 0, transition: "opacity .25s", pointerEvents: "none",
          }}>
            <span className="hw-dots"><span /><span /><span /></span>
          </div>
        )}
      </div>
    </div>
  );
}

/* Vertical timeline used by ERP + Automation scenes */
function Timeline({ steps, size = 50 }) {
  return (
    <div style={{ minWidth: 0 }}>
      {steps.map((s, i) => {
        const nxt = steps[i + 1];
        return (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: size, flexShrink: 0 }}>
              <div style={{
                width: size, height: size, borderRadius: "50%", flexShrink: 0,
                background: s.show ? s.color + "14" : C.light,
                border: `2px solid ${s.show ? s.color : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(size * 0.44),
                opacity: s.show ? 1 : 0.4, transform: s.show ? "scale(1)" : "scale(0.8)",
                transition: `all .55s ${SPRING}`,
                boxShadow: s.show ? `0 0 0 6px ${s.color}10` : "none",
              }}>{s.icon}</div>
              {nxt && <StepLine from={s.color} to={nxt.color} active={s.show && nxt.show} />}
            </div>
            <div style={{
              flex: 1, minWidth: 0, paddingBottom: nxt ? 22 : 0,
              opacity: s.show ? 1 : 0.35, transform: s.show ? "none" : "translateX(-10px)",
              transition: `all .5s ${EXPO}`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.show ? s.color : C.muted, marginBottom: 4, transition: "color .4s" }}>{s.label}</div>
              <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>{s.detail}</div>
              {s.extra}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   SCENE 1 — ERP order cycle
   ============================================================ */
function SceneERP({ p }) {
  const steps = [
    { show: p > 0.04, icon: "🛒", label: "Order placed", color: C.blue,
      detail: "Customer orders via website, WhatsApp, counter, or phone. Remora captures all channels into a single queue." },
    { show: p > 0.22, icon: "⚙️", label: "Odoo processes", color: C.red,
      detail: "Sales Order auto-created. Warehouse routing logic runs — picks the right warehouse, assigns the delivery route." },
    { show: p > 0.40, icon: "📦", label: "Stock reserved", color: C.yellow,
      detail: "Inventory deducted in real time. If stock falls below threshold — Purchase Order auto-raised to supplier.",
      extra: <div style={{ marginTop: 8 }}><Packet color={C.yellow} label="PO raised to supplier" show={p > 0.44} /></div> },
    { show: p > 0.58, icon: "🚚", label: "Delivery scheduled", color: C.green,
      detail: "Delivery order created, driver assigned and notified via WhatsApp with route details and pickup time." },
    { show: p > 0.74, icon: "🧾", label: "Invoice auto-generated", color: C.purple,
      detail: "GST-compliant PDF invoice generated. Emailed to customer. WhatsApp receipt sent instantly. Accounts updated." },
    { show: p > 0.88, icon: "📊", label: "Dashboard updated", color: C.blue,
      detail: "Revenue, pending orders, top SKUs, margins — all live in Odoo dashboard. No end-of-day data entry." },
  ];

  const orders = p > 0.22 ? 42 : 41;
  const pending = p > 0.58 ? 7 : 6;
  const revenue = 184200 + 27600 * clamp01((p - 0.74) / 0.14);
  const valve = p > 0.40 ? "130 units" : "180 units";

  const feed = [
    { show: p > 0.22, icon: "📋", text: "Sales Order SO-3291 created", color: C.red },
    { show: p > 0.58, icon: "🚚", text: "Delivery DO-1187 scheduled", color: C.green },
    { show: p > 0.74, icon: "🧾", text: "Invoice INV-5520 emailed", color: C.purple },
  ];

  return (
    <div>
      <div className="hw-g-erp">
        <Timeline steps={steps} />
        <div className="hw-col">
          <Card accent={C.red} glow={p > 0.88}>
            <CardHead icon="📊" title="Odoo dashboard — live" accent={C.red} badge={p > 0.04 ? "Live ●" : "Idle"} />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="hw-kpis">
                <Kpi label="Orders today" value={orders} color={C.blue} />
                <Kpi label="Pending deliveries" value={pending} color={C.green} />
                <Kpi label="Revenue today" value={inr(revenue)} color={C.purple} pop={false} />
                <Kpi label="Valve-A stock" value={valve} color={C.yellow} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: ".5px", textTransform: "uppercase" }}>Latest activity</div>
                {feed.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10,
                    background: f.show ? f.color + "0a" : C.light, border: `1px solid ${f.show ? f.color + "28" : C.border}`,
                    opacity: f.show ? 1 : 0.4, transform: f.show ? "none" : "translateX(10px)", transition: `all .5s ${EXPO}`,
                  }}>
                    <span style={{ fontSize: 15 }}>{f.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: f.show ? C.dark : C.muted, lineHeight: 1.4 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div style={{ fontSize: 10.5, color: C.muted, textAlign: "center" }}>Illustrative demo data</div>
        </div>
      </div>
      <Banner show={p > 0.94} color={C.green} style={{ marginTop: 22 }}
        title="✓ Order to dashboard — no end-of-day data entry."
        text="Every step from the customer's click to the live revenue number is handled by Remora inside Odoo." />
    </div>
  );
}

/* ============================================================
   SCENE 2 — WhatsApp → ERP
   ============================================================ */
function SceneWhatsApp({ p }) {
  const typ = (s) => p > s - 0.07 && p <= s;
  const msgs = [
    { mine: true,  at: 0.08, text: "Hi, need 50 Valve-A and 20 Pipe-B. Urgent delivery please" },
    { mine: false, at: 0.22, text: "Got it! Checking stock availability for your order..." },
    { mine: false, at: 0.36, text: "✅ Stock confirmed.\n50 × Valve-A (₹320 each)\n20 × Pipe-B (₹580 each)\nTotal: ₹27,600\n\nConfirm order?" },
    { mine: true,  at: 0.50, text: "Yes confirm" },
    { mine: false, at: 0.66, text: "✅ Order #SO-3291 created in our system.\n📄 Invoice sent to your email.\n🚚 Expected dispatch: Tomorrow 10 AM\n\nThank you!" },
  ];
  const erpSteps = [
    { show: p > 0.50, color: C.green,  label: "Sales Order SO-3291 created in Odoo" },
    { show: p > 0.60, color: C.blue,   label: "Stock reserved: 50 × Valve-A, 20 × Pipe-B" },
    { show: p > 0.70, color: C.yellow, label: "Picking list → Warehouse team notified" },
    { show: p > 0.80, color: C.red,    label: "Invoice PDF generated, email sent" },
    { show: p > 0.90, color: C.purple, label: "Accounts updated, delivery scheduled" },
  ];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <div className="hw-g2">
        <Card accent={C.green} style={{ overflow: "hidden" }}>
          <div style={{ background: "#075E54", padding: "13px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", background: "#128C7E",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
            }}>🤖</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Remora Business Bot</div>
              <div style={{ fontSize: 11, color: "#a7f3d0" }}>● online · typically replies instantly</div>
            </div>
          </div>
          <div style={{ background: "#ECE5DD", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <Msg key={i} mine={m.mine} show={p > m.at} typing={!m.mine && typ(m.at)}
                bg={m.mine ? "#DCF8C6" : "#fff"}>{m.text}</Msg>
            ))}
          </div>
        </Card>

        <div className="hw-col" style={{ gap: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Odoo ERP — live updates</div>
          {erpSteps.map(({ show, color, label }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14,
              background: show ? color + "0c" : C.light, border: `1.5px solid ${show ? color + "40" : C.border}`,
              opacity: show ? 1 : 0.4, transform: show ? "none" : "translateX(10px)",
              transition: `all .5s ${EXPO}`,
            }}>
              <Pulse color={show ? color : C.muted} size={9} />
              <span style={{ fontSize: 12.5, color: show ? C.dark : C.muted, fontWeight: show ? 600 : 400, lineHeight: 1.5 }}>{label}</span>
            </div>
          ))}
          <Banner show={p > 0.92} color={C.green} title="✓ 0 humans involved"
            text="From WhatsApp message to dispatched order — fully automated by Remora." />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SCENE 3 — Voice AI + CRM
   ============================================================ */
const TRANSCRIPT = "“Spoke with Ahmed from Gulf Traders. They want the full warehouse module, 8 users. Around 6.4 lakhs. Send them a demo on Monday morning. Mark as qualified, assign to Priya.”";
const WAVE = [0.5, 0.9, 0.6, 1, 0.4, 0.8, 0.7, 0.5, 1, 0.6, 0.8, 0.4, 0.9, 0.5];

function SceneVoice({ p }) {
  const listening = p > 0.12 && p < 0.52;
  const crmRows = [
    { field: "Lead status",    before: "New",        after: "Qualified",                  color: C.blue,   show: p > 0.60 },
    { field: "Company",        before: "—",          after: "Gulf Traders",               color: C.dark,   show: p > 0.63 },
    { field: "Contact",        before: "—",          after: "Ahmed Al-Harbi",             color: C.dark,   show: p > 0.66 },
    { field: "Deal value",     before: "—",          after: "₹6,40,000",                  color: C.green,  show: p > 0.70 },
    { field: "Product",        before: "—",          after: "Warehouse Module (8 users)", color: C.text,   show: p > 0.73 },
    { field: "Next action",    before: "—",          after: "Send demo",                  color: C.yellow, show: p > 0.77 },
    { field: "Follow-up date", before: "—",          after: "Monday 11 AM",               color: C.purple, show: p > 0.80 },
    { field: "Assigned to",    before: "Unassigned", after: "Priya (Sales)",              color: C.red,    show: p > 0.84 },
  ];
  const nlp = [
    ["Contact",   "Ahmed Al-Harbi",     C.blue],
    ["Company",   "Gulf Traders",       C.dark],
    ["Product",   "Warehouse Module x8", C.purple],
    ["Value",     "₹6,40,000",          C.green],
    ["Action",    "Demo → Monday AM",   C.yellow],
    ["Assign to", "Priya (Sales)",      C.red],
  ];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <div className="hw-gv">
        <div className="hw-col">
          <Card accent={C.blue} style={{ overflow: "hidden" }}>
            <CardHead icon="🎤" title="Sales Rep — Voice Input" accent={C.blue} badge={p > 0.12 ? (listening ? "Listening..." : "Captured") : "Ready"} />
            <div style={{ padding: "26px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <div style={{ position: "relative", width: 68, height: 68 }}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="hw-anim" style={{
                    position: "absolute", inset: -(n * 9), borderRadius: "50%", border: `1.5px solid ${C.blue}`, opacity: 0,
                    animation: listening ? `hw-mic 1.8s ease-out ${n * 0.45}s infinite` : "none",
                  }} />
                ))}
                <div style={{
                  position: "relative", width: 68, height: 68, borderRadius: "50%",
                  background: p > 0.12 ? C.blue : C.light, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 30, transition: `background .4s ${SMOOTH}`,
                  boxShadow: p > 0.12 ? `0 8px 32px ${C.blue}30` : "none",
                }}>🎤</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28, opacity: listening ? 1 : 0.25, transition: "opacity .4s" }}>
                {WAVE.map((h, i) => (
                  <div key={i} className="hw-anim" style={{
                    width: 4, height: Math.round(h * 28), borderRadius: 2, background: C.blue + "cc", transformOrigin: "bottom",
                    animation: listening ? `hw-bar ${0.45 + ((i * 37) % 40) / 100}s ease-in-out ${i * 0.04}s infinite alternate` : "none",
                  }} />
                ))}
              </div>
            </div>
          </Card>

          <Card accent={C.muted} style={{
            opacity: p > 0.28 ? 1 : 0, transform: p > 0.28 ? "none" : "translateY(12px)", transition: `all .5s ${EXPO}`,
          }}>
            <CardHead icon="📝" title="Transcribed" accent={C.muted} badge="Whisper AI" />
            <div style={{ padding: "14px 16px" }}>
              <p style={{
                fontSize: 12.5, color: C.text, lineHeight: 1.85, fontStyle: "italic",
                background: C.light, borderRadius: 10, padding: "12px 14px", margin: 0,
              }}>
                <Typed text={TRANSCRIPT} p={p} from={0.28} to={0.50} />
              </p>
            </div>
          </Card>

          <Card accent={C.purple} style={{
            opacity: p > 0.52 ? 1 : 0, transform: p > 0.52 ? "none" : "translateY(12px)", transition: `all .5s ${EXPO}`,
          }}>
            <CardHead icon="🧠" title="AI intent extraction" accent={C.purple} badge="Parsed" />
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {nlp.map(([k, v, c]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: C.muted, width: 64, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c, background: c + "12", borderRadius: 8, padding: "2px 10px" }}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card accent={C.green} glow={p > 0.60}>
          <CardHead icon="📊" title="Odoo CRM — auto updated" accent={C.green} badge={p > 0.60 ? "Live sync ●" : "Waiting..."} />
          <div style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {crmRows.map(({ field, before, after, color, show }) => (
                <div key={field} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 11 }}>
                  <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, fontWeight: 700, letterSpacing: ".5px" }}>{field.toUpperCase()}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12.5, color: C.muted, textDecoration: show ? "line-through" : "none", transition: "all .4s" }}>{before}</span>
                    <span style={{ fontSize: 12, color: C.muted }}>→</span>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color, background: color + "12", borderRadius: 8, padding: "3px 12px",
                      opacity: show ? 1 : 0, transform: show ? "none" : "translateX(-10px)", transition: `all .5s ${EXPO}`,
                      display: "inline-block",
                    }}>{after}</span>
                  </div>
                </div>
              ))}
            </div>
            <Banner show={p > 0.90} color={C.green} style={{ marginTop: 16 }}
              title="✓ Zero typing. Zero forms. Done."
              text="Sales rep spoke for 40 seconds. CRM is fully updated, follow-up scheduled, and Priya gets a push notification." />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   SCENE 4 — RAG + chatbot
   ============================================================ */
function SceneRAG({ p }) {
  const typ = (s) => p > s - 0.07 && p <= s;
  const docs = [
    { name: "Legal SOP v4.pdf",           tag: "Law",     color: C.purple },
    { name: "Product Catalogue 2025.pdf", tag: "Sales",   color: C.red },
    { name: "GCC Pricing — KSA.xlsx",     tag: "Pricing", color: C.green },
    { name: "Clinic Treatment SOPs.pdf",  tag: "Medical", color: C.blue },
    { name: "Warranty & Returns.docx",    tag: "Support", color: C.yellow },
    { name: "HR Policy Manual.pdf",       tag: "HR",      color: C.purple },
  ];
  const chat = [
    { mine: true,  at: 0.38, text: "What's our return policy for industrial fittings?" },
    { mine: false, at: 0.56, source: "Warranty & Returns.docx, p.3", srcColor: C.yellow,
      text: "Based on your Warranty doc: Industrial fittings can be returned within 15 days if unused and in original packaging. Damaged items must be reported within 48 hrs of delivery." },
    { mine: true,  at: 0.70, text: "Is there a volume discount for 100+ units from Saudi customers?" },
    { mine: false, at: 0.84, source: "GCC Pricing — KSA.xlsx, Tab 3", srcColor: C.green,
      text: "Yes — your GCC Pricing sheet shows 12% volume discount for 100+ units, Saudi accounts. SAR pricing applies with VAT included." },
  ];
  const cited = (name) =>
    (name === "Warranty & Returns.docx" && p > 0.52 && p <= 0.72) ||
    (name === "GCC Pricing — KSA.xlsx" && p > 0.80);
  const idxBar = clamp01((p - 0.10) / 0.16);

  const avatar = (
    <div style={{
      width: 28, height: 28, borderRadius: "50%", background: C.dark, display: "flex",
      alignItems: "center", justifyContent: "center", fontSize: 14,
    }}>🤖</div>
  );

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <div className="hw-gr">
        <div className="hw-col" style={{ gap: 10 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.dark, marginBottom: 2 }}>Your business documents</div>
          {docs.map(({ name, tag, color }, i) => {
            const on = cited(name);
            return (
              <div key={name} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.white, borderRadius: 12,
                border: `1.5px solid ${on ? color : color + "22"}`,
                boxShadow: on ? `0 0 0 4px ${color}18` : "none",
                opacity: p > 0.06 ? 1 : 0, transform: p > 0.06 ? (on ? "scale(1.02)" : "none") : "translateX(-14px)",
                transition: `all .45s ${EXPO} ${p > 0.06 && p < 0.3 ? i * 0.07 : 0}s`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.dark, flex: 1, fontWeight: 500, minWidth: 0, lineHeight: 1.35 }}>{name}</span>
                <span style={{
                  fontSize: 9.5, fontWeight: 700, color: on ? "#fff" : color, background: on ? color : color + "14",
                  borderRadius: 99, padding: "2px 8px", flexShrink: 0, transition: "all .3s",
                }}>{on ? "Cited" : tag}</span>
              </div>
            );
          })}
          <div style={{
            padding: "12px 14px", background: C.purple + "08", borderRadius: 12, border: `1px solid ${C.purple}22`,
            opacity: p > 0.10 ? 1 : 0, transform: p > 0.10 ? "none" : "translateY(8px)", transition: `all .45s ${EXPO}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.purple }}>{idxBar >= 1 ? "ChromaDB indexed" : "Indexing documents…"}</div>
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>4,231 chunks · 1,536 dims</div>
            <div style={{ marginTop: 8, height: 4, background: C.border, borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${idxBar * 100}%`, borderRadius: 99,
                background: `linear-gradient(to right, ${C.purple}, ${C.blue})`,
              }} />
            </div>
          </div>
        </div>

        <Card accent={C.yellow} style={{ overflow: "hidden" }}>
          <div style={{ background: C.dark, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: C.yellow, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
            }}>🤖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Remora Assistant</div>
              <div style={{ fontSize: 11, color: C.yellow }}>Powered by your documents</div>
            </div>
            <Pulse color={C.green} size={8} />
          </div>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "#FAFAF9" }}>
            {chat.map((m, i) => (
              <Msg key={i} mine={m.mine} show={p > m.at} typing={!m.mine && typ(m.at)}
                bg={m.mine ? C.yellow : C.white} fg={C.dark}
                border={m.mine ? undefined : `1px solid ${C.border}`}
                avatar={m.mine ? undefined : avatar} source={m.source} srcColor={m.srcColor}>
                {m.text}
              </Msg>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   SCENE 5 — Automation chain (n8n)
   ============================================================ */
function SceneAutomation({ p }) {
  const steps = [
    { icon: "🛒", label: "Order trigger",         color: C.blue,   show: p > 0.04,
      detail: "New order from any channel — WhatsApp, website, eCommerce, walk-in, or phone call." },
    { icon: "📋", label: "ERP: Sales Order",       color: C.red,    show: p > 0.18,
      detail: "Odoo auto-creates the Sales Order, verifies customer credit, assigns salesperson." },
    { icon: "📦", label: "Warehouse & picking",    color: C.yellow, show: p > 0.32,
      detail: "Picking list generated. Driver assigned based on route. WH team notified via app." },
    { icon: "🤖", label: "AI agent checks stock",  color: C.purple, show: p > 0.46,
      detail: "If any item below reorder level → Purchase Order auto-raised. Supplier notified." },
    { icon: "💬", label: "Customer notified",      color: C.green,  show: p > 0.60,
      detail: "WhatsApp: “Your order is packed and ready for dispatch! Track here →”" },
    { icon: "🧾", label: "Invoice & payment",      color: C.yellow, show: p > 0.72,
      detail: "GST invoice PDF auto-generated and emailed. Payment link sent via WhatsApp." },
    { icon: "📊", label: "Analytics updated",      color: C.blue,   show: p > 0.84,
      detail: "Revenue, margins, top customers — live dashboard in Odoo. No manual reporting." },
  ];
  const done = steps.filter((s) => s.show).length;

  return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      <div style={{
        marginBottom: 28, padding: "14px 18px", background: C.purple + "08", borderRadius: 14,
        border: `1px solid ${C.purple}22`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        opacity: p > 0.02 ? 1 : 0.5, transition: `opacity .5s ${EXPO}`,
      }}>
        <Pulse color={C.purple} size={10} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.purple }}>n8n Workflow — {done >= steps.length ? "completed" : "executing"}</div>
          <div style={{ fontSize: 11.5, color: C.gray }}>{done} of {steps.length} steps completed</div>
        </div>
        <div style={{ flex: "1 1 120px", height: 5, background: C.border, borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 99, width: `${(done / steps.length) * 100}%`,
            background: `linear-gradient(to right, ${C.purple}, ${C.blue})`, transition: `width .5s ${SMOOTH}`,
          }} />
        </div>
      </div>

      <Timeline steps={steps} size={48} />

      <Banner show={p > 0.90} color={C.green} style={{ marginTop: 24 }}
        title="✓ 7-step chain. Zero human actions required."
        text="From the moment the order lands to the customer getting their tracking update — Remora handles every step. ERP sync, warehouse ops, AI purchasing, customer communication, invoicing, and live reporting." />
    </div>
  );
}

/* ============================================================
   SCENE CONFIG
   ============================================================ */
const SCENES = [
  { id: "erp", icon: "📊", label: "ERP", color: C.red, dur: 9500,
    title: "Odoo ERP — orders, inventory, invoices on autopilot",
    sub: "From customer click to dispatched order — zero manual steps required." },
  { id: "whatsapp", icon: "💬", label: "WhatsApp", color: C.green, dur: 10500,
    title: "WhatsApp becomes your order desk and CRM",
    sub: "Retailers and customers order on WhatsApp. Remora pushes it straight into Odoo." },
  { id: "voice", icon: "🎤", label: "Voice AI", color: C.blue, dur: 13000,
    title: "Speak to update your CRM — no typing needed",
    sub: "Sales team talks after a call. Voice AI transcribes, extracts, and CRM updates itself." },
  { id: "rag", icon: "🧠", label: "RAG", color: C.purple, dur: 12500,
    title: "Your documents become instant, accurate answers",
    sub: "Upload SOPs, pricing, catalogues. Your chatbot knows everything inside them — forever." },
  { id: "automation", icon: "⚡", label: "Automation", color: C.yellow, dur: 11000,
    title: "One trigger — the entire chain runs automatically",
    sub: "n8n + Odoo + AI agents, working 24/7. You run your business, Remora handles the rest." },
];
const SCENE_COMPONENTS = [SceneERP, SceneWhatsApp, SceneVoice, SceneRAG, SceneAutomation];
const N = SCENES.length;

/* ============================================================
   MAIN — the demo player
   ============================================================ */
export default function HowItWorks() {
  const [idx, setIdx] = useState(0);
  const [p, setP] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);

  const tRef = useRef(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const tabsRef = useRef(null);
  const tabRefs = useRef([]);

  const scene = SCENES[idx];
  const Scene = SCENE_COMPONENTS[idx];
  const autoAdvance = !isMobile;
  const hoverPause = hover && canHover;

  /* environment: viewport size, hover capability, reduced motion */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const hm = window.matchMedia("(hover: hover)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => { setIsMobile(mq.matches); setCanHover(hm.matches); setReduced(rm.matches); };
    upd();
    [mq, hm, rm].forEach((m) => m.addEventListener?.("change", upd));
    return () => [mq, hm, rm].forEach((m) => m.removeEventListener?.("change", upd));
  }, []);

  /* only play while the stage is on screen */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* reduced motion → show the finished state */
  useEffect(() => { if (reduced) setP(1); }, [reduced, idx]);

  /* the clock */
  useEffect(() => {
    if (reduced || !playing || !inView || hoverPause) return;
    const D = scene.dur;
    const end = autoAdvance ? D + HOLD : D;
    let raf;
    let last = performance.now();
    let lastPaint = 0;
    const tick = (now) => {
      tRef.current += now - last;
      last = now;
      const t = tRef.current;
      if (t >= D) {
        setP(1);
      } else if (now - lastPaint > 30) {
        lastPaint = now;
        setP(t / D);
      }
      if (t >= end) {
        if (autoAdvance) {
          tRef.current = 0;
          setP(0);
          setIdx((i) => (i + 1) % N);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, run, playing, inView, hoverPause, reduced, autoAdvance, scene.dur]);

  /* keep the active tab centred (phones scroll the tab row) */
  useEffect(() => {
    const c = tabsRef.current;
    const t = tabRefs.current[idx];
    if (c && t) c.scrollTo({ left: t.offsetLeft - (c.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
  }, [idx]);

  const goTo = useCallback((i) => {
    tRef.current = 0;
    setP(0);
    setIdx(i);
    setPlaying(true);
    setRun((r) => r + 1);
  }, []);
  const replay = () => { tRef.current = 0; setP(0); setPlaying(true); setRun((r) => r + 1); };
  const next = () => goTo((idx + 1) % N);
  const prev = () => goTo((idx - 1 + N) % N);
  const nextFromFoot = () => {
    goTo((idx + 1) % N);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const finished = p >= 1 && !autoAdvance;
  const toggle = () => { if (finished) replay(); else setPlaying((v) => !v); };
  const live = playing && inView && !hoverPause && !finished && !reduced;
  const status = finished || reduced ? "Complete" : live ? "Live demo" : "Paused";
  const showPlayIcon = finished || !playing;

  return (
    <section id="how-it-works" ref={sectionRef} style={{
      background: C.white, padding: "clamp(56px,9vw,110px) 0", scrollMarginTop: 72, position: "relative", overflow: "hidden",
    }}>
      <style>{CSS}</style>
      <div className="hw-wrap">
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,44px)" }}>
          <Label text="How it works" color={C.blue} />
          <h2 style={{
            fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, color: C.dark, letterSpacing: "-1px",
            lineHeight: 1.15, maxWidth: 760, margin: "0 auto 12px",
          }}>See one backbone run the whole business — live.</h2>
          <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: C.gray, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Five real workflows playing out step by step. Tap any tab to explore.
          </p>
        </div>

        {/* Tabs */}
        <div className="hw-tabs" ref={tabsRef} role="tablist" aria-label="Remora workflows">
          {SCENES.map((s, i) => {
            const active = idx === i;
            return (
              <button key={s.id} type="button" role="tab" aria-selected={active}
                ref={(el) => { tabRefs.current[i] = el; }}
                className="hw-tab" onClick={() => (active ? replay() : goTo(i))}
                style={{
                  color: active ? s.color : undefined,
                  background: active ? s.color + "0f" : undefined,
                  borderColor: active ? s.color : undefined,
                }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>{s.label}
                <span style={{
                  position: "absolute", left: 0, bottom: 0, height: 3, background: s.color,
                  width: active ? `${p * 100}%` : "0%", transition: active ? "none" : "width .3s",
                }} />
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div ref={stageRef} className="hw-stage"
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{
            borderColor: scene.color + "30",
            background: `radial-gradient(ellipse at 50% 0%, ${scene.color}0d 0%, transparent 62%), ${C.white}`,
          }}>
          <div className="hw-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: scene.color, letterSpacing: ".5px" }}>
                0{idx + 1} <span style={{ color: C.muted, fontWeight: 600 }}>/ 0{N}</span>
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700,
                color: live ? scene.color : C.muted, background: (live ? scene.color : C.muted) + "12",
                borderRadius: 99, padding: "4px 11px",
              }}>
                {live && <Pulse color={scene.color} size={7} />}{status}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="hw-btn" aria-label="Previous demo" onClick={prev}><Icon name="prev" /></button>
              <button type="button" className="hw-btn" aria-label={showPlayIcon ? "Play" : "Pause"} onClick={toggle}>
                <Icon name={showPlayIcon ? "play" : "pause"} />
              </button>
              <button type="button" className="hw-btn" aria-label="Replay" onClick={replay}><Icon name="replay" /></button>
              <button type="button" className="hw-btn" aria-label="Next demo" onClick={next}><Icon name="next" /></button>
            </div>
          </div>

          <div className="hw-scene" key={idx}>
            <div className="hw-scene-head">
              <Label text={`0${idx + 1} · ${scene.id}`} color={scene.color} />
              <h3 style={{
                fontSize: "clamp(20px,4.4vw,34px)", fontWeight: 900, color: C.dark, letterSpacing: "-0.5px",
                lineHeight: 1.2, maxWidth: 700, margin: "0 auto 10px",
              }}>{scene.title}</h3>
              <p style={{ fontSize: "clamp(13px,1.6vw,15px)", color: C.gray, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{scene.sub}</p>
            </div>
            <Scene p={p} />
          </div>

          {/* phone-friendly footer controls */}
          <div className="hw-foot">
            <button type="button" className="hw-pill" onClick={replay}><Icon name="replay" size={15} /> Replay</button>
            <button type="button" className="hw-pill" onClick={nextFromFoot}
              style={{ background: scene.color, borderColor: scene.color, color: "#fff" }}>
              {idx === N - 1 ? "Start again" : `Next: ${SCENES[(idx + 1) % N].label}`} <Icon name="next" size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
