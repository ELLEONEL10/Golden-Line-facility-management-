import { useMemo } from "react";
import { useLang } from "@/hooks/useLang";
import { tr, SVC, CAT_BADGE, CAT_LBL } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Services.css";

const CATEGORIES = ["commercial", "residential", "specialist"] as const;

export function Services() {
  const { lang } = useLang();
  const ref = useScrollReveal();
  const services = useMemo(() => SVC[lang] ?? SVC.de, [lang]);
  const lbl = useMemo(() => CAT_LBL[lang] ?? CAT_LBL.de, [lang]);
  const more = tr(lang, "svc.more");

  return (
    <section className="section svc-bg" id="leistungen" ref={ref}>
      <div className="sec-inner">
        <div className="svc-header anim from-up">
          <div className="sec-tag">{tr(lang, "svc.tag")}</div>
          <h2 className="sec-title">{tr(lang, "svc.title")}</h2>
          <div className="title-bar svc-title-bar" />
          <p className="sec-sub">{tr(lang, "svc.sub")}</p>
        </div>

        {services.length === 0 ? (
          <p className="empty-state">{tr(lang, "svc.empty") ?? "No services available."}</p>
        ) : (
          CATEGORIES.map((cat) => (
            <div key={cat}>
              <div className="cat-row anim from-left">{tr(lang, `cat.${cat}`)}</div>
              <div className="svc-grid">
                {services
                  .filter((s) => s.cat === cat)
                  .map((s, i) => (
                    <article
                      key={s.id}
                      className="svc-card anim from-up"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                      aria-label={s.title}
                    >
                      <span className="svc-icon" aria-hidden="true">{s.icon}</span>
                      <span className={`svc-badge ${CAT_BADGE[cat] ?? ""}`}>
                        {lbl[cat] ?? cat}
                      </span>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      {s.slug && (
                        <a href="#anfrage" className="svc-link">
                          {more} →
                        </a>
                      )}
                    </article>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
