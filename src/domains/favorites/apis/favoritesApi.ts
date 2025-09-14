import { apiRequester } from "@/shared/apis/axiosInstance";
import { WishlistResponse } from "../types";
import { WishlistResponse as PerformanceWishlistResponse } from "@/domains/performance/types/performanceApiTypes";

export const favoritesApi = {
  getWishlist: async (): Promise<WishlistResponse[]> => {
    const response = await apiRequester.get<WishlistResponse[]>(
      "/v1/member/wishlists"
    );
    return response.data;
  },
  removeWishlist: async (wishlistId: number): Promise<void> => {
    await apiRequester.delete(`/v1/wishlists/${wishlistId}`);
  },
};
