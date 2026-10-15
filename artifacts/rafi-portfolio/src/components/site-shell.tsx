import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { FaInstagram, FaUpwork, FaXTwitter } from 'react-icons/fa6';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export function SiteNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const active = (href: string) => location === href ? 'nav-link active' : 'nav-link';
  const homeNav = location === '/';
  return (
    <header className={`topbar${homeNav ? ' topbar-home' : ''}${homeNav && !scrolled ? ' topbar-transparent' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Rafi Ariq, home" data-testid="link-brand">Rafi Ariq</Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={active(item.href)} aria-current={location === item.href ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>)}
        </nav>
        <div className="nav-action"><Link href="/contact" className="pill-button" data-testid="link-quote">Get a Free Quote <ArrowUpRight size={15} /></Link></div>
        <button className="mobile-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {open && <nav className="mobile-menu" aria-label="Mobile navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={active(item.href)} aria-current={location === item.href ? 'page' : undefined} data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>)}
        <Link href="/contact" className="pill-button" data-testid="link-mobile-quote">Get a Free Quote <ArrowUpRight size={15} /></Link>
      </nav>}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <h2 className="footer-title">Let's build something together.</h2>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/" data-testid="link-footer-home">Home</Link>
            <Link href="/services" data-testid="link-footer-services">Services</Link>
            <Link href="/contact" data-testid="link-footer-contact">Contact</Link>
            <a href="https://linkedin.com/in/rafi-ariq-maulana" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn <ArrowUpRight size={13} /></a>
            <div className="footer-socials" aria-label="Social media">
              <a className="footer-social-link" href="https://www.instagram.com/rafiariqm/" target="_blank" rel="noopener noreferrer" aria-label="Rafi on Instagram"><FaInstagram size={16} aria-hidden="true" /></a>
              <a className="footer-social-link" href="https://x.com/masariqaja" target="_blank" rel="noopener noreferrer" aria-label="Rafi on X"><FaXTwitter size={16} aria-hidden="true" /></a>
              <a className="footer-social-link footer-social-contra" href="https://contra.com/rafi_ariq_maulana_rp3a493p" target="_blank" rel="noopener noreferrer" aria-label="Rafi on Contra">Contra</a>
              <a className="footer-social-link" href="https://www.upwork.com/freelancers/~0187d13fec9ada5f1a" target="_blank" rel="noopener noreferrer" aria-label="Rafi on Upwork"><FaUpwork size={16} aria-hidden="true" /></a>
            </div>
          </nav>
        </div>
        <div className="footer-wordmark" aria-hidden="true">rafi ariq</div>
        <div className="footer-bottom">© 2026 Rafi Ariq Maulana. Open to remote projects, partnerships, and contracts.</div>
      </div>
    </footer>
  );
}

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}
