// lib/server-user.ts
import { cache } from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';
import type { CurrentUser } from './types';

export const getServerUser = cache(async (): Promise<CurrentUser | null> => {
  const token = (await cookies()).get('access_token')?.value;
  if (!token) return null;
  try {
    const { data } = await axios.get<CurrentUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/current-user`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  } catch {
    return null;
  }
});