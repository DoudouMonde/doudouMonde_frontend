import { ChildFormValues } from "@/domains/child/example/models";
import { useFormContext } from "react-hook-form";
import useChildFormValues from "@/domains/child/example/hooks/useChildFormValues";
import { FormCard } from "@/shared/components/FormCard";
import { FormInput } from "@/shared/components/Form/input";
import { GenderSelect } from "@/pages/child/GenderSelect";

type Props = {
  onSubmit: (data: ChildFormValues) => void;
};

export const ChildForm = ({ onSubmit }: Props) => {
  const { control } = useFormContext<ChildFormValues>();
  const {
    name,
    birthday,
    gender,
    onChangeName,
    onChangeBirthday,
    onChangeGender,
  } = useChildFormValues(control);
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<ChildFormValues>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); //새로고침 방지
        handleSubmit((formValues) => {
          //handleSubmit은 zodResolver에 넣은 schema의 유효성 검사를 수행하고, 유효하면 함수를 호출함
          onSubmit(formValues);
          reset(formValues);
        })();
      }}
    >
      <fieldset className="px-6 py-4 pt-24">
        <FormCard title="아이 정보" subtitle="아이의 기본 정보를 입력해주세요.">
          <div className="flex flex-col gap-2">
            <FormInput
              title="이름"
              type="text"
              value={name ?? ""}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="예: 정불명"
            />
            {errors.name && (
              <p className="px-1 mt-1 text-red-100 body-inter-sm">
                * {errors.name.message}
              </p>
            )}
          </div>
          {/* BirthdateSelect는 type처리가 귀찮아서 그냥 놔둠 */}
          {/* <BirthdateSelect value={birthday} onChange={onChangeBirthday} /> */}
          <GenderSelect
            value={gender}
            onChange={onChangeGender}
            error={errors.gender?.message}
          />
        </FormCard>

        <div className={"flex justify-center"}>
          <button
            type="submit"
            className="px-8 py-3 w-full text-gray-200 rounded-full body-inter-r bg-green-100/70 00 hover:bg-green-100"
          >
            등록하기
          </button>
        </div>
      </fieldset>
    </form>
  );
};
