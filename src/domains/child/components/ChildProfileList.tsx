import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { ChildProfileItem } from "@/domains/child/components/ChildProfileItem";

type Props = {
  childrenData: ChildItemResponse[];
  editingChildId: number | null;
  editingName: string;
  onStartEdit: (id: number, name: string) => void;
  onChangeName: (v: string) => void;
  onSaveName: () => void;
  onCancelEdit: () => void;
  onClickProfile: (id: number) => void;
};

export function ChildProfileList({
  childrenData,
  editingChildId,
  editingName,
  onStartEdit,
  onChangeName,
  onSaveName,
  onCancelEdit,
  onClickProfile,
}: Props) {
  return (
    <ul className="flex justify-around w-full h-40 bg-gray-200/70 rounded-[20px] p-4">
      {childrenData.map((child) => (
        <ChildProfileItem
          key={child.id}
          child={child}
          isEditing={editingChildId === child.id}
          editingName={editingName}
          onStartEdit={onStartEdit}
          onChangeName={onChangeName}
          onSaveName={onSaveName}
          onCancelEdit={onCancelEdit}
          onClickProfile={onClickProfile}
        />
      ))}
    </ul>
  );
}
