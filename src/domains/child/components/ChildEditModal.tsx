import { useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { SaveButton } from "@/shared/components/Button/SaveButton";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";
import { NameSection } from "./NameSection";
import { NavigationButtons } from "@/shared/components";
import { Controller } from "react-hook-form";

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

  return (
    <ModalWrapper onClose={onClose}>
      {/* 프로필 수정 필드 */}
      <ProfileSelectorSection control={control} />
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
      {/* 🌟 프로필 아이콘 선택 필드 등이 이곳에 추가됩니다. */}
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          //NameSection에서 필요한 props 외에 넘길 필요가 없다,
          <NameSection field={field} error={error} />
        )}
      />

      {/* 버튼 */}
      {/* <SaveButton text={"등록하기"} /> */}
      {/* 두 개의 버튼이 필요하다면 */}
      <NavigationButtons
        previousText="취소"
        nextText="저장"
        onPrevious={handleCancel}
        onNext={handleSave}
      />
    </ModalWrapper>
  );
};
