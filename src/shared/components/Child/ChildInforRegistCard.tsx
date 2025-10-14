import { FormCard } from "../FormCard";

export const ChildInforRegistCard = () => {
  return (
    <FormCard title="아이 정보" subtitle="아이의 기본 정보를 입력해주세요.">
      <div className="flex flex-col gap-2">
        <p className="body-inter-b">이름</p>
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 정불명"
          className="p-4  w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-inter-b">생년월일</p>
        <div className="flex gap-2">
          {/* 년도 */}
          <select
            value={birthYear}
            onChange={(e) => {
              setBirthYear(e.target.value);
              if (birthDay) {
                const newDayOptions = getDayOptions(e.target.value, birthMonth);
                if (parseInt(birthDay) > newDayOptions.length) {
                  setBirthDay("");
                }
              }
            }}
            className="flex-1 p-2  h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
            style={{
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 8px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">년도</option>
            {yearOptions.map((year) => (
              <option key={year} value={year.toString()}>
                {year}년
              </option>
            ))}
          </select>

          {/* 월 */}
          <select
            value={birthMonth}
            onChange={(e) => {
              setBirthMonth(e.target.value);
              if (birthDay) {
                const newDayOptions = getDayOptions(birthYear, e.target.value);
                if (parseInt(birthDay) > newDayOptions.length) {
                  setBirthDay("");
                }
              }
            }}
            className="flex-1 p-3 h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
            style={{
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 8px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">월</option>
            {monthOptions.map((month) => (
              <option key={month} value={month.toString()}>
                {month}월
              </option>
            ))}
          </select>

          {/* 일 */}
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            className="flex-1 p-3 h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
            style={{
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 8px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
              paddingRight: "32px",
            }}
          >
            <option value="">일</option>
            {dayOptions.map((day) => (
              <option key={day} value={day.toString()}>
                {day}일
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="body-inter-b">성별</p>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-3 py-3 w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
          style={{
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 8px center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px",
            paddingRight: "32px",
          }}
        >
          <option value="">성별을 선택해주세요</option>
          <option value="MALE">남자</option>
          <option value="FEMALE">여자</option>
        </select>
      </div>
    </FormCard>
  );
};
