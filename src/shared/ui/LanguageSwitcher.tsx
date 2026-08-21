import { locales } from '@/shared/i18n/types';
import { useI18n } from '@/shared/i18n/I18nProvider';
import { cn } from '@/shared/lib/formatDate';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            'min-w-[2.25rem] rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors',
            locale === code
              ? 'bg-brand-teal text-white'
              : 'text-white/70 hover:text-white',
          )}
          aria-pressed={locale === code}
        >
          {t.lang[code]}
        </button>
      ))}
    </div>
  );
}
