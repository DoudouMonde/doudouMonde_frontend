import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { ProfileSelectorSection } from "@/domains/child/components/ProfileSelectorSection";
import { useChildDetailQuery } from "@/domains/child/queries/useChildDetailQuery";
import { useEffect } from "react";
import { toFormValues } from "@/domains/child/utils/toFormValues";
type Props = {
  selectedChild: ChildItemResponse;
};
import { UpdateChildRequest } from "@/domains/child/types/childApiTypes";
import { Gender, Profile } from "@/entities/types";

export const ChildEditModal: React.FC<Props> = ({ selectedChild }) => {
  const { data: child, isError } = useChildDetailQuery(selectedChild.id);
  const { control, reset, formValues } = useChildRegistrationContext();
  const {
    isAvatarPickerOpen,
    cancelAvatarPicker,
    handleAvaterEditSave,
    handleEditSave,
    handleEditCancel,
    closeEditModal,
  } = useChildListContext();

  useEffect(() => {
    if (!child) return;
    reset(toFormValues(child), {
      keepDirty: false,
      keepTouched: false,
      keepErrors: false,
    });
  }, [child?.id]);

  // 공통: 폼값 → UpdateChildRequest 변환
  const buildPayload = (): UpdateChildRequest => {
    const yyyy = formValues.birthYear?.padStart(4, "0");
    const mm = formValues.birthMonth?.padStart(2, "0");
    const dd = formValues.birthDay?.padStart(2, "0");

    return {
      name: formValues.name,
      birthday: yyyy && mm && dd && `${yyyy}-${mm}-${dd}`,
      gender: formValues.gender as Gender,
      profile: formValues.selectedProfile as Profile,
    };
  };

  // 일반 저장 버튼용 (인수 없는 래퍼)
  const onClickSave = () => {
    const payload = buildPayload();
    void handleEditSave(payload);
  };

  // 아바타 저장 버튼용 (인수 없는 래퍼)
  // 프로필 피커가 RHF 값을 바꾸고 있으므로 formValues.selectedProfile이 최신값
  const onClickAvatarSave = () => {
    const payload = buildPayload();
    // 만약 별도 선택값을 강제로 덮어쓰고 싶다면:
    // payload.profile = pickedProfile as Profile;
    void handleAvaterEditSave(payload);
  };

  if (isError || !child) {
    return (
      <ModalWrapper onClose={closeEditModal}>
        <div className="p-6 text-red-500">아이 정보를 불러오지 못했습니다.</div>
      </ModalWrapper>
    );
  }

  return (
    <>
      <ModalWrapper
        onClose={closeEditModal}
        deleteBtn={true}
        selectedChildId={child.id}
      >
        <ChildProfileItem
          showName={false}
          key={child.id}
          child={child}
          clickAction="openAvatarPicker"
        />

        {isAvatarPickerOpen ? (
          <div className="flex flex-col items-center">
            <p className="pt-4 body-hak-b">프로필 사진 변경</p>
            <ProfileSelectorSection control={control} />

            <NavigationButtons
              previousText="취소"
              nextText="저장"
              onPrevious={cancelAvatarPicker}
              onNext={onClickAvatarSave}
            />
          </div>
        ) : (
          <>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                // 여기 디테일 정보
                <NameSection field={field} error={error} />
              )}
            />
            <NavigationButtons
              previousText="이전"
              nextText="저장"
              onPrevious={handleEditCancel}
              onNext={onClickSave}
            />
          </>
        )}
      </ModalWrapper>
    </>
  );
};
