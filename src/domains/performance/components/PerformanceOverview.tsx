import { usePerformanceDetailQuery } from "@/domains/performance/queries";
import { useAddWishlistMutation } from "@/domains/favorites/queries";
import { Chip } from "@/shared/components";
import { toYYYYMMDD, formatCurrency } from "@/shared/utils";
import { useParams } from "react-router-dom";
import { useState } from "react";

// type Props = {};

export const PerformanceOverview = () => {
  const { performanceId } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: performanceDetail } = usePerformanceDetailQuery(
    Number(performanceId),
    {
      enabled: !!performanceId,
    }
  );

  const addWishlistMutation = useAddWishlistMutation();

  const handleWishlistClick = () => {
    if (!performanceId) return;

    addWishlistMutation.mutate(
      { performanceId: Number(performanceId) },
      {
        onSuccess: () => {
          setIsWishlisted(true);
          console.log("✅ 위시리스트에 추가되었습니다!");
        },
        onError: (error) => {
          console.error("❌ 위시리스트 추가 실패:", error);
        },
      }
    );
  };

  if (!performanceDetail) {
    return null;
  }

  console.groupEnd();
  return (
    <div className="flex flex-col gap-4 px-4 pt-4">
      <section className="flex flex-row gap-4">
        {/* 포스터 */}
        <div className="min-w-[86px] shadow-md">
          <img
            src={performanceDetail.posterUrl}
            className="w-full bg-gray-100 rounded-lg"
          />
        </div>

        {/* 상세 설명 */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Chip variant="filled">차차는 처음 보는 장르예요!</Chip>
            <h1 className="title-hak">{performanceDetail.performanceName}</h1>
          </div>
          <div className="flex gap-3">
            <Chip
              variant={isWishlisted ? "filled" : "outlined"}
              onClick={handleWishlistClick}
              className={`cursor-pointer transition-all duration-200 ${
                isWishlisted
                  ? "text-pink-600 bg-pink-100 border-pink-300"
                  : "hover:bg-pink-50 hover:border-pink-200"
              }`}
            >
              {isWishlisted ? "보고싶어요 💖" : "보고싶어요 💖"}
            </Chip>
            <Chip variant="outlined">봤어요 ✅</Chip>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-2 w-full">
        {[
          { label: "장소", value: performanceDetail.place },
          {
            label: "공연기간",
            value:
              toYYYYMMDD(performanceDetail.startDate) +
              "~" +
              toYYYYMMDD(performanceDetail.endDate),
          },
          {
            label: "공연시간",
            value: performanceDetail.durationMinutes + "분",
          },
          { label: "관람연령", value: performanceDetail.ageLimit },
          { label: "가격", value: formatCurrency(performanceDetail.price) },
        ].map((item, index) => (
          <div key={index} className="flex flex-row gap-8">
            <p className="w-16 body-inter">{item.label}</p>
            <p className="body-inter">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
