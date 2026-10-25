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
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};
const fetchUsers=async(page:number,limit:number):Promise<UsersResponse>=>{
   
 const result=await axios.get<UsersResponse>(`http://localhost:5000/api/users/users-list-example?page=${page}&limit=${limit}`);
    return result.data
    

   
}
const useGetUsersPagination = (page:number,limit:number): UseQueryResult<UsersResponse> => {
  const query = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page,limit),
    staleTime: 1000 * 60*2,
    // refetchInterval:1000*15
  });
  return query;
};

export default useGetUsersPagination