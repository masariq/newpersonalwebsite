import { Clapperboard, Globe2, Share2 } from "lucide-react";

import "./_group.css";

const tools = [
  "Canva Pro",
  "CapCut",
  "WordPress",
  "Elementor",
  "Hostinger Email Marketing",
  "Notion",
];

export function Current() {
  return (
    <div className="skills-prototype">
      <section className="section">
        <div className="container">
          <span className="eyebrow">SKILLS</span>
          <h2 className="section-title">What I Bring to the Table</h2>
          <div className="skills-grid">
            <article className="skill-card">
              <div className="skill-icon">
                <Clapperboard size={19} strokeWidth={1.7} />
              </div>
              <h3>Content &amp; Video</h3>
              <p>
                Short-form videos, social posters, and carousels that look good
                and keep people watching.
              </p>
            </article>
            <article className="skill-card">
              <div className="skill-icon">
                <Share2 size={19} strokeWidth={1.7} />
              </div>
              <h3>Social Media</h3>
              <p>
                Planning, publishing, and managing your social channels with a
                consistent voice and brand.
              </p>
            </article>
            <article className="skill-card">
              <div className="skill-icon">
                <Globe2 size={19} strokeWidth={1.7} />
              </div>
              <h3>Websites &amp; Outreach</h3>
              <p>
                Clean, responsive websites and email campaigns that help people
                find and trust your brand.
              </p>
            </article>
          </div>
          <div className="tool-tags" aria-label="Tools">
            {tools.map((tool) => (
              <span className="chip" key={tool}>
                {tool}
              </span>
            ))}
          </div>
          <p className="skills-note">
            I also use AI tools to work faster without losing the human touch.
            <br />
            <strong>
              Whether you need one of these or all three, I make sure they work
              together.
            </strong>
          </p>
        </div>
      </section>
    </div>
  );
}
