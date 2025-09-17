import { useQuery } from "@tanstack/react-query";
import { memberApi } from "@/domains/auth/apis/memberApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useMemberNameQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.memberName(),
    queryFn: memberApi.getMemberName,
    staleTime: 5 * 60 * 1000,
  });
};
