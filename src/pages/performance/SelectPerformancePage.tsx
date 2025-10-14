import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";
import { useWishlistQuery } from "@/domains/favorites/queries/useWishlistQuery";
import { getSidoLabel } from "@/shared/services";
import { Sido } from "@/shared/types";
import { Back, Arrow } from "@/assets/icons";
import { SearchPerformanceForSelection } from "../SelectPerformancePage/SearchPerformanceForSelection";

export const SelectPerformancePage = () => {
  const navigate = useNavigate();

  // console.log("🚀 SelectPerformancePage 컴포넌트가 렌더링되었습니다!");

  // 백엔드에서 위시리스트 가져오기
  const { data: wishlist = [], isLoading, error } = useWishlistQuery();

  // console.log("📊 위시리스트 상태:", {
  //   wishlist,
  //   isLoading,
  //   error,
  //   wishlistLength: wishlist?.length || 0,
  //   timestamp: new Date().toISOString(),
  // });

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

  // 백엔드에서 가져온 원본 데이터 콘솔 출력

  // 위시리스트 데이터를 PerformanceItem 형태로 변환
  // console.log("🔄 위시리스트 변환 시작:", {
  //   wishlistLength: wishlist?.length || 0,
  //   wishlistType: typeof wishlist,
  //   isArray: Array.isArray(wishlist),
  // });

  // 위시리스트에서 중복된 공연 제거 (performanceId 기준)
  const uniquePerformances =
    wishlist?.reduce((acc, item) => {
      const existingPerformance = acc.find(
        (p) => p.performanceId === item.performanceId
      );
      if (!existingPerformance) {
        acc.push(item);
      }
      return acc;
    }, [] as typeof wishlist) || [];

  console.log("🔄 중복 제거 전후 비교:", {
    originalLength: wishlist?.length || 0,
    uniqueLength: uniquePerformances.length,
    removedDuplicates: (wishlist?.length || 0) - uniquePerformances.length,
  });

  const performances = uniquePerformances.map((item) => {
    console.log("🎭 중복 제거된 위시리스트 아이템:", {
      wishlistId: item.wishlistId,
      performanceId: item.performanceId,
      performanceName: item.performanceName,
      createTime: item.createTime,
      sido: item.sido,
      posterUrl: item.posterUrl,
    });

    return {
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
    };
  });

  const handleSearchResultClick = (performance: {
    id: number;
    title: string;
    posterUrl: string;
    location: string;
  }) => {
    // 검색 결과에서 공연을 선택했을 때
    console.log("🎭 검색 결과에서 공연 선택:", {
      performanceId: performance.id,
      title: performance.title,
      posterUrl: performance.posterUrl,
      location: performance.location,
      timestamp: new Date().toISOString(),
    });
    setSelectedPerformance(performance.id);
    setSelectedPerformanceData(performance);
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("🚀 다음 버튼 클릭:", {
      selectedPerformance,
      selectedPerformanceData,
      timestamp: new Date().toISOString(),
    });

    if (selectedPerformance) {
      // 선택된 공연 정보 찾기
      const selectedPerformanceData = performances.find(
        (p) => p.id === selectedPerformance
      );

      if (selectedPerformanceData) {
        // localStorage에 선택된 공연 정보 저장
        localStorage.setItem(
          "selectedPerformance",
          JSON.stringify(selectedPerformanceData)
        );

        console.log("💾 localStorage에 저장된 공연:", selectedPerformanceData);
        console.log(
          "🔍 localStorage 확인:",
          localStorage.getItem("selectedPerformance")
        );
      } else {
        console.warn(
          "⚠️ 선택된 공연 데이터를 찾을 수 없습니다:",
          selectedPerformance
        );
      }

      // ChildAndDateSelection 페이지로 이동
      navigate(PATH.CHILD_DATE_SELECTION);
    } else {
      console.warn("⚠️ 공연이 선택되지 않았습니다.");
    }
  };

  // 로딩 상태 처리
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

  // 에러 상태 처리
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

  // 슬라이더 로직
  const itemsPerPage = 3;
  const totalPages = Math.ceil(performances.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 터치 스와이프 핸들러
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
    const isLeftSwipe = distance > 30; // 더 민감하게 조정
    const isRightSwipe = distance < -30;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      handleNextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      handlePrevPage();
    }
  };
  console.log("🎭 선택된 공연 데이터:", selectedPerformanceData);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        <div className="flex flex-col gap-4">
          <h2 className="title-inter">공연 선택</h2>
        </div>

        {/* <hr className="my-4 border-secondary-100/30" /> */}
        <div>
          {/* 선택된 공연 표시 */}
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
            <SearchPerformanceForSelection
              placeholder="공연 이름을 검색하세요..."
              onResultClick={handleSearchResultClick}
            />
          </div>
        </div>

        {/* 위시리스트 공연 섹션 */}
        <div className="mb-8">
          <div className="">
            <h2 className="flex items-center mb-4 body-hak-b">
              '봤어요', '보고싶어요' 누른 공연
            </h2>

            {performances.length === 0 ? (
              <div className="py-12 text-center">
                <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full">
                  <span className="text-2xl">🎭</span>
                </div>
                <p className="mb-2 text-gray-500">
                  아직 관심있는 공연이 없어요
                </p>
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
                                console.log("🎭 위시리스트에서 공연 선택:", {
                                  performanceId: performance.id,
                                  title: performance.title,
                                  posterUrl: performance.posterUrl,
                                  location: performance.location,
                                  timestamp: new Date().toISOString(),
                                });
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
                                  <p className="text-secondary-100 w-fit subtitle  rounded-[8px]">
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
                          : "text-pink-500  "
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
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={!selectedPerformance}
          />
        </div>
      </div>
    </div>
  );
};
