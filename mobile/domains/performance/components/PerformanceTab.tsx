import { TabType } from "@/domains/performance/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
    <View className="bg-white">
      <View className="flex-row gap-4 px-4">
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            className="flex-col justify-center items-center marker:w-fit"
            onPress={() => onPressTab(tab.id)}
          >
            <View className="py-3">
              <Text
                className={`text-[16px] ${
                  activeTab === tab.id ? "text-black" : "text-black/60"
                }`}
                style={{ fontFamily: "Inter" }}
              >
                {tab.label}
              </Text>
            </View>

            {/* 선택된 탭 인디케이터 */}
            {activeTab === tab.id && <View className="w-full h-1 bg-black" />}
          </Pressable>
        ))}
      </View>
    </View>
  );
};
