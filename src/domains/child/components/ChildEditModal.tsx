import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";
import { useChildList } from "@/domains/child/hooks/useChildList";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";

type Props = {
  child: ChildItemResponse;
  onClose: () => void;
};

export const ChildEditModal: React.FC<Props> = ({ child, onClose }) => {
  const { control } = useChildRegistrationContext();
  const { handleEditSave } = useChildList();

  // const onClickProfile = () => {
  //   console.log("프로필 사진 클릭");
  // };

  return (
    <ModalWrapper onClose={onClose}>
      {/* 프로필 사진 */}
      <ChildProfileItem showName={false} key={child.id} child={child} />

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
    </ModalWrapper>
  );
};
