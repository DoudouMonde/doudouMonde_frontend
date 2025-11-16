import { ChildFormValues } from "@/domains/child/example/models";
import { Control, useController } from "react-hook-form";

/**
 * FeedBack: 파사드 패턴을 활용해서 useController를 사용하는 것을 캡슐화함
 * useForm을 사용하려면 register 또는 useController 또는 <Controller> 중 하나를 사용해야 함
 * 나는 useController를 선호 => useController를 사용하면 field들을 정의 하는데, 코드가 길어서 분리하는 것을 선호
 * 디자인 패턴 중 파사드 패턴을 활용함
 */
export default function useChildFormValues(
  control: Control<ChildFormValues, any, ChildFormValues>
) {
  const { field: name } = useController({
    control,
    name: "name",
  });

  const { field: birthday } = useController({
    control,
    name: "birthday",
  });

  const { field: gender } = useController({
    control,
    name: "gender",
  });

  const onChangeName = (value: string) => {
    name.onChange(value);
  };

  const onChangeBirthday = (value: string) => {
    birthday.onChange(value);
  };

  const onChangeGender = (value: string) => {
    gender.onChange(value);
  };

  return {
    name: name.value,
    birthday: birthday.value,
    gender: gender.value,
    onChangeName,
    onChangeBirthday,
    onChangeGender,
  };
}
