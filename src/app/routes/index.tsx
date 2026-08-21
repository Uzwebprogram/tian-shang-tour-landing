// app/routes/index.tsx
// Marshrutlar bitta joyda. Sahifalar lazy yuklanadi (code splitting).

import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LandingPage = lazy(() =>
  import('@/pages/landing/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const DashboardPage = lazy(() =>
  import('@/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);

const withSuspense = (el: ReactNode) => (
  <Suspense
    fallback={
      <p className="grid min-h-screen place-items-center bg-brand-ink text-white">…</p>
    }
  >
    {el}
  </Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: withSuspense(<LandingPage />) },
  { path: '/dashboard', element: withSuspense(<DashboardPage />) },
  { path: '/login', element: withSuspense(<LoginPage />) },
]);
