export interface SignupRequest {
  // 회원정보
  longitude: number;
  latitude: number;
  address: string;
  sido: string; // Sido enum 값

  // 아이 정보
}
