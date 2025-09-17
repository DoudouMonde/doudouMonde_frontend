import { ButtonChip, ConfirmModal } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PATH } from "@/shared/constants/paths";

interface PerformanceDetailBottomBarProps {
  performanceId: number;
}

export function PerformanceDetailBottomBar({ performanceId }: PerformanceDetailBottomBarProps) {
  const navigate = useNavigate();
  
  // 팝업 상태 관리
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showWatchedModal, setShowWatchedModal] = useState(false);

  // 보고싶어요 버튼 핸들러
  const handleWishlistClick = () => {
    setShowWishlistModal(true);
  };

  // 봤어요 버튼 핸들러
  const handleWatchedClick = () => {
    setShowWatchedModal(true);
  };

  // 보고싶어요 확인 핸들러
  const handleWishlistConfirm = () => {
    // TODO: 실제 찜하기 API 호출
    console.log("보고싶어요 리스트에 추가:", performanceId);
  };

  // 봤어요 확인 핸들러 - 이야기마을로 이동
  const handleWatchedConfirm = () => {
    navigate(PATH.PLAYROOM);
  };

  // 봤어요 취소 핸들러
  const handleWatchedCancel = () => {
    // 취소 시 아무것도 하지 않음
  };

  return (
    <>
      <nav className="fixed flex-row bottom-0 px-5 left-0 gap-3 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
        <ButtonChip onClick={handleWishlistClick} isActive={true}>
          보고싶어요
        </ButtonChip>
        <ButtonChip onClick={handleWatchedClick} isActive={true}>
          봤어요
        </ButtonChip>
      </nav>

      {/* 보고싶어요 팝업 */}
      <ConfirmModal
        isOpen={showWishlistModal}
        onClose={() => setShowWishlistModal(false)}
        title="보고싶어요"
        message="보고싶어요 리스트에 등록되었습니다"
        confirmText="확인"
        onConfirm={handleWishlistConfirm}
      />

      {/* 봤어요 팝업 */}
      <ConfirmModal
        isOpen={showWatchedModal}
        onClose={() => setShowWatchedModal(false)}
        title="봤어요"
        message="감상한 공연의 후기를 쓰러 가볼까요?"
        confirmText="이야기마을로 이동"
        cancelText="취소"
        onConfirm={handleWatchedConfirm}
        onCancel={handleWatchedCancel}
      />
    </>
  );
}
