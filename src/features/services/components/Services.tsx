import { useMemo } from "react";
import { useLang } from "@/hooks/useLang";
import { tr, SVC, CAT_LBL } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Services.css";

const CATEGORIES = ["commercial", "residential", "specialist"] as const;

export function Services() {
  const { lang } = useLang();
  const ref = useScrollReveal();
  const services = useMemo(() => SVC[lang] ?? SVC.de, [lang]);
  const lbl = useMemo(() => CAT_LBL[lang] ?? CAT_LBL.de, [lang]);

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
          <>
            <div className="svc-summary-grid">
              {CATEGORIES.map((cat, i) => {
                const items = services.filter((s) => s.cat === cat);
                return (
                  <article
                    key={cat}
                    className="svc-summary-card anim from-up"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                    aria-label={lbl[cat] ?? cat}
                  >
                    <h3>{lbl[cat] ?? cat}</h3>
                    <p>{tr(lang, `svc.cat.${cat}.desc`)}</p>
                    <span className="svc-count">{items.length} {tr(lang, "svc.items")}</span>
                  </article>
                );
              })}
            </div>

            <div className="svc-simple-wrap anim from-up">
              <h3 className="svc-simple-title">{tr(lang, "svc.simple.title")}</h3>
              <p className="svc-simple-sub">{tr(lang, "svc.simple.sub")}</p>
              <ul className="svc-simple-list">
                {services.map((s) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
