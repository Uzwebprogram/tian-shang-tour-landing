// features/post-list/api/postRepository.ts
// ⭐ Post bilan bog'liq barcha API so'rovlari. Faqat shu joy httpClient ga tegadi.

import { httpClient } from '@/shared/api/httpClient';
import type { Comment, Post } from '@/features/post-list/model/types';
import type { CreatePostValues } from '@/features/post-list/model/schema';

export const postRepository = {
  async list(limit = 10): Promise<Post[]> {
    const data = await httpClient.get<Post[]>('/posts');
    return data.slice(0, limit);
  },

  async findById(id: number): Promise<Post | null> {
    try {
      return await httpClient.get<Post>(`/posts/${id}`);
    } catch {
      return null;
    }
  },

  async listComments(postId: number): Promise<Comment[]> {
    return httpClient.get<Comment[]>(`/posts/${postId}/comments`);
  },

  async create(values: CreatePostValues): Promise<Post> {
    return httpClient.post<Post>('/posts', values);
  },
};
