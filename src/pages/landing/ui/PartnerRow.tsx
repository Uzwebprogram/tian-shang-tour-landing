import type { ReactElement } from 'react';
import { FadeIn } from '@/shared/ui/FadeIn';
import { useI18n } from '@/shared/i18n/I18nProvider';

const marks: Record<string, ReactElement> = {
  Apple: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.466 2.21-1.247 3.01-.81.83-2.14 1.47-3.27 1.38-.13-1.1.4-2.26 1.2-3.08.86-.9 2.3-1.56 3.32-1.31zM20.5 17.2c-.55 1.26-.82 1.82-1.54 2.94-1 1.55-2.42 3.48-4.18 3.5-1.56.02-1.97-1.02-4.1-1.01-2.13.01-2.58 1.04-4.14 1.02-1.76-.03-3.11-1.76-4.11-3.31C.3 16.8-.9 11.4 1.62 7.86c1.24-1.75 3.2-2.86 5.12-2.86 1.91 0 3.11 1.05 4.69 1.05 1.54 0 2.48-1.06 4.7-1.06 1.68 0 3.46.91 4.7 2.49-4.13 2.27-3.46 8.18.67 9.72z" />
    </svg>
  ),
  Microsoft: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  ),
  Google: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z"
      />
    </svg>
  ),
  Tesla: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
      <path d="M12 1.5c4.4 2.6 7.3 3.7 12 4.3-1.2 5.4-4.2 10.1-12 16.7C4.2 15.9 1.2 11.2 0 5.8 4.7 5.2 7.6 4.1 12 1.5zm0 3.3C8.7 6.5 6.3 7.3 2.7 7.8c.9 3.7 3.1 7.1 9.3 12.4 6.2-5.3 8.4-8.7 9.3-12.4C17.7 7.3 15.3 6.5 12 4.8z" />
    </svg>
  ),
};

export function PartnerRow() {
  const { t } = useI18n();
  const names = ['Apple', 'Microsoft', 'Google', 'Tesla'];

  return (
    <div>
      <FadeIn>
        <h2 className="mb-10 font-serif text-3xl font-semibold text-brand-teal sm:text-4xl">
          {t.partners.title}
        </h2>
      </FadeIn>
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
        {names.map((name, index) => (
          <FadeIn key={name} delay={index * 0.06}>
            <div className="flex h-16 items-center justify-center rounded-lg border border-brand-line bg-brand-card">
              <span className="sr-only">{name}</span>
              {marks[name]}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
