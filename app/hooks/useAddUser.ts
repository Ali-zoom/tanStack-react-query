import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios,{AxiosError} from 'axios'
import React from 'react'

interface DataBody{
    name:string,
    email:string,
    password:string,
}

interface DataResponse{
    accessToken:string
}
const addUsers=async(data:DataBody):Promise<DataResponse>=>{
 const result=await axios.post<DataResponse>(`http://localhost:5000/api/users/auth/register`,data);
    return result.data
   
    }

   

const useAddUser = (): UseMutationResult<DataResponse, AxiosError,DataBody> => {
  return useMutation({
    mutationFn: addUsers,
    onSuccess: () => {
        console.log("user added successfully")
    },
    
  });
};

export default useAddUser