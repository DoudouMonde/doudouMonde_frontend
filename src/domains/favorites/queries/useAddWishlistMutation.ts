import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { favoritesApi } from "../apis/favoritesApi";
import { WishlistRequest } from "../types/wishlistTypes";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useAddWishlistMutation = (
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, WishlistRequest>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: WishlistRequest) => favoritesApi.addWishlist(request),
    onSuccess: () => {
      // 위시리스트 목록을 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });
    },
    ...mutationOptions,
  });
};
