import { KoreanLogo } from "@/assets/icons";
import ChildProfile from "@/domains/child/components/ChildProfile";
import {
  useChildListQuery,
  useChildTraitsQuery,
} from "@/domains/child/queries";
import { ChildItem } from "@/domains/child/types";
import PerformanceCard from "@/domains/performance/components/PerformanceCard";
import {
  useGenrePerformanceListQuery,
  useRewardPerformanceListQuery,
  useSidoPerformanceListQuery,
  useMultipleTraitPerformancesQuery,
} from "@/domains/performance/queries";
import { apiRequester } from "@/shared/apis";

import { SearchPerformancesInput } from "@/shared/components";
import { AutoCarousel } from "@/shared/components/AutoCarousel";
import { PATH } from "@/shared/constants/paths";
import { getGenreLabel, getSidoLabel } from "@/shared/services";
import { Gender, Genre, Profile, Sido } from "@/shared/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handlePerformancePress = (performanceId: number) => {
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };

  const { data: { contents: children } = { contents: [] } } =
    useChildListQuery();
  const [selectedChild, setSelectedChild] = useState<ChildItem | null>({
    id: 1,
    name: "테스트",
    genre: Genre.PLAY,
    sido: Sido.SEOUL,
    birthday: "2025-01-01",
    gender: Gender.MALE,
    profile: Profile.CAT,
  });

  // 아이 취향 정보 가져오기
  const {
    data: childTraits,
    isLoading: traitsLoading,
    error: traitsError,
  } = useChildTraitsQuery(selectedChild?.id || null);

  // 성향별 공연 데이터 가져오기
  const traitPerformancesQueries = useMultipleTraitPerformancesQuery(
    childTraits?.traits || []
  );

  // 디버깅용 로그
  console.log("🎭 선택된 아이:", selectedChild);
  console.log("🎯 아이 ID:", selectedChild?.id);
  console.log("🎯 아이 취향:", childTraits);
  console.log("🎯 취향 로딩 중:", traitsLoading);
  console.log("🎯 취향 에러:", traitsError);
  console.log("🎪 성향별 공연 쿼리들:", traitPerformancesQueries);

  // 성향 라벨 반환 함수
  const getTraitLabel = (trait: string) => {
    switch (trait) {
      case "MUSIC_LOVER":
        return "음악을 좋아해요";
      case "DANCE_LOVER":
        return "춤을 좋아해요";
      case "CURIOUS":
        return "호기심이 많아요";
      case "SHORT_ATTENTION":
        return "집중시간이 짧아요";
      default:
        return trait;
    }
  };

  // 취향 기반 추천 로직
  const getRecommendationTitle = () => {
    if (!childTraits?.traits)
      return `${selectedChild?.name}에게 딱 맞는 ${getGenreLabel(
        selectedChild?.genre ?? Genre.PLAY
      )}공연`;

    const traits = childTraits.traits;
    if (traits.includes("MUSIC_LOVER")) {
      return `${selectedChild?.name}에게 딱 맞는 뮤지컬 추천`;
    }
    if (traits.includes("SHORT_ATTENTION")) {
      return `${selectedChild?.name}에게 딱 맞는 짧은 공연 추천 (100분 이하)`;
    }
    if (traits.includes("CURIOUS")) {
      return `${selectedChild?.name}에게 딱 맞는 새로운 장르 추천`;
    }
    if (traits.includes("DANCE_LOVER")) {
      return `${selectedChild?.name}에게 딱 맞는 춤 공연 추천`;
    }

    return `${selectedChild?.name}에게 딱 맞는 ${getGenreLabel(
      selectedChild?.genre ?? Genre.PLAY
    )}공연`;
  };

  const { data: { contents: genrePerformanceList } = { contents: [] } } =
    useGenrePerformanceListQuery(selectedChild?.genre ?? Genre.PLAY, {
      enabled: !!selectedChild,
    });
  const { data: { contents: sidoPerformanceList } = { contents: [] } } =
    useSidoPerformanceListQuery(selectedChild?.sido ?? Sido.SEOUL, {
      enabled: !!selectedChild,
    });

  const { data: { contents: rewardPerformanceList } = { contents: [] } } =
    useRewardPerformanceListQuery();

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      setSelectedChild(children[0]);
    },
    [children]
  );

  // if (!selectedChild) {
  //   return null;
  // }
  const savePerformance = async () => {
    const response = await apiRequester.post(
      `/v1/performances/save/7d467135319d4e57b69714067f7f5385`
    );
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center p-0 m-0 w-full h-full">
      <header className="flex fixed top-0 right-0 left-0 z-10 gap-2 items-center p-4 px-4 w-full h-16 bg-gray-200/70">
        <KoreanLogo className="flex-shrink-0 w-9" />
        <div className="flex-1 min-w-0">
          <SearchPerformancesInput placeholder="공연 검색..." />
        </div>
      </header>
      {/* 아이 선택 */}
      <main className="flex flex-col flex-1 gap-4 pt-16 w-full">
        <section className="flex flex-col gap-3">
          <h2 className="px-3 py-4 text-black title-inter-b">
            {getRecommendationTitle()}
          </h2>
          <AutoCarousel
            genre={selectedChild?.genre ?? Genre.PLAY}
            performances={genrePerformanceList.slice(0, 6)}
            onPerformanceClick={handlePerformancePress}
          />
        </section>
        <div className="flex flex-col flex-1 gap-4 px-6 pt-5 w-full bg-gray-200/70">
          <ul className="flex overflow-x-auto flex-row gap-4 px-1 py-2">
            {children.map((child) => (
              <ChildProfile
                key={child.id}
                child={child}
                isSelected={selectedChild?.id === child.id}
                onClick={setSelectedChild}
              />
            ))}
          </ul>
          <div className="flex flex-col gap-12 w-full">
            {/*  성향별 공연 섹션 */}
            {childTraits?.traits && childTraits.traits.length > 0 && (
              <section className="flex flex-col gap-2">
                <h2 className="py-2 text-black title-inter-b">
                  성향에 딱 맞는 공연 추천
                </h2>
                <div className="flex flex-col gap-4">
                  {traitPerformancesQueries.map((query, index) => {
                    const trait = childTraits.traits[index];
                    const performances = query.data?.contents || [];
                    const isLoading = query.isLoading;
                    const error = query.error;

                    if (isLoading) {
                      return (
                        <div key={trait} className="flex flex-col gap-2">
                          <h3 className="text-sm font-medium text-gray-600">
                            {getTraitLabel(trait)} 공연 로딩 중...
                          </h3>
                          <div className="flex gap-4">
                            <div className="w-48 h-32 bg-gray-200 rounded-lg animate-pulse" />
                            <div className="w-48 h-32 bg-gray-200 rounded-lg animate-pulse" />
                          </div>
                        </div>
                      );
                    }

                    if (error) {
                      return (
                        <div key={trait} className="flex flex-col gap-2">
                          <h3 className="text-sm font-medium text-gray-600">
                            {getTraitLabel(trait)} 공연을 불러올 수 없습니다.
                          </h3>
                        </div>
                      );
                    }

                    if (performances.length === 0) {
                      return null;
                    }

                    return (
                      <div key={trait} className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-600">
                          {getTraitLabel(trait)} 추천 공연
                        </h3>
                        <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
                          {performances.map((performance) => (
                            <PerformanceCard
                              key={performance.performanceId}
                              performance={performance}
                              onClick={handlePerformancePress}
                            />
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/*  지역별 공연 섹션 */}
            <section className="flex flex-col gap-2">
              <h2 className="py-2 text-black title-inter-b">
                {getSidoLabel(selectedChild?.sido ?? Sido.SEOUL)} 지역 인기 공연
              </h2>
              <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
                {sidoPerformanceList.map((sidoPerformance) => (
                  <PerformanceCard
                    key={sidoPerformance.performanceId}
                    performance={sidoPerformance}
                    onClick={handlePerformancePress}
                  />
                ))}
              </ul>
            </section>

            {/*  수상을 받은 공연 섹션 */}
            <section className="flex flex-col gap-2">
              <h2 className="py-2 text-black title-inter-b">수상작 공연</h2>
              <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
                {rewardPerformanceList.map((rewardPerformance) => (
                  <PerformanceCard
                    key={rewardPerformance.performanceId}
                    performance={rewardPerformance}
                    onClick={handlePerformancePress}
                  />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
