// src/domains/child/contexts/ChildListProvider.tsx

import React, { ReactNode } from "react";
import { ChildListContext } from "@/domains/child/contexts/ChildListContext";
import { useChildList } from "@/domains/child/hooks/useChildList";

export function ChildListProvider({ children }: { children: ReactNode }) {
  const listState = useChildList();
  return (
    <ChildListContext.Provider value={listState}>
      {children}
    </ChildListContext.Provider>
  );
}
