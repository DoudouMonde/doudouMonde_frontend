import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function BottomNavigationLayout() {
  return (
    <div className="flex relative flex-col items-center w-full min-h-screen m-0 p-0">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url('/assets/images/background/background_afternoon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.7,
        }}
      />

      {/* 컨텐츠 */}
      <main className="flex relative z-10 flex-col items-center w-full min-h-full pb-[96px] pt-0">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
