// src/domains/child/components/ChildList.tsx (Container)

import { ChildListUI } from "./ChildListUI"; // UI 컴포넌트 import
import { ChildListProvider } from "@/domains/child/contexts/ChildListProvider";

export const ChildList = () => {
  return (
    <ChildListProvider>
      <ChildListUI />
    </ChildListProvider>
  );
};
