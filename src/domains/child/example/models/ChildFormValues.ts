import { ChildEntity, PickChildEntityKeys } from "@/entities";
import { z } from "zod";

/**
 * FeedBack: Entity를 사용하는 것이 좋음 => 단일 원천을 유지하는 것이 좋음(DB보고 미리 만들어놨음)
 */

export const ChildFormValues = ChildEntity.pick({
  name: true,
  birthday: true,
  gender: true,
  profile: true,
} satisfies PickChildEntityKeys).extend({});

export type ChildFormValues = z.infer<typeof ChildFormValues>;
