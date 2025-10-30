import { useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";
import { ChildProfileItem } from "./ChildProfileItem";

const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
      {children}
    </div>
  </div>
);

type Props = {
  child: ChildItemResponse;
  onClose: () => void;
  // onSave: (updatedChild: ChildItemResponse) => void; // 아이 정보를 저장할 함수
};

export const ChildEditModal = ({ child, onClose /*, onSave*/ }: Props) => {
  const [name, setName] = useState(child.name);
  const { control } = useChildRegistrationContext();

  const handleSave = () => {
    // onSave({ ...child, name: name });
    alert(`[저장됨] ${child.name} -> ${name}`);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const onClickProfile = () => {
    console.log("프로필 사진 클릭");
  };

  return (
    <ModalWrapper onClose={onClose}>
      {/* 프로필 사진 */}
      <ChildProfileItem
        showName={false}
        key={child.id}
        child={child}
        onClickProfile={onClickProfile}
      />

      {/* 🌟 이름 수정 필드 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이름
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
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
        onPrevious={handleCancel}
        onNext={handleSave}
      />
    </ModalWrapper>
  );
};
