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

function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <a href="tel:+4916096383001" className="top-bar-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            +49 160 963-83001
          </a>
          <span className="top-bar-sep">|</span>
          <a href="mailto:info@gl-fm.de" className="top-bar-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 4l-8 5-8-5v2l8 5 8-5V8z"/></svg>
            info@gl-fm.de
          </a>
        </div>
        <div className="top-bar-right">
          <a href="https://www.facebook.com/profile.php?id=61591700787343" className="top-bar-social" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/glfm.ug/" className="top-bar-social" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@glfm.ug" className="top-bar-social" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

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
      <TopBar />
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
