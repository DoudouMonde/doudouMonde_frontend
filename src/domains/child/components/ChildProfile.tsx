import { CHILD_PROFILE_URLS } from "@/domains/child/constants";
import { ChildItem } from "@/domains/child/types";

// 프로필 이미지 맵

type Props = {
  child: ChildItem;
  isSelected: boolean;
  onClick: (child: ChildItem) => void;
};

export default function ChildProfile({ child, isSelected, onClick }: Props) {
  return (
    <li onClick={() => onClick(child)} className="flex-col gap-2 items-center">
      <div className="relative">
        {/* 선택 테두리 - 바깥쪽 */}
        {isSelected && (
          <div className="absolute -inset-1 rounded-full border-4 border-pink-500" />
        )}

        {/* <View className="rounded-full bg-neutral-gray-950 w-[75px] h-[75px]"> */}
        <div className="rounded-full w-[75px] h-[75px]">
          <img
            src={
              CHILD_PROFILE_URLS[
                child.profile as keyof typeof CHILD_PROFILE_URLS
              ]
            }
            className="w-full h-full -z-10"
          />
        </div>
      </div>
      {/* 이름 */}
      <p className="font-normal text-black body">{child.name}</p>
    </li>
  );
}
