import ChildProfile from "@/domains/child/components/ChildProfile";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { ChildItem } from "@/domains/child/types";
import { performanceApi } from "@/domains/performance/apis";
import PerformanceCard from "@/domains/performance/components/PerformanceCard";
import { PerformanceItem } from "@/domains/performance/types";
import { PATH } from "@/shared/constants/paths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedPerformanceList, setRecommendedPerformanceList] = useState<
    PerformanceItem[]
  >([]);
  const navigate = useNavigate();

  const handlePerformancePress = (performanceId: number) => {
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };
  const { data: { contents: children } = { contents: [] } } =
    useChildListQuery();
  const [selectedChild, setSelectedChild] = useState<ChildItem | null>(null);

  useEffect(
    function initializeRecommendedPerformanceList() {
      if (!selectedChild) return;

      const fetchRecommendedPerformanceList = async () => {
        // const { contents: recommendedPerformances } =
        const recommendedPerformances =
          await performanceApi.getRecommendedPerformanceList(selectedChild.id);
        setRecommendedPerformanceList(recommendedPerformances);
      };

      fetchRecommendedPerformanceList();
    },
    [selectedChild]
  );

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      setSelectedChild(children[0]);
    },
    [children]
  );

  //TODO: 아이목록 조회시 지역, 성향불러오기 and 공연API, 공연상세 API 추가
  if (!selectedChild) {
    return;
  }

  return (
    <div>
      <div className="flex-1">
        {/* 로고 */}
        <div className="items-center pt-4 pb-6">
          <p className="text-2xl text-black title-hak">두두몽드</p>
        </div>
        {/* 검색바 */}
        <input
          placeholder="공연, 장소, 배우를 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* 아이 선택 */}
        <div>
          {children.map((child) => (
            <ChildProfile
              key={child.id}
              child={child}
              isSelected={selectedChild?.id === child.id}
              onClick={setSelectedChild}
            />
          ))}
        </div>
        {/*  장르별 공연 섹션 */}
        <div className="mb-8">
          <p className="mb-4 text-[17px] font-normal text-black">
            👩‍👧 인기캐릭터를 좋아하는 {selectedChild?.name}를 위해!
          </p>
          <div>
            {recommendedPerformanceList?.map((recommendedPerformance) => (
              <PerformanceCard
                key={recommendedPerformance.performanceId}
                performance={recommendedPerformance}
                onPress={handlePerformancePress}
              />
            ))}
          </div>
        </div>
        {/*  지역 인기 공연 섹션 */}
        {/* <View className="mb-8">
          <Text className="mb-4 text-[17px] font-normal text-black">
            🌟 {getSidoLabel(selectedChild?.sido)} 지역 인기 공연이에요
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
        </View> */}
        {/* Bottom Spacing */}
      </div>
    </div>
  );
};

export default HomeScreen;
