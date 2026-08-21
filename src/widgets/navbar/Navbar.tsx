import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { Logo } from '@/shared/ui/Logo';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { cn } from '@/shared/lib/formatDate';

const links = [
  { href: '#tours', key: 'tours' },
  { href: '#about', key: 'about' },
  { href: '#press', key: 'press' },
  { href: '#contact', key: 'contact' },
] as const;

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#tours');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const labels = {
    tours: t.nav.tours,
    about: t.nav.about,
    press: t.nav.press,
    contact: t.nav.contact,
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-ink/80 text-white backdrop-blur-xl transition-shadow',
        scrolled && 'shadow-glass',
      )}
    >
      <div className="mx-auto flex h-[77px] max-w-page items-center justify-between gap-4 px-4 sm:px-8 xl:px-16">
        <a href="#hero" className="shrink-0 text-white" aria-label="TIAN SHAN">
          <Logo className="h-9 w-auto sm:h-10" tone="dark" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'border-b-2 pb-1 text-base transition-colors',
                active === link.href
                  ? 'border-brand-mint text-white'
                  : 'border-transparent text-brand-muted hover:text-white',
              )}
            >
              {labels[link.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a href="#subscribe">
            <Button variant="brand" className="min-h-11">
              {t.nav.cta}
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-brand-ink px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-lg text-white"
                onClick={() => setOpen(false)}
              >
                {labels[link.key]}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <LanguageSwitcher />
            <a href="#subscribe" onClick={() => setOpen(false)}>
              <Button variant="brand" className="w-full min-h-12">
                {t.nav.cta}
              </Button>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
