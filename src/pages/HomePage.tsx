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
import { useEffect, useRef, useState } from "react";
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

  // 검색 관련 상태
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { data: searchData } = useSearchPerformancesQuery(searchText, 0);

  const searchResults = searchData?.contents || [];

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSearchResultClick = (performanceId: number) => {
    setShowSearchResults(false);
    setSearchText("");
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };

  // 외부 클릭 시 검색 결과 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (!selectedChild) {
  //   return null;
  // }

  return (
    <div className="flex flex-col items-center p-0 w-full border-2">
      <header className="flex fixed left-0 z-10 flex-row flex-1 justify-center items-center w-full h-16 bg-gray-200 border-2">
        <p className="text-2xl text-black title-hak">두두몽드</p>
        <div className="relative" ref={searchContainerRef}>
          <SearchInput
            placeholder="공연 검색..."
            onSearch={handleSearchChange}
            value={searchText}
          />

          {/* 검색 결과 드롭다운 */}
          {showSearchResults && (
            <div className="absolute top-full left-0 w-[289px] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[300px] overflow-hidden">
              {searchResults.length > 0 ? (
                <ul className="py-2 hide-scrollbar overflow-y-auto max-h-[300px]">
                  {searchResults.slice(0, 30).map((performance) => (
                    <li
                      key={performance.performanceId}
                      className="px-4 py-3 bg-gray-200 border-b border-gray-100 transition-colors cursor-pointer hover:bg-gray-50 last:border-b-0"
                      onClick={() =>
                        handleSearchResultClick(performance.performanceId)
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={performance.posterUrl}
                          alt={performance.performanceName}
                          className="object-cover flex-shrink-0 w-12 h-12 rounded-md"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/assets/images/placeholder.png";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {performance.performanceName}
                          </p>
                          <div className="flex gap-2 items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {performance.sido}
                            </span>
                            <div className="flex gap-1 items-center">
                              {performance.hasPlayRoom && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                                  놀이방
                                </span>
                              )}
                              {performance.hasNursingRoom && (
                                <span className="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded">
                                  수유실
                                </span>
                              )}
                              {performance.hasRestRoom && (
                                <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
                                  화장실
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center bg-gray-200">
                  <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
                  <p className="mt-1 text-xs text-gray-400">
                    다른 키워드로 검색해보세요.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
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
