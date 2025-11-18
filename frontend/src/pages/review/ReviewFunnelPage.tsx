import { PlayroomLayout } from '@/app/PlayroomLayout';
import { Children, useState } from 'react';
import { useFunnel } from '@/shared/hooks/useFunnel';
import { PerformanceSelect } from '@/domains/review/components/PerformanceSelect';
import { ChildDateSelect } from '@/domains/review/components/ChildDateSelect';
import { PhototextReview } from '@/domains/review/components/PhototextReview';
import { TypeSelect } from '@/domains/review/components/TypeSelect';
import { EmotionSelect } from '@/domains/review/components/EmotionSelect';
import { AccSelect } from '@/domains/review/components/AccSelect';
import { CharName } from '@/domains/review/components/CharName';
import { NavigationButtons } from '@/shared/components';
import { ReviewContainer } from '@/shared/components/Layout/ReviewContainer';
import { STEP_FIELDS } from '@/domains/review/utils/stepConfig';
import { pickStepData } from '@/domains/review/utils/stepConfig';
import { AccessoryId, AnimalId, EmotionId } from '@/domains/playroom/constants/animals';
import { reviewApi } from '@/domains/review/apis/reviewApi';

const STEPS = [
  'performanceSelect',
  'childDateSelect',
  'photoTextReview',
  'typeSelect',
  'emotionSelect',
  'accSelect',
  'charName',
] as const;

const STEP_TITLES: Record<Step, string> = {
  performanceSelect: '공연 선택',
  childDateSelect: '아이 선택',
  photoTextReview: '후기 입력',
  typeSelect: '상상친구 만들기',
  emotionSelect: '상상친구 만들기',
  accSelect: '상상친구 만들기',
  charName: '상상친구 완성!',
};

type Step = (typeof STEPS)[number];

export type NewReviewData = {
  performanceId?: number;
  performanceName?: string; 
  //아마 childrenId 배열도 필요할 듯(api용)
  children?: string[];
  watchDate?: string; 
  reviewText?: string;
  uploadedImages?: (File | null)[];
  typeOption?: AnimalId; //api 보낼 때는 id -> type으로 변환해서
  emotionOption?: EmotionId;
  accOption?: AccessoryId;
  charName?: string;
};


export const ReviewFunnelPage = () => {
  //여기서 handleStart를 하는 것이 아니라 이 페이지에서 Funnel 구조로 관리해야겠다.
  const [newReviewData, setNewReviewData] = useState<NewReviewData>({});

  const [Funnel, setStep, { next, prev, step }] = useFunnel<Step>('performanceSelect', STEPS);

  // ✅ 현재 스텝의 "다음 가능 여부" 상태 (각 스텝에서 올려줌)
  const [canProceed, setCanProceed] = useState<boolean>(false);

  // 마지막 스텝 문구 바꾸기(선택)
  const nextText = step === 'charName' ? '완료' : '다음';

  return (
    <>
      <PlayroomLayout>
        <ReviewContainer title={STEP_TITLES[step]}>
          <Funnel>
            <Funnel.Step name="performanceSelect">
              <PerformanceSelect
              data={{performanceId: newReviewData.performanceId ?? 0, performanceName: newReviewData.performanceName ?? ""}}
                onChange={(patch) =>
                  setNewReviewData((prev) => ({
                    ...prev,
                    ...patch,
                  }))
                }
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="childDateSelect">
              <ChildDateSelect
                data={
                  pickStepData(newReviewData, STEP_FIELDS.childDateSelect)
                }
                onChange={(patch) =>
                  setNewReviewData((prev) => ({
                    ...prev,
                    ...patch,
                  }))
                }
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="photoTextReview">
              <PhototextReview
                data={pickStepData(newReviewData, STEP_FIELDS.photoTextReview)}
                onChange={(patch) => setNewReviewData((prev) => ({ ...prev, ...patch }))}
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="typeSelect">
              <TypeSelect
                data={pickStepData(newReviewData, STEP_FIELDS.typeSelect)}
                onChange={(patch) => setNewReviewData((prev: any) => ({ ...prev, ...patch }))}
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="emotionSelect">
              <EmotionSelect
                data={pickStepData(newReviewData, STEP_FIELDS.emotionSelect)}
                onChange={(patch) => setNewReviewData((prev: any) => ({ ...prev, ...patch }))}
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="accSelect">
              <AccSelect
                data={pickStepData(newReviewData, STEP_FIELDS.accSelect)}
                onChange={(patch) => setNewReviewData((prev: any) => ({ ...prev, ...patch }))}
                onValidityChange={(ok) => setCanProceed(ok)}
              />
            </Funnel.Step>
            <Funnel.Step name="charName">
              <CharName  data={pickStepData(newReviewData, STEP_FIELDS.charName)} 
              onChange={(patch) => setNewReviewData((prev: any) => ({ ...prev, ...patch }))}/>
            </Funnel.Step>
          </Funnel>

          <NavigationButtons
            onPrevious={prev}
            onNext={() => {
            console.log("📌 현재 저장된 newReviewData:", newReviewData);

              if (step === 'charName') {
                reviewApi.addReview(newReviewData)
                return;
              }
              next();
            }}
            nextText={nextText}
            // isNextDisabled={!canProceed}
            className="mt-4"
          />
        </ReviewContainer>
      </PlayroomLayout>
    </>
  );
};
