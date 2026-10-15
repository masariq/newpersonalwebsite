import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clapperboard, Globe2, Image as ImageIcon, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/site-shell';
import { WibClock } from '@/components/wib-clock';

const heroStripCards = [
  { id: 'hero-1', src: new URL('../../../../attached_assets/hero-1_1792046037039.jpg', import.meta.url).href, alt: 'Coffee shop social media design' },
  { id: 'hero-2', src: new URL('../../../../attached_assets/hero-2_1792046037040.jpg', import.meta.url).href, alt: 'Marketing agency social media design' },
  { id: 'hero-3', src: new URL('../../../../attached_assets/hero-3_1792046037040.jpg', import.meta.url).href, alt: 'Padel club social media design' },
  { id: 'hero-4', src: new URL('../../../../attached_assets/hero-4_1792046037040.jpg', import.meta.url).href, alt: 'Skincare website design' },
  { id: 'hero-5', src: new URL('../../../../attached_assets/hero-5_1792046037041.jpg', import.meta.url).href, alt: 'Children’s dental website design' },
  { id: 'hero-6', src: new URL('../../../../attached_assets/hero-6_1792046037041.jpg', import.meta.url).href, alt: 'Financial planning website design' },
  { id: 'hero-7', src: new URL('../../../../attached_assets/hero-7_1792046037042.jpg', import.meta.url).href, alt: 'Real estate website design' },
];

const workItems = [
  { title: 'Project 01', type: 'Video · Tools', text: 'A neutral placeholder for a selected video project.' },
  { title: 'Project 02', type: 'Social · Tools', text: 'A neutral placeholder for a social media project.' },
  { title: 'Project 03', type: 'Web · Tools', text: 'A neutral placeholder for a website project.' },
  { title: 'Project 04', type: 'Video · Tools', text: 'A neutral placeholder for a content project.' },
  { title: 'Project 05', type: 'Social · Tools', text: 'A neutral placeholder for a campaign project.' },
  { title: 'Project 06', type: 'Web · Tools', text: 'A neutral placeholder for a digital project.' },
];

const skillSlides = [
  {
    title: 'Websites & Outreach',
    description: 'Clean, responsive websites and email campaigns that help people find and trust your brand.',
    icon: Globe2,
    image: '/assets/skill-web.png',
    tone: 'cream',
  },
  {
    title: 'Social Media',
    description: 'Planning, publishing, and managing your social channels with a consistent voice and brand.',
    icon: Share2,
    image: '/assets/skill-social.png',
    tone: 'amber',
  },
  {
    title: 'Content & Video',
    description: 'Short-form videos, social posters, and carousels that look good and keep people watching.',
    icon: Clapperboard,
    image: '/assets/skill-video.png',
    tone: 'neutral',
  },
] as const;

