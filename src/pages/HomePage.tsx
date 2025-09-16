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
  useNewGenrePerformanceListQuery,
  usePerformancesByTraitQuery,
  useRewardPerformanceListQuery,
  useSidoPerformanceListQuery,
} from "@/domains/performance/queries";

import { SearchPerformancesInput } from "@/shared/components";
import { AutoCarousel } from "@/shared/components/AutoCarousel";
import { PATH } from "@/shared/constants/paths";
import { getGenreLabel, getSidoLabel } from "@/shared/services";
import { Gender, Genre, Profile, Sido, Trait } from "@/shared/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    trait: Trait.MUSIC_LOVER,
  });

  // 취향 기반 추천 로직
  const getTraitLabel = () => {
    if (!selectedChild?.trait)
      return `${selectedChild?.name}에게 딱 맞는 ${getGenreLabel(
        selectedChild?.genre ?? Genre.PLAY
      )}공연`;

    const traits = selectedChild.trait;
    if (traits.includes("MUSIC_LOVER")) {
      return `${selectedChild?.name}을 위한 뮤지컬 추천`;
    }
    if (traits.includes("SHORT_ATTENTION")) {
      return `${selectedChild?.name}을 위한 짧은 공연 추천 (100분 이하)`;
    }
    if (traits.includes("CURIOUS")) {
      return `${selectedChild?.name}을 위한 새로운 장르 추천`;
    }
    if (traits.includes("DANCE_LOVER")) {
      return `${selectedChild?.name}을 위한 춤 공연 추천`;
    }

    return `${selectedChild?.name}을 위한 ${getGenreLabel(
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

  const { data: { contents: newGenrePerformanceList } = { contents: [] } } =
    useNewGenrePerformanceListQuery(selectedChild?.id || null, {
      enabled: !!selectedChild,
    });

  // 성향별 공연 데이터 가져오기
  const { data: { contents: traitPerformances } = { contents: [] } } =
    usePerformancesByTraitQuery(
      selectedChild?.trait ?? Trait.MUSIC_LOVER,
      selectedChild?.id ?? 0,
      {
        enabled: !!selectedChild,
      }
    );

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
            {getTraitLabel()}
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
                onClick={(childItem) => setSelectedChild(childItem)}
              />
            ))}
          </ul>
          <div className="flex flex-col gap-12 w-full">
            {/*  성향별 공연 섹션 */}
            <section className="flex flex-col gap-2">
              <h2 className="py-2 text-black title-inter-b">
                성향에 딱 맞는 공연 추천
              </h2>
              <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
                {/* 성향이 없거나 데이터가 없을 때 기본 공연 표시 */}
                {traitPerformances.map((performance) => (
                  <PerformanceCard
                    key={performance.performanceId}
                    performance={performance}
                    onClick={handlePerformancePress}
                  />
                ))}
              </ul>
            </section>

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

            {/*  새로운 장르 공연 섹션 */}
            <section className="flex flex-col gap-2">
              <h2 className="py-2 text-black title-inter-b">
                {selectedChild?.name}을 위한 새로운 장르 공연
              </h2>
              <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
                {newGenrePerformanceList.map((newGenrePerformance) => (
                  <PerformanceCard
                    key={newGenrePerformance.performanceId}
                    performance={newGenrePerformance}
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
