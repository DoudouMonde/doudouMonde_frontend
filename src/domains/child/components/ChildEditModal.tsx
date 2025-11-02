import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
type Props = {
  child: ChildItemResponse;
  onClose: () => void;
};

export const ChildEditModal: React.FC<Props> = ({ child, onClose }) => {
  const { control } = useChildRegistrationContext();
  const { handleEditSave, isAvatarPickerOpen, closeAvatarPicker } =
    useChildListContext();

  return (
    <ModalWrapper onClose={onClose}>
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
            previousText="이전"
            nextText="저장"
            onPrevious={onClose}
            onNext={closeAvatarPicker}
          />
          {/* handleEditSave가 아니라 다른 함수를 만들어야 함. 지금은 edit 함수 전체가 닫아져버림 */}
        </>
      ) : (
        <>
          {" "}
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
            onPrevious={onClose}
            onNext={handleEditSave}
          />
        </>
      )}
    </ModalWrapper>
  );
};
