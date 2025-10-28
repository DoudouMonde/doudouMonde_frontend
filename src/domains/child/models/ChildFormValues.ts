import { ChildEntity, PickChildEntityKeys } from "@/entities";

import { z } from "zod/v4-mini";

export const ChildFormValues = ChildEntity.pick({
    name: true,
    birthday: true,
    gender: true,
    profile: true
} satisfies PickChildEntityKeys).extend({});

export type ChildFormValues = z.infer<typeof ChildFormValues>;