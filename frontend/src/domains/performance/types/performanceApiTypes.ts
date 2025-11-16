// 백엔드 API 응답 타입 정의

export interface WishlistResponse {
  wishlistId: number;
  performanceId: number;
  performanceName: string;
  createTime: string; // LocalDateTime은 ISO string으로 전송됨
  posterUrl: string;
  sido: string;
}

export interface PerformanceItem {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}
