import { LandingHero } from "@/domains/playroom/features/landing/LandingHero";
import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
export const ReviewStartPage = () => {
  return (
    <>
      <ReviewListProvider>
        <ReviewActionProvider>
          <PlayroomLayout>
            <LandingHero />
          </PlayroomLayout>
        </ReviewActionProvider>
      </ReviewListProvider>
    </>
  );
};
