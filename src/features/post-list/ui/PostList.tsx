// features/post-list/ui/PostList.tsx
// ⭐ UI komponent. httpClient ni IMPORT QILMAYDI — faqat hook orqali ma'lumot oladi.

import { useState } from 'react';
import { usePosts } from '@/features/post-list/hooks/usePosts';
import { PostCard } from '@/features/post-list/ui/PostCard';
import { PostDetail } from '@/features/post-list/ui/PostDetail';

export function PostList({ limit = 10 }: { limit?: number }) {
  const { data: posts, isLoading, isError } = usePosts(limit);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p className="text-red-600">Postlar yuklanmadi. API ni tekshiring.</p>;
  if (!posts?.length) return <p>Postlar topilmadi.</p>;

  const activeId = selectedId ?? posts[0].id;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard
              post={post}
              selected={activeId === post.id}
              onSelect={setSelectedId}
            />
          </li>
        ))}
      </ul>
      <PostDetail postId={activeId} />
    </div>
  );
}
