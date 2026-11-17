'use client';
import { useRouter } from 'next/navigation';
import useLogout from '../hooks/useLogout';

export function LogoutButton() {
  const router = useRouter();
  const logout = useLogout();
  return (
    <button
      onClick={() =>
        logout.mutate(undefined, {
          onSuccess: () => {
            router.replace('/login');
            router.refresh();
          },
        })
      }
    >
      Logout
    </button>
  );
}