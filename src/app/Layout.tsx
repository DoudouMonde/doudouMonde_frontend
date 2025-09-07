import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function Layout() {
  return (
    <div className="relative px-6 h-full min-h-full">
      <main className="pb-[72px] w-full">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
