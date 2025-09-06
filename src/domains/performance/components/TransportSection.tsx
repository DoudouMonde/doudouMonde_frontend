import { PerformanceDetail } from "@/domains/performance/types";

type Props = {
  performance: PerformanceDetail;
};

export const TransportSection = ({ performance }: Props) => {
  return (
    <div className="p-4">
      {/* 주차장 태그 */}
      {performance.hasParking && (
        <div className="mb-6">
          <div
            className="px-1.5 py-0.5 rounded-[10px] border w-[167px] h-5"
            style={{
              backgroundColor: "#FFF5A6",
              borderColor: "#C3C3C3",
            }}
          >
            <p className="text-xs text-black" style={{ fontFamily: "Inter" }}>
              자체 주차장이 있는 공연장이에요
            </p>
          </div>
        </div>
      )}

      {/* 경로 정보 */}
      <div className="mb-5">
        <p
          className="text-[11px] font-semibold text-black mb-4"
          style={{ fontFamily: "Noto Sans KR" }}
        >
          우리집에서의 경로
        </p>

        <div className="flex-row gap-4">
          {/* 대중교통 */}
          <div className="flex-1">
            <img
              src={
                performance.transportInfo?.publicTransport.image || {
                  uri: "https://picsum.photos/154/153?random=1",
                }
              }
              className="w-full h-[153px] rounded-lg bg-gray-100 border border-[#9B9B9B]"
            />
            <p
              className="text-[10px] text-black text-center mt-2"
              style={{ fontFamily: "Noto Sans KR" }}
            >
              대중교통 소요시간{" "}
              {performance.transportInfo?.publicTransport.duration || "43분"}
            </p>
          </div>

          {/* 자가용 */}
          <div className="flex-1">
            <img
              alt={
                performance.transportInfo?.car.image || {
                  uri: "https://picsum.photos/154/153?random=2",
                }
              }
              className="w-full h-[153px] rounded-lg bg-gray-100 border border-[#9B9B9B]"
            />
            <p
              className="text-[10px] text-black text-center mt-2"
              style={{ fontFamily: "Noto Sans KR" }}
            >
              자가용 소요시간{" "}
              {performance.transportInfo?.car.duration || "20분"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
