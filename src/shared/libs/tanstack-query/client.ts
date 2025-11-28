
import {
  QueryClient,
  isServer,
  QueryCache,
  MutationCache,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

//TODO: 기획이나 개발자 상의 후 정해놔야할것
export const defaultStaleTime = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultStaleTime,
        retry: false
      },
      dehydrate: {
        // 성공, 에러 상태 모두 dehydrate (서버 prefetch + 클라이언트 ErrorBoundary 재시도)
        shouldDehydrateQuery: defaultShouldDehydrateQuery,
        
        // shouldDehydrateQuery: (query) =>
        //            defaultShouldDehydrateQuery(query) &&
        //             (query.state.status === "pending" || query.state.status === "success"),
      },
    },
    queryCache: new QueryCache({}),
    mutationCache: new MutationCache({
      onSuccess: () => {
        toast.success('성공!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
