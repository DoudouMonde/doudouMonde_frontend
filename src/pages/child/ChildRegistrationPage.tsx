import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants/paths";
import { MultiRadio } from "@/shared/components/Radio";
import { MultiSelectCard } from "@/shared/components/MultiSelect/MultiSelectCard";
import { GridOption } from "@/shared/components/GridSelectCard";
import { GridSelectCard } from "@/shared/components/GridSelectCard";
import {
  ChildRequest,
  GENDER_MAPPING,
  TRAIT_MAPPING,
  GENRE_MAPPING,
  PROFILE_MAPPING,
} from "@/domains/auth/types/signup";
import { CustomButton } from "@/shared/components/CustomButton";
import { ChildInforRegistCard } from "@/shared/components/Child/ChildInforRegistCard";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { ChildTraitOptions } from "@/domains/child/components/TraitSelector";
import { Background } from "@/shared/components/Background";
import { TopBar } from "@/shared/components/TopBar";
import { CatIcon } from "@/assets/icons/profile";
import { ChickIcon } from "@/assets/icons/profile";
import { DinosaurIcon } from "@/assets/icons/profile";
import { DogIcon } from "@/assets/icons/profile";
import { RabbitIcon } from "@/assets/icons/profile";
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
type ProfileValue = "CAT" | "CHICK" | "DINOSAUR" | "DOG" | "RABBIT";
// 프로필 옵션
const PROFILE_OPTIONS: GridOption<ProfileValue>[] = [
  { value: "CAT", label: "고양이", icon: <CatIcon className="w-12 h-12" /> },
  {
    value: "CHICK",
    label: "병아리",
    icon: <ChickIcon className="w-12 h-12" />,
  },
  {
    value: "DINOSAUR",
    label: "공룡",
    icon: <DinosaurIcon className="w-12 h-12" />,
  },
  { value: "DOG", label: "강아지", icon: <DogIcon className="w-12 h-12" /> },
  {
    value: "RABBIT",
    label: "토끼",
    icon: <RabbitIcon className="w-12 h-12" />,
  },
];
function TraitSelector() {
  return <ChildTraitOptions />;
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
type Birth = { year: string; month: string; day: string };
export const ChildRegistrationPage = () => {
  const navigate = useNavigate();

  const [selectedProfile, setSelectedProfile] = useState<ProfileValue | null>(
    null
  );

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

  // 바텀시트 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // 이름 입력 상태 (실시간 업데이트를 위해)
  const [name, setName] = useState<string>("");

  // 제출 상태

  // 이름 입력 ref
  const nameInputRef = React.useRef<HTMLInputElement>(null);

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

  // BirthdateSelect가 요구하는 형태로 래핑
  const birth: Birth = { year: birthYear, month: birthMonth, day: birthDay };
  const setBirth = (v: Birth) => {
    setBirthYear(v.year);
    setBirthMonth(v.month);
    setBirthDay(v.day);
  };

  return (
    <div className="flex relative flex-col items-center w-full min-h-screen">
      {/* 배경 이미지 */}
      <Background />
      {/* 컨텐츠 */}
      <main className="flex relative z-10 flex-col items-center mb-20 w-full">
        <div className="overflow-y-auto w-full h-full">
          {/* 상단 바 */}
          <TopBar title="아이 등록" />

          {/* 메인 컨텐츠 */}
          <div className="px-6 py-4 pt-24">
            <div className="flex flex-col gap-6 justify-center">
              {/* 아이 정보 카드 */}
              <ChildInforRegistCard
                name={name}
                setName={setName}
                birth={birth}
                setBirth={setBirth}
                gender={gender}
                setGender={setGender}
              />

              {/* 아이 성향 선택 카드 */}
              <MultiSelectCard
                title="아이 성향"
                subtitle="아이의 해당되는 특성을 선택해주세요."
                selectedValues={selectedTraits}
                onChange={(values) => setSelectedTraits(values)}
              >
                <TraitSelector />
              </MultiSelectCard>

              {/* 장르 선택 카드 */}
              <MultiSelectCard
                title="좋아하는 장르"
                subtitle="좋아하는 장르를 선택해주세요."
                selectedValues={selectedGenres}
                onChange={(values) => setSelectedGenres(values)}
              >
                <GenreSelector />
              </MultiSelectCard>

              {/* 프로필 사진 선택*/}
              <GridSelectCard<ProfileValue>
                title="프로필 사진 선택"
                subtitle="아이의 프로필로 사용할 귀여운 캐릭터를 골라주세요."
                options={PROFILE_OPTIONS}
                selected={selectedProfile}
                onChange={setSelectedProfile}
              />
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
        <BottomSheet
          onClick1={handleAddAnotherChild}
          onClick2={handleComplete}
          title=" 아이 정보가 저장됐어요."
          content="다른 아이도 이어서 등록할까요?"
          field1="다른 아이 등록하기"
          field2="완료"
        />
      )}
    </div>
  );
};
