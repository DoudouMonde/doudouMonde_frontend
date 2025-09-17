import { ButtonChip, ConfirmModal } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PATH } from "@/shared/constants/paths";
import { favoritesApi } from "@/domains/favorites/apis/favoritesApi";
import { useWishlistQuery } from "@/domains/favorites/queries";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/apis/queryKeys";

interface PerformanceDetailBottomBarProps {
  performanceId: number;
}

export function PerformanceDetailBottomBar({
  performanceId,
}: PerformanceDetailBottomBarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 찜 목록 조회
  const { data: wishlistData = [] } = useWishlistQuery();

  // 팝업 상태 관리
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showWatchedModal, setShowWatchedModal] = useState(false);
  const [showWishlistDeleteModal, setShowWishlistDeleteModal] = useState(false);
  const [showWatchedDeleteModal, setShowWatchedDeleteModal] = useState(false);

  // 현재 상태
  const [isWatched, setIsWatched] = useState(false);

  // 찜 상태 확인
  const isWishlisted = wishlistData.some(
    (item) => item.performanceId === performanceId
  );

  // 찜 상태 변경 시 로그
  useEffect(() => {
    console.log("🎭 찜 상태 확인:", {
      performanceId,
      isWishlisted,
      wishlistData: wishlistData.map((item) => item.performanceId),
      timestamp: new Date().toISOString(),
    });
  }, [performanceId, isWishlisted, wishlistData]);

  // 보고싶어요 버튼 핸들러
  const handleWishlistClick = () => {
    if (isWishlisted) {
      setShowWishlistDeleteModal(true);
    } else {
      setShowWishlistModal(true);
    }
  };

  // 봤어요 버튼 핸들러
  const handleWatchedClick = () => {
    if (isWatched) {
      setShowWatchedDeleteModal(true);
    } else {
      setShowWatchedModal(true);
    }
  };

  // 보고싶어요 확인 핸들러
  const handleWishlistConfirm = async () => {
    try {
      console.log("보고싶어요 리스트에 추가:", performanceId);
      await favoritesApi.addWishlist({ performanceId });
      console.log("보고싶어요 추가 성공");

      // 찜 목록 캐시 무효화하여 즉시 UI 업데이트
      await queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });

      setShowWishlistModal(false); // 팝업 닫기
    } catch (error) {
      console.error("보고싶어요 추가 실패:", error);
      setShowWishlistModal(false); // 에러 발생 시에도 팝업 닫기
    }
  };

  // 보고싶어요 삭제 확인 핸들러
  const handleWishlistDeleteConfirm = async () => {
    try {
      console.log("보고싶어요 리스트에서 삭제:", performanceId);
      await favoritesApi.removeWishlist(performanceId);
      console.log("보고싶어요 삭제 성공");

      // 찜 목록 캐시 무효화하여 즉시 UI 업데이트
      await queryClient.invalidateQueries({
        queryKey: queryKeys.favorites.wishlist(),
      });

      setShowWishlistDeleteModal(false); // 팝업 닫기
    } catch (error) {
      console.error("보고싶어요 삭제 실패:", error);
      setShowWishlistDeleteModal(false); // 에러 발생 시에도 팝업 닫기
    }
  };

  // 봤어요 확인 핸들러 - 이야기마을로 이동
  const handleWatchedConfirm = () => {
    navigate(PATH.PLAYROOM);
    setIsWatched(true);
    setShowWatchedModal(false); // 팝업 닫기
  };

  // 봤어요 삭제 확인 핸들러
  const handleWatchedDeleteConfirm = () => {
    // TODO: 실제 봤어요 삭제 API 호출
    console.log("봤어요 리스트에서 삭제:", performanceId);
    setIsWatched(false);
    setShowWatchedDeleteModal(false); // 팝업 닫기
  };

  return (
    <>
      <nav className="fixed flex-row bottom-0 px-5 left-0 gap-3 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
        <ButtonChip onClick={handleWishlistClick} isActive={isWishlisted}>
          보고싶어요
        </ButtonChip>
        <ButtonChip onClick={handleWatchedClick} isActive={isWatched}>
          봤어요
        </ButtonChip>
      </nav>

      {/* 보고싶어요 팝업 */}
      <ConfirmModal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
        title=""
        message="찜 리스트에 등록되었습니다"
        confirmText="확인"
        onConfirm={handleWishlistConfirm}
      />

      {/* 봤어요 팝업 */}
      <ConfirmModal
        isOpen={showWatchedModal}
        onClose={() => setShowWatchedModal(false)}
        title=""
        message="감상한 공연의 후기를 쓰러 가볼까요?"
        confirmText="이야기마을로 이동"
        cancelText="취소"
        onConfirm={handleWatchedConfirm}
      />

      {/* 보고싶어요 삭제 팝업 */}
      <ConfirmModal
        isOpen={showWishlistDeleteModal}
        onClose={() => setShowWishlistDeleteModal(false)}
        title=""
        message="보고싶어요 목록에서 삭제할까요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleWishlistDeleteConfirm}
      />

      {/* 봤어요 삭제 팝업 */}
      <ConfirmModal
        isOpen={showWatchedDeleteModal}
        onClose={() => setShowWatchedDeleteModal(false)}
        title=""
        message="봤어요 목록에서 삭제할까요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleWatchedDeleteConfirm}
      />
    </>
  );
}
