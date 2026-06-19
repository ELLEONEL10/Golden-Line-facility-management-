import { Link } from "react-router-dom";
import "./LegalPages.css";

export function DatenschutzPage() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <h1>Datenschutzerklärung</h1>
        <h2>Verantwortlicher</h2>
        <p><strong>Golden Line Facility Management GmbH</strong><br />[Adresse eintragen]<br />E‑Mail: [E‑Mail‑Adresse]</p>

        <h2>Erhobene Daten</h2>
        <p>Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen (z. B. via Kontaktformular). Verarbeitungszwecke und Rechtsgrundlagen sind im Kontaktformular verlinkt.</p>

        <h2>Kontaktformular</h2>
        <p>Bei Nutzung des Kontaktformulars verarbeiten wir Name, E‑Mail, Telefon, Leistungsinteresse und Nachricht zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>

        <h2>Cookies & Analytics</h2>
        <p>Diese Website verwendet keine Tracking‑Cookies. Falls Sie Analytics oder andere Drittanbieter-Dienste aktivieren möchten, fügen Sie diese Informationen hier hinzu.</p>

        <h2>Ihre Rechte</h2>
        <p>Sie haben Auskunfts-, Berichtigungs-, Löschungs- und Widerspruchsrechte. Zur Ausübung wenden Sie sich bitte an: [E‑Mail‑Adresse].</p>

        <p>Zurück zur <Link to="/">Startseite</Link>.</p>
      </div>
    </main>
  );
}

export default DatenschutzPage;
