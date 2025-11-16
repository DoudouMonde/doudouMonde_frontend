import { ReviewCountRouter } from "@/domains/review/components/ReviewCountRouter";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { Outlet } from "react-router-dom";

export const PlayroomPage = () => {
  return (
    <PlayroomLayout>
      <ReviewCountRouter />
      <Outlet />
    </PlayroomLayout>
  );
};
