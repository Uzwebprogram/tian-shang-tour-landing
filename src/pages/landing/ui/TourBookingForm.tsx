import { FormEvent, useId, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { z } from 'zod';
import { sendLead } from '@/shared/api/sendLead';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { Button } from '@/shared/ui/Button';

const bookingSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(24)
    .regex(/^[+\d][\d\s()-]{6,}$/),
  seats: z.coerce.number().int().min(1).max(30),
  tour: z.string().trim().min(1),
});

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-brand-mint focus:outline-none';

type TourBookingFormProps = {
  tourTitle: string;
  idPrefix?: string;
  onSuccessClose?: () => void;
};

export function TourBookingForm({
  tourTitle,
  idPrefix = 'book',
  onSuccessClose,
}: TourBookingFormProps) {
  const { t } = useI18n();
  const titleId = useId();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState('1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'sendError' | 'success'>(
    'idle',
  );

  const resetErrors = () => {
    if (status === 'error' || status === 'sendError') setStatus('idle');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = bookingSchema.safeParse({
      firstName,
      lastName,
      phone,
      seats,
      tour: tourTitle,
    });
    if (!parsed.success) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      await sendLead({
        name: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        seats: parsed.data.seats,
        tour: parsed.data.tour,
      });
      setFirstName('');
      setLastName('');
      setPhone('');
      setSeats('1');
      setStatus('success');
    } catch {
      setStatus('sendError');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/20 text-brand-mint">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <h3 id={titleId} className="mt-5 text-2xl font-semibold text-white">
          {t.booking.successTitle}
        </h3>
        <p className="mt-3 text-brand-muted">{t.booking.successText}</p>
        {onSuccessClose ? (
          <Button
            type="button"
            variant="brand"
            size="lg"
            className="mt-7 w-full"
            onClick={onSuccessClose}
          >
            {t.booking.close}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-mint">
        {t.booking.eyebrow}
      </p>
      <h3 id={titleId} className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
        {t.booking.title}
      </h3>
      <p className="mt-2 text-sm text-brand-muted">{t.booking.subtitle}</p>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-xs text-white/50">{t.booking.tourLabel}</p>
        <p className="mt-1 font-medium text-white">{tourTitle}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/70" htmlFor={`${idPrefix}-first`}>
              {t.booking.firstNameLabel}
            </label>
            <input
              id={`${idPrefix}-first`}
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                resetErrors();
              }}
              placeholder={t.booking.firstNamePlaceholder}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70" htmlFor={`${idPrefix}-last`}>
              {t.booking.lastNameLabel}
            </label>
            <input
              id={`${idPrefix}-last`}
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                resetErrors();
              }}
              placeholder={t.booking.lastNamePlaceholder}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70" htmlFor={`${idPrefix}-phone`}>
            {t.booking.phoneLabel}
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              resetErrors();
            }}
            placeholder={t.booking.phonePlaceholder}
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70" htmlFor={`${idPrefix}-seats`}>
            {t.booking.seatsLabel}
          </label>
          <input
            id={`${idPrefix}-seats`}
            type="number"
            min={1}
            max={30}
            value={seats}
            onChange={(e) => {
              setSeats(e.target.value);
              resetErrors();
            }}
            placeholder={t.booking.seatsPlaceholder}
            className={fieldClass}
          />
        </div>

        <Button
          type="submit"
          variant="brand"
          size="lg"
          className="mt-2 h-14 w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? t.booking.sending : t.booking.submit}
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </form>

      {status === 'error' ? <p className="mt-3 text-sm text-red-400">{t.booking.invalid}</p> : null}
      {status === 'sendError' ? (
        <p className="mt-3 text-sm text-red-400">{t.booking.sendError}</p>
      ) : null}

      <p className="mt-4 text-xs text-white/40">{t.booking.disclaimer}</p>
    </>
  );
}
