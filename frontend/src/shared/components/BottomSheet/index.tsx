import React from "react";

type BottomSheetProps = {
  onClick1: React.MouseEventHandler<HTMLButtonElement>;
  onClick2: React.MouseEventHandler<HTMLButtonElement>;
  title: React.ReactNode; // string | JSX
  content?: React.ReactNode; // 선택값
  field1: React.ReactNode; // 버튼1 라벨 (string | JSX)
  field2: React.ReactNode; // 버튼2 라벨
  className?: string; // 필요 시 외부에서 스타일 확장
};

export const BottomSheet = ({
  onClick1,
  onClick2,
  title,
  content,
  field1,
  field2,
}: BottomSheetProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-200 rounded-t-3xl p-6 max-h-[50vh]">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onClick1}
          className="py-4 w-full font-semibold text-green-100  border transition-colors border-green-100 hover:bg-primary-200 rounded-[20px]"
        >
          {field1}
        </button>
        <button
          onClick={onClick2}
          className="py-4 w-full font-semibold text-gray-100 border border-gray-300 transition-colors rounded-[20px] bg-green-100 hover:bg-green-200"
        >
          {field2}
        </button>
      </div>
    </div>
  );
};
