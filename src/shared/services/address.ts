import { neverExpected } from "@/shared/utils";
import { Sido } from "../types";

export const getSidoLabel = (sido: Sido) => {
  switch (sido) {
    // 새로운 통합 지역들
    case Sido.SEOUL:
      return "서울";
    case Sido.GYEONGGI:
      return "경기";
    case Sido.GANGWON:
      return "강원";
    case Sido.CHUNGCHEONG:
      return "충청";
    case Sido.JEOLLA:
      return "전라";
    case Sido.GYEONGSANG:
      return "경상";
    case Sido.JEJU:
      return "울산";
    default:
      return neverExpected(sido);
  }
};
