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
import { getGenreLabel, getSidoLabel } from "@/shared/services";
import { Genre, Sido } from "@/shared/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handlePerformancePress = (performanceId: number) => {
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };
  const { data: { contents: children } = { contents: [] } } =
    useChildListQuery();
  const [selectedChild, setSelectedChild] = useState<ChildItem | null>(null);

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

  const [searchText, setSearchText] = useState<string>("");

  if (!selectedChild) {
    return;
  }
  return (
    <div>
      <header className="flex fixed left-0 z-10 flex-row justify-center items-center w-full h-16 bg-gray-200 border-2">
        <p className="text-2xl text-black title-hak">두두몽드</p>
        <SearchInput
          placeholder="다른 텍스트 검색..."
          onSearch={(value) => setSearchText(value)}
          value={searchText}
        />
      </header>

      {/* 아이 선택 */}
      <div className="flex flex-col gap-10 pt-[76px]">
        <ul className="flex flex-row gap-4">
          {children.map((child) => (
            <ChildProfile
              key={child.id}
              child={child}
              isSelected={selectedChild?.id === child.id}
              onClick={setSelectedChild}
            />
          ))}
        </ul>

        <div className="flex flex-col gap-12">
          {/*  장르별 공연 섹션 */}
          <section className="flex flex-col gap-2">
            <h2 className="text-black title-hak">
              👩‍👧 {getGenreLabel(selectedChild.genre)}를 좋아하는{" "}
              {selectedChild?.name}를 위해!
            </h2>
            <ul>
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
              👩‍👧 {getSidoLabel(selectedChild.sido)} 지역 인기 공연이에요
            </h2>
            <ul>
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
            <ul>
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

export default HomeScreen;
