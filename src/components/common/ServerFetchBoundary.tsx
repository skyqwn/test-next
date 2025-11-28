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

  // 서버에서 완전히 fetch (성공/에러 모두 queryClient에 저장)
  // 에러도 dehydrate되어 클라이언트 ErrorBoundary에서 처리 가능
  if (Array.isArray(fetchOptions)) {
    for (const option of fetchOptions) {
      console.log("서버 패칭");
      try {
        await queryClient.fetchQuery(option);
      } catch (e) {
        // 에러 무시 - 에러 상태가 queryClient에 저장됨
        console.log("서버 패칭 에러:", e);
      }
    }
  } else {
    console.log("서버 패칭");
    try {
      await queryClient.fetchQuery(fetchOptions);
    } catch (e) {
      // 에러 무시 - 에러 상태가 queryClient에 저장됨
      console.log("서버 패칭 에러:", e);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
