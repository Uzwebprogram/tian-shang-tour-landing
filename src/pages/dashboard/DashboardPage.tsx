// pages/dashboard/DashboardPage.tsx
// ⭐ Sahifa = faqat KOMPOZITSIYA. Biznes-logika YO'Q, API so'rovi YO'Q.

import { Header } from '@/widgets/header/Header';
import { PostList } from '@/features/post-list';
import { env } from '@/shared/config/env';

export function DashboardPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-5xl p-6">
        <p className="mb-2 text-sm text-gray-500">
          Namuna: <code className="rounded bg-gray-100 px-1">features/post-list</code> →{' '}
          <code className="rounded bg-gray-100 px-1">entities/user</code> →{' '}
          <code className="rounded bg-gray-100 px-1">shared/api/httpClient</code>
        </p>
        <p className="mb-6 text-xs text-gray-400">
          API: {env.API_BASE_URL}/posts · /users · /comments
        </p>
        <PostList limit={8} />
      </main>
    </div>
  );
}
