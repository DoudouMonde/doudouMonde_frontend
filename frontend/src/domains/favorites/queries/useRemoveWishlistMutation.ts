import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { favoritesApi } from "../apis/favoritesApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useRemoveWishlistMutation = (
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, number>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (performanceId: number) => {
      console.log("🔄 Mutation 시작 - 찜 삭제:", {
        performanceId,
        timestamp: new Date().toISOString(),
      });
      return favoritesApi.removeWishlist(performanceId);
    },
    onSuccess: (data, performanceId) => {
      console.log("🎉 Mutation 성공 - 찜 삭제:", {
        performanceId,
        data,
        timestamp: new Date().toISOString(),
      });
      // 위시리스트 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });
      // 특정 공연 상세 정보 무효화 (isLike 상태 업데이트)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PERFORMANCE_DETAIL, performanceId],
      });
      console.log("🔄 위시리스트 및 공연 상세 쿼리 무효화 완료");
    },
    onError: (error, performanceId) => {
      console.error("💥 Mutation 실패 - 찜 삭제:", {
        performanceId,
        error,
        timestamp: new Date().toISOString(),
      });
    },
    ...mutationOptions,
  });
};
