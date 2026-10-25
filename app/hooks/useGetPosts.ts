import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

interface PostData{
    userId:number,
    id:number,
    title:string,
    body:string
}
const fetchUsers=async(selectedValue:string):Promise<PostData[]>=>{
    if(selectedValue){
 const result=await axios.get<PostData[]>(`https://jsonplaceholder.typicode.com/posts?userId=${selectedValue}`);
    return result.data
    }else{
 const result=await axios.get<PostData[]>("https://jsonplaceholder.typicode.com/posts");
    return result.data
    }

   
}
const useGetPosts = (selectedValue: string): UseQueryResult<PostData[]> => {
  const query = useQuery({
    queryKey: ["posts", selectedValue],
    queryFn: () => fetchUsers(selectedValue),
    staleTime: 1000 * 10,
    // refetchInterval:1000*15
  });
  return query;
};

export default useGetPosts