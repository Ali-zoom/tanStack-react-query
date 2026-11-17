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

const logoutUser = async (): Promise<DataResponseType> => {
  const result = await api.post<DataResponseType>(`/users/auth/logout`);
  return result.data;
};

const useLogout = ()  => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,

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

export default useLogout;
