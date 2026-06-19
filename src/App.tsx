import { Routes, Route } from "react-router-dom";
import { Navbar, Footer, FloatingButtons, CursorGlow, ScrollToTop } from "@/components/layout";
import { Hero } from "@/features/hero";
import { Band } from "@/features/band";
import { Services } from "@/features/services";
import { Packages } from "@/features/packages";
import { About } from "@/features/about";
import { Reviews } from "@/features/reviews";
import { Contact } from "@/features/contact";
import { Faq } from "@/features/faq";
import { CtaBand } from "@/features/cta";
import { CommercialPage } from "@/pages/CommercialPage";
import { ResidentialPage } from "@/pages/ResidentialPage";
import { MoveoutPage } from "@/pages/MoveoutPage";
import { MoveHousePage } from "@/pages/MoveHousePage";
import { ImpressumPage } from "@/pages/ImpressumPage";
import { DatenschutzPage } from "@/pages/DatenschutzPage";

export function HomePage() {
  return (
    <>
      <Hero />
      <Band />
      <Packages />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <Faq />
    </>
  );
}

export function App() {
  return (
    <>
      <CursorGlow />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages/commercial" element={<CommercialPage />} />
          <Route path="/packages/residential" element={<ResidentialPage />} />
          <Route path="/packages/moveout" element={<MoveoutPage />} />
          <Route path="/packages/move-house-cleaning" element={<MoveHousePage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
        </Routes>
      </main>
      <CtaBand />
      <Footer />
      <FloatingButtons />
    </>
  );
}
