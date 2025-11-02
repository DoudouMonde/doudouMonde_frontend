import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { ConfirmModal } from "@/shared/components";
import { ProfileSelectorSection } from "@/domains/child/components/ProfileSelectorSection";
import { useChildDetailQuery } from "@/domains/child/queries/useChildDetailQuery";
import { useEffect } from "react";

type Props = {
  selectedChild: ChildItemResponse;
};

export const ChildEditModal: React.FC<Props> = ({ selectedChild }) => {
  const { data: child, isError } = useChildDetailQuery(selectedChild.id);
  const { control, reset } = useChildRegistrationContext();
  const {
    handleEditSave,
    isAvatarPickerOpen,
    handleAvaterEditSave,
    cancelAvatarPicker,
    closeEditModal,
    isConfirmOpen,
    setConfirmOpen,
    confirmCloseAvatarPicker,
  } = useChildListContext();

  // 데이터 도착 시 폼 초기화 (선택)
  useEffect(() => {
    if (child) {
      console.log(child);
      // reset(toFormValues(child)); // 필요하면 초기값 주입
    }
  }, [child, reset]);

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
