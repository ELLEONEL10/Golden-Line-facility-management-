import { Link } from "react-router-dom";
import "./LegalPages.css";

export function ImpressumPage() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p><strong>Unternehmensname:</strong> Golden Line Facility Management GmbH</p>
        <p><strong>Geschäftsführer / Inhaber:</strong> [Bitte Namen eintragen]</p>
        <p><strong>Adresse:</strong> [Straße, Hausnummer, PLZ, Ort]</p>
        <p><strong>Kontakt:</strong> Telefon: [Telefonnummer] · E‑Mail: [E‑Mail-Adresse]</p>

        <h2>Handelsregister</h2>
        <p>Registergericht: [Amtsgericht] · Registernummer: [HRB ...]</p>

        <h2>Umsatzsteuer-ID</h2>
        <p>USt-ID: [DE... oder leer]</p>

        <h2>Haftungshinweis</h2>
        <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>

        <p>Zurück zur <Link to="/">Startseite</Link>.</p>
      </div>
    </main>
  );
}

export default ImpressumPage;
