import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { useEffect, useState } from "react";
import ChildProfile from "@/domains/child/components/ChildProfile";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { ChildItem } from "@/domains/child/types";
import { RadioTrue, RadioFalse } from "@/assets/icons";

const TraitSelector = ({
  selectedTraits,
  onTraitToggle,
}: {
  selectedTraits: string[];
  onTraitToggle: (trait: string) => void;
}) => {
  const traits = [
    { value: "music", label: "음악을 좋아해요" },
    { value: "active", label: "활동적이에요" },
    { value: "sensitive", label: "소리에 민감해요" },
    { value: "short-attention", label: "집중시간이 짧아요" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {traits.map((trait) => (
        <div
          key={trait.value}
          onClick={() => onTraitToggle(trait.value)}
          className="flex gap-3 items-center p-3 bg-white rounded-lg transition-colors cursor-pointer hover:bg-gray-100"
        >
          {selectedTraits.includes(trait.value) ? (
            <RadioTrue className="flex-shrink-0 w-5 h-5" />
          ) : (
            <RadioFalse className="flex-shrink-0 w-5 h-5" />
          )}
          <span className="text-sm text-center body-inter-r">
            {trait.label}
          </span>
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
  const { data: { contents: children } = { contents: [] } } =
    useChildListQuery();
  const [selectedChild, setSelectedChild] = useState<ChildItem | null>(null);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

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

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      setSelectedChild(children[0]);
    },
    [children]
  );
  if (!selectedChild) {
    return;
  }

  return (
    <div className="w-[375px] h-full mx-auto overflow-y-auto">
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
          <ul className="flex justify-around w-full h-auto bg-gray-200/70 rounded-[20px] p-4">
            {children.map((child) => (
              <div className="flex flex-col gap-2">
                <ChildProfile
                  key={child.id}
                  child={child}
                  isSelected={false}
                  onClick={setSelectedChild}
                />
                <div>
                  <p className="subtitle text-secondary-100">
                    프로필 사진 변경
                  </p>
                </div>
              </div>
            ))}
          </ul>
          <p className="title-hak">아이 성향 변경</p>
          <div className="flex flex-col gap-4 bg-gray-200/70 rounded-[20px] p-6 w-full">
            <TraitSelector
              selectedTraits={selectedTraits}
              onTraitToggle={handleTraitToggle}
            />
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                console.log("선택된 성향:", selectedTraits);
                // TODO: 성향 저장 API 호출
              }}
              className="px-8 py-3 w-full font-semibold text-gray-200 bg-green-100 rounded-full shadow-md transition-colors hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
