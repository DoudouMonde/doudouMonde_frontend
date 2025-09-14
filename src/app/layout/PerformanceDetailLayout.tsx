import { Outlet } from "react-router-dom";

export function PerformanceDetailLayout() {
  return (
    <div className="flex relative flex-col items-center px-6 pt-0 mt-0 w-full min-h-screen">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 pt-0 mt-0 w-full h-full"
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
      <main className="relative z-10 pb-[92px] max-w-[375px] flex flex-col items-center">
        <Outlet />
      </main>
      <PerformanceDetailBottomBar />
      {/* <BottomNavigation /> */}
    </div>
  );
}
