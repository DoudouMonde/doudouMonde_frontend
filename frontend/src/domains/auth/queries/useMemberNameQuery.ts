// import { useQuery } from "@tanstack/react-query";
// import { memberApi } from "@/domains/auth/apis/memberApi";

// export const useMemberNameQuery = () => {
//   return useQuery({
//     // Avoid relying on nested queryKeys to prevent runtime undefined errors
//     queryKey: ["AUTH", "MEMBER_NAME"] as const,
//     queryFn: memberApi.getMemberName,
//     staleTime: 5 * 60 * 1000,
//   });
// };
