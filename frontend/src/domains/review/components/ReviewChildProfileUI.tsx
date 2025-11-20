import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { SwitchCase } from "@/shared/components";
import { ChildItemResponse } from "../../child/types/childApiTypes";

type Props = {
  child: ChildItemResponse;
  selected: boolean;
};

export const ChildProfileUI = ({ child, selected }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative cursor-pointer">
        <div
          className={`absolute -inset-1 rounded-full border border-gray-900${
            selected ? " border-green-200 border-4" : " border-secondary-100"
          }`}
        />

        <div className="flex items-center justify-center rounded-full w-[70px] h-[70px] bg-gray-200 hover:bg-gray-300 transition-colors">
          <SwitchCase
            value={child.profile}
            case={{
              CAT: <CatIcon className="w-[60px] h-[60px]" />,
              CHICK: <ChickIcon className="w-[60px] h-[60px]" />,
              DINOSAUR: <DinosaurIcon className="w-[60px] h-[60px]" />,
              DOG: <DogIcon className="w-[60px] h-[60px]" />,
              RABBIT: <RabbitIcon className="w-[60px] h-[60px]" />,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center h-12">
        <div className="flex gap-2 items-center">
          <span
            className={`text-lg font-semibold text-center  ${
              selected
                ? "text-green-200 body-hak"
                : "text-secondary-100 body-hak-r"
            }`}
          >
            {child.name}
          </span>
        </div>
      </div>
    </div>
  );
};
