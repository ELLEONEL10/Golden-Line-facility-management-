import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/hooks/useLang";
import { useTheme } from "@/hooks/useTheme";
import { tr } from "@/services/i18n";
import logoImg from "@/assets/logo.png";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#leistungen", key: "nav.services" },
  { href: "#ueber-uns", key: "nav.about" },
  { href: "#bewertungen", key: "nav.reviews" },
  { href: "#faq", key: "faq", label: "FAQ" },
] as const;

export function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeMobile]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#" className="nav-logo">
          <img src={logoImg} alt="Golden Line Facility Management Logo" className="nav-logo-img" loading="lazy" />
          <div>
            <div className="logo-txt">Golden Line</div>
            <div className="logo-sub">Facility Management</div>
          </div>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.key === "faq" ? "FAQ" : tr(lang, link.key)}</a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <div className="lang-wrap" role="group" aria-label="Language">
            <button
              className={`lang-btn ${lang === "de" ? "active" : ""}`}
              onClick={() => setLang("de")}
            >DE</button>
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >EN</button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <div className="theme-track">{theme === "dark" ? "🌙" : "☀"}</div>
          </button>
          <a href="#anfrage" className="nav-cta">{tr(lang, "nav.cta")}</a>
        </div>

        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

    <nav className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-label="Mobile navigation">
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href} onClick={closeMobile}>
          {link.key === "faq" ? "FAQ" : tr(lang, link.key)}
        </a>
      ))}
      <a href="#anfrage" onClick={closeMobile} className="mobile-cta">
        {tr(lang, "nav.cta")} →
      </a>
      <div className="mobile-controls">
        <button
          className={`lang-btn ${lang === "de" ? "active" : ""}`}
          onClick={() => { setLang("de"); closeMobile(); }}
        >🇩🇪 DE</button>
        <button
          className={`lang-btn ${lang === "en" ? "active" : ""}`}
          onClick={() => { setLang("en"); closeMobile(); }}
        >🇬🇧 EN</button>
        <button className="theme-toggle theme-toggle-ml" onClick={toggleTheme} aria-label="Toggle dark mode">
          <div className="theme-track">{theme === "dark" ? "🌙" : "☀"}</div>
        </button>
      </div>
    </nav>
    </>
  );
}
