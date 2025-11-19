import { ReviewDetailResponse } from "@/domains/review/types/reviewApiTypes";

const KEY = '__mock_review_db__';

const INITIAL_MOCK_REVIEW: ReviewDetailResponse[] = [
  {
    reviewId: number,
    performanceName: string,
    watchDate: string,
    content: string,
    imageUrls: string[];
      characterName: string;
      characterType: CharacterType;
      characterEmotion: CharacterEmotion;
      characterAccessories: CharacterAccessories;
  },
  {
    id: 2,
    name: '서아 (Mock)',
    profile: Profile.RABBIT,
    birthday: '2021-08-22',
    gender: Gender.FEMALE,
  },
  {
    id: 3,
    name: '하준 (Mock)',
    profile: Profile.DOG,
    birthday: '2019-11-01',
    gender: Gender.MALE,
  },
];