// features/post-list/hooks/usePosts.ts

import { useQuery } from '@tanstack/react-query';
import { postRepository } from '@/features/post-list/api/postRepository';

export function usePosts(limit = 10) {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => postRepository.list(limit),
    staleTime: 60_000,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postRepository.findById(id),
    enabled: id > 0,
    staleTime: 60_000,
  });
}

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => postRepository.listComments(postId),
    enabled: postId > 0,
    staleTime: 60_000,
  });
}
