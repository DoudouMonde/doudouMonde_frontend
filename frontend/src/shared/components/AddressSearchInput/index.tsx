import { useState, useEffect, useRef } from "react";
import { getLocationListByQuery } from "@/shared/apis/location";
import { AddressSearchResult, SelectedAddress } from "@/shared/types/location";
import { SearchInput } from "@/shared/components/SearchInput";

interface AddressSearchInputProps {
  placeholder?: string;
  onSelect?: (address: SelectedAddress) => void;
  className?: string;
}

export const AddressSearchInput = ({
  placeholder = "주소를 검색해주세요",
  onSelect,
  className = "",
}: AddressSearchInputProps) => {
  // 검색 관련 상태
  const [searchText, setSearchText] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 검색 결과 상태
  const [searchResults, setSearchResults] = useState<AddressSearchResult[]>([]);

  // 디바운스된 검색 함수
  const debouncedSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const response = await getLocationListByQuery(query);
      const results: AddressSearchResult[] = response.data.documents.map(
        (doc) => ({
          id: doc.id,
          placeName: doc.place_name,
          addressName: doc.address_name,
          roadAddressName: doc.road_address_name,
          categoryName: doc.category_name,
          phone: doc.phone,
          latitude: parseFloat(doc.y),
          longitude: parseFloat(doc.x),
          placeUrl: doc.place_url,
        })
      );

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error("주소 검색 실패:", error);
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setShowSearchResults(value.length > 0);

    // 기존 타이머 클리어
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 300ms 후에 검색 실행
    debounceRef.current = setTimeout(() => {
      debouncedSearch(value);
    }, 300);
  };

  const handleAddressSelect = (result: AddressSearchResult) => {
    const selectedAddress: SelectedAddress = {
      placeName: result.placeName,
      addressName: result.addressName,
      roadAddressName: result.roadAddressName,
      latitude: result.latitude,
      longitude: result.longitude,
      categoryName: result.categoryName,
      phone: result.phone,
    };

    setShowSearchResults(false);
    setSearchText(result.placeName);

    if (onSelect) {
      onSelect(selectedAddress);
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

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
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
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[300px] overflow-hidden">
          {searchResults.length > 0 ? (
            <ul className="py-2 hide-scrollbar overflow-y-auto max-h-[300px]">
              {searchResults.slice(0, 30).map((result) => (
                <li
                  key={result.id}
                  className="px-4 py-3 bg-gray-200 border-b border-gray-100 transition-colors cursor-pointer hover:bg-gray-50 last:border-b-0"
                  onClick={() => handleAddressSelect(result)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="text-sm font-medium text-gray-900">
                      {result.placeName}
                    </div>
                    <div className="text-xs text-gray-600">
                      {result.roadAddressName || result.addressName}
                    </div>
                    {result.categoryName && (
                      <div className="text-xs text-gray-500">
                        {result.categoryName}
                      </div>
                    )}
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
