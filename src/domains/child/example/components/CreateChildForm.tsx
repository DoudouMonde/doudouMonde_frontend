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
    defaultValues: createNewChild(), 
    resolver: zodResolver(ChildFormValues), 
    //폼이 제출될 때 zodResolver가 폼 데이터의 규칙을 정의한 스키마(ChildFormValues)를 기반으로 입력된 폼 값 (formValues)의 유효성을 검증한다.   
  });

  //폼 제출이 성공하고 유효성을 통과했을 때 실행
  const createChild = (formValues: ChildFormValues) => {
    //여기에 child 등록 API 호출하면 됨.
    console.log(formValues);
  };
  return (
    //formMethods를 Provider의 value로 전달한다.
    //이 컴포넌트 내부에 있는 모든 하위 컴포넌트는 useFormContext를 사용하여 전달받은 메소드를 Props 드릴링 없이 사용할 수 있다.
    <FormProvider {...formMethods}>
      {/* 실제 폼 UI를 렌더링하는 프레젠테이션 컴포넌트 */}
      <ChildForm onSubmit={createChild} />
      {/* 폼의 control 객체를 넘겨받아 개발자 도구에 시각적으로 보여주게 해준다.  */}
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};
