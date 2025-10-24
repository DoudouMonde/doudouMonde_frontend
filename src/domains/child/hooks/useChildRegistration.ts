import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChildFormSchema } from "../schemas/childFormSchema.ts";
import { useRouteLeavingGuard } from "@/shared/hooks/useRouteLeavingGuard";
import { PATH } from "@/shared/constants/paths";
import { ChildFormValues } from "../types/childForm";
import {
  useAutosaveChildForm,
  STORAGE_KEY_AUTOSAVE,
} from "./useAutosaveChildForm.ts";
import { useChildRegistrationMutation } from "./useChildRegistrationMutation";
import { useToast } from "@/shared/hooks/useToast.tsx";
import { useChildNameManager } from "./useChildNameManager";
import { transformChildDataForApi } from "./transformChildDataForApi.ts";

export const useChildRegistration = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { postRegistration } = useChildRegistrationMutation();
  const { showToast } = useToast();

  const { isDuplicateName, addChildName, isLimitReached, maxChildren } =
    useChildNameManager();

  const childFormSchema = createChildFormSchema(isDuplicateName);

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
    formState: { isValid, errors, isDirty },
  } = formMethods;

  const formValues = watch();

  const handleResetDirtyState = () => reset(formValues, { keepValues: true });
  useRouteLeavingGuard(
    isDirty,
    "저장되지 않은 아이 등록 정보가 있습니다. 정말 이동하시겠습니까?",
    handleResetDirtyState
  );
  useAutosaveChildForm(formValues, isDirty);

  const onSubmit = async (data: ChildFormValues) => {
    //api 요청을 보내기 전에 바텀 먼저 열기
    setIsBottomSheetOpen(true);
    localStorage.removeItem(STORAGE_KEY_AUTOSAVE);

    try {
      const childData = transformChildDataForApi(data);

      await postRegistration(childData);

      addChildName(data.name);
    } catch (error) {
      //API 호출 실패 시
      console.error("아이 등록 실패:", error);
      showToast({
        message: "아이 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "error",
      });

      setIsBottomSheetOpen(false);
    }
  };

  const handleSave = handleSubmit(onSubmit);

  const handleComplete = () => {
    setIsBottomSheetOpen(false);
    reset(formValues, { keepValues: true });
    navigate(PATH.REGION_REGISTRATION);
  };

  const handleAddAnotherChild = () => {
    if (isLimitReached) {
      showToast({
        message: `아이는 최대 ${maxChildren}명까지 등록할 수 있어요.`,
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
    handleSave,
    isLimitReached,
    maxChildren,
  };
};
