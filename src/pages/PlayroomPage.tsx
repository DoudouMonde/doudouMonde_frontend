import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
import { ReviewCountRouter } from "@/domains/review/components/ReviewCountRouter";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { Outlet } from "react-router-dom";

export const PlayroomPage = () => {
  return (
    <ReviewListProvider>
      <PlayroomLayout>
        <ReviewCountRouter />
        <Outlet />
      </PlayroomLayout>
    </ReviewListProvider>
  );
};
