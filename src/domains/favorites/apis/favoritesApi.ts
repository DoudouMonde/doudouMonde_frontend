import { apiRequester } from "@/shared/apis/axiosInstance";
import { WishlistResponse } from "../types";
import {
  WishlistRequest,
  WishlistResponse as AddWishlistResponse,
} from "../types/wishlistTypes";

export const favoritesApi = {
  getWishlist: async (): Promise<WishlistResponse[]> => {
    const response = await apiRequester.get<WishlistResponse[]>(
      "/v1/member/wishlists"
    );
    return response.data;
  },
  addWishlist: async (
    request: WishlistRequest
  ): Promise<AddWishlistResponse> => {
    const response = await apiRequester.post<AddWishlistResponse>(
      "/v1/wishlists",
      request
    );
    return response.data;
  },
  removeWishlist: async (performanceId: number): Promise<void> => {
    await apiRequester.delete(`/v1/wishlists?performanceId=${performanceId}`);
  },
};
