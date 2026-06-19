import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Cta.css";

export function CtaBand() {
  const { lang } = useLang();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="cta-band" ref={ref}>
      <div className="anim from-scale">
        <h2>{tr(lang, "cta.title")}</h2>
        <p>{tr(lang, "cta.sub")}</p>
        <div className="cta-btns">
          <a href="#anfrage" className="btn-gold">✉ <span>{tr(lang, "cta.btn1")}</span></a>
          <a href="tel:+4916096383001" className="btn-outline">📞 <span>{tr(lang, "cta.btn2")}</span></a>
        </div>
        </div>
    </section>
  );
}
