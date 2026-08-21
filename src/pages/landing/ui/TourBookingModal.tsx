import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { TourBookingForm } from '@/pages/landing/ui/TourBookingForm';

type TourBookingModalProps = {
  open: boolean;
  tourTitle: string;
  onClose: () => void;
};

export function TourBookingModal({ open, tourTitle, onClose }: TourBookingModalProps) {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[220] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t.booking.close}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/10 bg-[#141414] p-6 shadow-glass sm:rounded-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              aria-label={t.booking.close}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-6">
              <TourBookingForm
                tourTitle={tourTitle}
                idPrefix="modal-book"
                onSuccessClose={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
