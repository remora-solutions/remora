import { ImageResponse } from "next/og";

export const alt = "Remora — Custom AI + ERP for SMBs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80, background: "#ffffff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["#E8402F", "#F5A623", "#3B82F6", "#3D9A5B"].map((c) => (
              <div key={c} style={{ width: 16, height: 56, borderRadius: 8, background: c }} />
            ))}
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#0f172a" }}>Remora</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontSize: 84, fontWeight: 900, lineHeight: 1.05, color: "#0f172a" }}>
          <div>One backbone for every</div>
          <div style={{ color: "#7C3AED" }}>part of your business.</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#64748b" }}>
          Custom AI + ERP for SMBs — India &amp; GCC
        </div>
      </div>
    ),
    { ...size }
  );
}
