import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios,{AxiosError} from 'axios'
import React from 'react'

interface DataBody{
    name:string
}

interface UpdateUserType{
    userID:string,
    userData:DataBody
}

interface DataResponse{
   name:string,
    email:string,
}

type CachedUsersDataType = {
    id:string,
    name:string,
    email:string,
    
}

type CachedUsersResponse = {
    users:CachedUsersDataType[]
}
const updateUsers = async ({ userID, userData }: UpdateUserType): Promise<DataResponse> => {
  const result = await axios.put<DataResponse>(`http://localhost:5000/api/users/update-user/${userID}`, userData);
  return result.data;
};

const useUpdateUser = (): UseMutationResult<DataResponse, AxiosError, UpdateUserType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsers,
    onMutate: (data: UpdateUserType) => {
      const savedUsers = queryClient.getQueryData<CachedUsersResponse>(["all-users"]);

      queryClient.setQueryData<CachedUsersResponse>(
        ["all-users"],
        (oldData) => ({
          users: (oldData?.users ?? []).map((el) => {
            if (el.id === data.userID) {
              return { ...el, name: data.userData.name };
            }

            return el;
          }),
        }),
      );

      return () => {
        queryClient.setQueryData(["all-users"], savedUsers);
      };
    },
    onError: (_error, _data, rollback) => {
      if (rollback) {
        rollback();
      }
    },
  });
};

export default useUpdateUser