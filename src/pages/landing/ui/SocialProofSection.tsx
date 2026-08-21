import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

export function SocialProofSection() {
  const { t } = useI18n();
  const people = [
    {
      image: images.albert,
      name: 'Albert Marutyants',
      badge: t.social.badgeEntrepreneur,
      role: t.social.albertRole,
    },
    {
      image: images.nikolay,
      name: 'Nikolay Vasilenko',
      badge: t.social.badgeBlogger,
      role: t.social.nikolayRole,
    },
    {
      image: images.mikhail,
      name: 'Mikhail Anosov',
      badge: t.social.badgeEntrepreneur,
      role: t.social.mikhailRole,
    },
    {
      image: images.konstantin,
      name: 'Konstantin Fedanov',
      badge: t.social.badgeInvestor,
      role: t.social.konstantinRole,
    },
  ];

  return (
    <section id="social" className="section-cv border-y border-brand-line/50 bg-brand-dark py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-10 font-serif text-4xl font-semibold text-brand-teal sm:mb-12 sm:text-5xl">
            {t.social.title}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {people.map((person, index) => (
            <FadeIn key={person.name} delay={index * 0.08}>
              <article className="group relative h-[280px] overflow-hidden rounded-3xl border border-brand-line bg-brand-card sm:h-[360px]">
                <img
                  src={person.image}
                  alt={person.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-brand-ink/80 px-3 py-2 text-xs text-white backdrop-blur-sm">
                  {person.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                    {person.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-brand-muted sm:text-sm">{person.role}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
