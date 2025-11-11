import { LandingHero } from "@/domains/playroom/features/landing/LandingHero";
import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ChildListProvider } from "@/domains/child/contexts/ChildListProvider";
import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
export const ReviewStartPage = () => {
  return (
    <>
      <ChildListProvider>
        <ReviewListProvider>
          <ReviewActionProvider>
            <PlayroomLayout>
              <LandingHero />
            </PlayroomLayout>
          </ReviewActionProvider>
        </ReviewListProvider>
      </ChildListProvider>
    </>
  );
};
