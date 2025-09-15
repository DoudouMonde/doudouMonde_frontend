import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../apis/favoritesApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistId: number) => {
      console.log("🔄 Mutation 시작 - 찜 삭제:", {
        wishlistId,
        timestamp: new Date().toISOString(),
      });
      return favoritesApi.removeWishlist(wishlistId);
    },
    onSuccess: (data, wishlistId) => {
      console.log("🎉 Mutation 성공 - 찜 삭제:", {
        wishlistId,
        data,
        timestamp: new Date().toISOString(),
      });
      // 위시리스트 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });
      console.log("🔄 위시리스트 쿼리 무효화 완료");
    },
    onError: (error, wishlistId) => {
      console.error("💥 Mutation 실패 - 찜 삭제:", {
        wishlistId,
        error,
        timestamp: new Date().toISOString(),
      });
    },
  });
};
