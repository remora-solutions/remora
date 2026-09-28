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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(330px, 100%), 1fr))", gap: 24 }}>
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
   Real brand logos (single-colour SVG marks, official brand colours)
   where a free logo exists; clean generic icons for the rest.
   Logos are the property of their owners and are shown only to
   indicate compatibility ("works with").
   ================================================================ */
const BRAND = {
  odoo: { hex: "#714B67", d: "M21.1002 15.7957c-1.6015 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2979 2.8998-2.8998 2.8998zm0-1.2c.9388.0006 1.7003-.7601 1.7008-1.6989.0004-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zm-6.0655 1.2c-1.6014 0-2.8997-1.2983-2.8997-2.8998s1.2983-2.8997 2.8997-2.8997c1.6015 0 2.8998 1.2982 2.8998 2.8997 0 1.5999-1.2999 2.8998-2.8998 2.8998zm0-1.2c.9389.0006 1.7003-.7601 1.7008-1.6989.0005-.9388-.7602-1.7003-1.699-1.7007h-.0018c-.9388.0004-1.6994.7619-1.699 1.7007.0005.9381.761 1.6985 1.699 1.699zM11.865 12.858c0 1.6199-1.2979 2.9378-2.8977 2.9378s-2.8998-1.314-2.8998-2.9358 1.1799-2.8597 2.8998-2.8597c.6359 0 1.2239.134 1.6998.484v-1.68a.6.6 0 0 1 1.2 0v4.0537h-.002zm-2.8977 1.7399c.9388.0005 1.7002-.7602 1.7007-1.699.0005-.9388-.7602-1.7003-1.699-1.7007h-.0017c-.9389.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699zm-6.0675 1.1979C1.2983 15.7957 0 14.4974 0 12.8959s1.2983-2.8997 2.8998-2.8997 2.8997 1.2982 2.8997 2.8997c0 1.5999-1.2999 2.8998-2.8997 2.8998zm0-1.2c.9388.0006 1.7002-.7601 1.7007-1.699.0005-.9387-.7602-1.7002-1.699-1.7006h-.0017c-.9388.0004-1.6995.7619-1.699 1.7007.0004.9381.7608 1.6985 1.699 1.699z" },
  whatsapp: { hex: "#25D366", d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
  gmail: { hex: "#EA4335", d: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" },
  n8n: { hex: "#EA4B71", d: "M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" },
  razorpay: { hex: "#0C2451", d: "M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" },
  telegram: { hex: "#26A5E4", d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
  fastapi: { hex: "#009688", d: "M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896" },
  langgraph: { hex: "#7FC8FF", d: "M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z" },
  woocommerce: { hex: "#96588A", d: "M.754 9.58a.754.754 0 00-.754.758v2.525c0 .42.339.758.758.758h3.135l1.431.799-.326-.799h2.373a.757.757 0 00.758-.758v-2.525a.757.757 0 00-.758-.758H.754zm2.709.445h.03c.065.001.124.023.179.067a.26.26 0 01.103.19.29.29 0 01-.033.16c-.13.239-.236.64-.322 1.199-.083.541-.114.965-.094 1.267a.392.392 0 01-.039.219.213.213 0 01-.176.12c-.086.006-.177-.034-.263-.124-.31-.316-.555-.788-.735-1.416-.216.425-.375.744-.478.957-.196.376-.363.568-.502.578-.09.007-.166-.069-.233-.228-.17-.436-.352-1.277-.548-2.524a.297.297 0 01.054-.222c.047-.064.116-.095.21-.102.169-.013.265.065.288.238.103.695.217 1.284.336 1.766l.727-1.387c.066-.126.15-.192.25-.199.146-.01.237.083.273.28.083.441.188.817.315 1.136.086-.844.233-1.453.44-1.828a.255.255 0 01.218-.147zm1.293.36c.056 0 .116.006.18.02.232.05.411.177.53.386.107.18.161.395.161.654 0 .343-.087.654-.26.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.158-.659c0-.342.085-.655.258-.937.202-.333.462-.498.78-.498zm2.084 0c.056 0 .116.006.18.02.236.05.411.177.53.386.107.18.16.395.16.654 0 .343-.086.654-.259.94-.2.332-.459.5-.781.5a.88.88 0 01-.18-.022.763.763 0 01-.531-.384 1.287 1.287 0 01-.16-.659c0-.342.087-.655.26-.937.202-.333.462-.498.78-.498zm4.437.047c-.305 0-.546.102-.718.304-.173.203-.256.49-.256.856 0 .395.086.697.256.906.17.21.418.316.744.316.315 0 .559-.107.728-.316.17-.21.256-.504.256-.883s-.087-.673-.26-.879c-.176-.202-.424-.304-.75-.304zm-1.466.002a1.13 1.13 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.505.336.861.336.103 0 .22-.016.346-.052v-.54c-.117.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm12.414 0a1.135 1.135 0 00-.84.326c-.223.22-.332.499-.332.838 0 .362.108.658.328.88.22.223.506.336.861.336.103 0 .22-.016.346-.052v-.54c-.116.034-.216.051-.303.051a.545.545 0 01-.422-.177c-.106-.12-.16-.278-.16-.48 0-.19.053-.348.156-.468a.498.498 0 01.397-.181c.103 0 .212.015.332.049v-.537a1.394 1.394 0 00-.363-.045zm-9.598.06l-.29 2.264h.579l.156-1.559.395 1.559h.412l.379-1.555.164 1.555h.603l-.304-2.264h-.791l-.12.508c-.03.13-.06.264-.087.4l-.067.352a29.97 29.97 0 00-.258-1.26h-.771zm2.768 0l-.29 2.264h.579l.156-1.559.396 1.559h.412l.375-1.555.165 1.555h.603l-.305-2.264h-.789l-.119.508c-.03.13-.06.264-.086.4l-.066.352c-.063-.352-.15-.771-.26-1.26h-.771zm3.988 0v2.264h.611v-1.031h.012l.494 1.03h.645l-.489-1.019a.61.61 0 00.37-.552.598.598 0 00-.25-.506c-.167-.123-.394-.186-.68-.186h-.713zm3.377 0v2.264H24v-.483h-.63v-.414h.54v-.468h-.54v-.416h.626v-.483H22.76zm-4.793.004v2.264h1.24v-.483h-.627v-.416h.541v-.468h-.54v-.415h.622v-.482h-1.236zm2.025.432c.146.003.25.025.313.072.063.046.091.12.091.227 0 .156-.135.236-.404.24v-.54zm-15.22.011c-.104 0-.205.069-.301.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.016-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm2.083 0c-.103 0-.204.069-.3.211a1.078 1.078 0 00-.2.639c0 .096.02.2.06.303.049.13.117.198.196.215.083.016.173-.02.27-.106.123-.11.205-.273.252-.492.013-.077.023-.16.023-.246 0-.097-.02-.2-.06-.303-.05-.13-.116-.198-.196-.215a.246.246 0 00-.045-.006zm4.428.006c.233 0 .354.218.354.66-.004.273-.038.46-.098.553a.293.293 0 01-.262.139.266.266 0 01-.242-.139c-.056-.093-.084-.28-.084-.562 0-.436.11-.65.332-.65Z" },
  zapier: { hex: "#FF4F00", d: "M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm10.61 8.761h.03a.577.577 0 0 1 .23.038.585.585 0 0 1 .201.124.63.63 0 0 1 .162.431.612.612 0 0 1-.162.435.58.58 0 0 1-.201.128.58.58 0 0 1-.23.042.529.529 0 0 1-.235-.042.585.585 0 0 1-.332-.328.559.559 0 0 1-.038-.235.613.613 0 0 1 .17-.431.59.59 0 0 1 .405-.162Zm2.853 1.572c.03.004.061.004.095.004.325-.011.646.064.937.219.238.144.431.355.552.609.128.279.189.582.185.888v.193a2 2 0 0 1 0 .219h-2.498c.003.227.075.45.204.642a.78.78 0 0 0 .646.265.714.714 0 0 0 .484-.136.642.642 0 0 0 .23-.318l.915.257a1.398 1.398 0 0 1-.28.537c-.14.159-.321.284-.521.355a2.234 2.234 0 0 1-.836.136 1.923 1.923 0 0 1-1.001-.245 1.618 1.618 0 0 1-.665-.703 2.221 2.221 0 0 1-.227-1.036 1.95 1.95 0 0 1 .48-1.398 1.9 1.9 0 0 1 1.3-.488Zm-9.607.023c.162.004.325.026.48.079.207.065.4.174.563.314.26.302.393.692.366 1.088v2.276H8.53l-.109-.711h-.065c-.064.163-.155.31-.272.439a1.122 1.122 0 0 1-.374.264 1.023 1.023 0 0 1-.453.083 1.334 1.334 0 0 1-.866-.264.965.965 0 0 1-.329-.801.993.993 0 0 1 .076-.431 1.02 1.02 0 0 1 .242-.363 1.478 1.478 0 0 1 1.043-.303h.952v-.181a.696.696 0 0 0-.136-.454.553.553 0 0 0-.438-.154.695.695 0 0 0-.378.086.48.48 0 0 0-.193.254l-.99-.144a1.26 1.26 0 0 1 .257-.563c.14-.174.321-.302.533-.378.261-.091.54-.136.82-.129.053-.003.106-.007.163-.007Zm4.384.007c.174 0 .347.038.506.114.182.083.34.211.458.374.257.423.377.911.351 1.406a2.53 2.53 0 0 1-.355 1.448 1.148 1.148 0 0 1-1.009.517c-.204 0-.401-.045-.582-.136a1.052 1.052 0 0 1-.48-.457 1.298 1.298 0 0 1-.114-.234h-.045l.004 1.784h-1.059v-4.713h.904l.117.805h.057c.068-.208.177-.401.328-.56a1.129 1.129 0 0 1 .843-.344h.076v-.004Zm7.559.084h.903l.113.805h.053a1.37 1.37 0 0 1 .235-.484.813.813 0 0 1 .313-.242.82.82 0 0 1 .39-.076h.234v1.051h-.401a.662.662 0 0 0-.313.008.623.623 0 0 0-.272.155.663.663 0 0 0-.174.26.683.683 0 0 0-.027.314v1.875h-1.054v-3.666Zm-17.515.003h3.262v.896L3.73 13.104l.034.113h1.973l.042.9H2.4v-.9l1.931-1.754-.045-.117H2.441v-.896Zm11.815 0h1.055v3.659h-1.055V10.45Zm3.443.684.019.016a.69.69 0 0 0-.351.045.756.756 0 0 0-.287.204c-.11.155-.174.336-.189.522h1.545c-.034-.526-.257-.787-.74-.787h.003Zm-5.718.163c-.026 0-.057 0-.083.004a.78.78 0 0 0-.31.053.746.746 0 0 0-.257.189 1.016 1.016 0 0 0-.204.695v.064c-.015.257.057.507.204.711a.634.634 0 0 0 .253.196.638.638 0 0 0 .314.061.644.644 0 0 0 .578-.265c.14-.223.204-.48.189-.74a1.216 1.216 0 0 0-.181-.711.677.677 0 0 0-.503-.257Zm-4.509 1.266a.464.464 0 0 0-.268.102.373.373 0 0 0-.114.276c0 .053.008.106.027.155a.375.375 0 0 0 .087.132.576.576 0 0 0 .397.11v.004a.863.863 0 0 0 .563-.182.573.573 0 0 0 .211-.457v-.14h-.903Z" },
  stripe: { hex: "#635BFF", d: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" },
  claude: { hex: "#D97757", d: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" },
  meta: { hex: "#0467DF", d: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" },
};

/* Generic icons for tools without a free official logo */
const GLYPH = {
  db: {
    color: "#F5A623",
    node: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </>
    ),
  },
  chip: {
    color: "#F55036",
    node: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </>
    ),
  },
  phone: {
    color: "#F22F46",
    node: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  card: {
    color: "#2F6FED",
    node: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
  },
  spark: {
    color: "#10A37F",
    node: (
      <>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M19 15v4M17 17h4" />
      </>
    ),
  },
};

function BrandIcon({ id, size = 30 }) {
  const b = BRAND[id];
  if (b) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={b.hex} role="img" aria-hidden="true">
        <path d={b.d} />
      </svg>
    );
  }
  const g = GLYPH[id];
  if (!g) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={g.color}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {g.node}
    </svg>
  );
}

const INTEGRATIONS = [
  { name: "Odoo ERP",         icons: ["odoo"],              color: C.red,    desc: "Core ERP platform" },
  { name: "WhatsApp",         icons: ["whatsapp"],          color: C.green,  desc: "Business messaging" },
  { name: "Gmail",            icons: ["gmail"],             color: C.red,    desc: "Email integration" },
  { name: "n8n",              icons: ["n8n"],               color: C.purple, desc: "Workflow automation" },
  { name: "ChromaDB",         icons: ["db"],                color: C.blue,   desc: "Vector database" },
  { name: "Razorpay",         icons: ["razorpay"],          color: C.blue,   desc: "Payments India" },
  { name: "Telegram",         icons: ["telegram"],          color: C.blue,   desc: "Staff bots" },
  { name: "Groq / LLaMA",     icons: ["chip", "meta"],      color: C.yellow, desc: "AI inference" },
  { name: "FastAPI",          icons: ["fastapi"],           color: C.green,  desc: "API backend" },
  { name: "LangGraph",        icons: ["langgraph"],         color: C.purple, desc: "Agent orchestration" },
  { name: "Twilio",           icons: ["phone"],             color: C.red,    desc: "Voice & SMS" },
  { name: "WooCommerce",      icons: ["woocommerce"],       color: C.yellow, desc: "eCommerce" },
  { name: "Zapier / n8n",     icons: ["zapier", "n8n"],     color: C.gray,   desc: "Workflow bridges" },
  { name: "Stripe / PayTabs", icons: ["stripe", "card"],    color: C.green,  desc: "Payments GCC" },
  { name: "OpenAI / Claude",  icons: ["spark", "claude"],   color: C.purple, desc: "Language models" },
  { name: "WhatsApp Cloud",   icons: ["whatsapp", "meta"],  color: C.green,  desc: "Meta Business API" },
];

function IntegrationTile({ name, icons, color, desc }) {
  const [hov, setHov] = useState(false);
  const size = icons.length > 1 ? 26 : 32;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 12, padding: "22px 14px",
        background: C.white, borderRadius: 18,
        border: `1.5px solid ${hov ? color + "60" : C.border}`,
        boxShadow: hov ? `0 8px 28px ${color}14` : "0 1px 4px rgba(15,23,42,0.04)",
        transform: hov ? "translateY(-4px)" : "none",
        transition: `all 0.25s ${E.smooth}`,
        cursor: "default",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 36,
        transform: hov ? "scale(1.12)" : "scale(1)",
        transition: `transform 0.3s ${E.spring}`,
      }}>
        {icons.map((id) => <BrandIcon key={id} id={id} size={size} />)}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{name}</div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{desc}</div>
      </div>
    </div>
  );
}

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(150px, 100%), 1fr))", gap: 14 }}>
            {INTEGRATIONS.map((item) => (
              <IntegrationTile key={item.name} {...item} />
            ))}
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: 3, borderRadius: 24, overflow: "hidden", border: `1px solid ${C.border}` }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 40, marginBottom: 56 }}>

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
