import { NearbySection } from "@/domains/performance/components/NearbySection";
import { PerformanceOverview } from "@/domains/performance/components/PerformanceOverview";
import { PerformanceTab } from "@/domains/performance/components/PerformanceTab";
import { SeatsSection } from "@/domains/performance/components/SeatsSection";
import { TransportSection } from "@/domains/performance/components/TransportSection";
import { PerformanceDetail, TabType } from "@/domains/performance/types";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

// 예시 데이터 (실제로는 API 호출 또는 상태 관리를 통해 가져올 데이터)
const performance: PerformanceDetail = {
  title: "［2025LOF］ 블링블링 캐치! 티니핑 심포니",
  poster: { uri: "https://picsum.photos/157/210?random=1" },
  tag: "🌱 차차는 처음 보는 장르예요!",
  location: "롯데콘서트홀",
  period: "2025.08.03 ~ 2025.08.10",
  duration: "60분",
  ageLimit: "24개월이상 관람가능",
  prices: ["R석 88,000원", "S석 77,000원", "A석 66,000원"],
  facilities: "장애인화장실, 수유실, 놀이방",
  hasParking: true,
  transportInfo: {
    publicTransport: {
      duration: "43분",
      image: { uri: "https://picsum.photos/154/153?random=1" },
    },
    car: {
      duration: "20분",
      image: { uri: "https://picsum.photos/154/153?random=2" },
    },
  },
  nearbyInfo: {
    restaurants: [
      {
        name: "쌤쌤쌤 롯데월드몰점",
        distance: "112m",
        hasHighChair: true,
      },
      {
        name: "동화고옥 롯데월드몰점",
        distance: "250m",
        hasHighChair: true,
      },
    ],
    kidsCafes: [
      {
        name: "째깍섬 잠실센터",
        distance: "76m",
      },
      {
        name: "챔피언더블랙벨트 롯데월드타워&롯데월드몰",
        distance: "114m",
      },
      {
        name: "캘리클럽 홈플러스잠실점",
        distance: "908m",
      },
      {
        name: "상상블럭 홈플러스잠실점",
        distance: "908m",
      },
    ],
  },
  seatsInfo: {
    seatMapImage: "https://picsum.photos/208/285?random=seat",
    disclaimer:
      "아래 정보는 '표준' 콘서트홀 좌석표를 기준으로 제시되어 있으며 실제 좌석 구조는 아래 자료와 다를 수 있습니다.",
    childCategories: [
      "화장실 자주 가는 아이",
      "소리에 예민한 아이",
      "집중력이 짧은 아이",
      "조명이 부담스러운 아이",
    ],
  },
};
function PerformanceDetailScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("seats");

  const performanceId = 1;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 공연 정보 */}
        <PerformanceOverview performance={performance} />

        {/* 탭 메뉴 */}
        <PerformanceTab activeTab={activeTab} onPressTab={setActiveTab} />

        {/* 탭 콘텐츠 */}
        <View className="flex-1 bg-white">
          {activeTab === "transport" && (
            <TransportSection performance={performance} />
          )}
          {activeTab === "nearby" && performance.nearbyInfo && (
            <NearbySection nearbyInfo={performance.nearbyInfo} />
          )}
          {activeTab === "seats" && performance.seatsInfo && (
            <SeatsSection seatsInfo={performance.seatsInfo} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default PerformanceDetailScreen;
