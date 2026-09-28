import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE = "https://remora-mu.vercel.app";
const DESCRIPTION =
  "Remora connects Odoo ERP, automation, voice AI, RAG and chatbots into a single custom system — built for clinics, law firms, manufacturers, traders, builders and any business that runs on data.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Remora — Custom AI + ERP for SMBs | India & GCC",
    template: "%s | Remora",
  },
  description: DESCRIPTION,
  applicationName: "Remora",
  keywords: ["Odoo ERP", "business automation", "WhatsApp automation", "voice AI", "RAG chatbot", "AI for SMBs", "India", "GCC"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Remora",
    title: "Remora — One backbone for every part of your business",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Remora — One backbone for every part of your business",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
