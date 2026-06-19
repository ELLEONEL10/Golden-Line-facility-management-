import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Packages.css";

interface PackageCardData {
  tagKey: string;
  titleKey: string;
  subKey: string;
  ctaKey: string;
  route: string;
  icon: string;
  accent: string;
}

const PKGS: PackageCardData[] = [
  { tagKey: "pkg.commercial.tag", titleKey: "pkg.commercial.title", subKey: "pkg.commercial.sub", ctaKey: "pkg.commercial.cta", route: "/packages/commercial", icon: "🏢", accent: "pkg-accent-blue" },
  { tagKey: "pkg.residential.tag", titleKey: "pkg.residential.title", subKey: "pkg.residential.sub", ctaKey: "pkg.residential.cta", route: "/packages/residential", icon: "🏠", accent: "pkg-accent-green" },
  { tagKey: "pkg.moveout.tag", titleKey: "pkg.moveout.title", subKey: "pkg.moveout.sub", ctaKey: "pkg.moveout.cta", route: "/packages/moveout", icon: "📦", accent: "pkg-accent-gold" },
  { tagKey: "pkg.movehouse.tag", titleKey: "pkg.movehouse.title", subKey: "pkg.movehouse.sub", ctaKey: "pkg.movehouse.cta", route: "/packages/move-house-cleaning", icon: "🚚", accent: "pkg-accent-gold" },
];

export function Packages() {
  const { lang } = useLang();
  const ref = useScrollReveal();

  return (
    <section className="section pkg-bg" id="pakete" ref={ref}>
      <div className="sec-inner">
        <div className="pkg-header anim from-up">
          <div className="sec-tag">{tr(lang, "pkg.tag")}</div>
          <h2 className="sec-title">{tr(lang, "pkg.title")}</h2>
          <div className="title-bar pkg-title-bar" />
          <p className="sec-sub">{tr(lang, "pkg.sub")}</p>
        </div>

        <div className="pkg-grid">
          {PKGS.map((pkg, i) => (
            <article
              key={pkg.route}
              className={`pkg-card anim from-up ${pkg.accent}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className="pkg-icon" aria-hidden="true">{pkg.icon}</span>
              <span className="pkg-tag">{tr(lang, pkg.tagKey)}</span>
              <h3>{tr(lang, pkg.titleKey)}</h3>
              <p>{tr(lang, pkg.subKey)}</p>
              <Link to={pkg.route} className="pkg-cta">
                {tr(lang, pkg.ctaKey)} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
