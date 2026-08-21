import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

export function FinalCtaSection() {
  const { t } = useI18n();

  return (
    <section id="final-cta" className="border-t border-brand-line/50 bg-brand-dark py-16 sm:py-24">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {t.finalCta.title}
          </h2>
          <p className="mt-6 text-brand-muted">{t.finalCta.subtitle}</p>
          <a href="#subscribe" className="mt-8 inline-flex">
            <Button variant="brand" size="lg">
              {t.finalCta.cta}
              <ArrowUpRight className="h-2.5 w-2.5" />
            </Button>
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
