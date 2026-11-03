import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export type User = {
  id: string;
  name: string | null;
  email: string;
};

export type UsersResponse = {
  users: User[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

export const fetchUsers=async(userId:string):Promise<User>=>{
   
 const result=await axios.get<User>(`http://localhost:5000/api/users/${userId}`);
    return result.data
    

   
}
const useGetUserDetails = (userId:string,page:string): UseQueryResult<User> => {

    const queryClient=useQueryClient()
    let getCashedDate:UsersResponse| undefined;
    getCashedDate=queryClient.getQueryData<UsersResponse>(["users",+page])
    


  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUsers(userId),
    staleTime: 1000 * 60, // 1 minute
    // refetchInterval:1000*15 //15 ms
    initialData: () => {
        if (getCashedDate) {
          console.log("hi from cached data")
          return getCashedDate.users.find((user) => user.id === userId);
        }else{
            return undefined
        }
    }
  });
  return query;
};
 
export default useGetUserDetails