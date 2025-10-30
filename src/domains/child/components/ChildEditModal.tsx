import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";

type Props = {
  child: ChildItemResponse;
  onClose: () => void;
};

export const ChildEditModal: React.FC<Props> = ({ child, onClose }) => {
  const { control } = useChildRegistrationContext();
  const { handleEditSave, isAvatarPickerOpen } = useChildListContext();

  return (
    <ModalWrapper onClose={onClose}>
      {/* 프로필 사진 */}
      <ChildProfileItem
        showName={false}
        key={child.id}
        child={child}
        clickAction="openAvatarPicker"
      />

      {isAvatarPickerOpen ? (
        <p>안녕</p>
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
