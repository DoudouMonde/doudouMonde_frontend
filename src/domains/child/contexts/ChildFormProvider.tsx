import { ChildFormValues } from "@/domains/child/models";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  //모든 속성을 선택적으로 바꾼다. (수정할 때는 일부만 들어올 수 있기 때문에?)
  //birthISO라는 선택 속성을 추가한다.
  initial?: Partial<ChildFormValues> & { birthISO?: string };
  onSubmit?: (values: ChildFormValues) => void;
};

export const ChildFormProvider = ({ children, initial, onSubmit }: Props) => {
  const methods = useForm<ChildFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: undefined,
      ...(initial ?? {}),
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    if (initial?.birthISO) {
      const { year, month, day } = parseBith(initial.birthISO);
      setValue("birthYear", year);
      setValue("birthMonth", month);
      setValue("birthDay", day);
    }
  }, [initial?.birthISO, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
        {children}
      </form>
    </FormProvider>
  );
};
