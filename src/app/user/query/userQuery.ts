import { useSuspenseQuery } from "@tanstack/react-query";
import { shootAPi } from "@/api/shoot/api";

export const getUserQueryOptions = () => ({
  queryKey: ['me'] as const,
  queryFn: shootAPi.getUser,
});

export const useUserQuery = () => {
  return useSuspenseQuery(getUserQueryOptions());
}