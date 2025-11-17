import { ChildEntity, PickChildEntityKeys } from "@doudoumonde/shared/schemas";
import { z } from "zod";

/**
 * FeedBack: Entity를 사용하는 것이 좋음 => 단일 원천을 유지하는 것이 좋음(DB보고 미리 만들어놨음)
 */

//pick() 메서드를 사용하여 ChildEntity에서 필요한 속성들만 선택하여 새로운 스키마를 만든다. 
export const ChildFormValues = ChildEntity.pick({
  name: true,
  birthday: true,
  gender: true,
  profile: true,
} satisfies PickChildEntityKeys).extend({});
//이 객체가 pickChildEntityKeys의 요구사항을 만족하는지만 확인하고 실제 객체의 타입은 유지하도록 강제한다.

//타입 정의
//z.infer<typeof ChildFormValues> : ChildFormValues를 기반으로 해당 스키마가 통과시킬 데이터의 정확한 TS 타입을 자동으로 추론해준다.
export type ChildFormValues = z.infer<typeof ChildFormValues>;
