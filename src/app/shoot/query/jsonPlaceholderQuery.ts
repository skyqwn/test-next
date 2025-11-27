import { shootAPi } from "@/api/shoot/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const getPostsQueryOptions = () => ({
  queryKey: ['posts'] as const,
  queryFn: shootAPi.getPosts,
});

export const usePostsQuery = () => {
  return useSuspenseQuery(getPostsQueryOptions());
};

