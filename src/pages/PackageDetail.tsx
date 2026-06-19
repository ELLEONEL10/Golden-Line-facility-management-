import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./PackageDetail.css";

interface DetailSection {
  titleKey: string;
  paragraphs?: string[];
  items?: string[];
}

export interface PackageDetailData {
  heroTitleKey: string;
  heroSubKey: string;
  heroDescKey: string;
  sections: DetailSection[];
  ctaTitleKey: string;
  ctaSubKey: string;
  accent: string;
  heroIcon: string;
}

interface PackageDetailProps {
  data: PackageDetailData;
}

function DetailSectionBlock({ section }: { section: DetailSection }) {
  const { lang } = useLang();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section className="dpkg-section" ref={ref}>
      <div className="dpkg-section-inner">
        <h2 className="dpkg-section-title anim from-up">{tr(lang, section.titleKey)}</h2>
        {section.paragraphs?.map((pKey, j) => (
          <p
            key={pKey}
            className="dpkg-paragraph anim from-up"
            style={{ transitionDelay: `${0.05 + j * 0.08}s` }}
          >
            {tr(lang, pKey)}
          </p>
        ))}
        {section.items && (
          <ul className="dpkg-list">
            {section.items.map((itemKey, j) => (
              <li
                key={itemKey}
                className="dpkg-list-item anim from-left"
                style={{ transitionDelay: `${0.05 + j * 0.06}s` }}
              >
                {tr(lang, itemKey)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function PackageDetail({ data }: PackageDetailProps) {
  const { lang } = useLang();
  const heroRef = useScrollReveal<HTMLElement>();

  return (
    <div className={`dpkg-page ${data.accent}`}>
      <section className="dpkg-hero" ref={heroRef}>
        <div className="dpkg-hero-inner">
          <Link to="/#pakete" className="dpkg-back anim from-left">
            {tr(lang, "dpkg.back")}
          </Link>
          <span className="dpkg-hero-icon anim from-scale" aria-hidden="true">{data.heroIcon}</span>
          <div className="dpkg-hero-text anim from-up">
            <h1>{tr(lang, data.heroTitleKey)}</h1>
            <p className="dpkg-hero-sub">{tr(lang, data.heroSubKey)}</p>
          </div>
          <p className="dpkg-hero-desc anim from-up">{tr(lang, data.heroDescKey)}</p>
        </div>
      </section>

      {data.sections.map((section, i) => (
        <div key={section.titleKey} className={i % 2 === 1 ? "dpkg-section-alt-wrap" : ""}>
          <DetailSectionBlock section={section} />
        </div>
      ))}

    </div>
  );
}
