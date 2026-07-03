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
  { icon: "📍", labelKey: "ci.address", value: "Kontaktieren Sie uns für Ihre Region" },
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
        await new Promise((r) => setTimeout(r, 1600));
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
      Deutschland<br />E-Mail: info@gl-fm.de<br />Telefon: +49 160 963-83001</p>
      <h2>2. Kontaktformular</h2>
      <p>Wenn Sie unser Kontaktformular ausfüllen, werden folgende Daten erhoben: Name, E-Mail, Telefon, Leistungsinteresse, Nachricht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nach Abschluss der Bearbeitung gelöscht.</p>
      <h2>3. Ihre Rechte (DSGVO)</h2>
      <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenportabilität und Widerspruch. Kontaktieren Sie uns: info@gl-fm.de</p>
    </Modal>
    </section>
  );
}
