import { api } from "@/lib/api";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface DataBody {
  name: string;
  email: string;
  password: string;
}

interface DataResponseType {
  message: string;
}

const registerUser = async (data: DataBody): Promise<DataResponseType> => {
  const result = await api.post<DataResponseType>(`/users/auth/register`, data);
  return result.data;
};

const useRegister = (): UseMutationResult<
  DataResponseType,
  AxiosError,
  DataBody
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,

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

export default useRegister;
