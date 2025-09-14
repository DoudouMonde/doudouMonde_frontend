import ChildProfile from "@/domains/child/components/ChildProfile";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { ChildItem } from "@/domains/child/types";
import PerformanceCard from "@/domains/performance/components/PerformanceCard";
import {
  useGenrePerformanceListQuery,
  useRewardPerformanceListQuery,
  useSidoPerformanceListQuery,
} from "@/domains/performance/queries";

import { SearchInput } from "@/shared/components/SearchInput";
import { PATH } from "@/shared/constants/paths";
import { Gender, Genre, Profile, Sido } from "@/shared/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchPerformancesQuery } from "@/domains/performance/queries";

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

  // 컴포넌트에서 사용
  const { data } = useSearchPerformancesQuery("검색어", 0);

  console.log(data);
  const [searchText, setSearchText] = useState<string>("");

  // if (!selectedChild) {
  //   return null;
  // }

  return (
    <div className="flex flex-col items-center p-0 w-full border-2">
      <header className="flex fixed left-0 z-10 flex-row flex-1 justify-center items-center w-full h-16 bg-gray-200 border-2">
        <p className="text-2xl text-black title-hak">두두몽드</p>
        <SearchInput
          placeholder="다른 텍스트 검색..."
          onSearch={(value) => setSearchText(value)}
          value={searchText}
        />
      </header>

      {/* 아이 선택 */}
      <div className="flex flex-col gap-10 pt-[76px] w-full">
        <ul className="flex overflow-x-auto flex-row gap-4 border-2">
          {children.map((child) => (
            <ChildProfile
              key={child.id}
              child={child}
              isSelected={selectedChild?.id === child.id}
              onClick={setSelectedChild}
            />
          ))}
        </ul>

        <div className="flex flex-col gap-12 w-full border-2">
          {/*  장르별 공연 섹션 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-black title-hak">
              {/* 👩‍👧 {getGenreLabel(selectedChild.genre)}를 좋아하는{" "} */}
              {selectedChild?.name}를 위해!
            </h2>
            <ul className="flex overflow-x-auto flex-row gap-4 hide-scrollbar">
              {genrePerformanceList.map((genrePerformance) => (
                <Link
                  to={PATH.PERFORMANCE_DETAIL(genrePerformance.performanceId)}
                >
                  <PerformanceCard
                    key={genrePerformance.performanceId}
                    performance={genrePerformance}
                    onClick={handlePerformancePress}
                  />
                </Link>
              ))}
            </ul>
          </section>

          {/*  지역별 공연 섹션 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-black title-hak">
              {/* 👩‍👧 {getSidoLabel(selectedChild.sido)} 지역 인기 공연이에요 */}
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
            <h2 className="text-black title-hak">수상 받은 공연이에요</h2>
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
    </div>
  );
};
