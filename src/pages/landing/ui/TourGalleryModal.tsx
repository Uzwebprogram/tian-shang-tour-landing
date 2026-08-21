import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';

type TourGalleryModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: readonly string[];
};

export function TourGalleryModal({ open, onClose, title, images }: TourGalleryModalProps) {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();
  const titleId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    scrollerRef.current?.scrollTo({ top: 0 });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div
            ref={scrollerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="h-[100svh] overflow-y-auto overscroll-contain snap-y snap-mandatory bg-black"
          >
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="fixed right-3 top-3 z-[110] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/70 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/85 sm:right-5 sm:top-5"
            >
              {t.tours.closeGallery}
              <X className="h-4 w-4" />
            </button>

            <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[110] flex items-center justify-center gap-3 px-4 sm:bottom-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                {t.tours.scrollHint}
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              </span>
              <button
                type="button"
                onClick={onClose}
                className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-white/90"
              >
                {t.tours.closeGallery}
                <X className="h-4 w-4" />
              </button>
            </div>

            {images.map((src, index) => (
              <section
                key={src}
                className="relative h-[100svh] w-full shrink-0 snap-start snap-always"
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full bg-black object-contain object-center"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </section>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
