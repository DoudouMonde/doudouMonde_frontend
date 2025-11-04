import { AddChild } from "@/assets/icons/mypage";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";

export const ChildAddBtn = () => {
  const { handleAddChildClick } = useChildListContext();
  return (
    <>
      <div className="relative" onClick={() => handleAddChildClick}>
        <div className="flex items-center justify-center rounded-full w-[80px] h-[80px] bg-secondary-100 hover:bg-gray-300 transition-colors shadow-md">
          <AddChild className="w-[70px] h-[70px]" />
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center h-12">
        <span className="text-lg font-semibold text-center body-hak">
          아이 추가
        </span>
      </div>
    </>
  );
};
