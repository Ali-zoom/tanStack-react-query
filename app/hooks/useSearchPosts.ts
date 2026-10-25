import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const fetchUsers = async (q: string): Promise<PostData[]> => {
  const result = await axios.get<PostData[]>(
    `https://jsonplaceholder.typicode.com/posts?title=${q}`,
  );
  return result.data;
};
const useSearchPosts = (q: string): UseQueryResult<PostData[]> => {
  const query = useQuery({
    queryKey: ["search", q],
    queryFn: () => fetchUsers(q),
    staleTime: 1000 * 60 * 5,//5 minutes
    enabled: q.length > 0,//work only if query length > 0
  });
  return query;
};

export default useSearchPosts;
