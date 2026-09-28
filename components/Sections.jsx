"use client";
import { useState } from "react";
import { C, E, waLink } from "../styles/tokens";
import { Reveal, Label, Card, WABtn, BrandBars, Pulse, Divider } from "./ui";

/* ================================================================
   CAPABILITIES
   ================================================================ */
const CAPS = [
  {
    icon: "📞", color: C.blue, title: "High call volume draining your team?",
    desc: "Voice AI listens to every customer or sales call, transcribes it, extracts decisions and follow-ups, and updates your CRM automatically. No post-call data entry ever again.",
    example: "Clinic front desk gets 80 calls a day. After Remora: 12.",
  },
  {
    icon: "💬", color: C.green, title: "WhatsApp orders not reaching your ERP?",
    desc: "Customers and retailers order on WhatsApp naturally. Remora captures every order, validates it against stock, creates the Sales Order in Odoo, and confirms with the customer — all without a human in the loop.",
    example: "Distributor in Sharjah: 240 WhatsApp orders/day, all auto-entered.",
  },
  {
    icon: "📧", color: C.red, title: "Emails with POs and invoices sitting unread?",
    desc: "Incoming email POs are parsed, matched to your vendor/customer list in Odoo, and routed to the right team. Email invoices are cross-checked and pushed into accounts. No more manual read-and-enter.",
    example: "Law firm: contract emails now auto-routed to case files.",
  },
  {
    icon: "📄", color: C.purple, title: "SOPs and docs nobody can find fast?",
    desc: "Upload every SOP, policy, manual, catalogue, and legal document once. Staff and customers can query them in natural language and get precise, sourced answers instantly — RAG over your entire knowledge base.",
    example: "Factory SOP query: answered in 3 seconds, cited page included.",
  },
  {
    icon: "🔄", color: C.yellow, title: "Multi-step tasks that need human handoffs?",
    desc: "n8n + Odoo + AI agents chain your operations end-to-end. One trigger (new order, incoming call, stock alert) kicks off a full sequence — notify, update, invoice, escalate — with zero manual steps.",
    example: "Warehouse: arrival SMS → GRN → stock updated → PO closed. Automatic.",
  },
  {
    icon: "📊", color: C.blue, title: "Reports that take hours to prepare?",
    desc: "Real-time revenue, margins, pending receivables, top customers, staff KPIs — all live inside Odoo. Accessible from your phone. Automated weekly PDF reports to your inbox every Monday.",
    example: "Builder gets Saturday morning P&L without asking anyone.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" style={{ padding: "var(--section-py) clamp(20px,4vw,40px)", background: C.light }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
          <Label text="What Remora handles" color={C.purple} />
          <h2 style={{
            fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 900,
            color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.15,
            maxWidth: 640, margin: "0 auto 16px",
          }}>
            The exact problems growing SMBs face every day
          </h2>
          <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: C.gray, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
            We've seen these across clinics, traders, manufacturers, law firms, builders and warehouses across India and the GCC.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 24 }}>
          {CAPS.map(({ icon, color, title, desc, example }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Card accent={color} hover style={{ height: "100%" }}>
                <div style={{ padding: "28px 26px" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: color + "12", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 26, marginBottom: 18,
                    boxShadow: `0 0 0 6px ${color}06`,
                  }}>{icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: C.dark, lineHeight: 1.35, marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.8, marginBottom: 16 }}>{desc}</p>
                  <div style={{
                    padding: "10px 14px", borderRadius: 10,
                    background: color + "08", border: `1px solid ${color}20`,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 4 }}>Real example</div>
                    <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{example}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   INTEGRATIONS
   ================================================================ */
const INTEGRATIONS = [
  { name: "Odoo ERP",       icon: "📊", color: C.red,    desc: "Core ERP platform" },
  { name: "WhatsApp",       icon: "💬", color: C.green,  desc: "Business messaging" },
  { name: "Gmail",          icon: "📧", color: C.red,    desc: "Email integration" },
  { name: "n8n",            icon: "⚡", color: C.purple, desc: "Workflow automation" },
  { name: "ChromaDB",       icon: "🧠", color: C.blue,   desc: "Vector database" },
  { name: "Razorpay",       icon: "💳", color: C.blue,   desc: "Payments India" },
  { name: "Telegram",       icon: "✈️", color: C.blue,   desc: "Staff bots" },
  { name: "Groq / LLaMA",   icon: "🤖", color: C.yellow, desc: "AI inference" },
  { name: "FastAPI",        icon: "🚀", color: C.green,  desc: "API backend" },
  { name: "LangGraph",      icon: "🔗", color: C.purple, desc: "Agent orchestration" },
  { name: "Twilio",         icon: "📞", color: C.red,    desc: "Voice & SMS" },
  { name: "WooCommerce",    icon: "🛒", color: C.yellow, desc: "eCommerce" },
  { name: "Zapier / n8n",   icon: "🔧", color: C.gray,   desc: "Workflow bridges" },
  { name: "Stripe / PayTabs",icon:"💰", color: C.green,  desc: "Payments GCC" },
  { name: "OpenAI / Claude",icon: "✨", color: C.purple, desc: "Language models" },
  { name: "WhatsApp Cloud", icon: "☁️", color: C.green,  desc: "Meta Business API" },
];

export function Integrations() {
  return (
    <section id="integrations" style={{ padding: "var(--section-py) clamp(20px,4vw,40px)", background: C.white }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <Label text="Integrations" color={C.blue} />
          <h2 style={{
            fontSize: "clamp(24px,4vw,40px)", fontWeight: 900,
            color: C.dark, letterSpacing: "-0.6px", lineHeight: 1.2,
            maxWidth: 520, margin: "0 auto 14px",
          }}>
            Everything connected. Nothing siloed.
          </h2>
          <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: C.gray, maxWidth: 440, margin: "0 auto", lineHeight: 1.8 }}>
            Remora integrates your existing tools into one unified workflow. No rip-and-replace. No disruption.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
            {INTEGRATIONS.map(({ name, icon, color, desc }, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div key={name}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 10, padding: "22px 14px",
                    background: C.white, borderRadius: 18,
                    border: `1.5px solid ${hov ? color + "60" : C.border}`,
                    boxShadow: hov ? `0 8px 28px ${color}14` : "0 1px 4px rgba(15,23,42,0.04)",
                    transform: hov ? "translateY(-4px)" : "none",
                    transition: `all 0.25s ${E.smooth}`,
                    cursor: "default",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{name}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2} style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: C.muted }}>
            Need a specific integration not listed here?
          </p>
          <a href={`https://wa.me/919999999999?text=${encodeURIComponent("Hi Remora! I need a custom integration for my business.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 700, color: C.blue, textDecoration: "none" }}>
            Ask us — we've built it before →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   HOW WE WORK (process)
   ================================================================ */
const PROCESS = [
  { step: "01", icon: "💬", label: "Discovery call", color: C.blue,
    desc: "We talk. We ask questions about how your business actually runs — the messy real-world version, not the ideal version. No slides. No sales pitch." },
  { step: "02", icon: "🗺️", label: "System map", color: C.purple,
    desc: "We map every data flow, tool, and manual step in your current operation. Identify exactly what to automate, integrate, or replace." },
  { step: "03", icon: "🏗️", label: "Custom build", color: C.red,
    desc: "We build on Odoo, n8n, and our AI stack — configured precisely for your workflow. No off-the-shelf templates. Your processes, your language, your data." },
  { step: "04", icon: "🚀", label: "Live & supported", color: C.green,
    desc: "We go live with you, train your team, and stay on for ongoing support. Remora grows with your business — new modules as you scale." },
];

export function Process() {
  return (
    <section style={{ padding: "var(--section-py) clamp(20px,4vw,40px)", background: C.light }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
          <Label text="How we work" color={C.green} />
          <h2 style={{
            fontSize: "clamp(24px,4vw,40px)", fontWeight: 900,
            color: C.dark, letterSpacing: "-0.6px", lineHeight: 1.2,
            maxWidth: 520, margin: "0 auto 14px",
          }}>
            From discovery to live — in weeks, not months
          </h2>
          <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: C.gray, maxWidth: 440, margin: "0 auto", lineHeight: 1.8 }}>
            We move fast because we've built this stack many times. Your business gets something custom — delivered quickly.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 3, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.border}` }}>
          {PROCESS.map(({ step, icon, label, color, desc }, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div style={{ padding: "36px 28px", background: C.white, height: "100%" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: color + "80", letterSpacing: "1px", marginBottom: 16 }}>{step}</div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: color + "12",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, marginBottom: 10 }}>{label}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.8 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CTA SECTION
   ================================================================ */
export function CTA() {
  return (
    <section style={{
      padding: "var(--section-py) clamp(20px,4vw,40px)",
      background: C.dark, position: "relative", overflow: "hidden",
    }}>
      {/* Ambient blobs on dark bg */}
      {[[C.blue, "-5%", "0%"], [C.purple, "60%", "50%"], [C.green, "5%", "80%"]].map(([color, left, top], i) => (
        <div key={i} style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
          left, top, pointerEvents: "none",
          animation: `float-slow ${8 + i * 2}s ease-in-out ${i * 1}s infinite`,
        }} />
      ))}

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 32 }}>
            <BrandBars h={26} w={7} gap={4} />
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Remora</span>
          </div>

          <h2 style={{
            fontSize: "clamp(28px,5.5vw,52px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: 20,
          }}>
            Ready to connect your<br />entire business?
          </h2>

          <p style={{ fontSize: "clamp(14px,1.6vw,17px)", color: "#94a3b8", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.8 }}>
            Tell us how your business runs. We'll show you exactly how Remora can fix the gaps — custom built, not a template, not a subscription trap.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
            <WABtn text="Start the conversation on WhatsApp" size="lg" green />
          </div>

          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["💬", "Reply within 1 hour"],
              ["🔒", "Your data stays private"],
              ["🛠️", "No commitment to talk"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
                <span>{icon}</span> {text}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
export function Footer() {
  return (
    <footer style={{ background: "#070B12", padding: "60px clamp(20px,4vw,40px) 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 56, flexWrap: "wrap" }}>

          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <BrandBars h={22} w={6} gap={3} />
              <span style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>Remora</span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.8, maxWidth: 260 }}>
              Custom AI + ERP solutions for SMBs in India and the GCC. Not a product. A partner.
            </p>
            <div style={{ marginTop: 20 }}>
              <WABtn text="WhatsApp us" size="sm" green />
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Services</div>
            {["Odoo ERP Implementation", "Voice AI & Call Automation", "RAG & Knowledge Base", "WhatsApp ERP Integration", "n8n Workflow Automation", "AI Chatbot Development", "Custom MCP Agents"].map(s => (
              <div key={s} style={{ fontSize: 13, color: "#475569", marginBottom: 10, lineHeight: 1.4 }}>{s}</div>
            ))}
          </div>

          {/* Industries */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Industries</div>
            {["Clinics & Healthcare", "Law Firms", "Manufacturers", "Builders & Contractors", "Traders & Distributors", "Warehouses & Logistics", "eCommerce Businesses"].map(s => (
              <div key={s} style={{ fontSize: 13, color: "#475569", marginBottom: 10 }}>{s}</div>
            ))}
          </div>
        </div>

        <Divider style={{ borderColor: "#1e293b", height: 1, background: "#1e293b" }} />

        <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12, color: "#334155" }}>© 2025 Remora. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "#334155" }}>India · Saudi Arabia · Oman · Qatar</div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   FLOATING WHATSAPP BUTTON
   ================================================================ */
export function FloatingWA() {
  const [hov, setHov] = useState(false);
  const WA_NUMBER = "919999999999";
  const link = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Remora! I'd like to learn how you can help my business.")}`;

  return (
    <a
      href={link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Chat on WhatsApp"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 500,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov
          ? "0 12px 40px rgba(37,211,102,0.55)"
          : "0 6px 24px rgba(37,211,102,0.4)",
        transform: hov ? "scale(1.1)" : "scale(1)",
        transition: `all 0.25s ${E.spring}`,
        textDecoration: "none",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

