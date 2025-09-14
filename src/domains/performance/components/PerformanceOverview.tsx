import { usePerformanceDetailQuery } from "@/domains/performance/queries";

import { Chip } from "@/shared/components";
import { toYYYYMMDD, formatCurrency } from "@/shared/utils";
import { useParams } from "react-router-dom";

type Props = {};

export const PerformanceOverview = () => {
  const { performanceId } = useParams();

  const { data: performanceDetail } = usePerformanceDetailQuery(
    Number(performanceId),
    {
      enabled: !!performanceId,
    }
  );

  // 현재 공연이 위시리스트에 있는지 확인

  if (!performanceDetail) {
    return null;
  }

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
