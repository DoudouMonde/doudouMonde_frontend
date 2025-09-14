import { BabyIcon, BearIcon, RestroomIcon } from "@/assets/icons";
import { useSearchPerformancesQuery } from "@/domains/performance/queries";
import { SearchInput } from "@/shared/components/SearchInput";
import { getSidoLabel } from "@/shared/services";
import { Sido } from "@/shared/types";
import { useEffect, useRef, useState } from "react";

interface SearchPerformanceForSelectionProps {
  placeholder?: string;
  onResultClick?: (performance: {
    id: number;
    title: string;
    posterUrl: string;
    location: string;
  }) => void;
  className?: string;
}

export const SearchPerformanceForSelection = ({
  placeholder = "공연 검색...",
  onResultClick,
  className = "",
}: SearchPerformanceForSelectionProps) => {
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

  const handleSearchResultClick = (performance: {
    performanceId: number;
    performanceName: string;
    posterUrl: string;
    sido: string;
    hasRestRoom: boolean;
    hasNursingRoom: boolean;
    hasPlayRoom: boolean;
  }) => {
    setShowSearchResults(false);
    setSearchText("");

    if (onResultClick) {
      onResultClick({
        id: performance.performanceId,
        title: performance.performanceName,
        posterUrl:
          performance.posterUrl || "/assets/images/playroom/backgroundImg.png",
        location: getSidoLabel(performance.sido as Sido),
      });
    }
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

  return (
    <div className={`relative ${className}`} ref={searchContainerRef}>
      <SearchInput
        placeholder={placeholder}
        onSearch={handleSearchChange}
        value={searchText}
      />

      {/* 검색 결과 드롭다운 */}
      {showSearchResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-200 border border-gray-200 rounded-2xl shadow-2xl z-20 max-h-[400px] overflow-hidden">
          {searchResults.length > 0 ? (
            <ul className="py-2 hide-scrollbar overflow-y-auto max-h-[400px]">
              {searchResults.slice(0, 30).map((performance) => (
                <li
                  key={performance.performanceId}
                  className="px-4 py-4 border-b border-gray-100 transition-all duration-200 cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 last:border-b-0"
                  onClick={() => handleSearchResultClick(performance)}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={
                        performance.posterUrl ||
                        "/assets/images/playroom/backgroundImg.png"
                      }
                      alt={performance.performanceName}
                      className="object-cover flex-shrink-0 w-14 rounded-lg shadow-md h-18"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/assets/images/playroom/backgroundImg.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-base font-semibold text-gray-800 truncate">
                        {performance.performanceName}
                      </p>
                      <div className="flex gap-3 items-center">
                        <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                          {getSidoLabel(performance.sido as Sido)}
                        </span>
                        <div className="flex gap-1 items-center">
                          {performance.hasRestRoom && (
                            <div className="flex justify-center items-center w-6 h-6 bg-blue-100 rounded-full">
                              <RestroomIcon className="w-3 h-3 text-blue-600" />
                            </div>
                          )}
                          {performance.hasNursingRoom && (
                            <div className="flex justify-center items-center w-6 h-6 bg-green-100 rounded-full">
                              <BabyIcon className="w-3 h-3 text-green-600" />
                            </div>
                          )}
                          {performance.hasPlayRoom && (
                            <div className="flex justify-center items-center w-6 h-6 bg-yellow-100 rounded-full">
                              <BearIcon className="w-3 h-3 text-yellow-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-pink-500">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="mb-1 font-medium text-gray-500">
                검색 결과가 없습니다
              </p>
              <p className="text-sm text-gray-400">
                다른 키워드로 검색해보세요
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
