'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import useLogin from '@/app/hooks/useLogin';
const LoginForm = () => {

const router = useRouter();
  const params = useSearchParams();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace(params.get('from') ?? '/dashboard');
          router.refresh();
        },
        
      },
    );
  }

  const error = axios.isAxiosError<{ message?: string[] }>(login.error)
    ? login.error.response?.data?.message?.[0]
    : login.error
      ? 'Something went wrong'
      : null;


console.log(error)
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-1/2 mx-auto">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={login.isPending}>Login</button>
      {error && <p style={{ color: 'red', width: '100%' }}>{String(error)}</p>}
    </form>
  )
}

export default LoginForm