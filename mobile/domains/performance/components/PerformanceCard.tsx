import { FacilityIcon, PerformanceItem } from "@/domains/performance/types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Props 타입
type Props = {
  performance: PerformanceItem;
  onPress: (performanceId: number) => void;
};
// 시설 아이콘 렌더링
const renderFacilityIcon = (facility: FacilityIcon) => {
  const iconMap = {
    restroom: "🚻",
    baby: "👶",
    playroom: "🎮",
  };

  return (
    <View
      key={facility}
      className="w-[18px] h-[14px] bg-secondary-400 rounded-lg mr-1 justify-center items-center"
    >
      <Text className="text-[8px]">{iconMap[facility]}</Text>
    </View>
  );
};
export default function PerformanceCard({ performance, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress(performance.id)}
      className="mr-4 w-[124px]"
    >
      <View className="relative">
        {/* 포스터 */}
        <Image
          source={performance.poster}
          className="w-[124px] h-[177px] bg-gray-100 rounded-lg"
          resizeMode="cover"
        />

        {/* 시설 아이콘 오버레이 */}
        {performance.facilities.length > 0 && (
          <View className="absolute right-0 bottom-0 left-0">
            {/* 배경 */}
            <View className="h-[21px] bg-neutral-gray-600 rounded-b-lg" />
            {/* 아이콘들 */}
            <View className="absolute top-1 left-2 flex-row">
              {performance.facilities.map((facility) =>
                renderFacilityIcon(facility)
              )}
            </View>
          </View>
        )}
      </View>

      {/* 제목과 위치 */}
      <View className="px-1 mt-2">
        <Text className="text-[10px] font-semibold text-neutral-gray-400 mb-1 font-inter">
          {performance.location}
        </Text>
        <Text
          className="text-[12px] font-semibold text-black font-inter leading-[14.5px]"
          numberOfLines={2}
        >
          {performance.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
