import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { tr, getFaqs } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Faq.css";

export function Faq() {
  const { lang } = useLang();
  const ref = useScrollReveal();
  const faqs = getFaqs(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section faq-bg" id="faq" ref={ref}>
      <div className="sec-inner">
        <div className="faq-layout">
          <div className="anim from-right">
            <div className="sec-tag">FAQ</div>
            <h2 className="sec-title">
              <span>{tr(lang, "faq.title1")}</span> <em>{tr(lang, "faq.title2")}</em>
            </h2>
            <div className="title-bar" />
            <p className="faq-sub">{tr(lang, "faq.sub")}</p>
            <br />
            <a href="tel:+4916096383001" className="btn-gold faq-cta">
              📞 <span>{tr(lang, "faq.cta")}</span>
            </a>
          </div>
      <div className="faq-list anim from-left">
        {faqs.length === 0 ? (
          <p className="empty-state">{tr(lang, "faq.empty") ?? "No questions available."}</p>
        ) : (
          faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item anim from-up ${openIndex === i ? "open" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <button
                  className="faq-btn"
                  aria-expanded={openIndex === i}
                  onClick={() => handleToggle(i)}
                >
                  <span>{faq.question}</span>
                  <div className="faq-arrow">▾</div>
                </button>
                <div className="faq-answer" role="region">
                  <div className="faq-answer-inner">{faq.answer}</div>
                </div>
      </div>
      ))
      )}
    </div>
        </div>
      </div>
    </section>
  );
}
