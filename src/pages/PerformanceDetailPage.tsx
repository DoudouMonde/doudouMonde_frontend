import {
  NearbySection,
  PerformanceOverview,
  PerformanceTab,
  TransportSection,
} from "@/domains/performance/components";
import { TabType } from "@/domains/performance/types";
import { useState } from "react";

export function PerformanceDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("seats");
  return (
    <div className="flex-1 bg-white">
      <div className="flex-1">
        {/* 공연 정보 */}
        <PerformanceOverview />

        {/* 탭 메뉴 */}
        <PerformanceTab activeTab={activeTab} onPressTab={setActiveTab} />

        {/* 탭 콘텐츠 */}
        <div className="flex-1 bg-white">
          {activeTab === "transport" && (
            <TransportSection performance={performance} />
          )}
          {activeTab === "nearby" && performance.nearbyInfo && (
            <NearbySection nearbyInfo={performance.nearbyInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
