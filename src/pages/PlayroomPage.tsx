import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
import { ReviewCountRouter } from "@/domains/review/components/ReviewCountRouter";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ChildListProvider } from "@/domains/child/contexts/ChildListProvider";
import { Outlet } from "react-router-dom";

export const PlayroomPage = () => {
  return (
    <ChildListProvider>
      <ReviewListProvider>
        <PlayroomLayout>
          <ReviewCountRouter />
          <Outlet />
        </PlayroomLayout>
      </ReviewListProvider>
    </ChildListProvider>
  );
};
