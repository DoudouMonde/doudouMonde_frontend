import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { childApi } from "@/domains/child/apis/childApi";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { queryKeys } from "@/shared/apis/queryKeys";

export function useChildListQuery(
  queryOptions?: UseQueryOptions<ChildListResponse, Error, ChildListResponse>
) {
  return useQuery({
    queryKey: [queryKeys.CHILD_LIST],
    queryFn: async () => await childApi.getChildList(),
    ...queryOptions,
  });
}
