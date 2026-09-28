export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://remora-mu.vercel.app/sitemap.xml",
  };
}
