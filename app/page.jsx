import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Industries from "../components/Industries";
import HowItWorks from "../components/HowItWorks";
import { Capabilities, Integrations, Process, CTA, Footer, FloatingWA } from "../components/Sections";

/* Server Component: no "use client" here.
   The interactive sections are client components and load as such. */
export default function Page() {
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
