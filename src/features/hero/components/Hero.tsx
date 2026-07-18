import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useParticles } from "../hooks/useParticles";
import { useScrollY } from "@/hooks/useScrollY";
import "./Hero.css";

const HERO_SERVICES = ["hero.svc1", "hero.svc2", "hero.svc3", "hero.svc4"] as const;

export function Hero() {
  const { lang } = useLang();
  const canvasRef = useParticles();
  const scrollY = useScrollY();

  const heroLeftStyle =
    scrollY < window.innerHeight
      ? { transform: `translateY(${scrollY * 0.16}px)` }
      : undefined;
  const heroRightStyle =
    scrollY < window.innerHeight
      ? { transform: `translateY(${scrollY * 0.09}px)` }
      : undefined;

  return (
    <header className="hero" id="hero">
      <canvas id="particles" ref={canvasRef} />
      <div className="hero-grid" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="hero-content">
        <div className="hero-left" style={heroLeftStyle}>
          <div className="live-badge">
            <span className="live-dot" />
            <span>{tr(lang, "hero.badge")}</span>
          </div>

          <h1>
            <span>{tr(lang, "hero.h1a")}</span><br />
            <span className="hl">{tr(lang, "hero.h1b")}</span><br />
            <span>{tr(lang, "hero.h1c")}</span>
          </h1>

          <p className="hero-sub">{tr(lang, "hero.tagline")}</p>

          <div className="hero-group-badge">
            <span className="hgb-dot">◈</span>
            <span>{tr(lang, "hero.group")}</span>
          </div>

          <div className="hero-locs">
            <span className="loc-pill">🇩🇪 Deutschland</span>
            <span className="loc-pill">📞 24/7 Support</span>
            <span className="loc-pill">✓ ISO Zertifiziert</span>
          </div>

          <div className="hero-ctas">
            <a href="#anfrage" className="btn-gold">✉ <span>{tr(lang, "hero.cta1")}</span></a>
            <a href="tel:+4916096383001" className="btn-outline">📞 +49 160 963-83001</a>
          </div>

          <div className="trust-row">
            <div className="t-item"><span className="t-icon">★</span><span>{tr(lang, "trust.rating")}</span></div>
            <div className="t-item"><span className="t-icon">✓</span><span>{tr(lang, "trust.owner")}</span></div>
            <div className="t-item"><span className="t-icon">€</span><span>{tr(lang, "trust.price")}</span></div>
            <div className="t-item"><span className="t-icon">🛡</span><span>{tr(lang, "trust.gdpr")}</span></div>
          </div>
        </div>

        <div className="hero-right" style={heroRightStyle}>
          <div className="hero-card">
            <p className="hc-title">{tr(lang, "hero.card.title")}</p>
            <div className="stat-grid">
              <div className="stat-box">
                <div className="stat-num stat-gold">11</div>
                <div className="stat-label">{tr(lang, "stats.services")}</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">100+</div>
                <div className="stat-label">{tr(lang, "stats.radius")}</div>
              </div>
              <div className="stat-box">
                <div className="stat-num stat-gold">Mo–Fr</div>
                <div className="stat-label">{tr(lang, "stats.hours")}</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">5 ★</div>
                <div className="stat-label">{tr(lang, "stats.rating")}</div>
              </div>
            </div>
            <ul className="hero-svc-list">
              {HERO_SERVICES.map((key) => (
                <li key={key} className="hero-svc-item">
                  <div className="hsvc-dot">✓</div>
                  <span>{tr(lang, key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    <button
      type="button"
      className="hero-scroll"
      onClick={() => document.getElementById("band")?.scrollIntoView({ behavior: "smooth" })}
      aria-label={tr(lang, "hero.scroll")}
    >
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>{tr(lang, "hero.scroll")}</span>
    </button>
  </header>
  );
}
