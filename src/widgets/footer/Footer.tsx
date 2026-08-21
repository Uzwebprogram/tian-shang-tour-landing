import { brand } from '@/shared/config/brand';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { Logo } from '@/shared/ui/Logo';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="bg-brand-dark text-white">
      <Container>
        <div className="grid gap-10 border-t border-brand-line/50 py-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="max-w-sm font-serif text-3xl leading-tight sm:text-4xl md:text-[2.5rem]">
              {t.footer.manifesto}
            </p>
          </div>
          <ul className="space-y-4 text-brand-muted md:col-span-3">
            <li>
              <a href="#tours" className="transition-colors hover:text-white">
                {t.footer.tours}
              </a>
            </li>
            <li>
              <a href="#about" className="transition-colors hover:text-white">
                {t.footer.about}
              </a>
            </li>
            <li>
              <a href="#press" className="transition-colors hover:text-white">
                {t.footer.blog}
              </a>
            </li>
          </ul>
          <div className="space-y-8 md:col-span-3">
            <div>
              <p className="text-sm text-brand-line">{t.footer.phone}</p>
              <a href={brand.phoneHref} className="mt-1.5 block text-lg text-white">
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-brand-line">{t.footer.email}</p>
              <a href={brand.emailHref} className="mt-1.5 block text-lg text-white">
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-brand-line/50 py-8 text-sm text-brand-muted sm:flex-row sm:items-center">
          <Logo className="h-8 w-auto" tone="dark" />
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-6">
            <LanguageSwitcher />
            <a href="#subscribe" className="hover:text-white">
              {t.footer.privacy}
            </a>
            <a href="#subscribe" className="hover:text-white">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
