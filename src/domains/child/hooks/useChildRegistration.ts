import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants/paths";
import {
  ChildRequest,
  GENDER_MAPPING,
  TRAIT_MAPPING,
  GENRE_MAPPING,
  PROFILE_MAPPING,
} from "@/domains/auth/types/signup";

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

//이름 정규화 유틸
const normalizeName = (raw: string) =>
  raw.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();

//localstorage 키
const STORAGE_KEY_NAMES = "childNames"; //정규화 전 원본 이름
const STORAGE_KEY_NAMES_NORM = "childNamesNorm"; //정규화된 이름(중복 체크용)

//fallback : 로드 실패/없음일 때 대신 쓸 기본값. 여기에선 []
const loadJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
//value 타입을 왜 Unknown으로 했을까? -> 무엇이든 올 수 있는 값
const saveJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  //최대 등록 가능 수
  const MAX_CHILDREN = 4;

  //페이지 마운트 시 1회 : 기존 이름 목록 로드(정규화/원본)
  const initialNormNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES_NORM, []),
    []
  );
  const initialRawNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES, []),
    []
  );
  //궁금한 점 - 정규화한 이름만 불러오면 안되나? 왜 원본까지 불러오지?
  //렌더 간 유지할 수 있도록 ref로 관리. useRef는 어떤 경우에도 리렌더링을 유발하지 않는다.
  const existingNamesNormRef = useRef<string[]>(initialNormNames);
  const existingNamesRawRef = useRef<string[]>(initialRawNames);

  //useForm 초기화
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
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = formMethods;

  const formValues = watch();

  //현재 등록된 아이 수
  const currentCount = existingNamesNormRef.current.length;
  const isLimitReached = currentCount >= MAX_CHILDREN;

  //외부에서 사용할 중복 체크 함수 (childFormFields에 내려줌)

  const isDuplicateName = (value: string) => {
    const norm = normalizeName(value);
    return existingNamesNormRef.current.includes(norm);
  };

  const onSubmit = (data: ChildFormValues) => {
    //1) 최대 수 제한
    if (isLimitReached) {
      setError("name", {
        type: "validate",
        message: `아이는 최대 ${MAX_CHILDREN}명까지 등록할 수 있어요.`,
      });
      return;
    }

    //2) 중복 검사 -> 여기말고
    //중복된 이름은 이름 form 바로 밑에 출력하고 싶음 -> ChildInforRegistCard 파일에.
    if (isDuplicateName(data.name)) {
      setError("name", {
        type: "validate",
        message: "이미 등록된 이름이에요",
      });
      return;
    }

    setIsBottomSheetOpen(true);
  };

  const handleSave = handleSubmit(onSubmit);

  // 최종 완료 핸들러 (localstorage 저장 및 페이지 이동)
  const handleComplete = () => {
    const data = formValues; //watch를 사용하여 최신 데이터를 가져온다.
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

    //데이터를 localstorage에 저장하고 다음 페이지로 이동
    localStorage.setItem("childData", JSON.stringify(childData));

    //이름 목록 업데이트(정규화 / 원본 모두) -> 왜 둘 다?
    const norm = normalizeName(data.name);
    if (!existingNamesNormRef.current.includes(norm)) {
      existingNamesNormRef.current = [...existingNamesNormRef.current, norm];
      existingNamesRawRef.current = [
        ...existingNamesRawRef.current,
        data.name.trim(),
      ];

      // localStorage 반영
      saveJson(STORAGE_KEY_NAMES_NORM, existingNamesNormRef.current);
      saveJson(STORAGE_KEY_NAMES, existingNamesRawRef.current);
    }

    navigate(PATH.REGION_REGISTRATION);
  };

  // 폼 초기화 및 바텀시트 닫기
  const resetForm = () => {
    reset();
    clearErrors();
  };
  const handleAddAnotherChild = () => {
    setIsBottomSheetOpen(false);
    resetForm();
  };

  return {
    control,
    setValue,
    formValues,
    errors,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleSave,
    handleComplete,
    handleAddAnotherChild,
    isButtonActive: isValid && !isLimitReached,
    isDuplicateName,
    isLimitReached,
    maxChildren: MAX_CHILDREN,
  };
};
