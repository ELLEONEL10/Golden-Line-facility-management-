import { useLang } from "@/hooks/useLang";
import { tr } from "@/services/i18n";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TEAM } from "../team.data";
import "./Team.css";

export function Team() {
  const { lang } = useLang();
  const ref = useScrollReveal();

  return (
    <section className="section team-bg" id="team" ref={ref}>
      <div className="sec-inner">
        <div className="anim from-up team-header">
          <div className="sec-tag">{tr(lang, "team.tag")}</div>
          <h2 className="sec-title">{tr(lang, "team.title")}</h2>
          <div className="title-bar team-title-bar" />
          <p className="team-sub">{tr(lang, "team.sub")}</p>
        </div>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <article
              key={member.name}
              className="team-card anim from-up"
              style={{ transitionDelay: `${0.05 + i * 0.1}s` }}
            >
              <div className="team-photo">
                <img
                  src={member.img}
                  alt={`${member.name} – ${tr(lang, member.roleKey)}`}
                  loading="lazy"
                  className="team-image"
                />
                <div className="team-overlay" />
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{tr(lang, member.roleKey)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
