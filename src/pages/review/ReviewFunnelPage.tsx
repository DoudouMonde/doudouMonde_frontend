import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { ChildListProvider } from "@/domains/child/contexts/ChildListProvider";
import { ReviewListProvider } from "@/domains/review/contexts/ReviewListProvider";
import { useState } from "react";
import { useFunnel } from "@/shared/hooks/useFunnel";
import { PerformanceSelect } from "@/domains/review/components/PerformanceSelect";
import { ChildDateSelect } from "@/domains/review/components/ChildDateSelect";
import { PhototextReview } from "@/domains/review/components/PhototextReview";
import { TypeSelect } from "@/domains/review/components/TypeSelect";
import { EmotionSelect } from "@/domains/review/components/EmotionSelect";
import { AccSelect } from "@/domains/review/components/AccSelect";
import { CharName } from "@/domains/review/components/CharName";
import { NavigationButtons } from "@/shared/components";

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

  // ✅ 현재 스텝의 "다음 가능 여부" 상태 (각 스텝에서 올려줌)
  const [canProceed, setCanProceed] = useState<boolean>(false);

  // 마지막 스텝 문구 바꾸기(선택)
  const nextText = step === "charName" ? "완료" : "다음";

  return (
    <>
      <ChildListProvider>
        <ReviewListProvider>
          <ReviewActionProvider>
            <PlayroomLayout>
              <Funnel>
                <Funnel.Step name="performanceSelect">
                  <PerformanceSelect
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="childDateSelect">
                  <ChildDateSelect
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="photoTextReview">
                  <PhototextReview
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="typeSelect">
                  <TypeSelect
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="emotionSelect">
                  <EmotionSelect
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="accSelect">
                  <AccSelect
                    data={newReviewData}
                    onChange={(patch) =>
                      setNewReviewData((prev: any) => ({ ...prev, ...patch }))
                    }
                    onValidityChange={(ok) => setCanProceed(ok)}
                  />
                </Funnel.Step>
                <Funnel.Step name="charName">
                  <CharName data={newReviewData} />
                </Funnel.Step>
              </Funnel>
              <NavigationButtons
                onPrevious={prev}
                onNext={() => {
                  if (step === "charName") {
                    // 마지막 스텝 처리(예: 제출)
                    // submitReview(newReviewData)
                    return;
                  }
                  next();
                }}
                nextText={nextText}
                isNextDisabled={!canProceed}
                className="mt-4"
              />
            </PlayroomLayout>
          </ReviewActionProvider>
        </ReviewListProvider>
      </ChildListProvider>
    </>
  );
};
