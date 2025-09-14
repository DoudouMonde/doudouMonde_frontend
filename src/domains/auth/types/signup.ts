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

// Enum 매핑을 위한 상수 (백엔드 enum에 맞춤)
export const SIDO_MAPPING = {
  SEOUL: "SEOUL",
  GYEONGGI: "GYEONGGI",
  GANGWON: "GANGWON",
  CHUNGCHEONG: "CHUNGCHEONG",
  JEOLLA: "JEOLLA",
  GYEONGSANG: "GYEONGSANG",
  JEJU: "JEJU",
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
