import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { PageMeta } from '@/components/site-shell';
import { WibClock } from '@/components/wib-clock';
import { useSubmitContact, type ContactMessageInput } from '@/hooks/use-contact';

const serviceOptions = ['Content & Video', 'Social Media Management', 'Website', 'Full Partner', 'Contract Work', 'Not sure yet'] as const;
const timelineOptions = ['ASAP', 'Within a month', 'Flexible'] as const;
const budgetOptions = ['Under $300', '$300-$600', '$600-$1,000', '$1,000+', 'Not sure yet'] as const;

type FormValues = ContactMessageInput;
const initialForm: FormValues = { name: '', email: '', service: 'Not sure yet', project: '', timeline: 'Flexible', budget: 'Not sure yet', referenceLinks: '', website: '' };

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialForm);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState('');
  const submitContact = useSubmitContact();

  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }) as FormValues);
    if (success) setSuccess(false);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure('');
    setSuccess(false);
    try {
      const result = await submitContact.mutateAsync({ data: { ...values, referenceLinks: values.referenceLinks?.trim() || undefined } });
      if (result.success) {
        setValues(initialForm);
        setSuccess(true);
      } else {
        setFailure(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      const apiError = error as {
        data?: { error?: string };
        message?: string;
      };
      setFailure(apiError.data?.error || apiError.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <main>
      <PageMeta title="Contact | Rafi Ariq Maulana" description="Tell Rafi about your project, monthly partnership, or remote role. Get in touch and expect a reply within 24 hours." />
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">CONTACT</span>
          <h1 className="section-title">Let's Work Together</h1>
          <p className="section-intro">Tell me a little about what you need, whether it's a monthly partnership, a specific project, or a remote role. I'll get back to you within 24 hours.</p>
        </div>
      </section>
      <section className="container contact-wrap">
        <form className="contact-form" onSubmit={handleSubmit} data-testid="form-contact">
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} value={values.website} onChange={(event) => setField('website', event.target.value)} data-testid="input-website" />
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} value={values.name} onChange={(event) => setField('name', event.target.value)} data-testid="input-name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => setField('email', event.target.value)} data-testid="input-email" />
            </div>
            <div className="field full">
              <label htmlFor="service">What do you need?</label>
              <select id="service" name="service" value={values.service} onChange={(event) => setField('service', event.target.value)} data-testid="select-service">
                {serviceOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="project">Tell me about your project</label>
              <textarea id="project" name="project" placeholder="What are you working on, and what would you like to achieve?" required maxLength={5000} value={values.project} onChange={(event) => setField('project', event.target.value)} data-testid="input-project" />
            </div>
            <div className="field">
              <label htmlFor="timeline">Timeline</label>
              <select id="timeline" name="timeline" value={values.timeline} onChange={(event) => setField('timeline', event.target.value)} data-testid="select-timeline">
                {timelineOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="budget">Budget range in USD</label>
              <select id="budget" name="budget" value={values.budget} onChange={(event) => setField('budget', event.target.value)} data-testid="select-budget">
                {budgetOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="referenceLinks">Reference links (optional)</label>
              <input id="referenceLinks" name="referenceLinks" type="text" maxLength={1000} value={values.referenceLinks ?? ''} onChange={(event) => setField('referenceLinks', event.target.value)} data-testid="input-reference-links" />
            </div>
          </div>
          <button className="pill-button contact-submit" type="submit" disabled={submitContact.isPending} aria-busy={submitContact.isPending} data-testid="button-submit-contact">
            {submitContact.isPending ? 'Sending Message…' : 'Send Message'} {!submitContact.isPending && <ArrowUpRight size={15} />}
          </button>
          {success && <div className="form-message form-success" role="status" data-testid="status-contact-success">Thank you! I've received your message and will reply within 24 hours.</div>}
          {failure && <div className="form-message form-error" role="alert" data-testid="status-contact-error">{failure}</div>}
        </form>
        <aside className="contact-details">
          <h2>Prefer to reach out directly?</h2>
          <div className="contact-line"><span>Email</span><a href="mailto:rafiariqmaulana48@gmail.com" data-testid="link-contact-email">rafiariqmaulana48@gmail.com <ArrowUpRight size={13} /></a></div>
          <div className="contact-line"><span>LinkedIn</span><a href="https://linkedin.com/in/rafi-ariq-maulana" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin">linkedin.com/in/rafi-ariq-maulana <ArrowUpRight size={13} /></a></div>
          <p className="contact-location">Based in Indonesia (UTC+7) · Available for remote work worldwide</p>
          <a href="/cv.pdf" download className="pill-button pill-button-outline" data-testid="link-contact-cv">Download CV <ArrowUpRight size={15} /></a>
          <WibClock variant="card" />
        </aside>
      </section>
    </main>
  );
}
