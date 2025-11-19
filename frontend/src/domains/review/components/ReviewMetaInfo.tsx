import { Calendar, PlayingCardsIcon, UserIcon } from "@/assets/icons";
import { ReviewDetailResponse } from "../types/reviewApiTypes";

type ReveiwMetaInfo = {
  reviewData: ReviewDetailResponse;
};

export const ReviewMetaInfo = ({ reviewData }: ReveiwMetaInfo) => {
  return (
    <div className="flex justify-center mt-5 mb-5">
      <div className="flex flex-col w-auto min-w-20">
        <p className="flex justify-center title-hak">
          {reviewData.characterName}
        </p>
        <div className="flex flex-col gap-2 p-4 ">
          <div className="flex gap-1 items-center">
            <PlayingCardsIcon className="w-[13px] h-[13px]" />
            <p className="body-hak-r">{reviewData.performanceName}</p>
          </div>
          <div className="flex gap-1 items-center">
            <UserIcon className="w-[13px] h-[13px]" />
            {/* <p className="body-hak-r">{reviewData.}</p> */}
            <p className="body-hak-r">서아랑 하준이랑</p>
          </div>

          <div className="flex gap-1 items-center">
            <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
            <p className="whitespace-nowrap body-hak-r">
              {new Date(reviewData.watchDate).toISOString().split("T")[0] ||
                "날짜 정보 없음"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
