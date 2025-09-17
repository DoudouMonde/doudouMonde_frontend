import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { useEffect, useState } from "react";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { useUpdateChildNameMutation } from "@/domains/child/queries/useUpdateChildNameMutation";
import { useUpdateChildProfileMutation } from "@/domains/child/queries/useUpdateChildProfileMutation";
import { useUpdateChildTraitsMutation } from "@/domains/child/queries/useUpdateChildTraitsMutation";
// import { ChildItem } from "@/domains/child/types";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { TRAIT_OPTIONS } from "@/domains/child/components/TraitSelector";
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

// 백엔드 enum과 매핑되는 상수 (ChildRegistration과 동일 규칙 사용)
const TRAIT_MAPPING = {
  MUSIC_LOVER: "MUSIC_LOVER",
  DANCE_LOVER: "DANCE_LOVER",
  SHORT_ATTENTION: "SHORT_ATTENTION",
} as const;

const TraitSelector = ({
  selectedTraits,
  onTraitToggle,
}: {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TRAIT_OPTIONS.map((trait) => (
        <div
          key={trait.value}
          onClick={() => onTraitToggle(trait.value)}
          className="flex gap-2 items-center bg-white rounded-lg transition-colors cursor-pointer body-hak-r hover:bg-gray-100"
        >
          {selectedTraits.includes(trait.value) ? (
            <RadioTrue className="flex-shrink-0 w-5 h-5" />
          ) : (
            <RadioFalse className="flex-shrink-0 w-5 h-5" />
          )}
          <span className="text-sm text-center body-hak-sm">{trait.label}</span>
        </div>
      ))}
    </div>
  );
};

export const ChildInfoPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const {
    data: { contents: childrenData } = { contents: [] },
    isLoading,
    error,
  } = useChildListQuery();
  const updateChildNameMutation = useUpdateChildNameMutation();
  const updateChildProfileMutation = useUpdateChildProfileMutation();
  const updateChildTraitsMutation = useUpdateChildTraitsMutation();
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
    setSelectedTraits((prev) => {
      if (prev.includes(trait)) {
        // 이미 선택된 성향이면 선택 해제
        return prev.filter((t) => t !== trait);
      } else {
        // 선택되지 않은 성향이면 선택 추가
        return [...prev, trait];
      }
    });
  };

  const handleEditName = (childId: number, currentName: string) => {
    setEditingChildId(childId);
    setEditingName(currentName);
  };

  const handleSaveName = () => {
    if (editingChildId && editingName.trim()) {
      updateChildNameMutation.mutate(
        {
          childId: editingChildId,
          request: { name: editingName.trim() },
        },
        {
          onSuccess: (response) => {
            // children 배열을 즉시 업데이트하여 화면에 바로 반영
            setChildren((prev) =>
              prev.map((child) =>
                child.id === editingChildId
                  ? { ...child, name: response.name }
                  : child
              )
            );
            // selectedChild도 업데이트
            setSelectedChild((prev) => {
              if (prev && prev.id === editingChildId) {
                return { ...prev, name: response.name };
              }
              return prev;
            });
            setEditingChildId(null);
            setEditingName("");
          },
          onError: (error) => {
            console.error("이름 변경 실패:", error);
            // 에러 처리 (예: 토스트 메시지 표시)
          },
        }
      );
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
      updateChildProfileMutation.mutate(
        {
          childId: editingProfileChildId,
          request: { profile },
        },
        {
          onSuccess: (response) => {
            // children 배열을 즉시 업데이트하여 화면에 바로 반영
            setChildren((prev) =>
              prev.map((child) =>
                child.id === editingProfileChildId
                  ? { ...child, profile: response.profile }
                  : child
              )
            );
            // selectedChild도 업데이트
            setSelectedChild((prev) => {
              if (prev && prev.id === editingProfileChildId) {
                return { ...prev, profile: response.profile };
              }
              return prev;
            });
            setIsProfileModalOpen(false);
            setEditingProfileChildId(null);
          },
          onError: (error) => {
            console.error("프로필 변경 실패:", error);
            // 에러 처리 (예: 토스트 메시지 표시)
          },
        }
      );
    }
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
    setEditingProfileChildId(null);
  };

  const handleSaveTraits = () => {
    if (selectedChild) {
      // 선택된 성향을 백엔드 enum 형식으로 변환
      const backendTraits = selectedTraits.map(
        (trait) => TRAIT_MAPPING[trait as keyof typeof TRAIT_MAPPING]
      );

      updateChildTraitsMutation.mutate(
        {
          childId: selectedChild.id,
          request: { traits: backendTraits },
        },
        {
          onSuccess: (response) => {
            console.log("성향 변경 성공:", response);
            setIsSuccessModalOpen(true);
          },
          onError: (error) => {
            console.error("성향 변경 실패:", error);
            // 에러 처리 (예: 토스트 메시지 표시)
          },
        }
      );
    }
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
      <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-black title-hak">아이 정보</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="py-4 pt-24">
        <div className="flex flex-col gap-6">
          {/* 아이 프로필 */}
          <ul className="flex justify-around w-full h-40 bg-gray-200/70 rounded-[20px] p-4">
            {children.map((child) => (
              <div key={child.id} className="flex flex-col gap-4 items-center">
                {/* 프로필 이미지 */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleProfileClick(child.id)}
                >
                  <div className="absolute -inset-1 rounded-full border border-black" />
                  <div className="flex items-center justify-center rounded-full w-[80px] h-[80px] bg-gray-200 hover:bg-gray-300 transition-colors">
                    <SwitchCase
                      value={child.profile}
                      case={{
                        CAT: <CatIcon className="w-[70px] h-[70px]" />,
                        CHICK: <ChickIcon className="w-[70px] h-[70px]" />,
                        DINOSAUR: (
                          <DinosaurIcon className="w-[70px] h-[70px]" />
                        ),
                        DOG: <DogIcon className="w-[70px] h-[70px]" />,
                        RABBIT: <RabbitIcon className="w-[70px] h-[70px]" />,
                      }}
                    />
                  </div>
                </div>

                {/* 이름과 편집 기능 */}
                <div className="flex flex-col gap-2 justify-center items-center h-12">
                  {editingChildId === child.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="px-2 py-1 w-16 text-sm rounded border border-gray-300"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={updateChildNameMutation.isPending}
                        className="text-green-600 hover:text-green-800 disabled:opacity-50"
                      >
                        {updateChildNameMutation.isPending ? "..." : "✓"}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span className="text-lg font-semibold text-center body-hak">
                        {child.name}
                      </span>
                      <Pen
                        className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                        onClick={() => handleEditName(child.id, child.name)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>

          <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] py-6 px-5 pb-8 w-full h-auto">
            <div className="flex flex-col gap-2">
              <p className="title-hak">아이 성향</p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <TraitSelector
                selectedTraits={selectedTraits}
                onTraitToggle={handleTraitToggle}
              />
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSaveTraits}
              disabled={updateChildTraitsMutation.isPending}
              className="px-8 py-3 w-full font-semibold text-gray-200 bg-green-100 rounded-full shadow-md transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {updateChildTraitsMutation.isPending ? "저장 중..." : "저장"}
            </button>
          </div>
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
        isLoading={updateChildProfileMutation.isPending}
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
