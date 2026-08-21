// pages/auth/LoginPage.tsx
// Yana bir sahifa namunasi — faqat kompozitsiya.

import { Button } from '@/shared/ui/Button';

export function LoginPage() {
  return (
    <div className="mx-auto max-w-sm p-8">
      <h1 className="mb-4 text-2xl font-bold">Kirish</h1>
      <form className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" />
        <input className="w-full rounded border p-2" type="password" placeholder="Parol" />
        <Button type="submit" className="w-full">Kirish</Button>
      </form>
    </div>
  );
}
