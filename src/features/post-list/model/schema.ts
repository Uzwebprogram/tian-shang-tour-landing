// features/post-list/model/schema.ts
// POST /posts uchun validatsiya namunasi.

import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3, 'Sarlavha kamida 3 ta belgi'),
  body: z.string().min(10, 'Matn kamida 10 ta belgi'),
  userId: z.number().int().positive('User ID musbat son bo\'lishi kerak'),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
