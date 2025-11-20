import { useEffect, useState } from "react";
import { ReviewListResponse } from "../types/reviewApiTypes";
import {
  CharacterAccessories,
  CharacterEmotion,
  CharacterType,
} from "../types";
import { reviewApi } from "../apis/reviewApi";

export const useReviewList = () => {
  const initialReviewList: ReviewListResponse = { items: [] };

  const [reviewList, setReviewList] =
    useState<ReviewListResponse>(mockReviewList);

  const [reviewCount, setReviewCount] = useState<number>(1);

  //실제 api 호출 -> 백엔드 연결하면 주석 해제
  // useEffect(() => {
  //   const fetchReview = async () => {
  //     try {
  //       const data: ReviewListResponse = await reviewApi.getMemberReviews();
  //       setReviewList(data);
  //       setReviewCount(data.items.length);
  //     } catch (error) {
  //       console.log("리뷰 목록을 불러오는 중 오류 발생 :", error);
  //       setReviewList(initialReviewList);
  //     } finally {
  //     }
  //   };
  //   fetchReview();
  // }, []);

  return { reviewList, reviewCount };
};

const mockReviewList: ReviewListResponse = {
  items: [
    // 1. 햄릿 (Cat, Flower)
    {
      id: "1",
      watchDate: "2024-03-14",
      performance: {
        name: "햄릿",
        posterUrl: "https://picsum.photos/id/1015/400/400",
      },
      character: {
        animal: CharacterType.CAT,
        emotion: CharacterEmotion.HAPPY,
        accessory: CharacterAccessories.FLOWER,
      },
    },
    // 2. 오페라의 유령 (Dog, Cap)
    {
      id: "2",
      watchDate: "2024-05-20",
      performance: {
        name: "오페라의 유령",
        posterUrl: "https://picsum.photos/id/1018/400/400",
      },
      character: {
        animal: CharacterType.DOG,
        emotion: CharacterEmotion.SAD,
        accessory: CharacterAccessories.CAP,
      },
    },
    // 3. 노트르담 드 파리 (Rabbit, Ribbon)
    {
      id: "3",
      watchDate: "2024-07-01",
      performance: {
        name: "노트르담 드 파리",
        posterUrl: "https://picsum.photos/id/1025/400/400",
      },
      character: {
        animal: CharacterType.RABBIT,
        emotion: CharacterEmotion.SAD,
        accessory: CharacterAccessories.RIBBON,
      },
    },
    // 4. 위키드 (Fox, Glasses)
    {
      id: "4",
      watchDate: "2024-09-10",
      performance: {
        name: "위키드",
        posterUrl: "https://picsum.photos/id/1033/400/400",
      },
      character: {
        animal: CharacterType.RABBIT,
        emotion: CharacterEmotion.ONEMORE,
        accessory: CharacterAccessories.GLASSES,
      },
    },
  ],
};
