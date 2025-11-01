import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";
import { AddChild } from "@/assets/icons/mypage";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  showName?: boolean;
};

export function ChildProfileList({ showName }: Props) {
  const { children, handleAddChildClick } = useChildListContext();
  const validChildren = children || [];
  const childCount = validChildren.length;
  const sholudShowAddButton = childCount < 4;

  return (
    <ul className="grid grid-cols-2 place-items-center w-full  bg-gray-200 rounded-[20px] p-4">
      <ErrorBoundary fallback={<div>에러닷</div>}>
        {validChildren.map((child) => (
          <ChildProfileItem
            showName={showName}
            key={child.id}
            child={child}
            clickAction="openEdit"
          />
        ))}
      </ErrorBoundary>

      {sholudShowAddButton && (
        <li
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={handleAddChildClick}
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
