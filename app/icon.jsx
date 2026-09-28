import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 3, background: "#ffffff", borderRadius: 7,
      }}>
        {["#E8402F", "#F5A623", "#3B82F6", "#3D9A5B"].map((c) => (
          <div key={c} style={{ width: 5, height: 20, borderRadius: 3, background: c }} />
        ))}
      </div>
    ),
    { ...size }
  );
}
