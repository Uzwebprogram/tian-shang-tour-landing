import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setValue(to);
      return;
    }
    const started = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="section-cv bg-white py-16 sm:py-24 xl:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-16">
            <FadeIn>
              <p className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                <CountUp to={10000} suffix="+" />
              </p>
              <p className="mt-4 max-w-md text-lg text-black/70">{t.stats.travelersLabel}</p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                {t.stats.years}
              </p>
              <p className="mt-4 max-w-md text-lg text-black/70">{t.stats.yearsLabel}</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.16} className="overflow-hidden rounded-3xl">
            <img
              src={images.stats}
              alt=""
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[600px]"
              loading="lazy"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
