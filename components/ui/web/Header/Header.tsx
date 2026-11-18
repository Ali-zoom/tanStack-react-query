import { getServerUser } from '@/lib/server-user';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link'
import React, { Suspense } from 'react'
import Navbar from './Navbar';
import useLogout from '@/app/hooks/useLogout';

export const Header = async() => {
    const user = await getServerUser();
  const qc = new QueryClient();
  qc.setQueryData(["current-user"], user);


  return (
    <header className="py-y md:py-6">
      <div className="container flex items-center justify-between space-x-10 ">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          🍕 Pizza
        </Link>

        <HydrationBoundary state={dehydrate(qc)}>
      <Navbar />

      
    </HydrationBoundary>

    
        {/* <Navbar initialSession={initialSession} /> */}
        {/* <ShoppingCart /> */}

      </div>
    </header>
  )
}


