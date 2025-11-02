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

export const ChildEditModal: React.FC<Props> = ({ selectedChild }) => {
  const { data: child, isError } = useChildDetailQuery(selectedChild.id);
  const { control, reset } = useChildRegistrationContext();
  const {
    isAvatarPickerOpen,
    cancelAvatarPicker, // ⬅️ 내부에서 confirm 처리
    handleAvaterEditSave,
    handleEditSave, // ⬅️ 내부에서 alert 처리
    handleEditCancel, // ⬅️ 내부에서 confirm 처리
    closeEditModal,
  } = useChildListContext();

  useEffect(() => {
    if (!child) return;
    // 사용자가 이미 수정 중일 때 덮어쓰기 방지하고 싶으면 keep 옵션을 조절
    reset(toFormValues(child), {
      keepDirty: false, // true면 사용자가 수정한 값은 유지
      keepTouched: false,
      keepErrors: false,
    });
  }, [child?.id]); // ✅ child 전체가 아니라 id만 의존(불필요한 reset 방지)

  if (isError || !child) {
    return (
      <ModalWrapper onClose={closeEditModal}>
        <div className="p-6 text-red-500">아이 정보를 불러오지 못했습니다.</div>
      </ModalWrapper>
    );
  }

  return (
    <>
      <ModalWrapper onClose={closeEditModal}>
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
              onNext={handleAvaterEditSave}
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
              previousText="취소"
              nextText="저장"
              onPrevious={handleEditCancel}
              onNext={handleEditSave}
            />
          </>
        )}
      </ModalWrapper>
    </>
  );
};
