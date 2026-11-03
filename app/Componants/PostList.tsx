import React from "react";
import useGetPosts from "../hooks/useGetPosts";
import useSearchPosts from "../hooks/useSearchPosts";
interface SearchProps {
  selectedValue: string;
  queryTitle?: string;
}
const PostList = ({ selectedValue, queryTitle }: SearchProps) => {
  const { isLoading, isError, error, data,isStale,refetch } = useGetPosts(selectedValue); //call the getPostsrHook
  const searchData = useSearchPosts(queryTitle || "");

  if (isLoading && searchData.isLoading) {
    return <p>loading....</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  if (searchData.isError) {
    return <p>{searchData.error.message}</p>;
  }
  return (
    <div className="w-full max-w-md mx-auto my-2 rounded-xl shadow-md">
      {queryTitle?.length === 0 &&
        data?.map((post, index) => (
          <div key={index} className="bg-slate-600 text-black p-2 my-2">
            <p key={index}>{post.id}</p>
            <p className="bg-black text-white">{post.userId}</p>
            <h1>{post.title}</h1>
          </div>
        ))}

      {queryTitle &&
        queryTitle?.length > 0 &&
        searchData.data?.map((post, index) => (
          <div key={index} className="bg-slate-600 text-black p-2 my-2">
            <p key={index}>{post.id}</p>
            <p className="bg-black text-white">{post.userId}</p>
            <h1>{post.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default PostList;
