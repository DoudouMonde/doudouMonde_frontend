import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { ChildItem } from "@/domains/child/types";
import { SwitchCase } from "@/shared/components";

// 프로필 이미지 맵

type Props = {
  child: ChildItem;
  isSelected: boolean;
  onClick: (child: ChildItem) => void;
};

export default function ChildProfile({ child, isSelected, onClick }: Props) {
  return (
    <li
      onClick={() => onClick(child)}
      className="flex flex-col gap-2 justify-center items-center"
    >
      <div className="relative">
        {/* 선택 테두리 - 바깥쪽 */}
        {isSelected ? (
          <>
            <div className="absolute -inset-1 rounded-full border-4 border-green-200" />
          </>
        ) : (
          <div className="absolute -inset-1 rounded-full border-2 border-gray-100" />
        )}

        <div className="flex items-center justify-center rounded-full w-[80px] h-[80px]  bg-gray-200">
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
          {/* <img
            className="w-[65px] h-[65px"
            src={
              CHILD_PROFILE_URLS[
                child.profile as keyof typeof CHILD_PROFILE_URLS
              ]
            }
          /> */}
        </div>
      </div>
      {/* 이름 */}
      <p
        className={`text-center body-hak ${
          isSelected ? "" : "text-secondary-100"
        }`}
      >
        {child.name}
      </p>
    </li>
  );
}
