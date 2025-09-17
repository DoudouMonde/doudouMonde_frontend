import { KoreanLogo } from "@/assets/icons";
import ChildProfile from "@/domains/child/components/ChildProfile";
import { useChildListQuery } from "@/domains/child/queries";
import { ChildItem } from "@/domains/child/types";
import PerformanceCard from "@/domains/performance/components/PerformanceCard";
import {
  useGenrePerformanceListQuery,
  useNewGenrePerformanceListQuery,
  useRewardPerformanceListQuery,
  useSidoPerformanceListQuery,
} from "@/domains/performance/queries";

import { SearchPerformancesInput } from "@/shared/components";
import { AutoCarousel } from "@/shared/components/AutoCarousel";
import { PATH } from "@/shared/constants/paths";
import { getGenreLabel, getSidoLabel } from "@/shared/services";
import { Gender, Genre, Profile, Sido } from "@/shared/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handlePerformancePress = (performanceId: number) => {
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };

  const {
    data: { contents: children } = { contents: [] },
    isLoading: childrenLoading,
    error: childrenError,
  } = useChildListQuery();

  const [selectedChild, setSelectedChild] = useState<ChildItem | null>(null);

  // 아이 조회 디버깅 로그
  console.log("👶 아이 조회 상태:", {
    children,
    childrenLoading,
    childrenError,
    childrenCount: children?.length || 0,
  });

  // 기본 추천 제목
  const getRecommendationTitle = () => {
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

  const { data: { contents: newGenrePerformanceList } = { contents: [] } } =
    useNewGenrePerformanceListQuery(selectedChild?.id || null, {
      enabled: !!selectedChild,
    });

  // 성향별 공연 데이터 가져오기

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      // ChildItemResponse를 ChildItem으로 변환
      const firstChild = children[0];
      const convertedChild: ChildItem = {
        id: firstChild.id,
        name: firstChild.name,
        birthday: firstChild.birthday,
        gender: firstChild.gender as Gender,
        profile: firstChild.profile as Profile,
        sido: firstChild.sido as Sido,
        genre: Genre.PLAY, // 기본값 설정
      };
      setSelectedChild(convertedChild);
    },
    [children]
  );

  // 로딩 상태 처리
  if (childrenLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-0 m-0 w-full h-full">
        <div className="text-lg">아이 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (childrenError) {
    return (
      <div className="flex flex-col justify-center items-center p-0 m-0 w-full h-full">
        <div className="text-lg text-red-500">
          아이 정보를 불러올 수 없습니다.
        </div>
        <div className="mt-2 text-sm text-gray-500">
          에러: {childrenError.message}
        </div>
      </div>
    );
  }

  // 아이가 없는 경우
  if (!children || children.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-0 m-0 w-full h-full">
        <div className="text-lg">등록된 아이가 없습니다.</div>
        <div className="mt-2 text-sm text-gray-500">아이를 등록해주세요.</div>
      </div>
    );
  }

  // selectedChild가 없는 경우
  if (!selectedChild) {
    return (
      <div className="flex flex-col justify-center items-center p-0 m-0 w-full h-full">
        <div className="text-lg">아이를 선택해주세요.</div>
      </div>
    );
  }

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
            {children.map((child) => {
              const convertedChild: ChildItem = {
                id: child.id,
                name: child.name,
                birthday: child.birthday,
                gender: child.gender as Gender,
                profile: child.profile as Profile,
                sido: child.sido as Sido,
                genre: Genre.PLAY,
              };
              return (
                <ChildProfile
                  key={child.id}
                  child={convertedChild}
                  isSelected={selectedChild?.id === child.id}
                  onClick={setSelectedChild}
                />
              );
            })}
          </ul>
          <div className="flex flex-col gap-12 w-full">
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
