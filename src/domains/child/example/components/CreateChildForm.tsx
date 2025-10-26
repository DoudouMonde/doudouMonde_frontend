import { ChildForm } from "@/domains/child/example/components/ChildForm";
import { ChildFormValues } from "@/domains/child/example/models";
import { createNewChild } from "@/domains/child/example/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
/**
 * FeedBack:Form의 경우 수정, 생성때 보통 같은 UI를 쓸 확률이 높음.
 * point1) UI는 같지만, 호출해야하는 API등의 로직이 다르기 때문에 presentation-container 패턴을 사용하는 것이 좋음
 *
 */
export const CreateChildForm = () => {
  const formMethods = useForm<ChildFormValues>({
    defaultValues: createNewChild(), //초기값을 정해주는 factory 함수
    resolver: zodResolver(ChildFormValues), //zodResolver에 넣은 schema의 유효성 검사를 수행하고, 유효하면 함수를 호출함
  });

  const createChild = (formValues: ChildFormValues) => {
    //여기에 child 등록 API 호출하면 됨.
    console.log(formValues);
  };
  return (
    <FormProvider {...formMethods}>
      <ChildForm onSubmit={createChild} />
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};
