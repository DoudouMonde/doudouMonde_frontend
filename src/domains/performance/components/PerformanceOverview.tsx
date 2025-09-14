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
    <div className="relative w-full h-[508px]">
      {/* 배경 이미지와 오버레이 */}
      <div
        className="absolute inset-0 w-full h-[205px]"
        style={{
          backgroundImage:
            "url('/assets/images/background/background_afternoon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 shadow-inner" />
      </div>

      {/* 포스터 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[22px] w-[173px] h-[231px] shadow-lg">
        <img
          src={performanceDetail.posterUrl}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* 공연 제목과 태그 */}
      <div className="absolute left-[79px] top-[271px] w-[235px] h-[51px]">
        {/* 태그 */}
        <div className="mb-2">
          <div className="inline-block bg-[#FFF288] rounded-[10px] px-2 py-1">
            <span className="text-base font-normal tracking-tight leading-tight text-black">
              🌱 차차는 처음 보는 장르예요!
            </span>
          </div>
        </div>

        {/* 공연 제목 */}
        <h1 className="text-xl font-semibold tracking-tight leading-tight text-black">
          {performanceDetail.performanceName}
        </h1>
      </div>

      {/* 공연 정보 */}
      <div className="absolute left-[57px] top-[359px] w-[279px] h-[149px] flex flex-col gap-2">
        {[
          { label: "장소", value: performanceDetail.place },
          {
            label: "공연기간",
            value:
              toYYYYMMDD(performanceDetail.startDate) +
              " ~ " +
              toYYYYMMDD(performanceDetail.endDate),
          },
          {
            label: "공연시간",
            value: performanceDetail.durationMinutes + "분",
          },
          { label: "관람연령", value: performanceDetail.ageLimit },
          { label: "가격", value: formatCurrency(performanceDetail.price) },
          { label: "시설정보", value: "장애인화장실, 수유실, 놀이방" },
        ].map((item, index) => (
          <div key={index} className="flex flex-row gap-4 items-start">
            <p className="text-[#8C8C8C] text-xs font-bold leading-tight tracking-tight w-[44px] flex-shrink-0">
              {item.label}
            </p>
            <p className="text-base font-normal tracking-tight leading-tight text-black">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
