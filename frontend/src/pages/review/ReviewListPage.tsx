import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ReviewList } from "@/domains/review/components/ReviewList";
import { TitleWithClount } from "@/domains/review/components/TitleWithCount";

export const ReviewListPage = () => {
  return (
    <>
      <PlayroomLayout>
        <div className="py-3">
          <TitleWithClount />
        </div>
        <div className="bg-white border-t-gray-400 border h-full p-4">
          <ReviewList />
        </div>
      </PlayroomLayout>
    </>
  );
};
