// entities/user/ui/UserCard.tsx
// User obyektini ko'rsatadigan qayta ishlatiladigan komponent.

import type { User } from '@/entities/user/model/types';

export function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>
      <p className="mt-2 text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500">{user.companyName}</p>
    </div>
  );
}
