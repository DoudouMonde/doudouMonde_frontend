import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { PATH } from "@/shared/constants/paths";
import { MultiRadio } from "@/shared/components/Radio";
import { MultiSelectGroup } from "@/shared/components/MultiSelect";
import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { SwitchCase } from "@/shared/components";
import {
  ChildRequest,
  GENDER_MAPPING,
  TRAIT_MAPPING,
  GENRE_MAPPING,
  PROFILE_MAPPING,
} from "@/domains/auth/types/signup";
import { CustomButton } from "@/shared/components/CustomButton";

// 개별 성향 목록
const TRAITS = [
  { value: "MUSIC_LOVER", label: "음악을 좋아해요" },
  { value: "DANCE_LOVER", label: "춤을 좋아해요" },
  { value: "CURIOUS", label: "호기심이 많아요" },
  { value: "SHORT_ATTENTION", label: "집중시간이 짧아요" },
];

// 장르 목록
const GENRES = [
  { value: "COMPOSITE", label: "복합" },
  { value: "PLAY", label: "연극" },
  { value: "MUSICAL", label: "뮤지컬" },
  { value: "POP_DANCE", label: "대중무용" },
  { value: "POP_MUSIC", label: "대중음악" },
  { value: "CLASSICAL_MUSIC", label: "서양음악(클래식)" },
  { value: "KOREAN_MUSIC", label: "한국음악(국악)" },
  { value: "CIRCUS_MAGIC", label: "서커스/마술" },
  { value: "DANCE", label: "무용(서양/한국무용)" },
];

// 프로필 옵션
const PROFILE_OPTIONS = [
  { value: "CAT", label: "고양이" },
  { value: "CHICK", label: "병아리" },
  { value: "DINOSAUR", label: "공룡" },
  { value: "DOG", label: "강아지" },
  { value: "RABBIT", label: "토끼" },
];

function TraitSelector() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TRAITS.map((trait) => (
        <MultiRadio key={trait.value} label={trait.label} value={trait.value} />
      ))}
    </div>
  );
}

function GenreSelector() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {GENRES.map((genre) => (
        <MultiRadio key={genre.value} label={genre.label} value={genre.value} />
      ))}
    </div>
  );
}

