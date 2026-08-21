import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';
import { PartnerRow } from '@/pages/landing/ui/PartnerRow';

export function PartnersPressSection() {
  const { t } = useI18n();
  const articles = [
    { image: images.forbes, outlet: 'Forbes', title: t.press.forbesTitle },
    { image: images.rbc, outlet: 'RBC', title: t.press.rbcTitle },
    { image: images.vedomosti, outlet: 'VEDOMOSTI', title: t.press.vedomostiTitle },
  ];

  return (
    <section id="press" className="section-cv bg-white py-16 sm:py-24 xl:py-32">
      <Container className="space-y-24 lg:space-y-32">
        <PartnerRow />
        <div>
          <FadeIn>
            <h2 className="mb-10 font-serif text-4xl font-semibold text-brand-teal sm:mb-12 sm:text-5xl">
              {t.press.title}
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article, index) => (
              <FadeIn key={article.outlet} delay={index * 0.1}>
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-brand-line bg-brand-card p-6">
                  <div className="overflow-hidden rounded-2xl bg-brand-dark">
                    <img
                      src={article.image}
                      alt=""
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">{article.outlet}</h3>
                  <p className="text-sm leading-relaxed text-brand-muted">{article.title}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
