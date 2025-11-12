import { LandingHero } from "@/domains/playroom/features/landing/LandingHero";
import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
import { PlayroomLayout } from "@/app/PlayroomLayout";
export const ReviewStartPage = () => {
  return (
    <>
      <ReviewActionProvider>
        <PlayroomLayout>
          <LandingHero />
        </PlayroomLayout>
      </ReviewActionProvider>
    </>
  );
};
