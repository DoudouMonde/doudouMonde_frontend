import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function PlayroomLayout() {
  return (
    <div
      className="relative px-6 min-h-screen"
      style={{
        backgroundImage: "url('/assets/images/playroom/backgroundImg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gray-200/40"></div>
      <main className="pb-[72px] w-full relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <BottomNavigation />
      </div>
    </div>
  );
}
