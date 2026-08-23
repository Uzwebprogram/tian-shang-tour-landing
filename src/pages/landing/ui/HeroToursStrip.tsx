import { useEffect, useRef, useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { images, saryChelekGallery, almatyGallery, tajikistanGallery, altaiGallery, karakolGallery, turkestanGallery, khorgosGallery } from '@/pages/landing/model/catalog';
import { TourBookingModal } from '@/pages/landing/ui/TourBookingModal';
import { TourGalleryModal } from '@/pages/landing/ui/TourGalleryModal';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

type TourItem = {
  id: string;
  image: string;
  title: string;
  dates: string;
  spots: string;
  gallery?: readonly string[];
};

function OfferCard({
  title,
  cta,
  onClick,
}: {
  title: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <article className="relative flex h-[240px] w-[188px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-[#1c1c1c] p-4 sm:h-[280px] sm:w-[210px] sm:p-5">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 210 280"
        aria-hidden="true"
      >
        <path
          d="M-10 240 C40 190 70 210 110 140 S170 70 230 20"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
        />
        <path
          d="M20 270 C80 210 90 180 150 110 S190 50 250 10"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      <h3 className="relative max-w-[12ch] text-[15px] font-semibold leading-snug text-white sm:text-base">
        {title}
      </h3>
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-black hover:bg-white/90"
      >
        {cta}
        <ArrowRight className="h-3 w-3" />
      </button>
    </article>
  );
}

function TourCard({
  tour,
  onOpen,
}: {
  tour: TourItem;
  onOpen: (tour: TourItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(tour)}
      className="group relative h-[240px] w-[188px] shrink-0 overflow-hidden rounded-2xl text-left sm:h-[280px] sm:w-[210px]"
    >
      <img
        src={tour.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
        <User className="h-2.5 w-2.5" />
        {tour.spots}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <h3 className="text-sm font-semibold leading-snug text-white sm:text-[15px]">{tour.title}</h3>
        <p className="mt-1 text-[11px] leading-snug text-white/70">{tour.dates}</p>
      </div>
    </button>
  );
}

function CardRow({
  copy,
  tours,
  offerTitle,
  offerCta,
  onOpenTour,
  onOffer,
}: {
  copy: number;
  tours: TourItem[];
  offerTitle: string;
  offerCta: string;
  onOpenTour: (tour: TourItem) => void;
  onOffer: () => void;
}) {
  return (
    <div className="flex gap-3 pr-3" aria-hidden={copy === 1}>
      <OfferCard title={offerTitle} cta={offerCta} onClick={onOffer} />
      {tours.map((tour) => (
        <TourCard key={`${copy}-${tour.id}`} tour={tour} onOpen={onOpenTour} />
      ))}
    </div>
  );
}

function HeroStripScroller({
  tours,
  offerTitle,
  offerCta,
  onOpenTour,
  onOffer,
  paused,
}: {
  tours: TourItem[];
  offerTitle: string;
  offerCta: string;
  onOpenTour: (tour: TourItem) => void;
  onOffer: () => void;
  paused: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const adjustingRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

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
    const speed = 0.5;
    const tick = () => {
      if (!reduce && !userPausedRef.current && !pausedRef.current) {
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
  }, [reduce, tours.length]);

  return (
    <div
      ref={scrollerRef}
      className="no-scrollbar min-w-0 flex-1 cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain pb-1 active:cursor-grabbing [-webkit-overflow-scrolling:touch]"
    >
      <div className="flex w-max">
        {[0, 1].map((copy) => (
          <CardRow
            key={copy}
            copy={copy}
            tours={tours}
            offerTitle={offerTitle}
            offerCta={offerCta}
            onOpenTour={onOpenTour}
            onOffer={onOffer}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroToursStrip() {
  const { t } = useI18n();
  const [activeTour, setActiveTour] = useState<TourItem | null>(null);
  const [offerBooking, setOfferBooking] = useState(false);

  const tours: TourItem[] = [
    {
      id: 'sary-chelek',
      image: images.saryChelekCover,
      title: t.tours.saryChelekTitle,
      dates: t.tours.saryChelekDates,
      spots: t.tours.saryChelekSpots,
      gallery: saryChelekGallery,
    },
    {
      id: 'almaty',
      image: images.almatyCover,
      title: t.tours.almatyTitle,
      dates: t.tours.almatyDates,
      spots: t.tours.almatySpots,
      gallery: almatyGallery,
    },
    {
      id: 'tajikistan',
      image: images.tajikistanCover,
      title: t.tours.tajikistanTitle,
      dates: t.tours.tajikistanDates,
      spots: t.tours.tajikistanSpots,
      gallery: tajikistanGallery,
    },
    {
      id: 'khorgos',
      image: images.khorgosCover,
      title: t.tours.khorgosTitle,
      dates: t.tours.khorgosDates,
      spots: t.tours.khorgosSpots,
      gallery: khorgosGallery,
    },
    {
      id: 'safari',
      image: images.altaiCover,
      title: t.tours.safariTitle,
      dates: t.tours.safariDates,
      spots: t.tours.safariSpots,
      gallery: altaiGallery,
    },
    {
      id: 'china',
      image: images.turkestanCover,
      title: t.tours.chinaTitle,
      dates: t.tours.chinaDates,
      spots: t.tours.chinaSpots,
      gallery: turkestanGallery,
    },
    {
      id: 'ice',
      image: images.karakolCover,
      title: t.tours.iceTitle,
      dates: t.tours.iceDates,
      spots: t.tours.iceSpots,
      gallery: karakolGallery,
    },
  ];

  const galleryImages =
    activeTour?.gallery && activeTour.gallery.length > 0
      ? activeTour.gallery
      : activeTour
        ? [activeTour.image]
        : [];

  return (
    <>
      <div className="flex items-stretch gap-3">
        <HeroStripScroller
          tours={tours}
          offerTitle={t.hero.offerTitle}
          offerCta={t.hero.offerCta}
          onOpenTour={setActiveTour}
          onOffer={() => setOfferBooking(true)}
          paused={Boolean(activeTour || offerBooking)}
        />

        <a
          href="#tours"
          className="hidden shrink-0 items-center justify-center px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 [writing-mode:vertical-rl] rotate-180 hover:text-white md:flex"
        >
          {t.tours.all}
        </a>
      </div>

      <TourGalleryModal
        open={Boolean(activeTour)}
        onClose={() => setActiveTour(null)}
        title={activeTour?.title ?? ''}
        images={galleryImages}
        withBooking
      />

      <TourBookingModal
        open={offerBooking}
        tourTitle={t.hero.offerTitle}
        onClose={() => setOfferBooking(false)}
      />
    </>
  );
}
