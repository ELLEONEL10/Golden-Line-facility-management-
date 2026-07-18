import { useState, useCallback } from "react";
import { useLang } from "@/hooks/useLang";
import { tr, SERVICE_OPTIONS_DE, SERVICE_OPTIONS_EN } from "@/services/i18n";
import { TextInput, TextArea, SelectInput } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Contact.css";

const CONTACT_INFO: {
  icon: string;
  labelKey: string;
  value?: string;
  valueKey?: string;
  href?: string;
}[] = [
  { icon: "📞", labelKey: "ci.phone", value: "+49 160 963-83001", href: "tel:+4916096383001" },
  { icon: "✉", labelKey: "ci.email", value: "info@gl-fm.de", href: "mailto:info@gl-fm.de" },
  { icon: "📍", labelKey: "ci.address", value: "Gerlachstr. 31, 14480 Potsdam", href: "https://maps.google.com/?q=Gerlachstr.+31+14480+Potsdam" },
  { icon: "🌍", labelKey: "ci.region", valueKey: "ci.regionval" },
  { icon: "🕐", labelKey: "ci.hours", value: "Mo–Fr 08:00–18:00 Uhr" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  gdpr: boolean;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  gdpr?: string;
}

export function Contact() {
  const { lang } = useLang();
  const ref = useScrollReveal();
  const serviceOptions = lang === "de" ? SERVICE_OPTIONS_DE : SERVICE_OPTIONS_EN;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    gdpr: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [dschOpen, setDschOpen] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const updateField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as keyof FormErrors];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (form.name.trim().length < 2) e.name = tr(lang, "form.name.err");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = tr(lang, "form.email.err");
    if (form.phone.trim().length < 5) e.phone = tr(lang, "form.phone.err");
    if (!form.service) e.service = tr(lang, "form.service.err");
    if (!form.gdpr) e.gdpr = tr(lang, "form.gdpr.err");
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, lang]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(false);
      if (!validate()) return;

      if (form.honeypot) {
        setSubmitted(true);
        return;
      }

        setLoading(true);
        try {
          const res = await fetch("https://formsubmit.co/info@gl-fm.de", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              _subject: "Neue Anfrage – Golden Line Facility Management",
              name: form.name,
              email: form.email,
              phone: form.phone,
              service: form.service,
              message: form.message,
              gdprConsent: form.gdpr ? "Ja" : "Nein",
            }),
          });
          if (!res.ok) throw new Error("Server error");
        } catch {
          setSubmitError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setSubmitted(true);
        setSuccessVisible(true);
    },
    [form, validate]
  );

  return (
    <section className="section contact-bg" id="anfrage" ref={ref}>
      <div className="sec-inner">
        <div className="contact-grid">
          <div className="anim from-right">
            <div className="sec-tag">{tr(lang, "contact.tag")}</div>
            <h2 className="sec-title">{tr(lang, "contact.title")}</h2>
            <div className="title-bar" />
            <p className="contact-sub">{tr(lang, "contact.sub")}</p>

            <ul className="ci-list">
              {CONTACT_INFO.map((ci) => (
                <li key={ci.labelKey} className="ci-row">
                  <div className="ci-ico">{ci.icon}</div>
                  <div className="ci-body">
                    <strong>{tr(lang, ci.labelKey)}</strong>
                    {ci.href ? (
                      <a href={ci.href}>{ci.value}</a>
                    ) : (
                      <span>{ci.valueKey ? tr(lang, ci.valueKey) : ci.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/4916096383001"
              className="wa-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{tr(lang, "contact.wa")}</span>
            </a>

            <div className="social-row">
              <span className="social-label">Folgen Sie uns</span>
              <div className="social-links">
                <a href="https://www.tiktok.com/@glfm.ug" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://www.instagram.com/glfm.ug/" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61591700787343" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="anim from-left">
            <div className="form-card">
              {submitted ? (
                <div className={`form-ok ${successVisible ? "form-ok-visible" : ""}`}>
                  <span className="form-ok-icon">✅</span>
                  <h3>{tr(lang, "form.ok.title")}</h3>
                  <p>
                    {tr(lang, "form.ok.desc")}
                    <a href="tel:+4916096383001" className="gdpr-link">
                      +49 160 963-83001
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <h3>{tr(lang, "form.title")}</h3>
                  <p className="form-sub">{tr(lang, "form.sub")}</p>
                  <form onSubmit={handleSubmit} noValidate>
                  {loading && <div className="form-skeleton-overlay" />}
                    <input
                      type="text"
                      name="website"
                      className="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.honeypot}
                      onChange={(e) => updateField("honeypot", e.target.value)}
                    />
                    <div className="f-grid">
                      <div className="f-row">
                        <TextInput
                          id="fn"
                          label={tr(lang, "form.name")}
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          error={errors.name}
                          hasError={!!errors.name}
                          required
                          minLength={2}
                        />
                        <TextInput
                          id="fe"
                          label={tr(lang, "form.email")}
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          error={errors.email}
                          hasError={!!errors.email}
                          required
                        />
                      </div>
                      <div className="f-row">
                        <TextInput
                          id="fp"
                          label={tr(lang, "form.phone")}
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          error={errors.phone}
                          hasError={!!errors.phone}
                          required
                        />
                        <SelectInput
                          id="fs"
                          label={tr(lang, "form.service")}
                          options={serviceOptions}
                          placeholder={tr(lang, "form.service.ph")}
                          value={form.service}
                          onChange={(e) => updateField("service", e.target.value)}
                          error={errors.service}
                          hasError={!!errors.service}
                          required
                        />
                      </div>
                      <TextArea
                        id="fm"
                        label={tr(lang, "form.msg")}
                        placeholder={tr(lang, "form.msg.ph")}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                      />
                      <div className="gdpr-wrap">
                        <input
                          type="checkbox"
                          id="fgdpr"
                          checked={form.gdpr}
                          onChange={(e) => {
                            updateField("gdpr", e.target.checked);
                            if (errors.gdpr) setErrors((prev) => { const n = { ...prev }; delete n.gdpr; return n; });
                          }}
                          required
                        />
                <label htmlFor="fgdpr">
                  <span>{tr(lang, "form.gdpr1")}</span>
                  <button type="button" className="gdpr-link" onClick={() => setDschOpen(true)}>
                    {tr(lang, "form.gdpr2")}
                  </button>
                  <span>{tr(lang, "form.gdpr3")}</span>
                </label>
                      </div>
                      {errors.gdpr && <span className="gdpr-err">{errors.gdpr}</span>}
                      {submitError && (
                        <div className="err-toast">
                          ⚠ {tr(lang, "form.error")}
                        </div>
                      )}
                      <button
                        type="submit"
                        className={`btn-submit ${loading ? "loading" : ""}`}
                        disabled={loading}
                      >
                        <span className="submit-label">✉ {tr(lang, "form.submit")}</span>
                        {loading && <span className="btn-spinner" />}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
      </div>
    </div>

    <Modal open={dschOpen} onClose={() => setDschOpen(false)} title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p><strong>Golden Line Facility Management GmbH</strong><br />
      Ein Unternehmen der GlamPotsdam Gruppe<br />
      Gerlachstr. 31, 14480 Potsdam, Deutschland<br />E-Mail: info@gl-fm.de<br />Telefon: +49 160 963-83001</p>
      <h2>2. Kontaktformular</h2>
      <p>Wenn Sie unser Kontaktformular ausfüllen, werden folgende Daten erhoben: Name, E-Mail, Telefon, Leistungsinteresse, Nachricht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nach Abschluss der Bearbeitung gelöscht.</p>
      <h2>3. Ihre Rechte (DSGVO)</h2>
      <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenportabilität und Widerspruch. Kontaktieren Sie uns: info@gl-fm.de</p>
    </Modal>
    </section>
  );
}
