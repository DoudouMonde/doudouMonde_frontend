// /domains/child/hooks/useChildList.ts
import { useChildListData } from "./useChildListData";
import { useChildListUI } from "./useChildListUI";

export function useChildList() {
  const { children, invalidate } = useChildListData();
  const ui = useChildListUI(children);



  
  return { children, invalidate, ...ui };
}
