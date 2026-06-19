import { useMemo } from "react";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import type { UspItem } from "@/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./About.css";

const INFO_POINTS = [
  { key: "about.point1" },
  { key: "about.point2" },
  { key: "about.point3" },
] as const;

const USPS: { icon: string; titleKey: string; descKey: string }[] = [
  { icon: "🔄", titleKey: "usp1.title", descKey: "usp1.desc" },
  { icon: "📋", titleKey: "usp2.title", descKey: "usp2.desc" },
  { icon: "💡", titleKey: "usp3.title", descKey: "usp3.desc" },
  { icon: "🤝", titleKey: "usp4.title", descKey: "usp4.desc" },
];

export function About() {
  const { lang } = useLang();
  const ref = useScrollReveal();

  const uspItems: UspItem[] = useMemo(
    () => USPS.map((u) => ({
      icon: u.icon,
      title: tr(lang, u.titleKey),
      desc: tr(lang, u.descKey),
    })),
    [lang]
  );

  return (
    <section className="section about-bg" id="ueber-uns" ref={ref}>
      <div className="sec-inner">
        <div className="about-grid">
          <div className="anim from-right">
            <div className="about-visual">
              <div className="about-img">
                <img
                  src="/Ruckseite.png"
                  alt="Golden Line Facility Management Logo"
                  className="about-image"
                />
                <div className="about-overlay" />
                <div className="about-caption">
                  <h3>GLFM</h3>
                  <p>Golden Line Facility Management</p>
                </div>
              </div>
              <div className="about-badge">
                <div className="ab-num">★★★★★</div>
                <div className="ab-lbl">{tr(lang, "about.badge")}</div>
              </div>
            </div>
          </div>
          <div className="anim from-left">
            <div className="sec-tag">{tr(lang, "about.tag")}</div>
            <h2 className="sec-title">
              <span>{tr(lang, "about.title1")}</span> <em>GLFM?</em>
            </h2>
            <div className="title-bar" />
            <p className="about-desc">{tr(lang, "about.desc")}</p>
            <ul className="about-points" aria-label={tr(lang, "about.points.label")}> 
              {INFO_POINTS.map((point) => (
                <li key={point.key}>{tr(lang, point.key)}</li>
              ))}
            </ul>
            <ul className="usp-list">
              {uspItems.map((usp, i) => (
                <li
                  key={usp.title}
                  className="usp-item anim from-left"
                  style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
                >
                  <div className="usp-ico">{usp.icon}</div>
                  <div className="usp-body">
                    <h4>{usp.title}</h4>
                    <p>{usp.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#anfrage" className="btn-gold">{tr(lang, "about.cta")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
