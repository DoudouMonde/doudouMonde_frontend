import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ChildListProvider } from "@/domains/child/contexts/ChildListProvider";
import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
import { useState } from "react";
import { useFunnel } from "@/shared/hooks/useFunnel";
import { PerformanceSelect } from "@/domains/review/components/PerformanceSelect";

const STEPS = [
  "performanceSelect",
  "childDateSelect",
  "photoTextReview",
  "typeSelect",
  "emotionSelect",
  "accSelect",
  "charName",
] as const;

type Step = (typeof STEPS)[number];

export const ReviewFunnelPage = () => {
  //여기서 handleStart를 하는 것이 아니라 이 페이지에서 Funnel 구조로 관리해야겠다.
  const [newReviewData, setNewReviewData] = useState();

  const [Funnel, setStep, { next, prev, step }] = useFunnel<Step>(
    "performanceSelect",
    STEPS
  );

  return (
    <>
      <ChildListProvider>
        <ReviewListProvider>
          <ReviewActionProvider>
            <PlayroomLayout>
              <PerformanceSelect />
              {/* <Funnel>
                <Funnel.Step name="performanceSelect">
                  <PerformanceSelect
                    data={newReviewData}
                    onNext={() => setStep("childDateSelect")}
                  />
                </Funnel.Step>
                <Funnel.Step name="childDateSelect">
                  <ChildDateSelect
                    data={newReviewData}
                    onNext={() => setStep("photoTextReview")}
                  />
                </Funnel.Step>
                <Funnel.Step name="photoTextReview">
                  <PhotoTextReview
                    data={newReviewData}
                    onNext={() => setStep("typeSelect")}
                  />
                </Funnel.Step>
                <Funnel.Step name="typeSelect">
                  <TypeSelect
                    data={newReviewData}
                    onNext={() => setStep("emotionSelect")}
                  />
                </Funnel.Step>
                <Funnel.Step name="emotionSelect">
                  <EmotionSelect
                    data={newReviewData}
                    onNext={() => setStep("accSelect")}
                  />
                </Funnel.Step>
                <Funnel.Step name="accSelect">
                  <AccSelect
                    data={newReviewData}
                    onNext={() => setStep("charName")}
                  />
                </Funnel.Step>
                <Funnel.Step name="charName">
                  <CharName data={newReviewData} />
                </Funnel.Step>
              </Funnel> */}
            </PlayroomLayout>
          </ReviewActionProvider>
        </ReviewListProvider>
      </ChildListProvider>
    </>
  );
};
