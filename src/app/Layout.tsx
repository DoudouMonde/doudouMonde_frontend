import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

function Layout() {
  return (
    <div className="relative px-6 h-full min-h-full bg-red-500">
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default Layout;
