import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/site-shell';

const services = [
  {
    title: 'Content & Video',
    price: 'Monthly or per project',
    intro: 'Short-form videos and feed designs that keep your brand consistent.',
    bullets: ['Up to 8 short-form videos per month (up to 60 seconds)', 'Up to 8 feed posters or carousels per month', 'From concept to final cut: storytelling, pacing, subtitles, and sound', 'Captions included for every video and poster', "Revisions until you're happy (up to 2 rounds)"],
    projectNote: 'Also available as a one-time project.',
    button: "Let's Talk",
  },
  {
    title: 'Social Media Management',
    price: 'Monthly or per project',
    intro: 'Your channels, planned and handled consistently.',
    bullets: ['Content planning and monthly calendar', 'Caption writing and scheduling', 'Replies to comments and common questions', 'Monthly performance report'],
    note: 'Content creation is available in Content & Video, or combined in Full Partner.',
    projectNote: 'Also available as a one-time project.',
    button: "Let's Talk",
  },
  {
    title: 'Website Design & Development',
    price: 'Custom quote',
    intro: 'A website that looks like your brand and works for your business.',
    bullets: ['Landing pages, company profiles, and online stores, tailored to your brand', 'Responsive on phone, tablet, and desktop', 'Fast, clean, and easy for you to update', 'From brief to launch, with revisions along the way', 'Monthly website care available.'],
    button: 'Tell Me About Your Project',
  },
  {
    title: 'Full Partner',
    price: 'Ongoing partnership',
    intro: 'Combine what you need into one partnership, with one point of contact.',
    bullets: ['Content & Video and Social Media Management together', 'Monthly strategy check-in to plan ahead', 'Priority turnaround', 'Website projects can be added on top.'],
    note: "Tell me what you need and I'll propose a plan that fits your goals and budget.",
    button: "Let's Talk",
    prominent: true,
  },
];

const faqs = [
  ['How long does it take to get my work?', "Short-form videos and feed designs are usually delivered within 48-72 hours after I receive your materials. Websites depend on the scope, and I'll share a clear timeline in your quote."],
  ['What counts as a round of revision?', 'One round means one consolidated set of feedback on a draft. Please send all your notes at once so I can update everything in one go. Each piece includes up to 2 rounds. Major changes, like a completely new concept or new footage, are treated as a new request.'],
  ['Do I need to provide the footage and brand materials?', "Yes, for monthly plans I work with the footage, photos, logos, and brand assets you provide. If you need filming or custom design, let's talk about it as an add-on."],
  ['Do you handle customer service on social media?', 'I handle basic community replies, such as thank-yous and common questions. Complaints, orders, and anything that needs your decision are passed on to you.'],
   ['How do payments and contracts work?', 'Monthly plans are billed at the start of each month, and projects are usually split into a deposit and a final payment. I accept payment through Wise, Payoneer, or PayPal. You can pause or cancel a monthly plan with 14 days notice.'],
  ['Which platform do you build websites on?', "I usually work with WordPress, Node.js, and AI tools to build faster and refine the details. I'm also happy to adapt to the platform you prefer, so just tell me what you have in mind and we'll find what fits best."],
  ['How do we communicate across time zones?', "I'm based in UTC+7 and comfortable with async communication, so you always know where things stand. I work with the tools you already use, such as Slack, Notion, Trello, or email, and reply within 24 hours on weekdays. I'm also happy to use Zoom or Google Meet whenever you'd like to talk things through."],
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <main>
      <PageMeta title="Services | Rafi Ariq Maulana" description="Explore content and video, social media management, website design and development, and full partner services." />
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">SERVICES</span>
          <h1 className="section-title">How We Can Work Together</h1>
          <p className="section-intro">Pick what you need, or combine them into one partnership.</p>
        </div>
      </section>
      <section className="container" aria-label="Services">
        <div className="services-grid">
          {services.map((service, index) => (
            <article className={`service-card${service.prominent ? ' prominent' : ''}`} key={service.title} data-testid={`card-service-${index + 1}`}>
              {service.prominent && <span className="best-value">Most complete</span>}
              <h2>{service.title}</h2>
              <span className="service-price">{service.price}</span>
              <p>{service.intro}</p>
              <ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              {service.note && <p className="service-note">{service.note}</p>}
              {service.projectNote && <p className="service-note">{service.projectNote}</p>}
              <Link href="/contact" className={`pill-button${service.prominent ? '' : ' pill-button-outline'}`} data-testid={`link-service-contact-${index + 1}`}>{service.button} <ArrowUpRight size={15} /></Link>
            </article>
          ))}
        </div>
        <section className="contract-banner" aria-labelledby="contract-title">
          <div>
            <h2 id="contract-title">Open to contract work.</h2>
            <p>Looking for a dedicated team member? I'm available for part-time or full-time remote contracts, working in your timezone and tools such as Slack, Notion, and Trello.</p>
          </div>
          <div className="contract-actions">
            <Link href="/contact" className="pill-button" data-testid="link-contract-contact">Discuss a Contract <ArrowUpRight size={15} /></Link>
          </div>
        </section>
      </section>
      <section className="section faq-section">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-intro">Quick answers before we talk.</p>
          <div className="faq-layout">
            <div aria-hidden="true" />
            <div className="faq-list">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={question}>
                    <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)} data-testid={`button-faq-${index + 1}`}>
                      <span>{question}</span><span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && <div className="faq-answer" id={`faq-answer-${index}`}>{answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
