import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";
import BackIcon from "@/assets/icons/Back";

export function PlayroomLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  // PlayroomPage (LandingPage)인지 확인
  const isPlayroomMainPage = location.pathname === "/playroom";

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/assets/images/playroom/backgroundImg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gray-200/40"></div>

      {/* 상단 바 */}
      <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1"></div>
        </div>
      </div>

      <main
        className={`px-6 pb-[72px] w-full relative z-10 ${
          isPlayroomMainPage ? "" : "overflow-y-auto min-h-screen"
        }`}
      >
        <Outlet />
      </main>

      <div className="relative z-10">
        <BottomNavigation />
      </div>
    </div>
  );
}
