"use client";
import { useState } from "react";
import { C, E } from "../styles/tokens";
import { Reveal, Label, Card, CardHead, WABtn } from "./ui";

const INDUSTRIES = [
  {
    icon: "🏥", label: "Clinics & Healthcare", color: C.red,
    tagline: "Patients first. Paperwork automated.",
    pain: "Appointments missed, follow-ups forgotten, staff drowning in calls, billing delayed by days.",
    solution: "Remora gives your clinic a full patient CRM inside Odoo, WhatsApp appointment reminders, voice-to-notes for doctors, RAG over medical SOPs, and automated GST billing.",
    flows: [
      "Patient calls → AI logs call, books slot, sends WhatsApp confirmation",
      "Doctor speaks post-consultation → notes auto-entered into patient record",
      "Prescription ready → WhatsApp to patient with pickup time",
      "Insurance claim → documents auto-compiled and submitted",
      "Low medicine stock → purchase order raised automatically",
      "Monthly revenue report → generated and sent to clinic owner every Sunday",
    ],
    metrics: [{ v:"80%", l:"less admin time"},{v:"0", l:"missed follow-ups"},{v:"Same day", l:"billing"}],
  },
  {
    icon: "⚖️", label: "Law Firms", color: C.purple,
    tagline: "Every case. Every deadline. Zero leaks.",
    pain: "Case files in different places, SOPs not followed, client updates manual, billing hours untracked.",
    solution: "RAG over your entire case library and legal SOPs, WhatsApp client portal, automated deadline alerts, billable hours tracker integrated with Odoo invoicing.",
    flows: [
      "Client WhatsApps a query → RAG searches case files, replies instantly",
      "New case → intake form auto-routed to right practice group",
      "Court deadline approaching → multi-level WhatsApp alert to lawyer + client",
      "Document ready for review → notification + secure link sent",
      "Billable hours logged by voice → invoice auto-generated",
      "Monthly case status → client update emails sent automatically",
    ],
    metrics: [{ v:"100%", l:"deadline visibility"},{v:"3x", l:"faster client updates"},{v:"0", l:"unbilled hours"}],
  },
  {
    icon: "🏭", label: "Manufacturers", color: C.blue,
    tagline: "WhatsApp order to finished goods — fully tracked.",
    pain: "Orders on WhatsApp never reach production, BOM manual, stock chaos, delivery delays unknown.",
    solution: "WhatsApp order → Odoo Manufacturing Order → BOM → stock deduction → production schedule → dispatch note → customer notification. All connected.",
    flows: [
      "Dealer WhatsApps order → Manufacturing Order created in Odoo",
      "BOM pulled → raw material requirement calculated instantly",
      "Stock below threshold → Purchase Order auto-raised to supplier",
      "Production starts → supervisor gets job card on WhatsApp",
      "QC pass → dispatch note generated, delivery team notified",
      "Goods dispatched → customer gets tracking update on WhatsApp",
    ],
    metrics: [{ v:"Real-time", l:"production visibility"},{v:"0", l:"missed POs"},{v:"Automatic", l:"dispatch notes"}],
  },
  {
    icon: "🏗️", label: "Builders & Contractors", color: C.yellow,
    tagline: "Every site update. Every material. Every rupee tracked.",
    pain: "Site updates by calls, material orders on paper, subcontractor timesheets untracked, client billing delayed.",
    solution: "Site managers update via voice or WhatsApp → project log updated. Material requests → vendor POs. Subcontractor timesheets → WhatsApp check-in. Milestone → invoice.",
    flows: [
      "Site manager speaks update → project timeline in Odoo updated",
      "Material needed → photo on WhatsApp → vendor PO raised",
      "Subcontractor checks in via WhatsApp → timesheet auto-logged",
      "Milestone completed → client invoice triggered automatically",
      "Budget variance → project manager alert with cost breakdown",
      "Client asks for progress → PDF progress report auto-generated",
    ],
    metrics: [{ v:"Live", l:"project cost tracking"},{v:"Same day", l:"subcontractor payment"},{v:"Auto", l:"client updates"}],
  },
  {
    icon: "🏪", label: "Traders & Distributors", color: C.green,
    tagline: "Retailer orders in WhatsApp. ERP updated instantly.",
    pain: "Retailer orders via WhatsApp manually entered into ERP or sheets, margin errors, payment follow-up slow.",
    solution: "Retailer WhatsApps order → Odoo SO created → stock confirmed → invoice → delivery assigned → payment tracked → ledger updated. Nothing falls through.",
    flows: [
      "Retailer sends order list on WhatsApp → Sales Order auto-created in Odoo",
      "Stock checked → unavailable items flagged, ETA sent to retailer",
      "Invoice PDF generated → WhatsApp to retailer in under 60 seconds",
      "Delivery assigned → driver gets route optimized via WhatsApp",
      "Payment received → ledger auto-reconciled, receipt sent",
      "Outstanding balance > 30 days → escalation alert to sales manager",
    ],
    metrics: [{ v:"60 sec", l:"order to invoice"},{v:"Zero", l:"manual data entry"},{v:"Auto", l:"payment follow-ups"}],
  },
  {
    icon: "📦", label: "Warehouses & Logistics", color: C.purple,
    tagline: "Every inbound. Every outbound. Zero guesswork.",
    pain: "GRN manual and slow, picking errors daily, no real-time stock count, returns handled on paper.",
    solution: "WhatsApp GRN with photos, AI-assisted picking, real-time stock dashboard, barcode scanning integration, automated dispatch and returns flow.",
    flows: [
      "Truck arrives → driver sends WhatsApp photo → GRN auto-created",
      "Picking order arrives → AI assigns to nearest picker via app",
      "Item not found → real-time stock alert to supervisor",
      "Order dispatched → tracking link pushed to customer WhatsApp",
      "Customer returns goods → receipt created, stock updated instantly",
      "Weekly stock audit → discrepancy report emailed automatically",
    ],
    metrics: [{ v:"Real-time", l:"stock visibility"},{v:"99%+", l:"pick accuracy"},{v:"Auto", l:"GRN processing"}],
  },
];

