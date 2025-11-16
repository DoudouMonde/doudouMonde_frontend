import { PlayroomLogo1 } from "@/assets/icons/playroom";

interface TitleWithCountProps {
  reviewCount?: number;
}

export const TitleWithClount = ({ reviewCount = 0 }: TitleWithCountProps) => {
  return (
    <div className="flex flex-col items-center gap-1 my-4">
      <PlayroomLogo1 className="w-40" />
      <div className="flex items-end">
        <p className="title-hak text-green-200">{reviewCount}명 </p>
        <p className="body-hak-r text-gray-900">
          {" "}
          의 상상친구가 입주해 있어요!
        </p>
      </div>
    </div>
  );
};
