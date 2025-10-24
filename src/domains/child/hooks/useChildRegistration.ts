import { useRef, useState } from "react";
import { useForm } from "react-hook-form"; // setError는 이제 필요 없으므로 import에서 제거
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChildFormSchema } from "../schemas/childFormSchema.ts";
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
import { useToast } from "@/shared/hooks/useToast.tsx";

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { postRegistration } = useChildRegistrationMutation();
  const { showToast } = useToast();

  const existingNamesNormRef = useRef<string[]>(
    loadJson(STORAGE_KEY_NAMES_NORM, [])
  );
  const existingNamesRawRef = useRef<string[]>(loadJson(STORAGE_KEY_NAMES, []));

  // --- (수정 1) ---
  // isDuplicateName 함수를 useForm보다 먼저 정의합니다.
  const isDuplicateName = (value: string) =>
    existingNamesNormRef.current.includes(normalizeName(value));

  // --- (수정 2) ---
  // Zod 스키마를 useForm보다 먼저 생성합니다.
  const childFormSchema = createChildFormSchema(isDuplicateName);
  
  // --- (수정 3) ---
  // 이제 childFormSchema 변수를 올바르게 참조할 수 있습니다.
  const formMethods = useForm<ChildFormValues>({
    resolver: zodResolver(childFormSchema), 
    defaultValues: {
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: undefined,
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
    // setError, // --- (수정 4) --- 수동 에러 처리가 필요 없으므로 제거
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
  
  // (isDuplicateName과 childFormSchema 정의를 위로 이동시켰습니다.)

  const saveChildData = async (data: ChildFormValues) => {
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
  };

  // --- (수정 5) ---
  // Zod 스키마가 유효성 검증(중복 포함)을 모두 처리하므로
  // onSubmit 내부의 수동 검사 로직을 제거합니다.
  const onSubmit = async (data: ChildFormValues) => {
    // if (isDuplicateName(data.name)) { ... } // <-- 이 블록 전체 제거
    
    await saveChildData(data);
    setIsBottomSheetOpen(true);
  };

  const handleSave = handleSubmit(onSubmit);

  const handleComplete = async () => {
    setIsBottomSheetOpen(false);
    reset(formValues, { keepValues: true });
    navigate(PATH.REGION_REGISTRATION);
  };

  const handleAddAnotherChild = async () => {
    if (isLimitReached) {
      showToast({
        message: `아이는 최대 ${MAX_CHILDREN}명까지 등록할 수 있어요.`,
        type: "error",
      });
      return;
    }

    setIsBottomSheetOpen(false);
    reset({
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: undefined,
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
    handleComplete,
    isButtonActive: isValid && !isLimitReached,
    isDuplicateName, // Context나 다른 곳에서 여전히 사용할 수 있으므로 일단 남겨둡니다.
    handleSave,
    isLimitReached,
    maxChildren: MAX_CHILDREN,
  };
};