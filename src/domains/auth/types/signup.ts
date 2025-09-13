export interface SignupRequest {
  // 회원정보
  longitude: number;
  latitude: number;
  address: string;
  sido: string; // Sido enum 값

  // 아이 정보
  children: ChildRequest[];
}

export interface ChildRequest {
  name: string;
  birthday: string; // LocalDate를 ISO string으로 전송
  gender: string; // Gender enum 값
  profile: string; // Profile enum 값
  traits: string[]; // Trait enum 값들
  genres: string[]; // Genre enum 값들
}

// Enum 매핑을 위한 상수
export const SIDO_MAPPING = {
  서울특별시: "SEOUL",
  부산광역시: "BUSAN",
  대구광역시: "DAEGU",
  인천광역시: "INCHEON",
  광주광역시: "GWANGJU",
  대전광역시: "DAEJEON",
  울산광역시: "ULSAN",
  세종특별자치시: "SEJONG",
  경기도: "GYEONGGI",
  강원도: "GANGWON",
  충청북도: "CHUNGBUK",
  충청남도: "CHUNGNAM",
  전라북도: "JEONBUK",
  전라남도: "JEONNAM",
  경상북도: "GYEONGBUK",
  경상남도: "GYEONGNAM",
  제주특별자치도: "JEJU",
} as const;

export const GENDER_MAPPING = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export const TRAIT_MAPPING = {
  music: "MUSIC_LOVER",
  sensitive: "SOUND_SENSITIVE",
  active: "ACTIVE",
  "short-attention": "SHORT_ATTENTION",
} as const;

export const GENRE_MAPPING = {
  play: "PLAY",
  performance: "PERFORMANCE",
  musical: "MUSICAL",
  circus: "CIRCUS",
  magic: "MAGIC",
} as const;

export const PROFILE_MAPPING = {
  CAT: "CAT",
  CHICK: "CHICK",
  DINOSAUR: "DINOSAUR",
  DOG: "DOG",
  RABBIT: "RABBIT",
} as const;
