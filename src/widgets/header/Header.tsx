// widgets/header/Header.tsx
// Widget — bir nechta feature'dan tashkil topgan yirik UI blok (Header, Sidebar).
// Sahifalarda qayta ishlatiladi.

import { Link } from 'react-router-dom';
import { env } from '@/shared/config/env';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <Link to="/" className="font-bold">
        {env.APP_NAME}
      </Link>
      <nav className="flex gap-4 text-sm">
        <Link to="/">Bosh sahifa</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Kirish</Link>
      </nav>
    </header>
  );
}
