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

import { normalizeName } from "../utils/normalizeName";
import {
  loadJson,
  saveJson,
  STORAGE_KEY_NAMES,
  STORAGE_KEY_NAMES_NORM,
} from "../utils/storage";
import { MAX_CHILDREN } from "../constants/childRegistration";
import { ChildFormValues } from "../types/childForm";

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 최초 1회 로드
  const initialNormNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES_NORM, []),
    []
  );
  const initialRawNames = useMemo(
    () => loadJson<string[]>(STORAGE_KEY_NAMES, []),
    []
  );

  // 렌더 간 유지
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
    formState: { isValid, errors },
  } = formMethods;

  const formValues = watch();

  const isLimitReached = existingNamesNormRef.current.length >= MAX_CHILDREN;

  const isDuplicateName = (value: string) =>
    existingNamesNormRef.current.includes(normalizeName(value));

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
        (t) => TRAIT_MAPPING[t as keyof typeof TRAIT_MAPPING] || t
      ),
      genres: data.selectedGenres.map(
        (g) => GENRE_MAPPING[g as keyof typeof GENRE_MAPPING] || g
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
