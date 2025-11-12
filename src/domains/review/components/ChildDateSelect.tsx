import React, { useState } from "react";
import Calendar from "@/domains/calendar/components/Calendar";
import { RadioTrue, RadioFalse } from "@/assets/icons";

import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildListData } from "@/domains/child/hooks/useChildListData";

type ChildDateSelectProps = {
  onChange: (patch: { childrend: string[]; watchDate: Date }) => void;
  onValidityChange?: (ok: boolean) => void;
};

export const ChildDateSelect = ({
  onChange,
  onValidityChange,
}: ChildDateSelectProps) => {
  const [selectedChildren, setSelectedChildren] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { children } = useChildListData();

  const handleChildSelect = (childId: number) => {
    setSelectedChildren((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId]
    );
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
    console.log("선택된 날짜:", date);
  };

  // 🔌 NETWORK-OFF: 빈 상태 처리도 목데이터 기준으로만 동작
  if (!children || children.length === 0) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="py-12 text-center">
            <p className="mb-2 text-gray-500">등록된 아이가 없습니다.</p>
            <p className="text-sm text-gray-400">
              먼저 아이 정보를 등록해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 아이 선택 섹션 */}
      <article>
        <p className="pt-2 pb-5 text-primary-100 subtitle-b">
          누구와 함께 봤나요?
        </p>
        <div className="space-y-3">
          {children.map((child: ChildItemResponse) => (
            <div
              key={child.id}
              onClick={() => handleChildSelect(child.id)}
              className="transition-all duration-200 cursor-pointer rounded-[16px]"
            >
              <div className="flex gap-4 items-center">
                {selectedChildren.includes(child.id) ? (
                  <RadioTrue className="w-6 h-6" />
                ) : (
                  <RadioFalse className="w-6 h-6" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="body-inter-r">{child.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 관람날짜 선택 섹션 */}
      <article className="pt-4">
        <p className="pt-2 pb-5 text-primary-100 subtitle-b">언제 봤나요?</p>
        <div className="flex justify-center">
          <Calendar onDateChange={handleDateChange} />
        </div>
      </article>
    </div>
  );
};
