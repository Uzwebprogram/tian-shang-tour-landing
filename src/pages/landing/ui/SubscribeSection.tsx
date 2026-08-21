import { FormEvent, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { z } from 'zod';
import { sendLead } from '@/shared/api/sendLead';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { FadeIn } from '@/shared/ui/FadeIn';

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(24)
    .regex(/^[+\d][\d\s()-]{6,}$/),
  comment: z.string().trim().max(1000),
});

const fieldClass =
  'w-full rounded-lg border border-brand-line bg-brand-card px-5 py-3.5 text-white placeholder:text-slate-500 focus:border-brand-mint focus:outline-none';

export function SubscribeSection() {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();
  const titleId = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'sendError'>('idle');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const resetErrors = () => {
    if (status === 'error' || status === 'sendError') setStatus('idle');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse({ name, phone, comment });
    if (!parsed.success) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      await sendLead(parsed.data);
      setName('');
      setPhone('');
      setComment('');
      setStatus('idle');
      setModalOpen(true);
    } catch {
      setStatus('sendError');
    }
  };

  return (
    <section id="subscribe" className="border-t border-brand-line/50 bg-brand-dark py-16 sm:py-24">
      <Container>
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="whitespace-pre-line font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t.subscribe.title}
          </h2>
          <p className="mt-6 text-brand-muted">{t.subscribe.subtitle}</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-3 text-left">
            <div>
              <label className="mb-1.5 block text-sm text-white/70" htmlFor="lead-name">
                {t.subscribe.nameLabel}
              </label>
              <input
                id="lead-name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  resetErrors();
                }}
                placeholder={t.subscribe.namePlaceholder}
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-white/70" htmlFor="lead-phone">
                {t.subscribe.phoneLabel}
              </label>
              <input
                id="lead-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  resetErrors();
                }}
                placeholder={t.subscribe.phonePlaceholder}
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-white/70" htmlFor="lead-comment">
                {t.subscribe.commentLabel}
              </label>
              <textarea
                id="lead-comment"
                name="comment"
                rows={4}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  resetErrors();
                }}
                placeholder={t.subscribe.commentPlaceholder}
                className={`${fieldClass} resize-y min-h-[120px]`}
              />
            </div>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="mt-2 h-14 w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? t.subscribe.sending : t.subscribe.submit}
              <ArrowUpRight className="h-2.5 w-2.5" />
            </Button>
          </form>

          {status === 'error' ? (
            <p className="mt-3 text-sm text-red-400">{t.subscribe.invalid}</p>
          ) : null}
          {status === 'sendError' ? (
            <p className="mt-3 text-sm text-red-400">{t.subscribe.sendError}</p>
          ) : null}

          <p className="mt-6 text-xs text-brand-muted/70">{t.subscribe.disclaimer}</p>
        </FadeIn>
      </Container>

      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label={t.subscribe.modalClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-8 text-center shadow-glass"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 rounded-full p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
                aria-label={t.subscribe.modalClose}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/20 text-brand-mint">
                <Check className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h3 id={titleId} className="mt-5 text-2xl font-semibold text-white">
                {t.subscribe.modalTitle}
              </h3>
              <p className="mt-3 text-brand-muted">{t.subscribe.modalText}</p>
              <Button
                type="button"
                variant="brand"
                size="lg"
                className="mt-7 w-full"
                onClick={() => setModalOpen(false)}
              >
                {t.subscribe.modalClose}
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
