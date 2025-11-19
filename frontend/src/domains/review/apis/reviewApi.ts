import { apiRequester } from "@/shared/apis/axiosInstance";
import { PostReviewRequest, PostReviewResponse, ReviewDetailResponse } from "../types/reviewApiTypes";

export const reviewApi = {
  // 리뷰 등록 (FormData)
  postPhotoReview: async (formData: FormData) => {
    try {
      const response = await apiRequester.post("/v1/reviews", formData);
      return response.data;
    } catch (error) {

      throw error;
    }
  },

  // 리뷰 등록 (JSON)
  postReview: async (reviewData: PostReviewRequest) : Promise<PostReviewResponse> => {
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
  getAllReviews: async () => {
    const response = await apiRequester.get("/v1/children/reviews");
    return response.data;
  },

  // 멤버의 모든 리뷰 조회
  getMemberReviews: async (): Promise<ReviewDetailResponse[]> => {

    const response = await apiRequester.get("/v1/member/reviews");
    return response.data;
  },

  // 단일 리뷰 조회
  getReviewDetail: async (reviewId: number): Promise<ReviewDetailResponse> => {
    const response = await apiRequester.get(`/v1/reviews/${reviewId}`);
    return response.data;
  },
};
