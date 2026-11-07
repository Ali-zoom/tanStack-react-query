'use client'
import useAddUser from '@/app/hooks/useAddUser'
import React, { useState } from 'react'

const AddUserForm = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    


        const addUser=useAddUser() //call the custom hook to add user
        const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
               //call the mutate function to add user

     addUser.mutate({name,email,password},{onSuccess:()=>{
            setName("")
            setEmail("")
            setPassword("")
        }}) 
    
    
    }
  return (
   <div>
        <h1>Add User Page</h1>

        <form  onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 mx-auto"> 
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='name' />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' />
            {/* <button type='submit'  disabled={addUser.isPending} className='bg-blue-500 text-white p-2 rounded-md'>
                {addUser.isPending ? "Adding User..." : "Add User"}
            </button> */}

            <button type='submit'>
                submit

            </button>
        </form>
    </div>
  )
}

export default AddUserForm