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
    const childData = transformChildDataForApi(data);

    await postRegistration(childData);

    addChildName(data.name);

    localStorage.removeItem(STORAGE_KEY_AUTOSAVE);
    setIsBottomSheetOpen(true);
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