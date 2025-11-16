import { useQuery } from "@tanstack/react-query";
import { favoritesApi } from "../apis/favoritesApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useWishlistQuery = () => {
  return useQuery({
    queryKey: queryKeys.favorites.wishlist(),
    queryFn: favoritesApi.getWishlist,
  });
};
