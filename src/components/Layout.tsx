import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

function Layout() {
  return (
    <div className="relative">
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default Layout;
