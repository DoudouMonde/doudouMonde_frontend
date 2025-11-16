import { NearbyInfo, NearbyPlace } from "@/domains/performance/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  nearbyInfo: NearbyInfo;
};

// 유아의자 아이콘 컴포넌트
const HighChairIcon = () => (
  <View className="w-6 h-6 rounded-full bg-[#D9D9D9] flex items-center justify-center">
    <View className="flex justify-center items-center w-6 h-6 bg-white rounded-full">
      <View className="w-[13.23px] h-[17.63px] items-center justify-center">
        {/* SVG 대신 텍스트 아이콘으로 대체 */}
        <Text className="text-[#FFF5A6] text-xs">👶</Text>
      </View>
    </View>
  </View>
);

// 카카오맵 아이콘 컴포넌트
const KakaoMapIcon = () => (
  <View className="w-[17px] h-[17px] bg-gray-200 rounded-sm">
    {/* 실제로는 카카오맵 아이콘 이미지가 들어갈 자리 */}
    <Text className="text-xs text-center">📍</Text>
  </View>
);

// 개별 장소 아이템 컴포넌트
const PlaceItem = ({ place }: { place: NearbyPlace }) => (
  <TouchableOpacity
    className="flex-row items-center justify-between px-2.5 py-2 border-b-[0.5px] border-[#808080] h-8"
    style={{ backgroundColor: "rgba(217, 217, 217, 0)" }}
  >
    <View className="flex-row flex-1 items-center">
      <View className="flex-row flex-1 justify-between items-center">
        {/* 장소명과 거리 */}
        <View className="flex-row flex-1 items-center">
          <Text
            className="text-[11px] font-semibold text-black mr-2"
            style={{ fontFamily: "Noto Sans KR" }}
            numberOfLines={1}
          >
            {place.name}
          </Text>
        </View>

        {/* 거리 정보 */}
        <Text
          className="text-[11px] text-[#595959] mr-2"
          style={{ fontFamily: "Noto Sans KR" }}
        >
          {place.distance}
        </Text>

        {/* 카카오맵 아이콘 */}
        <KakaoMapIcon />
      </View>

      {/* 유아의자 아이콘 (맛집에만 표시) */}
      {place.hasHighChair && (
        <View className="ml-4">
          <HighChairIcon />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// 섹션 컴포넌트
const Section = ({
  title,
  places,
}: {
  title: string;
  places: NearbyPlace[];
}) => (
  <View className="mb-6">
    <Text
      className="mb-4 text-xs font-normal text-black"
      style={{
        fontFamily: "System", // Figma에서 '?????' 로 표시된 부분
        textDecorationLine: "underline",
        textDecorationColor: "#000000",
      }}
    >
      {title}
    </Text>
    <View className="space-y-0">
      {places.map((place, index) => (
        <PlaceItem key={index} place={place} />
      ))}
    </View>
  </View>
);

export const NearbySection = ({ nearbyInfo }: Props) => {
  return (
    <View className="p-4">
      {/* 아이와 가볼만한 맛집 섹션 */}
      <Section title="아이와 가볼만한 맛집" places={nearbyInfo.restaurants} />

      {/* 가볼만한 키즈카페 섹션 */}
      <Section title="가볼만한 키즈카페" places={nearbyInfo.kidsCafes} />
    </View>
  );
};
