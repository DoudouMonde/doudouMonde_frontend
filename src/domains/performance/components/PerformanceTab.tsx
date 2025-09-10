import { TabType } from "@/domains/performance/types";

type Props = {
  activeTab: TabType;
  onPressTab: (tab: TabType) => void;
};

const tabs = [
  { id: "transport" as TabType, label: "🚸 교통정보" },
  { id: "seats" as TabType, label: "💺 좌석정보" },
  { id: "nearby" as TabType, label: "😉 인근정보" },
];

export const PerformanceTab = ({ activeTab, onPressTab }: Props) => {
  return (
    <div className="z-10 bg-white">
      <div className="flex-row gap-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex-col justify-center items-center marker:w-fit"
            onClick={() => onPressTab(tab.id)}
          >
            <div className="py-3">
              <p className="body-hak">{tab.label}</p>
            </div>

            {/* 선택된 탭 인디케이터 */}
            {activeTab === tab.id && <div className="w-full h-1 bg-black" />}
          </button>
        ))}
      </div>
    </div>
  );
};
