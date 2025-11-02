// useChildListQuery.ts
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { childApi } from "@/domains/child/apis/childApi";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { queryKeys } from "@/shared/apis/queryKeys";

export function useChildListQuery(
  options?: UseSuspenseQueryOptions<
    ChildListResponse, // TQueryFnData
    Error, // TError
    ChildListResponse, // TData
    readonly [string] // TQueryKey (튜플 타입 권장)
  >
) {
  return useSuspenseQuery({
    queryKey: [queryKeys.CHILD_LIST] as const,
    queryFn: () => childApi.getChildList(),
    ...options,
  });
}
