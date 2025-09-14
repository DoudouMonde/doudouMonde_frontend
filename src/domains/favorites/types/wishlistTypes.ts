// 위시리스트 추가 요청 타입
export interface WishlistRequest {
  performanceId: number;
}

// 위시리스트 응답 타입
export interface WishlistResponse {
  id: number;
  performanceId: number;
  memberId: number;
  createdAt: string;
  updatedAt: string;
}
