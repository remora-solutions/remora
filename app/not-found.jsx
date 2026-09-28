import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 14, padding: 24, textAlign: "center", background: "#fff",
    }}>
      <div style={{ display: "flex", gap: 6 }}>
        {["#E8402F", "#F5A623", "#3B82F6", "#3D9A5B"].map((c) => (
          <span key={c} style={{ width: 10, height: 34, borderRadius: 6, background: c }} />
        ))}
      </div>
      <h1 style={{ fontSize: "clamp(32px,6vw,52px)", fontWeight: 900, color: "#0f172a", margin: 0 }}>Page not found</h1>
      <p style={{ color: "#64748b", fontSize: 16, margin: 0 }}>That page doesn’t exist — but the rest of Remora does.</p>
      <Link href="/" style={{
        marginTop: 8, padding: "12px 22px", borderRadius: 12, background: "#0f172a",
        color: "#fff", fontWeight: 700, textDecoration: "none",
      }}>Back to home</Link>
    </main>
  );
}
