// app/App.tsx
// Ilovaning ildizi — Provider'lar + Router'ni birlashtiradi.

import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { router } from '@/app/routes';
import '@/app/styles/globals.css';

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
