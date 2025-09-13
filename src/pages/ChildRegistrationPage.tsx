import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import Arrow from "@/assets/icons/Arrow";
import { PATH } from "@/shared/constants/paths";

export const ChildRegistrationPage = () => {
  const navigate = useNavigate();

  // 생년월일 상태
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");

  // 년도 옵션 생성 (현재 년도부터 20년 전까지)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - i);

  // 월 옵션 생성
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // 일 옵션 생성 (선택된 년월에 따라 달라짐)
  const getDayOptions = (year: string, month: string) => {
    if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const dayOptions = getDayOptions(birthYear, birthMonth);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMemberInfoClick = () => {
    navigate(PATH.MEMBER_INFO);
  };

  const handleChildInfoClick = () => {
    navigate(PATH.CHILD_INFO);
  };

  // LocalDate 형식으로 변환 (YYYY-MM-DD)
  const getLocalDateString = () => {
    if (birthYear && birthMonth && birthDay) {
      const month = birthMonth.padStart(2, "0");
      const day = birthDay.padStart(2, "0");
      return `${birthYear}-${month}-${day}`;
    }
    return null;
  };
  return (
    <div className="flex relative flex-col items-center px-6 w-full min-h-screen">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url('/assets/images/background/background_afternoon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.7,
        }}
      />

      {/* 컨텐츠 */}
      <main className="relative z-10 max-w-[375px] flex flex-col items-center">
        <div className="w-[375px] h-full mx-auto overflow-y-auto">
          {/* 상단 바 */}
          <div
            className="fixed top-0 right-0  left-0 z-20 px-6 pb-2 shadow-sm h-[60px] bg-gray-200/70"
            style={{
              paddingTop: `max(1rem, env(safe-area-inset-top))`,
            }}
          >
            <div className="flex flex-1 justify-center items-center">
              <div className="text-black title-hak">아이 등록</div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="py-4 pt-24">
            <div className="flex flex-col gap-6 justify-center">
              {/* 카카오톡 계정 연동 */}
              <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-7 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="title-hak">아이 정보</p>
                  <p className="subtitle">아이의 기본 정보를 입력해주세요.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p>이름</p>
                  <input
                    type="text"
                    placeholder="예: 정불명"
                    className="p-4 body-inter-r w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p>생년월일</p>
                  <div className="flex gap-2">
                    {/* 년도 선택 */}
                    <select
                      value={birthYear}
                      onChange={(e) => {
                        setBirthYear(e.target.value);
                        // 년도가 변경되면 일자 초기화 (2월 29일 같은 경우)
                        if (birthDay) {
                          const newDayOptions = getDayOptions(
                            e.target.value,
                            birthMonth
                          );
                          if (parseInt(birthDay) > newDayOptions.length) {
                            setBirthDay("");
                          }
                        }
                      }}
                      className="flex-1 p-3 body-inter-r h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
                    >
                      <option value="">년도</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}년
                        </option>
                      ))}
                    </select>

                    {/* 월 선택 */}
                    <select
                      value={birthMonth}
                      onChange={(e) => {
                        setBirthMonth(e.target.value);
                        // 월이 변경되면 일자 초기화
                        if (birthDay) {
                          const newDayOptions = getDayOptions(
                            birthYear,
                            e.target.value
                          );
                          if (parseInt(birthDay) > newDayOptions.length) {
                            setBirthDay("");
                          }
                        }
                      }}
                      className="flex-1 p-3 body-inter-r h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
                    >
                      <option value="">월</option>
                      {monthOptions.map((month) => (
                        <option key={month} value={month.toString()}>
                          {month}월
                        </option>
                      ))}
                    </select>

                    {/* 일 선택 */}
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="flex-1 p-3 body-inter-r h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
                    >
                      <option value="">일</option>
                      {dayOptions.map((day) => (
                        <option key={day} value={day.toString()}>
                          {day}일
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* 선택된 날짜 표시 (디버깅용) */}
                  {getLocalDateString() && (
                    <p className="text-xs text-gray-500">
                      선택된 날짜: {getLocalDateString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p>성별</p>
                  <input
                    type="text"
                    placeholder="예: 정불명"
                    className="p-4 body-inter-r w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
                  />
                </div>
              </div>
              {/* 계정정보 */}
              <p className="text-black title-hak">계정</p>
              <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full h-auto">
                <div
                  className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60"
                  onClick={handleMemberInfoClick}
                >
                  <p className="body-inter-r">회원 정보</p>
                  <Arrow className="w-6 h-6" />
                </div>
                <div
                  className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60"
                  onClick={handleChildInfoClick}
                >
                  <p className="body-inter-r">아이 정보</p>
                  <Arrow className="w-6 h-6" />
                </div>
              </div>

              {/* 추가 기능 */}
              <p className="text-black title-hak">추가 기능</p>
              <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full">
                <div className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60">
                  <p className="body-inter-r">보고 싶어요 누른 작품</p>
                  <Arrow className="w-6 h-6" />
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60">
                  <p className="body-inter-r">이야기 마을</p>
                  <Arrow className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
