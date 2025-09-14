import React, { useState } from "react";
import { CalendarProps, CalendarDate } from "../types";

const Calendar: React.FC<CalendarProps> = ({
  className = "",
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const formatMonthYear = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  const getCalendarDates = (date: Date): CalendarDate[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    // Get first day of the month and calculate starting date
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates: CalendarDate[] = [];

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      dates.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        isSelected: selectedDate
          ? currentDate.toDateString() === selectedDate.toDateString()
          : false,
      });
    }

    return dates;
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // 오늘의 끝 시간으로 설정

    // 오늘보다 미래 날짜는 선택할 수 없음
    if (date > today) {
      return;
    }

    setSelectedDate(date);
    onDateChange?.(date);
  };

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const calendarDates = getCalendarDates(currentDate);

  return (
    <div className={`w-full h-auto ${className}`}>
      {/* 테두리 색을 제대로 설정했는데 왜 더 진해보이지? */}
      <div className="relative w-full h-full bg-gray-200/50 border border-secondary-100/30 rounded-[20px] overflow-hidden">
        {/* Header with navigation */}
        <div className="flex justify-between items-center px-6 py-5">
          {/* Left arrow */}
          <button
            onClick={handlePreviousMonth}
            className="flex justify-center items-center w-6 h-6 transition-colors text-secondary-100 hover:text-black"
            aria-label="이전 달"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Month/Year display */}
          <div className="text-center">
            <span className="text-xl font-semibold text-black font-['Hakgyoansim_Dunggeunmiso_OTF'] tracking-[-0.02em]">
              {formatMonthYear(currentDate)}
            </span>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNextMonth}
            className="w-6 h-6 flex items-center justify-center text-[#8C8C8C] hover:text-black transition-colors"
            aria-label="다음 달"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Calendar body */}
        <div className="px-6 pb-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="py-2 text-sm font-medium text-center text-black-100"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDates.map((calendarDate, index) => {
              const today = new Date();
              today.setHours(23, 59, 59, 999);
              const isFutureDate = calendarDate.date > today;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(calendarDate.date)}
                  disabled={isFutureDate}
                  className={`
                    w-8 h-8 text-sm body-noto rounded-full flex items-center justify-center transition-colors
                    ${
                      !calendarDate.isCurrentMonth
                        ? "text-secondary-100"
                        : isFutureDate
                        ? "text-gray-300 cursor-not-allowed"
                        : calendarDate.isSelected
                        ? "bg-green-100 text-gray-100 font-black"
                        : "text-black-100 hover:bg-gray-100"
                    }
                  `}
                >
                  {calendarDate.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
