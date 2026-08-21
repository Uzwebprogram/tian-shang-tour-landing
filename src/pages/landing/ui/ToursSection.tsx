import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import {
  images,
  saryChelekGallery,
  almatyGallery,
  tajikistanGallery,
} from '@/pages/landing/model/catalog';
import { TourGalleryModal } from '@/pages/landing/ui/TourGalleryModal';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

type SectionTour = {
  id: string;
  image: string;
  title: string;
  text: string;
  duration: string;
  price: string;
  gallery: readonly string[];
};

export function ToursSection() {
  const { t } = useI18n();
  const [activeTour, setActiveTour] = useState<SectionTour | null>(null);

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
      id: 'mangystau',
      image: images.porsche,
      title: t.tours.porscheTitle,
      text: t.tours.porscheText,
      duration: t.tours.porscheDuration,
      price: t.tours.porschePrice,
      gallery: [],
    },
    {
      id: 'altai',
      image: images.safari,
      title: t.tours.safariTitle,
      text: t.tours.safariDates,
      duration: t.tours.safariDates,
      price: t.tours.safariSpots,
      gallery: [],
    },
    {
      id: 'turkestan',
      image: images.china,
      title: t.tours.chinaTitle,
      text: t.tours.chinaDates,
      duration: t.tours.chinaDates,
      price: t.tours.chinaSpots,
      gallery: [],
    },
    {
      id: 'karakol',
      image: images.ice,
      title: t.tours.iceTitle,
      text: t.tours.iceDates,
      duration: t.tours.iceDates,
      price: t.tours.iceSpots,
      gallery: [],
    },
  ];

  return (
    <section id="tours" className="section-cv bg-white py-16 sm:py-24 xl:py-32">
      <Container>
        <FadeIn>
          <h2 className="mb-10 font-serif text-4xl font-semibold text-brand-teal sm:mb-12 sm:text-5xl">
            {t.tours.title}
          </h2>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <FadeIn key={tour.id} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => {
                  if (tour.gallery.length) setActiveTour(tour);
                  else window.location.hash = 'subscribe';
                }}
                className="group relative block h-[420px] w-full overflow-hidden rounded-3xl border border-brand-line bg-brand-card text-left sm:h-[460px]"
              >
                <img
                  src={tour.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent" />
                <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-ink/80 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                  <CalendarDays className="h-2.5 w-2.5 text-brand-mint" />
                  {tour.duration}
                </span>
                <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-8">
                  <h3 className="font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {tour.title}
                  </h3>
                  <p className="text-sm font-medium text-white/90 sm:text-base">{tour.price}</p>
                </div>
              </button>
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
        open={Boolean(activeTour)}
        onClose={() => setActiveTour(null)}
        title={activeTour?.title ?? ''}
        images={activeTour?.gallery ?? []}
      />
    </section>
  );
}
