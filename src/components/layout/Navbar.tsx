import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { useTheme } from "@/hooks/useTheme";
import { tr } from "@/services/i18n";
import logoImg from "@/assets/logo.png";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#pakete", key: "nav.packages", to: "/" },
  { href: "#leistungen", key: "nav.services", to: "/" },
  { href: "#ueber-uns", key: "nav.about", to: "/" },
  { href: "#bewertungen", key: "nav.reviews", to: "/" },
  { href: "#faq", key: "faq", to: "/", label: "FAQ" },
] as const;

export function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

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

  const handleNavClick = useCallback((href: string, to: string) => {
    closeMobile();
    if (to === "/" && isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(to + href);
    }
  }, [closeMobile, isHome, navigate]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Golden Line Facility Management Logo" className="nav-logo-img" loading="lazy" />
          <div>
            <div className="logo-txt">Golden Line</div>
            <div className="logo-sub">Facility Management</div>
          </div>
          <a
            href="https://reinigungsservice-potsdam.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-branch-badge"
            title="Ein Unternehmen der GlamPotsdam Gruppe"
          >
            <span className="branch-icon">◈</span>
            <span className="branch-text">GlamPotsdam Gruppe</span>
          </a>
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                className="nav-link-btn"
                onClick={() => handleNavClick(link.href, link.to)}
              >
                {link.key === "faq" ? "FAQ" : tr(lang, link.key)}
              </button>
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
          <button
            className="nav-cta"
            onClick={() => handleNavClick("#anfrage", "/")}
          >
            {tr(lang, "nav.cta")}
          </button>
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
          <button
            key={link.href}
            className="nav-link-btn"
            onClick={() => handleNavClick(link.href, link.to)}
          >
            {link.key === "faq" ? "FAQ" : tr(lang, link.key)}
          </button>
        ))}
        <button
          className="mobile-cta"
          onClick={() => handleNavClick("#anfrage", "/")}
        >
          {tr(lang, "nav.cta")} →
        </button>
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
