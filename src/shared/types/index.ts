// shared/types/index.ts
// Butun ilova bo'ylab ishlatiladigan umumiy turlar.

export type ID = string;

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
