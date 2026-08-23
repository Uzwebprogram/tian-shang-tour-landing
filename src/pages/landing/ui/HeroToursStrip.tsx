import { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { images, saryChelekGallery, almatyGallery, tajikistanGallery, altaiGallery, karakolGallery, turkestanGallery, khorgosGallery } from '@/pages/landing/model/catalog';
import { TourBookingModal } from '@/pages/landing/ui/TourBookingModal';
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
  tours,
  offerTitle,
  offerCta,
  onOpenTour,
  onOffer,
}: {
  tours: TourItem[];
  offerTitle: string;
  offerCta: string;
  onOpenTour: (tour: TourItem) => void;
  onOffer: () => void;
}) {
  return (
    <div className="flex gap-3 pr-3">
      <OfferCard title={offerTitle} cta={offerCta} onClick={onOffer} />
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onOpen={onOpenTour} />
      ))}
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
        <div className="min-w-0 flex-1 overflow-hidden md:overflow-x-auto md:pb-1 md:pr-2 md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
          <div
            className={`hero-tour-marquee flex w-max ${activeTour || offerBooking ? '[animation-play-state:paused]' : ''}`}
          >
            <CardRow
              tours={tours}
              offerTitle={t.hero.offerTitle}
              offerCta={t.hero.offerCta}
              onOpenTour={setActiveTour}
              onOffer={() => setOfferBooking(true)}
            />
            <div className="md:hidden" aria-hidden="true">
              <CardRow
                tours={tours}
                offerTitle={t.hero.offerTitle}
                offerCta={t.hero.offerCta}
                onOpenTour={setActiveTour}
                onOffer={() => setOfferBooking(true)}
              />
            </div>
          </div>
        </div>

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
