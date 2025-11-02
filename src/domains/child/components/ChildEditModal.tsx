import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import { ConfirmModal } from "@/shared/components";

type Props = {
  child: ChildItemResponse;
};

export const ChildEditModal: React.FC<Props> = ({ child }) => {
  const { control } = useChildRegistrationContext();
  const {
    handleEditSave,
    isAvatarPickerOpen,
    handleAvaterEditSave,
    closeAvatarPicker,
    closeEditModal,
    isConfirmOpen,
    setConfirmOpen,
    confirmCloseAvatarPicker,
  } = useChildListContext();

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
          <>
            <p>프로필 사진 변경</p>
            <ProfileSelectorSection control={control} />
            <NavigationButtons
              previousText="취소"
              nextText="저장"
              onPrevious={closeAvatarPicker}
              onNext={handleAvaterEditSave}
            />
          </>
        ) : (
          <>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <NameSection field={field} error={error} />
              )}
            />
            <NavigationButtons
              previousText="취소"
              nextText="저장"
              onPrevious={closeEditModal}
              onNext={handleEditSave}
            />
          </>
        )}
        {isConfirmOpen && isAvatarPickerOpen && (
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setConfirmOpen(false)} // 모달 닫기만
            title="변경 취소"
            message="프로필 사진 변경을 취소하시겠습니까?"
            confirmText="취소하기"
            cancelText="계속 편집"
            onConfirm={confirmCloseAvatarPicker} // 확인 시 실제 처리
            onCancel={() => setConfirmOpen(false)}
            showCancel
          />
        )}
      </ModalWrapper>
    </>
  );
};
