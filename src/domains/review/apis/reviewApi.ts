import { apiRequester } from "@/shared/apis/axiosInstance";
import { ReviewAddRequest } from "../types/ReviewAddRequest";
import { ReviewResponse } from "../types/ReviewResponse";

export const reviewApi = {
  // 리뷰 등록 (FormData)
  addReview: async (formData: FormData) => {
    console.log("=== API 요청 시작 ===");
    console.log("요청 URL:", "/v1/reviews");
    console.log("전체 URL:", `${apiRequester.defaults.baseURL}/v1/reviews`);
    console.log("FormData 타입:", formData instanceof FormData);

    try {
      const response = await apiRequester.post("/v1/reviews", formData);
      console.log("=== API 응답 성공 ===");
      console.log("응답 상태:", response.status);
      console.log("응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.log("=== API 요청 실패 ===");
      console.error("에러 상세:", error);
      if (error.response) {
        console.error("응답 상태:", error.response.status);
        console.error("응답 데이터:", error.response.data);
        console.error("요청 URL:", error.config?.url);
      }
      throw error;
    }
  },

  // 리뷰 등록 (JSON)
  addReviewJson: async (reviewData: ReviewAddRequest) => {
    console.log("API 요청 URL:", "/v1/reviews/json");
    console.log("API 요청 데이터:", reviewData);

    const response = await apiRequester.post("/v1/reviews/json", reviewData);
    return response.data;
  },

  // 리뷰 수정
  updateReview: async (reviewId: number, formData: FormData) => {
    const response = await apiRequester.patch(
      `/v1/reviews/${reviewId}`,
      formData
    );
    return response.data;
  },

  // 리뷰 삭제
  deleteReview: async (reviewId: number) => {
    const response = await apiRequester.delete(`/v1/reviews/${reviewId}`);
    return response.data;
  },

  // 모든 리뷰 조회
  getReviews: async () => {
    const response = await apiRequester.get("/v1/children/reviews");
    return response.data;
  },

  // 멤버의 모든 리뷰 조회
  getMemberReviews: async (): Promise<ReviewResponse[]> => {
    console.log("=== getMemberReviews API 요청 ===");
    console.log("요청 URL:", "/v1/member/reviews");
    console.log(
      "전체 URL:",
      `${apiRequester.defaults.baseURL}/v1/member/reviews`
    );

    const response = await apiRequester.get("/v1/member/reviews");
    console.log("응답 성공:", response.status);
    return response.data;
  },

  // 단일 리뷰 조회
  getReview: async (reviewId: number): Promise<ReviewResponse> => {
    const response = await apiRequester.get(`/v1/reviews/${reviewId}`);
    return response.data;
  },
};
