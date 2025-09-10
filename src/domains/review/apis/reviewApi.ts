import { apiRequester } from "@/shared/apis/axiosInstance";
import { ReviewAddRequest } from "../types/ReviewAddRequest";

export const reviewApi = {
  // 리뷰 등록 (FormData)
  addReview: async (formData: FormData) => {
    // headers 부분을 완전히 제거하면 브라우저가 알아서 올바른 헤더를 생성합니다.
    const response = await apiRequester.post("/v1/reviews", formData);
    return response.data;
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

  // 단일 리뷰 조회
  getReview: async (reviewId: number) => {
    const response = await apiRequester.get(`/v1/reviews/${reviewId}`);
    return response.data;
  },
};
