"use client";
import { useEffect, useRef, useState } from "react";
import { C, E } from "../styles/tokens";
import { Label, Card, CardHead, Reveal, Pulse, Packet, StepLine, Typewriter } from "./ui";

/* ── Scene 1: ERP Order Cycle ── */
function SceneERP({ p }) {
  const steps = [
    { show: p > 0.04, icon: "🛒", label: "Order placed",          color: C.blue,
      detail: "Customer orders via website, WhatsApp, counter, or phone. Remora captures all channels into a single queue." },
    { show: p > 0.22, icon: "⚙️", label: "Odoo processes",        color: C.red,
      detail: "Sales Order auto-created. Warehouse routing logic runs — picks the right warehouse, assigns the delivery route." },
    { show: p > 0.40, icon: "📦", label: "Stock reserved",         color: C.yellow,
      detail: "Inventory deducted in real time. If stock falls below threshold — Purchase Order auto-raised to supplier." },
    { show: p > 0.58, icon: "🚚", label: "Delivery scheduled",     color: C.green,
      detail: "Delivery order created, driver assigned and notified via WhatsApp with route details and pickup time." },
    { show: p > 0.74, icon: "🧾", label: "Invoice auto-generated", color: C.purple,
      detail: "GST-compliant PDF invoice generated. Emailed to customer. WhatsApp receipt sent instantly. Accounts updated." },
    { show: p > 0.88, icon: "📊", label: "Dashboard updated",      color: C.blue,
      detail: "Revenue, pending orders, top SKUs, margins — all live in Odoo dashboard. No end-of-day data entry." },
  ];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      {steps.map(({ show, icon, label, color, detail }, i) => (
        <div key={i} style={{ display: "flex", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 52, flexShrink: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: show ? color + "14" : C.light,
              border: `2px solid ${show ? color : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              opacity: show ? 1 : 0.3,
              transform: show ? "scale(1)" : "scale(0.78)",
              transition: `all 0.55s ${E.spring}`,
              boxShadow: show ? `0 0 0 6px ${color}10` : "none",
              flexShrink: 0,
            }}>{icon}</div>
            {i < steps.length - 1 && (
              <StepLine from={color} to={steps[i+1].color} active={show && steps[i+1].show} />
            )}
          </div>
          <div style={{
            flex: 1, paddingBottom: i < steps.length - 1 ? 28 : 0,
            opacity: show ? 1 : 0.22,
            transform: show ? "none" : "translateX(-10px)",
            transition: `all 0.5s ${E.expo}`,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: show ? color : C.muted, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.75 }}>{detail}</div>
            {show && i === 2 && (
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Packet color={C.yellow} label="PO raised to supplier" visible delay={0.3} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Scene 2: WhatsApp → ERP ── */
function SceneWhatsApp({ p }) {
  const msgs = [
    { role: "c", text: "Hi, need 50 Valve-A and 20 Pipe-B. Urgent delivery please",  show: p > 0.08 },
    { role: "b", text: "Got it! Checking stock availability for your order...",        show: p > 0.22 },
    { role: "b", text: "✅ Stock confirmed.\n50 × Valve-A (₹320 each)\n20 × Pipe-B (₹580 each)\nTotal: ₹27,600\n\nConfirm order?", show: p > 0.36 },
    { role: "c", text: "Yes confirm",                                                  show: p > 0.50 },
    { role: "b", text: "✅ Order #SO-3291 created in our system.\n📄 Invoice sent to your email.\n🚚 Expected dispatch: Tomorrow 10 AM\n\nThank you!", show: p > 0.66 },
  ];

  const erpSteps = [
    { show: p > 0.50, color: C.green,  label: "Sales Order SO-3291 created in Odoo" },
    { show: p > 0.60, color: C.blue,   label: "Stock reserved: 50 × Valve-A, 20 × Pipe-B" },
    { show: p > 0.70, color: C.yellow, label: "Picking list → Warehouse team notified" },
    { show: p > 0.80, color: C.red,    label: "Invoice PDF generated, email sent" },
    { show: p > 0.90, color: C.purple, label: "Accounts updated, delivery scheduled" },
  ];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      {/* WhatsApp mock */}
      <Card accent={C.green} style={{ overflow: "hidden" }}>
        <div style={{ background: "#075E54", padding: "13px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#128C7E",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🤖</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Remora Business Bot</div>
            <div style={{ fontSize: 11, color: "#a7f3d0" }}>● online · typically replies instantly</div>
          </div>
        </div>
        <div style={{ background: "#ECE5DD", padding: "16px 14px", minHeight: 280, display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.map(({ role, text, show }, i) => (
            show && (
              <div key={i} style={{
                display: "flex", justifyContent: role === "c" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.35s ease",
              }}>
                <div style={{
                  maxWidth: "84%", padding: "9px 13px",
                  borderRadius: role === "c" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: role === "c" ? "#DCF8C6" : "#fff",
                  fontSize: 12, color: C.dark, lineHeight: 1.7,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  whiteSpace: "pre-line",
                }}>{text}</div>
              </div>
            )
          ))}
        </div>
      </Card>

      {/* ERP side */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 4 }}>
          Odoo ERP — live updates
        </div>
        {erpSteps.map(({ show, color, label }, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "13px 16px", borderRadius: 14,
            background: show ? color + "08" : C.light,
            border: `1.5px solid ${show ? color + "35" : C.border}`,
            opacity: show ? 1 : 0.35,
            transform: show ? "none" : "translateX(10px)",
            transition: `all 0.5s ${E.expo} ${i * 0.08}s`,
          }}>
            <Pulse color={show ? color : C.muted} size={9} />
            <span style={{ fontSize: 12, color: show ? C.dark : C.muted, fontWeight: show ? 600 : 400, lineHeight: 1.5 }}>{label}</span>
          </div>
        ))}

        {p > 0.92 && (
          <div style={{
            padding: "13px 16px", background: C.green + "10",
            border: `1.5px solid ${C.green}30`, borderRadius: 14,
            animation: "fadeUp 0.4s ease",
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.green }}>✓ 0 humans involved</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 3, lineHeight: 1.6 }}>
              From WhatsApp message to dispatched order — fully automated by Remora.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Scene 3: Voice AI + CRM ── */
function SceneVoice({ p }) {
  const crmRows = [
    { field: "Lead status",   before: "New",        after: "Qualified",    color: C.blue,   show: p > 0.60 },
    { field: "Company",       before: "—",          after: "Gulf Traders", color: C.dark,   show: p > 0.63 },
    { field: "Contact",       before: "—",          after: "Ahmed Al-Harbi",color: C.dark,  show: p > 0.66 },
    { field: "Deal value",    before: "—",          after: "₹6,40,000",   color: C.green,  show: p > 0.70 },
    { field: "Product",       before: "—",          after: "Warehouse Module (8 users)", color: C.text, show: p > 0.73 },
    { field: "Next action",   before: "—",          after: "Send demo",    color: C.yellow, show: p > 0.77 },
    { field: "Follow-up date",before: "—",          after: "Monday 11 AM", color: C.purple, show: p > 0.80 },
    { field: "Assigned to",   before: "Unassigned", after: "Priya (Sales)",color: C.red,   show: p > 0.84 },
  ];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Mic card */}
        <Card accent={C.blue} style={{ overflow: "hidden" }}>
          <CardHead icon="🎤" title="Sales Rep — Voice Input" accent={C.blue} badge={p > 0.12 ? "Listening..." : "Ready"} />
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", width: 68, height: 68 }}>
              {p > 0.12 && [1, 2, 3].map(i => (
                <div key={i} style={{
                  position: "absolute", inset: -(i * 9), borderRadius: "50%",
                  border: `1.5px solid ${C.blue}`, opacity: 0,
                  animation: `pulse-ring 1.8s ease-out ${i * 0.5}s infinite`,
                }} />
              ))}
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                background: p > 0.12 ? C.blue : C.light,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, transition: `background 0.4s ${E.smooth}`,
                boxShadow: p > 0.12 ? `0 0 0 0 ${C.blue}40, 0 8px 32px ${C.blue}30` : "none",
              }}>🎤</div>
            </div>
            {p > 0.12 && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2.5, height: 28, animation: "fadeIn 0.4s ease" }}>
                {[0.5,0.9,0.6,1,0.4,0.8,0.7,0.5,1,0.6,0.8,0.4,0.9,0.5].map((h, i) => (
                  <div key={i} style={{
                    width: 3.5, borderRadius: 2, background: C.blue + "cc",
                    height: `${h * 100}%`,
                    animation: `voice-bar ${0.4 + Math.random() * 0.4}s ease-in-out ${i * 0.04}s infinite alternate`,
                  }} />
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Transcript */}
        {p > 0.28 && (
          <Card accent={C.muted} style={{ animation: "fadeUp 0.5s ease" }}>
            <CardHead icon="📝" title="Transcribed" accent={C.muted} badge="Whisper AI" />
            <div style={{ padding: "14px 16px" }}>
              <p style={{
                fontSize: 12, color: C.text, lineHeight: 1.85,
                fontStyle: "italic", background: C.light,
                borderRadius: 10, padding: "12px 14px", margin: 0,
              }}>
                <Typewriter
                  text={`"Spoke with Ahmed from Gulf Traders. They want the full warehouse module, 8 users. Around 6.4 lakhs. Send them a demo on Monday morning. Mark as qualified, assign to Priya."`}
                  speed={20}
                />
              </p>
            </div>
          </Card>
        )}

        {/* NLP parse */}
        {p > 0.46 && (
          <Card accent={C.purple} style={{ animation: "fadeUp 0.5s ease" }}>
            <CardHead icon="🧠" title="AI intent extraction" accent={C.purple} badge="Parsed" />
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                ["Contact",   "Ahmed Al-Harbi",       C.blue  ],
                ["Company",   "Gulf Traders",          C.dark  ],
                ["Product",   "Warehouse Module x8",   C.purple],
                ["Value",     "₹6,40,000",             C.green ],
                ["Action",    "Demo → Monday AM",      C.yellow],
                ["Assign to", "Priya (Sales)",         C.red   ],
              ].map(([k, v, c]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: C.muted, width: 64, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c, background: c + "12", borderRadius: 8, padding: "2px 10px" }}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* CRM update */}
      <Card accent={C.green} glow={p > 0.60} style={{ height: "100%" }}>
        <CardHead icon="📊" title="Odoo CRM — auto updated" accent={C.green} badge={p > 0.60 ? "Live sync ●" : "Waiting..."} />
        <div style={{ padding: "18px 18px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {crmRows.map(({ field, before, after, color, show }) => (
              <div key={field} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 5, fontWeight: 600, letterSpacing: "0.4px" }}>{field.toUpperCase()}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: C.border, textDecoration: "line-through" }}>{before}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>→</span>
                  <span style={{
                    fontSize: 13, fontWeight: 700, color,
                    background: color + "12", borderRadius: 8, padding: "3px 12px",
                    opacity: show ? 1 : 0,
                    transform: show ? "none" : "translateX(-10px)",
                    transition: `all 0.5s ${E.expo}`,
                    display: "inline-block",
                  }}>{after}</span>
                </div>
              </div>
            ))}
          </div>
          {p > 0.90 && (
            <div style={{
              marginTop: 16, padding: "12px 14px", background: C.green + "10",
              borderRadius: 12, animation: "fadeUp 0.4s ease",
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.green }}>✓ Zero typing. Zero forms. Done.</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 4, lineHeight: 1.6 }}>
                Sales rep spoke for 40 seconds. CRM is fully updated, follow-up scheduled, and Priya gets a push notification.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ── Scene 4: RAG + Chatbot ── */
function SceneRAG({ p }) {
  const docs = [
    { name: "Legal SOP v4.pdf",           tag: "Law",       color: C.purple },
    { name: "Product Catalogue 2025.pdf", tag: "Sales",     color: C.red    },
    { name: "GCC Pricing — KSA.xlsx",     tag: "Pricing",   color: C.green  },
    { name: "Clinic Treatment SOPs.pdf",  tag: "Medical",   color: C.blue   },
    { name: "Warranty & Returns.docx",    tag: "Support",   color: C.yellow },
    { name: "HR Policy Manual.pdf",       tag: "HR",        color: C.purple },
  ];

  const chat = [
    { role: "u", text: "What's our return policy for industrial fittings?",                 show: p > 0.38 },
    { role: "b", text: "Based on your Warranty doc: Industrial fittings can be returned within 15 days if unused and in original packaging. Damaged items must be reported within 48 hrs of delivery.\n\n📄 Source: Warranty & Returns.docx, p.3", show: p > 0.56 },
    { role: "u", text: "Is there a volume discount for 100+ units from Saudi customers?",   show: p > 0.70 },
    { role: "b", text: "Yes — your GCC Pricing sheet shows 12% volume discount for 100+ units, Saudi accounts. SAR pricing applies with VAT included.\n\n📄 Source: GCC Pricing — KSA.xlsx, Tab 3", show: p > 0.84 },
  ];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "270px 1fr", gap: 24, alignItems: "start" }}>
      {/* Docs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Your business documents</div>
        {docs.map(({ name, tag, color }, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", background: C.white, borderRadius: 12,
            border: `1.5px solid ${color}22`,
            opacity: p > 0.06 ? 1 : 0,
            transform: p > 0.06 ? "none" : "translateX(-14px)",
            transition: `all 0.45s ${E.expo} ${i * 0.07}s`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: C.dark, flex: 1, fontWeight: 500 }}>{name}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color, background: color + "14", borderRadius: 99, padding: "2px 8px", flexShrink: 0 }}>{tag}</span>
          </div>
        ))}
        {p > 0.22 && (
          <div style={{
            padding: "12px 14px", background: C.purple + "08", borderRadius: 12,
            border: `1px solid ${C.purple}22`, animation: "fadeUp 0.4s ease",
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.purple }}>ChromaDB indexed</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>4,231 chunks · 1,536 dims</div>
            <div style={{ marginTop: 8, height: 4, background: C.border, borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "100%", background: `linear-gradient(to right, ${C.purple}, ${C.blue})`, borderRadius: 99 }} />
            </div>
          </div>
        )}
      </div>

      {/* Chatbot */}
      <Card accent={C.yellow} style={{ overflow: "hidden" }}>
        <div style={{ background: C.dark, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.yellow,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Remora Assistant</div>
            <div style={{ fontSize: 10, color: C.yellow + "cc" }}>Powered by your documents</div>
          </div>
          <Pulse color={C.green} size={8} />
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12, minHeight: 340, background: "#FAFAF9" }}>
          {chat.map(({ role, text, show }, i) => (
            show && (
              <div key={i} style={{
                display: "flex", justifyContent: role === "u" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.4s ease",
              }}>
                {role === "b" && (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.dark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 4 }}>🤖</div>
                )}
                <div style={{
                  maxWidth: "82%", padding: "11px 14px",
                  borderRadius: role === "u" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  background: role === "u" ? C.yellow : C.white,
                  color: role === "u" ? "#fff" : C.dark,
                  fontSize: 12, lineHeight: 1.75,
                  border: role === "b" ? `1px solid ${C.border}` : "none",
                  boxShadow: S.sm,
                  whiteSpace: "pre-line",
                }}>{text}</div>
              </div>
            )
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── Scene 5: Automation Chains ── */
function SceneAutomation({ p }) {
  const steps = [
    { icon: "🛒", label: "Order trigger",          color: C.blue,   show: p > 0.04,
      desc: "New order from any channel — WhatsApp, website, eCommerce, walk-in, or phone call." },
    { icon: "📋", label: "ERP: Sales Order",        color: C.red,    show: p > 0.18,
      desc: "Odoo auto-creates the Sales Order, verifies customer credit, assigns salesperson." },
    { icon: "📦", label: "Warehouse & picking",     color: C.yellow, show: p > 0.32,
      desc: "Picking list generated. Driver assigned based on route. WH team notified via app." },
    { icon: "🤖", label: "AI agent checks stock",   color: C.purple, show: p > 0.46,
      desc: "If any item below reorder level → Purchase Order auto-raised. Supplier notified." },
    { icon: "💬", label: "Customer notified",       color: C.green,  show: p > 0.60,
      desc: "WhatsApp: 'Your order is packed and ready for dispatch! Track here →'" },
    { icon: "🧾", label: "Invoice & payment",       color: C.yellow, show: p > 0.72,
      desc: "GST invoice PDF auto-generated and emailed. Payment link sent via WhatsApp." },
    { icon: "📊", label: "Analytics updated",       color: C.blue,   show: p > 0.84,
      desc: "Revenue, margins, top customers — live dashboard in Odoo. No manual reporting." },
  ];

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
      {/* n8n flow indicator */}
      <div style={{
        marginBottom: 32, padding: "14px 20px",
        background: C.purple + "08", borderRadius: 14,
        border: `1px solid ${C.purple}22`,
        display: "flex", alignItems: "center", gap: 12,
        opacity: p > 0.04 ? 1 : 0, transition: `opacity 0.5s ${E.expo}`,
      }}>
        <Pulse color={C.purple} size={10} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>n8n Workflow — executing</div>
          <div style={{ fontSize: 11, color: C.gray }}>
            {Math.round(p * steps.length)} of {steps.length} steps completed
          </div>
        </div>
        <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 99, overflow: "hidden", marginLeft: "auto" }}>
          <div style={{
            height: "100%", borderRadius: 99,
            background: `linear-gradient(to right, ${C.purple}, ${C.blue})`,
            width: `${p * 100}%`, transition: `width 0.3s ${E.smooth}`,
          }} />
        </div>
      </div>

      {steps.map(({ icon, label, color, desc, show }, i) => (
        <div key={i} style={{ display: "flex", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 50, flexShrink: 0 }}>
            <div style={{
              width: 50, height: 50, borderRadius: "50%",
              background: show ? color + "14" : C.light,
              border: `2px solid ${show ? color : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              opacity: show ? 1 : 0.28,
              transform: show ? "scale(1)" : "scale(0.75)",
              transition: `all 0.55s ${E.spring}`,
              boxShadow: show ? `0 0 0 6px ${color}10, 0 4px 16px ${color}20` : "none",
            }}>{icon}</div>
            {i < steps.length - 1 && (
              <StepLine from={color} to={steps[i+1].color} active={show && steps[i+1].show} />
            )}
          </div>
          <div style={{
            flex: 1, paddingBottom: i < steps.length - 1 ? 24 : 0,
            opacity: show ? 1 : 0.22,
            transform: show ? "none" : "translateX(-10px)",
            transition: `all 0.5s ${E.expo}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: show ? color : C.muted, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.75 }}>{desc}</div>
          </div>
        </div>
      ))}

      {p > 0.88 && (
        <div style={{
          marginTop: 24, padding: "16px 20px",
          background: `linear-gradient(135deg, ${C.green}10, ${C.blue}08)`,
          border: `1.5px solid ${C.green}30`, borderRadius: 14,
          animation: "fadeUp 0.5s ease",
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.green, marginBottom: 6 }}>
            ✓ 7-step chain. Zero human actions required.
          </div>
          <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.75 }}>
            From the moment the order lands to the customer getting their tracking update — Remora handles every step. ERP sync, warehouse ops, AI purchasing, customer communication, invoicing, and live reporting.
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SCENE CONFIG ── */
const SCENES = [
  { id: "erp",        icon: "📊", label: "ERP",         color: C.red,
    title: "Odoo ERP — orders, inventory, invoices on autopilot",
    sub:   "From customer click to dispatched order — zero manual steps required." },
  { id: "whatsapp",   icon: "💬", label: "WhatsApp",    color: C.green,
    title: "WhatsApp becomes your order desk and CRM",
    sub:   "Retailers and customers order on WhatsApp. Remora pushes it straight into Odoo." },
  { id: "voice",      icon: "🎤", label: "Voice AI",    color: C.blue,
    title: "Speak to update your CRM — no typing needed",
    sub:   "Sales team talks after a call. Voice AI transcribes, extracts, and CRM updates itself." },
  { id: "rag",        icon: "🧠", label: "RAG",         color: C.purple,
    title: "Your documents become instant, accurate answers",
    sub:   "Upload SOPs, pricing, catalogues. Your chatbot knows everything inside them — forever." },
  { id: "automation", icon: "⚡", label: "Automation",  color: C.yellow,
    title: "One trigger — the entire chain runs automatically",
    sub:   "n8n + Odoo + AI agents, working 24/7. You run your business, Remora handles the rest." },
];

const SCENE_COMPONENTS = [SceneERP, SceneWhatsApp, SceneVoice, SceneRAG, SceneAutomation];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx]       = useState(0);
  const [sceneProg, setSceneProg]       = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sceneEls = containerRef.current?.querySelectorAll(".r-scene");
      if (!sceneEls) return;
      sceneEls.forEach((el, i) => {
        const r  = el.getBoundingClientRect();
        const wh = window.innerHeight;
        if (r.top <= wh * 0.14 && r.bottom >= wh * 0.86) {
          setActiveIdx(i);
          const scrollable = r.height - wh * 0.72;
          const done       = -r.top + wh * 0.14;
          setSceneProg(Math.max(0, Math.min(1, done / Math.max(scrollable, 1))));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="how-it-works" ref={containerRef} style={{ background: C.white }}>

      {/* Sticky tab bar */}
      <div style={{
        position: "sticky", top: 68, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,4vw,40px)" }}>
          <div style={{ display: "flex", overflowX: "auto", gap: 0, scrollbarWidth: "none" }}>
            {SCENES.map(({ label, color, icon }, i) => {
              const active = activeIdx === i;
              return (
                <button key={i}
                  onClick={() => containerRef.current?.querySelectorAll(".r-scene")[i]?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    padding: "16px 22px", border: "none", cursor: "pointer",
                    background: "none", whiteSpace: "nowrap",
                    fontSize: 13, fontWeight: 700,
                    color: active ? color : C.muted,
                    borderBottom: `3px solid ${active ? color : "transparent"}`,
                    transition: `all 0.25s ${E.smooth}`,
                    display: "flex", alignItems: "center", gap: 7,
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.muted; }}
                >
                  <span>{icon}</span> {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scene panels */}
      {SCENES.map(({ id, color, title, sub }, i) => {
        const SceneComp = SCENE_COMPONENTS[i];
        const prog = activeIdx === i ? sceneProg : activeIdx > i ? 1 : 0;

        return (
          <div key={id} className="r-scene" style={{ minHeight: "230vh" }}>
            <div style={{
              position: "sticky", top: 120,
              height: "calc(100vh - 120px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", padding: "0 clamp(20px,4vw,40px)",
            }}>
              {/* Background accent */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse at 50% 30%, ${color}06 0%, transparent 60%)`,
              }} />

              <div style={{ width: "100%", maxWidth: 1120, position: "relative", zIndex: 2 }}>
                {/* Scene header */}
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                  <Label text={`0${i+1} · ${id.toUpperCase()}`} color={color} />
                  <h3 style={{
                    fontSize: "clamp(20px,3.5vw,34px)", fontWeight: 900,
                    color: C.dark, letterSpacing: "-0.5px", lineHeight: 1.2,
                    maxWidth: 660, margin: "0 auto 10px",
                  }}>{title}</h3>
                  <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: C.gray }}>{sub}</p>
                </div>

                <SceneComp p={prog} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

// Import S for shadow token used in RAG scene
const S = { sm: "0 1px 4px rgba(15,23,42,0.06)" };

