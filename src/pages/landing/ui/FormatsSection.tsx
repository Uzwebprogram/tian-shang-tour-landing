import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

export function FormatsSection() {
  const { t } = useI18n();
  const cards = [
    { title: t.formats.ecoTitle, text: t.formats.ecoText },
    { title: t.formats.cityTitle, text: t.formats.cityText },
    { title: t.formats.sportTitle, text: t.formats.sportText },
  ];

  return (
    <section id="formats" className="section-cv border-y border-brand-line/50 bg-brand-dark py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-12 text-center font-serif text-3xl font-semibold leading-tight text-white sm:mb-16 sm:text-5xl md:text-6xl">
            {t.formats.title}
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.1}>
              <article className="h-full rounded-3xl border border-brand-line bg-brand-card p-7 sm:p-8">
                <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{card.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
