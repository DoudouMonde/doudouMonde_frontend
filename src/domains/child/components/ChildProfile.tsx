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
    <li
      onClick={() => onClick(child)}
      className="flex flex-col gap-2 justify-center items-center"
    >
      <div className="relative">
        {/* 선택 테두리 - 바깥쪽 */}
        {isSelected && (
          <div className="absolute -inset-1 rounded-full border-4 border-pink-100" />
        )}

        <div className="flex items-center justify-center rounded-full w-[75px] h-[75px] bg-black-100">
          <img
            className="w-[65px] h-[65px"
            src={
              CHILD_PROFILE_URLS[
                child.profile as keyof typeof CHILD_PROFILE_URLS
              ]
            }
          />
        </div>
      </div>
      {/* 이름 */}
      <p className="text-center body-hak">{child.name}</p>
    </li>
  );
}
