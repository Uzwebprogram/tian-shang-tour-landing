import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { en } from '@/shared/i18n/locales/en';
import { ru } from '@/shared/i18n/locales/ru';
import { uz } from '@/shared/i18n/locales/uz';
import { applyDocumentSeo } from '@/shared/config/seo';
import { locales, type Locale, type Messages } from '@/shared/i18n/types';

const STORAGE_KEY = 'tianshan-locale';

const dictionaries: Record<Locale, Messages> = { uz, ru, en };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && (locales as readonly string[]).includes(value);
}

function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
    const lang = window.navigator.language.toLowerCase();
    if (lang.startsWith('ru')) return 'ru';
    if (lang.startsWith('en')) return 'en';
  } catch {
    return 'uz';
  }
  return 'uz';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const meta = dictionaries[locale].meta;
    applyDocumentSeo({
      locale,
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    });
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
