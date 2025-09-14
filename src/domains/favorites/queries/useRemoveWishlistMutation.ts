import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../apis/favoritesApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (performanceId: number) =>
      favoritesApi.removeWishlist(performanceId),
    onSuccess: () => {
      // 위시리스트 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });
    },
  });
};
