import { SeatsInfo } from "@/domains/performance/types";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  seatsInfo: SeatsInfo;
};

// 범례 컴포넌트
const Legend = () => (
  <View className="px-4 mt-4">
    <Text
      className="mb-3 text-xs text-black"
      style={{
        fontFamily: "Inter",
        letterSpacing: -0.36,
        lineHeight: 14.5,
      }}
    >
      범례:
    </Text>

    <View className="space-y-2">
      {/* 화장실 접근성 */}
      <View className="flex-row items-center">
        <View
          className="mr-2 w-4 h-4 rounded"
          style={{ backgroundColor: "rgba(61, 204, 163, 0.4)" }}
        />
        <Text
          className="text-xs text-black"
          style={{
            fontFamily: "Inter",
            letterSpacing: -0.36,
          }}
        >
          화장실 접근성이 좋은 좌석
        </Text>
      </View>

      {/* 소리에 예민한 아이 */}
      <View className="flex-row items-center">
        <View
          className="mr-2 w-4 h-4 rounded"
          style={{ backgroundColor: "rgba(255, 134, 134, 0.4)" }}
        />
        <Text
          className="text-xs text-black"
          style={{
            fontFamily: "Inter",
            letterSpacing: -0.36,
          }}
        >
          소리가 큰 구역 (예민한 아이 주의)
        </Text>
      </View>

      {/* 집중력이 짧은 아이 */}
      <View className="flex-row items-center">
        <View
          className="mr-2 w-4 h-4 rounded"
          style={{ backgroundColor: "rgba(163, 145, 0, 0.4)" }}
        />
        <Text
          className="text-xs text-black"
          style={{
            fontFamily: "Inter",
            letterSpacing: -0.36,
          }}
        >
          무대에서 멀어 집중하기 어려운 구역
        </Text>
      </View>
    </View>
  </View>
);

export const SeatsSection = ({ seatsInfo }: Props) => {
  return (
    <View className="p-4">
      {/* 안내 문구 */}
      <Text
        className="text-[10px] text-black mb-4 leading-3"
        style={{
          fontFamily: "Noto Sans KR",
          letterSpacing: -0.3,
          lineHeight: 12,
        }}
      >
        {seatsInfo.disclaimer}
      </Text>

      {/* 아이 특성별 카테고리 */}
      <View className="mb-4">
        <View className="flex-row flex-wrap">
          {seatsInfo.childCategories.map((category, index) => (
            <Text
              key={index}
              className="mr-4 mb-1 text-xs text-black"
              style={{
                fontFamily: "Inter",
                letterSpacing: -0.36,
                lineHeight: 14.5,
              }}
            >
              {category}
            </Text>
          ))}
        </View>
      </View>

      {/* 좌석 배치도 */}
      <View className="items-center mb-4">
        <Image
          source={
            typeof seatsInfo.seatMapImage === "string"
              ? { uri: seatsInfo.seatMapImage }
              : seatsInfo.seatMapImage
          }
          className="w-52 h-72 rounded-lg"
          style={{
            width: 207.84,
            height: 284.55,
          }}
          resizeMode="cover"
        />
      </View>

      {/* 범례 */}
      <Legend />
    </View>
  );
};
