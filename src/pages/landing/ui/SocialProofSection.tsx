import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

export function SocialProofSection() {
  const { t } = useI18n();
  const people = [
    {
      image: images.teamTimur,
      name: t.social.timurName,
      role: t.social.timurRole,
      objectPosition: '50% 18%',
    },
    {
      image: images.teamAzamat,
      name: t.social.azamatName,
      role: t.social.azamatRole,
      objectPosition: '50% 12%',
    },
    {
      image: images.teamDilnoza,
      name: t.social.dilnozaName,
      role: t.social.dilnozaRole,
      objectPosition: '50% 12%',
    },
    {
      image: images.teamAkmal,
      name: t.social.akmalName,
      role: t.social.akmalRole,
      objectPosition: '50% 18%',
    },
    {
      image: images.teamOtabek,
      name: t.social.otabekName,
      role: t.social.otabekRole,
      objectPosition: '50% 18%',
    },
    {
      image: images.teamSoliha,
      name: t.social.solihaName,
      role: t.social.solihaRole,
      objectPosition: '50% 18%',
    },
  ];

  return (
    <section id="social" className="section-cv border-y border-brand-line/50 bg-brand-dark py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-10 font-serif text-4xl font-semibold text-[#7ec8cd] sm:mb-12 sm:text-5xl">
            {t.social.title}
          </h2>
        </FadeIn>
      </Container>

      <div className="no-scrollbar overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [-webkit-overflow-scrolling:touch] sm:px-6 xl:px-8">
        <div className="team-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-5 pr-5 sm:gap-6 sm:pr-6 lg:gap-7 lg:pr-7" aria-hidden={copy === 1}>
              {people.map((person) => (
                <article
                  key={`${copy}-${person.name}`}
                  className="group relative flex h-[400px] w-[min(78vw,300px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-brand-line bg-brand-card sm:h-[460px] sm:w-[300px] lg:h-[500px] lg:w-[280px] xl:w-[300px]"
                >
                  <img
                    src={person.image}
                    alt={copy === 1 ? '' : person.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: person.objectPosition }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm">
                    {person.role}
                  </span>
                  <div className="relative z-10 mt-auto flex flex-col gap-3 p-6 sm:p-7">
                    <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                      {person.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/85 sm:text-[15px]">{person.role}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
