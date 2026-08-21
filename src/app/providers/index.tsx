// app/providers/index.tsx
// ⭐ Barcha global Provider'lar BITTA joyda yig'iladi.
// "Provider hell" (11 ta o'ralgan provider) o'rniga — bitta tartibli komponent.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { I18nProvider } from '@/shared/i18n/I18nProvider';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>{children}</I18nProvider>
    </QueryClientProvider>
  );
}
