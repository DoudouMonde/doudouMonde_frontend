import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

function Layout() {
  return (
    <div className="relative px-6 h-full min-h-full">
      <main className="pb-[72px]">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}

export default Layout;
