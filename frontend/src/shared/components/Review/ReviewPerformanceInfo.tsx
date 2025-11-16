// src/domains/review/components/ReviewPerformanceInfo.tsx
import React from "react";
import { PlayingCardsIcon, Calendar } from "@/assets/icons";

type ReviewPerformanceInfoProps = {
  title?: string | null;
  date?: string | null;
  showDivider?: boolean;
};

export const ReviewPerformanceInfo: React.FC<ReviewPerformanceInfoProps> = ({
  title,
  date,
  showDivider = true,
}) => {
  const displayTitle = title?.trim() || "공연이름";
  const displayDate = date?.toString().trim() || "선택날짜";

  return (
    <>
      <div className="flex flex-col pt-6">
        <div className="flex flex-col gap-2 w-auto">
          <div className="flex gap-1 items-center">
            <PlayingCardsIcon className="w-[13px] h-[13px]" />
            <p className="body-hak-r">{displayTitle}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
            <p className="whitespace-nowrap body-hak-r">{displayDate}</p>
          </div>
        </div>
      </div>
      {showDivider && <hr className="my-4 border-secondary-100/30" />}
    </>
  );
};
