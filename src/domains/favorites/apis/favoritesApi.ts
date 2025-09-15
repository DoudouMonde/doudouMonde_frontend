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
  removeWishlist: async (wishlistId: number): Promise<void> => {
    console.log("🌐 API 요청 - 찜 삭제:", {
      url: `/v1/wishlists?wishlistId=${wishlistId}`,
      method: "DELETE",
      wishlistId,
      timestamp: new Date().toISOString(),
    });

    const response = await apiRequester.delete(
      `/v1/wishlists?wishlistId=${wishlistId}`
    );

    console.log("🌐 API 응답 - 찜 삭제:", {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  },
};
