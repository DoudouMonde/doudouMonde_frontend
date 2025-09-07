import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/shared/components";

export function Layout() {
  return (
    <div className="relative px-6 h-full min-h-full">
      <Outlet />
      <BottomNavigation />
    </div>
  );
}
