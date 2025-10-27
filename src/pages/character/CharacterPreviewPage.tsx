import React, { useEffect } from "react";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";
import { accessories } from "@/domains/playroom/constants/animals";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { REVIEW_FLOW } from "@/shared/routes/flow";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
};

const WEIGHT_LIMIT = 20;

const HANGUL_RE = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;

function charWeight(ch: string) {
  return HANGUL_RE.test(ch) ? 2 : 1;
}

// 가중치 한도 안에서 자르기 (서로게이트 안전: for..of)
function clampByWeight(s: string, limit = WEIGHT_LIMIT) {
  let w = 0;
  let out = "";
  for (const ch of s) {
    const c = charWeight(ch);
    if (w + c > limit) break;
    w += c;
    out += ch;
  }
  return out;
}

export const CharacterPreviewPage: React.FC = () => {
  const { selectedAnimal, selectedEmotion, selectedAcc } = useCharaterFlowState(
    {
      stepName: "accessory",
      storageKey: "selectedAcc",
      initialValue: accessories[0].id,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setFocus,
    watch,
    setValue,
  } = useForm<FormValues>({
    //FormValue는 반환되는 타입인가...?
    mode: "onChange",
    defaultValues: { name: "" }, //초기값
  });

  //이 줄은 무슨 의미인가 -> 첫 렌더에 이름으로 포커스
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  //공백만 입력되는 경우 방지
  const onSubmit = (data: FormValues) => {
    const trimmed = data.name.trim();
    if (!trimmed) {
      //공백만 입력된 경우 초기화
      setValue("name", ""); //공백 제거
      return;
    }

    //스토어/서버에 저장, 백엔드 api 요청 보내기
    console.log(trimmed);
  };

  //다음 버튼 비활성화 조건 : 공백 제외하고 비어 있으면 비활성화
  const nameValue = watch("name");
  const isNextDisabled = nameValue.trim().length === 0;

  //초과 입력 강제 차단 유틸
  const clampAndSet = (raw: string) => {
    const clamped = clampByWeight(raw);
    setValue("name", clamped, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <ReviewContainer
      title="상상친구 완성!"
      flow={REVIEW_FLOW}
      onNext={handleSubmit(onSubmit)}
      isNextDisabled={isNextDisabled || !isValid}
    >
      {/* Header */}
      <Desc
        content={
          <>
            멋진 상상친구가 완성되었어요! <br />
            함께 공연을 즐겨보세요.
          </>
        }
      />

      <AnimalPreview
        step="accessory"
        isAnimating={false}
        selectedAnimal={selectedAnimal}
        selectedEmotion={selectedEmotion}
        selectedAcc={selectedAcc}
      />

      <hr className="my-4 mb-6 border-secondary-100/30" />
      <section aria-labelledby="friend-name-heading">
        <p id="friend-name-heading" className="mb-4 Inter">
          상상친구 이름 지어주기
        </p>
        <p className="subtitle text-secondary-100">
          축하해요 😍 <br />
          공연 경험을 함께 추억해줄 상상친구가 완성되었어요! <br />
          이제 이 상상친구의 이름을 지어주세요.
        </p>
        {/* noValidate가 뭐지 */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            id="friend-name"
            placeholder="이름을 입력하세요... (한글 10자 / 영어 20자)"
            className="p-4 mt-5 w-full h-10 subtitle text-gray-700 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
            onInput={(e) => {
              // 타이핑 중 초과분 자르기
              clampAndSet(e.currentTarget.value);
            }}
            onPaste={(e) => {
              // 붙여넣기 초과분 자르기
              e.preventDefault();
              const text = e.clipboardData?.getData("text") ?? "";
              clampAndSet((nameValue ?? "") + text);
            }}
            onCompositionEnd={(e) => {
              // 한글 조합(IME) 종료 시 최종 문자열을 한 번 더 자르기
              clampAndSet(e.currentTarget.value);
            }}
            {...register("name", {
              required: true, // 필수(에러 메시지는 표시하지 않음)
              validate: (v) => v.trim().length > 0, // 공백만 금지
            })}
          />
        </form>
      </section>
    </ReviewContainer>
  );
};
