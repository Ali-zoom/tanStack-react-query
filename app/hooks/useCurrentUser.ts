import { api } from "@/lib/api";
import { CurrentUser } from "@/lib/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const result = await api.get<CurrentUser | null>(
      `/users/auth/current-user`,
    );
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return null;
    throw error;
  }
};

const useCurrentUser = (): UseQueryResult<CurrentUser | null> => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval:1000*15
  });
  return query;
};

export default useCurrentUser;
