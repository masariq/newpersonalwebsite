import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import { Clapperboard, ChevronLeft, ChevronRight, Globe2, Share2, type LucideIcon } from "lucide-react";
import "./_group.css";
import "./Carousel.css";

type Skill = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

const skills: Skill[] = [
  {
    title: "Websites & Outreach",
    description: "Clean, responsive websites and email campaigns that help people find and trust your brand.",
    icon: Globe2,
    image: "/assets/skill-web.png",
  },
  {
    title: "Social Media",
    description: "Planning, publishing, and managing your social channels with a consistent voice and brand.",
    icon: Share2,
    image: "/assets/skill-social.png",
  },
  {
    title: "Content & Video",
    description: "Short-form videos, social posters, and carousels that look good and keep people watching.",
    icon: Clapperboard,
    image: "/assets/skill-video.png",
  },
];

const tools = [
  "Canva Pro",
  "CapCut",
  "WordPress",
  "Elementor",
  "Hostinger Email Marketing",
  "Notion",
];

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const currentSkill = skills[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(skills.length - 1, index)));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" && activeIndex > 0) {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight" && activeIndex < skills.length - 1) {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 45) goTo(activeIndex + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div className="skills-prototype">
      <section className="section">
        <div className="container">
          <span className="eyebrow">SKILLS</span>
          <h2 className="section-title">What I Bring to the Table</h2>

          <div
            className="skills-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Skills and services"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="skills-carousel__viewport">
              <div
                className="skills-carousel__track"
                style={{ "--active-index": activeIndex } as CSSProperties}
              >
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <article
                      className={`skills-carousel__card${index === activeIndex ? " is-active" : ""}`}
                      key={skill.title}
                      aria-label={`${index + 1} of ${skills.length}: ${skill.title}`}
                      aria-hidden={index !== activeIndex}
                    >
                      <div className="skills-carousel__copy">
                        <div className="skill-icon" aria-hidden="true">
                          <Icon size={19} strokeWidth={1.7} />
                        </div>
                        <span className="skills-carousel__index">
                          0{index + 1} <span aria-hidden="true">/ 0{skills.length}</span>
                        </span>
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                      </div>
                      <div className="skills-carousel__image">
                        <div className="skills-carousel__placeholder" aria-hidden="true">
                          <span className="skills-carousel__placeholder-mark" />
                          <span className="skills-carousel__placeholder-label">{skill.title}</span>
                        </div>
                        <img
                          src={skill.image}
                          alt={`${skill.title} visual`}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="skills-carousel__footer">
              <div className="skills-carousel__controls" aria-label="Carousel controls">
                <button
                  className="skills-carousel__arrow"
                  type="button"
                  aria-label="Previous skill"
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button
                  className="skills-carousel__arrow"
                  type="button"
                  aria-label="Next skill"
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === skills.length - 1}
                >
                  <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>

              <div
                className="skills-carousel__progress"
                role="progressbar"
                aria-label="Carousel position"
                aria-valuemin={1}
                aria-valuemax={skills.length}
                aria-valuenow={activeIndex + 1}
                aria-valuetext={`Slide ${activeIndex + 1} of ${skills.length}`}
              >
                <span style={{ transform: `scaleX(${(activeIndex + 1) / skills.length})` }} />
              </div>

              <p className="skills-carousel__details">
                {currentSkill.title} is one part of a thoughtful, connected approach.
                {" "}
                <a href="/services">Explore in Details →</a>
              </p>
            </div>
            <span className="skills-carousel__sr-only" aria-live="polite">
              {currentSkill.title}, slide {activeIndex + 1} of {skills.length}
            </span>
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
