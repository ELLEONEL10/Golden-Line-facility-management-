import { Navbar, Footer, FloatingButtons, CursorGlow } from "@/components/layout";
import { Hero } from "@/features/hero";
import { Band } from "@/features/band";
import { Services } from "@/features/services";
import { About } from "@/features/about";
import { Reviews } from "@/features/reviews";
import { Contact } from "@/features/contact";
import { Faq } from "@/features/faq";
import { CtaBand } from "@/features/cta";

export function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Band />
        <Services />
        <About />
        <Reviews />
        <Contact />
        <Faq />
      </main>
      <CtaBand />
      <Footer />
      <FloatingButtons />
    </>
  );
}
