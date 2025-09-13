import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import Arrow from "@/assets/icons/Arrow";
import { PATH } from "@/shared/constants/paths";

export const MyPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMemberInfoClick = () => {
    navigate(PATH.MEMBER_INFO);
  };

  return (
    <div className="w-[375px] h-full mx-auto overflow-y-auto">
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
            <div className="text-black title-hak">마이페이지</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="py-4 pt-24">
        <div className="flex flex-col gap-6 justify-center">
          {/* 카카오톡 계정 연동 */}
          <div className="flex flex-col justify-center gap-2 bg-gray-200/70 rounded-[20px] p-7 w-full h-[120px]">
            <p className="title-hak">김출신</p>
            <p className="subtitle">카카오톡 계정 연동 중</p>
          </div>
          {/* 계정정보 */}
          <p className="text-black title-hak">계정</p>
          <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full h-auto">
            <div
              className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60"
              onClick={handleMemberInfoClick}
            >
              <p className="body-inter-r">회원 정보</p>
              <Arrow className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60">
              <p className="body-inter-r">아이 정보</p>
              <Arrow className="w-6 h-6" />
            </div>
          </div>

          {/* 추가 기능 */}
          <p className="text-black title-hak">추가 기능</p>
          <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full">
            <div className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60">
              <p className="body-inter-r">보고 싶어요 누른 작품</p>
              <Arrow className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60">
              <p className="body-inter-r">이야기 마을</p>
              <Arrow className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
