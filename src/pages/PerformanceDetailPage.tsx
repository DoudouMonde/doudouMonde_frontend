import {
  ContentSection,
  NearbySection,
  PerformanceOverview,
  PerformanceTab,
  TransportSection,
} from "@/domains/performance/components";
import { TabType } from "@/domains/performance/types";
import { Tab } from "@/shared/components";
import SwitchCase from "@/shared/components/SwitchCase";
import { useState } from "react";

export function PerformanceDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("transport");
  return (
    <div className="flex-1 bg-white">
      <div className="flex-1">
        {/* 공연 정보 */}
        <PerformanceOverview />

        {/* 탭 메뉴 */}

        <div className="flex flex-col gap-4 w-full">
          <Tab activeTab={activeTab}>
            <Tab.Item value="content">😉 인근정보</Tab.Item>
            <Tab.Item value="transport">🚸 교통정보</Tab.Item>
            <Tab.Item value="seats">💺 좌석정보</Tab.Item>
          </Tab>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 w-full bg-white">
            <SwitchCase
              value={activeTab}
              case={{
                transport: <TransportSection />,
                seats: <NearbySection />,
                content: <ContentSection />,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
