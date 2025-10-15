import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { SwitchCase } from "@/shared/components";
import Pen from "@/assets/icons/Pen";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";

type Props = {
  child: ChildItemResponse;
  isEditing: boolean;
  editingName: string;
  onStartEdit: (id: number, currentName: string) => void;
  onChangeName: (v: string) => void;
  onSaveName: () => void;
  onCancelEdit: () => void;
  onClickProfile: (id: number) => void;
};

export function ChildProfileItem({
  child,
  isEditing,
  editingName,
  onStartEdit,
  onChangeName,
  onSaveName,
  onCancelEdit,
  onClickProfile,
}: Props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="relative cursor-pointer"
        onClick={() => onClickProfile(child.id)}
      >
        <div className="absolute -inset-1 rounded-full border border-black" />
        <div className="flex items-center justify-center rounded-full w-[80px] h-[80px] bg-gray-200 hover:bg-gray-300 transition-colors">
          <SwitchCase
            value={child.profile}
            case={{
              CAT: <CatIcon className="w-[70px] h-[70px]" />,
              CHICK: <ChickIcon className="w-[70px] h-[70px]" />,
              DINOSAUR: <DinosaurIcon className="w-[70px] h-[70px]" />,
              DOG: <DogIcon className="w-[70px] h-[70px]" />,
              RABBIT: <RabbitIcon className="w-[70px] h-[70px]" />,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center h-12">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={editingName}
              onChange={(e) => onChangeName(e.target.value)}
              className="px-2 py-1 w-16 text-sm rounded border border-gray-300"
              autoFocus
            />
            <button
              onClick={onSaveName}
              className="text-green-600 hover:text-green-800"
            >
              ✓
            </button>
            <button
              onClick={onCancelEdit}
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
              onClick={() => onStartEdit(child.id, child.name)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
