"use client";
/* ============================================================
   REMORA — Main Page
   Assembles all sections in order
   ============================================================ */
import Navbar       from "../components/Navbar";
import Hero         from "../components/Hero";
import Industries   from "../components/Industries";
import HowItWorks   from "../components/HowItWorks";
import { Capabilities, Integrations, Process, CTA, Footer, FloatingWA } from "../components/Sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Industries />
        <HowItWorks />
        <Capabilities />
        <Integrations />
        <Process />
        <CTA />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}


