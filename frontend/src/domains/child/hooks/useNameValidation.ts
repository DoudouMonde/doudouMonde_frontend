import { FieldErrors } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import { HANGUL_OR_SPACE_ONLY_REGEX } from "../constants/childRegistration";

export const useNameValidation = ({
  errors,
}: {
  errors: FieldErrors<ChildFormValues>;
}) => {
  const getMaxLength = (value: string) =>
    HANGUL_OR_SPACE_ONLY_REGEX.test(value.trim()) ? 5 : 20;

  const handleNameChange = (
    newValue: string,
    onChange: (v: string) => void
  ) => {
    const max = getMaxLength(newValue);
    onChange(newValue.length > max ? newValue.substring(0, max) : newValue);
  };

  const getCombinedInfoErrorMessage = () => {
    if (errors.birthYear || errors.birthMonth || errors.birthDay)
      return (
        errors.birthYear?.message ||
        errors.birthMonth?.message ||
        errors.birthDay?.message ||
        "생년월일을 입력해주세요."
      );
    if (errors.gender) return errors.gender.message;
    return undefined;
  };

  return { handleNameChange, getCombinedInfoErrorMessage };
};
