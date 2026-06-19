import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import type { ReviewItem } from "@/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Reviews.css";

export function Reviews() {
  const { lang } = useLang();
  const ref = useScrollReveal();

  const reviews: ReviewItem[] = [
    {
      stars: "★★★★★",
      text: tr(lang, "review1.text"),
      initials: "MK",
      name: "M. Krause",
      loc: tr(lang, "review1.loc"),
    },
    {
      stars: "★★★★★",
      text: tr(lang, "review2.text"),
      initials: "AS",
      name: "A. Schmidt",
      loc: tr(lang, "review2.loc"),
    },
    {
      stars: "★★★★★",
      text: tr(lang, "review3.text"),
      initials: "BW",
      name: "B. Wagner",
      loc: tr(lang, "review3.loc"),
    },
  ];

  return (
    <section className="section rev-bg" id="bewertungen" ref={ref}>
      <div className="sec-inner">
        <div className="anim from-up rev-header">
          <div className="sec-tag">{tr(lang, "reviews.tag")}</div>
          <h2 className="sec-title">{tr(lang, "reviews.title")}</h2>
          <div className="title-bar rev-title-bar" />
        </div>
        <div className="rev-grid">
          {reviews.length === 0 ? (
            <p className="empty-state">{tr(lang, "reviews.empty") ?? "No reviews yet."}</p>
          ) : (
            reviews.map((r, i) => (
              <article
                key={r.initials}
                className="rev-card anim from-scale"
                style={{ transitionDelay: `${0.05 + i * 0.1}s` }}
              >
                <div className="r-stars">{r.stars}</div>
                <blockquote className="r-text">{r.text}</blockquote>
                <div className="r-author">
                  <div className="r-avatar">{r.initials}</div>
                  <div>
                    <div className="r-name">{r.name}</div>
                    <div className="r-loc">{r.loc}</div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
