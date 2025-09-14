import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons, SearchInput } from "@/shared/components";
import { PATH } from "@/shared/constants";
import { useWishlistQuery } from "@/domains/favorites/queries/useWishlistQuery";
import { getSidoLabel } from "@/shared/services";
import { Sido } from "@/shared/types";

import { SingleSelectGroup } from "@/shared/components/SingleSelect";
import { SingleRadio } from "@/shared/components/Radio";

export const SelectPerformancePage = () => {
  const navigate = useNavigate();

  console.log("🚀 SelectPerformancePage 컴포넌트가 렌더링되었습니다!");

  // 백엔드에서 위시리스트 가져오기
  const { data: wishlist = [], isLoading, error } = useWishlistQuery();

  const [selectedPerformance, setSelectedPerformance] = useState<number | null>(
    null
  );

  // 백엔드에서 가져온 원본 데이터 콘솔 출력
  console.log("🔍 백엔드에서 가져온 위시리스트 원본 데이터:", wishlist);
  console.log("📊 위시리스트 개수:", wishlist.length);
  console.log("🔄 로딩 상태:", isLoading);
  console.log("❌ 에러 상태:", error);

  // 위시리스트 데이터를 PerformanceItem 형태로 변환
  const performances = wishlist.map((item) => {
    console.log("🎭 개별 위시리스트 아이템:", {
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
      posterUrl: item.posterUrl,
    };
  });

  // 변환된 공연 데이터 콘솔 출력
  console.log("🎪 변환된 공연 데이터:", performances);

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
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
        console.log("선택된 공연:", selectedPerformanceData);
      }

      // ChildAndDateSelection 페이지로 이동
      navigate(PATH.CHILD_DATE_SELECTION);
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

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        <div className="flex flex-col gap-4">
          <h2 className="title-inter">공연 선택</h2>
          <p className="mb-4 subtitle text-secondary-100">
            이야기마을에 기록할 공연을 선택해주세요.
            <br />
            공연을 직접 검색하거나
            <br />
            '봤어요','보고싶어요' 누른 공연에서 선택할 수 있어요.
          </p>
          <SearchInput
            placeholder="공연 이름을 검색하세요..."
            onSearch={() => {}}
            value={""}
          />
        </div>

        {/* 관람날짜 선택 섹션 */}
        <div className="">
          <h2 className="mt-8 mb-3 body-hak">
            '봤어요', '보고싶어요' 누른 공연
          </h2>
          <div className="space-y-3">
            {performances.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-8">
                <p className="mb-4 text-center text-gray-500">
                  아직 '봤어요' 또는 '보고싶어요'를 누른 공연이 없습니다.
                </p>
                <p className="text-sm text-center text-gray-400">
                  공연을 검색해서 관심 있는 공연을 추가해보세요!
                </p>
              </div>
            ) : (
              <SingleSelectGroup
                className="flex flex-col gap-4"
                selectedValue={selectedPerformance || ""}
                onChange={(value) => setSelectedPerformance(value as number)}
              >
                {performances.map((performance) => (
                  <SingleRadio
                    key={performance.id}
                    label={performance.title}
                    value={performance.id}
                  />
                ))}
              </SingleSelectGroup>
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
