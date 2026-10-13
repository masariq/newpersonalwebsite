import { ArrowDown, ArrowUpRight, Clapperboard, Globe2, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/site-shell';
import { WibClock } from '@/components/wib-clock';

const workItems = [
  { title: 'Project 01', type: 'Video · Tools', text: 'A neutral placeholder for a selected video project.' },
  { title: 'Project 02', type: 'Social · Tools', text: 'A neutral placeholder for a social media project.' },
  { title: 'Project 03', type: 'Web · Tools', text: 'A neutral placeholder for a website project.' },
  { title: 'Project 04', type: 'Video · Tools', text: 'A neutral placeholder for a content project.' },
  { title: 'Project 05', type: 'Social · Tools', text: 'A neutral placeholder for a campaign project.' },
  { title: 'Project 06', type: 'Web · Tools', text: 'A neutral placeholder for a digital project.' },
];

export default function HomePage() {
  return (
    <main>
      <PageMeta title="Rafi Ariq Maulana | Digital Marketer & Content Creator" description="Meet Rafi Ariq Maulana, a digital marketer and content creator based in Indonesia, working alongside brands and teams." />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" role="img" aria-label="Portrait background placeholder" />
        <div className="hero-content">
          <h1 id="hero-title">Your creative and marketing partner for growing online.</h1>
          <div className="hero-actions">
            <Link href="/contact" className="pill-button" data-testid="link-hero-contact">Let's Work Together <ArrowUpRight size={16} /></Link>
            <a href="#work" className="pill-button pill-button-outline" data-testid="link-see-work">See My Work <ArrowDown size={15} /></a>
          </div>
          <p className="hero-copy">I'm Rafi, a digital marketer based in Indonesia. I work alongside brands and teams to turn ideas into content that connects, whether it's a one-off project, a monthly collaboration, or a long-term remote role.</p>
        </div>
        <WibClock />
        <div className="availability"><span className="live-dot" aria-hidden="true" />Available for remote work worldwide</div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder for Rafi" data-testid="img-about-portrait" />
          <div className="about-copy">
            <span className="eyebrow">ABOUT</span>
            <h2 className="section-title">Hi, I'm Rafi</h2>
            <p>I'm a digital marketer and content creator based in Indonesia. I've spent the past few years helping brands show up online, from planning content and editing videos to building websites.</p>
            <p>I like to work as part of your team, not just take orders. I ask questions, understand your goals, and make sure everything I create works together: your content, your social channels, and your website.</p>
            <div className="value-tags">
              <div className="value-tag"><strong>Reliable:</strong> clear timelines and on-time delivery.</div>
              <div className="value-tag"><strong>Communicative:</strong> regular updates, no guessing.</div>
              <div className="value-tag"><strong>Flexible:</strong> adapts to your tools, workflow, and timezone.</div>
            </div>
            <div className="button-row">
              <Link href="/contact" className="pill-button" data-testid="link-about-contact">Let's Work Together <ArrowUpRight size={15} /></Link>
              <a className="quiet-link" href="/cv.pdf" download data-testid="link-download-cv-about">Download CV <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="container">
          <span className="eyebrow">SKILLS</span>
          <h2 className="section-title">What I Bring to the Table</h2>
          <div className="skills-grid">
            <article className="skill-card">
              <div className="skill-icon"><Clapperboard size={19} strokeWidth={1.7} /></div>
              <h3>Content &amp; Video</h3>
              <p>Short-form videos, social posters, and carousels that look good and keep people watching.</p>
            </article>
            <article className="skill-card">
              <div className="skill-icon"><Share2 size={19} strokeWidth={1.7} /></div>
              <h3>Social Media</h3>
              <p>Planning, publishing, and managing your social channels with a consistent voice and brand.</p>
            </article>
            <article className="skill-card">
              <div className="skill-icon"><Globe2 size={19} strokeWidth={1.7} /></div>
              <h3>Websites &amp; Outreach</h3>
              <p>Clean, responsive websites and email campaigns that help people find and trust your brand.</p>
            </article>
          </div>
          <div className="tool-tags" aria-label="Tools">
            {['Canva Pro', 'CapCut', 'WordPress', 'Elementor', 'Hostinger Email Marketing', 'Notion'].map((tool) => <span className="chip" key={tool}>{tool}</span>)}
          </div>
          <p className="skills-note">I also use AI tools to work faster without losing the human touch.<br /><strong>Whether you need one of these or all three, I make sure they work together.</strong></p>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <div className="work-head">
            <div>
              <span className="eyebrow">WORK</span>
              <h2 className="section-title">Selected Work</h2>
              <p className="section-intro">A few projects I'm proud of, across video, social media, and web.</p>
            </div>
          </div>
          <div className="showreel" role="img" aria-label="Showreel video placeholder" data-testid="img-showreel-placeholder">
            <span className="play-mark" aria-hidden="true"><span style={{ fontSize: 20, marginLeft: 4 }}>▶</span></span>
            <span className="showreel-label">SHOWREEL PLACEHOLDER</span>
          </div>
          <div className="project-grid">
            {workItems.map((project, index) => (
              <article className="project-card" key={project.title} data-testid={`card-project-${index + 1}`}>
                <div className="project-art" role="img" aria-label={`Neutral image placeholder for ${project.title}`} />
                <div className="project-meta">
                  <h3>{project.title}</h3>
                  <small>{project.type}</small>
                  <p>{project.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="button-row" style={{ justifyContent: 'center', marginTop: 30 }}>
            <Link href="/contact" className="pill-button" data-testid="link-work-contact">Let's Work Together <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 5 }}>
        <div className="container">
          <div className="closing-block">
            <h2>Let's build something together.</h2>
            <Link href="/contact" className="pill-button" data-testid="link-closing-contact">Let's Work Together <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
