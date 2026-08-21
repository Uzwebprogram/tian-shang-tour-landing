import { Mountain, Aperture, Headset } from 'lucide-react';
import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

export function FeaturesSection() {
  const { t } = useI18n();
  const cards = [
    {
      image: images.jet,
      icon: Mountain,
      title: t.features.jetTitle,
      subtitle: t.features.jetSubtitle,
      text: t.features.jetText,
    },
    {
      image: images.privacy,
      icon: Aperture,
      title: t.features.privacyTitle,
      subtitle: t.features.privacySubtitle,
      text: t.features.privacyText,
    },
    {
      image: images.access,
      icon: Headset,
      title: t.features.accessTitle,
      subtitle: t.features.accessSubtitle,
      text: t.features.accessText,
    },
  ];

  return (
    <section className="section-cv border-y border-brand-line/50 bg-brand-dark py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-12 text-center font-serif text-3xl font-semibold leading-tight text-white sm:mb-16 sm:text-5xl md:text-6xl">
            {t.features.title}
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title} delay={index * 0.1}>
                <article className="group relative h-[460px] overflow-hidden rounded-3xl border border-brand-line bg-brand-card sm:h-[500px]">
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-7 sm:p-8">
                    <Icon className="h-6 w-6 text-brand-sage" />
                    <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="text-sm font-medium text-brand-mint">{card.subtitle}</p>
                    <p className="text-sm leading-relaxed text-brand-muted">{card.text}</p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
