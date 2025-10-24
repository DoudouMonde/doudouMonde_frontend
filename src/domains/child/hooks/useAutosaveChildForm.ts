import { useEffect, useMemo } from "react";
import { debounce } from "@/shared/utils/debounce";
import { saveJson } from "../utils/storage";

export const STORAGE_KEY_AUTOSAVE = "childFormAutosave";

export const useAutosaveChildForm = (formValues: any, isDirty: boolean) => {
  const debouncedAutosave = useMemo(
    () =>
      debounce((dataToSave) => {
        if (dataToSave.name || dataToSave.birthYear) {
          saveJson(STORAGE_KEY_AUTOSAVE, dataToSave);
        } else {
          localStorage.removeItem(STORAGE_KEY_AUTOSAVE);
        }
      }, 3000),
    []
  );

  useEffect(() => {
    if (isDirty) debouncedAutosave(formValues);
  }, [formValues, isDirty, debouncedAutosave]);
};
