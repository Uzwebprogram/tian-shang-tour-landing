import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import {
  images,
  saryChelekGallery,
  almatyGallery,
  tajikistanGallery,
  mangystauGallery,
  altaiGallery,
  karakolGallery,
  turkestanGallery,
  khorgosGallery,
} from '@/pages/landing/model/catalog';
import { TourBookingModal } from '@/pages/landing/ui/TourBookingModal';
import { TourGalleryModal } from '@/pages/landing/ui/TourGalleryModal';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';
import { cn } from '@/shared/lib/formatDate';

type SectionTour = {
  id: string;
  image: string;
  title: string;
  text: string;
  duration: string;
  price: string;
  gallery: readonly string[];
};

function TourCard({
  tour,
  onGallery,
  onBook,
  bookLabel,
  className,
}: {
  tour: SectionTour;
  onGallery: (tour: SectionTour) => void;
  onBook: (tour: SectionTour) => void;
  bookLabel: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group relative h-[300px] overflow-hidden rounded-3xl border border-brand-line bg-brand-card sm:h-[460px]',
        className,
      )}
    >
      <img
        src={tour.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-brand-ink/80 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm sm:right-6 sm:top-6 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
        <CalendarDays className="h-2.5 w-2.5 text-brand-mint" />
        {tour.duration}
      </span>
      <div className="absolute inset-x-0 bottom-0 space-y-2.5 p-3.5 sm:space-y-4 sm:p-6">
        <h3 className="font-serif text-base font-semibold leading-snug text-white sm:text-2xl">
          {tour.title}
        </h3>
        <div
          className={
            tour.gallery.length > 0 ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-1'
          }
        >
          {tour.gallery.length > 0 ? (
            <button
              type="button"
              onClick={() => onGallery(tour)}
              className="min-w-0 truncate rounded-lg border border-white/20 bg-white/10 px-2.5 py-2.5 text-center text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-sm"
            >
              {tour.price}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onBook(tour)}
            className="min-w-0 truncate rounded-lg bg-white px-2.5 py-2.5 text-center text-xs font-semibold text-black transition hover:bg-white/90 sm:text-sm"
          >
            {bookLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

function MobileMarqueeRow({
  tours,
  direction,
  paused,
  onGallery,
  onBook,
  bookLabel,
}: {
  tours: SectionTour[];
  direction: 'left' | 'right';
  paused: boolean;
  onGallery: (tour: SectionTour) => void;
  onBook: (tour: SectionTour) => void;
  bookLabel: string;
}) {
  const animClass = direction === 'right' ? 'tours-marquee-right' : 'tours-marquee-left';

  return (
    <div className="overflow-hidden">
      <div
        className={`${animClass} flex w-max ${paused ? '[animation-play-state:paused]' : ''}`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-3 pr-3"
            aria-hidden={copy === 1}
          >
            {tours.map((tour) => (
              <TourCard
                key={`${copy}-${tour.id}`}
                tour={tour}
                onGallery={onGallery}
                onBook={onBook}
                bookLabel={bookLabel}
                className="w-[58vw] max-w-[220px] shrink-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToursSection() {
  const { t } = useI18n();
  const [galleryTour, setGalleryTour] = useState<SectionTour | null>(null);
  const [bookingTour, setBookingTour] = useState<SectionTour | null>(null);

  const tours: SectionTour[] = [
    {
      id: 'almaty',
      image: images.almatyCover,
      title: t.tours.almatyTitle,
      text: t.tours.almatyText,
      duration: t.tours.almatyDuration,
      price: t.tours.almatyPrice,
      gallery: almatyGallery,
    },
    {
      id: 'sary-chelek',
      image: images.saryChelekCover,
      title: t.tours.saryChelekTitle,
      text: t.tours.saryChelekText,
      duration: t.tours.saryChelekDuration,
      price: t.tours.saryChelekPrice,
      gallery: saryChelekGallery,
    },
    {
      id: 'kel-suu',
      image: images.kamchatka,
      title: t.tours.kamchatkaTitle,
      text: t.tours.kamchatkaText,
      duration: t.tours.kamchatkaDuration,
      price: t.tours.kamchatkaPrice,
      gallery: [],
    },
    {
      id: 'issyk-kul',
      image: images.transylvania,
      title: t.tours.transylvaniaTitle,
      text: t.tours.transylvaniaText,
      duration: t.tours.transylvaniaDuration,
      price: t.tours.transylvaniaPrice,
      gallery: [],
    },
    {
      id: 'tajikistan',
      image: images.tajikistanCover,
      title: t.tours.tajikistanTitle,
      text: t.tours.tajikistanText,
      duration: t.tours.tajikistanDuration,
      price: t.tours.tajikistanPrice,
      gallery: tajikistanGallery,
    },
    {
      id: 'khorgos',
      image: images.khorgosCover,
      title: t.tours.khorgosTitle,
      text: t.tours.khorgosText,
      duration: t.tours.khorgosDuration,
      price: t.tours.khorgosPrice,
      gallery: khorgosGallery,
    },
    {
      id: 'mangystau',
      image: images.mangystauCover,
      title: t.tours.porscheTitle,
      text: t.tours.porscheText,
      duration: t.tours.porscheDuration,
      price: t.tours.porschePrice,
      gallery: mangystauGallery,
    },
    {
      id: 'altai',
      image: images.altaiCover,
      title: t.tours.safariTitle,
      text: t.tours.safariDates,
      duration: t.tours.safariDates,
      price: t.tours.safariSpots,
      gallery: altaiGallery,
    },
    {
      id: 'turkestan',
      image: images.turkestanCover,
      title: t.tours.chinaTitle,
      text: t.tours.chinaDates,
      duration: t.tours.chinaDates,
      price: t.tours.chinaSpots,
      gallery: turkestanGallery,
    },
    {
      id: 'karakol',
      image: images.karakolCover,
      title: t.tours.iceTitle,
      text: t.tours.iceDates,
      duration: t.tours.iceDates,
      price: t.tours.iceSpots,
      gallery: karakolGallery,
    },
  ];

  const mid = Math.ceil(tours.length / 2);
  const rowRight = tours.slice(0, mid);
  const rowLeft = tours.slice(mid);
  const modalOpen = Boolean(galleryTour || bookingTour);

  return (
    <section id="tours" className="section-cv bg-white py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-10 font-serif text-4xl font-semibold text-brand-teal sm:mb-12 sm:text-5xl">
            {t.tours.title}
          </h2>
        </FadeIn>

        {/* Mobile: 2 looping rows (right / left) */}
        <div className="space-y-4 sm:hidden">
          <MobileMarqueeRow
            tours={rowRight}
            direction="right"
            paused={modalOpen}
            onGallery={setGalleryTour}
            onBook={setBookingTour}
            bookLabel={t.booking.cardCta}
          />
          <MobileMarqueeRow
            tours={rowLeft}
            direction="left"
            paused={modalOpen}
            onGallery={setGalleryTour}
            onBook={setBookingTour}
            bookLabel={t.booking.cardCta}
          />
        </div>

        {/* Tablet / desktop grid */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <FadeIn key={tour.id} delay={index * 0.05}>
              <TourCard
                tour={tour}
                onGallery={setGalleryTour}
                onBook={setBookingTour}
                bookLabel={t.booking.cardCta}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 flex justify-center">
          <a href="#subscribe">
            <Button variant="dark" size="lg">
              {t.tours.all}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </FadeIn>
      </Container>

      <TourGalleryModal
        open={Boolean(galleryTour)}
        onClose={() => setGalleryTour(null)}
        title={galleryTour?.title ?? ''}
        images={galleryTour?.gallery ?? []}
        withBooking
      />

      <TourBookingModal
        open={Boolean(bookingTour)}
        tourTitle={bookingTour?.title ?? ''}
        onClose={() => setBookingTour(null)}
      />
    </section>
  );
}
