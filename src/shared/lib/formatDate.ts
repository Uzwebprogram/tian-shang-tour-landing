// shared/lib/formatDate.ts
// Biznesga bog'liq bo'lmagan umumiy yordamchilar.
// Eski lib/ va utils/ papkalari ANA SHU YERDA birlashadi — bitta joy.

export function formatDate(date: Date | string, locale = 'uz-UZ'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

// Tailwind class'larni birlashtirish uchun (shadcn standarti)
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
