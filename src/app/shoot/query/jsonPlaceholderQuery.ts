import { shootAPi } from "@/api/shoot/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const getPostsQueryOptions = () => ({
  queryKey: ['posts'] as const,
  queryFn: shootAPi.getPosts,
  // staleTime: 0, // 테스트: 캐시 무시하고 항상 refetch
});

export const usePostsQuery = () => {
  return useSuspenseQuery(getPostsQueryOptions());
};

