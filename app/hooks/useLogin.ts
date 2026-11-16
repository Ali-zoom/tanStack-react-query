import { api } from "@/lib/api";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface DataBody {
  email: string;
  password: string;
}

interface DataResponseType {
  message: string;
}

const loginUser = async (data: DataBody): Promise<DataResponseType> => {
  const result = await api.post<DataResponseType>(`/users/auth/login`, data);
  return result.data;
};

const useLogin = (): UseMutationResult<
  DataResponseType,
  AxiosError,
  DataBody
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log(data.message);
      
      // refetch current-user
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
        exact: true,
      });
    },
  });
};

export default useLogin;
