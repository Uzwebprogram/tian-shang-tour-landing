// features/post-list/ui/PostCard.tsx

import type { Post } from '@/features/post-list/model/types';

type Props = {
  post: Post;
  selected?: boolean;
  onSelect: (id: number) => void;
};

export function PostCard({ post, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(post.id)}
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        selected
          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
          : 'bg-white hover:border-gray-300'
      }`}
    >
      <p className="text-xs text-gray-400">Post #{post.id} · User {post.userId}</p>
      <h3 className="mt-1 font-semibold capitalize">{post.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.body}</p>
    </button>
  );
}
