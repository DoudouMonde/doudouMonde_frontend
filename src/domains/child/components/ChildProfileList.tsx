import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";
import { AddChild } from "@/assets/icons/mypage";

type Props = {
  childrenData: ChildItemResponse[];
  onClickProfile: (id: number) => void;
  onAddChildClick: () => void;
  showName?: boolean;
};

export function ChildProfileList({
  childrenData,
  onClickProfile,
  onAddChildClick,
  showName,
}: Props) {
  const validChildren = childrenData || [];
  const childCount = validChildren.length;
  const sholudShowAddButton = childCount < 4;

  return (
    <ul className="grid grid-cols-2 place-items-center w-full  bg-gray-200 rounded-[20px] p-4">
      {validChildren.map((child) => (
        <ChildProfileItem
          showName={showName}
          key={child.id}
          child={child}
          onClickProfile={onClickProfile}
        />
      ))}

      {sholudShowAddButton && (
        <li
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={onAddChildClick}
        >
          <div className="relative">
            <div className="flex items-center justify-center rounded-full w-[80px] h-[80px] bg-secondary-100 hover:bg-gray-300 transition-colors shadow-md">
              <AddChild className="w-[70px] h-[70px]" />
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center h-12">
            <span className="text-lg font-semibold text-center body-hak">
              아이 추가
            </span>
          </div>
        </li>
      )}
    </ul>
  );
}
