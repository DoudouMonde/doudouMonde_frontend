import React, { useEffect } from "react";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";
import { accessories, AccessoryId, AnimalId, animals, EmotionId, emotions } from "@/domains/playroom/constants/animals";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { useForm } from "react-hook-form";
import { clampByWeight } from "@/domains/playroom/utils/textWeight";
import { FriendNameInput } from "@/domains/playroom/components/FriendNameInput";
import { STEP_FIELDS, StepField } from "../utils/stepConfig";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

type FormValues = {
  name: string;
};

type CharNameData = StepField<NewReviewData, typeof STEP_FIELDS.charName >;

type CharNameProps = {
  data: CharNameData;
    onChange: (patch :{ charName : string }) => void;
}

export const CharName = ({data} : CharNameProps) => {

  //이전에 선택했던 캐릭터 불러오기
  const selectedAnimal : AnimalId = (
    data.typeOption ?? animals[0].id
  );
  const selectedEmotion : EmotionId = (
      data.emotionOption ?? emotions[0].id
    );
  const selectedAcc : AccessoryId = (
      data.accOption ?? accessories[0].id
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
    defaultValues: { name: data.charName ?? "" }, //초기값
  });

  //이 줄은 무슨 의미인가 -> 첫 렌더에 이름으로 포커스


  // //공백만 입력되는 경우 방지
  // const onSubmit = (data: FormValues) => {
  //   const trimmed = data.name.trim();
  //   if (!trimmed) {
  //     //공백만 입력된 경우 초기화
  //     setValue("name", ""); //공백 제거
  //     return;
  //   }

  //   //스토어/서버에 저장, 백엔드 api 요청 보내기
  //   console.log(trimmed);
  // };

    const nameValue = watch("name");

      useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  //부모에 저장
  const handleBlur = () => {
    const trimmed = nameValue.trim();
    if (trimmed) {
      onChange({charName: trimmed});
    }
  }

  //다음 버튼 비활성화 조건 : 공백 제외하고 비어 있으면 비활성화

  // const isNextDisabled = nameValue.trim().length === 0;

  //초과 입력 강제 차단 유틸
  const clampAndSet = (raw: string) => {
    const clamped = clampByWeight(raw);
    setValue("name", clamped, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div>
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
        <FriendNameInput
          value={nameValue}
          onChange={(raw) => clampAndSet(raw)}
          onBlur={handleBlur} // 여기서 부모에 저장
         onSubmit={handleSubmit(handleBlur)}
          // onChange={(raw) => clampAndSet(setValue, "name", raw)}
          // onSubmit={handleSubmit(onSubmit)}
        />
 
        {/* RHF register는 접근성 속성/유효성 용도로만 부여 */}
        <input
          type="hidden"
          aria-hidden
          {...register("name", {
            required: true,
            validate: (v) => v.trim().length > 0,
          })}
        />
      </section>
    </div>
  );
};
