import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { images } from '@/pages/landing/model/catalog';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { Container } from '@/shared/ui/Container';
import { HeroToursStrip } from '@/pages/landing/ui/HeroToursStrip';

/** Extra image above/below the clip so translateY never shows a seam. */
const PARALLAX_TRAVEL = 160;

export function HeroSection() {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX_TRAVEL]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src={images.hero}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 w-full max-w-none object-cover will-change-transform"
          style={{
            top: -PARALLAX_TRAVEL,
            height: `calc(100% + ${PARALLAX_TRAVEL * 2}px)`,
            y: reduce ? 0 : y,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col pb-5 pt-[108px] sm:pb-8 md:justify-center md:pb-10">
        <div className="flex flex-1 flex-col justify-center md:flex-none">
          <div className="max-w-3xl text-left">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title whitespace-pre-line font-sans font-bold leading-[1.08] tracking-tight text-white"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="hero-desc mt-4 max-w-xl text-left leading-relaxed text-white/80 sm:mt-5"
            >
              {t.hero.description}
            </motion.p>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-black sm:mt-6 sm:px-5 sm:py-2.5 sm:text-base"
            >
              {t.hero.groupTag}
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 md:mt-8"
        >
          <HeroToursStrip />
        </motion.div>
      </Container>
    </section>
  );
}
