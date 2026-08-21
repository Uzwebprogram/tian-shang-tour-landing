// app/routes/index.tsx
// Marshrutlar bitta joyda. Og‘ir sahifalar lazy; landing — darhol (splash uchun).

import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/pages/landing/LandingPage';

const DashboardPage = lazy(() =>
  import('@/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);

const withSuspense = (el: ReactNode) => (
  <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-hidden="true" />}>
    {el}
  </Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: withSuspense(<DashboardPage />) },
  { path: '/login', element: withSuspense(<LoginPage />) },
]);
