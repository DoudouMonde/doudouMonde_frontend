import { apiRequester } from "@/shared/apis/axiosInstance";
import { WishlistResponse } from "../types";
import {
  WishlistRequest,
  WishlistResponse as AddWishlistResponse,
} from "../types/wishlistTypes";

export const favoritesApi = {
  getWishlist: async (): Promise<WishlistResponse[]> => {
    console.log("🌐 API 요청 - 찜 목록 조회:", {
      url: "/v1/member/wishlists",
      method: "GET",
      timestamp: new Date().toISOString(),
    });

    const response = await apiRequester.get<WishlistResponse[]>(
      "/v1/member/wishlists"
    );

    console.log("🌐 API 응답 - 찜 목록 조회:", {
      status: response.status,
      data: response.data,
      dataLength: response.data?.length,
      timestamp: new Date().toISOString(),
    });

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
    console.log("🌐 API 요청 - 찜 삭제:", {
      url: `/v1/wishlists?wishlistId=${performanceId}`,
      method: "DELETE",
      performanceId,
      timestamp: new Date().toISOString(),
    });

    const response = await apiRequester.delete(
      `/v1/wishlists?performanceId=${performanceId}`
    );

    console.log("🌐 API 응답 - 찜 삭제:", {
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  },
};
