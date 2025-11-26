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

export const ServerFetchBoundary = async({ fetchOptions, children }: Props) => {
  const queryClient = getQueryClient();

  console.log("[SERVER] 프리패치 시작");

  if (Array.isArray(fetchOptions)) {
    for (const option of fetchOptions) {
      console.log("[SERVER] 패치 중:", option.queryKey);
      await queryClient.fetchQuery(option);
      console.log("[SERVER] 패치 완료:", option.queryKey);
    }
  } else {
    console.log("[SERVER] 단일 패치 중:", fetchOptions.queryKey);
    await queryClient.fetchQuery(fetchOptions);
    console.log("[SERVER] 단일 패치 완료:", fetchOptions.queryKey);
  }

  console.log("[SERVER] 모든 프리패치 완료");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
