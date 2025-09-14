import {
  PerformanceOverview,
  TransportSection,
} from "@/domains/performance/components";
import { Tab } from "@/shared/components";
import { SwitchCase } from "@/shared/components";

export const PerformanceDetailPage = () => {
  const activeTab = "transport";

  // 실제로는 API에서 가져올 데이터 (임시 mockup - 강남역 → 롯데콘서트홀)
  const performanceVenueInfo = {
    venueName: "롯데콘서트홀",
    venueAddress: "서울특별시 송파구 올림픽로 300 롯데월드타워",
    venueLat: 37.5125,
    venueLng: 127.1025,
  };

  return (
    <div className="flex flex-col flex-1 items-center w-full bg-white">
      <div className="flex-1 w-full">
        {/* 공연 정보 */}
        <PerformanceOverview />

        {/* 탭 메뉴 */}
        <div className="flex flex-col gap-4 w-full bg-gray-200 border-2">
          <Tab activeTab={activeTab}>
            <Tab.Item value="transport">🚸 교통정보</Tab.Item>
            <Tab.Item value="content">😉 인근정보</Tab.Item>
            <Tab.Item value="seats">💺 좌석정보</Tab.Item>
          </Tab>

          <TransportSection
            venueName={performanceVenueInfo.venueName}
            venueAddress={performanceVenueInfo.venueAddress}
            venueLat={performanceVenueInfo.venueLat}
            venueLng={performanceVenueInfo.venueLng}
          />

          {/* 탭 콘텐츠 */}
          <div className="flex-1 w-full">
            {/* <SwitchCase
              value={activeTab}
              case={{
                transport: <TransportSection 
                  venueName={performanceVenueInfo.venueName}
                  venueAddress={performanceVenueInfo.venueAddress}
                  venueLat={performanceVenueInfo.venueLat}
                  venueLng={performanceVenueInfo.venueLng}
                />,
                // seats: <NearbySection />,
                // content: <ContentSection />,
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
// http://www.kopis.or.kr/openApi/restful/pblprfr/PF132236?service=7d467135319d4e57b69714067f7f5385
