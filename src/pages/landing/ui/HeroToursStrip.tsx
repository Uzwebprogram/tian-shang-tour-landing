import { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { images, saryChelekGallery, almatyGallery, tajikistanGallery } from '@/pages/landing/model/catalog';
import { TourGalleryModal } from '@/pages/landing/ui/TourGalleryModal';
import { useI18n } from '@/shared/i18n/I18nProvider';

type TourItem = {
  id: string;
  image: string;
  title: string;
  dates: string;
  spots: string;
  gallery?: readonly string[];
};

function OfferCard({ title, cta }: { title: string; cta: string }) {
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
      <a
        href="#subscribe"
        className="relative inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-black hover:bg-white/90"
      >
        {cta}
        <ArrowRight className="h-3 w-3" />
      </a>
    </article>
  );
}

function TourCard({
  tour,
  onOpen,
}: {
  tour: TourItem;
  onOpen?: (tour: TourItem) => void;
}) {
  const interactive = Boolean(tour.gallery?.length && onOpen);
  const className =
    'group relative h-[240px] w-[188px] shrink-0 overflow-hidden rounded-2xl text-left sm:h-[280px] sm:w-[210px]';

  const body = (
    <>
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
    </>
  );

  if (interactive) {
    return (
      <button type="button" className={className} onClick={() => onOpen?.(tour)}>
        {body}
      </button>
    );
  }

  return <article className={className}>{body}</article>;
}

function CardRow({
  tours,
  offerTitle,
  offerCta,
  onOpen,
}: {
  tours: TourItem[];
  offerTitle: string;
  offerCta: string;
  onOpen?: (tour: TourItem) => void;
}) {
  return (
    <div className="flex gap-3 pr-3">
      <OfferCard title={offerTitle} cta={offerCta} />
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onOpen={onOpen} />
      ))}
    </div>
  );
}

export function HeroToursStrip() {
  const { t } = useI18n();
  const [activeTour, setActiveTour] = useState<TourItem | null>(null);

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
      id: 'safari',
      image: images.safari,
      title: t.tours.safariTitle,
      dates: t.tours.safariDates,
      spots: t.tours.safariSpots,
    },
    {
      id: 'china',
      image: images.china,
      title: t.tours.chinaTitle,
      dates: t.tours.chinaDates,
      spots: t.tours.chinaSpots,
    },
    {
      id: 'ice',
      image: images.ice,
      title: t.tours.iceTitle,
      dates: t.tours.iceDates,
      spots: t.tours.iceSpots,
    },
  ];

  return (
    <>
      <div className="flex items-stretch gap-3">
        <div className="min-w-0 flex-1 overflow-hidden md:overflow-x-auto md:pb-1 md:pr-2 md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
          <div
            className={`hero-tour-marquee flex w-max ${activeTour ? '[animation-play-state:paused]' : ''}`}
          >
            <CardRow
              tours={tours}
              offerTitle={t.hero.offerTitle}
              offerCta={t.hero.offerCta}
              onOpen={setActiveTour}
            />
            <div className="md:hidden" aria-hidden="true">
              <CardRow
                tours={tours}
                offerTitle={t.hero.offerTitle}
                offerCta={t.hero.offerCta}
                onOpen={setActiveTour}
              />
            </div>
          </div>
        </div>

        <a
          href="#subscribe"
          className="hidden shrink-0 items-center justify-center px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 [writing-mode:vertical-rl] rotate-180 hover:text-white md:flex"
        >
          {t.tours.all}
        </a>
      </div>

      <TourGalleryModal
        open={Boolean(activeTour?.gallery?.length)}
        onClose={() => setActiveTour(null)}
        title={activeTour?.title ?? ''}
        images={activeTour?.gallery ?? []}
      />
    </>
  );
}
