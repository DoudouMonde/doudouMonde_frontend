import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function BottomNavigationLayout() {
  return (
    <div
      className="relative px-6 h-full min-h-full"
      style={{
        backgroundImage:
          "url('/assets/images/background/background_afternoon.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="pb-[72px] w-full">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
