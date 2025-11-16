import { ChildFormValues } from "@/domains/child/models";

type Options = {
  isDuplicateName: (s: string) => boolean;
  defaultValues?: Partial<ChildFormValues>;
  mode?: "onChange" | "onSubmit" | "onBlur" | "all";
};

export function useChildFormMethods(options: Options) {
    const 
}
