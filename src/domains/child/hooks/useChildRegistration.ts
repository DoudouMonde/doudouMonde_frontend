import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants/paths";
import {
  ChildRequest,
  GENDER_MAPPING,
  TRAIT_MAPPING,
  GENRE_MAPPING,
  PROFILE_MAPPING,
} from "@/domains/auth/types/signup";

// 타입 정의
export type ProfileValue = "CAT" | "CHICK" | "DINOSAUR" | "DOG" | "RABBIT";
export type Birth = { year: string; month: string; day: string };

export type ChildFormValues = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  selectedTraits: string[];
  selectedGenres: string[];
  selectedProfile: ProfileValue;
};

// useFormReturn 타입에서 필요한 것만 부분적으로 가져오기 (ChildRegistrationPage에서 사용할 RHF 함수들을 위한 타입 명시)
type FormMethods = Pick<
  UseFormReturn<ChildFormValues>,
  "control" | "handleSubmit" | "setValue" | "watch" | "reset" | "formState"
>;

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const formMethods = useForm<ChildFormValues>({
    defaultValues: {
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "",
      selectedTraits: [],
      selectedGenres: [],
      selectedProfile: "CAT",
    },
    mode: "onChange",
  });

  // 필요한 RHF 함수들을 구조 분해
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = formMethods as FormMethods;

  const formValues = watch(); // 폼 값 전체를 watch

  // 폼 제출 핸들러 (BottomSheet 열기)
  const onSubmit = (data: ChildFormValues) => {
    console.log("저장할 데이터:", data);
    setIsBottomSheetOpen(true);
  };

  const handleSave = handleSubmit(onSubmit); // 저장 버튼 클릭 시 실행될 함수

  // 최종 완료 핸들러 (localstorage 저장 및 페이지 이동)
  const handleComplete = () => {
    const data = formValues;
    const childData: ChildRequest = {
      name: data.name.trim(),
      birthday: `${data.birthYear}-${data.birthMonth.padStart(
        2,
        "0"
      )}-${data.birthDay.padStart(2, "0")}`,
      gender:
        GENDER_MAPPING[data.gender as keyof typeof GENDER_MAPPING] || "MALE",
      profile:
        PROFILE_MAPPING[data.selectedProfile as keyof typeof PROFILE_MAPPING] ||
        "CAT",
      traits: data.selectedTraits.map(
        (trait) => TRAIT_MAPPING[trait as keyof typeof TRAIT_MAPPING] || trait
      ),
      genres: data.selectedGenres.map(
        (genre) => GENRE_MAPPING[genre as keyof typeof GENRE_MAPPING] || genre
      ),
    };

    localStorage.setItem("childData", JSON.stringify(childData));
    navigate(PATH.REGION_REGISTRATION);
  };

  // 폼 초기화 및 바텀시트 닫기
  const resetForm = () => reset();
  const handleAddAnotherChild = () => {
    setIsBottomSheetOpen(false);
    resetForm();
  };

  return {
    // RHF 함수/값을 직접 반환
    control,
    setValue,
    formValues,

    // 로직/상태 관련 값 반환
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleSave,
    handleComplete,
    handleAddAnotherChild,
    isButtonActive: isValid,
  };
};
