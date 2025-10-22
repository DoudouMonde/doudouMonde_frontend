import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRouteLeavingGuard } from "@/shared/hooks/useRouteLeavingGuard";
import { PATH } from "@/shared/constants/paths";
import {
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
import {
  useAutosaveChildForm,
  STORAGE_KEY_AUTOSAVE,
} from "./useAutosaveChildForm.ts";
import { useChildRegistrationMutation } from "./useChildRegistrationMutation";

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { postRegistration } = useChildRegistrationMutation();

  const existingNamesNormRef = useRef<string[]>(
    loadJson(STORAGE_KEY_NAMES_NORM, [])
  );
  const existingNamesRawRef = useRef<string[]>(loadJson(STORAGE_KEY_NAMES, []));

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
    formState: { isValid, errors, isDirty },
  } = formMethods;

  const formValues = watch();

  // 페이지 이탈 방지
  const handleResetDirtyState = () => reset(formValues, { keepValues: true });
  useRouteLeavingGuard(
    isDirty,
    "저장되지 않은 아이 등록 정보가 있습니다. 정말 이동하시겠습니까?",
    handleResetDirtyState
  );

  // 자동 저장 훅 연결
  useAutosaveChildForm(formValues, isDirty);

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
      setError("name", { type: "validate", message: "이미 등록된 이름이에요" });
      return;
    }
    setIsBottomSheetOpen(true);
  };

  const handleSave = handleSubmit(onSubmit);

  const handleComplete = async () => {
    const data = formValues;

    const childData = {
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

    await postRegistration(childData);

    const norm = normalizeName(data.name);
    if (!existingNamesNormRef.current.includes(norm)) {
      existingNamesNormRef.current.push(norm);
      existingNamesRawRef.current.push(data.name.trim());
      saveJson(STORAGE_KEY_NAMES_NORM, existingNamesNormRef.current);
      saveJson(STORAGE_KEY_NAMES, existingNamesRawRef.current);
    }

    localStorage.removeItem(STORAGE_KEY_AUTOSAVE);
    reset(formValues, { keepValues: true });
    navigate(PATH.REGION_REGISTRATION);
  };

  //다른 아이 등록하기 : 저장 후 폼 초기화 후 바텀시트 닫기
  const handleAddAnotherChild = () => {
    //폼 초기화
    reset({
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "",
      selectedTraits: [],
      selectedGenres: [],
      selectedProfile: "CAT",
    });
  };

  return {
    control,
    setValue,
    formValues,
    errors,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleAddAnotherChild,
    handleSave,
    handleComplete,
    isButtonActive: isValid && !isLimitReached,
    isDuplicateName,
    isLimitReached,
    maxChildren: MAX_CHILDREN,
  };
};
