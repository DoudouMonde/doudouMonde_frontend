import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";
import { useChildListQuery } from "@/domains/child/queries";
import { ChildEditModal } from "./ChildEditModal";
import { ChildAddBtn } from "@/domains/child/components/ChildAddBtn";
import { ModalWrapper } from "@/shared/components/Modal/ModalWrapper";
import { CreateChildForm } from "@/domains/child/components/CreateChildForm";

type Props = {
  showName?: boolean;
};

export function ChildProfileList({ showName }: Props) {
  const { data: children } = useChildListQuery();

  const validChildren = children.items || [];
  const {
    handleAddChildClick,
    isEditModalOpen,
    editingChild,
    openEditModal,
    isCreateModalOpen,
    closeCreateModal,
  } = useChildListContext();

  const childCount = validChildren.length;
  const sholudShowAddButton = childCount < 4;
  if (children === undefined) return null;

  return (
    <>
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
              clickAction="openEdit"
            />
          </li>
        ))}
        {isEditModalOpen && editingChild && (
          <ChildEditModal selectedChild={editingChild} />
        )}

        {sholudShowAddButton && (
          <li
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={handleAddChildClick}
          >
            <ChildAddBtn />
          </li>
        )}
        {/* {isCreateModalOpen && (
          <ModalWrapper onClose={closeCreateModal}>
            <CreateChildForm onClose={closeCreateModal} />
          </ModalWrapper>
        )} */}
      </ul>
    </>
  );
}
