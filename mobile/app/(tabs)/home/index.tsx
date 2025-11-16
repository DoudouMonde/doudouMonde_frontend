import ChildProfile from "@/domains/child/components/ChildProfile";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { ChildItem } from "@/domains/child/types";
import PerformanceCard from "@/domains/performance/components/PerformanceCard";
import Input from "@/shared/components/Input";
import ScreenWrapper from "@/shared/components/ScreenWrapper";
import { PATH } from "@/shared/constants/paths";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

// 공연 데이터
const seoulPerformances: Performance[] = [
  {
    id: 1,
    title: "슈퍼거북 슈퍼토끼",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: ["restroom", "baby"],
  },
  {
    id: 2,
    title: "흥부놀부",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: ["playroom", "restroom"],
  },
  {
    id: 3,
    title: "알사탕",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: ["restroom"],
  },
];

const characterPerformances: Performance[] = [
  {
    id: 4,
    title: "아기상어와 반짝반짝 최고의 파티",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: ["restroom"],
  },
  {
    id: 5,
    title: "위시캣〈소원을 노래해!〉",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: [],
  },
  {
    id: 6,
    title: "블링블링 캐치! 티니핑 심포니",
    location: "서울",
    poster: require("../../../assets/images/react-logo.png"),
    facilities: ["playroom", "restroom", "baby"],
  },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePerformancePress = (performanceId: number) => {
    router.push(PATH.PERFORMANCE_DETAIL(performanceId));
  };
  const { data: { contents: children } = { contents: [] } } =
    useChildListQuery();
  const [selectedChild, setSelectedChild] = useState<ChildItem | null>(null);

  useEffect(() => {
    if (children.length === 0) return;
    setSelectedChild(children[0]);
  }, [children]);

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 로고 */}
        <View className="items-center pt-4 pb-6">
          <Text className="text-2xl font-bold text-black">두두몽드</Text>
        </View>

        {/* 검색바 */}
        <Input
          placeholder="공연, 장소, 배우를 검색해보세요"
          value={searchQuery}
          onChange={setSearchQuery}
          icon="🔍"
        />

        {/* 아이 선택 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          {children.map((child) => (
            <ChildProfile
              key={child.id}
              child={child}
              isSelected={selectedChild?.id === child.id}
              onPress={setSelectedChild}
            />
          ))}
        </ScrollView>

        {/* 인기캐릭터 섹션 */}
        <View className="mb-8">
          <Text className="mb-4 text-[17px] font-normal text-black">
            👩‍👧 인기캐릭터를 좋아하는 {selectedChild?.name}를 위해!
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 7 }}
          >
            {characterPerformances.map((item) => (
              <PerformanceCard
                key={item.id}
                performance={item}
                onPress={handlePerformancePress}
              />
            ))}
          </ScrollView>
        </View>

        {/* 서울 지역 인기 공연 섹션 */}
        <View className="mb-8">
          <Text className="mb-4 text-[17px] font-normal text-black">
            🌟 서울 지역 인기 공연이에요
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingLeft: 7 }}
          >
            {seoulPerformances.map((item) => (
              <PerformanceCard
                key={item.id}
                performance={item}
                onPress={handlePerformancePress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default HomeScreen;
