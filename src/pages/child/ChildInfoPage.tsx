import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { useEffect, useState } from "react";
// 🔌 네트워크 코드: 주석처리
// import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
// import { useUpdateChildNameMutation } from "@/domains/child/queries/useUpdateChildNameMutation";
// import { useUpdateChildProfileMutation } from "@/domains/child/queries/useUpdateChildProfileMutation";
// import { useUpdateChildTraitsMutation } from "@/domains/child/queries/useUpdateChildTraitsMutation";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { TRAIT_OPTIONS } from "@/domains/child/components/TraitSelector";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { MultiSelectCard } from "@/shared/components/MultiSelect/MultiSelectCard";
import { ChildTraitOptions } from "@/domains/child/components/TraitSelector";
import { SaveButton } from "@/shared/components/Button/SaveButton";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";

import Pen from "@/assets/icons/Pen";
import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import {
  SwitchCase,
  ProfileSelectModal,
  ConfirmModal,
} from "@/shared/components";

// --- 목 데이터 -------------------------------------------------
const MOCK_CHILDREN: ChildItemResponse[] = [
  { id: 1, name: "도윤", profile: "CAT" as const },
  { id: 2, name: "서아", profile: "RABBIT" as const },
  { id: 3, name: "하준", profile: "DOG" as const },
];
// -------------------------------------------------------------

function TraitSelector() {
  return <ChildTraitOptions />;
}

// 백엔드 enum과 매핑되는 상수 (ChildRegistration과 동일 규칙 사용)
const TRAIT_MAPPING = {
  MUSIC_LOVER: "MUSIC_LOVER",
  DANCE_LOVER: "DANCE_LOVER",
  SHORT_ATTENTION: "SHORT_ATTENTION",
} as const;

// const TraitSelector = ({
//   selectedTraits,
//   onTraitToggle,
// }: {
//   selectedTraits: string[];
//   onTraitToggle: (trait: string) => void;
// }) => {
//   return (
//     <div className="grid grid-cols-2 gap-2">
//       {TRAIT_OPTIONS.map((trait) => (
//         <div
//           key={trait.value}
//           onClick={() => onTraitToggle(trait.value)}
//           className="flex gap-2 items-center bg-white rounded-lg transition-colors cursor-pointer body-hak-r hover:bg-gray-100"
//         >
//           {selectedTraits.includes(trait.value) ? (
//             <RadioTrue className="flex-shrink-0 w-5 h-5" />
//           ) : (
//             <RadioFalse className="flex-shrink-0 w-5 h-5" />
//           )}
//           <span className="text-sm text-center body-hak-sm">{trait.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

