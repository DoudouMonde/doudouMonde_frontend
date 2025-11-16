import { useWishlistQuery } from "@/domains/favorites/queries/useWishlistQuery";
import { useRemoveWishlistMutation } from "@/domains/favorites/queries/useRemoveWishlistMutation";
import { HeartIcon } from "@/assets/icons";
import { PATH } from "@/shared/constants/paths";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { ConfirmModal } from "@/shared/components";
import { useState } from "react";

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: rawWishlist = [], isLoading, error } = useWishlistQuery();
  const removeWishlistMutation = useRemoveWishlistMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<number | null>(
    null
  );

  // 중복 제거: performanceId 기준으로 중복 제거 (같은 공연은 하나만 표시)
  // Map을 사용하여 더 효율적으로 중복 제거
  const uniqueWishlistMap = new Map<number, (typeof rawWishlist)[0]>();

  rawWishlist.forEach((item) => {
    if (!uniqueWishlistMap.has(item.performanceId)) {
      uniqueWishlistMap.set(item.performanceId, item);
    }
  });

  const wishlist = Array.from(uniqueWishlistMap.values());

  const handlePerformanceClick = (performanceId: number) => {
    console.log("🎭 Favorites에서 공연 클릭:", {
      performanceId,
      performanceIdType: typeof performanceId,
      targetPath: PATH.PERFORMANCE_DETAIL(performanceId),
      timestamp: new Date().toISOString(),
    });
    navigate(PATH.PERFORMANCE_DETAIL(performanceId));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRemoveWishlist = (e: React.MouseEvent, wishlistId: number) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    setSelectedWishlistId(wishlistId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedWishlistId) {
      removeWishlistMutation.mutate(selectedWishlistId, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedWishlistId(null);
        },
        onError: (error) => {},
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWishlistId(null);
  };

  if (isLoading) {
    return (
      <div className="overflow-y-auto mx-auto w-full max-w-md h-full bg-white">
        {/* 상단 바 */}
        <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackClick}
              className="flex items-center w-10 h-10"
              aria-label="이전으로 이동"
            >
              <BackIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex flex-1 justify-center">
              <div className="text-gray-900 title-hak">찜</div>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64 pt-[76px]">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-y-auto mx-auto w-full max-w-md h-full bg-white">
        {/* 상단 바 */}
        <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackClick}
              className="flex items-center w-10 h-10"
              aria-label="이전으로 이동"
            >
              <BackIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex flex-1 justify-center">
              <div className="text-gray-900 title-hak">찜</div>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64 pt-[76px]">
          <div className="text-red-500">오류가 발생했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto mx-auto w-full max-w-md h-full bg-white">
      {/* 상단 바 */}
      <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-gray-900 title-hak">찜</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 위시리스트 목록 */}
      <div className="px-4 py-4 pt-[76px]">
        {wishlist.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16">
            <HeartIcon className="mb-4 w-16 h-16 text-gray-300" />
            <p className="text-center text-gray-500">
              아직 즐겨찾기한 공연이 없습니다.
              <br />
              마음에 드는 공연을 즐겨찾기에 추가해보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="mt-8 body-hak-b">보고 싶어요 누른 작품</p>
            {wishlist.map((item) => (
              <div
                key={item.wishlistId}
                onClick={() =>
                  handlePerformanceClick(Number(item.performanceId))
                }
                className="flex p-4 rounded-[20px] transition-shadow cursor-pointer bg-gray-200/70 hover:shadow-md items-center"
              >
                {/* 포스터 이미지 */}
                <div className="overflow-hidden flex-shrink-0 w-24 h-32 bg-gray-100 rounded-lg">
                  {item.posterUrl ? (
                    <img
                      src={item.posterUrl}
                      alt={item.performanceName}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-gray-200">
                      <span className="text-xs text-gray-400">이미지 없음</span>
                    </div>
                  )}
                </div>

                {/* 공연 정보 */}
                <div className="flex flex-col flex-1 justify-between ml-4 min-w-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.performanceName}
                    </h3>
                    <p className="mt-1 subtitle text-secondary-100">
                      {item.sido}
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={(e) => handleRemoveWishlist(e, item.wishlistId)}
                      className="mr-2 body-inter-sm text-secondary-100  bg-gray-100  rounded-[16px] p-2  shadow-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="위시리스트 삭제"
        message="해당 공연을 위시리스트에서 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        isLoading={removeWishlistMutation.isPending}
      />
    </div>
  );
};
