import { createQueryKeys } from "@lukemorales/query-key-factory";
import { shootAPi } from "@/api/shoot/api";
import { useSuspenseQuery } from "@tanstack/react-query";


  
export const postsKeys = createQueryKeys('posts', {
  // 전체 조회 - 파라미터 없음
  all: () => ({
    queryKey: ['all'],
    queryFn: shootAPi.getPosts,
  }),
  // 상세 조회 - id 파라미터
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => shootAPi.getPostById(id),
  }),
});

// Hooks
export const usePostsQuery = () => {
  return useSuspenseQuery(postsKeys.all());
};

export const usePostDetailQuery = (id: number) => {
  return useSuspenseQuery(postsKeys.detail(id));
};