export const ChildInfoPage = () => {
  // 🔌 네트워크 코드: 주석처리
  // const {
  //   data: { contents: childrenData } = { contents: [] },
  //   isLoading,
  //   error,
  // } = useChildListQuery();
  // const updateChildNameMutation = useUpdateChildNameMutation();
  // const updateChildProfileMutation = useUpdateChildProfileMutation();
  // const updateChildTraitsMutation = useUpdateChildTraitsMutation();

  // 🔁 로컬 대체 상태
  const childrenData: ChildItemResponse[] = MOCK_CHILDREN;
  const isLoading = false;
  const error: unknown = null;

  const [children, setChildren] = useState<ChildItemResponse[]>([]);
  const [selectedChild, setSelectedChild] = useState<ChildItemResponse | null>(
    null
  );
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [editingChildId, setEditingChildId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProfileChildId, setEditingProfileChildId] = useState<
    number | null
  >(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleTraitToggle = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleEditName = (childId: number, currentName: string) => {
    setEditingChildId(childId);
    setEditingName(currentName);
  };

  const handleSaveName = () => {
    if (editingChildId && editingName.trim()) {
      // 🔌 네트워크 코드: 주석처리 & 로컬 업데이트
      // updateChildNameMutation.mutate(
      //   { childId: editingChildId, request: { name: editingName.trim() } },
      //   { onSuccess, onError }
      // );
      const newName = editingName.trim();
      setChildren((prev) =>
        prev.map((child) =>
          child.id === editingChildId ? { ...child, name: newName } : child
        )
      );
      setSelectedChild((prev) =>
        prev && prev.id === editingChildId ? { ...prev, name: newName } : prev
      );
      setEditingChildId(null);
      setEditingName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingChildId(null);
    setEditingName("");
  };

  const handleProfileClick = (childId: number) => {
    setEditingProfileChildId(childId);
    setIsProfileModalOpen(true);
  };

  const handleProfileConfirm = (profile: string) => {
    if (editingProfileChildId) {
      // 🔌 네트워크 코드: 주석처리 & 로컬 업데이트
      // updateChildProfileMutation.mutate(
      //   { childId: editingProfileChildId, request: { profile } },
      //   { onSuccess, onError }
      // );
      setChildren((prev) =>
        prev.map((child) =>
          child.id === editingProfileChildId ? { ...child, profile } : child
        )
      );
      setSelectedChild((prev) =>
        prev && prev.id === editingProfileChildId ? { ...prev, profile } : prev
      );
      setIsProfileModalOpen(false);
      setEditingProfileChildId(null);
    }
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    setEditingProfileChildId(null);
  };

  const handleSaveTraits = () => {
    if (!selectedChild) return;

    // 🔌 네트워크 코드: 주석처리 (백엔드 전송 대신 로컬 성공 모달)
    // const backendTraits = selectedTraits.map(
    //   (trait) => TRAIT_MAPPING[trait as keyof typeof TRAIT_MAPPING]
    // );
    // updateChildTraitsMutation.mutate(
    //   { childId: selectedChild.id, request: { traits: backendTraits } },
    //   { onSuccess, onError }
    // );
    setIsSuccessModalOpen(true);
  };

  // childrenData가 변경될 때 children 상태 업데이트
  useEffect(() => {
    if (childrenData.length > 0) {
      setChildren(childrenData);
    }
  }, [childrenData]);

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      setSelectedChild(children[0]);
    },
    [children]
  );

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="w-[375px] h-full mx-auto overflow-y-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="w-[375px] h-full mx-auto overflow-y-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">에러가 발생했습니다.</div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때 처리
  if (!childrenData || childrenData.length === 0) {
    return (
      <div className="w-[375px] h-full mx-auto overflow-y-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">등록된 아이가 없습니다.</div>
        </div>
      </div>
    );
  }

  if (!selectedChild) {
    return (
      <div className="w-[375px] h-full mx-auto overflow-y-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">아이를 선택해주세요.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[375px] h-full mx-auto overflow-y-auto px-6 py-4">
      {/* 상단 바 */}
      <TopBar title="아이 정보" />

      {/* 메인 컨텐츠 */}
      <div className="py-4 pt-24">
        <div className="flex flex-col gap-6">
          {/* 아이 프로필 */}
          {/* 아이 프로필 */}
          <ChildProfileList
            childrenData={children}
            editingChildId={editingChildId}
            editingName={editingName}
            onStartEdit={handleEditName}
            onChangeName={setEditingName}
            onSaveName={handleSaveName}
            onCancelEdit={handleCancelEdit}
            onClickProfile={handleProfileClick}
          />

          {/* 아이 성향 선택 카드 */}
          <MultiSelectCard
            title="아이 성향"
            subtitle="아이의 해당되는 특성을 선택해주세요."
            selectedValues={selectedTraits}
            onChange={(values) => setSelectedTraits(values)}
          >
            <TraitSelector />
          </MultiSelectCard>

          {/* 저장 버튼 */}
          {/* <SaveButton
            onClick={handleSaveTraits}
            disabled={updateChildTraitsMutation.isPending}
            text="저장"
          /> */}

          <SaveButton onClick={handleSaveTraits} text="저장" />
        </div>
      </div>

      {/* 프로필 선택 모달 */}
      <ProfileSelectModal
        isOpen={isProfileModalOpen}
        onClose={handleProfileModalClose}
        onConfirm={handleProfileConfirm}
        currentProfile={
          editingProfileChildId
            ? children.find((c) => c.id === editingProfileChildId)?.profile ||
              "CAT"
            : "CAT"
        }
        // 🔌 네트워크 코드: 로딩 제거
        // isLoading={updateChildProfileMutation.isPending}
        isLoading={false}
      />

      {/* 완료 모달 */}
      <ConfirmModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => {
          setIsSuccessModalOpen(false);
          setSelectedTraits([]); // 성향 선택 초기화
        }}
        title="완료"
        message="완료되었습니다."
        confirmText="확인"
        cancelText=""
      />
    </div>
  );
};
