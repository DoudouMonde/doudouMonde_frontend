import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";
// ❌ 네트워크 호출 훅 : 오프라인 작업을 위해 주석 처리
// import { useWishlistQuery } from "@/domains/favorites/queries/useWishlistQuery";
import { getSidoLabel } from "@/shared/services";
import { Sido } from "@/shared/types";
import { Back, Arrow } from "@/assets/icons";
import { SearchPerformanceForSelection } from "../SelectPerformancePage/SearchPerformanceForSelection";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { REVIEW_FLOW } from "@/shared/routes/flow";

/** ----------------------------
 * 🧪 오프라인/로컬 목 데이터
 * - 네트워크 없이 페이지 작업 가능하도록 준비
 * - 서버 스키마에 맞춰 필드 구성
 * -----------------------------*/
type WishlistItem = {
  wishlistId: number;
  performanceId: number;
  performanceName: string;
  createTime: string; // ISO string
  sido: Sido;
  posterUrl?: string | null;
};

// 필요 시 몇 개 더 추가해서 슬라이더 테스트
const MOCK_WISHLIST: WishlistItem[] = [
  {
    wishlistId: 1,
    performanceId: 101,
    performanceName: "어린이 뮤지컬: 숲속친구들",
    createTime: new Date().toISOString(),
    sido: "SEOUL" as Sido,
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  {
    wishlistId: 2,
    performanceId: 102,
    performanceName: "마술쇼: 매직타임",
    createTime: new Date(Date.now() - 86400000).toISOString(),
    sido: "SEOUL" as Sido,
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  {
    wishlistId: 3,
    performanceId: 103,
    performanceName: "인형극: 별빛여행",
    createTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    sido: "SEOUL" as Sido,
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
  // 중복 테스트용 (performanceId 중복 시 하나만 남도록 로직 작동 확인)
  {
    wishlistId: 4,
    performanceId: 103,
    performanceName: "인형극: 별빛여행(중복)",
    createTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    sido: "SEOUL" as Sido,
    posterUrl: "/assets/images/playroom/backgroundImg.png",
  },
];

export const SelectPerformancePage = () => {
  const navigate = useNavigate();

  // ✅ 백엔드/네트워크 차단:
  // const { data: wishlist = [], isLoading, error } = useWishlistQuery();
  // ⬇️ 로컬 목 데이터로 대체
  const wishlist: WishlistItem[] = MOCK_WISHLIST;
  const isLoading = false;
  const error = null as unknown as Error | null;

  const [selectedPerformance, setSelectedPerformance] = useState<number | null>(
    null
  );
  const [selectedPerformanceData, setSelectedPerformanceData] = useState<{
    id: number;
    title: string;
    posterUrl: string;
    location: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // ❗️네트워크 로그 디버깅은 잠시 비활성화
  // console.log("📊 위시리스트 상태:", { wishlist, isLoading, error });

  // ✅ 위시리스트에서 중복된 공연 제거 (performanceId 기준)
  const uniquePerformances =
    wishlist?.reduce((acc, item) => {
      const exists = acc.find((p) => p.performanceId === item.performanceId);
      if (!exists) acc.push(item);
      return acc;
    }, [] as typeof wishlist) || [];

  // 변환: 페이지에서 쓰는 형태로 매핑
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

  const handleSearchResultClick = (performance: {
    id: number;
    title: string;
    posterUrl: string;
    location: string;
  }) => {
    setSelectedPerformance(performance.id);
    setSelectedPerformanceData(performance);
  };

  const handlePrevious = () => navigate(-1);

  const handleNext = () => {
    if (selectedPerformance) {
      const selected = performances.find((p) => p.id === selectedPerformance);
      if (selected) {
        localStorage.setItem("selectedPerformance", JSON.stringify(selected));
      }
      navigate(PATH.CHILD_DATE_SELECTION);
    } else {
      console.warn("⚠️ 공연이 선택되지 않았습니다.");
    }
  };

  // ✅ 로딩/에러 화면도 오프라인 환경에서 불필요하므로 그대로 두되, 현재는 항상 정상 경로로 진행됨
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">오류가 발생했습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  // 슬라이더 로직(동일)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(performances.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };

  // 터치 스와이프
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
    if (isLeftSwipe && currentPage < totalPages - 1) handleNextPage();
    if (isRightSwipe && currentPage > 0) handlePrevPage();
  };

  return (
    <ReviewContainer title="공연 선택" flow={REVIEW_FLOW}>
      {/* 선택된 공연 표시 */}
      <div>
        {selectedPerformanceData ? (
          <div className="bg-green-200/20 rounded-[20px] p-4 mb-8 mt-4">
            <h2 className="flex items-center mb-2 text-green-100 body-hak-b">
              후기 작성할 공연
            </h2>
            <div className="flex">
              <div className="text-white">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      selectedPerformanceData.posterUrl ||
                      "/assets/images/playroom/backgroundImg.png"
                    }
                    alt={selectedPerformanceData.title}
                    className="object-cover w-16 h-20 rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/assets/images/playroom/backgroundImg.png";
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold text-gray-800">
                      {selectedPerformanceData.title}
                    </h4>
                    <p className="subtitle text-secondary-100">
                      {selectedPerformanceData.location}
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
            <div className="flex">
              <div className="text-black subtitle">
                이야기마을에 기록할 공연을 선택해주세요.
                <br />
                공연을 직접 검색하거나
                <br />
                '봤어요','보고싶어요' 누른 공연에서 선택할 수 있어요.
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="my-4 border-secondary-100/30" />

      {/* 검색 섹션 */}
      <h2 className="flex items-center mb-4 body-hak-b">공연검색</h2>
      <div className="mb-8 w-full">
        <div className="w-full rounded-2xl">
          {/* ✅ 이 컴포넌트가 내부에서 API를 호출한다면, 오프라인에선 잠시 주석 처리하세요.
                또는 아래 주석의 '간이 검색 UI'로 교체할 수 있어요. */}
          <SearchPerformanceForSelection
            placeholder="공연 이름을 검색하세요..."
            onResultClick={handleSearchResultClick}
          />

          {/*
            // 🔁 간이 검색 UI (로컬 performances에서 필터)
            <LocalSearch
              list={performances}
              onResultClick={handleSearchResultClick}
            />
            */}
        </div>
      </div>

      {/* 위시리스트 공연 섹션 */}
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
                      .map((performance) => (
                        <div
                          key={performance.id}
                          className={`p-2 rounded-xl transition-all duration-200 cursor-pointer backdrop-blur-sm ${
                            selectedPerformance === performance.id
                              ? "bg-secondary-100/10"
                              : " hover:border-pink-200 hover:bg-pink-50/80"
                          }`}
                          onClick={() => {
                            setSelectedPerformance(performance.id);
                            setSelectedPerformanceData({
                              id: performance.id,
                              title: performance.title,
                              posterUrl: performance.posterUrl,
                              location: performance.location,
                            });
                          }}
                        >
                          <div className="flex gap-4 items-center bg-gradient-to-r rounded-2xl from-white/80 to-gray-50/80">
                            <img
                              src={
                                performance.posterUrl ||
                                "/assets/images/playroom/backgroundImg.png"
                              }
                              alt={performance.title}
                              className="object-cover w-16 h-24 rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/assets/images/playroom/backgroundImg.png";
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="mb-1 font-semibold text-gray-800">
                                {performance.title}
                              </h4>
                              <p className="text-secondary-100 w-fit subtitle rounded-[8px]">
                                {performance.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 슬라이더 네비게이션 */}
            {performances.length > 3 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 0
                      ? "text-gray-400  cursor-not-allowed"
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages - 1
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
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
    </ReviewContainer>
  );
};

/* ---------------------------------------------
🔁 간이 검색 컴포넌트 (네트워크 차단용)
- 위의 SearchPerformanceForSelection 대신 사용할 수 있어요.
- 필요 시 파일 밖으로 분리해 사용하세요.
----------------------------------------------*/
// type LocalSearchProps = {
//   list: { id: number; title: string; posterUrl: string; location: string }[];
//   onResultClick: (p: { id: number; title: string; posterUrl: string; location: string }) => void;
// };
// function LocalSearch({ list, onResultClick }: LocalSearchProps) {
//   const [q, setQ] = useState("");
//   const results = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
//   return (
//     <div>
//       <input
//         className="p-3 mb-3 w-full bg-gray-100 rounded-xl"
//         placeholder="공연 이름을 검색하세요... (로컬)"
//         value={q}
//         onChange={(e) => setQ(e.target.value)}
//       />
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//         {results.map((p) => (
//           <button
//             key={p.id}
//             onClick={() => onResultClick(p)}
//             className="p-3 text-left bg-white rounded-xl hover:bg-gray-50"
//           >
//             <div className="flex gap-3 items-center">
//               <img className="object-cover w-12 h-16 rounded" src={p.posterUrl} alt={p.title} />
//               <div>
//                 <div className="font-medium">{p.title}</div>
//                 <div className="text-sm text-gray-500">{p.location}</div>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
