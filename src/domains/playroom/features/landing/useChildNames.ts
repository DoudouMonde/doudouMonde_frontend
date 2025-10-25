import { useChildListQuery } from "@/domains/child/queries";

export const useChildNames = (defaultName = "두두") => {
  const { data } = useChildListQuery();

  return data?.contents?.map((c) => c.name).join(", ") || defaultName;
};
