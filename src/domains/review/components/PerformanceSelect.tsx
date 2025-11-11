// domains/review/components/PerformanceSelect.tsx
import { useState } from "react";
import { getSidoLabel } from "@/shared/services";
import { Sido } from "@/entities/types";
import { Back, Arrow } from "@/assets/icons";
// ✅ 나중에 API 붙일 때 주석 해제
// import { SearchPerformanceForSelection } from "@/pages/SelectPerformancePage/SearchPerformanceForSelection";
// import { useWishlistQuery } from "@/domains/favorites/queries/useWishlistQuery";

type WishlistItem = {
  wishlistId: number;
  performanceId: number;
  performanceName: string;
  createTime: string; // ISO
  sido: Sido;
  posterUrl?: string | null;
};

type PerformanceSummary = {
  id: number;
  title: string;
  posterUrl: string;
  location: string;
};

type Props = {
  data?: Record<string, any>;
  // ✅ 실제 API 데이터를 상위에서 내려줄 수도 있음(없으면 목 사용)
  wishlist?: WishlistItem[];
  onChange?: (patch: { performance: PerformanceSummary }) => void;
  onValidityChange?: (ok: boolean) => void; // ✅ 추가
  onNext: () => void;
  onPrev?: () => void;
};

/** -------------------------------
 * MOCK: 오프라인/로컬 데이터
 * ------------------------------*/
