// components/RequireRole.tsx
'use client';
import type { Role } from '@/lib/types';
import useCurrentUser from '../hooks/useCurrentUser';

export function RequireRole({ roles, children }: { roles: Role[]; children: React.ReactNode }) {
  const { data: me, isLoading } = useCurrentUser();
  if (isLoading || !me || !roles.includes(me.role)) return null;
  return <>{children}</>;
}

// we used it like this in the app/page.tsx file to show the admin panel link only to users with the 'ADMIN' role:
{/* <RequireRole roles={['ADMIN']}>
  <a href="/admin">Admin panel</a>
</RequireRole> */}