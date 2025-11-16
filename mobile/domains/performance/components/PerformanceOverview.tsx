import { PerformanceDetail } from "@/domains/performance/types";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  performance: PerformanceDetail;
};

export const PerformanceOverview = ({ performance }: Props) => {
  const performanceInfo = [
    { label: "장소", value: performance.location },
    { label: "공연기간", value: performance.period },
    { label: "공연시간", value: performance.duration },
    { label: "관람연령", value: performance.ageLimit },
    { label: "가격", value: performance.prices.join("\n") },
    { label: "시설정보", value: performance.facilities },
  ];
  const [selectedReview, setSelectedReview] = useState<
    "want" | "watched" | null
  >(null);
  return (
    <View className="px-4 pt-4 pb-5 bg-white/90">
      {/* 태그 */}
      {performance.tag && (
        <View className="absolute top-4 left-6 z-10">
          <View className="px-1.5 py-0.5 rounded-[10px] border bg-secondary-400 border-gray-300">
            <Text className="text-xs text-black font-inter">
              {performance.tag}
            </Text>
          </View>
        </View>
      )}

      {/* 제목 */}
      <Text
        className="text-[16px] font-semibold text-black leading-[22px] mt-7 mb-4 font-noto"
        numberOfLines={2}
      >
        {performance.title}
      </Text>

      <View className="flex-row">
        {/* 포스터 */}
        <View className="mr-4">
          <Image
            source={performance.poster}
            className="w-[157px] h-[210px] rounded-lg bg-gray-100 shadow-card"
          />
        </View>

        {/* 상세 정보 */}
        <View className="flex-1 pt-0.5">
          {performanceInfo.map((item, index) => (
            <View key={index} className="flex-row items-start mb-4">
              <Text className="text-[12px] text-black leading-3 w-9 mr-4 font-noto">
                {item.label}
              </Text>
              <Text
                className={`text-[10px] leading-3 flex-1 font-noto ${
                  item.label === "가격"
                    ? "text-[#454545] leading-[15px]"
                    : "text-black leading-3"
                }`}
                numberOfLines={item.label === "가격" ? 3 : 1}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 리뷰 버튼 */}
      <View className="flex-row gap-1 justify-end mt-4">
        <TouchableOpacity
          className={`bg-white border-2 border-secondary-500 rounded-[10px] px-3 py-1 w-20 h-5 justify-center items-center ${
            selectedReview === "want" ? "bg-secondary-500" : ""
          }`}
          onPress={() =>
            setSelectedReview(selectedReview === "want" ? null : "want")
          }
        >
          <Text className="text-[10px] text-black font-inter">
            보고싶어요 💖
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-white border-2 border-secondary-500 rounded-[10px] px-3 py-1 w-20 h-5 justify-center items-center ${
            selectedReview === "watched" ? "bg-secondary-500" : ""
          }`}
          onPress={() =>
            setSelectedReview(selectedReview === "watched" ? null : "watched")
          }
        >
          <Text className="text-[10px] text-black font-inter">봤어요 ✅</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
