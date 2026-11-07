import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
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

type CachedUsersDataType = {
    id:string,
    name:string,
    email:string,
    
}

type CachedUsersResponse = {
    users:CachedUsersDataType[]
}
const addUsers=async(data:DataBody):Promise<DataResponse>=>{
 const result=await axios.post<DataResponse>(`http://localhost:5000/api/users/auth/register`,data);
    return result.data
   
    }

   

const useAddUser = (): UseMutationResult<DataResponse, AxiosError,DataBody> => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUsers,
    onMutate:  (data:DataBody) => {
        // get old data from the cache
        const savedUsers= queryClient.getQueryData<CachedUsersResponse>(["all-users"]);
        //  console.log("old data",savedUsers)

        // new user to be added to the cache
        const newUser: CachedUsersDataType = {
            // id: new Date().getTime().toString(), // generate a random id for the new user
             id: crypto.randomUUID(), // generate a random id for the new user
            name: data.name,
            email: data.email,
        };

        //add the new user to the cache for the "all-users" query
        queryClient.setQueryData<CachedUsersResponse>(
          ["all-users"],
          (oldData) => ({
            users: [newUser, ...(oldData?.users ?? [])],
          }),
        );

        // if un error accured (rollback the cache to the old data)
        return ()=>{
            queryClient.setQueryData(["all-users"], savedUsers)
        }



    
        
    },

    onError: (error, data, rollback) => {
        //execute the rollback function to revert the cache to the old data
        if (rollback) {
            rollback();
        }
    },
    onSuccess: () => {
        console.log("user added successfully")
        //update the cache for the "all-users" query to include the new user
        queryClient.invalidateQueries({ queryKey: ["all-users"],exact: false });
    },
    
  });
};

export default useAddUser