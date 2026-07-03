import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import fullLogoImg from "@/assets/full-logo.png";
import "./Footer.css";
 

const FOOTER_SERVICES = [
  "Gebäudereinigung",
  "Büroreinigung",
  "Glasreinigung",
  "Privatreinigung",
  "Industriereinigung",
  "Desinfektionsservice",
] as const;

export function Footer() {
  const { lang } = useLang();
  

  return (
    <>
      <footer>
        <div className="footer-grid">
          <div>
            <img src={fullLogoImg} alt="Golden Line Facility Management Logo" className="footer-logo" loading="lazy" />
            <p className="f-desc">{tr(lang, "footer.desc")}</p>
            <div className="f-social">
              <a href="#" className="f-soc-btn" aria-label="Facebook">f</a>
              <a href="https://wa.me/4916096383001" className="f-soc-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">W</a>
              <a href="mailto:info@reinigungsservice-potsdam.de" className="f-soc-btn" aria-label="Email">✉</a>
            </div>
          </div>
          <div className="f-col">
            <h4>{tr(lang, "footer.services")}</h4>
            <ul>
              {FOOTER_SERVICES.map((s) => (
                <li><Link to="/#leistungen">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>{tr(lang, "footer.nav")}</h4>
            <ul>
        <li><Link to="/#pakete">{tr(lang, "nav.packages")}</Link></li>
        <li><Link to="/#leistungen">{tr(lang, "nav.services")}</Link></li>
        <li><Link to="/#ueber-uns">{tr(lang, "nav.about")}</Link></li>
        <li><Link to="/#bewertungen">{tr(lang, "nav.reviews")}</Link></li>
        <li><Link to="/#faq">FAQ</Link></li>
        <li><Link to="/#anfrage">{tr(lang, "nav.cta")}</Link></li>
              <li><Link className="footer-link-btn" to="/impressum">{tr(lang, "footer.impr")}</Link></li>
              <li><Link className="footer-link-btn" to="/datenschutz">{tr(lang, "footer.privacy")}</Link></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>{tr(lang, "footer.contact")}</h4>
            <div className="f-ci">📍 <span>Bundesweit Deutschland<br />Für Standortinformationen kontaktieren Sie uns</span></div>
            <div className="f-ci">📞 <a href="tel:+4930555123456">(+49) 30 555-123456</a></div>
            <div className="f-ci">✉ <a href="mailto:info@golden-line-fm.de">info@golden-line-fm.de</a></div>
            <div className="f-ci">🕐 <span>Mo–Fr 08:00–18:00</span></div>
            <div className="f-ci">🌍 <span>Bundesweit Deutschland</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2026 Golden Line Facility Management GmbH</span>
            <a
              href="https://reinigungsservice-potsdam.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-branch-link"
            >
              <span className="footer-branch-dot">◈</span> Ein Unternehmen der GlamPotsdam Gruppe
            </a>
          </div>
          <div>
            <Link className="footer-link-btn" to="/impressum">{tr(lang, "footer.impr")}</Link> &nbsp;·&nbsp;
            <Link className="footer-link-btn" to="/datenschutz">{tr(lang, "footer.privacy")}</Link>
          </div>
        </div>
      </footer>

      
    </>
  );
}