export const ChildRegistrationPage = () => {
  const navigate = useNavigate();

  // 생년월일 상태
  const [birthYear, setBirthYear] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");

  // 성별 상태
  const [gender, setGender] = useState<string>("");

  // 성향 상태
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  // 장르 상태
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // 프로필 상태
  const [selectedProfile, setSelectedProfile] = useState<string>("CAT");

  // 바텀시트 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // 이름 입력 상태 (실시간 업데이트를 위해)
  const [name, setName] = useState<string>("");

  // 제출 상태

  // 이름 입력 ref
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  // 년도/월/일 옵션
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const getDayOptions = (year: string, month: string) => {
    if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };
  const dayOptions = getDayOptions(birthYear, birthMonth);

  // 내비게이션
  const handleBackClick = () => navigate(-1);

  // 저장하기 핸들러
  const handleSave = () => {
    // TODO: 실제 저장 로직 구현
    console.log("저장할 데이터:", {
      name: nameInputRef.current?.value,
      birthYear,
      birthMonth,
      birthDay,
      gender,
      selectedTraits,
      selectedProfile,
    });

    // 저장 성공 시 바텀시트 열기
    setIsBottomSheetOpen(true);
  };

  // 폼 초기화
  const resetForm = () => {
    setName("");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setGender("");
    setSelectedTraits([]);
    setSelectedGenres([]);
    setSelectedProfile("CAT");
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  // 다른 아이 등록하기
  const handleAddAnotherChild = () => {
    setIsBottomSheetOpen(false);
    resetForm();
  };

  // 완료
  const handleComplete = () => {
    if (!isFormValid()) return;

    // 현재 아이 정보를 ChildRequest 형태로 변환
    const childData: ChildRequest = {
      name: name.trim(),
      birthday: `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`,
      gender: GENDER_MAPPING[gender as keyof typeof GENDER_MAPPING] || "MALE",
      profile:
        PROFILE_MAPPING[selectedProfile as keyof typeof PROFILE_MAPPING] ||
        "CAT",
      traits: selectedTraits.map(
        (trait) => TRAIT_MAPPING[trait as keyof typeof TRAIT_MAPPING] || trait
      ),
      genres: selectedGenres.map(
        (genre) => GENRE_MAPPING[genre as keyof typeof GENRE_MAPPING] || genre
      ),
    };

    // 아이 정보를 localStorage에 저장
    localStorage.setItem("childData", JSON.stringify(childData));

    // 다음 페이지로 이동
    navigate(PATH.REGION_REGISTRATION);
  };

  // 폼 유효성 검사
  const isFormValid = () => {
    return !!(
      name.trim() &&
      birthYear &&
      birthMonth &&
      birthDay &&
      gender &&
      selectedTraits.length > 0 &&
      selectedGenres.length > 0
    );
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
      <main className="relative z-10 max-w-[375px] flex flex-col items-center mb-20">
        <div className="w-[375px] h-full mx-auto overflow-y-auto">
          {/* 상단 바 */}
          <div
            className="fixed top-0 right-0 left-0 z-20 px-6 pb-2 h-[60px] bg-gray-200/70 shadow-sm"
            style={{ paddingTop: `max(1rem, env(safe-area-inset-top))` }}
          >
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackClick}
                className="flex items-center w-10 h-10"
                aria-label="이전으로 이동"
              >
                <BackIcon className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex flex-1 justify-center">
                <div className="text-black title-hak">아이 등록</div>
              </div>
              <div className="w-10" />
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="py-4 pt-24">
            <div className="flex flex-col gap-6 justify-center">
              {/* 아이 정보 카드 */}
              <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-7 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="title-hak">아이 정보</p>
                  <p className="subtitle-b text-secondary-100">
                    아이의 기본 정보를 입력해주세요.
                  </p>
                </div>

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
                          const newDayOptions = getDayOptions(
                            e.target.value,
                            birthMonth
                          );
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
                          const newDayOptions = getDayOptions(
                            birthYear,
                            e.target.value
                          );
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
              </div>

              {/* 아이 성향 선택 카드 */}
              <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-6 pb-8 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="title-hak">아이 성향</p>
                  <p className="subtitle-b text-secondary-100">
                    아이의 해당되는 특성을 선택해주세요.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <MultiSelectGroup
                    selectedValues={selectedTraits}
                    onChange={(values) => setSelectedTraits(values as string[])}
                  >
                    <TraitSelector />
                  </MultiSelectGroup>
                </div>
              </div>

              {/* 장르 선택 카드 */}
              <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-6 pb-8 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="title-hak">좋아하는 장르</p>
                  <p className="subtitle-b text-secondary-100">
                    좋아하는 장르를 선택해주세요
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <MultiSelectGroup
                    selectedValues={selectedGenres}
                    onChange={(values) => setSelectedGenres(values as string[])}
                  >
                    <GenreSelector />
                  </MultiSelectGroup>
                </div>
              </div>

              {/* 프로필 사진 선택*/}
              <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-6 pb-8 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="title-hak">프로필 사진 선택</p>
                  <p className="subtitle-b text-secondary-100">
                    아이의 프로필로 사용할 귀여운 캐릭터를 골라주세요.
                  </p>
                </div>

                {/* 프로필 선택 그리드 */}
                <div className="grid grid-cols-3 gap-4">
                  {PROFILE_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => setSelectedProfile(option.value)}
                      className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedProfile === option.value
                          ? "bg-blue-100 border-2 border-blue-300"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-center items-center mb-2 w-16 h-16 bg-gray-200 rounded-full">
                        <SwitchCase
                          value={option.value}
                          case={{
                            CAT: <CatIcon className="w-12 h-12" />,
                            CHICK: <ChickIcon className="w-12 h-12" />,
                            DINOSAUR: <DinosaurIcon className="w-12 h-12" />,
                            DOG: <DogIcon className="w-12 h-12" />,
                            RABBIT: <RabbitIcon className="w-12 h-12" />,
                          }}
                        />
                      </div>
                      <span className="text-gray-700 text-ceker body-hak-r">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 하단 고정 저장 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 z-30 p-6">
        <CustomButton onClick={handleSave} isActive={isFormValid()}>
          저장하기
        </CustomButton>
      </div>

      {/* 바텀시트 오버레이 */}
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsBottomSheetOpen(false)}
        />
      )}

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-200 rounded-t-3xl p-6 max-h-[50vh]">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="mb-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              아이 정보가 저장됐어요.
            </h3>
            <p className="text-gray-600">다른 아이도 이어서 등록할까요?</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddAnotherChild}
              className="py-4 w-full font-semibold text-green-100  border transition-colors border-green-100 hover:bg-primary-200 rounded-[20px]"
            >
              다른 아이 등록하기
            </button>
            <button
              onClick={handleComplete}
              className="py-4 w-full font-semibold text-gray-100 border border-gray-300 transition-colors rounded-[20px] bg-green-100 hover:bg-green-200"
            >
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
