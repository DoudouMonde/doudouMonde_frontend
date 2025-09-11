import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function BottomNavigationLayout() {
  return (
    <div
      className="flex relative flex-col items-center px-6 w-full min-h-screen"
      style={{
        backgroundImage:
          "url('/assets/images/background/background_afternoon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="pb-[92px] max-w-[375px] flex flex-col items-center">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
