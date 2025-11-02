import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";
import { AddChild } from "@/assets/icons/mypage";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { useChildListQuery } from "@/domains/child/queries";
import { ChildEditModal } from "./ChildEditModal";
import { useChildList } from "@/domains/child/hooks/useChildList";

type Props = {
  showName?: boolean;
};

export function ChildProfileList({ showName }: Props) {
  const { handleAddChildClick } = useChildListContext();

  const { isEditModalOpen, editingChild, closeEditModal, openEditModal } =
    useChildList();

  const { data: children } = useChildListQuery();
  if (children === undefined) return null;
  const validChildren = children.items || [];
  const childCount = validChildren.length;
  const sholudShowAddButton = childCount < 4;

  return (
    <ul className="grid grid-cols-2 place-items-center w-full  bg-gray-200 rounded-[20px] p-4">
      {validChildren.map((child) => (
        <li
          key={child.id}
          onClick={() => openEditModal(child.id)}
          className="cursor-pointer"
        >
          <ChildProfileItem
            showName={showName}
            child={child}
            // clickAction은 유지해도 되지만, 실제 동작은 onClick에서 처리
            clickAction="openEdit"
          />
        </li>
      ))}
      {isEditModalOpen && editingChild && (
        <ChildEditModal child={editingChild} onClose={closeEditModal} />
      )}

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
