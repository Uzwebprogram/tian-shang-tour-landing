import { useEffect, useRef } from 'react';
import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

type Person = {
  image: string;
  name: string;
  role: string;
  objectPosition: string;
};

function TeamCard({ person, decorative }: { person: Person; decorative?: boolean }) {
  return (
    <article className="group relative flex h-[400px] w-[min(78vw,300px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-brand-line bg-brand-card sm:h-[460px] sm:w-[300px] lg:h-[500px] lg:w-[280px] xl:w-[300px]">
      <img
        src={person.image}
        alt={decorative ? '' : person.name}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: person.objectPosition }}
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />
      <span className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm">
        {person.role}
      </span>
      <div className="relative z-10 mt-auto flex flex-col gap-3 p-6 sm:p-7">
        <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">{person.name}</h3>
        <p className="text-sm leading-relaxed text-white/85 sm:text-[15px]">{person.role}</p>
      </div>
    </article>
  );
}

function TeamScroller({ people }: { people: Person[] }) {
  const reduce = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const adjustingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const loopWidth = () => el.scrollWidth / 2;

    const wrap = () => {
      const half = loopWidth();
      if (half <= 0) return;
      adjustingRef.current = true;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0) el.scrollLeft += half;
      adjustingRef.current = false;
    };

    let frame = 0;
    const speed = 0.55;
    const tick = () => {
      if (!reduce && !userPausedRef.current) {
        const half = loopWidth();
        if (half > 1) {
          adjustingRef.current = true;
          el.scrollLeft += speed;
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          adjustingRef.current = false;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const pause = () => {
      userPausedRef.current = true;
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
    const resumeSoon = () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = window.setTimeout(() => {
        userPausedRef.current = false;
      }, 1600);
    };

    const onScroll = () => {
      if (!adjustingRef.current) wrap();
    };

    el.addEventListener('pointerdown', pause);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('pointerup', resumeSoon);
    el.addEventListener('pointercancel', resumeSoon);
    el.addEventListener('touchend', resumeSoon);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('pointerup', resumeSoon);
      el.removeEventListener('pointercancel', resumeSoon);
      el.removeEventListener('touchend', resumeSoon);
      el.removeEventListener('scroll', onScroll);
    };
  }, [reduce, people.length]);

  return (
    <div
      ref={scrollerRef}
      className="no-scrollbar cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 active:cursor-grabbing [-webkit-overflow-scrolling:touch] sm:px-6 xl:px-8"
    >
      <div className="flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-5 pr-5 sm:gap-6 sm:pr-6 lg:gap-7 lg:pr-7"
            aria-hidden={copy === 1}
          >
            {people.map((person) => (
              <TeamCard key={`${copy}-${person.name}`} person={person} decorative={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialProofSection() {
  const { t } = useI18n();
  const people: Person[] = [
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
      <TeamScroller people={people} />
    </section>
  );
}
