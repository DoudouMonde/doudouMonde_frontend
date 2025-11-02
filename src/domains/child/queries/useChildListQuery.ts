// useChildListQuery.ts (v5)
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { childApi } from "@/domains/child/apis/childApi";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { queryKeys } from "@/shared/apis/queryKeys";

type ChildListKey = readonly [string];

export function useChildListQuery<TData = ChildListResponse>(
  options?: Omit<
    UseSuspenseQueryOptions<
      ChildListResponse, // TQueryFnData
      Error, // TError
      TData, // TData
      ChildListKey // TQueryKey
    >,
    "queryKey" | "queryFn" // ✅ 호출부에서 이 둘은 못 넣도록 차단
  >
) {
  return useSuspenseQuery({
    queryKey: [queryKeys.CHILD_LIST] as const,
    queryFn: () => childApi.getChildList(),
    ...options, // 호출부에선 select, gcTime, enabled 등만 전달
  });
}
