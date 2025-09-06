import { PerformanceDetail } from "@/domains/performance/types";
import { useState } from "react";

type Props = {
  performance: PerformanceDetail;
};

export const PerformanceOverview = ({ performance }: Props) => {
  const performanceInfo = [
    { label: "장소", value: performance.location },
    { label: "공연기간", value: performance.period },
    { label: "공연시간", value: performance.duration },
    { label: "관람연령", value: performance.ageLimit },
    { label: "가격", value: performance.prices.join("\n") },
    { label: "시설정보", value: performance.facilities },
  ];
  const [selectedReview, setSelectedReview] = useState<
    "want" | "watched" | null
  >(null);
  return (
    <div className="px-4 pt-4 pb-5 bg-white/90">
      {/* 태그 */}
      {performance.tag && (
        <div className="absolute top-4 left-6 z-10">
          <div className="px-1.5 py-0.5 rounded-[10px] border bg-secondary-400 border-gray-300">
            <p className="text-xs text-black font-inter">{performance.tag}</p>
          </div>
        </div>
      )}

      {/* 제목 */}
      <div className="text-[16px] font-semibold text-black leading-[22px] mt-7 mb-4 font-noto">
        {performance.title}
      </div>

      <div className="flex-row">
        {/* 포스터 */}
        <div className="mr-4">
          <img
            src={performance.poster}
            className="w-[157px] h-[210px] rounded-lg bg-gray-100 shadow-card"
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex-1 pt-0.5">
          {performanceInfo.map((item, index) => (
            <div key={index} className="flex-row items-start mb-4">
              <p className="text-[12px] text-black leading-3 w-9 mr-4 font-noto">
                {item.label}
              </p>
              <p
                className={`text-[10px] leading-3 flex-1 font-noto ${
                  item.label === "가격"
                    ? "text-[#454545] leading-[15px]"
                    : "text-black leading-3"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 리뷰 버튼 */}
      <div className="flex-row gap-1 justify-end mt-4">
        <div
          className={`bg-white border-2 border-secondary-500 rounded-[10px] px-3 py-1 w-20 h-5 justify-center items-center ${
            selectedReview === "want" ? "bg-secondary-500" : ""
          }`}
          onClick={() =>
            setSelectedReview(selectedReview === "want" ? null : "want")
          }
        >
          <p className="text-[10px] text-black font-inter">보고싶어요 💖</p>
        </div>

        <div
          className={`bg-white border-2 border-secondary-500 rounded-[10px] px-3 py-1 w-20 h-5 justify-center items-center ${
            selectedReview === "watched" ? "bg-secondary-500" : ""
          }`}
          onClick={() =>
            setSelectedReview(selectedReview === "watched" ? null : "watched")
          }
        >
          <p className="text-[10px] text-black font-inter">봤어요 ✅</p>
        </div>
      </div>
    </div>
  );
};
