import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { Modal } from "@/components/ui/Modal";
import fullLogoImg from "@/assets/full-logo.png";
import "./Footer.css";

const IMPRESSUM = (
  <>
    <h1>Impressum</h1>
    <h2>Angaben gemäß § 5 TMG</h2>
    <p><strong>Unternehmensname:</strong> Golden Line Facility Management GmbH<br />
    <strong>Geschäftsbereiche:</strong> Bundesweit in Deutschland</p>
    <h2>Geschäftsführer</h2>
    <p>Name: [Geschäftsführer Name]</p>
    <h2>Kontakt</h2>
    <p>Telefon: (+49) 30 555-123456<br />E-Mail: info@golden-line-fm.de</p>
    <h2>Handelsregister</h2>
    <p>Registergericht: [Amtsgericht]<br />Registernummer: HRB [Nummer]</p>
    <h2>Umsatzsteuer-ID</h2>
    <p>USt-ID: DE[Nummer]</p>
    <h2>Haftungshinweis (§ 7 Abs. 1 TMG)</h2>
    <p>Als Diensteanbieter haften wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen, noch sind wir verpflichtet, Umstände zu erforschen, die auf rechtswidrige Tätigkeit hinweisen.</p>
    <h2>Haftung für Links (§ 8 Abs. 1 TMG)</h2>
    <p>Wir sind für den Inhalt von verlinkten Webseiten nicht verantwortlich. Die Verlinkung erfolgt auf eigene Verantwortung des Benutzers.</p>
    <h2>Urheberrecht</h2>
    <p>Die Inhalte dieser Website sind urheberrechtlich geschützt. Eine Vervielfältigung oder Verbreitung ist ohne schriftliche Genehmigung nicht gestattet.</p>
  </>
);

const DATENSCHUTZ = (
  <>
    <h1>Datenschutzerklärung</h1>
    <h2>1. Verantwortlicher</h2>
    <p><strong>Golden Line Facility Management GmbH</strong><br />
    Deutschland<br />E-Mail: info@golden-line-fm.de<br />Telefon: (+49) 30 555-123456</p>
    <h2>2. Datenschutz auf einen Blick</h2>
    <p>Diese Website erhebt personenbezogene Daten. Die Verarbeitung erfolgt gemäß DSGVO (Datenschutz-Grundverordnung) und TMG (Telemediengesetz).</p>
    <h2>3. Kontaktformular</h2>
    <p>Wenn Sie unser Kontaktformular ausfüllen, werden folgende Daten erhoben: Name, E-Mail, Telefon, Leistungsinteresse, Nachricht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragliche Vorbereitung). Die Daten werden nach Abschluss der Bearbeitung gelöscht.</p>
    <h2>4. Cookies</h2>
    <p>Diese Website setzt keine Tracking-Cookies. Nur technisch notwendige Cookies werden verwendet. Eine Einwilligung ist nicht erforderlich.</p>
    <h2>5. Datensicherheit</h2>
    <p>Ihre Daten werden mit SSL/TLS verschlüsselt übertragen. Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein.</p>
    <h2>6. Ihre Rechte (DSGVO)</h2>
    <p>Sie haben folgende Rechte:<br />
    • Recht auf Auskunft (Art. 15 DSGVO)<br />
    • Recht auf Berichtigung (Art. 16 DSGVO)<br />
    • Recht auf Löschung (Art. 17 DSGVO)<br />
    • Recht auf Einschränkung (Art. 18 DSGVO)<br />
    • Recht auf Datenportabilität (Art. 20 DSGVO)<br />
    • Recht auf Widerspruch (Art. 21 DSGVO)<br />
    Kontaktieren Sie uns: info@golden-line-fm.de</p>
    <h2>7. Schriftarten</h2>
    <p>Diese Website nutzt selbstgehostete Schriftarten (Google Fonts). Keine Daten werden an externe Server übermittelt.</p>
    <h2>8. Externe Links</h2>
    <p>Diese Website enthält Links zu externen Websites. Wir sind nicht verantwortlich für deren Inhalte und Datenschutzpraktiken.</p>
    <h2>9. Beschwerderecht</h2>
    <p>Sie haben das Recht, eine Beschwerde bei einer Datenschutzbehörde einzureichen.</p>
  </>
);

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
  const [imprOpen, setImprOpen] = useState(false);
  const [dschOpen, setDschOpen] = useState(false);

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
                <li key={s}><a href="#leistungen">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>{tr(lang, "footer.nav")}</h4>
            <ul>
              <li><a href="#leistungen">{tr(lang, "nav.services")}</a></li>
              <li><a href="#ueber-uns">{tr(lang, "nav.about")}</a></li>
              <li><a href="#bewertungen">{tr(lang, "nav.reviews")}</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#anfrage">{tr(lang, "nav.cta")}</a></li>
              <li><button className="footer-link-btn" onClick={() => setImprOpen(true)}>{tr(lang, "footer.impr")}</button></li>
              <li><button className="footer-link-btn" onClick={() => setDschOpen(true)}>{tr(lang, "footer.privacy")}</button></li>
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
          <span>© 2026 Golden Line Facility Management GmbH</span>
          <div>
            <button className="footer-link-btn" onClick={() => setImprOpen(true)}>{tr(lang, "footer.impr")}</button> &nbsp;·&nbsp;
            <button className="footer-link-btn" onClick={() => setDschOpen(true)}>{tr(lang, "footer.privacy")}</button>
          </div>
        </div>
      </footer>

      <Modal open={imprOpen} onClose={() => setImprOpen(false)} title="Impressum">
        {IMPRESSUM}
      </Modal>
      <Modal open={dschOpen} onClose={() => setDschOpen(false)} title="Datenschutzerklärung">
        {DATENSCHUTZ}
      </Modal>
    </>
  );
}
