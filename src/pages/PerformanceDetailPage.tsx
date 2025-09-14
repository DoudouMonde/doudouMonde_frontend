import {
  ContentSection,
  NearbySection,
  PerformanceOverview,
  TransportSection,
} from "@/domains/performance/components";
import { SwitchCase } from "@/shared/components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PerformanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState("transport");
  const { performanceId } = useParams();

  useEffect(() => {
    console.log("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col flex-1 items-center w-full bg-white">
      <div className="flex-1 w-full">
        {/* 공연 정보 */}
        <PerformanceOverview />

        {/* 탭 메뉴 */}
        <div className="flex flex-col gap-4 w-full bg-gray-200 border-2">
          <ul className={`flex justify-between w-full`}>
            {[
              {
                label: "교통정보",
                value: "transport",
              },
              {
                label: "인근정보",
                value: "nearby",
              },
              {
                label: "관련 콘텐츠",
                value: "content",
              },
            ].map((item) => (
              <li
                className={`px-4 py-3 body-hak flex-1 text-center cursor-pointer transition-all duration-200  active:scale-95 ${
                  activeTab === item.value
                    ? "text-black bg-white border-b-[4px] border-b-black"
                    : "bg-gray-200 text-secondary-100 border-b-[1px] border-b-gray-100"
                } `}
                onClick={() => setActiveTab(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 w-full">
            <SwitchCase
              value={activeTab}
              case={{
                transport: (
                  <TransportSection performanceId={Number(performanceId)} />
                ),
                content: (
                  <ContentSection performanceId={Number(performanceId)} />
                ),
                nearby: <NearbySection />,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
