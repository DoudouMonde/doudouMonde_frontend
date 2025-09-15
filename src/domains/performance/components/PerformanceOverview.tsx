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
    <div
      className="relative w-full flex flex-col gap-2 items-center pb-[32px] -z-20"
      style={{
        backgroundImage:
          "url('/assets/images/background/background_afternoon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 포스터 뒤 이펙트 (blur + opacity) */}
      <div className="absolute left-1/2 transform -translate-x-1/2  w-full h-[205px] -z-10">
        <img
          src={performanceDetail.posterUrl}
          className="object-cover w-full h-full rounded-lg opacity-25"
        />
      </div>

      {/* 포스터 */}
      <article className="flex flex-col gap-5 items-center h-fit pt-[22px]">
        <div className="w-[173px] h-[231px]">
          {/* <div className="w-[225px] h-[300px]"> */}
          <img
            src={performanceDetail.posterUrl}
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <section className="flex flex-col gap-4 items-center">
          {/* 태그 */}
          <div className="flex flex-col gap-2 items-center">
            {/* <Chip>🌱 차차는 처음 보는 장르예요!</Chip> */}

            <h1 className="title-hak">{performanceDetail.performanceName}</h1>
          </div>
          {/* 공연 정보 */}
          <div className="flex flex-col gap-[7px] w-full">
            {[
              { label: "장소", value: performanceDetail.place },
              {
                label: "공연기간",
                value:
                  performanceDetail.startDate +
                  " ~ " +
                  (performanceDetail.endDate === "2099-12-31"
                    ? performanceDetail.startDate
                    : "미정"),
              },
              {
                label: "공연시간",
                value: performanceDetail.durationMinutes + "분",
              },
              {
                label: "관람연령",
                value:
                  performanceDetail.ageLimit > 10
                    ? performanceDetail.ageLimit + "개월 이상 관람가능"
                    : performanceDetail.ageLimit + "세 이상 관람가능",
              },
              { label: "가격", value: formatCurrency(performanceDetail.price) },
              { label: "시설정보", value: "장애인화장실, 수유실, 놀이방" },
            ].map((item, index) => (
              <div key={index} className="flex flex-row gap-4 items-center">
                <p className="text-secondary-100  subtitle-b w-[44px] flex-shrink-0">
                  {item.label}
                </p>
                <p className="text-black body-inter-r">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
