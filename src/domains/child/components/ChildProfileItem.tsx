import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { SwitchCase } from "@/shared/components";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";

type Props = {
  child: ChildItemResponse;
  showName?: boolean;
  clickAction: "openEdit" | "openAvatarPicker";
  isShadow?: boolean;
};

export function ChildProfileItem({
  child,
  showName = true,
  clickAction = "openEdit",
  isShadow = false,
}: Props) {
  const { openEditModal, openAvatarPicker } = useChildListContext();

  const handleClick = () => {
    console.log("[ChildProfileItem] clicked:", child.id, clickAction);
    if (clickAction === "openAvatarPicker") {
      openAvatarPicker(child.id);
    } else {
      openEditModal(child.id);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="relative cursor-pointer" onClick={handleClick}>
        <div className="absolute -inset-1 rounded-full border border-gray-900" />

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
      {showName && (
        <div className="flex flex-col gap-2 justify-center items-center h-12">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-center body-hak">
              {child.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
