// entities/user/api/userRepository.ts
// ⭐ API so'rovlari faqat shu qatlamda. UI httpClient ni to'g'ridan-to'g'ri import qilmaydi.

import { httpClient } from '@/shared/api/httpClient';
import type { User } from '@/entities/user/model/types';

type UserDto = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
};

function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.name,
    username: dto.username,
    email: dto.email,
    phone: dto.phone,
    website: dto.website,
    companyName: dto.company.name,
  };
}

export const userRepository = {
  async findById(id: number): Promise<User | null> {
    try {
      const data = await httpClient.get<UserDto>(`/users/${id}`);
      return mapUser(data);
    } catch {
      return null;
    }
  },

  async list(): Promise<User[]> {
    const data = await httpClient.get<UserDto[]>('/users');
    return data.map(mapUser);
  },
};
