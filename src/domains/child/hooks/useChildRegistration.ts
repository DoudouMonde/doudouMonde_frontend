import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRouteLeavingGuard } from "@/shared/hooks/useRouteLeavingGuard";
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

const normalizeName = (raw: string) =>
  raw.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();

const STORAGE_KEY_NAMES = "childNames"; //정규화 전 원본 이름
const STORAGE_KEY_NAMES_NORM = "childNamesNorm"; //정규화된 이름(중복 체크용)

const loadJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const saveJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const MAX_CHILDREN = 4;

  const initialNormNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES_NORM, []),
    []
  );
  const initialRawNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES, []),
    []
  );
  const existingNamesNormRef = useRef<string[]>(initialNormNames);
  const existingNamesRawRef = useRef<string[]>(initialRawNames);

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

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isValid, errors, isDirty },
  } = formMethods;

  const handleResetDirtyState = () => {
    reset(formValues, { keepValues: true });
  };

  useRouteLeavingGuard(
    isDirty,
    "저장되지 않은 아이 등록 정보가 있습니다. 정말 페이지를 이동하시겠습니까?",
    handleResetDirtyState
  );

  const formValues = watch();

  const currentCount = existingNamesNormRef.current.length;
  const isLimitReached = currentCount >= MAX_CHILDREN;

  const isDuplicateName = (value: string) => {
    const norm = normalizeName(value);
    return existingNamesNormRef.current.includes(norm);
  };

  const onSubmit = (data: ChildFormValues) => {
    if (isLimitReached) {
      setError("name", {
        type: "validate",
        message: `아이는 최대 ${MAX_CHILDREN}명까지 등록할 수 있어요.`,
      });
      return;
    }

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

    const norm = normalizeName(data.name);
    if (!existingNamesNormRef.current.includes(norm)) {
      existingNamesNormRef.current = [...existingNamesNormRef.current, norm];
      existingNamesRawRef.current = [
        ...existingNamesRawRef.current,
        data.name.trim(),
      ];

      saveJson(STORAGE_KEY_NAMES_NORM, existingNamesNormRef.current);
      saveJson(STORAGE_KEY_NAMES, existingNamesRawRef.current);
    }

    reset(formValues, { keepValues: true }); //값을 유지하며 dirty 상태만 리셋

    navigate(PATH.REGION_REGISTRATION);
  };

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
