import { neverExpected } from "@/shared/utils";
import { Sido } from "../types";

export const getSidoLabel = (sido: Sido) => {
  switch (sido) {
    case Sido.SEOUL:
      return "서울";
    case Sido.GYEONGGI:
      return "경기";
    case Sido.JEON_BUK:
      return "전북";
    case Sido.JEON_NAM:
      return "전남";
    case Sido.CHUNG_BUK:
      return "충북";
    case Sido.CHUNG_NAM:
      return "충남";
    case Sido.GYEONG_BUK:
      return "경북";
    case Sido.GYEONG_NAM:
      return "경남";
    case Sido.BUSAN:
      return "부산";
    case Sido.DAEGU:
      return "대구";
    case Sido.INCHEON:
      return "인천";
    case Sido.GWANGJU:
      return "광주";
    case Sido.DAEJEON:
      return "대전";
    case Sido.ULSAN:
      return "울산";
    default:
      return neverExpected(sido);
  }
};
