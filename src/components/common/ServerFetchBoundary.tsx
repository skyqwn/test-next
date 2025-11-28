import type { ReactNode } from "react";

import {
  type FetchQueryOptions,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getQueryClient } from "@/shared/libs/tanstack-query/client";

export type FetchOptions = Pick<FetchQueryOptions, "queryKey" | "queryFn">;

type Props = {
  fetchOptions: FetchOptions[] | FetchOptions;
  children: ReactNode | ReactNode[];
};

export const ServerFetchBoundary = async ({ fetchOptions, children }: Props) => {
  const queryClient = getQueryClient();

  // Streaming 패턴: await 없이 prefetchQuery 사용
  // pending 상태로 dehydrate → 클라이언트에서 useSuspenseQuery가 Promise 사용
  if (Array.isArray(fetchOptions)) {
    for (const option of fetchOptions) {
      console.log("서버 패칭")
      // queryClient.prefetchQuery(option);  // no await!
      await queryClient.fetchQuery(option);  // no await!
    }
  } else {
    console.log("서버 패칭")
    // queryClient.prefetchQuery(fetchOptions);  // no await!
    await queryClient.fetchQuery(fetchOptions);  // no await!
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
