import { BabyIcon, BearIcon, RestroomIcon } from "@/assets/icons";
import { useSearchPerformancesQuery } from "@/domains/performance/queries";
import { SearchInput } from "@/shared/components/SearchInput";
import { PATH } from "@/shared/constants/paths";
import { getSidoLabel } from "@/shared/services";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchPerformancesInputProps {
  placeholder?: string;
  onResultClick?: (performanceId: number) => void;
  className?: string;
}

export const SearchPerformancesInput = ({
  placeholder = "공연 검색...",
  onResultClick,
  className = "",
}: SearchPerformancesInputProps) => {
  const navigate = useNavigate();

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

    if (onResultClick) {
      onResultClick(performanceId);
    } else {
      navigate(PATH.PERFORMANCE_DETAIL(performanceId));
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
                        e.currentTarget.src = "/assets/images/placeholder.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {performance.performanceName}
                      </p>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {getSidoLabel(performance.sido)}
                        </span>
                        <div className="flex gap-1 items-center">
                          {performance.hasRestRoom && (
                            <div className="flex justify-center items-center w-5 h-5 rounded-sm bg-secondary-100">
                              <RestroomIcon className="w-3 h-3 text-yellow-100" />
                            </div>
                          )}
                          {performance.hasNursingRoom && (
                            <div className="flex justify-center items-center w-5 h-5 rounded-sm bg-secondary-100">
                              <BabyIcon className="w-3 h-3 text-yellow-100" />
                            </div>
                          )}
                          {performance.hasPlayRoom && (
                            <div className="flex justify-center items-center w-5 h-5 rounded-sm bg-secondary-100">
                              <BearIcon className="w-3 h-3 text-yellow-100" />
                            </div>
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
  );
};
