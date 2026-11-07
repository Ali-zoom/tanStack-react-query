'use client'
import useGetUsers from '@/app/hooks/useGetUsers'
import useUpdateUser from '@/app/hooks/useUpdateUser'
import { Button } from '@base-ui/react'
import React from 'react'

const ListUsers = () => {

     const { data, isPending, isError, error, isFetching }=useGetUsers()
     const userUpdate=useUpdateUser()

   

     if(isPending) return <p>Loading users...</p>
     if(isError){
        return <p className='text-red-500'>{error.message}</p>
     }
  return (
    <div>
        <h2>Users</h2>
        <ul>
            {data?.users?.map((user) => (
               <div key={user.id} className='flex justify-between items-center gap-4 border p-2 rounded-md'>
                 <li >{user.name || user.email}</li>
                <Button onClick={() => { userUpdate.mutate({ userID: user.id, userData: { name: "New Name" } }); }} className='bg-blue-500 text-white px-4 py-2 rounded-md'>change user name</Button>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default ListUsers