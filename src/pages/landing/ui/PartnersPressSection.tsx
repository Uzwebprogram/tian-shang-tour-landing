import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';
import { PartnerRow } from '@/pages/landing/ui/PartnerRow';

export function PartnersPressSection() {
  const { t } = useI18n();
  const expeditions = [
    {
      image: images.forbes,
      title: t.press.baikalTitle,
      text: t.press.baikalText,
    },
    {
      image: images.rbc,
      title: t.press.baikonurTitle,
      text: t.press.baikonurText,
    },
    {
      image: images.vedomosti,
      title: t.press.kamchatkaTitle,
      text: t.press.kamchatkaText,
    },
  ];

  return (
    <section id="press" className="section-cv border-y border-brand-line/50 bg-brand-dark py-16 sm:py-24 xl:py-32">
      <Container className="space-y-24 lg:space-y-32">
        <PartnerRow />
        <div>
          <FadeIn>
            <h2 className="mb-10 font-serif text-4xl font-semibold text-[#7ec8cd] sm:mb-12 sm:text-5xl">
              {t.press.title}
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {expeditions.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.1}>
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-brand-line bg-brand-card p-6">
                  <div className="overflow-hidden rounded-2xl bg-brand-dark">
                    <img
                      src={item.image}
                      alt=""
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-muted">{item.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
