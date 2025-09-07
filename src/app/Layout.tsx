import { Outlet } from "react-router-dom";
// import BottomNavigation from "@/components/BottomNavigation";

function Layout() {
  return (
    <div className="relative h-full min-h-full bg-red-500">
      <Outlet />
      {/* <BottomNavigation /> */}
    </div>
  );
}

export default Layout;
