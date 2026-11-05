"use client";

import useGetUserDetails from "@/app/hooks/useGetUserDetails";
import { useSearchParams } from "next/navigation";

const UserDetails = () => {

    const params= useSearchParams()
    const id=params.get("id") as string
    const page=params.get("page") as string
    

    const{data,isLoading,isError,error}=useGetUserDetails(id,page)

    if(isLoading){
        return <p>Loading from wait api call...</p>
    }
    if(isError){
        return <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    }
  return (
    <div className="container mx-auto p-4">
        <p>{data?.name}</p>
        <p>{data?.email}</p>
    </div>
  )
}

export default UserDetails