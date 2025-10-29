import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";
import { AddChild } from "@/assets/icons/mypage";

type Props = {
  childrenData: ChildItemResponse[];
  onClickProfile: (id: number) => void;
};

export function ChildProfileList({ childrenData, onClickProfile }: Props) {
  return (
    <ul className="flex justify-around w-full h-40 bg-gray-200 rounded-[20px] p-4">
      {childrenData.map((child) => (
        <ChildProfileItem
          key={child.id}
          child={child}
          onClickProfile={onClickProfile}
        />
      ))}
      {/* 아이 추가 프로필 영역 */}
      {/* 2. ⭐ 아이 추가 프로필 영역 렌더링 */}
      <li
        className="flex flex-col items-center justify-center cursor-pointer"
        // onClick={onAddChildClick} // ⭐ 클릭 시 부모가 전달한 함수 호출
      >
        {/* 무지 동그라미 아이콘 */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
          <AddChild />
        </div>

        {/* 아이 추가하기 텍스트 */}
        <p className="mt-2 text-xs font-semibold text-gray-700">
          아이 추가하기
        </p>
      </li>
    </ul>
  );
}