function IndustryCard({ industry, delay }) {
  const { icon, label, color, tagline, pain, solution, flows, metrics } = industry;
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <Card accent={color} hover style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
            <div style={{
              width: 54, height: 54, borderRadius: 16, flexShrink: 0,
              background: color + "14", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 26,
              boxShadow: `0 0 0 6px ${color}08`,
            }}>{icon}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>{label}</div>
              <div style={{ fontSize: 12, color: color, fontWeight: 600, marginTop: 4 }}>{tagline}</div>
            </div>
          </div>

          {/* Pain */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.red, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
              Common pain
            </div>
            <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>{pain}</p>
          </div>

          {/* Solution */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
              Remora fixes this
            </div>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{solution}</p>
          </div>

          {/* Metrics */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {metrics.map(({ v, l }) => (
              <div key={l} style={{
                flex: 1, background: color + "08", borderRadius: 12,
                padding: "10px 10px", textAlign: "center",
                border: `1px solid ${color}20`,
              }}>
                <div style={{ fontSize: 16, fontWeight: 900, color, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 4, fontWeight: 500, lineHeight: 1.3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expand button */}
        <div style={{ padding: "0 28px", marginTop: "auto" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              width: "100%", padding: "11px 18px",
              borderRadius: 12, border: `1.5px solid ${color}35`,
              background: open ? color + "08" : "transparent",
              color: color, fontSize: 12, fontWeight: 700,
              cursor: "pointer", transition: `all 0.25s ${E.smooth}`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = color + "12"; }}
            onMouseLeave={e => { e.currentTarget.style.background = open ? color + "08" : "transparent"; }}
          >
            {open ? "Hide workflow ↑" : "See how it works ↓"}
          </button>

          {/* Flows */}
          <div style={{
            maxHeight: open ? `${flows.length * 64}px` : "0px",
            overflow: "hidden",
            transition: `max-height 0.5s ${E.expo}`,
          }}>
            <div style={{ paddingTop: 16, paddingBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {flows.map((flow, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(-8px)",
                  transition: `all 0.35s ${E.expo} ${open ? i * 0.06 : 0}s`,
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: color + "18", border: `1.5px solid ${color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>{flow}</span>
                </div>
              ))}

              <div style={{ marginTop: 8 }}>
                <WABtn
                  text={`Talk about ${label}`}
                  size="sm"
                  msg={`Hi Remora! I run a ${label.toLowerCase()} business and want to understand how you can help.`}
                  style={{ width: "100%", justifyContent: "center" }}
                />
              </div>
            </div>
          </div>
        </div>

        {!open && <div style={{ height: 28 }} />}
      </Card>
    </Reveal>
  );
}

export default function Industries() {
  return (
    <section id="industries" style={{ padding: "var(--section-py) clamp(20px,4vw,40px)", background: C.light }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>

        <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
          <Label text="Industries" color={C.blue} />
          <h2 style={{
            fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 900,
            color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.15,
            maxWidth: 620, margin: "0 auto 16px",
          }}>
            Any business that runs on data — Remora can power it
          </h2>
          <p style={{
            fontSize: "clamp(14px,1.5vw,16px)", color: C.gray,
            maxWidth: 520, margin: "0 auto", lineHeight: 1.8,
          }}>
            We don't sell a generic software package. We study how your business runs and build exactly what it needs — custom, clean, yours.
          </p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.label} industry={ind} delay={i * 0.06} />
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2} style={{ marginTop: 56, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>
            Don't see your industry? We've built for many more.
          </p>
          <WABtn text="Tell us about your business" size="md" />
        </Reveal>
      </div>
    </section>
  );
}

