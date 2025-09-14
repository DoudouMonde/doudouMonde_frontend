// 백엔드 API 응답 타입 정의

export interface ChildItemResponse {
  id: number;
  name: string;
  birthday: string; // LocalDate는 ISO string으로 전송됨
  gender: string;
  profile: string;
  sido: string;
}

export interface ChildListResponse {
  contents: ChildItemResponse[];
}
