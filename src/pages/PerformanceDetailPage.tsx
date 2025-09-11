import {
  PerformanceOverview,
  TransportSection,
} from "@/domains/performance/components";
import { Tab } from "@/shared/components";
import { SwitchCase } from "@/shared/components";

export const PerformanceDetailPage = () => {
  const activeTab = "transport";
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

          {/* 탭 콘텐츠 */}
          <div className="flex-1 w-full bg-white">
            <SwitchCase
              value={activeTab}
              case={{
                transport: <TransportSection />,
                // seats: <NearbySection />,
                // content: <ContentSection />,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
