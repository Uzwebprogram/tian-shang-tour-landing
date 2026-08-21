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
        <div className="grid gap-10 border-t border-brand-line/50 py-12 sm:py-14 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              {t.footer.manifesto}
            </p>
          </div>

          <ul className="space-y-3 text-sm text-brand-muted md:col-span-3 sm:text-base">
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
              <a href="#subscribe" className="transition-colors hover:text-white">
                {t.footer.blog}
              </a>
            </li>
          </ul>

          <div className="space-y-5 md:col-span-4">
            <div>
              <p className="text-xs text-white/55 sm:text-sm">{t.footer.addressLabel}</p>
              <p className="mt-1 text-sm text-white sm:text-base">{t.footer.address}</p>
            </div>
            <div>
              <p className="text-xs text-white/55 sm:text-sm">{t.footer.phone}</p>
              <a
                href={brand.phoneHref}
                className="mt-1 block text-sm text-white transition-colors hover:text-brand-mint sm:text-base"
              >
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="text-xs text-white/55 sm:text-sm">{t.footer.email}</p>
              <a
                href={brand.emailHref}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm text-white transition-colors hover:text-brand-mint sm:text-base"
              >
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-brand-line/50 py-6 text-sm text-brand-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Logo className="h-7 w-auto sm:h-8" tone="dark" />
            <p className="text-xs sm:text-sm">{t.footer.copyright}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <LanguageSwitcher />
            <a href="#subscribe" className="text-xs transition-colors hover:text-white sm:text-sm">
              {t.footer.privacy}
            </a>
            <a href="#subscribe" className="text-xs transition-colors hover:text-white sm:text-sm">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
