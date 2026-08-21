// features/post-list/ui/PostDetail.tsx
// Tanlangan post + uning commentlari + muallif (entity relation namunasi).

import { UserCard, userRepository } from '@/entities/user';
import { usePost, usePostComments } from '@/features/post-list/hooks/usePosts';
import { useQuery } from '@tanstack/react-query';

export function PostDetail({ postId }: { postId: number }) {
  const { data: post, isLoading } = usePost(postId);
  const { data: comments, isLoading: commentsLoading } = usePostComments(postId);
  const { data: author } = useQuery({
    queryKey: ['users', post?.userId],
    queryFn: () => userRepository.findById(post!.userId),
    enabled: !!post?.userId,
    staleTime: 60_000,
  });

  if (isLoading) return <p className="text-sm text-gray-500">Post yuklanmoqda...</p>;
  if (!post) return <p className="text-sm text-gray-500">Post topilmadi.</p>;

  return (
    <div className="space-y-4">
      <article className="rounded-lg border bg-white p-5">
        <p className="text-xs text-gray-400">GET /posts/{post.id}</p>
        <h2 className="mt-1 text-xl font-bold capitalize">{post.title}</h2>
        <p className="mt-3 text-gray-700">{post.body}</p>
      </article>

      {author && (
        <section>
          <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
            Muallif — GET /users/{author.id}
          </p>
          <UserCard user={author} />
        </section>
      )}

      <section>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Commentlar — GET /posts/{post.id}/comments
        </p>
        {commentsLoading && <p className="text-sm text-gray-500">Commentlar yuklanmoqda...</p>}
        <ul className="space-y-2">
          {comments?.slice(0, 5).map((comment) => (
            <li key={comment.id} className="rounded border bg-gray-50 p-3 text-sm">
              <p className="font-medium">{comment.name}</p>
              <p className="text-xs text-gray-500">{comment.email}</p>
              <p className="mt-1 text-gray-600">{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
