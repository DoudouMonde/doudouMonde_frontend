import { CharacterAccessories, CharacterType } from "@/domains/review/types";
import { PostReviewRequest, PostReviewResponse, ReviewDetailResponse } from "@/domains/review/types/reviewApiTypes";
import { CharacterEmotion } from "@doudoumonde/shared/schemas";

const KEY = '__mock_review_db__';

const INITIAL_MOCK_REVIEW: ReviewDetailResponse[] = [
  {
    reviewId: 1,
    performanceName: "햄릿",
    watchDate: "2024-03-14",
    content: "배우들의 연기가 너무 훌륭했고, 몰입감 있는 무대 연출이 인상적이었습니다.",
    imageUrls: ["https://example.com/review1_img1.jpg"],
    characterName: "Hamlet",
    characterType: CharacterType.CAT,
    characterEmotion: CharacterEmotion.HAPPY,
    characterAccessories: CharacterAccessories.CAP,
  },
  {
    reviewId: 2,
    performanceName: "레미제라블",
    watchDate: "2024-04-02",
    content: "노래와 음악이 압도적이었고, 특히 마지막 장면은 감동적이었습니다.",
    imageUrls: [
      "https://example.com/review2_img1.jpg",
      "https://example.com/review2_img2.jpg"
    ],
    characterName: "Jean Valjean",
    characterType: CharacterType.DINO,
    characterEmotion: CharacterEmotion.SAD,
    characterAccessories: CharacterAccessories.GLASSES,
  },
  {
    reviewId: 3,
    performanceName: "지킬 앤 하이드",
    watchDate: "2024-05-10",
    content: "지킬과 하이드의 극적인 전환이 긴장감을 유지하게 했습니다.",
    imageUrls: [],
    characterName: "Jekyll",
    characterType: CharacterType.DOG,
    characterEmotion: CharacterEmotion.ONEMORE,
    characterAccessories: CharacterAccessories.FLOWER,
  },
];

function load() : ReviewDetailResponse[] {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as ReviewDetailResponse[]) : [];
    } catch {
        return[];
    }
}

function save(data: ReviewDetailResponse[]) {
    try {
        localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
        return;

    }
}

let seq = 1000;
let store : ReviewDetailResponse[] = load();

//localstorage가 없을 때 Mock 데이터를 불러오도록 한다.
if (store.length === 0) {
     console.log('Mock DB :localStorage가 비어 있어 초기 Mock 데이터로 대체합니다.');
     store = INITIAL_MOCK_REVIEW;
     seq = store.reduce((max, review) => Math.max(max, review.reviewId), 0);
     save(store);
}


export const reviewDb = {
    list() {
        return store;
    },
    get(id:number) {
        return store.find((c) => c.reviewId === id) ?? null;
    },
    create(input : PostReviewRequest) : ReviewDetailResponse {
        const id = ++seq;
        const rec : ReviewDetailResponse = {id, ...input};
        store = [rec, ...store];
        save(store);
        return rec;

    }
}