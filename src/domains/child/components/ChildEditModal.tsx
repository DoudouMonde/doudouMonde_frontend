import { useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";

//아이 정보를 조회하는 api 필요
//아이 정보를 수정하는 api 필요

const MOCK_CHILDREN: ChildItemResponse[] = [
  {
    id: 1,
    name: "도윤",
    profile: "CAT",
    birthday: "2025-10-10",
    gender: "MALE" as const,
  },
  {
    id: 2,
    name: "서아",
    profile: "RABBIT",
    birthday: "2025-10-10",
    gender: "FEMALE" as const,
  },
  {
    id: 3,
    name: "하준",
    profile: "DOG",
    birthday: "2025-10-10",
    gender: "MALE" as const,
  },
];
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

  // 여기서는 이름 수정만 예시로 보여줍니다.
  const handleSave = () => {
    // onSave({ ...child, name: name });
    alert(`[저장됨] ${child.name} -> ${name}`);
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {child.name} 정보 수정
      </h2>

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

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-100 text-white rounded-lg font-semibold"
        >
          저장
        </button>
      </div>
    </ModalWrapper>
  );
};
