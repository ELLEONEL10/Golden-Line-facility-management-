import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import "./Band.css";

interface BandItem {
  numKey: string;
  suffix: string;
  target: number;
  labelKey: string;
  delay: string;
}

const BAND_ITEMS: BandItem[] = [
  { numKey: "bandNum0", suffix: "", target: 11, labelKey: "band.services", delay: "0s" },
  { numKey: "bandNum1", suffix: "", target: 3, labelKey: "band.regions", delay: "0.1s" },
  { numKey: "bandNum2", suffix: ",9 ★", target: 4, labelKey: "band.rating", delay: "0.2s" },
  { numKey: "bandNum3", suffix: "%", target: 100, labelKey: "band.owner", delay: "0.3s" },
];

function BandItemCell({ item, lang }: { item: BandItem; lang: "de" | "en" }) {
  const numRef = useCountUp(item.target, 1400);

  return (
    <div
      className="band-item anim from-up"
      style={{ transitionDelay: item.delay }}
    >
      <span className="band-num">
        <span ref={numRef}>{item.target}</span>{item.suffix}
      </span>
      <span className="band-label">{tr(lang, item.labelKey)}</span>
    </div>
  );
}

export function Band() {
  const { lang } = useLang();
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="band" id="band" ref={ref}>
      <div className="band-inner">
        {BAND_ITEMS.map((item) => (
          <BandItemCell key={item.labelKey} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