const MOCK_WISHLIST: WishlistItem[] = [
  {
    wishlistId: 1,
    performanceId: 101,
    performanceName: "어린이 뮤지컬: 숲속친구들",
    createTime: new Date().toISOString(),
    sido: "SEOUL",
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  {
    wishlistId: 2,
    performanceId: 102,
    performanceName: "마술쇼: 매직타임",
    createTime: new Date(Date.now() - 86400000).toISOString(),
    sido: "SEOUL",
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  {
    wishlistId: 3,
    performanceId: 103,
    performanceName: "인형극: 별빛여행",
    createTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    sido: "SEOUL",
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  {
    wishlistId: 4,
    performanceId: 103,
    performanceName: "인형극: 별빛여행(중복)",
    createTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    sido: "SEOUL",
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
];

export function PerformanceSelect({
  data,
  wishlist,
  onChange,
  onNext,
  onPrev,
  onValidityChange,
}: Props) {
  /** ------------------------------------------
   * [API 연결 예정]
   * - 아래 훅/컴포넌트를 주석 해제하여 서버 데이터 사용
   * -------------------------------------------
   */
  // const { data: wishlistFromApi = [], isLoading, error } = useWishlistQuery();
  // const useList = wishlist ?? wishlistFromApi;

  /** ------------------------------------------
   * [현재: 목업 전용]
   * ------------------------------------------- */
  const useList = wishlist ?? MOCK_WISHLIST;

  // 선택이 없으면 false 보장(처음 렌더 시 한 번 내려도 OK)
  useEffect(() => {
    if (!selected) onValidityChange?.(false);
  }, [selected, onValidityChange]);

  const uniquePerformances =
    useList.reduce((acc, item) => {
      const exists = acc.find((p) => p.performanceId === item.performanceId);
      if (!exists) acc.push(item);
      return acc;
    }, [] as typeof useList) ?? [];

  const performances = uniquePerformances.map((item) => ({
    id: item.performanceId,
    title: item.performanceName,
    date: new Date(item.createTime)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .replace(/\s/g, ""),
    location: getSidoLabel(item.sido as Sido),
    description: `${item.performanceName} - ${getSidoLabel(
      item.sido as Sido
    )}에서 진행되는 공연입니다.`,
    posterUrl: item.posterUrl || "/assets/images/playroom/backgroundImg.png",
  }));

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPerformance, setSelectedPerformance] =
    useState<PerformanceSummary | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(performances.length / itemsPerPage);

  const handlePick = (p: PerformanceSummary) => {
    setSelectedId(p.id);
    setSelectedPerformance(p);
    onChange?.({ performance: p });
    onValidityChange?.(true); // ✅ 다음 가능
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;
    if (isLeftSwipe && currentPage < totalPages - 1)
      setCurrentPage((p) => p + 1);
    if (isRightSwipe && currentPage > 0) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-4 mb-8">
      {/* 선택된 공연 안내 */}
      <div>
        {selectedPerformance ? (
          <div className="bg-green-200/20 rounded-[20px] p-4 mb-8 mt-4">
            <h2 className="flex items-center mb-2 text-green-100 body-hak-b">
              후기 작성할 공연
            </h2>
            <div className="flex">
              <div className="text-white">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      selectedPerformance.posterUrl ||
                      "/assets/images/playroom/backgroundImg.png"
                    }
                    alt={selectedPerformance.title}
                    className="object-cover w-16 h-20 rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/assets/images/playroom/backgroundImg.png";
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold text-gray-800">
                      {selectedPerformance.title}
                    </h4>
                    <p className="subtitle text-secondary-100">
                      {selectedPerformance.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100/80 rounded-[20px] p-4 mb-8 mt-8">
            <h2 className="flex items-center mb-4 text-secondary-100 body-hak-b">
              아직 선택된 공연이 없어요
            </h2>
            <div className="text-gray-900 subtitle">
              이야기마을에 기록할 공연을 선택해주세요.
              <br />
              공연을 직접 검색하거나
              <br />
              '봤어요','보고싶어요' 누른 공연에서 선택할 수 있어요.
            </div>
          </div>
        )}
      </div>

      <hr className="my-4 border-secondary-100/30" />

      {/* 검색 섹션 */}
      <h2 className="flex items-center mb-4 body-hak-b">공연검색</h2>
      <div className="mb-8 w-full">
        <div className="w-full rounded-2xl">
          {/* [API 연결 예정] 검색 컴포넌트 – 나중에 주석 해제 */}
          {/*
          <SearchPerformanceForSelection
            placeholder="공연 이름을 검색하세요..."
            onResultClick={(p) => handlePick(p)}
          />
          */}
          {/* 현재는 로컬 검색으로 대체 */}
          <LocalSearch
            list={performances}
            onResultClick={(p) =>
              handlePick({
                id: p.id,
                title: p.title,
                posterUrl: p.posterUrl,
                location: p.location,
              })
            }
          />
        </div>
      </div>

      {/* 위시리스트/관심 공연 */}
      <div className="mb-8">
        <h2 className="flex items-center mb-4 body-hak-b">
          '봤어요', '보고싶어요' 누른 공연
        </h2>

        {performances.length === 0 ? (
          <div className="py-12 text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full">
              <span className="text-2xl">🎭</span>
            </div>
            <p className="mb-2 text-gray-500">아직 관심있는 공연이 없어요</p>
            <p className="text-sm text-gray-400">
              공연을 검색해서 관심있는 공연을 추가해보세요!
            </p>
          </div>
        ) : (
          <div
            className="overflow-hidden relative px-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 89}%)` }}
            >
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <div key={pageIndex} className="flex-shrink-0 w-[85%] mr-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {performances
                      .slice(
                        pageIndex * itemsPerPage,
                        (pageIndex + 1) * itemsPerPage
                      )
                      .map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          className={`p-2 rounded-xl transition-all duration-200 cursor-pointer backdrop-blur-sm text-left ${
                            selectedId === p.id
                              ? "bg-secondary-100/10"
                              : "hover:border-pink-200 hover:bg-pink-50/80"
                          }`}
                          onClick={() =>
                            handlePick({
                              id: p.id,
                              title: p.title,
                              posterUrl: p.posterUrl,
                              location: p.location,
                            })
                          }
                        >
                          <div className="flex gap-4 items-center bg-gradient-to-r rounded-2xl from-white/80 to-gray-50/80">
                            <img
                              src={
                                p.posterUrl ||
                                "/assets/images/playroom/backgroundImg.png"
                              }
                              alt={p.title}
                              className="object-cover w-16 h-24 rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/assets/images/playroom/backgroundImg.png";
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="mb-1 font-semibold text-gray-800">
                                {p.title}
                              </h4>
                              <p className="text-secondary-100 w-fit subtitle rounded-[8px]">
                                {p.location}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {performances.length > 3 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-pink-500"
                  }`}
                >
                  <Back className="w-3 h-3" />
                </button>

                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-600">
                    {currentPage + 1} / {totalPages}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Arrow className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between mt-6">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl"
          >
            이전
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => selectedPerformance && onNext()}
          disabled={!selectedPerformance}
          className={`px-5 py-2 rounded-xl font-semibold ${
            selectedPerformance
              ? "text-white bg-green-400"
              : "text-gray-400 bg-gray-200 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

/** ---------------------------------------------
 * LocalSearch: 임시 로컬 검색(목업 전용)
 * - API 연결 후에는 SearchPerformanceForSelection로 교체
 * --------------------------------------------- */
function LocalSearch({
  list,
  onResultClick,
}: {
  list: { id: number; title: string; posterUrl: string; location: string }[];
  onResultClick: (p: PerformanceSummary) => void;
}) {
  const [q, setQ] = useState("");
  const results = list.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <input
        className="p-3 mb-3 w-full bg-gray-100 rounded-xl"
        placeholder="공연 이름을 검색하세요... (로컬)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onResultClick(p)}
            className="p-3 text-left bg-white rounded-xl hover:bg-gray-50"
          >
            <div className="flex gap-3 items-center">
              <img
                className="object-cover w-12 h-16 rounded"
                src={p.posterUrl}
                alt={p.title}
              />
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">{p.location}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