function HeroImageStrip() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const hero = viewport?.closest<HTMLElement>('.hero');
    if (!viewport || !track || !hero) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
    let isVisible = true;
    let isHovered = false;
    let frameId: number | undefined;
    let previousTime: number | undefined;
    let viewportWidth = 0;
    let setWidth = 0;
    let offset = 0;

    const draw = () => {
      if (setWidth <= 0 || viewportWidth <= 0) return;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      cards.forEach((card) => {
        const center = card.offsetLeft + card.offsetWidth / 2 - offset;
        const distance = (center - viewportWidth / 2) / Math.max(viewportWidth / 2, 1);
        const curve = Math.min(1, Math.abs(distance));
        const translateY = Math.pow(curve, 1.6) * 18;
        const maxRotation = viewportWidth <= 480 ? 12 : viewportWidth <= 800 ? 20 : 28;
        const rotateY = -Math.max(-1, Math.min(1, distance)) * maxRotation;
        const scale = 1 - curve * 0.18;
        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = (1 - curve * 0.16).toFixed(3);
      });
    };

    const stop = () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      frameId = undefined;
      previousTime = undefined;
    };

    const animate = (time: number) => {
      frameId = undefined;
      if (reducedMotion.matches || !isVisible || isHovered || setWidth <= 0) return;
      if (previousTime === undefined) previousTime = time;
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;
      offset += elapsed * 0.036;
      if (offset >= setWidth * 2) offset -= setWidth;
      draw();
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (reducedMotion.matches || !isVisible || isHovered || frameId !== undefined) return;
      frameId = requestAnimationFrame(animate);
    };

    const measure = () => {
      viewportWidth = viewport.clientWidth;
      const firstSetStart = cards[0]?.offsetLeft ?? 0;
      const nextSetStart = cards[heroStripCards.length]?.offsetLeft;
      if (nextSetStart === undefined) return;
      setWidth = nextSetStart - firstSetStart;
      const centerCard = cards[Math.floor(heroStripCards.length / 2)];
      if (centerCard) {
        offset = setWidth + centerCard.offsetLeft - firstSetStart
          + centerCard.offsetWidth / 2 - viewportWidth / 2;
        while (offset < setWidth) offset += setWidth;
        while (offset >= setWidth * 2) offset -= setWidth;
      }
      draw();
      start();
    };

    const onMouseEnter = () => {
      if (!hoverCapable.matches) return;
      isHovered = true;
      stop();
    };
    const onMouseLeave = () => {
      if (!hoverCapable.matches) return;
      isHovered = false;
      start();
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        draw();
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    }, { threshold: 0.05 });
    visibilityObserver.observe(hero);
    viewport.addEventListener('mouseenter', onMouseEnter);
    viewport.addEventListener('mouseleave', onMouseLeave);
    reducedMotion.addEventListener('change', onMotionChange);
    measure();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      viewport.removeEventListener('mouseenter', onMouseEnter);
      viewport.removeEventListener('mouseleave', onMouseLeave);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div className="hero-strip" aria-label="Selected creative work">
      <div className="hero-strip-viewport" ref={viewportRef}>
        <div className="hero-strip-track" ref={trackRef}>
          {Array.from({ length: 3 }, (_, setIndex) =>
            heroStripCards.map((card) => (
              <figure
                key={`${setIndex}-${card.id}`}
                className="hero-image-card"
                aria-hidden={setIndex !== 1}
              >
                <div className="hero-image-fallback" aria-hidden="true">
                  <ImageIcon size={25} strokeWidth={1.5} />
                </div>
                <img
                  src={card.src}
                  alt={card.alt}
                  loading="lazy"
                  draggable={false}
                  onError={(event) => { event.currentTarget.style.display = 'none'; }}
                />
              </figure>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

function SkillsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [slideOffsets, setSlideOffsets] = useState<number[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateOffsets = () => {
      setSlideOffsets(slideRefs.current.map((slide) => slide?.offsetLeft ?? 0));
    };

    updateOffsets();
    const observer = new ResizeObserver(updateOffsets);
    observer.observe(viewport);
    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });
    return () => observer.disconnect();
  }, []);

  const moveToSlide = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(skillSlides.length - 1, index));
    setActiveIndex(nextIndex);
  }, []);

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' && activeIndex < skillSlides.length - 1) {
      event.preventDefault();
      moveToSlide(activeIndex + 1);
    } else if (event.key === 'ArrowLeft' && activeIndex > 0) {
      event.preventDefault();
      moveToSlide(activeIndex - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;

    const distance = startX - endX;
    if (Math.abs(distance) < 44) return;
    moveToSlide(activeIndex + (distance > 0 ? 1 : -1));
  };

  const trackOffset = slideOffsets[activeIndex] ?? 0;

  return (
    <div
      className="skills-carousel"
      role="region"
      aria-label="Skills"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleCarouselKeyDown}
    >
      <div
        className="skills-carousel-viewport"
        ref={viewportRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStartX.current = null; }}
      >
        <div
          className="skills-carousel-track"
          id="skills-carousel-track"
          ref={trackRef}
          style={{ transform: `translate3d(-${trackOffset}px, 0, 0)` }}
        >
          {skillSlides.map((slide, index) => {
            const Icon = slide.icon;
            const hasImage = loadedImages[slide.image] === true;
            const isActive = index === activeIndex;

            return (
              <article
                className="skill-carousel-card"
                data-active={isActive}
                data-tone={slide.tone}
                data-testid={`card-skill-${index + 1}`}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${skillSlides.length}: ${slide.title}`}
                key={slide.title}
                ref={(element) => { slideRefs.current[index] = element; }}
              >
                <div className="skill-carousel-copy">
                  <div className="skill-icon" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
                <div className={`skill-carousel-visual${hasImage ? ' has-image' : ''}`}>
                  {!hasImage && <div className="skill-carousel-placeholder" role="img" aria-label={`Image placeholder for ${slide.title}`} />}
                  <img
                    className={`skill-carousel-image${hasImage ? ' is-loaded' : ''}`}
                    src={slide.image}
                    alt={hasImage ? `${slide.title} example` : ''}
                    aria-hidden={!hasImage}
                    loading="lazy"
                    onLoad={() => setLoadedImages((current) => ({ ...current, [slide.image]: true }))}
                    onError={() => setLoadedImages((current) => ({ ...current, [slide.image]: false }))}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="skills-carousel-footer">
        <div className="skills-carousel-controls">
          <button
            className="skills-carousel-arrow"
            type="button"
            aria-label="Previous skill"
            aria-controls="skills-carousel-track"
            data-testid="button-skill-previous"
            disabled={activeIndex === 0}
            onClick={() => moveToSlide(activeIndex - 1)}
          >
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <button
            className="skills-carousel-arrow"
            type="button"
            aria-label="Next skill"
            aria-controls="skills-carousel-track"
            data-testid="button-skill-next"
            disabled={activeIndex === skillSlides.length - 1}
            onClick={() => moveToSlide(activeIndex + 1)}
          >
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <div
          className="skills-carousel-progress"
          role="progressbar"
          aria-label="Skill slide progress"
          aria-valuemin={1}
          aria-valuemax={skillSlides.length}
          aria-valuenow={activeIndex + 1}
        >
          <span style={{ transform: `translateX(${activeIndex * 100}%)` }} />
        </div>

        <div className="skills-carousel-details">
          <p>See how these skills come together in a flexible service partnership.</p>
          <Link href="/services" className="skills-carousel-link" data-testid="link-skills-services">
            Explore in Details →
          </Link>
        </div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {skillSlides.length}: {skillSlides[activeIndex].title}
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <PageMeta title="Rafi Ariq Maulana | Digital Marketer & Content Creator" description="Meet Rafi Ariq Maulana, a digital marketer and content creator based in Indonesia, working alongside brands and teams." />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title">Your creative and marketing partner for growing online.</h1>
          <HeroImageStrip />
          <p className="hero-copy">I'm Rafi, a digital marketer based in Indonesia. I work alongside brands and teams to turn ideas into content that connects, whether it's a one-off project, a monthly collaboration, or a long-term remote role.</p>
          <div className="hero-actions">
            <Link href="/contact" className="pill-button" data-testid="link-hero-contact">Let's Work Together <ArrowUpRight size={16} /></Link>
            <a href="#work" className="pill-button pill-button-outline" data-testid="link-see-work">See My Work <ArrowDown size={15} /></a>
          </div>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="container">
          <span className="eyebrow">SKILLS</span>
          <h2 className="section-title">What I Bring to the Table</h2>
          <SkillsCarousel />
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
