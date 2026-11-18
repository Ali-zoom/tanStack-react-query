'use client'
import { LogoutButton } from '@/app/Componants/LogoutButton';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import useLogout from '@/app/hooks/useLogout';
import { Suspense } from 'react';

const Navbar = () => {

    const{data} = useCurrentUser();
      const logout=useLogout()

  return (
<div>
     {data?.name ? (<>
     <p>current user: {data?.name}</p>
     <LogoutButton />
     
     </>):(<button>Login</button>)}   

    </div>
    
    
  )
}

export default Navbar