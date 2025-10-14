import BackIcon from "@/assets/icons/Back";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();
  // 내비게이션
  const handleBackClick = () => navigate(-1);
  return (
    <div
      className="fixed top-0 right-0 left-0 z-20 px-6 pb-2 h-[60px] bg-gray-200/70 shadow-sm"
      style={{ paddingTop: `max(1rem, env(safe-area-inset-top))` }}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={handleBackClick}
          className="flex items-center w-10 h-10"
          aria-label="이전으로 이동"
        >
          <BackIcon className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex flex-1 justify-center">
          <div className="text-black title-hak">아이 등록</div>
        </div>
        <div className="w-10" />
      </div>
    </div>
  );
};
