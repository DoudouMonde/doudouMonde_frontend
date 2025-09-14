import { NavigationButtons } from "@/shared/components";
import { Link, useLocation } from "react-router-dom";

export function PerformanceDetailBottomBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex flex-col items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
      <div className="flex h-full">
        <NavigationButtons />
      </div>
    </nav>
  );
}
