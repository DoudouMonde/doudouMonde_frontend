import { LandingHero } from "@/domains/playroom/features/landing/LandingHero";
import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
export const ReviewCreatePage = () => {
  return (
    <>
      <ReviewActionProvider>
        <LandingHero />
      </ReviewActionProvider>
    </>
  );
};
