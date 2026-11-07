import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export type User = {
  id: string;
  name: string | null;
  email: string;
};

export type UsersResponse = {
  users: User[];
  
};
const fetchUsers=async():Promise<UsersResponse>=>{
   
 const result=await axios.get<UsersResponse>(`http://localhost:5000/api/users/all-users/example`);
    return result.data
    

   
}
const useGetUsers = (): UseQueryResult<UsersResponse> => {
  const query = useQuery({
    queryKey: ["all-users"],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60,
    // staleTime: 1000 * 60*2,
    // refetchInterval:1000*15
    
  });
  return query;
};

export default useGetUsers